"use server";

// website contact form
// sending two emails one for the website owner, and a confirmation email for the user

import { rateLimitByIp } from "@/lib/rateLimiting/limiters";
import { actionClient } from "@/lib/safeAction";
import { flattenValidationErrors } from "next-safe-action";
import { messageSchema } from "../schemas";
import { contactEmailOwner } from "@/emails/contactEmailOwner";
import { env } from "@/lib/env.mjs";
import {
  brandAddress,
  brandEmail,
  brandName,
  brandNoReplyEmail,
} from "@/appConfig";
import { contactEmailUser } from "@/emails/contactEmailUser";

export const sendMessageAction = actionClient
  .schema(messageSchema, {
    handleValidationErrorsShape: (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(async ({ parsedInput: { name, phone, email, message } }) => {
    await rateLimitByIp({
      key: "sendMessage",
      limit: 3,
      window: 24 * 60 * 60 * 1000,
    });

    // message to website owner
    const emailOwner = fetch(env.SMTP_URI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": env.SMTP_API_KEY,
        accept: "application/json",
      },
      body: JSON.stringify({
        sender: {
          name: brandName,
          email: brandNoReplyEmail,
        },
        to: [
          {
            email: brandEmail,
            name: brandName,
          },
        ],
        subject: `New website contact: ${name}`,
        htmlContent: contactEmailOwner({
          userEmail: email,
          userMessage: message,
          userName: name,
          userPhone: phone,
          appUrl: env.NEXT_PUBLIC_URI,
          bucketUrl: env.NEXT_PUBLIC_URI,
          backgroundColor: "#fafafa",
          brandColor: "#354964",
          textColor: "#1c1917",
          mutedText: "#535353",
          brandAddress: brandAddress.join(", "),
          brandName,
          imgUrl: `${env.NEXT_PUBLIC_URI}/default.webp`,
        }),
      }),
    });

    // confirmation message to client
    const emailUser = fetch(env.SMTP_URI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": env.SMTP_API_KEY,
        accept: "application/json",
      },
      body: JSON.stringify({
        sender: {
          name: brandName,
          email: brandNoReplyEmail,
        },
        to: [
          {
            email,
            name: brandName,
          },
        ],
        subject: "Confirmation Email",
        htmlContent: contactEmailUser({
          appUrl: env.NEXT_PUBLIC_URI,
          bucketUrl: env.NEXT_PUBLIC_URI,
          backgroundColor: "#fafafa",
          brandColor: "#354964",
          textColor: "#1c1917",
          mutedText: "#535353",
          brandAddress: brandAddress.join(", "),
          brandName,
          imgUrl: `${env.NEXT_PUBLIC_URI}/default.webp`,
        }),
      }),
    });

    // processing promises
    await Promise.all([emailOwner, emailUser]);
  });
