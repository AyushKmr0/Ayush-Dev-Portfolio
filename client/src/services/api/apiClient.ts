import axios from "axios";

const configuredBaseURL = import.meta.env.VITE_API_BASE_URL?.replace(/\/+$/, "");

if (!configuredBaseURL) {
  throw new Error("VITE_API_BASE_URL is not configured.");
}

const baseURL = /\/api\/v1$/i.test(configuredBaseURL)
  ? configuredBaseURL
  : `${configuredBaseURL}/api/v1`;

export const apiClient = axios.create({
  baseURL,
  timeout: 15_000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
