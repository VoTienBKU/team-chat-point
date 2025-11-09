import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ChannelSidebar from "@/components/chat/ChannelSidebar";
import ChatArea from "@/components/chat/ChatArea";
import UserList from "@/components/chat/UserList";
import { getMyChannels, createChannel, joinChannel } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

const Chat = () => {
  const [currentChannel, setCurrentChannel] = useState<string | null>(null);
  const [channels, setChannels] = useState<string[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (!username) {
      navigate("/");
      return;
    }

    // Load user's channels
    const loadChannels = async () => {
      try {
        const response = await getMyChannels();
        setChannels(response.channels);
        if (response.channels.length > 0) {
          setCurrentChannel(response.channels[0]);
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load channels",
          variant: "destructive",
        });
      }
    };

    loadChannels();
  }, [navigate, toast]);

  const handleCreateChannel = async (name: string) => {
    try {
      const response = await createChannel({ name });
      if (response.success) {
        if (!channels.includes(name)) {
          setChannels([...channels, name]);
        }
        setCurrentChannel(name);
        toast({
          title: "Channel created",
          description: `Successfully created ${name}`,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create channel",
        variant: "destructive",
      });
    }
  };

  const handleJoinChannel = async (name: string) => {
    try {
      const response = await joinChannel({ name });
      if (response.success) {
        if (!channels.includes(name)) {
          setChannels([...channels, name]);
        }
        setCurrentChannel(name);
        toast({
          title: "Joined channel",
          description: `Successfully joined ${name}`,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to join channel",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <ChannelSidebar
        channels={channels}
        currentChannel={currentChannel}
        onChannelSelect={setCurrentChannel}
        onCreateChannel={handleCreateChannel}
        onJoinChannel={handleJoinChannel}
      />
      <div className="flex-1 flex flex-col">
        <ChatArea currentChannel={currentChannel} />
      </div>
      <UserList currentChannel={currentChannel} />
    </div>
  );
};

export default Chat;
