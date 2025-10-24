/**
 * Converts a raw escaped code string (with \n, \t, etc.)
 * into a valid formatted JavaScript string.
 */
export function normalizeCodeString(raw: string | undefined): string {
  if (!raw) return "";
  try {
    // Remove possible backticks or "csharp" prefix
    const cleaned = raw
      .replace(/^```[a-z]*\n?/, "") // remove ```csharp
      .replace(/```$/, "") // remove ending ```
      .trim();

    // Convert escaped characters to real ones
    return cleaned
      .replace(/\\n/g, "\n")
      .replace(/\\t/g, "\t")
      .replace(/\\r/g, "\r")
      .replace(/\\"/g, '"')
      .replace(/\\\\/g, "\\");
  } catch (e) {
    console.error("Error normalizing code string:", e);
    return raw;
  }
}
