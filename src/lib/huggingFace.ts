import { createHuggingFace } from "@ai-sdk/huggingface";

export const hf = createHuggingFace({
  apiKey: process.env.HUGGINGFACE_API_KEY,
});