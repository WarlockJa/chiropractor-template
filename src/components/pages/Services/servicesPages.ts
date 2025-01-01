/*
extracting server component data for service pages to avoid errors
whe using serviceData inside of the client components
*/

import ServicePageColdLaser from "./ServicePages/ServicePageColdLaser";
import ServicePageDetox from "./ServicePages/ServicePageDetox";
import ServicePageFitness from "./ServicePages/ServicePageFitness";
import ServicePageDietaryManagement from "./ServicePages/ServicePageDietaryManagement";
import ServicePageHeatAndCold from "./ServicePages/ServicePageHeatAndCold";
import ServicePageMassage from "./ServicePages/ServicePageMassage";
import ServicePagePediatric from "./ServicePages/ServicePagePediatric";
import ServicePageRelax from "./ServicePages/ServicePageRelax";
import { ServiceData } from "./servicesData";

interface ServicePage {
  path: string;
  page: ({ serviceData }: { serviceData: ServiceData }) => JSX.Element;
}

export const servicesPages: ServicePage[] = [
  {
    path: "cold-laser-therapy",
    page: ServicePageColdLaser,
  },
  {
    path: "detox-program",
    page: ServicePageDetox,
  },
  {
    path: "fitness-program",
    page: ServicePageFitness,
  },
  {
    path: "dietary-management",
    page: ServicePageDietaryManagement,
  },
  {
    path: "heat-and-cold",
    page: ServicePageHeatAndCold,
  },
  {
    path: "massage-therapy",
    page: ServicePageMassage,
  },
  {
    path: "pediatric",
    page: ServicePagePediatric,
  },
  {
    path: "relax-therapy",
    page: ServicePageRelax,
  },
];

export const getServicePage = ({ path }: { path: string }) => {
  return servicesPages.find((item) => item.path === path);
};
