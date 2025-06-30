import { useState, useEffect, useCallback } from 'react';
import { GameState, ContentType, RandomEvent } from '../types/game';
import { initialGameState } from '../data/gameData';

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>(() => {
    const saved = localStorage.getItem('streamerGameState');
    return saved ? JSON.parse(saved) : initialGameState;
  });

  const [notifications, setNotifications] = useState<string[]>([]);

  // Save game state to localStorage
  useEffect(() => {
    localStorage.setItem('streamerGameState', JSON.stringify(gameState));
  }, [gameState]);

  // Game tick - runs every second when streaming
  useEffect(() => {
    if (!gameState.streaming.isLive) return;

    const interval = setInterval(() => {
      setGameState(prev => {
        const newState = { ...prev };
        
        // Increase stream duration
        newState.streaming.streamDuration += 1;
        
        // Calculate viewer growth/loss
        const baseViewers = Math.floor(
          newState.stats.followers * 0.05 * 
          newState.streaming.streamQuality * 
          getContentMultiplier(newState.streaming.contentType)
        );
        
        const variance = Math.random() * 0.4 - 0.2; // ±20% variance
        newState.streaming.currentViewers = Math.max(1, 
          Math.floor(baseViewers * (1 + variance))
        );
        
        // Earn money from viewers
        const earnings = Math.floor(
          newState.streaming.currentViewers * 0.02 * newState.streaming.streamQuality
        );
        newState.resources.money += earnings;
        newState.stats.totalEarnings += earnings;
        
        // Gain followers occasionally
        if (Math.random() < 0.1) {
          const newFollowers = Math.floor(Math.random() * 3) + 1;
          newState.stats.followers += newFollowers;
        }
        
        // Subscribers (less frequent, higher value)
        if (Math.random() < 0.02) {
          newState.stats.subscribers += 1;
          newState.resources.money += 50;
        }
        
        // Lose energy over time
        newState.player.energy = Math.max(0, newState.player.energy - 0.5);
        
        // Update total views
        newState.stats.totalViews += newState.streaming.currentViewers;
        
        return newState;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [gameState.streaming.isLive]);

  const startStream = useCallback((contentType: ContentType) => {
    if (gameState.player.energy < 20) {
      addNotification("Not enough energy to start streaming!");
      return;
    }

    setGameState(prev => ({
      ...prev,
      streaming: {
        ...prev.streaming,
        isLive: true,
        contentType,
        streamDuration: 0,
        currentViewers: Math.floor(prev.stats.followers * 0.02) || 1,
      },
      stats: {
        ...prev.stats,
        totalStreams: prev.stats.totalStreams + 1,
      }
    }));
    
    addNotification(`Started streaming ${contentType}!`);
  }, [gameState.player.energy]);

  const endStream = useCallback(() => {
    setGameState(prev => {
      const experience = Math.floor(prev.streaming.streamDuration * 2);
      const newLevel = Math.floor((prev.player.experience + experience) / 1000) + 1;
      
      return {
        ...prev,
        streaming: {
          ...prev.streaming,
          isLive: false,
          currentViewers: 0,
          streamDuration: 0,
        },
        player: {
          ...prev.player,
          experience: prev.player.experience + experience,
          level: Math.max(prev.player.level, newLevel),
        }
      };
    });
    
    addNotification("Stream ended!");
  }, []);

  const upgradeEquipment = useCallback((equipmentType: keyof GameState['equipment']) => {
    setGameState(prev => {
      const equipment = prev.equipment[equipmentType];
      const cost = Math.floor(equipment.cost * Math.pow(1.5, equipment.level));
      
      if (prev.resources.money < cost || equipment.level >= equipment.maxLevel) {
        return prev;
      }
      
      const newState = { ...prev };
      newState.resources.money -= cost;
      newState.equipment[equipmentType] = {
        ...equipment,
        level: equipment.level + 1,
        cost: Math.floor(cost * 1.5),
        multiplier: equipment.multiplier + 0.1,
      };
      
      // Recalculate stream quality
      newState.streaming.streamQuality = calculateStreamQuality(newState.equipment);
      
      return newState;
    });
    
    addNotification(`Upgraded ${equipmentType}!`);
  }, []);

  const rest = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      player: {
        ...prev.player,
        energy: Math.min(100, prev.player.energy + 30),
      }
    }));
    
    addNotification("Feeling refreshed!");
  }, []);

  const addNotification = useCallback((message: string) => {
    setNotifications(prev => [...prev.slice(-4), message]);
    setTimeout(() => {
      setNotifications(prev => prev.slice(1));
    }, 3000);
  }, []);

  return {
    gameState,
    notifications,
    startStream,
    endStream,
    upgradeEquipment,
    rest,
  };
};

const getContentMultiplier = (contentType: ContentType): number => {
  const multipliers = {
    gaming: 1.2,
    chatting: 1.0,
    tutorial: 1.1,
    music: 1.3,
    creative: 1.1,
  };
  return multipliers[contentType] || 1.0;
};

const calculateStreamQuality = (equipment: GameState['equipment']): number => {
  const totalMultiplier = Object.values(equipment).reduce(
    (sum, item) => sum + item.multiplier, 0
  ) / Object.keys(equipment).length;
  
  return Math.min(3.0, totalMultiplier);
};