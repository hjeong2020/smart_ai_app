export interface ChatMessage {
  text: string;
  user?: boolean; // true if sent by the current user, false if received from AI
}