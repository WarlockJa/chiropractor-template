import HeaderImage from "@/components/UniversalComponents/HeaderImage";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { ServiceData } from "../servicesData";
import CustomHeader from "@/components/UniversalComponents/CustomHeader";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import CustomServerImage from "@/components/UniversalComponents/CustomServerImage";
import { getTranslations } from "next-intl/server";

export default async function ServicePageRelax({
  serviceData,
}: {
  serviceData: ServiceData;
}) {
  const tServices = await getTranslations("Services");
  return (
    <div className="prose mx-auto mt-24 w-screen max-w-screen-lg text-foreground dark:prose-invert md:mt-28">
      <HeaderImage
        dbImageName={serviceData.dbImageName}
        containerClassName="relative h-96 w-screen max-w-screen-lg mx-auto"
      >
        {/* brackets */}
        <div className="absolute left-[5%] top-8 h-20 w-20 border-l border-t border-background"></div>
        <div className="absolute right-[5%] top-8 h-20 w-20 border-r border-t border-background"></div>
        <div className="absolute bottom-8 left-[5%] h-20 w-20 border-b border-l border-background"></div>
        <div className="absolute bottom-8 right-[5%] h-20 w-20 border-b border-r border-background"></div>

        <div className="absolute inset-auto flex h-full w-full flex-col items-center justify-around">
          <h1 className="bg-accent/50 px-4 text-center text-[clamp(2rem,12vw,4rem)] uppercase drop-shadow-[4px_4px_2px_rgba(0,0,0,0.8)]">
            {tServices(`${serviceData.path}.title`).toLocaleUpperCase()}
          </h1>
        </div>
      </HeaderImage>

      <section className="shadow-xl">
        <div className="mx-auto flex w-screen max-w-screen-md flex-col gap-12 py-12">
          <div className="p-2">
            <CustomHeader
              text={serviceData.title.toLocaleUpperCase()}
              fontSizeRem={3}
            />

            <div className="text-justify">
              <CustomServerImage
                dbImageName={serviceData.dbImageName}
                className="mx-auto max-w-96 rounded-md shadow-lg shadow-accent sm:float-right sm:m-4"
              />
              One of the most important things to keep in mind during a
              chiropractic adjustment is staying relaxed. However, if you
              haven&apos;t had a chiropractic adjustment, or tend to be anxious
              you might appreciate some tips for relaxing during a chiropractic
              adjustment.
            </div>
            <h2>Why Should I Be Relaxed?</h2>
            <p>
              You may be wondering, why should I be relaxed for a chiropractic
              adjustment? A chiropractic adjustment is designed to realign your
              spine to help assist the health of your musculoskeletal system. If
              you aren&apos;t relaxed during your adjustment it may be more
              difficult for your chiropractor to properly align your spine.
              Relaxing will help prevent a patient from tensing their muscles
              and achieve a better and more comfortable adjustment. Someone
              who&apos;s tensing their muscles may feel more discomfort during
              an adjustment than a person whose muscles are relaxed. By being
              relaxed you&apos;ll get the most out of your chiropractic
              adjustment.
            </p>
            <h2>Tips For Relaxing During Chiropractic Adjustment</h2>
            <p>
              Staying relaxed is important for getting the most out of your
              chiropractic adjustment as well as minimizing discomfort. One
              major thing you can do to stay relaxed is focus on your breathing.
              Regulating your breathing to a slow, steady rate will help you
              stay relaxed. It will also allow the greatest possible movement
              from your joints, which will help the adjustment progress
              smoothly. Try to avoid tensing up your muscles. If you do tense up
              or resist it can adversely affect your adjustment and may give you
              discomfort. Try to stay still so your chiropractor can position
              you in the best way for your chiropractic adjustment. Further,
              many patients find that they are more relaxed by avoiding highly
              caffeinated beverages prior to their appointments. Patients should
              try to hydrate before and after their appointments to help their
              bodies adjust.
            </p>
            <h2>Do Adjustments Hurt?</h2>
            <p>
              Chiropractic adjustments shouldn&apos;t hurt. However, if a
              patient involuntarily stiffens to tense their muscles there could
              be discomfort that isn&apos;t typical. Recent trauma can also make
              a chiropractic adjustment less comfortable. Things like whiplash
              from car accidents can change how an adjustment feels. If you do
              or don&apos;t hear pops or cracks during your adjustment that is
              completely normal. Not hearing pops doesn&apos;t mean the
              adjustment isn&apos;t working. After an adjustment, much like
              after a workout, you may feel sore, or tired. You will be moving
              differently after your alignment and your body, including muscles,
              ligaments, and tendons, have to adjust to moving properly. The
              soreness will go away after a while.
            </p>
            <h2>Summary</h2>
            <p>
              Staying relaxed during a chiropractic adjustment can help prevent
              discomfort and help your chiropractor properly perform your
              alignment. Keep in mind that adjustments typically don&apos;t
              hurt, they actually can relieve pain. If you come to the
              chiropractor in a lot of pain, various other adjustive techniques
              may be used to avoid causing more pain during the adjustment until
              you are ready and comfortable to be adjusted by hand. Focusing on
              your breathing and avoiding tensing your muscles can help you stay
              relaxed. Also, make sure to drink plenty of water and avoid
              caffeine prior to your appointments.
            </p>
          </div>

          <div className="p-2">
            <CustomHeader text="PEOPLE OFTEN ASK" fontSizeRem={2} />
            <Accordion type="single" collapsible className="shadow">
              <AccordionItem value="item-1" className="*:m-0">
                <AccordionTrigger className="rounded px-4 text-xl uppercase hover:bg-accent/20">
                  Question One
                </AccordionTrigger>
                <AccordionContent className="my-2 rounded bg-muted/20 p-4 text-xl">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Repellat amet impedit veniam facere, unde, distinctio iusto
                  porro corporis doloremque ipsam nulla error aut ex! Beatae
                  quisquam distinctio perspiciatis fugiat adipisci.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="*:m-0">
                <AccordionTrigger className="mrounded px-4 text-xl uppercase hover:bg-accent/20">
                  Question Two
                </AccordionTrigger>
                <AccordionContent className="my-2 rounded bg-muted/20 p-4 text-xl">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Repellat amet impedit veniam facere, unde, distinctio iusto
                  porro corporis doloremque ipsam nulla error aut ex! Beatae
                  quisquam distinctio perspiciatis fugiat adipisci.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="*:m-0">
                <AccordionTrigger className="rounded px-4 text-xl uppercase hover:bg-accent/20">
                  Question Three
                </AccordionTrigger>
                <AccordionContent className="my-2 rounded bg-muted/20 p-4 text-xl">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Repellat amet impedit veniam facere, unde, distinctio iusto
                  porro corporis doloremque ipsam nulla error aut ex! Beatae
                  quisquam distinctio perspiciatis fugiat adipisci.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4" className="*:m-0">
                <AccordionTrigger className="rounded px-4 text-xl uppercase hover:bg-accent/20">
                  Question Four
                </AccordionTrigger>
                <AccordionContent className="my-2 rounded bg-muted/20 p-4 text-xl">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Repellat amet impedit veniam facere, unde, distinctio iusto
                  porro corporis doloremque ipsam nulla error aut ex! Beatae
                  quisquam distinctio perspiciatis fugiat adipisci.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="p-2">
            <CustomHeader text="OUR PRICES" fontSizeRem={2} />
            <Table className="mx-auto my-0 max-w-md text-xl">
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Procedure One</TableCell>
                  <TableCell className="font-sans">$100</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Procedure Two</TableCell>
                  <TableCell className="font-sans">$200</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Procedure Three</TableCell>
                  <TableCell className="font-sans">$300</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Procedure Four</TableCell>
                  <TableCell className="font-sans">$500</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </section>
    </div>
  );
}
