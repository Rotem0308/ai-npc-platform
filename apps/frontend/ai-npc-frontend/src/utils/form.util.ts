import { ZodType, ZodOptional, ZodNullable, ZodUnion } from "zod";

export function isRequired<T>(schema: ZodType<T>) {
  const def = schema.def;

  // Check for optional, nullable, or union with null/undefined
  if (def.type === "optional" || def.type === "nullable") {
    return false;
  }

  return true;
}
