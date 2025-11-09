import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Hash, Plus, LogOut, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getCookie, deleteCookie } from "@/lib/cookies";

interface ChannelSidebarProps {
  channels: string[];
  currentChannel: string | null;
  onChannelSelect: (channel: string) => void;
  onCreateChannel: (name: string) => void;
  onJoinChannel: (name: string) => void;
}

const ChannelSidebar = ({
  channels,
  currentChannel,
  onChannelSelect,
  onCreateChannel,
  onJoinChannel,
}: ChannelSidebarProps) => {
  const [newChannelName, setNewChannelName] = useState("");
  const [joinChannelName, setJoinChannelName] = useState("");
  const [openCreate, setOpenCreate] = useState(false);
  const [openJoin, setOpenJoin] = useState(false);
  const navigate = useNavigate();

  const handleCreateChannel = () => {
    if (newChannelName.trim()) {
      onCreateChannel(newChannelName.trim());
      setNewChannelName("");
      setOpenCreate(false);
    }
  };

  const handleJoinChannel = () => {
    if (joinChannelName.trim()) {
      onJoinChannel(joinChannelName.trim());
      setJoinChannelName("");
      setOpenJoin(false);
    }
  };

  const handleLogout = () => {
    deleteCookie("username");
    deleteCookie("token");
    navigate("/");
  };

  const username = getCookie("username") || "User";

  return (
    <div className="w-64 bg-card border-r border-border flex flex-col">
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2 mb-4">
          <div className="bg-gradient-to-br from-primary to-secondary p-2 rounded-lg">
            <MessageSquare className="h-5 w-5 text-primary-foreground" />
          </div>
          <h1 className="text-xl font-bold">Chat App</h1>
        </div>
        <div className="text-sm text-muted-foreground">@{username}</div>
      </div>

      <div className="p-3 border-b border-border">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-semibold text-muted-foreground">CHANNELS</h2>
          <div className="flex gap-1">
            <Dialog open={openCreate} onOpenChange={setOpenCreate}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Plus className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create Channel</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <Input
                    placeholder="channel-name"
                    value={newChannelName}
                    onChange={(e) => setNewChannelName(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleCreateChannel()}
                  />
                  <Button onClick={handleCreateChannel} className="w-full">
                    Create
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <Dialog open={openJoin} onOpenChange={setOpenJoin}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Hash className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Join Channel</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <Input
                    placeholder="channel-name"
                    value={joinChannelName}
                    onChange={(e) => setJoinChannelName(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleJoinChannel()}
                  />
                  <Button onClick={handleJoinChannel} className="w-full">
                    Join
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2">
          {channels.length === 0 ? (
            <div className="text-sm text-muted-foreground text-center py-4">
              No channels yet
            </div>
          ) : (
            channels.map((channel) => (
              <button
                key={channel}
                onClick={() => onChannelSelect(channel)}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
                  currentChannel === channel
                    ? "bg-accent text-accent-foreground"
                    : "hover:bg-muted text-foreground"
                }`}
              >
                <Hash className="h-4 w-4" />
                {channel}
              </button>
            ))
          )}
        </div>
      </ScrollArea>

      <div className="p-3 border-t border-border">
        <Button variant="ghost" size="sm" onClick={handleLogout} className="w-full justify-start">
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default ChannelSidebar;
