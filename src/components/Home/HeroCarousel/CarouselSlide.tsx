import { CustomButton } from "@/components/CustomButton";
import CustomImage from "@/components/CustomImage";
import AnimatedText from "@/components/UniversalComponents/AnimatedText";
import Link from "next/link";

export default function CarouselSlide({
  dbImageName,
}: {
  dbImageName: string;
}) {
  return (
    <div className="relative">
      <CustomImage dbImageName={dbImageName} className="h-[50em] w-screen" />
      <div className="absolute inset-x-0 top-0 mx-auto h-[50em] w-full max-w-screen-2xl">
        <div className="absolute bottom-[5%] left-[7%] mx-auto flex flex-col gap-2">
          <AnimatedText
            className="text-background drop-shadow-[4px_4px_2px_rgba(0,0,0,0.8)]"
            delay={1}
          >
            <div className="select-none text-3xl font-bold text-accent">
              ANGELA SHU
            </div>
          </AnimatedText>
          <div className="flex flex-col gap-2 leading-10 lg:leading-none">
            <AnimatedText
              className="text-background drop-shadow-[4px_4px_2px_rgba(0,0,0,0.8)]"
              delay={1}
            >
              <div className="select-none text-[clamp(2.5rem,6vw,6rem)] font-bold">
                BETTER HEALTH
              </div>
            </AnimatedText>
            <AnimatedText
              className="text-background drop-shadow-[4px_4px_2px_rgba(0,0,0,0.8)]"
              delay={1.2}
            >
              <div className="select-none text-[clamp(2.5rem,6vw,6rem)] font-bold">
                THROUGH
              </div>
            </AnimatedText>
            <AnimatedText
              className="text-background drop-shadow-[4px_4px_2px_rgba(0,0,0,0.8)]"
              delay={1.4}
            >
              <div className="select-none text-[clamp(2.5rem,6vw,6rem)] font-bold text-accent">
                CHIROPRACTIC
              </div>
            </AnimatedText>
          </div>
          <AnimatedText
            className="max-w-lg text-background drop-shadow-[4px_4px_2px_rgba(0,0,0,0.8)]"
            delay={1.4}
          >
            <div className="select-none text-[clamp(1rem,2vw,1rem)] font-bold uppercase">
              Our mission is to treat musculoskeletal dysfunction by our proven
              manual methods.
            </div>
          </AnimatedText>
          <AnimatedText delay={1.5} className="pt-4">
            <Link href={"/about"}>
              <CustomButton
                text="MORE ABOUT US"
                className="rounded-none bg-background/60 p-8 font-bold ring ring-ring"
              />
            </Link>
          </AnimatedText>
        </div>
      </div>
    </div>
  );
}
