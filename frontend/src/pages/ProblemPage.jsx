import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PROBLEMS, LANGUAGE_CONFIG } from "../data/data.js";
import Navbar from "../components/Navbar.jsx";
import { Panel, Group, Separator } from "react-resizable-panels";
import ProblemDescription from "../components/ProblemDescription.jsx";
import OutputPanel from "../components/OutputPanel.jsx";
import CodeEditor from "../components/CodeEditor.jsx";
import { toast } from "react-hot-toast";
import { executeCode } from "../lib/jDoodle.js";
import confetti from "canvas-confetti";
import { useActiveSessions } from "../hooks/useSessions.js";

const ProblemPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [currentProblemId, setCurrentProblemId] = useState("two-sum");
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [code, setCode] = useState(
    PROBLEMS[currentProblemId].starterCode.javascript,
  );
  const [output, setOutput] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  const currentProblem = PROBLEMS[currentProblemId];

  useEffect(() => {
    if (id && PROBLEMS[id]) {
      setCurrentProblemId(id);
      setCode(PROBLEMS[id].starterCode[selectedLanguage]);
      setOutput(null);
    }
  }, [id, selectedLanguage]);

  const { data: activeSessions } = useActiveSessions();

  console.log("returned value",activeSessions);

  const handleLanguageChange = (language) => {
    if (!LANGUAGE_CONFIG[language]) {
      toast.error(`We do not support ${language}`);
      return;
    }
    setSelectedLanguage(language);
  };

  const handleProblemChange = (problemId) => navigate(`/problem/${problemId}`);

  //to remove space
  const sanitizeOutput = (output) => {
    if (!output || typeof output !== "string") return "";
    return output
      .trim()
      .split("\n")
      .map((line) =>
        line
          .trim()
          // remove spaces after [ and before ]
          .replace(/\[\s+/g, "[")
          .replace(/\s+\]/g, "]")
          // normalize spaces around commas to single space after comma
          .replace(/\s*,\s*/g, ","),
      )
      .filter((line) => line.length > 0)
      .join("\n");
  };

  const checkIfTestPassed = (expectedOutput, actualOutput) => {
    const sanitizedActualOutput = sanitizeOutput(actualOutput);
    const sanitizedExpectedOutput = sanitizeOutput(expectedOutput);
    return sanitizedExpectedOutput === sanitizedActualOutput;
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput(null);

    try {
      const result = await executeCode(selectedLanguage, code);
      if (result.success) {
        setOutput(result);
        const actualOutput = result.output;
        const expectedOutput = currentProblem.expectedOutput[selectedLanguage];
        const isCorrect = checkIfTestPassed(expectedOutput, actualOutput);

        if (isCorrect) {
          triggerConfetti();
          toast.success("Bravo! Test Passed");
        } else {
          toast.error("Test Case Failed");
        }
      } else {
        setOutput(result);
        console.log(result.error);
        toast.error(result.error || "Code execution failed");
      }
    } catch (error) {
      toast.error("Error Running Code. Please Try Again");
      console.log(error);
    } finally {
      setIsRunning(false);
    }
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 250,
      origin: { x: 0.2, y: 0.6 },
    });

    confetti({
      particleCount: 80,
      spread: 250,
      origin: { x: 0.8, y: 0.6 },
    });
  };

  return (
    <div className="h-screen w-screen bg-base-100 flex flex-col">
      <Navbar />

      {/* IMPORTANT: min-h-0 enables proper resizing */}
      <div className="flex-1 min-h-0">
        <Group orientation="horizontal">
          {/* LEFT PANEL */}
          <Panel defaultSize={40} minSize={20}>
            <div className="h-full min-h-0 overflow-auto">
              <ProblemDescription
                problem={currentProblem}
                currentProblemId={currentProblemId}
                onProblemChange={handleProblemChange}
                allProblems={Object.values(PROBLEMS)}
              />
            </div>
          </Panel>

          {/* VERTICAL SEPARATOR */}
          <Separator className="w-2 bg-base-300 hover:bg-primary transition-colors cursor-col-resize" />

          {/* RIGHT PANEL */}
          <Panel defaultSize={60} minSize={40}>
            <Group orientation="vertical">
              {/* CODE EDITOR */}
              <Panel defaultSize={70} minSize={40}>
                <div className="h-full min-h-0 overflow-hidden">
                  <CodeEditor
                    selectedLanguage={selectedLanguage}
                    code={code}
                    isRunning={isRunning}
                    onlangchange={handleLanguageChange}
                    onCodeChange={setCode}
                    onRunCode={handleRunCode}
                  />
                </div>
              </Panel>

              {/* HORIZONTAL SEPARATOR */}
              <Separator className="h-2 bg-base-300 hover:bg-primary transition-colors cursor-row-resize" />

              {/* OUTPUT PANEL */}
              <Panel defaultSize={30} minSize={20}>
                <div className="h-full min-h-0 overflow-auto">
                  <OutputPanel output={output} />
                </div>
              </Panel>
            </Group>
          </Panel>
        </Group>
      </div>
    </div>
  );
};

export default ProblemPage;
