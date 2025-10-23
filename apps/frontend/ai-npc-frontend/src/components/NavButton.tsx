import Link from "next/link";
import React, { ButtonHTMLAttributes } from "react";
import { ButtonSize, ButtonVariant } from "@/types/shadcn.type";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface NavButtonProps {
  children: React.ReactNode;
  className?: string;
  content?: string;
  buttonSize?: ButtonSize;
  variant?: ButtonVariant;
  link: string;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
}

const NavButton = ({
  children,
  buttonSize = "lg",
  className,
  variant = "ghost",
  type = "button",
  link,
}: NavButtonProps) => {
  return (
    <Link href={link}>
      <Button
        type={type}
        variant={variant}
        size={buttonSize}
        className={cn("hover:text-glow-blue text-glow-blue", className)}
      >
        {children}
      </Button>
    </Link>
  );
};

export default NavButton;
