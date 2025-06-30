import React, { useState } from 'react';
import { 
  BarChart3, 
  Settings, 
  Play, 
  Trophy,
  Menu,
  X
} from 'lucide-react';
import { useGameState } from './hooks/useGameState';
import { StreamerDashboard } from './components/StreamerDashboard';
import { StreamControls } from './components/StreamControls';
import { EquipmentUpgrades } from './components/EquipmentUpgrades';
import { Notifications } from './components/Notifications';
import { FloatingEmojis } from './components/FloatingEmojis';

type ActiveTab = 'dashboard' | 'stream' | 'equipment' | 'achievements';

function App() {
  const {
    gameState,
    notifications,
    startStream,
    endStream,
    upgradeEquipment,
    rest,
  } = useGameState();

  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
    { id: 'stream', name: 'Stream', icon: Play },
    { id: 'equipment', name: 'Equipment', icon: Settings },
    { id: 'achievements', name: 'Achievements', icon: Trophy },
  ] as const;

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <StreamerDashboard gameState={gameState} />;
      case 'stream':
        return (
          <StreamControls
            isStreaming={gameState.streaming.isLive}
            energy={gameState.player.energy}
            onStartStream={startStream}
            onEndStream={endStream}
            onRest={rest}
          />
        );
      case 'equipment':
        return (
          <EquipmentUpgrades
            gameState={gameState}
            onUpgrade={upgradeEquipment}
          />
        );
      case 'achievements':
        return (
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
            <h2 className="text-xl font-bold text-white mb-4">Achievements</h2>
            <div className="text-center py-12">
              <Trophy className="w-16 h-16 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400">Achievement system coming soon!</p>
              <p className="text-gray-500 text-sm mt-2">
                Keep streaming to unlock rewards and milestones
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 relative overflow-hidden">
      {/* Animated Background Effects */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent pointer-events-none animate-pulse" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-pink-500/10 via-transparent to-transparent pointer-events-none animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-blue-500/5 via-transparent to-transparent pointer-events-none animate-pulse" style={{ animationDelay: '2s' }} />
      
      {/* Floating Emojis */}
      <FloatingEmojis
        isStreaming={gameState.streaming.isLive}
        viewerCount={gameState.streaming.currentViewers}
        mood={gameState.player.mood}
      />
      
      {/* Header */}
      <header className="sticky top-0 z-40 bg-gray-900/80 backdrop-blur-md border-b border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center animate-pulse">
                <Play className="w-4 h-4 text-white fill-current" />
              </div>
              <h1 className="text-xl font-bold text-white">StreamerLife</h1>
              {gameState.streaming.isLive && (
                <div className="flex items-center gap-2 px-3 py-1 bg-red-500/20 rounded-full border border-red-500/30">
                  <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
                  <span className="text-red-400 text-sm font-medium">LIVE</span>
                </div>
              )}
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 ${
                    activeTab === tab.id
                      ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30 shadow-lg shadow-purple-500/25'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.name}
                </button>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-300 hover:text-white transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-gray-800/95 backdrop-blur-sm border-t border-gray-700/50 animate-slide-in-right">
            <div className="px-4 py-2 space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-purple-500/20 text-purple-400'
                      : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {renderContent()}
      </main>

      {/* Notifications */}
      <Notifications notifications={notifications} />
    </div>
  );
}

export default App;