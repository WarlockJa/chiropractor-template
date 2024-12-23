import { services } from "@/components/ServiceCard/cardData";
import ServiceCard from "@/components/ServiceCard/ServiceCard";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

export default function HomeServicesLeftPanel({
  vertical,
}: {
  vertical?: boolean;
}) {
  const tCard = useTranslations("Cards");
  return (
    <div className="mx-auto max-w-screen-xl">
      <div
        className={cn(
          "relative flex h-fit items-center justify-center gap-2",
          vertical && "flex-col lg:flex-row",
        )}
      >
        {/* <h2 className="text-center text-3xl">{t("mac_repair_center")}</h2>
        <p className="my-4 text-center">{t("repairing_all_mac")}</p> */}
        {services.slice(0, 3).map((item) => (
          <ServiceCard
            key={item.title}
            title={tCard(item.title)}
            className="m-0.5 aspect-video w-full border transition-colors hover:border-accent"
            href={item.href}
            dbImageName={item.dbImageName}
          />
        ))}
      </div>
    </div>
  );
}
