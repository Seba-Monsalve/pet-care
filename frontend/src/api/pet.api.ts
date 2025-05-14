import axios from "axios";

export const petApi = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL + "/api",
  withCredentials: true,
  // baseURL: "http://localhost:5173/api",
});
