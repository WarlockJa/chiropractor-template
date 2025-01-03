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

export default function ServicePageHeatAndCold({
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
              Heat therapy helps improves blood flow to the area where the heat
              is applied. It&apos;s best for muscle pain or stiffness. Cold
              therapy helps reduce inflammation. It&apos;s most helpful when
              used for acute injuries and pain. We treat everything from
              arthritis to pulled muscles to inflammation with ice packs or
              heating pads. Treating pain with hot and cold can be extremely
              effective for a number of different conditions and injuries, and
              easily affordable. The tricky part is knowing what situations
              calls for hot, and which calls for cold. Sometimes a single
              treatment will even include both. As a general rule of thumb, use
              ice for acute injuries or pain, along with inflammation and
              swelling. Use heat for muscle pain or stiffness.
            </div>

            <h2>Heat therapy</h2>
            <h3>How it works</h3>
            <p>
              Heat therapy works by improving circulation and blood flow to a
              particular area due to increased temperature. Increasing the
              temperature of the afflicted area even slightly can soothe
              discomfort and increase muscle flexibility. Heat therapy can relax
              and soothe muscles and heal damaged tissue.
            </p>
            <h3>Types</h3>
            <p>
              There are two different types of heat therapy: dry heat and moist
              heat. Both types of heat therapy should aim for “warm” as the
              ideal temperature instead of “hot.”
            </p>
            <ul>
              <li>
                Dry heat (or “conducted heat therapy”) includes sources like
                heating pads, dry heating packs, and even saunas. This heat is
                easy to apply.
              </li>
              <li>
                Moist heat (or “convection heat”) includes sources like steamed
                towels, moist heating packs, or hot baths. Moist heat may be
                slightly more effective as well as require less application time
                for the same resultsTrusted Source.
              </li>
            </ul>
            <p>
              Professional heat therapy treatments can also be applied. Heat
              from an ultrasound, for example, can be used to help pain in
              tendonitis. When applying heat therapy, you can choose to use
              local, regional, or whole body treatment. Local therapy is best
              for small areas of pain, like one stiff muscle. You could use
              small heated gel packs or a hot water bottle if you only want to
              treat an injury locally. Regional treatment is best for more
              widespread pain or stiffness, and could be achieved with a steamed
              towel, large heating pad, or heat wraps. Full body treatment would
              include options like saunas or a hot bath.
            </p>
            <h3>When not to use</h3>
            <p>
              There are certain cases where heat therapy should not be used. If
              the area in question is either bruised or swollen (or both), it
              may be better to use cold therapy. Heat therapy also
              shouldn&apos;t be applied to an area with an open wound. People
              with certain pre-existing conditions should not use heat therapy
              due to higher risk of burns or complications due to heat
              application. These conditions include:
            </p>
            <ul>
              <li>diabetes</li>
              <li>dermatitis</li>
              <li>vascular diseases</li>
              <li>deep vein thrombosis</li>
              <li>multiple sclerosis (MS)</li>
            </ul>
            <p>
              If you have either heart disease or hypertension, ask your doctor
              before using heat therapy. If you are pregnant, check with your
              doctor before using saunas or hot tubs.
            </p>
            <h3>Applying heat therapy</h3>
            <p>
              Heat therapy is often most beneficial when used for a good amount
              of time, unlike cold therapy, which needs to be limited. Minor
              stiffness or tension can often be relieved with only 15 to 20
              minutes of heat therapy. Moderate to severe pain can benefit from
              longer sessions of heat therapy like warm bath, lasting between 30
              minutes and two hours.
            </p>
            <h2>Cold therapy</h2>
            <h3>How it works</h3>
            <p>
              Cold therapy is also known as cryotherapy. It works by reducing
              blood flow to a particular area, which can significantly reduce
              inflammation and swelling that causes pain, especially around a
              joint or a tendon. It can temporarily reduce nerve activity, which
              can also relieve pain.
            </p>
            <h3>Types</h3>
            <p>
              There are a number of different ways to apply cold therapy to an
              affected area. Treatment options include:
            </p>
            <ul>
              <li>ice packs or frozen gel packs</li>
              <li>coolant sprays</li>
              <li>ice massage</li>
              <li>ice baths</li>
            </ul>
            <p>Other types of cold therapy that are sometimes used include:</p>
            <ul>
              <li>
                cryostretching, which uses cold to reduce muscle spasms during
                stretching
              </li>
              <li>
                cryokinetics, which combines cold treatment and active exercise
                and can useful for ligament sprains
              </li>
              <li>whole-body cold therapy chambers</li>
            </ul>
            <h3>When not to use</h3>
            <p>
              People with sensory disorders that prevent them from feeling
              certain sensations should not use cold therapy at home because
              they may not be able to feel if damage is being done. This
              includes diabetes, which can result in nerve damage and lessened
              sensitivity. You should not use cold therapy on stiff muscles or
              joints. Cold therapy should not be used if you have poor
              circulation.
            </p>
            <h3>Applying cold therapy</h3>
            <p>
              For home treatment, apply an ice pack wrapped in a towel or ice
              bath to the affected area. You should never apply a frozen item
              directly to the skin, as it can cause damage to the skin and
              tissues. Apply cold treatment as soon as possible after an injury.
              Use cold therapy for short periods of time, several times a day.
              Ten to 15 minutes is fine, and no more than 20 minutes of cold
              therapy should be used at a time to prevent nerve, tissue, and
              skin damage. You can elevate the affected area for best results.
            </p>
            <h2>Potential risks</h2>
            <h3>Risks of heat therapy</h3>
            <p>
              Heat therapy should utilize “warm” temperatures instead of “hot”
              ones. If you use heat that&apos;s too hot, you can burn the skin.
              If you have an infection and use heat therapy, there is a chance
              that the heat therapy could increase the risk of the infection
              spreading. Heat applied directly to a local area, like with
              heating packs, should not be used for more than 20 minutes at a
              time. If you experience increased swelling, stop the treatment
              immediately. If heat therapy hasn&apos;t helped lessen any pain or
              discomfort after a week, or the pain increases within a few days,
              make an appointment to see your doctor.
            </p>
            <h3>Risks of cold therapy</h3>
            <p>
              If you&apos;re not careful, cold therapy applied for too long or
              too directly can result in skin, tissue, or nerve damage. If you
              have cardiovascular or heart disease, consult your doctor before
              using cold therapy. If cold therapy hasn&apos;t helped an injury
              or swelling within 48 hours, call your doctor.
            </p>
            <h2>Takeaway</h2>
            <p>
              Knowing when to use cold therapy and when to use heat therapy will
              significantly increase the effectiveness of the treatment. Some
              situations will require both. Arthritic patients, for example, may
              use heat for joint stiffness and cold for swelling and acute pain.
              If either treatment makes the pain or discomfort worse, stop it
              immediately. If the treatment hasn&apos;t helped much with regular
              use in a few days, you can make an appointment to see your doctor
              to discuss other treatment options. It&apos;s also important to
              call your doctor if you develop any bruising or skin changes over
              the course of treatment.
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
