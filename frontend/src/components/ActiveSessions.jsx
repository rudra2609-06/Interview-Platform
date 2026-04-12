import React from "react";
import {
  ArrowRightIcon,
  Code2Icon,
  CrownIcon,
  LoaderIcon,
  SparklesIcon,
  UsersIcon,
  ZapIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import { difficultyLevelBadge } from "../lib/utils/utils";

const ActiveSessions = ({ isUserInSession, isLoading, sessions = [] }) => {
  return (
    <section className="card h-full border-2 border-primary/20 bg-base-100 shadow-sm transition-colors hover:border-primary/30">
      <div className="card-body flex h-full flex-col gap-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-linear-to-br from-primary to-secondary p-2.5 text-white shadow-sm">
              <ZapIcon className="size-5" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-base-content">
                Live Sessions
              </h2>
              <p className="text-sm text-base-content/60">
                Continue your active interview rooms
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-full bg-success/10 px-3 py-1.5 text-success">
            <div className="size-2 rounded-full bg-success" />
            <span className="text-sm font-semibold">{sessions.length}</span>
          </div>
        </div>

        <div
          className={`min-h-80 flex-1 ${
            isLoading || sessions.length === 0
              ? "flex items-center justify-center"
              : "space-y-4 overflow-y-auto pr-1"
          }`}
        >
          {isLoading ? (
            <div className="flex h-full w-full min-h-40 items-center justify-center rounded-3xl border border-dashed border-primary/20 bg-base-200/40">
              <LoaderIcon className="size-10 animate-spin text-primary" />
            </div>
          ) : sessions.length > 0 ? (
            sessions.map((session) => {
              const difficulty = session.difficulty || "unknown";
              const userInSession = isUserInSession?.(session);
              const seatCount = session.participant ? "2/2" : "1/2";
              const isFull = !!session.participant && !userInSession;

              return (
                <article
                  key={session._id}
                  className="rounded-3xl border border-base-300 bg-base-200/65 p-5 transition-all hover:border-primary/40 hover:bg-base-200"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex min-w-0 items-start gap-4">
                      <div className="relative flex size-14 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-primary to-secondary text-white shadow-sm">
                        <Code2Icon className="size-7" />
                        <div className="absolute -right-1 -top-1 size-4 rounded-full border-2 border-base-100 bg-success" />
                      </div>

                      <div className="min-w-0 space-y-3">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="truncate text-lg font-bold text-base-content">
                            {session.problem}
                          </h3>
                          <span
                            className={`badge badge-sm ${difficultyLevelBadge(difficulty)}`}
                          >
                            {difficulty.charAt(0).toUpperCase() +
                              difficulty.slice(1)}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-base-content/70">
                          <div className="flex items-center gap-1.5">
                            <CrownIcon className="size-4 text-warning" />
                            <span className="font-medium">
                              {session.host?.name || "Unknown host"}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <UsersIcon className="size-4 text-primary" />
                            <span>{seatCount}</span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <span
                              className={`badge badge-sm ${isFull ? "badge-error" : "badge-success"}`}
                            >
                              {isFull ? "Full" : "Open"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex shrink-0 items-center gap-2 self-start">
                      <span className="badge badge-success badge-outline">
                        Live
                      </span>
                      {isFull ? (
                        <button className="btn btn-disabled btn-sm">
                          Full
                        </button>
                      ) : (
                        <Link
                          to={`/session/${session._id}`}
                          className="btn btn-primary btn-sm gap-2"
                        >
                          {userInSession ? "Rejoin" : "Join"}
                          <ArrowRightIcon className="size-4" />
                        </Link>
                      )}
                    </div>
                  </div>
                </article>
              );
            })
          ) : (
            <div className="flex flex-1 w-full  flex-col items-center justify-center rounded-3xl  px-6 text-center">
              <div className="mb-4 rounded-2xl bg-primary/10 p-4 text-primary">
                <SparklesIcon className="size-8" />
              </div>
              <h3 className="text-xl font-bold text-base-content">
                No active sessions yet
              </h3>
              <p className="mt-2 max-w-md text-sm text-base-content/60">
                Your running interview rooms will appear here once you create or
                join one.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ActiveSessions;
