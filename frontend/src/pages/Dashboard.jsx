import React, { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/react";
import {
  useActiveSessions,
  useCreateSession,
  useMyRecentSessions,
} from "../hooks/useSessions.js";
import toast from "react-hot-toast";
import WelcomeSection from "../components/WelcomeSection.jsx";
import RecentSessions from "../components/RecentSessions.jsx";
import ActiveSessions from "../components/ActiveSessions.jsx";
import StatsCard from "../components/StatsCard.jsx";
import CreateSessionModal from "../components/CreateSessionModal.jsx";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [roomConfig, setRoomConfig] = useState({ problem: "", difficulty: "" });

  const createSessionMutation = useCreateSession();

  const { data: activeSessionData, isLoading: isLoadingActiveSessions } =
    useActiveSessions();
  const { data: recentSessionData, isLoading: isLoadingRecentSessions } =
    useMyRecentSessions();

  const handleCreateRoom = () => {
    if (!roomConfig.difficulty || !roomConfig.problem)
      return toast("Select Required Fields");
    createSessionMutation.mutate(
      {
        problem: roomConfig.problem,
        difficulty: roomConfig.difficulty.toLocaleLowerCase(),
      },
      {
        onSuccess: (data) => {
          setShowCreateModal(false);
          navigate(`session/${data.data._id}`);
        },
      },
    );
  };

  const activeSession = activeSessionData?.data || [];
  const recentSession = recentSessionData?.data || [];

  const isUserInSession = (session) => {
    if (!user.id) return false;
    return (
      session.host?.clerkId === user.id ||
      session.participant?.clerkId === user.id
    );
  };

  return (
    <>
      <div className="min-h-screen bg-base-300">
        <Navbar />
        <WelcomeSection onCreateSession={() => setShowCreateModal(true)} />

        {/* Grid Layout */}
        <div className="container mx-auto px-4 pb-16 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-stretch">
            <StatsCard
              activeSessionCount={activeSession.length}
              recentSessionCount={recentSession.length}
            />
            <div className="lg:col-span-2">
              <ActiveSessions
                sessions={activeSession}
                isLoading={isLoadingActiveSessions}
                isUserInSession={isUserInSession}
              />
            </div>
          </div>
          <RecentSessions
            sessions={recentSession}
            isLoading={isLoadingRecentSessions}
          />
        </div>
      </div>
      <CreateSessionModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        roomConfig={roomConfig}
        setRoomConfig={setRoomConfig}
        onCreateRoom={handleCreateRoom}
        isCreating={createSessionMutation.isPending}
      />
    </>
  );
};

export default Dashboard;
