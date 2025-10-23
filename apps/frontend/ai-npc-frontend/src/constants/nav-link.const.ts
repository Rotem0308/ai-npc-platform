import { ROUTES } from "@/enums/route.enum";
import { NavLink } from "@/types/nav-link.type";

export const navLinks: NavLink[] = [
  { link: ROUTES.dashboard, label: "DashBoard", position: "basic-navigation" },
  { link: ROUTES.contact, label: "Contact Us", position: "basic-navigation" },
  { link: ROUTES.generator, label: "Generator", position: "basic-navigation" },
  {
    link: ROUTES.about,
    label: "Learn More About Us!",
    position: "basic-navigation",
  },
  { link: ROUTES.login, label: "Login", position: "auth" },
  { link: ROUTES.register, label: "Register Us", position: "auth" },
];
