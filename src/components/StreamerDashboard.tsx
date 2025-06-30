import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Eye, 
  DollarSign, 
  TrendingUp, 
  Clock,
  Zap,
  Heart,
  Star
} from 'lucide-react';
import { GameState } from '../types/game';
import { StreamerAvatar } from './StreamerAvatar';
import { ViewerChat } from './ViewerChat';
import { StreamingSetup } from './StreamingSetup';
import { StatChange, AnimatedProgressBar } from './InteractiveStats';

interface StreamerDashboardProps {
  gameState: GameState;
}

export const StreamerDashboard: React.FC<StreamerDashboardProps> = ({ gameState }) => {
  const [previousStats, setPreviousStats] = useState(gameState.stats);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPreviousStats(gameState.stats);
    }, 1000);
    return () => clearTimeout(timer);
  }, [gameState.stats]);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const stats = [
    {
      label: 'Followers',
      value: gameState.stats.followers,
      previousValue: previousStats.followers,
      icon: Users,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
    },
    {
      label: 'Subscribers',
      value: gameState.stats.subscribers,
      previousValue: previousStats.subscribers,
      icon: Star,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10',
    },
    {
      label: 'Current Viewers',
      value: gameState.streaming.isLive ? gameState.streaming.currentViewers : 0,
      previousValue: 0,
      icon: Eye,
      color: 'text-red-400',
      bgColor: 'bg-red-500/10',
    },
    {
      label: 'Total Earnings',
      value: gameState.stats.totalEarnings,
      previousValue: previousStats.totalEarnings,
      icon: DollarSign,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Character and Setup Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Streamer Avatar */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
          <StreamerAvatar gameState={gameState} />
          
          {/* Quick Stats */}
          <div className="mt-4 space-y-3">
            <AnimatedProgressBar
              value={gameState.player.energy}
              max={100}
              color="bg-gradient-to-r from-yellow-500 to-orange-500"
              label="Energy"
            />
            <AnimatedProgressBar
              value={gameState.player.mood}
              max={100}
              color="bg-gradient-to-r from-pink-500 to-red-500"
              label="Mood"
            />
            <AnimatedProgressBar
              value={gameState.player.experience % 1000}
              max={1000}
              color="bg-gradient-to-r from-purple-500 to-pink-500"
              label="Experience"
            />
          </div>
        </div>

        {/* Streaming Setup */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
          <h3 className="text-lg font-bold text-white mb-4">Your Setup</h3>
          <StreamingSetup gameState={gameState} />
          
          <div className="mt-4 text-center">
            <p className="text-gray-400 text-sm">Stream Quality</p>
            <p className="text-white font-bold text-lg">{gameState.streaming.streamQuality.toFixed(1)}x</p>
          </div>
        </div>

        {/* Chat */}
        <ViewerChat
          isStreaming={gameState.streaming.isLive}
          viewerCount={gameState.streaming.currentViewers}
          streamQuality={gameState.streaming.streamQuality}
        />
      </div>

      {/* Stream Status */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Stream Status</h2>
          <div className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 ${
            gameState.streaming.isLive 
              ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
              : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
          }`}>
            <div className={`w-2 h-2 rounded-full ${
              gameState.streaming.isLive ? 'bg-red-400 animate-pulse' : 'bg-gray-400'
            }`} />
            {gameState.streaming.isLive ? 'LIVE' : 'OFFLINE'}
          </div>
        </div>
        
        {gameState.streaming.isLive && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-gray-400 text-sm">Duration</p>
              <p className="text-white font-mono text-lg">
                {formatTime(gameState.streaming.streamDuration)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-gray-400 text-sm">Content</p>
              <p className="text-white font-medium capitalize">
                {gameState.streaming.contentType.replace('_', ' ')}
              </p>
            </div>
            <div className="text-center">
              <p className="text-gray-400 text-sm">Peak Viewers</p>
              <p className="text-white font-bold">
                {formatNumber(Math.max(gameState.streaming.currentViewers, gameState.stats.followers * 0.1))}
              </p>
            </div>
            <div className="text-center">
              <p className="text-gray-400 text-sm">Earnings/Min</p>
              <p className="text-green-400 font-bold">
                ${(gameState.streaming.currentViewers * 0.02 * gameState.streaming.streamQuality * 60).toFixed(2)}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 hover:scale-105"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2 rounded-lg ${stat.bgColor} transition-all duration-300`}>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
            </div>
            <StatChange
              value={stat.value}
              previousValue={stat.previousValue}
              label={stat.label}
              formatter={stat.label === 'Total Earnings' ? (v) => `$${formatNumber(v)}` : formatNumber}
            />
            <p className="text-gray-400 text-sm mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};