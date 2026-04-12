import { apiInstance } from "../lib/axios.js";

const getErrorMessage = (error) => {
  return (
    error.response?.data?.message || error.message || "Something went wrong"
  );
};

export const sessionApi = {
  createSession: async (data) => {
    try {
      const res = await apiInstance.post("/sessions", data);
      if (res.status === 201) {
        return { success: true, data: res.data.session };
      }
      return { success: false };
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },

  getActiveSession: async () => {
    try {
      const res = await apiInstance.get("/sessions");
      if (res.status === 200) {
        return { success: true, data: res.data.session };
      }
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },

  getPastSessions: async () => {
    try {
      const res = await apiInstance.get("/sessions/my-recent");
      if (res.status === 200) {
        return { success: true, data: res.data.sessions };
      }
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },

  getSessionById: async (id) => {
    if (!id) return { success: false, message: "Id Required" };
    try {
      const res = await apiInstance.get(`/sessions/${id}`);
      if (res.status === 200) {
        return { success: true, data: res.data.session };
      }
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },

  joinSession: async (id) => {
    if (!id) return { success: false, message: "Id Required" };
    try {
      const res = await apiInstance.post(`/sessions/${id}/join`);
      if (res.status === 200) {
        return { success: true, data: res.data.session };
      }
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },

  endSession: async (id) => {
    if (!id) return { success: false, message: "Id Required" };
    try {
      const res = await apiInstance.post(`/sessions/${id}/end`);
      if (res.status === 200) {
        return { success: true };
      }
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },

  getStreamToken: async () => {
    try {
      const res = await apiInstance.get("/chat/token");
      if (res.status === 200) {
        return { status: true, data: res.data.user, token: res.data.token };
      }
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },
};
