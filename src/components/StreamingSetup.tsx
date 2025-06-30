import React from 'react';
import { Monitor, Camera, Mic, Lightbulb } from 'lucide-react';
import { GameState } from '../types/game';

interface StreamingSetupProps {
  gameState: GameState;
  className?: string;
}

export const StreamingSetup: React.FC<StreamingSetupProps> = ({ gameState, className = '' }) => {
  const getEquipmentGlow = (level: number) => {
    if (level >= 8) return 'shadow-purple-500/50 border-purple-400';
    if (level >= 6) return 'shadow-blue-500/50 border-blue-400';
    if (level >= 4) return 'shadow-green-500/50 border-green-400';
    if (level >= 2) return 'shadow-yellow-500/50 border-yellow-400';
    return 'border-gray-600';
  };

  return (
    <div className={`relative ${className}`}>
      {/* Desk */}
      <div className="relative bg-gradient-to-b from-amber-800 to-amber-900 rounded-lg h-20 border-2 border-amber-700">
        {/* Monitor */}
        <div className={`absolute -top-16 left-1/2 transform -translate-x-1/2 w-20 h-16 bg-gray-900 rounded-t-lg border-2 ${getEquipmentGlow(gameState.equipment.computer.level)} transition-all duration-300`}>
          <div className="w-full h-12 bg-gradient-to-b from-blue-900 to-blue-800 rounded-t-md flex items-center justify-center">
            {gameState.streaming.isLive && (
              <div className="text-xs text-green-400 animate-pulse">● LIVE</div>
            )}
          </div>
          <div className="w-full h-2 bg-gray-800 rounded-b-md" />
          {/* Monitor Stand */}
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-700" />
        </div>

        {/* Camera */}
        <div className={`absolute -top-20 left-1/2 transform -translate-x-1/2 w-4 h-3 bg-gray-800 rounded-full border ${getEquipmentGlow(gameState.equipment.camera.level)} transition-all duration-300`}>
          {gameState.streaming.isLive && (
            <div className="absolute inset-0 bg-red-500 rounded-full animate-pulse opacity-50" />
          )}
        </div>

        {/* Microphone */}
        <div className={`absolute -top-12 right-4 w-3 h-8 bg-gray-800 rounded-full border ${getEquipmentGlow(gameState.equipment.microphone.level)} transition-all duration-300`}>
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-4 bg-gray-700" />
          {gameState.streaming.isLive && (
            <div className="absolute -right-1 top-1 w-1 h-1 bg-green-400 rounded-full animate-ping" />
          )}
        </div>

        {/* Lighting */}
        <div className={`absolute -top-8 left-2 w-6 h-4 bg-yellow-300 rounded-lg border ${getEquipmentGlow(gameState.equipment.lighting.level)} transition-all duration-300 ${
          gameState.streaming.isLive ? 'animate-pulse' : ''
        }`}>
          <Lightbulb className="w-3 h-3 text-yellow-600 mx-auto mt-0.5" />
        </div>

        {/* Keyboard */}
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-12 h-4 bg-gray-800 rounded border border-gray-600">
          <div className="grid grid-cols-6 gap-0.5 p-0.5">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="w-1 h-1 bg-gray-600 rounded-sm" />
            ))}
          </div>
        </div>

        {/* Mouse */}
        <div className="absolute top-4 right-6 w-3 h-4 bg-gray-800 rounded-lg border border-gray-600" />
      </div>

      {/* Chair */}
      <div className={`absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-12 bg-gradient-to-b from-red-600 to-red-700 rounded-t-full border-2 ${getEquipmentGlow(gameState.equipment.chair.level)} transition-all duration-300`}>
        {/* Chair Back */}
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-12 h-8 bg-gradient-to-b from-red-600 to-red-700 rounded-t-lg border-2 border-red-500" />
        {/* Chair Base */}
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-2 bg-gray-700 rounded-full" />
      </div>

      {/* Ambient Lighting Effects */}
      {gameState.streaming.isLive && (
        <>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-pink-500/10 rounded-lg animate-pulse" />
          <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/5 via-transparent to-green-500/5 rounded-lg animate-pulse" style={{ animationDelay: '1s' }} />
        </>
      )}
    </div>
  );
};