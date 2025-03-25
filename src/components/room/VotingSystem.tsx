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
import { ThumbsUp, ThumbsDown, Award } from "lucide-react";

interface Duelist {
  id: string;
  name: string;
  videoUrl: string;
}

interface VotingSystemProps {
  duelists?: [Duelist, Duelist];
  onVoteComplete?: (winnerId: string) => void;
  isVotingOpen?: boolean;
}

const VotingSystem = ({
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
  onVoteComplete = () => {},
  isVotingOpen = true,
}: VotingSystemProps) => {
  const [selectedDuelist, setSelectedDuelist] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [votes, setVotes] = useState<Record<string, number>>({
    [duelists[0].id]: 0,
    [duelists[1].id]: 0,
  });

  const handleVote = (duelistId: string) => {
    if (hasVoted || !isVotingOpen) return;

    setSelectedDuelist(duelistId);
    setVotes((prev) => ({
      ...prev,
      [duelistId]: prev[duelistId] + 1,
    }));
    setHasVoted(true);

    // Notify parent component about the vote
    onVoteComplete(duelistId);
  };

  const getWinner = () => {
    if (votes[duelists[0].id] > votes[duelists[1].id]) return duelists[0];
    if (votes[duelists[0].id] < votes[duelists[1].id]) return duelists[1];
    return null; // Tie
  };

  const winner = getWinner();

  return (
    <Card className="w-full max-w-md mx-auto bg-background">
      <CardHeader className="text-center">
        <CardTitle className="text-xl font-bold">Vote for the Winner</CardTitle>
        <CardDescription>
          {isVotingOpen
            ? "Choose which duelist had the best music submission"
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

        {!isVotingOpen && winner && (
          <div className="mt-4 p-3 bg-accent rounded-lg flex items-center justify-center">
            <Award className="w-5 h-5 mr-2 text-yellow-500" />
            <span className="font-medium">{winner.name} wins!</span>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-center">
        {hasVoted ? (
          <p className="text-sm text-muted-foreground">Thanks for voting!</p>
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
