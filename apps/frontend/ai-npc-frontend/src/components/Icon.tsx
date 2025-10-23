import { sizeMap } from "@/constants/icon.const";
import { cn } from "@/lib/utils";
import { IconProps } from "@/types/icon.type";
import React from "react";

const Icon = ({ size = "lg", width, height, className = "" }: IconProps) => {
  return (
    <div className={cn(sizeMap[size], className)} style={{ width, height }}>
      <img
        src="/images/Wolf-Icon.png"
        alt="Icon"
        className="w-full h-full object-contain"
      />
    </div>
  );
};

export default Icon;
