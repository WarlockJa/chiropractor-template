import { getServiceData } from "@/components/pages/Services/servicesData";
import { getServicePage } from "@/components/pages/Services/servicesPages";
import { notFound } from "next/navigation";

export default function ServicePage({
  params: { path },
}: {
  params: { path: string };
}) {
  const servicePage = getServicePage({ path });
  const serviceData = getServiceData({ path });
  if (!serviceData || !servicePage) return notFound();

  return <servicePage.page serviceData={serviceData} />;
}

export const runtime = "edge";
