/**
 * Room Entry Component
 * Handles joining existing rooms or creating new ones
 *
 * CORRECTIONS APPLIED:
 * - Added Zod validation for nickname and room code
 * - Integrated React Hook Form with Zod resolver
 * - Added proper error messages for validation
 * - Improved form UX with validation feedback
 * - Used centralized validators from @/lib/validators
 */

import React, { useState } from "react";
import { Music, Users, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import {
  joinRoomSchema,
  createRoomSchema,
  type JoinRoomInput,
  type CreateRoomInput,
} from "@/lib/validators";

interface RoomEntryProps {
  onJoinRoom?: (nickname: string, roomCode: string) => void;
  onCreateRoom?: (nickname: string) => void;
}

const RoomEntry: React.FC<RoomEntryProps> = ({
  onJoinRoom = () => {},
  onCreateRoom = () => {},
}) => {
  const [activeTab, setActiveTab] = useState("join");

  // Form for joining room
  const {
    register: registerJoin,
    handleSubmit: handleSubmitJoin,
    formState: { errors: errorsJoin, isSubmitting: isSubmittingJoin },
  } = useForm<JoinRoomInput>({
    resolver: zodResolver(joinRoomSchema),
    mode: "onBlur", // Validate on blur for better UX
  });

  // Form for creating room
  const {
    register: registerCreate,
    handleSubmit: handleSubmitCreate,
    formState: { errors: errorsCreate, isSubmitting: isSubmittingCreate },
  } = useForm<CreateRoomInput>({
    resolver: zodResolver(createRoomSchema),
    mode: "onBlur",
  });

  /**
   * Handle join room form submission
   * ✅ FIXED: Added Zod validation before calling parent handler
   */
  const onSubmitJoin = (data: JoinRoomInput) => {
    onJoinRoom(data.nickname, data.roomCode.toUpperCase());
  };

  /**
   * Handle create room form submission
   * ✅ FIXED: Added Zod validation before calling parent handler
   */
  const onSubmitCreate = (data: CreateRoomInput) => {
    onCreateRoom(data.nickname);
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

            {/* Join Room Tab */}
            <TabsContent value="join">
              <form onSubmit={handleSubmitJoin(onSubmitJoin)}>
                <div className="mb-4">
                  <label
                    htmlFor="join-nickname"
                    className="block text-sm font-medium mb-1"
                  >
                    Your Nickname
                  </label>
                  <Input
                    id="join-nickname"
                    placeholder="Enter your nickname"
                    {...registerJoin("nickname")}
                    className="w-full"
                    aria-invalid={!!errorsJoin.nickname}
                  />
                  {errorsJoin.nickname && (
                    <p className="text-xs text-red-500 mt-1">
                      {errorsJoin.nickname.message}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="roomCode"
                    className="block text-sm font-medium mb-1"
                  >
                    Room Code
                  </label>
                  <Input
                    id="roomCode"
                    placeholder="Enter room code (e.g., ABC123)"
                    {...registerJoin("roomCode")}
                    className="w-full uppercase"
                    maxLength={6}
                    aria-invalid={!!errorsJoin.roomCode}
                  />
                  {errorsJoin.roomCode && (
                    <p className="text-xs text-red-500 mt-1">
                      {errorsJoin.roomCode.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmittingJoin}
                >
                  {isSubmittingJoin ? "Joining..." : "Join Room"}
                </Button>
              </form>
            </TabsContent>

            {/* Create Room Tab */}
            <TabsContent value="create">
              <form onSubmit={handleSubmitCreate(onSubmitCreate)}>
                <div className="mb-4">
                  <label
                    htmlFor="create-nickname"
                    className="block text-sm font-medium mb-1"
                  >
                    Your Nickname
                  </label>
                  <Input
                    id="create-nickname"
                    placeholder="Enter your nickname"
                    {...registerCreate("nickname")}
                    className="w-full"
                    aria-invalid={!!errorsCreate.nickname}
                  />
                  {errorsCreate.nickname && (
                    <p className="text-xs text-red-500 mt-1">
                      {errorsCreate.nickname.message}
                    </p>
                  )}
                </div>

                <p className="text-sm text-muted-foreground mb-4">
                  Create a new room and become the room leader. You'll be able
                  to control the game flow.
                </p>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmittingCreate}
                >
                  {isSubmittingCreate ? "Creating..." : "Create New Room"}
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
