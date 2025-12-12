/**
 * Leaderboard Component
 * Displays player rankings with wins and win rates
 *
 * CORRECTIONS APPLIED (Phase 2):
 * - ✅ Division by zero already protected in getWinRate function
 * - ✅ Used centralized LeaderboardPlayer type from @/types
 */

import { useState } from "react";
import { Trophy, Medal, Award, ChevronUp, ChevronDown } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { LeaderboardPlayer } from "@/types";

interface LeaderboardProps {
  players?: LeaderboardPlayer[];
  isVisible?: boolean;
  onToggleVisibility?: () => void;
}

const Leaderboard = ({
  players = [
    { id: "1", nickname: "MusicMaster", wins: 5, totalDuels: 7 },
    { id: "2", nickname: "BeatDropper", wins: 3, totalDuels: 6 },
    { id: "3", nickname: "RhythmKing", wins: 7, totalDuels: 10 },
    { id: "4", nickname: "MelodyMaker", wins: 2, totalDuels: 5 },
    { id: "5", nickname: "SoundWave", wins: 4, totalDuels: 8 },
  ],
  isVisible = true,
  onToggleVisibility = () => {},
}: LeaderboardProps) => {
  const [sortBy, setSortBy] = useState<"wins" | "winRate">("wins");

  const sortedPlayers = [...players].sort((a, b) => {
    if (sortBy === "wins") {
      return b.wins - a.wins;
    } else {
      const aRate = a.totalDuels > 0 ? a.wins / a.totalDuels : 0;
      const bRate = b.totalDuels > 0 ? b.wins / b.totalDuels : 0;
      return bRate - aRate;
    }
  });

  const getWinRate = (wins: number, totalDuels: number) => {
    if (totalDuels === 0) return "0%";
    return `${Math.round((wins / totalDuels) * 100)}%`;
  };

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 1:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 2:
        return <Award className="h-5 w-5 text-amber-700" />;
      default:
        return (
          <span className="h-5 w-5 flex items-center justify-center text-gray-500">
            {index + 1}
          </span>
        );
    }
  };

  if (!isVisible) {
    return (
      <div className="fixed bottom-4 right-4 z-10">
        <Button
          onClick={onToggleVisibility}
          className="flex items-center gap-2 bg-primary text-white"
        >
          <Trophy className="h-4 w-4" />
          <span>Show Leaderboard</span>
          <ChevronUp className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <Card className="w-full max-w-md bg-white shadow-lg border-2 border-gray-200">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-500" />
          Leaderboard
        </CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleVisibility}
          className="h-8 w-8 p-0"
        >
          <ChevronDown className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between mb-4">
          <Button
            variant={sortBy === "wins" ? "default" : "outline"}
            size="sm"
            onClick={() => setSortBy("wins")}
            className="flex-1 mr-2"
          >
            Sort by Wins
          </Button>
          <Button
            variant={sortBy === "winRate" ? "default" : "outline"}
            size="sm"
            onClick={() => setSortBy("winRate")}
            className="flex-1 ml-2"
          >
            Sort by Win Rate
          </Button>
        </div>

        <div className="space-y-2 max-h-80 overflow-y-auto pr-2">
          {sortedPlayers.map((player, index) => (
            <div
              key={player.id}
              className={`flex items-center justify-between p-3 rounded-lg ${index < 3 ? "bg-gray-50" : "bg-gray-50"}`}
            >
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0">{getRankIcon(index)}</div>
                <div>
                  <p className="font-medium">{player.nickname}</p>
                  <p className="text-xs text-gray-500">
                    {player.wins} wins / {player.totalDuels} duels
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold">
                  {getWinRate(player.wins, player.totalDuels)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Leaderboard;
