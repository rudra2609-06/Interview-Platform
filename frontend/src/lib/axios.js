import axios from "axios";

export const apiInstance = axios.create({
  baseURL:
    import.meta.env.VITE_MODE !== "production"
      ? import.meta.env.VITE_DEV_SERVER_URL
      : import.meta.env.VITE_BACKEND_URL_WITH_ENDPOINT,
  withCredentials: true,
});
