
export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot' | 'system_error';
  timestamp: Date;
}

export enum ChatRole {
  USER = "user",
  MODEL = "model",
}

// For Gemini API content history
export interface GeminiMessageContent {
  role: ChatRole;
  parts: { text: string }[];
}
