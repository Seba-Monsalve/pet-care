import axios from "axios";

export const petApi = axios.create({
  baseURL: process.env.VITE_APP_API_URL + "/api",
  // baseURL: "http://localhost:5173/api",
});
