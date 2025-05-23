import CustomHeader from "@/components/UniversalComponents/CustomHeader";
import { useTranslations } from "next-intl";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { differenceInYears } from "date-fns";
import ChangingNumber from "@/components/UniversalComponents/ChangingNumber/ChangingNumber";

export default function AboutPractitioner({
  className,
}: {
  className?: string;
}) {
  const tAboutPractitioner = useTranslations("AboutPractitioner");
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>
          <CustomHeader
            text={tAboutPractitioner("about")}
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
      <CardContent className="mx-auto grid grid-rows-[1fr,1px,1fr,1px,1fr] justify-center gap-4 sm:grid-cols-[1fr,1px,1fr,1px,1fr] sm:grid-rows-1 sm:gap-0">
        <div className="flex flex-col items-center">
          <ChangingNumber
            className="font-sans text-5xl font-bold text-accent"
            numberToGetTo={differenceInYears(
              new Date(),
              new Date("01 01 2014"),
            )}
          />
          <div className="text-center">
            {tAboutPractitioner("years_of_experience").toLocaleUpperCase()}
          </div>
        </div>
        <div className="h-full bg-gradient-to-b from-background via-foreground to-background"></div>
        <div className="flex flex-col items-center">
          <ChangingNumber
            className="font-sans text-5xl font-bold text-accent"
            numberToGetTo={20}
          />
          <div className="text-center">
            {tAboutPractitioner("award_nominees").toLocaleUpperCase()}
          </div>
        </div>
        <div className="h-full bg-gradient-to-b from-background via-foreground to-background"></div>
        <div className="flex flex-col items-center">
          <ChangingNumber
            className="font-sans text-5xl font-bold text-accent"
            numberToGetTo={450}
            text={"+"}
          />
          <div className="text-center">
            {tAboutPractitioner("happy_customers").toLocaleUpperCase()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
