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
import CustomImage from "@/components/UniversalComponents/CustomImage";

export default function ServicePageDetox({
  serviceData,
}: {
  serviceData: ServiceData;
}) {
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
            {serviceData.title}
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

            <h2>Do Detox Diets and Cleanses Really Work?</h2>
            <div className="text-justify">
              <CustomImage
                dbImageName={serviceData.dbImageName}
                className="mx-auto max-w-96 rounded-md shadow-lg shadow-accent sm:float-right sm:m-4"
              />
              Detoxification (detox) diets are more popular than ever. These
              diets claim to cleanse your blood and eliminate harmful toxins
              from your body. However, it is not entirely clear how they do
              this, what specific compounds they&apos;re supposed to eliminate,
              and if they even work. Read on for a detailed review of detox
              diets, including their benefits and side effects.
            </div>

            <h2>What is a detox?</h2>
            <p>
              Detox diets are generally short-term dietary interventions
              designed to eliminate toxins from your body. A typical detox diet
              involves a period of fasting, followed by a strict diet of fruit,
              vegetables, fruit juices, and water. Sometimes a detox also
              includes herbs, teas, supplements, and colon cleanses or enemas.
              This claims to:
            </p>

            <ul>
              <li>rest your organs by fasting</li>
              <li>stimulate your liver to get rid of toxins</li>
              <li>promote toxin elimination through feces, urine, and sweat</li>
              <li>improve circulation</li>
              <li>provide your body with healthy nutrients</li>
            </ul>

            <p>
              Detox therapies are most commonly recommended because of potential
              exposure to toxic chemicals in the environment or your diet. These
              include pollutants, synthetic chemicals, heavy metals, and other
              harmful compounds. These diets also claim to help improve your
              immune system, digestion, energy levels, and aide in weight loss.
              However, human research on detox diets is lackingTrusted Source,
              and the handful of studies that exist are significantly flawed.
            </p>
            <h2>The most common ways to detox</h2>
            <p>
              There are many ways to do a detox diet — ranging from total
              starvation fasts to simpler food modifications. Most detox diets
              involveTrusted Source at least 1 of the following:
            </p>
            <ul>
              <li>fasting</li>
              <li>only drinking juices</li>
              <li>using dietary supplements</li>
              <li>using enemas or laxatives to cleanse the colon</li>
              <li>using herbs</li>
              <li>
                avoiding all allergenic foods, then slowly reintroducing them
              </li>
              <li>using a sauna</li>
            </ul>
            <p>Detox diets can vary in intensity and duration.</p>

            <h2>Which toxins are eliminated?</h2>

            <p>
              Detox diets rarely identify the specific toxins they aim to
              remove. The mechanisms by which they work are also unclear. In
              fact, there is little to no evidenceTrusted Source that detox
              diets remove any toxins from your body. What&apos;s more, your
              body is capable of cleansing itself through the liver, feces,
              urine, and sweat. Your liver makes toxic substances harmless, then
              ensures that they&apos;re released from your body. Despite this,
              there are a few chemicals that may not be as easily removed by
              these bodily processes, including persistent organic pollutants
              (POPs), phthalates, bisphenol A (BPA), and heavy metals. These
              tend to accumulate in fat tissue or blood and can take a very long
              time — even years — for your body to flush. However, these
              compounds generally are removed from or limited in commercial
              products today. Overall, there is little evidence that detox diets
              help eliminate any of these compounds.
            </p>

            <h2>How effective are these diets?</h2>

            <p>
              Some people report feeling more focused and energetic during and
              after detox diets. However, this improved well-being may simply be
              due to eliminating processed foods, alcohol, and other unhealthy
              substances from your diet. You may also be getting vitamins and
              minerals that were lacking before. That said, many people also
              report feeling very unwell during the detox period.
            </p>
            <h3>Effects on weight loss</h3>
            <p>
              Very few scientific studiesTrusted Source have investigated how
              detox diets impact weight loss. While some people may lose a lot
              of weight quickly, this effect seems to be due to loss of fluid
              and carb stores rather than fat. This weight is usually regained
              quickly once you go off the cleanse. An older 2015 studyTrusted
              Source examined Korean women who had overweight while on the lemon
              detox diet. This diet limits you to a mixture of organic maple or
              palm syrups and lemon juice for seven days. The results showed
              that the diet significantly reduced body weight, BMI, body fat
              percentage, waist-to-hip ratio, waist circumference, markers of
              inflammation, insulin resistance, and circulating leptin levels.
              If a detox diet involves severe calorie restriction, it will
              typically cause weight loss and improve metabolic health. However,
              it is important to remember that it is unlikely to help you keep
              weight off in the long term.{" "}
            </p>

            <h3>Detox diets, short-term fasting, and stress</h3>
            <p>
              Several varieties of detox diets may have effects similar to those
              of short-term or intermittent fasting. Short-term fasting may
              improveTrusted Source various disease markers in some people,
              including improved leptin and insulin sensitivity. However, these
              effects do not apply to everyone. ResearchTrusted Source shows
              that detox diets can lead to increased stress and binge eating.
            </p>

            <h2>Potential benefits</h2>

            <p>
              A few aspects of detox diets may have health benefits, such as:
            </p>

            <ul>
              <li>avoiding dietary sources of heavy metals and POPs</li>
              <li>avoiding processed foods</li>
              <li>drinking more water</li>
            </ul>
            <p>
              However, these aspects are generally linked to improved health,
              regardless of whether you are on a detox diet.
            </p>

            <h2>Safety and side effects</h2>
            <p>
              Before doing any sort of detox, it is important to consider the
              possible side effects. Possible side effects of a detox diet
              include:
            </p>
            <h3>Severe calorie restriction</h3>
            <p>
              Several detox diets recommend fasting or severe calorie
              restriction. Short-term fasting and limited calorie intake can
              result in fatigue, irritability, and bad breath. Long-term fasting
              can resultTrusted Source in energy, vitamin, and mineral
              deficiencies, electrolyte imbalance, and even death. Colon
              cleansing methods, which are sometimes recommended during detoxes,
              can cause dehydration, cramping, bloating, nausea, and vomiting.
            </p>
            <h3>Overdosing</h3>
            <p>
              Some detox diets may pose the risk of overdosing on supplements,
              laxatives, diuretics, and even water. There is a lack of
              regulation and monitoring in the detox industry, and many detox
              foods and supplements may not have any scientific basis. In the
              worst cases, the ingredient labels of detox products may be
              inaccurateTrusted Source. This can increase your risk of
              overdosing, potentially resulting in serious and even fatal
              effects.
            </p>

            <h2>The bottom line</h2>
            <p>
              Your body is frequently exposed to toxic substances. However, most
              of the time, it can remove them without additional help. While
              detox diets may seem tempting, their benefits likely have nothing
              to do with removing toxins, but rather with eliminating various
              unhealthy foods. A more beneficial approach can involve eating
              healthier and improving your lifestyle rather than going on a
              potentially dangerous cleanse.
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
