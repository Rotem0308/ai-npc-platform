import { Languages } from "../constants/code-editor.const";
import { OnMount, Theme } from "@monaco-editor/react";
import type { editor } from "monaco-editor";

export type LanguageValue = (typeof Languages)[keyof typeof Languages];

export interface MonacoEditorProps {
  value?: string;
  language?: LanguageValue;
  path?: string; // model path for multi-model support, e.g. "NpcData.cs"
  theme?: Theme;
  height?: number | string;
  width?: number | string;
  readOnly?: boolean;
  showCopy?: boolean;
  showDownload?: boolean;
  filename?: string; // for download
  className?: string;
}

export type EditorType = editor.IStandaloneCodeEditor;

export type IStandaloneEditorConstructionOptions =
  editor.IStandaloneEditorConstructionOptions;
