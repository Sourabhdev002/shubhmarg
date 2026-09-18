import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY || "";

// Lazy singleton client for Gemini
let geminiClient: GoogleGenAI | null = null;

export function getGeminiClient(): GoogleGenAI {
  if (!geminiClient) {
    if (!apiKey) {
      console.warn("⚠️ Warning: GEMINI_API_KEY is not set in environment variables.");
    }
    geminiClient = new GoogleGenAI({ apiKey });
  }
  return geminiClient;
}

export const GEMINI_FLASH_MODEL = process.env.GEMINI_MODEL || "gemini-3.6-flash";
