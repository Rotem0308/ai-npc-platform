import React from "react";

import notFoundImg from "@/../../public/images/Wolf-NotFound.jpg"; // replace with your image path
import NavButton from "./NavButton";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <img
        src={notFoundImg.src}
        alt="Page Not Found"
        // width="100"
        // height="70"
        className="w-120 h-80"
      />
      <NavButton link={"/"} className={"text-grey"}>
        Go Home
      </NavButton>
    </div>
  );
};

export default NotFound;
