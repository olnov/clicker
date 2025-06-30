import React, { useState, useEffect } from 'react';
import { GameState } from '../types/game';

interface StreamerAvatarProps {
  gameState: GameState;
  className?: string;
}

export const StreamerAvatar: React.FC<StreamerAvatarProps> = ({ gameState, className = '' }) => {
  const [isBlinking, setIsBlinking] = useState(false);
  const [isTalking, setIsTalking] = useState(false);

  // Blinking animation
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, 3000 + Math.random() * 2000);

    return () => clearInterval(blinkInterval);
  }, []);

  // Talking animation when streaming
  useEffect(() => {
    if (gameState.streaming.isLive) {
      const talkInterval = setInterval(() => {
        setIsTalking(true);
        setTimeout(() => setIsTalking(false), 200 + Math.random() * 300);
      }, 500 + Math.random() * 1000);

      return () => clearInterval(talkInterval);
    }
  }, [gameState.streaming.isLive]);

  const getMoodColor = () => {
    if (gameState.player.mood >= 80) return 'from-green-400 to-green-500';
    if (gameState.player.mood >= 60) return 'from-yellow-400 to-yellow-500';
    if (gameState.player.mood >= 40) return 'from-orange-400 to-orange-500';
    return 'from-red-400 to-red-500';
  };

  const getEnergyGlow = () => {
    if (gameState.player.energy >= 80) return 'shadow-green-500/50';
    if (gameState.player.energy >= 60) return 'shadow-yellow-500/50';
    if (gameState.player.energy >= 40) return 'shadow-orange-500/50';
    return 'shadow-red-500/50';
  };

  return (
    <div className={`relative ${className}`}>
      {/* Character Container */}
      <div className={`relative w-32 h-32 mx-auto transition-all duration-300 ${
        gameState.streaming.isLive ? 'animate-pulse' : ''
      }`}>
        {/* Energy Aura */}
        <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${getMoodColor()} opacity-20 blur-xl ${getEnergyGlow()} shadow-2xl`} />
        
        {/* Main Avatar Circle */}
        <div className="relative w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 rounded-full border-4 border-gray-600 overflow-hidden">
          {/* Face */}
          <div className="absolute inset-4 bg-gradient-to-br from-pink-200 to-pink-300 rounded-full">
            {/* Eyes */}
            <div className="absolute top-6 left-6 w-3 h-3 bg-gray-800 rounded-full transition-all duration-150">
              {isBlinking && <div className="w-full h-0.5 bg-gray-800 mt-1" />}
            </div>
            <div className="absolute top-6 right-6 w-3 h-3 bg-gray-800 rounded-full transition-all duration-150">
              {isBlinking && <div className="w-full h-0.5 bg-gray-800 mt-1" />}
            </div>
            
            {/* Mouth */}
            <div className={`absolute bottom-6 left-1/2 transform -translate-x-1/2 transition-all duration-200 ${
              isTalking ? 'w-4 h-3 bg-gray-800 rounded-full' : 'w-6 h-1 bg-gray-800 rounded-full'
            }`} />
            
            {/* Cheeks (mood indicator) */}
            {gameState.player.mood >= 70 && (
              <>
                <div className="absolute top-8 left-2 w-2 h-2 bg-pink-400 rounded-full opacity-60" />
                <div className="absolute top-8 right-2 w-2 h-2 bg-pink-400 rounded-full opacity-60" />
              </>
            )}
          </div>
          
          {/* Hair */}
          <div className="absolute -top-2 left-2 right-2 h-8 bg-gradient-to-r from-amber-600 to-amber-700 rounded-t-full" />
        </div>
        
        {/* Status Indicators */}
        {gameState.streaming.isLive && (
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
            <div className="w-3 h-3 bg-white rounded-full" />
          </div>
        )}
        
        {gameState.player.energy < 30 && (
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
            <div className="flex space-x-1">
              <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce" />
              <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
              <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
            </div>
          </div>
        )}
      </div>
      
      {/* Character Name */}
      <div className="text-center mt-2">
        <p className="text-white font-bold text-sm">{gameState.player.name}</p>
        <p className="text-gray-400 text-xs">Level {gameState.player.level}</p>
      </div>
    </div>
  );
};