import { useMutation, useQuery } from "@tanstack/react-query";
import { sessionApi } from "../api/api.js";
import toast from "react-hot-toast";

export const useActiveSessions = () => {
  return useQuery({
    queryKey: ["activeSessions"],
    queryFn: sessionApi.getActiveSession,
  });
};

export const useCreateSession = () => {
  return useMutation({
    mutationKey: ["createSession"],
    mutationFn: (data) => sessionApi.createSession(data),
    onSuccess: () => toast.success("Session Created Successfully"),
    onError: (error) => toast.error(error.message),  
  });
};

export const useMyRecentSessions = () => {
  return useQuery({
    queryKey: ["myRecentSessions"],
    queryFn: sessionApi.getPastSessions,
  });
};

export const useSessionById = (id) => {
  return useQuery({
    queryKey: ["sessionById", id],
    queryFn: ({queryKey}) => sessionApi.getSessionById(queryKey[1]), 
    refetchInterval: 5000,
    enabled: !!id,  
  });
};

export const useJoinSession = () => {  
  return useMutation({
    mutationKey: ["joinSession"],
    mutationFn: (id) => sessionApi.joinSession(id),
    onSuccess: () => toast.success("Joined Successfully"),
    onError: (error) => toast.error(error.message),
  });
};

export const useEndSession = () => {  
  return useMutation({
    mutationKey: ["endSession"],
    mutationFn: (id) => sessionApi.endSession(id),  
    onSuccess: () => toast.success("Session Ended Successfully"),
    onError: (error) => toast.error(error.message),
  });
};