import React from "react";

const OutputPanel = ({ output }) => {
  // console.log(output);
  // console.log("output error",output.error);
  return (
    <div className="h-full bg-base-100 flex flex-col">
      <div className="px-4 py-2 bg-base-200 border-b border-base-300 font-semibold text-sm">
        Output
      </div>
      <div className="flex-1 overflow-auto p-4">
        {output === null ? (
          <p className="text-base-content/50 text-sm">
            Click "Run Code" to see the output here...
          </p>
        ) : output.success ? (
          <pre className="text-sm font-mono text-success whitespace-pre-wrap">
            {output}
          </pre>
        ) : (
          <pre className="text-sm font-mono text-error whitespace-pre-wrap">
            {output.error}
          </pre>
        )}
      </div>
    </div>
  );
};

export default OutputPanel;
