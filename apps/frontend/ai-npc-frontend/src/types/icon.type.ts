export type IconSize = "xs" | "sm" | "md" | "lg" | "xl" | "xxl";

export interface IconProps {
  size?: IconSize;
  //optional options
  width?: number;
  height?: number;
  className?: string;
}
