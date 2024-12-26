import NextAuth from "next-auth";
import google from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@db/db-connection";
import { accounts, users, sessions, verificationTokens } from "@db/schemaAuth";
import { Provider } from "next-auth/providers";
import { magicLinkEmail } from "@/emails/magicLinkEmail";
import {
  brandAddress,
  brandEmailBackgroundColor,
  brandEmailButtonTextColor,
  brandEmailColor,
  brandEmailLogoUrl,
  brandEmailMutedTextColor,
  brandEmailTextColor,
  brandName,
} from "@/appConfig";
import { env } from "@/lib/env.mjs";

// const protectedRoutes: string[] = ["/crud"];
export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: env.AUTH_SECRET,
  trustHost: true,
  session: {
    strategy: "database",
  },
  // replacing schema with a custom fields schema in the adapter
  // @ts-ignore
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    // @ts-ignore
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  providers: [
    google({
      allowDangerousEmailAccountLinking: true,
    }),
    {
      id: "brevo",
      type: "email",
      async sendVerificationRequest({
        identifier: email,
        url,
      }: {
        identifier: string;
        url: string;
      }) {
        // Call the cloud Email provider API for sending emails
        const response = await fetch(env.SMTP_URI, {
          // The body format will vary depending on provider, please see their documentation
          // for further details.
          body: JSON.stringify({
            sender: {
              name: brandName,
              email: `${env.SMTP_FROM}`,
            },
            to: [
              {
                email,
              },
            ],
            subject: `Sign in to ${brandName}`,
            htmlContent: magicLinkEmail({
              magicLinkUrl: url,
              imgUrl: brandEmailLogoUrl,
              brandName,
              brandAddress: brandAddress.join(", "),
              appUrl: env.NEXT_PUBLIC_URI,
              bucketUrl: env.NEXT_PUBLIC_URI,
              backgroundColor: brandEmailBackgroundColor,
              brandColor: brandEmailColor,
              textColor: brandEmailTextColor,
              mutedText: brandEmailMutedTextColor,
              buttonText: brandEmailButtonTextColor,
            }),
          }),
          // Authentication will also vary from provider to provider, please see their docs.
          headers: {
            "api-key": `${env.SMTP_API_KEY}`,
            "content-type": "application/json",
            accept: "application/json",
          },
          method: "POST",
        });

        if (!response.ok) {
          const { errors } = (await response.json()) as any;
          throw new Error(JSON.stringify(errors));
        }
      },
    } as unknown as Provider,
  ],
  callbacks: {
    // exposing role on the client
    // session({ session, user }) {
    //   session.user.role = user.role;
    //   return session;
    // },
  },
  pages: {
    signIn: "/signin",
  },
});
