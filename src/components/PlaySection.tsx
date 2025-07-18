import React, { useState } from 'react';
import { Heart, Diamond, Club, Spade, RotateCcw, ArrowRight, Users, Edit2 } from 'lucide-react';
import { GameState } from '../App';

interface PlaySectionProps {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
}

type Suit = 'hearts' | 'diamonds' | 'clubs' | 'spades';

const PlaySection: React.FC<PlaySectionProps> = ({ gameState, setGameState }) => {
  const [showSetup, setShowSetup] = useState(false);
  const [selectedTrump, setSelectedTrump] = useState<Suit | null>(null);
  const [tempTeams, setTempTeams] = useState(gameState.teams);

  const suits = [
    { name: 'hearts', icon: Heart, color: 'text-red-600', bgColor: 'bg-red-50', borderColor: 'border-red-200' },
    { name: 'diamonds', icon: Diamond, color: 'text-red-600', bgColor: 'bg-red-50', borderColor: 'border-red-200' },
    { name: 'clubs', icon: Club, color: 'text-gray-900', bgColor: 'bg-gray-100', borderColor: 'border-gray-300' },
    { name: 'spades', icon: Spade, color: 'text-gray-900', bgColor: 'bg-gray-100', borderColor: 'border-gray-300' }
  ];

  const getTrumpOrder = (trump: Suit) => {
    const sameColorSuit = {
      hearts: 'diamonds',
      diamonds: 'hearts',
      clubs: 'spades',
      spades: 'clubs'
    };

    return [
      `Jack of ${trump.charAt(0).toUpperCase() + trump.slice(1)}`,
      `Jack of ${sameColorSuit[trump].charAt(0).toUpperCase() + sameColorSuit[trump].slice(1)}`,
      `Ace of ${trump.charAt(0).toUpperCase() + trump.slice(1)}`,
      `King of ${trump.charAt(0).toUpperCase() + trump.slice(1)}`,
      `Queen of ${trump.charAt(0).toUpperCase() + trump.slice(1)}`,
      `10 of ${trump.charAt(0).toUpperCase() + trump.slice(1)}`,
      `9 of ${trump.charAt(0).toUpperCase() + trump.slice(1)}`
    ];
  };

  const getAllPlayers = () => {
    return [
      gameState.teams[0].player1,
      gameState.teams[1].player1,
      gameState.teams[0].player2,
      gameState.teams[1].player2
    ];
  };

  const getCurrentDealer = () => {
    const players = getAllPlayers();
    return players[gameState.currentDealer] || `Player ${gameState.currentDealer + 1}`;
  };

  const nextRound = () => {
    setGameState(prev => ({
      ...prev,
      currentDealer: (prev.currentDealer + 1) % 4,
      round: prev.round + 1
    }));
    setSelectedTrump(null);
  };

  const saveTeamSetup = () => {
    setGameState(prev => ({
      ...prev,
      teams: tempTeams
    }));
    setShowSetup(false);
  };

  const hasPlayerNames = gameState.teams[0].player1 && gameState.teams[0].player2 && 
                        gameState.teams[1].player1 && gameState.teams[1].player2;

  if (showSetup || !hasPlayerNames) {
    return (
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Team Setup</h2>
          <p className="text-xl text-gray-700">Enter player names for both teams</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {tempTeams.map((team, teamIndex) => (
            <div
              key={teamIndex}
              className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
            >
              <div className="mb-4">
                <label className="block text-gray-900 font-semibold mb-2">Team Name</label>
                <input
                  type="text"
                  value={team.name}
                  onChange={(e) => {
                    const newTeams = [...tempTeams];
                    newTeams[teamIndex].name = e.target.value;
                    setTempTeams(newTeams);
                  }}
                  className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder={`Team ${teamIndex + 1}`}
                />
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-900 font-semibold mb-2">Player 1</label>
                  <input
                    type="text"
                    value={team.player1}
                    onChange={(e) => {
                      const newTeams = [...tempTeams];
                      newTeams[teamIndex].player1 = e.target.value;
                      setTempTeams(newTeams);
                    }}
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter player name"
                  />
                </div>
                <div>
                  <label className="block text-gray-900 font-semibold mb-2">Player 2</label>
                  <input
                    type="text"
                    value={team.player2}
                    onChange={(e) => {
                      const newTeams = [...tempTeams];
                      newTeams[teamIndex].player2 = e.target.value;
                      setTempTeams(newTeams);
                    }}
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter player name"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={saveTeamSetup}
            disabled={!tempTeams[0].player1 || !tempTeams[0].player2 || !tempTeams[1].player1 || !tempTeams[1].player2}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:text-gray-500 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-200 disabled:cursor-not-allowed"
          >
            Start Playing
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Play Euchre</h2>
        <div className="bg-white rounded-lg p-4 inline-block border border-gray-200 shadow-sm">
          <p className="text-gray-700">
            <span className="font-semibold">Round {gameState.round}</span> • 
            <span className="font-semibold"> Dealer: {getCurrentDealer()}</span>
          </p>
        </div>
      </div>

      <div className="flex justify-center mb-6">
        <button
          onClick={() => setShowSetup(true)}
          className="flex items-center space-x-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 px-4 py-2 rounded-lg transition-all duration-200 shadow-sm"
        >
          <Edit2 className="w-4 h-4" />
          <span>Edit Teams</span>
        </button>
      </div>

      {!selectedTrump ? (
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">Select Trump Suit</h3>
            <p className="text-gray-700">Choose the trump suit for this round</p>
          </div>

          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
            {suits.map((suit) => {
              const Icon = suit.icon;
              return (
                <button
                  key={suit.name}
                  onClick={() => setSelectedTrump(suit.name as Suit)}
                  className={`${suit.bgColor} ${suit.borderColor} border-2 rounded-xl p-8 hover:shadow-lg transition-all duration-300 transform hover:scale-105`}
                >
                  <Icon className={`w-16 h-16 mx-auto ${suit.color}`} />
                  <p className="text-gray-900 font-semibold mt-3 capitalize">{suit.name}</p>
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Trump Order - {selectedTrump.charAt(0).toUpperCase() + selectedTrump.slice(1)}
            </h3>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm max-w-md mx-auto">
            <h4 className="text-lg font-semibold text-gray-900 mb-4 text-center">Card Hierarchy (High to Low)</h4>
            <ol className="space-y-2">
              {getTrumpOrder(selectedTrump).map((card, index) => (
                <li key={index} className="flex items-center space-x-3">
                  <span className="bg-blue-100 text-blue-800 font-bold w-8 h-8 rounded-full flex items-center justify-center text-sm">
                    {index + 1}
                  </span>
                  <span className="text-gray-700">{card}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setSelectedTrump(null)}
              className="flex items-center space-x-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 px-6 py-3 rounded-lg transition-all duration-200 shadow-sm"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Back</span>
            </button>
            <button
              onClick={nextRound}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-all duration-200 shadow-sm"
            >
              <span>Next Round</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaySection;