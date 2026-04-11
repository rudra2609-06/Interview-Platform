import React from "react";
import Editor from "@monaco-editor/react";
import { Loader2Icon, Play, PlayIcon } from "lucide-react";
import { LANGUAGE_CONFIG } from "../data/data.js";

const CodeEditor = ({
  selectedLanguage,
  code,
  isRunning,
  onlangchange,
  onCodeChange,
  onRunCode,
}) => {
  const safeLanguages = LANGUAGE_CONFIG[selectedLanguage]
    ? selectedLanguage
    : "javascript";
  return (
    <div className="bg-base-300 flex flex-col h-full min-h-0">
      <div className="flex items-center justify-between px-4 py-3 bg-base-100 border-t border-base-300">
        <div className="flex items-center gap-3">
          <img
            src={LANGUAGE_CONFIG[safeLanguages]?.icon}
            alt="selectedLangImage"
            className="size-6"
          />
          <select
            className="select select-sm select-ghost"
            value={selectedLanguage}
            onChange={(e) => onlangchange(e.target.value)}
          >
            {Object.keys(LANGUAGE_CONFIG).map((lang) => (
              <option className="cursor-pointer" key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </div>
        <button
          disabled={isRunning}
          className="btn btn-primary group gap-2"
          onClick={onRunCode}
        >
          {isRunning ? (
            <>
              <Loader2Icon className="size-4 animate-spin" />
              Running...
            </>
          ) : (
            <>
              <PlayIcon className="size-4 inline-flex group-hover:scale-110 transition-transform" />
              Run
            </>
          )}
        </button>
      </div>
      <div className="flex-1">
        <Editor
          height="100%"
          language={LANGUAGE_CONFIG[safeLanguages].monacoLang}
          value={code}
          onChange={(value) => onCodeChange(value || "")}
          theme="vs-dark"
          options={{
            fontSize: 14,
            lineNumbers: "on",
            scrollBeyondLastLine: false,
            automaticLayout: true,
            minimap: { enabled: false },
			      suggestOnTriggerCharacters : true
          }}
        />
      </div>
    </div>
  );
};

export default CodeEditor;
