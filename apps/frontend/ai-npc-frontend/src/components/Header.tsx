import React from "react";
import Icon from "./Icon";
import { Rubik_Glitch } from "next/font/google";
import { ButtonGroup } from "./ui/button-group";
import NavButton from "./NavButton";
import { navLinks } from "@/constants/nav-link.const";

const rubik_Glitch = Rubik_Glitch({
  weight: "400",
  subsets: ["latin"],
});

const Header = () => {
  return (
    <div className="absolute top-0 left-0 w-full z-50 bg-stage-light-blue">
      <div className="flex flex-row justify-between items-center text-white px-10 py-3">
        <div className="">
          <div className="flex justify-center">
            <Icon />
          </div>
          <p className={`${rubik_Glitch.className} text-white`}>
            Claws Of Fortune
          </p>
        </div>
        {/* Basic Navigation */}
        <nav>
          <ButtonGroup className="flex flex-row" aria-label="Button group">
            {navLinks
              .filter((navLink) => navLink.position == "basic-navigation")
              .map(({ link, label }) => (
                <NavButton key={link} link={link}>
                  {label}
                </NavButton>
              ))}
          </ButtonGroup>
        </nav>
        {/* Auth  */}
        <nav>
          <ButtonGroup className="flex flex-row" aria-label="Button group">
            {navLinks
              .filter((navLink) => navLink.position == "auth")
              .map(({ link, label }) => (
                <NavButton key={link} link={link}>
                  {label}
                </NavButton>
              ))}
          </ButtonGroup>
        </nav>
      </div>
    </div>
  );
};

export default Header;
