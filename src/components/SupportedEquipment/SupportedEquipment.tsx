import CustomHeader from "@/components/CustomHeader";
import AcerIcon from "@/components/Icons/AcerIcon";
import AppleIcon from "@/components/Icons/AppleIcon";
import AsusIcon from "@/components/Icons/AsusIcon";
import DellIcon from "@/components/Icons/DellIcon";
import HPIcon from "@/components/Icons/HPIcon";
import IBMIcon from "@/components/Icons/IBMIcon";
import LenovoIcon from "@/components/Icons/LenovoIcon";
import SamsungIcon from "@/components/Icons/SamsungIcon";
import ToshibaIcon from "@/components/Icons/ToshibaIcon";
import WindowsIcon from "@/components/Icons/WindowsIcon";
import { useTranslations } from "next-intl";

const brands = [
  {
    title: "Acer",
    Icon: <AcerIcon className="h-16 fill-foreground" key={"Acer"} />,
  },
  {
    title: "Apple",
    Icon: <AppleIcon className="h-12 fill-foreground" key={"Apple"} />,
  },
  {
    title: "Asus",
    Icon: <AsusIcon className="h-16 fill-foreground" key={"Asus"} />,
  },
  {
    title: "Dell",
    Icon: <DellIcon className="h-12 fill-foreground" key={"Dell"} />,
  },
  {
    title: "IBM",
    Icon: <IBMIcon className="h-8 fill-foreground" key={"IBM"} />,
  },
  {
    title: "HP",
    Icon: <HPIcon className="h-12 fill-foreground" key={"HP"} />,
  },
  {
    title: "Lenovo",
    Icon: <LenovoIcon className="h-16 fill-foreground" key={"Lenovo"} />,
  },
  {
    title: "Samsung",
    Icon: <SamsungIcon className="h-8 fill-foreground" key={"Samsung"} />,
  },
  {
    title: "Toshiba",
    Icon: <ToshibaIcon className="h-20 fill-foreground" key={"Toshiba"} />,
  },
  {
    title: "Windows",
    Icon: <WindowsIcon className="h-12 fill-foreground" key={"Windows"} />,
  },
];

export default function SupportedEquipment() {
  const t = useTranslations("SupportedEquipment");
  return (
    <section className="w-full border p-4">
      {/* TODO add translation */}
      <CustomHeader
        text={t("supported_equipment")}
        fontSizeRem={2}
        className="my-4 flex justify-center"
      />
      <div className="flex w-full flex-wrap items-center justify-center gap-4 px-2">
        {brands.map((item) => item.Icon)}
      </div>
    </section>
  );
}
