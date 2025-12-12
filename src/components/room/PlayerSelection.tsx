/**
 * Player Selection Component
 * Randomly selects two players for a duel
 *
 * CORRECTIONS APPLIED (Phase 2):
 * - ✅ Fixed race condition - setTimeout now properly cleaned up with useEffect
 * - ✅ Used centralized Player type from @/types
 * - ✅ Prevents crashes if component unmounts during animation
 */

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Shuffle, User, Crown } from "lucide-react";
import type { Player } from "@/types";

interface PlayerSelectionProps {
  players?: Player[];
  onSelectionComplete?: (selectedPlayers: Player[]) => void;
  onReject?: () => void;
  isLeader?: boolean;
}

const PlayerSelection = ({
  players = [
    { id: "1", nickname: "Player 1", isLeader: false },
    { id: "2", nickname: "Player 2", isLeader: true },
    { id: "3", nickname: "Player 3", isLeader: false },
    { id: "4", nickname: "Player 4", isLeader: false },
    { id: "5", nickname: "Player 5", isLeader: false },
  ],
  onSelectionComplete = () => {},
  onReject = () => {},
  isLeader = false,
}: PlayerSelectionProps) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);

  const startSelection = () => {
    if (players.length < 2) return;

    setIsSpinning(true);
    setSelectedPlayers([]);
  };

  // ✅ FIXED: Use useEffect with cleanup to prevent race condition
  useEffect(() => {
    if (!isSpinning) return;

    const timeoutIds: NodeJS.Timeout[] = [];
    const duration = 3000; // 3 seconds
    const interval = 100; // Highlight a new player every 100ms
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const randomIndex = Math.floor(Math.random() * players.length);

      setHighlightedIndex(randomIndex);

      if (elapsed < duration) {
        const timeoutId = setTimeout(animate, interval);
        timeoutIds.push(timeoutId);
      } else {
        finalizeSelection();
      }
    };

    animate();

    // ✅ CLEANUP: Clear all timeouts if component unmounts
    return () => {
      timeoutIds.forEach((id) => clearTimeout(id));
    };
  }, [isSpinning, players.length]);

  const finalizeSelection = () => {
    // Select two random players
    const availablePlayers = [...players];
    const selected: Player[] = [];

    for (let i = 0; i < 2; i++) {
      if (availablePlayers.length === 0) break;

      const randomIndex = Math.floor(Math.random() * availablePlayers.length);
      const selectedPlayer = availablePlayers[randomIndex];
      if (selectedPlayer) {
        selected.push(selectedPlayer);
      }
      availablePlayers.splice(randomIndex, 1);
    }

    setSelectedPlayers(selected);
    setIsSpinning(false);
    setHighlightedIndex(null);
  };

  const confirmSelection = () => {
    onSelectionComplete(selectedPlayers);
  };

  return (
    <div className="w-full max-w-lg mx-auto p-6 bg-slate-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Player Selection</h2>

      <div className="mb-6">
        <div className="grid grid-cols-1 gap-3 mb-4">
          {players.map((player, index) => (
            <motion.div
              key={player.id}
              className={`p-3 rounded-md flex items-center justify-between ${highlightedIndex === index ? "bg-blue-500 text-white" : "bg-white"} ${selectedPlayers.includes(player) ? "border-2 border-green-500" : ""}`}
              animate={{
                scale: highlightedIndex === index ? 1.05 : 1,
                boxShadow:
                  highlightedIndex === index
                    ? "0px 0px 8px rgba(0,0,0,0.2)"
                    : "0px 0px 0px rgba(0,0,0,0)",
              }}
            >
              <div className="flex items-center gap-2">
                <User size={20} />
                <span>{player.nickname}</span>
              </div>
              {player.isLeader && (
                <Crown size={20} className="text-yellow-500" />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {!isSpinning && selectedPlayers.length === 0 && (
          <Button
            onClick={startSelection}
            className="w-full flex items-center justify-center gap-2"
            disabled={players.length < 2}
          >
            <Shuffle size={20} />
            Start Random Selection
          </Button>
        )}

        {!isSpinning && selectedPlayers.length > 0 && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-md">
              <h3 className="text-lg font-semibold mb-3 text-center">
                Selected Duelists
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {selectedPlayers.map((player) => (
                  <Card
                    key={player.id}
                    className="p-3 text-center bg-green-50 border-green-200"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                        <User size={24} className="text-green-600" />
                      </div>
                      <span className="font-medium">{player.nickname}</span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {isLeader && (
              <div className="flex gap-3">
                <Button variant="outline" onClick={onReject} className="flex-1">
                  Reject
                </Button>
                <Button onClick={confirmSelection} className="flex-1">
                  Confirm Duel
                </Button>
              </div>
            )}
          </div>
        )}

        {!isLeader && selectedPlayers.length > 0 && (
          <div className="text-center text-gray-600">
            Waiting for room leader to confirm the duel...
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayerSelection;
