import en from "@/../messages/en.json";

interface ICard {
  dbImageName: string;
  title: keyof typeof en.Cards;
  href: string;
}

export const services: ICard[] = [
  {
    dbImageName: "yts4zql0gte57739lc1m7rzq-laptop.webp",
    title: "repair_center",
    href: "/contacts",
  },
  {
    dbImageName: "kkvlrp51w8kxo9842uh4cr24-custom-pc.webp",
    title: "custom_pc_build_repair",
    href: "/services/custom-pc",
  },
  {
    dbImageName: "lyne290hammxho2c6g3mo3js-data-recovery.webp",

    title: "data_recovery",
    href: "/services/data-recovery",
  },
  {
    dbImageName: "oclm94ltt28eidt2wbvwch5z-warranty.webp",

    title: "tech_protection_warranty",
    href: "/services/warranty",
  },
  {
    dbImageName: "q3cba3577fv862x1o9qgkgxv-remote-support.webp",

    title: "remote_it_support",
    href: "/services/remote-support",
  },
  {
    dbImageName: "ocvp832oxltg1apzjcr1413t-on-site.webp",
    title: "onsite_tech_visit",
    href: "/services/on-site",
  },
];

export const macBook: ICard[] = [
  {
    dbImageName: "d6viqjnq08nl1u0k4ki9tq2a-mac-battery.webp",
    title: "mac_battery_replacement",
    href: "/services/mac-battery",
  },
  {
    dbImageName: "gyigsxjmrc58u08ojl21kw7t-mac-board.webp",
    title: "mac_logic_board_repair",
    href: "/services/mac-board",
  },
  {
    dbImageName: "jbdw9q877jg08h3hrrk298z5-mac-screen.webp",
    title: "mac_screen_replacement",
    href: "/services/mac-screen",
  },
  {
    dbImageName: "b10zrydihv3omttju5hedv71-mac-coffee.webp",
    title: "mac_spill_repair",
    href: "/services/mac-spill",
  },
  {
    dbImageName: "arewphpaodovijjlft625m87-mac-down.webp",
    title: "mac_wont_power_up",
    href: "/services/mac-power",
  },
  {
    dbImageName: "lhe0uqbqf4qayhfw5tl7jydw-mac-data-recovery.webp",
    title: "mac_data_recovery",
    href: "/services/mac-data-recovery",
  },
];

export const laptopPC: ICard[] = [
  {
    dbImageName: "dru86do8dtvjw9kbn42g3uzm-laptop-screen.webp",
    title: "windows_laptop_screen_replacement",
    href: "/services/laptop-screen",
  },
  {
    dbImageName: "y4nmfs10gtw7lt7tfx4m02nv-laptop-spill.webp",
    title: "windows_laptop_spill_repair",
    href: "/services/laptop-spill",
  },
  {
    dbImageName: "r7lbpamlr6whgda3oa1qqwyi-laptop-hard-drive.webp",
    title: "windows_data_recovery",
    href: "/services/windows-data-recovery",
  },
  {
    dbImageName: "jwitcgmt16vgtcrublcie8hc-laptop-bluescreen.webp",
    title: "windows_laptop_wont_start",
    href: "/services/laptop-power",
  },
  {
    dbImageName: "czbfd5wc430ruclj0qcst8s7-pc-slow.webp",
    title: "slow_pc_issue",
    href: "/services/windows-slow",
  },
  {
    dbImageName: "rknbhcm31k993mofmaxp762b-pc-bluescreen.webp",
    title: "windows_pc_wont_start",
    href: "/services/windows-power",
  },
];
