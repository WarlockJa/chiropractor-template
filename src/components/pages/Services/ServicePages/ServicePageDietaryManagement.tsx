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

export default function ServicePageDietaryManagement({
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

            <div className="text-justify">
              <CustomServerImage
                dbImageName={serviceData.dbImageName}
                className="mx-auto max-w-96 rounded-md shadow-lg shadow-accent sm:float-right sm:m-4"
              />
              Healthy eating means ensuring your diet includes a variety of
              healthy, nutritious foods and drinks. Eating the right foods can
              give you energy, improve your well-being, and help you to feel
              healthier. We explain more about healthy eating, the differences
              between eating healthy and dieting, and how working with a
              nutritional professional can help you.
            </div>
            <h2>What is healthy eating and why is it important?</h2>
            <p>
              Healthy eating consists of three main ideas that aim to make you
              feel energised, balanced and above all, healthier. Healthy eating
              promotes the long-term aim of maintaining a well-balanced diet.
              Having a healthy diet is important for your health and well-being.
              Eating a wide variety of foods, and ensuring that you don&apos;t
              eat too much salt, sugar, or saturated fats is essential.{" "}
            </p>
            <h3>What are the benefits of eating healthily?</h3>
            <p>
              Healthy eating has numerous benefits for children and adults.
              These can include:
            </p>
            <ul>
              <li>improving skin, teeth, and eye health</li>
              <li>helping you to live a longer life</li>
              <li>boosting your natural immunity</li>
              <li>
                lowering your risk of heart disease, type 2 diabetes, and some
                cancers
              </li>
              <li>supporting digestive system function</li>
              <li>strengthening bones and supporting muscles</li>
              <li>helping achieve or maintain a healthy weight</li>
              <li>
                supporting brain development and healthy growth in children and
                teens
              </li>
            </ul>
            <h3>What are the main ideas for healthy eating?</h3>
            <p>The three main ideas for healthy eating:</p>
            <ul>
              <li>eating a balanced diet</li>
              <li>having a healthy attitude towards food</li>
              <li>understanding the environmental impact of your diet</li>
            </ul>
            <p>
              Kick-starting a positive eating regime can be life-changing but
              for some a little overwhelming. Consulting a professional
              nutritionist can help ensure you are achieving your food lifestyle
              changes in a positive and healthy way, paving a clear,
              individually tailored plan for your journey.
            </p>
            <h2>Healthy eating and dieting</h2>
            <p>
              It&apos;s important to note that healthy eating is different from
              dieting, and doesn&apos;t aim to reduce a significant amount of
              weight in a short space of time. It&apos;s more than losing
              weight, it focuses on all-around good health and its benefits.
              &apos;Dieting&apos; is used to describe the process of cutting
              down or cutting out certain food groups, typically to aid rapid
              weight-loss. Diets aren&apos;t necessarily a healthy option: they
              can lead to dramatic weight-loss, but because they are only
              short-term fixes, weight often creeps back on after the diet is
              finished often leading to an unhealthy &apos;yo-yo&apos; effect of
              the body&apos;s weight.
            </p>
            <h3>The dangers of fad diets</h3>
            <p>
              Fad diets, often promising longer life and rapid weight-loss based
              on pseudoscience theories, have zero scientific proof that they
              work and can make you feel very unwell, damaging to your health
              with long-term health issues.
            </p>
            <h3>Some diets can make you feel unwell</h3>
            <p>
              Crash diets often portray weight-loss as a quick, achievable
              process by considerably reducing the number of calories you
              consume. Due to these diets being unbalanced, you might start
              feeling ill as your body is in shock.
            </p>
            <h3>Excluding certain food types can be dangerous</h3>
            <p>
              Some diets cut out certain food groups altogether such as dairy
              products, fish, wheat or meat. This can prevent you from gaining
              important nutrients that help your body function properly. If you
              suspect you have an allergy or intolerance to a certain food
              group, consult a doctor/dietitian for an official diagnosis.
            </p>
            <h2>How to eat healthily</h2>
            <p>
              Ensuring you eat a wide variety of different foods can help you to
              meet your micronutrient needs. Making healthier choices and
              learning more about different food groups, eating a balanced diet,
              and what foods you should try not to eat too often can all help.
              It&apos;s important to make sure you get enough calories to help
              fuel how active you are. This means both eating and drinking
              enough to give you energy. When we eat too much, we end up storing
              the excess as fat. When we don&apos;t eat enough, we lose weight.{" "}
            </p>
            <h3>What are healthy foods to eat?</h3>
            <p>
              The NHS recommends basing your meats on higher fibre, starchy
              carbohydrates such as bread, potatoes, rice, pasta, and cereals.
              These should make up around about a third of what you eat. If you
              can, opt for whole grain varieties as they offer more fibre and
              help you feel fuller for longer. The fibre in whole grains helps
              feed the health-promoting bacteria in your gut, helping to prevent
              constipation and bloating. They also contain more vitamins and
              minerals, vital for energy production and overall good health.
            </p>
            <blockquote>
              There are two types of fibre - soluble and insoluble. Soluble
              fibre is found in fruits, vegetables, beans, lentils, pulses and
              porridge oats. Insoluble fibre is found in whole grains, brown
              rice, seeds and nuts. We need to have a balance of both soluble
              and insoluble fibre. Soluble fibre helps to stabilise blood sugar
              levels whilst insoluble fibre provides lots of roughage, moving
              waste through your digestive system and making your stools more
              bulky and solid but softer and easier to pass.
            </blockquote>
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
