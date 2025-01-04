import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ServiceData } from "../../Services/servicesData";
import CustomServerImage from "@/components/UniversalComponents/CustomServerImage";
import Link from "next/link";
import { CustomButton } from "@/components/UniversalComponents/CustomButton";
import { useTranslations } from "next-intl";

export default function ServiceCard({ dbImageName, href, path }: ServiceData) {
  const tService = useTranslations(`Services.${path}`);
  return (
    <Card className="max-w-screen-xsm border-none shadow-none">
      <CardContent className="h-full w-full p-1">
        <CustomServerImage dbImageName={dbImageName} className="rounded-full" />
      </CardContent>
      <CardHeader>
        <CardTitle className="text-center text-3xl uppercase">
          <Link href={href}>
            <CustomButton
              text={tService("title")}
              className="border-2 border-accent p-8 hover:bg-accent/5"
              textClassName="md:text-4xl p-2"
            />
          </Link>
        </CardTitle>
        <CardDescription className="h-56 overflow-y-scroll rounded p-2 text-foreground shadow-sm shadow-accent md:p-4">
          {tService("description")}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
