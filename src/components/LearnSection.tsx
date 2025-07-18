import React from 'react';
import { Heart, Diamond, Club, Spade, Users, Trophy, Shuffle } from 'lucide-react';

const LearnSection: React.FC = () => {
  const rules = [
    {
      title: "Game Setup",
      icon: Users,
      points: [
        "4 players in 2 teams (partners sit across from each other)",
        "Use 24 cards: 9, 10, J, Q, K, A of each suit",
        "Deal 5 cards to each player (3-2 or 2-3 pattern)",
        "Place remaining 4 cards face down, flip top card"
      ]
    },
    {
      title: "Trump Selection",
      icon: Shuffle,
      points: [
        "Starting left of dealer, players can 'order up' the flipped card",
        "If ordered up, dealer picks up card and discards one",
        "If all pass, second round: players can name any suit except the flipped card's suit",
        "If all pass again, shuffle and redeal"
      ]
    },
    {
      title: "Card Hierarchy",
      icon: Trophy,
      points: [
        "Jack of trump suit (Right Bower) - highest trump",
        "Jack of same color (Left Bower) - second highest trump",
        "A, K, Q, 10, 9 of trump suit in descending order",
        "In non-trump suits: A, K, Q, J, 10, 9 (if J isn't Left Bower)"
      ]
    },
    {
      title: "Scoring",
      icon: Trophy,
      points: [
        "Making 3 or 4 tricks: 1 point",
        "Making all 5 tricks (march): 2 points",
        "Euchred (failing to make 3 tricks): opponents get 2 points",
        "First team to 10 points wins the game"
      ]
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Learn Euchre</h2>
        <p className="text-xl text-gray-700 max-w-2xl mx-auto">
          Master the classic card game with these essential rules and strategies
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {rules.map((section, index) => {
          const Icon = section.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 shadow-sm"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Icon className="w-6 h-6 text-blue-700" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{section.title}</h3>
              </div>
              <ul className="space-y-3">
                {section.points.map((point, pointIndex) => (
                  <li key={pointIndex} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <div className="flex space-x-1">
            <Heart className="w-5 h-5 text-red-600" />
            <Diamond className="w-5 h-5 text-red-600" />
            <Club className="w-5 h-5 text-gray-900" />
            <Spade className="w-5 h-5 text-gray-900" />
          </div>
          <span>Trump Order Example</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h4 className="font-semibold text-red-800 mb-2">Hearts Trump</h4>
            <ol className="text-gray-700 text-sm space-y-1">
              <li>1. Jack of Hearts</li>
              <li>2. Jack of Diamonds</li>
              <li>3. Ace of Hearts</li>
              <li>4. King of Hearts</li>
              <li>5. Queen of Hearts</li>
              <li>6. 10 of Hearts</li>
              <li>7. 9 of Hearts</li>
            </ol>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h4 className="font-semibold text-red-800 mb-2">Diamonds Trump</h4>
            <ol className="text-gray-700 text-sm space-y-1">
              <li>1. Jack of Diamonds</li>
              <li>2. Jack of Hearts</li>
              <li>3. Ace of Diamonds</li>
              <li>4. King of Diamonds</li>
              <li>5. Queen of Diamonds</li>
              <li>6. 10 of Diamonds</li>
              <li>7. 9 of Diamonds</li>
            </ol>
          </div>
          <div className="bg-gray-100 border border-gray-300 rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 mb-2">Clubs Trump</h4>
            <ol className="text-gray-700 text-sm space-y-1">
              <li>1. Jack of Clubs</li>
              <li>2. Jack of Spades</li>
              <li>3. Ace of Clubs</li>
              <li>4. King of Clubs</li>
              <li>5. Queen of Clubs</li>
              <li>6. 10 of Clubs</li>
              <li>7. 9 of Clubs</li>
            </ol>
          </div>
          <div className="bg-gray-100 border border-gray-300 rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 mb-2">Spades Trump</h4>
            <ol className="text-gray-700 text-sm space-y-1">
              <li>1. Jack of Spades</li>
              <li>2. Jack of Clubs</li>
              <li>3. Ace of Spades</li>
              <li>4. King of Spades</li>
              <li>5. Queen of Spades</li>
              <li>6. 10 of Spades</li>
              <li>7. 9 of Spades</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnSection;