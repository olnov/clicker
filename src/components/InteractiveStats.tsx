import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StatChangeProps {
  value: number;
  previousValue: number;
  label: string;
  formatter?: (value: number) => string;
}

export const StatChange: React.FC<StatChangeProps> = ({ 
  value, 
  previousValue, 
  label, 
  formatter = (v) => v.toString() 
}) => {
  const [showChange, setShowChange] = useState(false);
  const change = value - previousValue;

  useEffect(() => {
    if (change !== 0) {
      setShowChange(true);
      const timer = setTimeout(() => setShowChange(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [change]);

  const getChangeIcon = () => {
    if (change > 0) return <TrendingUp className="w-3 h-3" />;
    if (change < 0) return <TrendingDown className="w-3 h-3" />;
    return <Minus className="w-3 h-3" />;
  };

  const getChangeColor = () => {
    if (change > 0) return 'text-green-400 bg-green-500/20';
    if (change < 0) return 'text-red-400 bg-red-500/20';
    return 'text-gray-400 bg-gray-500/20';
  };

  return (
    <div className="relative">
      <span className="text-2xl font-bold text-white">{formatter(value)}</span>
      {showChange && change !== 0 && (
        <div className={`absolute -top-6 left-0 flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium animate-bounce ${getChangeColor()}`}>
          {getChangeIcon()}
          {Math.abs(change) > 0 && formatter(Math.abs(change))}
        </div>
      )}
    </div>
  );
};

interface AnimatedProgressBarProps {
  value: number;
  max: number;
  color: string;
  label: string;
  showValue?: boolean;
}

export const AnimatedProgressBar: React.FC<AnimatedProgressBarProps> = ({
  value,
  max,
  color,
  label,
  showValue = true
}) => {
  const percentage = Math.min(100, (value / max) * 100);
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-gray-400">{label}</span>
        {showValue && <span className="text-white font-medium">{value}/{max}</span>}
      </div>
      <div className="relative w-full bg-gray-700 rounded-full h-3 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-out ${color} relative`}
          style={{ width: `${percentage}%` }}
        >
          {/* Animated shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
        </div>
        {/* Pulse effect when at low values */}
        {percentage < 30 && (
          <div className={`absolute inset-0 ${color} opacity-30 animate-pulse rounded-full`} />
        )}
      </div>
    </div>
  );
};