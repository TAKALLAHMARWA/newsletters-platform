import { ICONS } from "@/shared/utils/icons";
import { atom } from "jotai";

export const navItems: NavItems[] = [
  {
    title: "Features",
  },
  {
    title: "Contact",
  },
  {
    title: "About",
  },
];

export const partners: PartnersTypes[] = [

  {
    url: "https://mlnetworks.io/mlnetworks.svg",
  },
  {
    url: "/images/EMSI.svg",
  },
  {
    url: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg",
  },
  {
    url: "https://upload.wikimedia.org/wikipedia/commons/9/93/MongoDB_Logo.svg",
  },
  {
    url: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg",
  }, 
];
export const sideBarActiveItem = atom<string>("/dashboard");

export const reportFilterActiveItem = atom<string>("Overview");

export const emailEditorDefaultValue = atom<string>("");

export const settingsActiveItem = atom<string>("Profile");

export const sideBarItems: DashboardSideBarTypes[] = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: ICONS.dashboard,
  },
  {
    title: "Blog",
    url: "/dashboard/blog",
    icon: ICONS.Blog,
  },
  {
    title: "Write",
    url: "/dashboard/write",
    icon: ICONS.write,
  },
  {
  title: "Add blog",
    url: "/dashboard/add",
    icon: ICONS.add,
  },  
  {
    title: "Audience",
    url: "/dashboard/audience",
    icon: ICONS.audience,
  },
];

export const sideBarBottomItems: DashboardSideBarTypes[] = [
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: ICONS.settings,
  },
  {
    title: "View Site",
    url: "/",
    icon: ICONS.world,
  },
];

export const subscribersData: subscribersDataTypes[] = [
  {
    _id: "64f717a45331088de2ce886c",
    email: "TAKALLAHMARWA@gmail.com",
    createdAt: "5Feb 2024",
    source: "Merve website",
    status: "subscribed",
  },
  {
    _id: "64f717a45331088de2ce886c",
    email: "support@Merve.ma",
    createdAt: "8Feb 2024",
    source: "External website",
    status: "subscribed",
  },
];