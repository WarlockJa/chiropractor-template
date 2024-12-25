import CustomHeader from "@/components/CustomHeader";
import { useTranslations } from "next-intl";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { differenceInYears } from "date-fns";
import ChangingNumber from "../UniversalComponents/ChangingNumber/ChangingNumber";

export default function AboutPractitioner({
  className,
}: {
  className?: string;
}) {
  const t = useTranslations("SupportedEquipment");
  return (
    // TODO add translation
    <Card className={className}>
      <CardHeader>
        <CardTitle>
          <CustomHeader
            text={"About Chiropracticer"}
            fontSizeRem={2}
            className="my-4 flex justify-center"
          />
        </CardTitle>
        <CardDescription>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae,
          corporis iusto accusantium molestiae ex dicta asperiores voluptas
          harum autem deserunt ipsa, vitae ipsum mollitia, nobis aliquam!
          Aliquid dolore natus sequi.
        </CardDescription>
      </CardHeader>
      <CardContent className="mx-auto grid grid-cols-[1fr,1px,1fr,1px,1fr] justify-center">
        <div className="flex flex-col items-center">
          {/* <div className="font-sans text-5xl font-bold text-accent">
            {differenceInYears(new Date(), new Date("01 01 2014"))}
          </div> */}
          <ChangingNumber
            className="font-sans text-5xl font-bold text-accent"
            numberToGetTo={differenceInYears(
              new Date(),
              new Date("01 01 2014"),
            )}
          />
          <div className="text-center">YEARS OF EXPERIENCE</div>
        </div>
        <div className="h-full bg-gradient-to-b from-background via-foreground to-background"></div>
        <div className="flex flex-col items-center">
          {/* <div className="font-sans text-5xl font-bold text-accent">20</div> */}
          <ChangingNumber
            className="font-sans text-5xl font-bold text-accent"
            numberToGetTo={20}
          />
          <div className="text-center">AWARD NOMINEES</div>
        </div>
        <div className="h-full bg-gradient-to-b from-background via-foreground to-background"></div>
        <div className="flex flex-col items-center">
          {/* <div className="font-sans text-5xl font-bold text-accent">450+</div> */}
          <ChangingNumber
            className="font-sans text-5xl font-bold text-accent"
            numberToGetTo={450}
            text={"+"}
          />
          <div className="text-center">HAPPY CUSTOMERS</div>
        </div>
      </CardContent>
    </Card>
  );
}
