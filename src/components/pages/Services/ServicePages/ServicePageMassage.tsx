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

export default async function ServicePageMassage({
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
              When it comes to rest and relaxation, there&apos;s nothing better
              than a massage. Millions of Americans benefit from massages and
              it&apos;s easy to see why! Massages are great at reducing stress
              and tension, improving range of motion, and even preventing more
              serious medical conditions. But massages are more than just
              something to indulge in on Mother&apos;s Day or a beach vacation.
              Medical massage can provide effective relief from pain, soreness,
              and injury. But what is medical massage therapy and what
              conditions can it help?
            </div>
            <h2>What is Medical Massage?</h2>
            <p>
              Medical massage therapy is designed to strategically target
              medical conditions that are diagnosed by a physician. During your
              medical massage treatment, your therapist will use different
              massage techniques and procedures. Medical massages usually occur
              in 30-minute or 1-hour blocks of time. Consulting a doctor or
              chiropractor first can ensure that you&apos;re receiving the right
              form of treatment. Reasons your doctor might prescribe a medical
              massage include:
            </p>
            <ul>
              <li>Treatment of musculoskeletal issues;</li>
              <li>Physical therapy to build strength and flexibility;</li>
              <li>
                Treatment of sports injuries, car accident injuries, muscle
                pains and cramps, migraines, and edema;
              </li>
              <li>As a complement to psychotherapeutic programs.</li>
            </ul>
            <p>
              Additionally, there are many types of massage that your therapist
              may use, from deep tissue massage to trigger point therapy, and
              even stretching techniques. Your doctor will write specific
              recommendations for your licensed massage therapist to follow and
              will monitor your treatment and recovery.
            </p>
            <h2>The Benefits of Medical Massage</h2>
            <p>
              Medical massage therapy helps relax sore or tight muscles, relieve
              nerve pain, release trigger points, increase blood circulation,
              and reduce inflammation. Additionally, medical massage avoids the
              side effects and dependency issues of prescribed pain medications.
              Medical massage can be used to treat a number of conditions,
              including:
            </p>
            <ul>
              <li>Whiplash</li>
              <li>Herniated Discs</li>
              <li>Sciatica</li>
              <li>Scoliosis</li>
              <li>Headaches</li>
              <li>Back Pain</li>
              <li>Muscle Sprains</li>
              <li>Temporomandibular Joint (TMJ) Disorders</li>
              <li>Soft Tissue Injuries</li>
              <li>Carpal Tunnel Syndrome</li>
            </ul>
            <h2>Can I Get a Medical Massage at a Spa?</h2>
            <p>
              There are many different types of massage. A hot stone or Swedish
              massage is certainly relaxing, but it&apos;s not the same thing as
              a medical massage. A spa massage is a one-time visit for the
              express purpose of comfort and relaxation. At a spa, your massage
              therapist will not have access to your medical history, x-rays, or
              details about your injury. They are also limited on the massage
              techniques they can use, as most spas don&apos;t have a doctor
              on-site. At the most, they may ask you a few questions about your
              body (whether you have any troublesome, sore, or painful areas,
              for example), but once your massage is over, your contact with
              them has ended. A medical massage treatment, on the other hand,
              has a different goal in mind: healing. Rather than a one-time
              visit, you will likely have a series of visits that focus on
              treating a physical medical condition. Your massage sessions might
              even be uncomfortable or painful, as the goal is to treat an
              underlying condition and alleviate pain in the long-term, rather
              than focus on short-term relaxation. Whether you&apos;re receiving
              a sports massage, therapeutic massage, or neuromuscular therapy,
              the goal of a medical massage treatment is to allow your body to
              heal. Your therapist will receive information on your condition
              and medical history from a doctor who is monitoring your recovery.
              At a spa, there is no medical doctor to oversee your treatment.
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
