import React, { useState, useEffect } from 'react';

interface FloatingEmoji {
  id: string;
  emoji: string;
  x: number;
  y: number;
  duration: number;
}

interface FloatingEmojisProps {
  isStreaming: boolean;
  viewerCount: number;
  mood: number;
}

export const FloatingEmojis: React.FC<FloatingEmojisProps> = ({ 
  isStreaming, 
  viewerCount, 
  mood 
}) => {
  const [emojis, setEmojis] = useState<FloatingEmoji[]>([]);

  const positiveEmojis = ['😊', '😄', '🎉', '👏', '❤️', '🔥', '⭐', '💯', '🚀', '🎊'];
  const neutralEmojis = ['😐', '🤔', '😑', '😶', '🙂'];
  const negativeEmojis = ['😢', '😞', '😔', '💔', '😴', '😰'];

  useEffect(() => {
    if (!isStreaming) {
      setEmojis([]);
      return;
    }

    const emojiInterval = setInterval(() => {
      if (Math.random() < 0.3) { // 30% chance to spawn emoji
        let emojiSet = neutralEmojis;
        
        if (mood >= 70) emojiSet = positiveEmojis;
        else if (mood <= 40) emojiSet = negativeEmojis;
        
        const newEmoji: FloatingEmoji = {
          id: Date.now().toString(),
          emoji: emojiSet[Math.floor(Math.random() * emojiSet.length)],
          x: Math.random() * 80 + 10, // 10% to 90% from left
          y: 100, // Start from bottom
          duration: 3000 + Math.random() * 2000, // 3-5 seconds
        };
        
        setEmojis(prev => [...prev.slice(-9), newEmoji]);
        
        // Remove emoji after animation
        setTimeout(() => {
          setEmojis(prev => prev.filter(e => e.id !== newEmoji.id));
        }, newEmoji.duration);
      }
    }, 1000 + Math.random() * 2000);

    return () => clearInterval(emojiInterval);
  }, [isStreaming, mood, viewerCount]);

  if (!isStreaming) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      {emojis.map((emoji) => (
        <div
          key={emoji.id}
          className="absolute text-2xl animate-float-up"
          style={{
            left: `${emoji.x}%`,
            bottom: '10%',
            animationDuration: `${emoji.duration}ms`,
          }}
        >
          {emoji.emoji}
        </div>
      ))}
    </div>
  );
};