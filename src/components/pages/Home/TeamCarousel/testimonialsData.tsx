import en from "@/../messages/en.json";

export interface TeamData {
  employee: keyof typeof en.OurTeam;
  dbImageName: string;
  href: string;
  // socials
  facebook?: string;
  instagram?: string;
  twitter?: string;
  whatsapp?: string;
}

export const teamData: TeamData[] = [
  {
    employee: "fatma-yilmaz",
    dbImageName: "f58fxoax2fe4991xd794lv3u-team1.webp",
    href: "/about",
    facebook: "#",
    instagram: "#",
    twitter: "#",
    whatsapp: "#",
  },
  {
    employee: "irvin-s-moreau",
    dbImageName: "uvayeig8os0vqwnt8hemzlyw-team2.webp",
    href: "/about",
    facebook: "#",
    instagram: "#",
    twitter: "#",
    whatsapp: "#",
  },
  {
    employee: "samantha-wang",
    dbImageName: "on8nnx0ll4xn1z5zikox7btg-team3.webp",
    href: "/about",
    facebook: "#",
    instagram: "#",
    twitter: "#",
    whatsapp: "#",
  },
  {
    employee: "adam-khalid",
    dbImageName: "c8lcf4duze4p73vlm26ougxo-team4.webp",
    href: "/about",
    facebook: "#",
    instagram: "#",
    twitter: "#",
    whatsapp: "#",
  },
];
