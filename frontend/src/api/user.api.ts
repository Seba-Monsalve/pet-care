import axios from "axios";

export const userApi = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL + "/api",

  // baseURL: "http://localhost:5173/api",
});
