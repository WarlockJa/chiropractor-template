import en from "@/../messages/en.json";

export interface IServicePaths {
  title: keyof typeof en.Cards;
  path: string;
  dbImageName: string;
}

export const servicePaths = [
  {
    title: "custom_pc_build_repair",
    path: "custom-pc",
    dbImageName: "kkvlrp51w8kxo9842uh4cr24-custom-pc.webp",
  },
  {
    title: "data_recovery",
    path: "data-recovery",
    dbImageName: "lyne290hammxho2c6g3mo3js-data-recovery.webp",
  },
  {
    title: "tech_protection_warranty",
    path: "warranty",
    dbImageName: "oclm94ltt28eidt2wbvwch5z-warranty.webp",
  },
  {
    title: "remote_it_support",
    path: "remote-support",
    dbImageName: "q3cba3577fv862x1o9qgkgxv-remote-support.webp",
  },
  {
    title: "onsite_tech_visit",
    path: "on-site",
    dbImageName: "ocvp832oxltg1apzjcr1413t-on-site.webp",
  },
  {
    title: "mac_battery_replacement",
    path: "mac-battery",
    dbImageName: "d6viqjnq08nl1u0k4ki9tq2a-mac-battery.webp",
  },
  {
    title: "mac_logic_board_repair",
    path: "mac-board",
    dbImageName: "gyigsxjmrc58u08ojl21kw7t-mac-board.webp",
  },
  {
    title: "mac_screen_replacement",
    path: "mac-screen",
    dbImageName: "jbdw9q877jg08h3hrrk298z5-mac-screen.webp",
  },
  {
    title: "mac_spill_repair",
    path: "mac-spill",
    dbImageName: "b10zrydihv3omttju5hedv71-mac-coffee.webp",
  },
  {
    title: "mac_wont_power_up",
    path: "mac-power",
    dbImageName: "arewphpaodovijjlft625m87-mac-down.webp",
  },
  {
    title: "mac_data_recovery",
    path: "mac-data-recovery",
    dbImageName: "lhe0uqbqf4qayhfw5tl7jydw-mac-data-recovery.webp",
  },
  {
    title: "windows_laptop_screen_replacement",
    path: "laptop-screen",
    dbImageName: "dru86do8dtvjw9kbn42g3uzm-laptop-screen.webp",
  },
  {
    title: "windows_laptop_spill_repair",
    path: "laptop-spill",
    dbImageName: "y4nmfs10gtw7lt7tfx4m02nv-laptop-spill.webp",
  },
  {
    title: "windows_data_recovery",
    path: "windows-data-recovery",
    dbImageName: "r7lbpamlr6whgda3oa1qqwyi-laptop-hard-drive.webp",
  },
  {
    title: "windows_laptop_wont_start",
    path: "laptop-power",
    dbImageName: "jwitcgmt16vgtcrublcie8hc-laptop-bluescreen.webp",
  },
  {
    title: "slow_pc_issue",
    path: "windows-slow",
    dbImageName: "czbfd5wc430ruclj0qcst8s7-pc-slow.webp",
  },
  {
    title: "windows_pc_wont_start",
    path: "windows-power",
    dbImageName: "rknbhcm31k993mofmaxp762b-pc-bluescreen.webp",
  },
];

export const getData = ({ path }: { path: string }) => {
  return servicePaths.find((item) => item.path === path) as IServicePaths;
};
