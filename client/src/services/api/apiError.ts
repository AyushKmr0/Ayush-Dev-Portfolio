import axios from "axios";

export function getApiErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    if (error.code === "ECONNABORTED") {
      return "The request timed out. Please try again.";
    }

    if (!error.response) {
      return "Unable to connect to the server. Please try again later.";
    }

    const status = error.response.status;

    if (status >= 500) {
      return "Something went wrong on the server. Please try again later.";
    }

    if (status === 404) {
      return "The requested resource was not found.";
    }

    if (status === 429) {
      return "Too many requests. Please wait before trying again.";
    }

    return "The request could not be completed.";
  }

  return "An unexpected error occurred.";
}