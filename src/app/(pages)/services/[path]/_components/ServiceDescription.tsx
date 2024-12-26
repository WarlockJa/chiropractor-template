import HeaderImage from "@/components/UniversalComponents/HeaderImage";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { ServiceData } from "@/components/pages/Services/servicesData";

export default async function ServiceDescription({
  serviceData,
}: {
  serviceData: ServiceData;
}) {
  // const t = await getTranslations("Cards");

  return (
    <div className="mt-28">
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
          <h1 className="text-center text-[clamp(2rem,12vw,4rem)] uppercase drop-shadow-[4px_4px_2px_rgba(0,0,0,0.8)]">
            {/* {t(serviceData.title)} */}
            {serviceData.title}
          </h1>
        </div>
      </HeaderImage>

      <section className="mx-auto my-16 flex flex-col justify-between overflow-hidden rounded-xl p-8 shadow-xl lg:max-w-screen-lg">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut quos at
          illo error quibusdam id nostrum alias ipsam, mollitia, aspernatur sint
          aperiam rerum, debitis consectetur obcaecati voluptatum laboriosam ea
          quis?
        </p>
        <h2 className="mb-8 mt-4 text-center text-3xl">
          {/* {t(serviceData.title)} */}
          {serviceData.title}
        </h2>
        <ul className="ml-12 list-disc leading-8">
          <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
          <li>Perferendis nesciunt, eos, optio reiciendis beatae,</li>
          <li>dicta ea quia delectus assumenda saepe cupiditate voluptates?</li>
          <li>Vitae eos consequatur obcaecati id alias possimus odit?</li>
        </ul>

        <h2 className="mb-8 mt-4 text-center text-3xl">
          {/* {t(serviceData.title)} repair costs: */}
          {serviceData.title}
        </h2>
        <Table className="mx-auto max-w-md">
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Service 1</TableCell>
              <TableCell>$100</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Service 2</TableCell>
              <TableCell>$200</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Service 3</TableCell>
              <TableCell>$300</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Service 4</TableCell>
              <TableCell>$500</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </section>
    </div>
  );
}
