/**
 * Participants List Component
 * Displays list of participants in a room with online status
 *
 * CORRECTIONS APPLIED (Phase 2):
 * - ✅ Used centralized Player type from @/types instead of local Participant interface
 * - ✅ Imported mockParticipants from @/mocks/data for default value
 */

import { ScrollArea } from "../ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Crown } from "lucide-react";
import type { Player } from "@/types";
import { mockParticipants } from "@/mocks/data";

interface ParticipantsListProps {
  participants?: Player[];
  className?: string;
}

const ParticipantsList = ({
  participants = mockParticipants,
  className = "",
}: ParticipantsListProps) => {
  return (
    <div
      className={`bg-slate-900 rounded-lg p-4 w-full max-w-[250px] ${className}`}
    >
      <h3 className="text-lg font-bold mb-4 text-white flex items-center justify-between">
        Participants
        <Badge variant="secondary" className="ml-2">
          {participants.length}
        </Badge>
      </h3>

      <ScrollArea className="h-[350px] pr-4">
        <div className="space-y-2">
          {participants.map((participant) => (
            <div
              key={participant.id}
              className={`flex items-center p-2 rounded-md ${participant.isOnline ? "bg-slate-800" : "bg-slate-800/50"}`}
            >
              <div className="relative">
                <Avatar>
                  <AvatarImage
                    src={participant.avatarUrl}
                    alt={participant.nickname}
                  />
                  <AvatarFallback>
                    {participant.nickname.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                {participant.isLeader && (
                  <div className="absolute -top-1 -right-1 bg-yellow-500 rounded-full p-0.5">
                    <Crown size={12} className="text-black" />
                  </div>
                )}
              </div>
              <div className="ml-3 flex-1 overflow-hidden">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-white truncate">
                    {participant.nickname}
                  </p>
                  {participant.score !== undefined && (
                    <Badge variant="outline" className="ml-2 bg-slate-700">
                      {participant.score}
                    </Badge>
                  )}
                </div>
                <div className="flex items-center mt-1">
                  <div
                    className={`w-2 h-2 rounded-full mr-1.5 ${participant.isOnline ? "bg-green-500" : "bg-gray-500"}`}
                  />
                  <span className="text-xs text-gray-400">
                    {participant.isOnline ? "Online" : "Offline"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ParticipantsList;
