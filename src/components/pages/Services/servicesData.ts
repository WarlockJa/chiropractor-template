import en from "@/../messages/en.json";

export interface ServiceData {
  title: string;
  description: string;
  dbImageName: string;
  href: string;
  path: keyof typeof en.Services;
}

export const servicesData: ServiceData[] = [
  {
    title: "cold laser therapy",
    dbImageName:
      "py3dxrdishdil5x2b40x599r-service-icon-cold-laser-therapy-1024x1024.webp",
    description:
      "Cold laser therapy is low-intensity laser therapy that stimulates healing while using low levels of light. The technique is called “cold” laser therapy because the low levels of light aren't enough to heat your body's tissue. The level of light is low when compared to other forms of laser therapy, such as those used to destroy tumors and coagulate tissue. Surgical and aesthetic lasers heat the tissue being treated. True to its name, cold laser therapy does not.",
    href: "/services/cold-laser-therapy",
    path: "cold-laser-therapy",
  },
  {
    title: "detox program",
    dbImageName:
      "kw17onor85kfyof5k3d47e5b-service-icon-detox-program-1024x1024.webp",
    description:
      "Detoxification (detox) diets are more popular than ever. These diets claim to cleanse your blood and eliminate harmful toxins from your body. However, it is not entirely clear how they do this, what specific compounds they're supposed to eliminate, and if they even work. Read on for a detailed review of detox diets, including their benefits and side effects.",
    href: "/services/detox-program",
    path: "detox-program",
  },
  {
    title: "fitness program",
    dbImageName:
      "jd89fb780psvumomfj7jpfrq-service-icon-fitness-program-1024x1024.webp",
    description:
      "Many people strive to be fit. Fitness, after all, is synonymous with health. Having a high level of overall fitness is linked with a lower risk of chronic disease, as well as a better ability to manage health issues that do come up. Better fitness also promotes more functionality and mobility throughout one's life span. And in the short term, being active can help your day-to-day functioning, from better mood to sharper focus to better sleep.",
    href: "/services/fitness-program",
    path: "fitness-program",
  },
  {
    title: "dietary management",
    dbImageName:
      "wtez8umrvq10q7n3belli49f-service-icon-dietary-management-1024x1024.webp",
    description:
      "Healthy eating means ensuring your diet includes a variety of healthy, nutritious foods and drinks. Eating the right foods can give you energy, improve your well-being, and help you to feel healthier. We explain more about healthy eating, the differences between eating healthy and dieting, and how working with a nutritional professional can help you.",
    href: "/services/dietary-management",
    path: "dietary-management",
  },
  {
    title: "heat and cold",
    dbImageName:
      "o8ylu9qx85xrugh5h5lcjfhe-service-icon-heat-and-cold-1024x1024.webp",
    description:
      "Heat therapy helps improves blood flow to the area where the heat is applied. It's best for muscle pain or stiffness. Cold therapy helps reduce inflammation. It's most helpful when used for acute injuries and pain. We treat everything from arthritis to pulled muscles to inflammation with ice packs or heating pads. Treating pain with hot and cold can be extremely effective for a number of different conditions and injuries, and easily affordable. The tricky part is knowing what situations calls for hot, and which calls for cold. Sometimes a single treatment will even include both. As a general rule of thumb, use ice for acute injuries or pain, along with inflammation and swelling. Use heat for muscle pain or stiffness.",
    href: "/services/heat-and-cold",
    path: "heat-and-cold",
  },
  {
    title: "massage",
    dbImageName:
      "c29w9xdxzsmlh9551chsjkjz-service-icon-massage-therapy-1024x1024.webp",
    description:
      "When it comes to rest and relaxation, there's nothing better than a massage. Millions of Americans benefit from massages and it's easy to see why! Massages are great at reducing stress and tension, improving range of motion, and even preventing more serious medical conditions. But massages are more than just something to indulge in on Mother's Day or a beach vacation. Medical massage can provide effective relief from pain, soreness, and injury. But what is medical massage therapy and what conditions can it help?",
    href: "/services/massage-therapy",
    path: "massage-therapy",
  },
  {
    title: "pediatric",
    dbImageName:
      "lxbaktpk38urw1hgbc3fmtp4-service-icon-pediatric-1024x1024.webp",
    description:
      "Introducing your infant or child to chiropractic care at a young age can be one of the best ways to help set them up for a lifetime of good health. Pediatric chiropractors can help kids in a myriad of ways - from promoting healthier sleep and boosting immunity to improving behavioral issues and even aiding in digestion. In infants, chiropractic care can also help sooth colic and reflux symptoms, among many other benefits. Could your child benefit from seeing a chiropractor? Here's are list of the top 10 benefits of pediatric chiropractic care.",
    href: "/services/pediatric",
    path: "pediatric",
  },
  {
    title: "relax therapy",
    dbImageName: "focrxbaxgkz1djsk6lur3bfy-service-icon-relax-therapy.webp",
    description:
      "One of the most important things to keep in mind during a chiropractic adjustment is staying relaxed. However, if you haven't had a chiropractic adjustment, or tend to be anxious you might appreciate some tips for relaxing during a chiropractic adjustment.",
    href: "/services/relax-therapy",
    path: "relax-therapy",
  },
];

export const getServiceData = ({ path }: { path: string }) => {
  return servicesData.find((item) => item.path === path);
};
