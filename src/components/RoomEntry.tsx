import React, { useState } from "react";
import { Music, Users, Plus } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface RoomEntryProps {
  onJoinRoom?: (nickname: string, roomCode: string) => void;
  onCreateRoom?: (nickname: string) => void;
}

const RoomEntry = ({
  onJoinRoom = () => {},
  onCreateRoom = () => {},
}: RoomEntryProps) => {
  const [nickname, setNickname] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [activeTab, setActiveTab] = useState("join");

  const handleJoinRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (nickname.trim() && roomCode.trim()) {
      onJoinRoom(nickname, roomCode);
    }
  };

  const handleCreateRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (nickname.trim()) {
      onCreateRoom(nickname);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[400px] w-full bg-background">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center">
            <Music className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Musical Duel</CardTitle>
          <CardDescription>
            Enter a nickname and join or create a room to start dueling
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="mb-4">
            <label
              htmlFor="nickname"
              className="block text-sm font-medium mb-1"
            >
              Your Nickname
            </label>
            <Input
              id="nickname"
              placeholder="Enter your nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="w-full"
            />
          </div>

          <Tabs
            defaultValue="join"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid grid-cols-2 w-full mb-4">
              <TabsTrigger value="join" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Join Room
              </TabsTrigger>
              <TabsTrigger value="create" className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Create Room
              </TabsTrigger>
            </TabsList>

            <TabsContent value="join">
              <form onSubmit={handleJoinRoom}>
                <div className="mb-4">
                  <label
                    htmlFor="roomCode"
                    className="block text-sm font-medium mb-1"
                  >
                    Room Code
                  </label>
                  <Input
                    id="roomCode"
                    placeholder="Enter room code"
                    value={roomCode}
                    onChange={(e) => setRoomCode(e.target.value)}
                    className="w-full"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={!nickname.trim() || !roomCode.trim()}
                >
                  Join Room
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="create">
              <form onSubmit={handleCreateRoom}>
                <p className="text-sm text-muted-foreground mb-4">
                  Create a new room and become the room leader. You'll be able
                  to control the game flow.
                </p>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={!nickname.trim()}
                >
                  Create New Room
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>

        <CardFooter className="flex justify-center border-t pt-4">
          <p className="text-xs text-muted-foreground">
            By joining, you agree to follow the rules of the duel
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RoomEntry;
