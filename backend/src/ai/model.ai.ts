import { ChatGoogle } from "@langchain/google";
import { ChatCohere } from "@langchain/cohere";
import { ChatMistralAI } from "@langchain/mistralai";
import config from "../config/config.js";
import { SystemMessage } from "langchain";

export const geminiModel = new ChatGoogle({
  apiKey: config.GEMINI_API_KEY,
  model: "gemini-flash-latest",
});

export const mistralAIModel = new ChatMistralAI({
  apiKey: config.MISTRALAI_API_KEY,
  model: "mistral-medium-latest",
});

export const cohereModel = new ChatCohere({
  apiKey: config.COHERE_API_KEY,
  model: "command-a-03-2025",
});

// command-a-reasoning-08-2025
