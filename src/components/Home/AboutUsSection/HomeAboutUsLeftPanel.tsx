import CustomHeader from "@/components/CustomHeader";
import CustomImage from "@/components/CustomImage";
import { useTranslations } from "next-intl";

export default function HomeAboutUsLeftPanel() {
  const t = useTranslations("AboutUsShort");
  return (
    <div className="relative h-full bg-blue-200">
      <div className="absolute bottom-20 left-0 right-32 top-10 bg-primary/40"></div>
      <div className="relative ml-auto h-full min-h-[60vh] max-w-screen-sm items-center justify-center">
        <CustomHeader
          text={t("welcome").toLocaleUpperCase()}
          fontSizeRem={3}
          className="absolute left-10 top-4 z-10 text-primary"
        />
        {/* <div className="absolute bottom-2 left-10 right-2 top-20 md:left-32 md:right-10 lg:left-20 xl:left-32"> */}
        <div className="absolute bottom-2 left-10 right-2 top-20 md:right-10">
          <CustomImage dbImageName="c2o13e8pr8erh4obeyt9mrx1-reception.webp" />
        </div>
      </div>
    </div>
  );
}
