import React from 'react';
import { 
  Camera, 
  Mic, 
  Monitor, 
  Lightbulb, 
  Armchair,
  ArrowUp,
  DollarSign
} from 'lucide-react';
import { GameState } from '../types/game';

interface EquipmentUpgradesProps {
  gameState: GameState;
  onUpgrade: (equipmentType: keyof GameState['equipment']) => void;
}

export const EquipmentUpgrades: React.FC<EquipmentUpgradesProps> = ({
  gameState,
  onUpgrade,
}) => {
  const equipmentConfig = {
    camera: { icon: Camera, name: 'Camera', color: 'from-blue-500 to-blue-600' },
    microphone: { icon: Mic, name: 'Microphone', color: 'from-green-500 to-green-600' },
    computer: { icon: Monitor, name: 'Computer', color: 'from-purple-500 to-purple-600' },
    lighting: { icon: Lightbulb, name: 'Lighting', color: 'from-yellow-500 to-yellow-600' },
    chair: { icon: Armchair, name: 'Chair', color: 'from-red-500 to-red-600' },
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Equipment Upgrades</h2>
        <div className="flex items-center gap-2 text-green-400">
          <DollarSign className="w-4 h-4" />
          <span className="font-bold">{formatNumber(gameState.resources.money)}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(gameState.equipment).map(([key, equipment]) => {
          const config = equipmentConfig[key as keyof typeof equipmentConfig];
          const IconComponent = config.icon;
          const upgradeCost = Math.floor(equipment.cost * Math.pow(1.5, equipment.level));
          const canUpgrade = gameState.resources.money >= upgradeCost && equipment.level < equipment.maxLevel;
          const isMaxLevel = equipment.level >= equipment.maxLevel;
          
          return (
            <div
              key={key}
              className="bg-gray-700/30 rounded-lg p-4 border border-gray-600/50 hover:border-gray-500/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${config.color}`}>
                    <IconComponent className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{config.name}</h3>
                    <p className="text-xs text-gray-400">Level {equipment.level}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-400">Multiplier</p>
                  <p className="font-bold text-white">{equipment.multiplier.toFixed(1)}x</p>
                </div>
              </div>
              
              <p className="text-xs text-gray-400 mb-3">{equipment.description}</p>
              
              {/* Level Progress Bar */}
              <div className="mb-3">
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>Progress</span>
                  <span>{equipment.level}/{equipment.maxLevel}</span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-1.5">
                  <div
                    className={`bg-gradient-to-r ${config.color} h-1.5 rounded-full transition-all duration-300`}
                    style={{ width: `${(equipment.level / equipment.maxLevel) * 100}%` }}
                  />
                </div>
              </div>
              
              {/* Upgrade Button */}
              {!isMaxLevel ? (
                <button
                  onClick={() => onUpgrade(key as keyof GameState['equipment'])}
                  disabled={!canUpgrade}
                  className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg font-medium text-sm transition-all duration-200 ${
                    canUpgrade
                      ? `bg-gradient-to-r ${config.color} text-white hover:shadow-lg`
                      : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <ArrowUp className="w-4 h-4" />
                  Upgrade - ${formatNumber(upgradeCost)}
                </button>
              ) : (
                <div className="w-full py-2 px-4 rounded-lg bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 text-center text-sm font-medium">
                  MAX LEVEL
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {/* Stream Quality Indicator */}
      <div className="mt-6 pt-6 border-t border-gray-700">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-300 font-medium">Overall Stream Quality</span>
          <span className="text-white font-bold">
            {gameState.streaming.streamQuality.toFixed(1)}x
          </span>
        </div>
        <div className="w-full bg-gray-600 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${Math.min(100, (gameState.streaming.streamQuality / 3) * 100)}%` }}
          />
        </div>
        <p className="text-xs text-gray-400 mt-1">
          Higher quality attracts more viewers and increases earnings
        </p>
      </div>
    </div>
  );
};