/**
 * Home Component
 * Main entry point for the application
 * Handles room creation and joining logic
 *
 * CORRECTIONS APPLIED:
 * - Replaced Math.random() with crypto.randomUUID() for secure ID generation
 * - Added proper clipboard API with error handling and toast notifications
 * - Removed unused useNavigate hook
 * - Centralized types from @/types instead of local interface
 * - Replaced alert() with toast notifications
 * - Added proper error handling
 */

import React, { useState } from "react";
import RoomEntry from "./RoomEntry";
import RoomView from "./room/RoomView";
import ToastContainer from "./ToastContainer";
import { useToast } from "@/hooks/useToast";
import type { Player } from "@/types";
import {
  generateSecureId,
  generateRoomCode,
  generateAvatarUrl,
  copyToClipboard,
} from "@/lib/utils";

const Home: React.FC = () => {
  const [isInRoom, setIsInRoom] = useState(false);
  const [roomCode, setRoomCode] = useState("");
  const [currentUser, setCurrentUser] = useState<Player | null>(null);
  const { toasts, dismissToast, success, error } = useToast();

  /**
   * Handle joining an existing room
   * @param nickname User's chosen nickname
   * @param code Room code to join
   */
  const handleJoinRoom = (nickname: string, code: string) => {
    try {
      // In a real app, you would validate the room code and connect to the room via API
      const newUser: Player = {
        id: generateSecureId(), // ✅ FIXED: Using secure UUID instead of Math.random()
        nickname,
        isLeader: false,
        avatarUrl: generateAvatarUrl(nickname),
        score: 0,
        isOnline: true,
      };

      setCurrentUser(newUser);
      setRoomCode(code);
      setIsInRoom(true);
      success(`Bienvenue dans la salle ${code} !`);
    } catch (err) {
      error("Erreur lors de la connexion à la salle");
      console.error("Join room error:", err);
    }
  };

  /**
   * Handle creating a new room
   * @param nickname User's chosen nickname
   */
  const handleCreateRoom = (nickname: string) => {
    try {
      // In a real app, you would create a new room on the server
      const newRoomCode = generateRoomCode(); // ✅ FIXED: Using secure room code generation

      const newUser: Player = {
        id: generateSecureId(), // ✅ FIXED: Using secure UUID
        nickname,
        isLeader: true, // Creator becomes the room leader
        avatarUrl: generateAvatarUrl(nickname),
        score: 0,
        isOnline: true,
      };

      setCurrentUser(newUser);
      setRoomCode(newRoomCode);
      setIsInRoom(true);
      success(`Salle créée avec le code : ${newRoomCode}`);
    } catch (err) {
      error("Erreur lors de la création de la salle");
      console.error("Create room error:", err);
    }
  };

  /**
   * Handle leaving the room
   */
  const handleLeaveRoom = () => {
    try {
      // In a real app, you would disconnect from the room
      setIsInRoom(false);
      setRoomCode("");
      setCurrentUser(null);
      success("Vous avez quitté la salle");
    } catch (err) {
      error("Erreur lors de la déconnexion");
      console.error("Leave room error:", err);
    }
  };

  /**
   * Copy room code to clipboard with proper error handling
   * ✅ FIXED: Replaced alert() with toast, added error handling
   */
  const copyRoomCodeToClipboard = async () => {
    if (!roomCode) {
      error("Aucun code de salle à copier");
      return;
    }

    const copied = await copyToClipboard(roomCode);

    if (copied) {
      success("Code de salle copié !");
    } else {
      error("Impossible de copier le code");
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
          currentUser && (
            <RoomView
              roomCode={roomCode}
              isRoomLeader={currentUser.isLeader}
              currentUser={currentUser}
              onLeaveRoom={handleLeaveRoom}
              onCopyRoomCode={copyRoomCodeToClipboard}
            />
          )
        )}
      </div>

      {/* Footer */}
      <footer className="mt-auto pt-8 pb-4 text-center text-slate-400 text-sm">
        <p>© {new Date().getFullYear()} Musical Duel. All rights reserved.</p>
      </footer>

      {/* Toast notifications */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
};

export default Home;
