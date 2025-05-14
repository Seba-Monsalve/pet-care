import axios from "axios";

export const userApi = axios.create({
  //   baseURL: process.env.VITE_APP_API_URL,
  baseURL: "http://localhost:5173/api",
});
