import React from "react";
import Navbar from "../components/Navbar.jsx";
import { PROBLEMS } from "../data/data.js";
import { ChevronRightIcon, Code2Icon } from "lucide-react";
import { difficultyLevelBadge } from "../lib/utils/utils.js";
import { Link } from "react-router-dom";

const Problems = () => {
  const problems = Object.values(PROBLEMS);
  const easyProblems = problems.filter((p) => p.difficulty === "Easy");
  const mediumProblems = problems.filter((p) => p.difficulty === "Medium");
  const hardProblems = problems.filter((p) => p.difficulty === "Hard");

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Practice Problems</h1>
          <p className="text-base-content/70">
            Sharpen Your Coding Skills with this curated problems
          </p>
        </div>

        {/* problems list */}
        <div className="space-y-4">
          {problems.map((problem) => (
            <Link
              key={problem.id}
              to={`/problem/${problem.id}`}
              className="card bg-base-100 hover:scale-[1.01] transition-transform"
            >
              <div className="card-body">
                <div className="flex items-center justify-between gap-4">
                  {/* Left side */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Code2Icon className="size-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h2 className="text-xl font-bold">
                            {problem.title}
                            <span
                              className={`badge ${difficultyLevelBadge(problem.difficulty)} ml-3 mb-0.5`}
                            >
                              {problem.difficulty}
                            </span>
                          </h2>
                        </div>
                        <p className="text-sm text-base-content/60">
                          {problem.category}
                        </p>
                      </div>
                    </div>
                    <p className="text-base-content/80 mb-3">
                      {problem.description.text}
                    </p>
                  </div>

                  {/* right side */}
                  <div className="flex items-center gap-2 text-primary">
                    <span className="font-medium">Solve</span>
                    <ChevronRightIcon className="size-5" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Stats footer */}
        <div className="mt-12 card bg-base-100 shadow-lg">
          <div className="card-body">
            <div className="stats stats-vertical lg:stats-horizontal">
              <div className="stat">
                <div className="stat-title">Total Problems</div>
                <div className="stat-value text-primary">{problems.length}</div>
              </div>

              <div className="stat">
                <div className="stat-title">Easy Problems</div>
                <div className="stat-value text-primary">
                  {easyProblems.length}
                </div>
              </div>

              <div className="stat">
                <div className="stat-title">Medium Problems</div>
                <div className="stat-value text-warning">
                  {mediumProblems.length}
                </div>
              </div>

              <div className="stat">
                <div className="stat-title">Hard Problems</div>
                <div className="stat-value text-error">
                  {hardProblems.length}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Problems;
