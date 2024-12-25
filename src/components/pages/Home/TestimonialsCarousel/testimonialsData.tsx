export interface TestimonialsData {
  name: string;
  quote: string;
  description: string;
  dbImageName: string;
  href?: string;
}

export const testimonialsData: TestimonialsData[] = [
  {
    dbImageName: "hitpx573ud443xsb3tw51v9d-testimonial1.webp",
    quote:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repudiandae ea est esse ut voluptatem vero velit ipsam eligendi deleniti, tenetur suscipit sequi quo enim sed voluptates eos aut quibusdam. Dignissimos.",
    name: "Usain Bolt",
    description: "athlete",
  },
  {
    dbImageName: "v6ciuetv9628ctn2nn78bkj9-testimonial2.webp",
    quote:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repudiandae ea est esse ut voluptatem vero velit ipsam eligendi deleniti, tenetur suscipit sequi quo enim sed voluptates eos aut quibusdam. Dignissimos.",
    name: "Arnold Schwarzenegger",
    description: "politician",
  },
  {
    dbImageName: "muwgulftdw7x4lm3ngyg1136-testimonial3.webp",
    quote:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repudiandae ea est esse ut voluptatem vero velit ipsam eligendi deleniti, tenetur suscipit sequi quo enim sed voluptates eos aut quibusdam. Dignissimos.",
    name: "Rebecca Ferguson",
    description: "actress",
  },
];
