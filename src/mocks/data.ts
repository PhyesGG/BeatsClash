/**
 * Centralized mock data for development and testing
 * Replace with real API calls when backend is implemented
 */

import type { Player, Duelist } from "@/types";
import { generateAvatarUrl } from "@/lib/utils";

/**
 * Mock participants for room testing
 */
export const mockParticipants: Player[] = [
  {
    id: "participant-1",
    nickname: "RoomLeader",
    isLeader: true,
    avatarUrl: generateAvatarUrl("leader"),
    score: 5,
    isOnline: true,
  },
  {
    id: "participant-2",
    nickname: "MusicMaster",
    isLeader: false,
    avatarUrl: generateAvatarUrl("music"),
    score: 3,
    isOnline: true,
  },
  {
    id: "participant-3",
    nickname: "BeatBoxer",
    isLeader: false,
    avatarUrl: generateAvatarUrl("beat"),
    score: 2,
    isOnline: true,
  },
  {
    id: "participant-4",
    nickname: "RhymeStar",
    isLeader: false,
    avatarUrl: generateAvatarUrl("rhyme"),
    score: 1,
    isOnline: true,
  },
  {
    id: "participant-5",
    nickname: "MelodyMaker",
    isLeader: false,
    avatarUrl: generateAvatarUrl("melody"),
    score: 0,
    isOnline: true,
  },
];

/**
 * Mock duelists for testing
 */
export const mockDuelists: Duelist[] = [
  {
    id: "duelist-1",
    name: "Player 1",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    id: "duelist-2",
    name: "Player 2",
    videoUrl: "https://www.youtube.com/watch?v=jNQXAC9IVRw",
  },
];

/**
 * Mock YouTube video URLs for testing
 */
export const mockYouTubeVideos = [
  "https://www.youtube.com/embed/dQw4w9WgXcQ",
  "https://www.youtube.com/embed/jNQXAC9IVRw",
];

/**
 * Music themes for the theme wheel
 */
export const musicThemes = [
  "Meilleur feat",
  "De la bonne trap",
  "Emotionnel",
  "Tap in",
  "-18",
  "OST Jeu vidéo",
  "Musique d'anime",
  "BO de film",
  "Instru",
  "Meilleur couplet",
  "Rap US",
  "Rap FR",
  "RnB",
  "Son de princesse",
  "Par cœur",
  "Chill",
  "Solo q",
  "Sport",
  "Dance",
  "Sous coté mainstream",
  "All OST / Soundtrack",
  "Meilleur son 2023",
  "POP",
  "Voiture nuit",
  "Heartbreak",
  "Son nul",
  "Summer",
  "Winter",
  "Colors",
  "Son of all time",
];
