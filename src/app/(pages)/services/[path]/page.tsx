import ServiceDescription from "./_components/ServiceDescription";
import { getData } from "./_lib/servicesData";
import { notFound } from "next/navigation";

export default function ServicePage({
  params: { path },
}: {
  params: { path: string };
}) {
  const serviceData = getData({ path });
  if (!serviceData) return notFound();

  return <ServiceDescription serviceData={serviceData} />;
}

export const runtime = "edge";
