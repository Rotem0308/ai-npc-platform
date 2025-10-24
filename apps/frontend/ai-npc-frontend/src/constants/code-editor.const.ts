import { IStandaloneEditorConstructionOptions } from "@/types/code-editor.type";

export const Languages = {
  CSHARP: "csharp",
  JSON: "json",
};

export const editorOptions = (
  readOnly: boolean
): IStandaloneEditorConstructionOptions => ({
  readOnly: readOnly,
  automaticLayout: true,
  fontSize: 14,
  fontLigatures: true,
  minimap: { enabled: false },
  scrollBeyondLastLine: false,
  smoothScrolling: true,
  renderWhitespace: "boundary",
  wordWrap: "on",
  cursorBlinking: "smooth",
  cursorSmoothCaretAnimation: "on",
  folding: true,
  lineNumbers: "on",
  overviewRulerBorder: false,
  scrollbar: {
    verticalScrollbarSize: 6,
    horizontalScrollbarSize: 6,
  },
});
