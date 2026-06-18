export interface PhotoItem {
  id: string;
  url: string;
  caption: string;
  date: string;
  location?: string;
  category: 'memories' | 'goofy' | 'travel' | 'favorites';
}

export interface MessageCard {
  id: string;
  sender: string;
  text: string;
  date: string;
  bgColor: string;
  sticker: string;
  isPinned: boolean;
}

export interface TimelineEvent {
  id: string;
  title: string;
  date: string;
  description: string;
  emoji: string;
}

export interface ReasonCard {
  id: string;
  title: string;
  description: string;
  emoji: string;
  tag: string;
}

export interface SurpriseAdjective {
  phrase: string;
  color: string;
}
