/**
 * Centralized type definitions for the entire application
 * This file prevents type duplication across components
 */

/**
 * Represents a player/user in a room
 */
export interface Player {
  id: string;
  nickname: string;
  isLeader: boolean;
  avatarUrl?: string;
  score?: number;
  isOnline?: boolean;
}

/**
 * Represents a duelist in a music duel
 */
export interface Duelist {
  id: string;
  name: string;
  videoUrl?: string;
}

/**
 * Game state machine states
 */
export type GameState =
  | "waiting"
  | "theme-selection"
  | "player-selection"
  | "duel"
  | "voting"
  | "results";

/**
 * Room configuration
 */
export interface Room {
  code: string;
  leaderId: string;
  participants: Player[];
  gameState: GameState;
  currentTheme?: string;
  selectedPlayers?: Player[];
  createdAt?: Date;
}

/**
 * Leaderboard player entry
 */
export interface LeaderboardPlayer {
  id: string;
  nickname: string;
  wins: number;
  totalDuels: number;
}

/**
 * Vote record
 */
export interface Vote {
  voterId: string;
  votedForId: string;
  timestamp: Date;
}
