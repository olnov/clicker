import React, { useState, useEffect } from 'react';
import { MessageCircle, Heart, Gift } from 'lucide-react';

interface ChatMessage {
  id: string;
  username: string;
  message: string;
  type: 'message' | 'follow' | 'donation' | 'subscription';
  timestamp: number;
}

interface ViewerChatProps {
  isStreaming: boolean;
  viewerCount: number;
  streamQuality: number;
}

export const ViewerChat: React.FC<ViewerChatProps> = ({ 
  isStreaming, 
  viewerCount, 
  streamQuality 
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const chatMessages = [
    "Great stream!", "Love the content!", "First time here, loving it!",
    "Can you play my favorite song?", "Amazing setup!", "Keep it up!",
    "This is so entertaining!", "You're doing great!", "More content like this!",
    "Subscribed!", "Following now!", "This is awesome!",
    "Can't stop watching!", "Best streamer ever!", "So funny!",
    "Love your energy!", "Keep streaming!", "This made my day!"
  ];

  const usernames = [
    "GamerGirl123", "StreamFan", "ViewerBot", "ChatMaster", "FollowerOne",
    "SubSquad", "StreamSniper", "ContentKing", "ViewerVIP", "ChatChamp",
    "StreamStar", "FanFavorite", "ViewerVibes", "ChatCraze", "StreamSupport"
  ];

  useEffect(() => {
    if (!isStreaming) {
      setMessages([]);
      return;
    }

    const messageInterval = setInterval(() => {
      if (Math.random() < 0.7) { // 70% chance for regular message
        const newMessage: ChatMessage = {
          id: Date.now().toString(),
          username: usernames[Math.floor(Math.random() * usernames.length)],
          message: chatMessages[Math.floor(Math.random() * chatMessages.length)],
          type: 'message',
          timestamp: Date.now(),
        };
        
        setMessages(prev => [...prev.slice(-9), newMessage]);
      } else if (Math.random() < 0.1) { // 10% chance for special events
        const eventType = Math.random();
        let specialMessage: ChatMessage;
        
        if (eventType < 0.4) {
          specialMessage = {
            id: Date.now().toString(),
            username: usernames[Math.floor(Math.random() * usernames.length)],
            message: "followed the stream!",
            type: 'follow',
            timestamp: Date.now(),
          };
        } else if (eventType < 0.7) {
          specialMessage = {
            id: Date.now().toString(),
            username: usernames[Math.floor(Math.random() * usernames.length)],
            message: `donated $${Math.floor(Math.random() * 20) + 1}!`,
            type: 'donation',
            timestamp: Date.now(),
          };
        } else {
          specialMessage = {
            id: Date.now().toString(),
            username: usernames[Math.floor(Math.random() * usernames.length)],
            message: "subscribed!",
            type: 'subscription',
            timestamp: Date.now(),
          };
        }
        
        setMessages(prev => [...prev.slice(-9), specialMessage]);
      }
    }, 2000 + Math.random() * 3000); // Random interval between 2-5 seconds

    return () => clearInterval(messageInterval);
  }, [isStreaming, viewerCount, streamQuality]);

  if (!isStreaming) {
    return (
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 h-80">
        <div className="flex items-center gap-2 mb-4">
          <MessageCircle className="w-5 h-5 text-gray-400" />
          <h3 className="text-lg font-bold text-white">Chat</h3>
        </div>
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500 text-center">Start streaming to see chat messages!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 h-80">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-blue-400" />
          <h3 className="text-lg font-bold text-white">Chat</h3>
        </div>
        <div className="flex items-center gap-1 text-green-400 text-sm">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          {viewerCount} viewers
        </div>
      </div>
      
      <div className="space-y-2 h-56 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-gray-700">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-2 rounded-lg text-sm animate-slide-in-right ${
              msg.type === 'follow' ? 'bg-blue-500/20 border border-blue-500/30' :
              msg.type === 'donation' ? 'bg-green-500/20 border border-green-500/30' :
              msg.type === 'subscription' ? 'bg-purple-500/20 border border-purple-500/30' :
              'bg-gray-700/50'
            }`}
          >
            <div className="flex items-center gap-2">
              {msg.type === 'follow' && <Heart className="w-3 h-3 text-blue-400" />}
              {msg.type === 'donation' && <Gift className="w-3 h-3 text-green-400" />}
              {msg.type === 'subscription' && <Gift className="w-3 h-3 text-purple-400" />}
              <span className={`font-medium ${
                msg.type === 'follow' ? 'text-blue-400' :
                msg.type === 'donation' ? 'text-green-400' :
                msg.type === 'subscription' ? 'text-purple-400' :
                'text-gray-300'
              }`}>
                {msg.username}
              </span>
              <span className="text-gray-300">{msg.message}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};