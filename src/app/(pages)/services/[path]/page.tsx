import { getServiceData } from "@/components/pages/Services/servicesData";
import ServiceDescription from "./_components/ServiceDescription";
import { notFound } from "next/navigation";

export default function ServicePage({
  params: { path },
}: {
  params: { path: string };
}) {
  const serviceData = getServiceData({ path });
  if (!serviceData) return notFound();

  return <serviceData.page serviceData={serviceData} />;
}

export const runtime = "edge";
