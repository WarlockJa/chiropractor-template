import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CustomServerImage from "@/components/UniversalComponents/CustomServerImage";
import { Quote } from "lucide-react";
import { TestimonialsData } from "./testimonialsData";
import { useTranslations } from "next-intl";

export default function TestimonialCard({
  dbImageName,
  description,
  href,
  name,
  quote,
}: TestimonialsData) {
  const tTestimonials = useTranslations("Testimonials");
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {<Quote size={96} className="mx-auto text-accent" />}
        </CardTitle>
        <CardDescription className="py-4 indent-12">{quote}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <CustomServerImage
          dbImageName={dbImageName}
          className="aspect-square w-40 rounded-full"
        />
        <div className="font-bold text-accent">{name.toLocaleUpperCase()}</div>
        {/* <div>{description.toLocaleUpperCase()}</div> */}
        <div>{tTestimonials(`client.${description}`).toLocaleUpperCase()}</div>
      </CardContent>
    </Card>
  );
}
