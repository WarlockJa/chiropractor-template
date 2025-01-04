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

export default async function ServicePageColdLaser({
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
            <h1>What&apos;s cold laser therapy?</h1>
            <p>
              Cold laser therapy is low-intensity laser therapy that stimulates
              healing while using low levels of light. The technique is called
              “cold” laser therapy because the low levels of light aren&apos;t
              enough to heat your body&apos;s tissue. The level of light is low
              when compared to other forms of laser therapy, such as those used
              to destroy tumors and coagulate tissue. Surgical and aesthetic
              lasers heat the tissue being treated. True to its name, cold laser
              therapy does not.
            </p>

            <h2>Cold laser therapy is also known as:</h2>
            <ul>
              <li>low-level laser therapy (LLLT)</li>
              <li>low-power laser therapy (LPLT)</li>
              <li>soft laser biostimulation</li>
              <li>photobiomodulation</li>
            </ul>

            <h2>How does cold laser therapy work?</h2>

            <div className="text-justify">
              <CustomServerImage
                dbImageName={serviceData.dbImageName}
                className="mx-auto max-w-96 rounded-md shadow-lg shadow-accent sm:float-right sm:m-4"
              />
              During this procedure, different wavelengths and outputs of
              low-level light are applied directly to a targeted area. The body
              tissue then absorbs the light. The red and near-infrared light
              cause a reaction, and the damaged cells respond with a
              physiological reaction that promotes regeneration. Superficial
              tissue is commonly treated with wavelengths between 600 and 700
              nanometers (nm). For deeper penetration, wavelengths between 780
              and 950 nm are used. Although you&apos;ll feel the laser device
              touching your skin, the procedure is painless and noninvasive.
              There will be no sound and you&apos;ll feel no vibration or heat.
              Each treatment typically takes only a few minutes. What&apos;s
              cold laser therapy used for? Doctors, dentists, physical
              therapists, and other medical professionals use cold laser therapy
              in a variety of ways. The main uses for cold laser therapy are
              tissue repair and relief from pain and inflammation.
            </div>

            <h2>Is cold laser therapy for you?</h2>
            <div>
              The use of cold laser therapy is growing in traditional medical
              practice and as a complementary or alternative therapy. It&apos;s
              approved by the U.S. Food and Drug Administration (FDA) for a
              number of conditions. Cold laser therapy is considered safe when
              performed under the care of a doctor or qualified practitioner. On
              the plus side, it&apos;s also noninvasive and painless. It
              doesn&apos;t require medication or other preparation either. That
              being said, cold laser therapy shouldn&apos;t be used on
              carcinomas or cancerous lesions. It should also be avoided on the
              thyroid or eyes for home use. Since the effect of cold laser
              therapy on unborn children is unknown, it&apos;s suggested that
              pregnant women avoid this type of treatment. One of the drawbacks
              of this therapy may be time. While each cold laser therapy session
              only takes a few minutes, it may take as long as a month (with as
              many as four treatments a week) before you can gauge its
              effectiveness.
            </div>
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
