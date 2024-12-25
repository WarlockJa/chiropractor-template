import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CustomImage from "@/components/UniversalComponents/CustomImage";
import { Quote } from "lucide-react";
import { TestimonialsData } from "./testimonialsData";

export default function TestimonialCard({
  dbImageName,
  description,
  href,
  name,
  quote,
}: TestimonialsData) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {<Quote size={96} className="mx-auto text-accent" />}
        </CardTitle>
        <CardDescription className="indent-12">{quote}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <CustomImage
          dbImageName={dbImageName}
          className="aspect-square w-40 rounded-full"
        />
        <div className="font-bold text-accent">{name.toLocaleUpperCase()}</div>
        <div>{description.toLocaleUpperCase()}</div>
      </CardContent>
    </Card>
  );
}
