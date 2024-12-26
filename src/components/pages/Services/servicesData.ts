import { ReactNode } from "react";
import ServicePageColdLaser from "./ServicePages/ServicePageColdLaser";
import ServicePageDetox from "./ServicePages/ServicePageDetox";
import ServicePageFitness from "./ServicePages/ServicePageFitness";
import ServicePageDietaryManagement from "./ServicePages/ServicePageDietaryManagement";
import ServicePageHeatAndCold from "./ServicePages/ServicePageHeatAndCold";
import ServicePageMassage from "./ServicePages/ServicePageMassage";
import ServicePagePediatric from "./ServicePages/ServicePagePediatric";
import ServicePageRelax from "./ServicePages/ServicePageRelax";

export interface ServiceData {
  title: string;
  description: string;
  dbImageName: string;
  href: string;
  path: string;
  page: ({ serviceData }: { serviceData: ServiceData }) => JSX.Element;
}

export const servicesData: ServiceData[] = [
  {
    title: "cold laser therapy",
    dbImageName:
      "py3dxrdishdil5x2b40x599r-service-icon-cold-laser-therapy-1024x1024.webp",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque deleniti iste asperiores quod aperiam eveniet debitis doloribus, aliquam, ratione necessitatibus, earum voluptates facere voluptatem? Ab blanditiis iure error veniam dolor.",
    href: "/services/cold-laser-therapy",
    path: "cold-laser-therapy",
    page: ServicePageColdLaser,
  },
  {
    title: "detox program",
    dbImageName:
      "kw17onor85kfyof5k3d47e5b-service-icon-detox-program-1024x1024.webp",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque deleniti iste asperiores quod aperiam eveniet debitis doloribus, aliquam, ratione necessitatibus, earum voluptates facere voluptatem? Ab blanditiis iure error veniam dolor.",
    href: "/services/detox-program",
    path: "detox-program",
    page: ServicePageDetox,
  },
  {
    title: "fitness program",
    dbImageName:
      "jd89fb780psvumomfj7jpfrq-service-icon-fitness-program-1024x1024.webp",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque deleniti iste asperiores quod aperiam eveniet debitis doloribus, aliquam, ratione necessitatibus, earum voluptates facere voluptatem? Ab blanditiis iure error veniam dolor.",
    href: "/services/fitness-program",
    path: "fitness-program",
    page: ServicePageFitness,
  },
  {
    title: "dietary management",
    dbImageName:
      "wtez8umrvq10q7n3belli49f-service-icon-dietary-management-1024x1024.webp",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque deleniti iste asperiores quod aperiam eveniet debitis doloribus, aliquam, ratione necessitatibus, earum voluptates facere voluptatem? Ab blanditiis iure error veniam dolor.",
    href: "/services/dietary-management",
    path: "dietary-management",
    page: ServicePageDietaryManagement,
  },
  {
    title: "heat and cold",
    dbImageName:
      "o8ylu9qx85xrugh5h5lcjfhe-service-icon-heat-and-cold-1024x1024.webp",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque deleniti iste asperiores quod aperiam eveniet debitis doloribus, aliquam, ratione necessitatibus, earum voluptates facere voluptatem? Ab blanditiis iure error veniam dolor.",
    href: "/services/heat-and-cold",
    path: "heat-and-cold",
    page: ServicePageHeatAndCold,
  },
  {
    title: "massage",
    dbImageName:
      "c29w9xdxzsmlh9551chsjkjz-service-icon-massage-therapy-1024x1024.webp",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque deleniti iste asperiores quod aperiam eveniet debitis doloribus, aliquam, ratione necessitatibus, earum voluptates facere voluptatem? Ab blanditiis iure error veniam dolor.",
    href: "/services/massage-therapy",
    path: "massage-therapy",
    page: ServicePageMassage,
  },
  {
    title: "pediatric",
    dbImageName:
      "lxbaktpk38urw1hgbc3fmtp4-service-icon-pediatric-1024x1024.webp",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque deleniti iste asperiores quod aperiam eveniet debitis doloribus, aliquam, ratione necessitatibus, earum voluptates facere voluptatem? Ab blanditiis iure error veniam dolor.",
    href: "/services/pediatric",
    path: "pediatric",
    page: ServicePagePediatric,
  },
  {
    title: "relax therapy",
    dbImageName: "focrxbaxgkz1djsk6lur3bfy-service-icon-relax-therapy.webp",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque deleniti iste asperiores quod aperiam eveniet debitis doloribus, aliquam, ratione necessitatibus, earum voluptates facere voluptatem? Ab blanditiis iure error veniam dolor.",
    href: "/services/relax-therapy",
    path: "relax-therapy",
    page: ServicePageRelax,
  },
];

export const getServiceData = ({ path }: { path: string }) => {
  return servicesData.find((item) => item.path === path);
};
