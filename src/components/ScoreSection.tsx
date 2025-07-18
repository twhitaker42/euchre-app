import React from 'react';
import { Plus, Minus, RotateCcw, Trophy } from 'lucide-react';
import { GameState } from '../App';

interface ScoreSectionProps {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
}

const ScoreSection: React.FC<ScoreSectionProps> = ({ gameState, setGameState }) => {
  const adjustScore = (teamIndex: number, change: number) => {
    setGameState(prev => ({
      ...prev,
      teams: prev.teams.map((team, index) => 
        index === teamIndex 
          ? { ...team, score: Math.max(0, team.score + change) }
          : team
      )
    }));
  };

  const resetScores = () => {
    setGameState(prev => ({
      ...prev,
      teams: prev.teams.map(team => ({ ...team, score: 0 })),
      round: 1,
      currentDealer: 0
    }));
  };

  const getWinner = () => {
    const winningTeam = gameState.teams.find(team => team.score >= 10);
    return winningTeam;
  };

  const winner = getWinner();

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Score Tracker</h2>
        <p className="text-xl text-gray-700">Track team scores • First to 10 points wins!</p>
      </div>

      {winner && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center">
          <div className="flex items-center justify-center space-x-3 mb-2">
            <Trophy className="w-8 h-8 text-yellow-600" />
            <h3 className="text-2xl font-bold text-yellow-800">Game Winner!</h3>
            <Trophy className="w-8 h-8 text-yellow-600" />
          </div>
          <p className="text-gray-900 text-lg">
            <span className="font-semibold">{winner.name}</span> wins with {winner.score} points!
          </p>
          <p className="text-gray-700 mt-2">
            {winner.player1} & {winner.player2}
          </p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 sm:gap-6">
        {gameState.teams.map((team, index) => (
          <div
            key={index}
            className={`bg-white rounded-lg sm:rounded-xl p-3 sm:p-6 border transition-all duration-300 shadow-sm ${
              winner && winner === team
                ? 'border-yellow-300 bg-yellow-50'
                : 'border-gray-200 hover:shadow-lg'
            }`}
          >
            <div className="text-center mb-3 sm:mb-6">
              <h3 className="text-lg sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">{team.name}</h3>
              <div className="text-gray-700 space-y-0.5 sm:space-y-1">
                <p className="font-medium text-sm sm:text-base">{team.player1}</p>
                <p className="font-medium text-sm sm:text-base">{team.player2}</p>
              </div>
            </div>

            <div className="text-center mb-3 sm:mb-6">
              <div className="bg-gray-100 rounded-lg sm:rounded-xl p-3 sm:p-6 inline-block min-w-[80px] sm:min-w-[120px]">
                <p className="text-2xl sm:text-4xl font-bold text-gray-900">{team.score}</p>
                <p className="text-gray-600 text-xs sm:text-sm mt-1">points</p>
              </div>
            </div>

            <div className="flex justify-center space-x-2 sm:space-x-4">
              <button
                onClick={() => adjustScore(index, -1)}
                disabled={team.score === 0}
                className="bg-red-50 hover:bg-red-100 disabled:bg-gray-100 disabled:text-gray-400 text-red-700 border border-red-200 disabled:border-gray-200 p-2 sm:p-3 rounded-lg transition-all duration-200 disabled:cursor-not-allowed"
              >
                <Minus className="w-4 h-4 sm:w-6 sm:h-6" />
              </button>
              <button
                onClick={() => adjustScore(index, 1)}
                className="bg-green-50 hover:bg-green-100 text-green-700 border border-green-200 p-2 sm:p-3 rounded-lg transition-all duration-200"
              >
                <Plus className="w-4 h-4 sm:w-6 sm:h-6" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <button
          onClick={resetScores}
          className="flex items-center space-x-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 px-6 py-3 rounded-lg transition-all duration-200 mx-auto shadow-sm"
        >
          <RotateCcw className="w-5 h-5" />
          <span>Reset Game</span>
        </button>
      </div>

      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Scoring Reference</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="flex justify-between text-gray-700">
              <span>Make 3-4 tricks:</span>
              <span className="font-semibold">+1 point</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>March (all 5 tricks):</span>
              <span className="font-semibold">+2 points</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-gray-700">
              <span>Euchred (failed to make 3):</span>
              <span className="font-semibold">Opponents +2</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Game winner:</span>
              <span className="font-semibold">First to 10</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreSection;