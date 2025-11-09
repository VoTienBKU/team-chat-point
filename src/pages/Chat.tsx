import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ChannelSidebar from "@/components/chat/ChannelSidebar";
import ChatArea from "@/components/chat/ChatArea";
import UserList from "@/components/chat/UserList";

const Chat = () => {
  const [currentChannel, setCurrentChannel] = useState<string | null>(null);
  const [channels, setChannels] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (!username) {
      navigate("/");
    }
  }, [navigate]);

  const handleCreateChannel = (name: string) => {
    if (!channels.includes(name)) {
      setChannels([...channels, name]);
      setCurrentChannel(name);
    }
  };

  const handleJoinChannel = (name: string) => {
    if (!channels.includes(name)) {
      setChannels([...channels, name]);
    }
    setCurrentChannel(name);
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
