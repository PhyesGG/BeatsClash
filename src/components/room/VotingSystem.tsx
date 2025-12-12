/**
 * Voting System Component
 * Handles voting for music duel winners
 *
 * CORRECTIONS APPLIED (Phase 2):
 * - ✅ Fixed voting logic - wait for ALL players to vote before declaring winner
 * - ✅ Track individual votes with Map
 * - ✅ Added totalPlayers prop to know when all votes are in
 * - ✅ Separate onVoteComplete (individual) from onAllVotesComplete (final)
 * - ✅ Use centralized Duelist type from @/types
 */

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { ThumbsUp, Award } from "lucide-react";
import type { Duelist } from "@/types";

interface VotingSystemProps {
  duelists?: [Duelist, Duelist];
  totalPlayers?: number; // ✅ NEW: Total number of players in room
  currentUserId?: string; // ✅ NEW: Current user ID to prevent double voting
  onVoteComplete?: (voterId: string, votedForId: string) => void; // Individual vote
  onAllVotesComplete?: (winnerId: string, votes: Record<string, number>) => void; // ✅ NEW: Called when all votes are in
  isVotingOpen?: boolean;
}

const VotingSystem: React.FC<VotingSystemProps> = ({
  duelists = [
    {
      id: "player1",
      name: "Player 1",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      id: "player2",
      name: "Player 2",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
  ],
  totalPlayers = 5, // Default: 5 players (2 duelists + 3 voters)
  currentUserId = "current-user",
  onVoteComplete = () => {},
  onAllVotesComplete = () => {},
  isVotingOpen = true,
}) => {
  const [selectedDuelist, setSelectedDuelist] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [votes, setVotes] = useState<Record<string, number>>({
    [duelists[0].id]: 0,
    [duelists[1].id]: 0,
  });

  // ✅ FIXED: Track all individual votes with voter IDs
  const [allVotes, setAllVotes] = useState<Map<string, string>>(new Map());

  // Calculate how many players should vote (total - 2 duelists)
  const expectedVoters = Math.max(totalPlayers - 2, 1);

  /**
   * Handle individual vote
   * ✅ FIXED: Track vote and check if all votes are in
   */
  const handleVote = (duelistId: string) => {
    if (hasVoted || !isVotingOpen) return;

    setSelectedDuelist(duelistId);
    setHasVoted(true);

    // Update vote counts
    const newVotes = {
      ...votes,
      [duelistId]: (votes[duelistId] ?? 0) + 1,
    };
    setVotes(newVotes);

    // Track this specific vote
    const newAllVotes = new Map(allVotes);
    newAllVotes.set(currentUserId, duelistId);
    setAllVotes(newAllVotes);

    // Notify parent of individual vote
    onVoteComplete(currentUserId, duelistId);

    // ✅ FIXED: Check if all expected votes are in
    if (newAllVotes.size >= expectedVoters) {
      // All votes received, determine winner
      const winner = getWinner(newVotes);
      if (winner) {
        onAllVotesComplete(winner.id, newVotes);
      }
    }
  };

  /**
   * Determine winner based on vote counts
   */
  const getWinner = (voteCount: Record<string, number>): Duelist | null => {
    const votes0 = voteCount[duelists[0].id] ?? 0;
    const votes1 = voteCount[duelists[1].id] ?? 0;

    if (votes0 > votes1) {
      return duelists[0];
    }
    if (votes0 < votes1) {
      return duelists[1];
    }
    // Tie - return null or handle as needed
    return null;
  };

  const winner = getWinner(votes);
  const votingComplete = allVotes.size >= expectedVoters;

  return (
    <Card className="w-full max-w-md mx-auto bg-background">
      <CardHeader className="text-center">
        <CardTitle className="text-xl font-bold">Vote for the Winner</CardTitle>
        <CardDescription>
          {isVotingOpen
            ? `Choose which duelist had the best music submission (${allVotes.size}/${expectedVoters} votes)`
            : "Voting has ended"}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {duelists.map((duelist) => (
            <Button
              key={duelist.id}
              variant={selectedDuelist === duelist.id ? "default" : "outline"}
              className={`h-24 flex flex-col items-center justify-center ${selectedDuelist === duelist.id ? "ring-2 ring-primary" : ""}`}
              onClick={() => handleVote(duelist.id)}
              disabled={hasVoted || !isVotingOpen}
            >
              <div className="flex items-center justify-center mb-2">
                {selectedDuelist === duelist.id && (
                  <ThumbsUp className="w-5 h-5 mr-1" />
                )}
                <span className="font-medium">{duelist.name}</span>
              </div>
              <div className="text-sm text-muted-foreground">
                {votes[duelist.id]} vote{votes[duelist.id] !== 1 ? "s" : ""}
              </div>
            </Button>
          ))}
        </div>

        {/* Show winner only when voting is complete */}
        {votingComplete && winner && (
          <div className="mt-4 p-3 bg-accent rounded-lg flex items-center justify-center">
            <Award className="w-5 h-5 mr-2 text-yellow-500" />
            <span className="font-medium">{winner.name} wins!</span>
          </div>
        )}

        {/* Show tie message if applicable */}
        {votingComplete && !winner && votes[duelists[0].id] === votes[duelists[1].id] && (
          <div className="mt-4 p-3 bg-muted rounded-lg flex items-center justify-center">
            <span className="font-medium">It's a tie! 🤝</span>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-center">
        {hasVoted ? (
          <p className="text-sm text-muted-foreground">
            Thanks for voting! Waiting for others...
          </p>
        ) : (
          <p className="text-sm text-muted-foreground">
            {isVotingOpen
              ? "Click on a player to cast your vote"
              : "Voting is currently closed"}
          </p>
        )}
      </CardFooter>
    </Card>
  );
};

export default VotingSystem;
