export interface WeddingEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  description: string;
  themeColor: string; // Tailwind class matching background or highlight
  image?: string; // Generated asset or placeholder
  details?: string[]; // Extra traditional pointers or rituals
  dressTheme: string; // Theme of dress for this event
  iconName: string; // Lucide icon identifier
  funActiveEffect: "marigold" | "glow" | "notes" | "rice" | "stars" | "bubbles" | "car";
}

export type InvitationState = "envelope" | "cover" | "events";
