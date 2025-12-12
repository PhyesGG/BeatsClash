/**
 * Validation schemas and utilities using Zod
 * Provides type-safe validation for forms and user inputs
 */

import { z } from "zod";

/**
 * YouTube URL validation regex
 * Matches:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - http://youtube.com/watch?v=VIDEO_ID
 */
const YOUTUBE_REGEX =
  /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w-]{11}(&.*)?$/;

/**
 * Extracts the video ID from a YouTube URL
 * @param url The YouTube URL
 * @returns The video ID or null if invalid
 */
export function extractYouTubeVideoId(url: string): string | null {
  try {
    const urlObj = new URL(url);

    // Handle youtube.com/watch?v=VIDEO_ID
    if (urlObj.hostname.includes("youtube.com")) {
      return urlObj.searchParams.get("v");
    }

    // Handle youtu.be/VIDEO_ID
    if (urlObj.hostname === "youtu.be") {
      return urlObj.pathname.slice(1);
    }

    return null;
  } catch {
    return null;
  }
}

/**
 * Converts a YouTube URL to an embeddable format
 * @param url The YouTube URL
 * @returns The embed URL or null if invalid
 */
export function getYouTubeEmbedUrl(url: string): string | null {
  const videoId = extractYouTubeVideoId(url);
  if (!videoId) return null;

  return `https://www.youtube.com/embed/${videoId}`;
}

/**
 * Zod schema for YouTube URL validation
 */
export const youtubeUrlSchema = z
  .string()
  .min(1, "URL YouTube requise")
  .regex(YOUTUBE_REGEX, "URL YouTube invalide")
  .refine(
    (url) => {
      const videoId = extractYouTubeVideoId(url);
      return videoId !== null && videoId.length === 11;
    },
    {
      message: "ID de vidéo YouTube invalide",
    },
  );

/**
 * Zod schema for nickname validation
 */
export const nicknameSchema = z
  .string()
  .min(2, "Le pseudo doit contenir au moins 2 caractères")
  .max(20, "Le pseudo ne peut pas dépasser 20 caractères")
  .regex(
    /^[a-zA-Z0-9_-]+$/,
    "Le pseudo ne peut contenir que des lettres, chiffres, tirets et underscores",
  );

/**
 * Zod schema for room code validation
 */
export const roomCodeSchema = z
  .string()
  .length(6, "Le code de salle doit contenir exactement 6 caractères")
  .regex(/^[A-Z0-9]+$/, "Le code de salle doit être en majuscules");

/**
 * Schema for joining a room
 */
export const joinRoomSchema = z.object({
  nickname: nicknameSchema,
  roomCode: roomCodeSchema,
});

/**
 * Schema for creating a room
 */
export const createRoomSchema = z.object({
  nickname: nicknameSchema,
});

/**
 * Schema for submitting a music link
 */
export const submitMusicSchema = z.object({
  youtubeUrl: youtubeUrlSchema,
});

/**
 * Type inference from schemas
 */
export type JoinRoomInput = z.infer<typeof joinRoomSchema>;
export type CreateRoomInput = z.infer<typeof createRoomSchema>;
export type SubmitMusicInput = z.infer<typeof submitMusicSchema>;
