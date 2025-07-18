import React, { useState } from 'react';
import { Heart, Diamond, Club, Spade, Users, BookOpen, Target } from 'lucide-react';
import LearnSection from './components/LearnSection';
import PlaySection from './components/PlaySection';
import ScoreSection from './components/ScoreSection';

export interface Team {
  name: string;
  player1: string;
  player2: string;
  score: number;
}

export interface GameState {
  teams: [Team, Team];
  currentDealer: number; // 0-3 representing player index
  round: number;
}

function App() {
  const [activeSection, setActiveSection] = useState<'learn' | 'play' | 'score'>('learn');
  const [gameState, setGameState] = useState<GameState>({
    teams: [
      { name: 'Team 1', player1: '', player2: '', score: 0 },
      { name: 'Team 2', player1: '', player2: '', score: 0 }
    ],
    currentDealer: 0,
    round: 1
  });

  const navigationItems = [
    { id: 'learn', label: 'Learn', icon: BookOpen },
    { id: 'play', label: 'Play', icon: Users },
    { id: 'score', label: 'Score', icon: Target }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex space-x-1">
                <Heart className="w-6 h-6 text-red-400" />
                <Diamond className="w-6 h-6 text-red-400" />
                <Club className="w-6 h-6 text-gray-900" />
                <Spade className="w-6 h-6 text-gray-900" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Euchre Companion</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex space-x-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id as any)}
                  className={`flex items-center space-x-2 px-6 py-4 font-medium transition-all duration-200 border-b-2 ${
                    activeSection === item.id
                      ? 'text-blue-700 bg-blue-50 border-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 border-transparent'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="hidden sm:block">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8 bg-gray-50 min-h-screen">
        {activeSection === 'learn' && <LearnSection />}
        {activeSection === 'play' && (
          <PlaySection gameState={gameState} setGameState={setGameState} />
        )}
        {activeSection === 'score' && (
          <ScoreSection gameState={gameState} setGameState={setGameState} />
        )}
      </main>
    </div>
  );
}

export default App;