export interface GameState {
  player: {
    name: string;
    level: number;
    experience: number;
    energy: number;
    mood: number;
    reputation: number;
  };
  stats: {
    followers: number;
    subscribers: number;
    totalViews: number;
    totalStreams: number;
    totalEarnings: number;
  };
  resources: {
    money: number;
    streamPoints: number;
  };
  equipment: {
    camera: EquipmentItem;
    microphone: EquipmentItem;
    computer: EquipmentItem;
    lighting: EquipmentItem;
    chair: EquipmentItem;
  };
  streaming: {
    isLive: boolean;
    currentViewers: number;
    streamDuration: number;
    contentType: ContentType;
    streamQuality: number;
  };
  achievements: Achievement[];
  lastUpdate: number;
}

export interface EquipmentItem {
  id: string;
  name: string;
  level: number;
  maxLevel: number;
  cost: number;
  multiplier: number;
  description: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  unlocked: boolean;
  progress: number;
  target: number;
}

export type ContentType = 'gaming' | 'chatting' | 'tutorial' | 'music' | 'creative';

export interface RandomEvent {
  id: string;
  title: string;
  description: string;
  type: 'positive' | 'negative' | 'neutral';
  effects: {
    followers?: number;
    money?: number;
    reputation?: number;
    energy?: number;
  };
}