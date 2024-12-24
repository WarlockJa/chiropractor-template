import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ServiceData } from "./servicesData";
import CustomImage from "@/components/CustomImage";
import Link from "next/link";
import { CustomButton } from "@/components/CustomButton";

export default function ServiceCard({
  dbImageName,
  description,
  href,
  title,
}: ServiceData) {
  return (
    <Card className="max-w-screen-xsm border-none shadow-none">
      <CardContent className="h-full w-full p-1">
        <CustomImage dbImageName={dbImageName} className="rounded-full" />
      </CardContent>
      <CardHeader>
        <CardTitle className="text-center text-3xl uppercase">
          <Link href={href}>
            <CustomButton
              text={title}
              className="border-2 border-accent p-8 hover:bg-accent/5"
              textClassName="md:text-4xl p-2"
            />
          </Link>
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  );
}
