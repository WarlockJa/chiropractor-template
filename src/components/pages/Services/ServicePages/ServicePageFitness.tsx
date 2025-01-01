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

export default function ServicePageFitness({
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
              <CustomImage
                dbImageName={serviceData.dbImageName}
                className="mx-auto max-w-96 rounded-md shadow-lg shadow-accent sm:float-right sm:m-4"
              />
              Many people strive to be fit. Fitness, after all, is synonymous
              with health. Having a high level of overall fitness is linked with
              a lower risk of chronic disease, as well as a better ability to
              manage health issues that do come up. Better fitness also promotes
              more functionality and mobility throughout one&apos;s life span.
              And in the short term, being active can help your day-to-day
              functioning, from better mood to sharper focus to better sleep.
              Simply put: Our bodies are meant to move, and they tend to
              function better when we&apos;re more fit. That said, it&apos;s
              also important to know that there are many different ways to be
              fit (think of a ballet dancer versus a bodybuilder or a sprinter
              versus a gymnast). And fitness does not have a singular “look.” In
              fact, appearance can&apos;t necessarily tell you about
              someone&apos;s habits, whether they&apos;re actually physically
              active, or even whether they&apos;re fit at all.
            </div>

            <h2>What It Means to Be Fit</h2>
            <p>
              According to the Physical Activity Guidelines for Americans set
              forth by the U.S. Department of Health and Human Services (HHS),
              there are five components of physical fitness:
            </p>
            <ul>
              <li>
                Cardiorespiratory Fitness Your VO2 max is a commonly used
                measure of this. It&apos;s your body&apos;s ability to uptake
                and utilize oxygen (which feeds all of your tissues), something
                that is directly related to your health and quality of life,
                says Abbie Smith-Ryan, PhD, professor and director of the
                Applied Physiology Laboratory at the University of North
                Carolina in Chapel Hill.
              </li>
              <li>
                Musculoskeletal Fitness This includes muscle strength,
                endurance, and power.
              </li>
              <li>Flexibility This is the range of motion of your joints.</li>
              <li>
                Balance This is your ability to stay on your feet and steady to
                avoid falls.
              </li>
              <li>Speed This is how quickly you can move.</li>
            </ul>

            <p>
              A frequently cited peer-reviewed research paper from 1985 defined
              the difference between the terms “physical activity” (bodily
              movement resulting in energy expenditure), “exercise” (planned and
              structured physical activity), and “physical fitness.” The paper
              defined physical fitness as a set of attributes that people have
              or achieve that determines their ability to carry out daily tasks
              with vigor and alertness, without undue fatigue. Cardiorespiratory
              endurance, muscular endurance, muscular strength, body
              composition, and flexibility are components that can be used to
              measure fitness, also according to that paper. In the real world,
              fitness translates to function, says Dr. Smith-Ryan. For example,
              can you carry your groceries or walk up the stairs without getting
              winded? Can you run around the backyard with your kids? Can you
              climb the stairs? Exercise is distinct from fitness because
              exercise is what you do to improve your fitness.
            </p>

            <h2>Types of Fitness</h2>
            <p>
              There are a few main components of fitness, all of which are
              important for building a well-rounded exercise routine. Below, you
              will find the ones included in the Physical Activity Guidelines
              for Americans, which HHS highlights as the components that should
              be included in weekly exercise. (It&apos;s worth noting that many
              definitions of fitness include other components as well, such as
              endurance, muscular endurance, power, speed, balance, and agility
              — as mentioned above.){" "}
            </p>
            <h3>Aerobic (Cardiovascular) Exercise</h3>
            <p>
              Aerobic exercise is the foundation of every fitness program — and
              for good reason. Also called cardiovascular exercise or cardio,
              this type of physical activity increases your heart rate and
              breathing rate, which improves your cardiorespiratory fitness,
              according to the American Heart Association. Aerobic exercise
              includes activities like brisk walking, running, cycling,
              swimming, aerobic fitness classes (like kickboxing), tennis,
              dancing, yard work, tennis, and jumping rope, per the Physical
              Activity Guidelines.
            </p>

            <h3>Strength Training</h3>
            <p>
              Strength training is an important way to improve mobility and
              overall functioning, particularly as you get older. “As you age,
              you lose muscle mass, which can have a significant impact on the
              quality of life. Strength exercises build bones and muscle, and
              more muscle protects your body from falls and the fractures that
              can happen in older age,” says Robert Sallis, MD, a family
              medicine doctor at Kaiser Permanente in Fontana, California, and
              chairman of the Exercise Is Medicine initiative with the American
              College of Sports Medicine (ACSM). According to the ACSM, the
              definition of strength or resistance training is exercise that is
              “designed to improve muscular fitness by exercising a muscle or a
              muscle group against external resistance.” Activities that answer
              this call include lifting weights, using resistance bands or your
              body weight, carrying heavy loads, and even strenuous gardening,
              per the Physical Activity Guidelines from HHS.
            </p>

            <h3>Flexibility and Mobility</h3>
            <p>
              Flexibility and mobility are both important components of healthy
              movement, according to the International Sports Sciences
              Association. However, they are not synonymous. Flexibility refers
              to the ability of tendons, muscles, and ligaments to stretch,
              while mobility refers to the body&apos;s ability to take a joint
              through its full range-of-motion. There is no specific
              recommendation for the number of minutes you should do activities
              that improve flexibility or mobility (such as stretching), and the
              health benefits of those activities are not known because of a
              lack of research on the topic, according to the Physical Activity
              Guidelines from HHS. But the guidelines note that flexibility
              exercises are important for physical fitness. And the guidelines
              do recommend that older adults incorporate balance training into
              their weekly fitness routine. Evidence suggests that regular
              exercise that includes balance training can significantly reduce
              older adults&apos; risk of falls, which can cause serious and
              debilitating injuries, among other consequences.
            </p>
            <h2>Rest and Recovery</h2>
            <p>
              Building in rest and recovery days allows time for your body to
              repair the natural damage that occurs to muscles during exercise.
              Exercise, by definition, puts stress on the muscles and the body.
              The repairing or healing of that stress is how you get stronger
              (and fitter). But you need to give the body adequate rest after a
              workout for that recovery process to happen. Recovery days can
              include no physical activity at all or they may look like an
              active recovery day, which means doing low-intensity, low-impact
              forms of exercise, such as walking or gentle yoga. Dr. Sallis
              generally recommends doing some activity every day, such as a
              10-minute walk outdoors. For rest and recovery days, the idea
              isn&apos;t that you&apos;re immobile on your couch; it&apos;s just
              that you&apos;re not pushing yourself to a point where physical
              activity feels strenuous or challenging.{" "}
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
