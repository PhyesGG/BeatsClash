import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RoomEntry from "./RoomEntry";
import RoomView from "./room/RoomView";

interface Player {
  id: string;
  nickname: string;
  isLeader: boolean;
  avatarUrl?: string;
  score?: number;
  isOnline?: boolean;
}

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [isInRoom, setIsInRoom] = useState(false);
  const [roomCode, setRoomCode] = useState("");
  const [currentUser, setCurrentUser] = useState<Player | null>(null);

  // Handle joining an existing room
  const handleJoinRoom = (nickname: string, code: string) => {
    // In a real app, you would validate the room code and connect to the room
    setCurrentUser({
      id: Math.random().toString(36).substring(2, 9),
      nickname,
      isLeader: false,
      avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${nickname}`,
      score: 0,
      isOnline: true,
    });
    setRoomCode(code);
    setIsInRoom(true);
  };

  // Handle creating a new room
  const handleCreateRoom = (nickname: string) => {
    // In a real app, you would create a new room on the server
    const newRoomCode = Math.random()
      .toString(36)
      .substring(2, 8)
      .toUpperCase();
    setCurrentUser({
      id: Math.random().toString(36).substring(2, 9),
      nickname,
      isLeader: true, // Creator becomes the room leader
      avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${nickname}`,
      score: 0,
      isOnline: true,
    });
    setRoomCode(newRoomCode);
    setIsInRoom(true);
  };

  // Handle leaving the room
  const handleLeaveRoom = () => {
    // In a real app, you would disconnect from the room
    setIsInRoom(false);
    setRoomCode("");
    setCurrentUser(null);
    // Navigate back to home
    navigate("/");
  };

  // Copy room code to clipboard
  const copyRoomCode = () => {
    if (roomCode) {
      navigator.clipboard.writeText(roomCode);
      // In a real app, you would show a toast notification
      alert("Room code copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-800 to-slate-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        {!isInRoom ? (
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Musical Duel</h1>
            <p className="text-slate-300 text-lg mb-8">
              Join a room or create your own to start the music battle!
            </p>

            <RoomEntry
              onJoinRoom={handleJoinRoom}
              onCreateRoom={handleCreateRoom}
            />
          </div>
        ) : (
          <RoomView
            roomCode={roomCode}
            isRoomLeader={currentUser?.isLeader || false}
            currentUser={currentUser || undefined}
            onLeaveRoom={handleLeaveRoom}
            onCopyRoomCode={copyRoomCode}
          />
        )}
      </div>

      {/* Footer */}
      <footer className="mt-auto pt-8 pb-4 text-center text-slate-400 text-sm">
        <p>© {new Date().getFullYear()} Musical Duel. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
