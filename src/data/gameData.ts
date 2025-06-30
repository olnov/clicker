import { GameState, EquipmentItem } from '../types/game';

export const initialEquipment: Record<keyof GameState['equipment'], EquipmentItem> = {
  camera: {
    id: 'camera',
    name: 'Webcam',
    level: 1,
    maxLevel: 10,
    cost: 100,
    multiplier: 1.0,
    description: 'Better cameras improve stream quality',
  },
  microphone: {
    id: 'microphone',
    name: 'Microphone',
    level: 1,
    maxLevel: 10,
    cost: 80,
    multiplier: 1.0,
    description: 'Clear audio keeps viewers engaged',
  },
  computer: {
    id: 'computer',
    name: 'Gaming PC',
    level: 1,
    maxLevel: 10,
    cost: 500,
    multiplier: 1.0,
    description: 'Faster computers handle better graphics',
  },
  lighting: {
    id: 'lighting',
    name: 'LED Lights',
    level: 1,
    maxLevel: 10,
    cost: 60,
    multiplier: 1.0,
    description: 'Good lighting makes you look professional',
  },
  chair: {
    id: 'chair',
    name: 'Gaming Chair',
    level: 1,
    maxLevel: 10,
    cost: 150,
    multiplier: 1.0,
    description: 'Comfort during long streaming sessions',
  },
};

export const initialGameState: GameState = {
  player: {
    name: 'NewStreamer',
    level: 1,
    experience: 0,
    energy: 100,
    mood: 80,
    reputation: 50,
  },
  stats: {
    followers: 12,
    subscribers: 0,
    totalViews: 0,
    totalStreams: 0,
    totalEarnings: 0,
  },
  resources: {
    money: 50,
    streamPoints: 0,
  },
  equipment: initialEquipment,
  streaming: {
    isLive: false,
    currentViewers: 0,
    streamDuration: 0,
    contentType: 'gaming',
    streamQuality: 1.0,
  },
  achievements: [],
  lastUpdate: Date.now(),
};

export const contentTypes = [
  { id: 'gaming', name: 'Gaming', icon: 'Gamepad2', color: 'from-blue-500 to-purple-600' },
  { id: 'chatting', name: 'Just Chatting', icon: 'MessageCircle', color: 'from-green-500 to-teal-600' },
  { id: 'tutorial', name: 'Tutorial', icon: 'BookOpen', color: 'from-orange-500 to-red-600' },
  { id: 'music', name: 'Music', icon: 'Music', color: 'from-pink-500 to-rose-600' },
  { id: 'creative', name: 'Art & Design', icon: 'Palette', color: 'from-indigo-500 to-blue-600' },
] as const;