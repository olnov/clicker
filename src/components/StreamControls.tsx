import React from 'react';
import { Play, Square, Coffee } from 'lucide-react';
import { ContentType } from '../types/game';
import { contentTypes } from '../data/gameData';

interface StreamControlsProps {
  isStreaming: boolean;
  energy: number;
  onStartStream: (contentType: ContentType) => void;
  onEndStream: () => void;
  onRest: () => void;
}

export const StreamControls: React.FC<StreamControlsProps> = ({
  isStreaming,
  energy,
  onStartStream,
  onEndStream,
  onRest,
}) => {
  const [selectedContentType, setSelectedContentType] = React.useState<ContentType>('gaming');

  const getIcon = (iconName: string) => {
    const icons: Record<string, React.ComponentType<any>> = {
      Gamepad2: ({ className }: { className?: string }) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m-6-8h8a2 2 0 012 2v8a2 2 0 01-2 2H8a2 2 0 01-2-2v-8a2 2 0 012-2z" />
        </svg>
      ),
      MessageCircle: ({ className }: { className?: string }) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      BookOpen: ({ className }: { className?: string }) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      Music: ({ className }: { className?: string }) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
        </svg>
      ),
      Palette: ({ className }: { className?: string }) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM7 3H5a2 2 0 00-2 2v12a4 4 0 004 4h2a2 2 0 002-2V5a2 2 0 00-2-2z" />
        </svg>
      ),
    };
    return icons[iconName] || icons.Gamepad2;
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
      <h2 className="text-xl font-bold text-white mb-6">Stream Controls</h2>
      
      {!isStreaming ? (
        <div className="space-y-6">
          {/* Content Type Selection */}
          <div>
            <h3 className="text-sm font-medium text-gray-300 mb-3">Choose Content Type</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {contentTypes.map((type) => {
                const IconComponent = getIcon(type.icon);
                return (
                  <button
                    key={type.id}
                    onClick={() => setSelectedContentType(type.id as ContentType)}
                    className={`p-4 rounded-lg border transition-all duration-200 ${
                      selectedContentType === type.id
                        ? 'border-purple-500 bg-purple-500/20'
                        : 'border-gray-600 bg-gray-700/30 hover:border-gray-500'
                    }`}
                  >
                    <div className={`w-8 h-8 mx-auto mb-2 bg-gradient-to-r ${type.color} rounded-lg p-1.5`}>
                      <IconComponent className="w-full h-full text-white" />
                    </div>
                    <p className="text-sm text-white font-medium">{type.name}</p>
                  </button>
                );
              })}
            </div>
          </div>
          
          {/* Start Stream Button */}
          <button
            onClick={() => onStartStream(selectedContentType)}
            disabled={energy < 20}
            className={`w-full flex items-center justify-center gap-3 py-4 px-6 rounded-lg font-bold text-lg transition-all duration-200 ${
              energy >= 20
                ? 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white shadow-lg hover:shadow-red-500/25'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Play className="w-5 h-5" />
            Go Live!
          </button>
          
          {energy < 20 && (
            <p className="text-red-400 text-sm text-center">
              Need at least 20% energy to start streaming
            </p>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="w-16 h-16 bg-red-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <div className="w-8 h-8 bg-white rounded-full"></div>
              </div>
            </div>
            <p className="text-red-400 font-bold text-lg">YOU ARE LIVE!</p>
            <p className="text-gray-300 text-sm">Streaming {selectedContentType}</p>
          </div>
          
          <button
            onClick={onEndStream}
            className="w-full flex items-center justify-center gap-3 py-4 px-6 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-bold transition-colors"
          >
            <Square className="w-5 h-5" />
            End Stream
          </button>
        </div>
      )}
      
      {/* Rest Button */}
      <div className="mt-6 pt-6 border-t border-gray-700">
        <button
          onClick={onRest}
          disabled={energy >= 100}
          className={`w-full flex items-center justify-center gap-3 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
            energy < 100
              ? 'bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/30'
              : 'bg-gray-700 text-gray-500 cursor-not-allowed'
          }`}
        >
          <Coffee className="w-4 h-4" />
          Take a Break (+30 Energy)
        </button>
      </div>
    </div>
  );
};