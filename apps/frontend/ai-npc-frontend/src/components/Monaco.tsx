"use client";
import React, { useRef } from "react";
import Editor from "@monaco-editor/react";
import { Spinner } from "./ui/spinner";
import { toast } from "sonner";
import {
  EditorType,
  IStandaloneEditorConstructionOptions,
  MonacoEditorProps,
} from "@/types/code-editor.type";
import { normalizeCodeString } from "@/utils/normilize-code-string.util";
import { editorOptions } from "@/constants/code-editor.const";

const Monaco = (props: MonacoEditorProps) => {
  const {
    value,
    language = "csharp",
    path,
    theme = "vs-dark",
    height = "100%",
    width = "100%",
    readOnly = false,
    showCopy = true,
    showDownload = true,
    filename = "code.cs",
    className = "w-full h-screen",
  } = props;

  const val =
    'using UnityEngine;\nusing System;\n\nnamespace GameData.Generated {\n    /// <summary>\n    /// Represents an NPC\'s data, including their name, role, personality, and dialogue lines.\n    /// </summary>\n    [CreateAssetMenu(fileName = "NpcData", menuName = "GameData/Npc")]\n    public class NpcData : ScriptableObject {\n        public string name;\n        public string role;\n        public string personality;\n        public Dialogue[] dialogue;\n    }\n\n    /// <summary>\n    /// Represents a single dialogue line with an ID and text.\n    /// </summary>\n    [Serializable]\n    public class Dialogue {\n        public int id;\n        public string text;\n    }\n\n    /// <summary>\n    /// Defines the difficulty levels for quests.\n    /// </summary>\n    public enum QuestDifficulty {\n        Easy,\n        Medium,\n        Hard,\n        Epic\n    }\n\n    /// <summary>\n    /// Represents a quest\'s data, including its title, description, objectives, rewards, difficulty, and connections to other data.\n    /// </summary>\n    [CreateAssetMenu(fileName = "QuestData", menuName = "GameData/Quest")]\n    public class QuestData : ScriptableObject {\n        public string title;\n        public string description;\n        public string[] objectives;\n        public string[] rewards;\n        public QuestDifficulty difficulty;\n        public string[] connections;\n    }\n}\n';
  const editorRef = useRef<EditorType>(null);

  function handleEditorDidMount(editor: EditorType, monaco: any) {
    editorRef.current = editor;
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(editorRef.current?.getValue() || "");
    toast.success("Copied!");
  };

  const handleDownload = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // stop normal navigation

    const dataAsJson = JSON.stringify(editorRef.current?.getValue(), null, 2);
    const blob = new Blob([dataAsJson], { type: "application/json" }); //browser inner representaion of a file
    const url = URL.createObjectURL(blob); // for the anchor tag, the object stays inside the browser’s memory.

    const a = document.createElement("a");
    a.download = filename; // otherwise will be infer from the url name
    a.href = url;

    a.click(); // download the file

    URL.revokeObjectURL(url); // released from the browser’s memory.
    toast.success("Downloaded!");
  };

  const normalizedValue = val ? normalizeCodeString(val) : "";

  return (
    <div className={className}>
      <div className="flex items-center justify-end gap-2 mb-2">
        {showCopy && (
          <button
            type="button"
            onClick={handleCopy}
            className="px-3 py-1 rounded-md bg-slate-700 text-sm hover:bg-slate-600"
          >
            Copy
          </button>
        )}
        {showDownload && (
          <button
            type="button"
            onClick={(e) => handleDownload(e)}
            className="px-3 py-1 rounded-md bg-slate-700 text-sm hover:bg-slate-600"
          >
            Download
          </button>
        )}
      </div>
      <Editor
        height={height}
        options={editorOptions(readOnly)}
        width={width}
        theme={theme}
        defaultLanguage={language}
        language={language}
        path={path}
        value={normalizedValue}
        loading={<Spinner />}
        onMount={handleEditorDidMount}
      />
    </div>
  );
};

export default Monaco;
