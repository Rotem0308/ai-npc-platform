import { Button, buttonVariants } from "../components/ui/button";
import { VariantProps } from "class-variance-authority";

export type ButtonSize = VariantProps<typeof buttonVariants>["size"];
export type ButtonVariant = VariantProps<typeof buttonVariants>["variant"];
