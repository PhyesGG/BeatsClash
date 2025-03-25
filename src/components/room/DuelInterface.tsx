import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Play, Pause, SkipForward, Volume2, VolumeX } from "lucide-react";

interface DuelInterfaceProps {
  isRoomLeader?: boolean;
  isDuelist?: boolean;
  theme?: string;
  currentDuelists?: { id: string; name: string }[];
  onSubmitLink?: (link: string) => void;
  onPlaybackControl?: (action: "play" | "pause" | "next") => void;
}

const DuelInterface = ({
  isRoomLeader = false,
  isDuelist = false,
  theme = "Rap FR",
  currentDuelists = [
    { id: "1", name: "Player 1" },
    { id: "2", name: "Player 2" },
  ],
  onSubmitLink = () => {},
  onPlaybackControl = () => {},
}: DuelInterfaceProps) => {
  const [youtubeLink, setYoutubeLink] = useState("");
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [submittedLinks, setSubmittedLinks] = useState<string[]>([]);

  // Mock data for demonstration
  const mockVideos = [
    "https://www.youtube.com/embed/dQw4w9WgXcQ",
    "https://www.youtube.com/embed/jNQXAC9IVRw",
  ];

  const handleLinkSubmit = () => {
    if (youtubeLink.trim() !== "") {
      onSubmitLink(youtubeLink);
      // In a real implementation, this would be handled by the parent component
      // For demo purposes, we'll just add it to our local state
      setSubmittedLinks([...submittedLinks, youtubeLink]);
      setYoutubeLink("");
    }
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    onPlaybackControl(isPlaying ? "pause" : "play");
  };

  const handleNext = () => {
    setCurrentVideo(1); // In a real implementation, this would toggle between videos
    onPlaybackControl("next");
  };

  const handleMute = () => {
    setIsMuted(!isMuted);
  };

  // Determine which view to show based on user role
  const renderContent = () => {
    // If user is a duelist and hasn't submitted a link yet
    if (isDuelist && submittedLinks.length < 2) {
      return (
        <div className="p-6 bg-card rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-4">Submit Your Track</h3>
          <p className="mb-4">
            Current theme:{" "}
            <span className="font-bold text-primary">{theme}</span>
          </p>
          <div className="flex flex-col space-y-4">
            <Input
              type="text"
              placeholder="Paste YouTube link here"
              value={youtubeLink}
              onChange={(e) => setYoutubeLink(e.target.value)}
              className="w-full"
            />
            <Button onClick={handleLinkSubmit} className="w-full">
              Submit Track
            </Button>
          </div>
        </div>
      );
    }

    // Video player view (for everyone once links are submitted)
    return (
      <div className="flex flex-col bg-card rounded-lg shadow-md overflow-hidden">
        <div className="relative w-full pt-[56.25%] bg-black">
          {/* YouTube embed - in a real implementation, this would use the YouTube API */}
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={`${mockVideos[currentVideo]}?autoplay=${isPlaying ? 1 : 0}&mute=${isMuted ? 1 : 0}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        <div className="p-4 bg-card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold">Now Playing</h3>
              <p className="text-sm text-muted-foreground">
                {currentDuelists[currentVideo]?.name}'s submission
              </p>
            </div>
            <div className="text-sm text-muted-foreground">
              Track {currentVideo + 1} of 2
            </div>
          </div>

          {/* Playback controls - only visible to room leader */}
          {isRoomLeader && (
            <div className="flex justify-center space-x-4 mt-4">
              <Button variant="outline" size="icon" onClick={handlePlayPause}>
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </Button>
              <Button variant="outline" size="icon" onClick={handleNext}>
                <SkipForward size={20} />
              </Button>
              <Button variant="outline" size="icon" onClick={handleMute}>
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-background p-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-center">Music Duel</h2>
        <p className="text-center text-muted-foreground">
          {isDuelist
            ? "It's your turn to duel!"
            : isRoomLeader
              ? "Control the duel playback"
              : "Watch the duel and get ready to vote"}
        </p>
      </div>

      <div className="flex justify-center mb-4">
        <div className="flex items-center space-x-2 px-4 py-2 bg-muted rounded-full">
          <div className="flex items-center">
            <span className="text-sm font-medium mr-2">Duelists:</span>
            <span className="text-sm text-primary font-bold">
              {currentDuelists[0]?.name} vs {currentDuelists[1]?.name}
            </span>
          </div>
        </div>
      </div>

      {renderContent()}
    </div>
  );
};

export default DuelInterface;
