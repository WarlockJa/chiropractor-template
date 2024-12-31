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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CustomImage from "@/components/UniversalComponents/CustomImage";

export default function ServicePageFitness({
  serviceData,
}: {
  serviceData: ServiceData;
}) {
  return (
    <div className="mt-24 md:mt-28">
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
              <CustomImage
                dbImageName={serviceData.dbImageName}
                className="mx-auto max-w-96 rounded-md shadow-lg shadow-accent sm:float-right sm:m-4"
              />
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic
              voluptate reiciendis at consequatur sunt, vitae nostrum mollitia
              culpa eaque? Voluptate optio saepe nulla dolores doloremque
              recusandae autem eligendi quo ipsam! Molestias accusamus,
              excepturi alias perspiciatis maxime repudiandae neque veniam,
              temporibus optio provident pariatur recusandae iste? Vero, nisi
              debitis tempore omnis sed id fugit totam atque nam, exercitationem
              saepe ducimus dolorum? Dolorem in labore debitis corporis quod
              aliquid ad sapiente velit. Expedita dicta ducimus aliquid
              assumenda non rem sunt perferendis quos fugiat, debitis libero
              culpa pariatur voluptatum ut nulla amet iste? Nihil omnis quidem
              excepturi dolor necessitatibus laborum enim cumque dolores quaerat
              neque optio magni accusantium rerum tenetur nisi quam veniam quis,
              consequatur exercitationem aliquid reiciendis cum dolorum? Nemo,
              perspiciatis accusamus? Libero omnis reiciendis sint praesentium
              vero dolores, accusantium possimus magnam aperiam maxime tempore?
              Neque error assumenda, molestias aliquid, possimus quibusdam,
              incidunt obcaecati minima quos corrupti cupiditate animi maxime a
              eum. Nulla consectetur placeat, repellat vel repellendus quidem
              iste impedit fuga debitis quisquam, exercitationem nisi, sint
              quod! Provident et architecto pariatur ratione velit ut quaerat
              cupiditate ad quibusdam, quam est veniam!
            </div>
          </div>

          <ul className="ml-12 list-disc leading-8">
            <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
            <li>Perferendis nesciunt, eos, optio reiciendis beatae,</li>
            <li>
              dicta ea quia delectus assumenda saepe cupiditate voluptates?
            </li>
            <li>Vitae eos consequatur obcaecati id alias possimus odit?</li>
          </ul>

          <div className="p-2">
            <CustomHeader text="PEOPLE OFTEN ASK" fontSizeRem={3} />
            <Accordion type="single" collapsible className="shadow">
              <AccordionItem value="item-1">
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
              <AccordionItem value="item-2">
                <AccordionTrigger className="rounded px-4 text-xl uppercase hover:bg-accent/20">
                  Question Two
                </AccordionTrigger>
                <AccordionContent className="my-2 rounded bg-muted/20 p-4 text-xl">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Repellat amet impedit veniam facere, unde, distinctio iusto
                  porro corporis doloremque ipsam nulla error aut ex! Beatae
                  quisquam distinctio perspiciatis fugiat adipisci.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
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
              <AccordionItem value="item-4">
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

          <Card>
            <CardHeader>
              <CardTitle>
                <CustomHeader text="OUR PRICES" fontSizeRem={3} />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table className="mx-auto max-w-md">
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Procedure One</TableCell>
                    <TableCell>$100</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Procedure Two</TableCell>
                    <TableCell>$200</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      Procedure Three
                    </TableCell>
                    <TableCell>$300</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      Procedure Four
                    </TableCell>
                    <TableCell>$500</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
