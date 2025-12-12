/**
 * Room View Component
 * Main game room interface with tabs for game, participants, and leaderboard
 *
 * CORRECTIONS APPLIED (Phase 2):
 * - ✅ Used centralized Player and GameState types from @/types
 * - ✅ Imported mockParticipants from @/mocks/data instead of inline data
 * - ✅ Removed complex default values from props (use external defaults)
 */

import { useState } from "react";
import ThemeWheel from "./ThemeWheel";
import PlayerSelection from "./PlayerSelection";
import DuelInterface from "./DuelInterface";
import VotingSystem from "./VotingSystem";
import Leaderboard from "./Leaderboard";
import ParticipantsList from "./ParticipantsList";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Music, Users, Trophy, ArrowLeft, Crown } from "lucide-react";
import type { Player, GameState } from "@/types";
import { mockParticipants } from "@/mocks/data";

interface RoomViewProps {
  roomCode: string;
  isRoomLeader: boolean;
  currentUser: Player;
  onLeaveRoom: () => void;
  onCopyRoomCode: () => void;
}

const RoomView: React.FC<RoomViewProps> = ({
  roomCode,
  isRoomLeader,
  currentUser,
  onLeaveRoom,
  onCopyRoomCode,
}) => {
  const [gameState, setGameState] = useState<GameState>("waiting");
  const [selectedTheme, setSelectedTheme] = useState<string>("");
  const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);

  // ✅ FIXED: Use centralized mockParticipants from @/mocks/data
  const [participants, setParticipants] = useState<Player[]>(mockParticipants);

  // Handle theme selection
  const handleThemeSelected = (theme: string) => {
    setSelectedTheme(theme);
    setGameState("player-selection");
  };

  // Handle player selection
  const handlePlayersSelected = (players: any[]) => {
    setSelectedPlayers(players);
    setGameState("duel");
  };

  // Handle duel completion
  const handleDuelComplete = () => {
    setGameState("voting");
  };

  // Handle voting completion
  const handleVotingComplete = (winnerId: string) => {
    // Update scores
    setParticipants((prevParticipants) =>
      prevParticipants.map((player) =>
        player.id === winnerId
          ? { ...player, score: (player.score || 0) + 1 }
          : player,
      ),
    );
    setGameState("results");
  };

  // Start a new round
  const startNewRound = () => {
    setGameState("theme-selection");
  };

  // Leave the room
  const leaveRoom = () => {
    onLeaveRoom();
  };

  // Check if current user is a duelist
  const isCurrentUserDuelist = selectedPlayers.some(
    (player) => player.id === currentUser.id,
  );

  // Render game content based on current state
  const renderGameContent = () => {
    switch (gameState) {
      case "waiting":
        return (
          <div className="flex flex-col items-center justify-center p-8 bg-slate-100 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">
              Waiting for Game to Start
            </h2>
            <p className="text-gray-600 mb-6">
              Room Code: <span className="font-bold">{roomCode}</span>
            </p>
            <p className="text-gray-600 mb-8">
              Share this code with friends to join the room!
            </p>

            {isRoomLeader && (
              <Button
                onClick={startNewRound}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                size="lg"
              >
                Start Game
              </Button>
            )}

            {!isRoomLeader && (
              <div className="p-4 bg-gray-200 rounded-lg text-center">
                <p className="text-gray-600">
                  Waiting for room leader to start the game...
                </p>
              </div>
            )}
          </div>
        );

      case "theme-selection":
        return (
          <ThemeWheel
            onThemeSelected={handleThemeSelected}
            isRoomLeader={isRoomLeader}
          />
        );

      case "player-selection":
        return (
          <PlayerSelection
            players={participants}
            onSelectionComplete={handlePlayersSelected}
            isLeader={isRoomLeader}
          />
        );

      case "duel":
        return (
          <DuelInterface
            isRoomLeader={isRoomLeader}
            isDuelist={isCurrentUserDuelist}
            theme={selectedTheme}
            currentDuelists={selectedPlayers.map((p) => ({
              id: p.id,
              name: p.nickname,
            }))}
            onPlaybackControl={() => {}}
            onSubmitLink={() => setTimeout(handleDuelComplete, 2000)} // Simulate link submission
          />
        );

      case "voting":
        return (
          <VotingSystem
            duelists={[
              {
                id: selectedPlayers[0]?.id || "",
                name: selectedPlayers[0]?.nickname || "",
                videoUrl: "",
              },
              {
                id: selectedPlayers[1]?.id || "",
                name: selectedPlayers[1]?.nickname || "",
                videoUrl: "",
              },
            ]}
            onVoteComplete={handleVotingComplete}
            isVotingOpen={true}
          />
        );

      case "results":
        return (
          <div className="flex flex-col items-center justify-center p-8 bg-slate-100 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Round Complete!</h2>
            <div className="mb-8">
              <Leaderboard
                players={participants.map((p) => ({
                  id: p.id,
                  nickname: p.nickname,
                  wins: p.score || 0,
                  totalDuels: 10, // Mock data
                }))}
                isVisible={true}
              />
            </div>

            {isRoomLeader && (
              <Button
                onClick={startNewRound}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                size="lg"
              >
                Start Next Round
              </Button>
            )}

            {!isRoomLeader && (
              <div className="p-4 bg-gray-200 rounded-lg text-center">
                <p className="text-gray-600">
                  Waiting for room leader to start the next round...
                </p>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-800 to-slate-900 text-white p-4">
      {/* Header */}
      <div className="container mx-auto flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Button variant="ghost" onClick={leaveRoom} className="mr-2">
            <ArrowLeft className="h-5 w-5 mr-1" />
            Leave
          </Button>
          <h1 className="text-2xl font-bold">Music Duel Room</h1>
        </div>
        <div className="flex items-center space-x-2">
          <div
            className="bg-slate-700 px-3 py-1 rounded-md text-sm cursor-pointer hover:bg-slate-600 transition-colors"
            onClick={onCopyRoomCode}
            title="Click to copy room code"
          >
            Room: <span className="font-bold">{roomCode}</span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto">
        <Tabs
          defaultValue="game"
          className="w-full"
        >
          <div className="flex justify-center mb-6">
            <TabsList className="bg-slate-700">
              <TabsTrigger
                value="game"
                className="data-[state=active]:bg-slate-600"
              >
                <Music className="h-4 w-4 mr-2" />
                Game
              </TabsTrigger>
              <TabsTrigger
                value="participants"
                className="data-[state=active]:bg-slate-600"
              >
                <Users className="h-4 w-4 mr-2" />
                Participants
              </TabsTrigger>
              <TabsTrigger
                value="leaderboard"
                className="data-[state=active]:bg-slate-600"
              >
                <Trophy className="h-4 w-4 mr-2" />
                Leaderboard
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="game" className="mt-0">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="lg:w-3/4">{renderGameContent()}</div>
              <div className="lg:w-1/4">
                <ParticipantsList participants={participants} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="participants" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {participants.map((participant) => (
                <div
                  key={participant.id}
                  className="bg-slate-800 p-4 rounded-lg flex items-center space-x-4"
                >
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-slate-700">
                      <img
                        src={
                          participant.avatarUrl ||
                          `https://api.dicebear.com/7.x/avataaars/svg?seed=${participant.id}`
                        }
                        alt={participant.nickname}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {participant.isLeader && (
                      <div className="absolute -top-1 -right-1 bg-yellow-500 rounded-full p-1">
                        <Crown size={16} className="text-black" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">
                      {participant.nickname}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {participant.isLeader ? "Room Leader" : "Participant"}
                    </p>
                    <p className="text-gray-400 text-sm">
                      Score: {participant.score || 0}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="leaderboard" className="mt-0">
            <div className="max-w-2xl mx-auto">
              <Leaderboard
                players={participants.map((p) => ({
                  id: p.id,
                  nickname: p.nickname,
                  wins: p.score || 0,
                  totalDuels: 10, // Mock data
                }))}
                isVisible={true}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default RoomView;
