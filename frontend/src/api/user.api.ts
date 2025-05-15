import axios from "axios";

export const userApi = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL + "/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  // baseURL: "http://localhost:5173/api",
});
