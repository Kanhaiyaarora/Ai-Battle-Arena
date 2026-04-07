import axios from "axios";

// Creating an axios instance with base URL setup
const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const invokeBattle = async (problem) => {
  try {
    const response = await api.post("/invoke", { problem });
    return response.data;
  } catch (error) {
    console.error("Error asking the AI models:", error);
    throw error;
  }
};
