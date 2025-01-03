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

export default function ServicePagePediatric({
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
            {/* {t(serviceData.title)} */}

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
              Introducing your infant or child to chiropractic care at a young
              age can be one of the best ways to help set them up for a lifetime
              of good health. Pediatric chiropractors can help kids in a myriad
              of ways - from promoting healthier sleep and boosting immunity to
              improving behavioral issues and even aiding in digestion. In
              infants, chiropractic care can also help sooth colic and reflux
              symptoms, among many other benefits. Could your child benefit from
              seeing a chiropractor? Here&apos;s are list of the top 10 benefits
              of pediatric chiropractic care.
            </div>
            <h2>What is a Pediatric Chiropractor?</h2>
            <p>
              Pediatric chiropractic care is a specialty that concentrates on
              treating infants, toddlers, children, and teens in order to help
              align their spine and balance their nervous system. It promotes a
              broad spectrum of benefits such as supporting growth milestones,
              enhancing immune health, aiding in digestion, reducing ear
              infections and allergies, improving sleep, and more. A pediatric
              chiropractor is has undergone specialized training to ensure that
              the care, evaluation, and adjustments they provide to kids
              correspond properly to their specific age, body type, and unique
              requirements. Chiropractic adjustments on kids are safe,
              non-invasive, and use only light and gentle pressure to achieve
              optimal results. Many parents comment that it looks like just a
              gentle touch, tickle, or massage. On bigger kids, we can
              incorporate fun activities into their adjustments, such as
              jumping. While there are various reasons you may decide to see a
              pediatric chiropractor, here is our list of the top 10 benefits:
            </p>
            <h3>It Balances your Child&apos;s Nervous System</h3>
            <p>
              When our spine is out of alignment, this can affect so much more
              than just our posture, aches, and pains. The spine is the central
              network of our entire system- physical, mental, emotional, and
              energetic. Our children&apos;s spine and nervous system are very
              delicate as they are still growing and developing. Regular
              adjustments to a child&apos;s back and neck will invite their
              system to feel more synchronized and settled. A balanced nervous
              system translates into many areas of their life, promoting
              wellbeing, greater immunity, and healthy spinal development.
            </p>
            <h3>It Revitalizes Children&apos;s Immune Health</h3>
            <p>
              Our immune response becomes activated based on neurotransmitters
              which are dependent on the health and functionality of our spinal
              cord. Something as simple as a pinched nerve or as severe as a
              slipped disc can disrupt the ability of our immune system to
              respond to outside threats. This is especially important for
              toddlers and children who are still building their immune health
              and exposed to more germs than adults. It has been found that
              children who see a pediatric chiropractor regularly get fewer
              colds than those who have never seen one.
            </p>
            <h3>It Promotes Healthier Sleep Cycles</h3>
            <p>
              opractic care can help a child sleep better through the night and
              feel more rested and calm. After regular pediatric chiropractic
              visits, parents have noted positive changes in their child&apos;s
              sleep patterns such as earlier bedtimes, fewer late night
              wake-ups, more consistent sleep behavior or naps, decreased
              lethargy, and a more balanced flow of energy levels.
            </p>
            <h3>It Improves Digestion and Constipation</h3>
            <p>
              If your child is experiencing constipation or other digestive
              issues, a pediatric chiropractor can offer your little one an
              extremely gentle and non-invasive adjustment as opposed to
              medications or other harsh treatments. Light adjustments
              administered to the child&apos;s spine and neck have been known to
              relieve constipation and numerous digestive issues. Chiropractic
              care is intended to help release trapped gas from the joints which
              can improve blood circulation. Healthier blood flow is a super
              simple way to encourage more regular digestion. Not to mention,
              proper alignment of the mid-low back, hips and pelvic area can
              relieve tension on the intestines and promote a more easeful
              experience.
            </p>
            <h3>It Reduces Allergies, Ear Infections, and Asthma</h3>
            <p>
              Have you ever noticed the need to blow your nose after an
              adjustment? Our lymphatic system is dependent on the spine and
              surrounding muscles for proper flow and functionality. Neck
              adjustments can often help with lymphatic drainage. Additionally,
              the biomechanics of the cervical vertebrae can determine when the
              musculoskeletal system is not functioning properly. If your child
              experiences difficulty breathing, mobilizing the thoracic spine
              (upper-middle back) can help them to breathe easier and alleviate
              symptoms of asthma. For kids with consistent allergies, asthma, or
              ear infections, please be sure to accompany chiropractic treatment
              with care from your pediatrician or regular health care provider.
            </p>
            <h3>It Promotes Post-birth Recovery</h3>
            <p>
              During and following childbirth, a baby can experience a variety
              of physical traumas such as crooked spines, torticollis,
              underdeveloped digestive systems, infants are especially
              vulnerable to trauma during birth. Infant chiropractic care can
              alleviate these traumas, promoting post-birth recovery and helping
              babies grow and thrive.
            </p>
            <h3>
              It Supports Growth Milestones and Aids in Posture, Back Pain, and
              Injuries
            </h3>
            <p>
              Although our kids may seem rubbery and indestructible at times,
              childhood is a key time for habitual postures and patterns to
              start setting in. The developmental years are the perfect time to
              preserve the abundant health our kids are born with rather than
              needing to go back to &quot;fix&quot; or heal issues that may
              arise throughout their life. Kids are often very active and
              sometimes take falls that we may not know how significantly have
              impacted their spinal alignment. It can be helpful to have a
              pediatric chiropractor monitor our child&apos;s health on a
              regular basis - especially for kids who are not old enough to
              effectively communicate their needs.
            </p>
            <h3>It Improves Mood, Mental Focus and ADHD</h3>
            <p>
              It&apos;s important to clarify that chiropractic care does not
              necessarily “treat” ADHD. However, it can impact children
              positively who have been diagnosed and it is known to be a safe
              and natural treatment for the symptoms. Regular adjustments help
              to support more efficient and effective nerve flow. Spinal
              misalignments can often lead to behavioral issues as well as
              changes in brain functionality. Adjusting your child&apos;s spine
              restores balance to their brain, body, and their entire nervous
              system which can lead to higher levels of concentration, improved
              mood and focus. Pediatric chiropractic care is designed to offer a
              whole body approach to wellness. In addition to the adjustments,
              some practitioners offer a variety of sound and light frequencies
              as part of their therapy. Your provider may also recommend certain
              dietary changes and exercises. It has been found that by
              eliminating certain foods, introducing moderate exercise and
              healthier sleep patterns can help ADHD symptoms to subside. These
              recommendations could be useful not only for ADHD but help to
              alleviate headaches, balance the nervous system, regulate sleep,
              enhance their immune system and so much more!
            </p>
            <h3>It Relieves Tension, Migraines and Headaches</h3>
            <p>
              Headaches can be linked to innumerable causes. In a world full of
              loud noises, bright lights, countless ingredients, radiation, and
              toxins, it&apos;s best to try to minimize the factors that may be
              playing a role in irritating our system. Tension in the upper
              cervical and neck area can often be a significant cause of
              recurring headaches and migraines. How does this issue first
              arise? Misalignment of the neck is quite common in both kids and
              adults. More and more, we find that kids develop a slouched
              posture and that the cervical or natural lordotic curve in their
              spine becomes diminished due to looking down at devices, texting
              while walking, and lack of movement for long periods of time.
              Movement is certainly medicine when it comes to your spine. While
              it&apos;s impossible to consistently monitor our child&apos;s
              posture, behavior, and activity, seeing a pediatric chiropractor
              is a wonderful way to ensure they are receiving the care they need
              in this busy life. Relieving the tension in their neck and
              encouraging a healthy cervical curve is sure to help alleviate the
              headaches and migraines they may be experiencing.
            </p>
            <h3>It Supports Infant Care</h3>
            <p>
              Chiropractic care for infants has been found to relieve and soothe
              colicky babies. In fact, a 3-month long study found that 94% of
              subjects experienced improved colic symptoms after receiving
              regular chiropractic adjustments. Subluxation misalignment in
              infants is the most common reason for colic. This means that when
              their nervous system becomes imbalanced, other parts of their body
              start to work improperly. This can lead to dysfunction in a
              baby&apos;s digestive system, for example and may cause them to
              start crying intensely. In addition to easing the symptoms of
              colic, there are many benefits to chiropractic care for newborns
              such as:
            </p>
            <ul>
              <li>Reducing Fussiness</li>
              <li>Promoting better sleep</li>
              <li>Supporting neurological development and growth milestones</li>
              <li>Enhancing the immune system</li>
              <li>Pre and post treatment of lip-ties and tongue-ties</li>
            </ul>
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
