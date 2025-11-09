import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react";

interface ChatAreaProps {
  currentChannel: string | null;
}

interface Message {
  id: string;
  user: string;
  text: string;
  timestamp: Date;
}

const ChatArea = ({ currentChannel }: ChatAreaProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim() && currentChannel) {
      const message: Message = {
        id: Date.now().toString(),
        user: localStorage.getItem("username") || "User",
        text: newMessage,
        timestamp: new Date(),
      };
      setMessages([...messages, message]);
      setNewMessage("");
    }
  };

  if (!currentChannel) {
    return (
      <div className="flex-1 flex items-center justify-center text-muted-foreground">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Welcome to Chat</h2>
          <p>Select a channel or create a new one to start chatting</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="px-6 py-4 border-b border-border">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <span className="text-muted-foreground">#</span>
          {currentChannel}
        </h2>
      </div>

      <ScrollArea className="flex-1 p-4">
        {messages.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
            No messages yet. Start the conversation!
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className="group">
                <div className="flex items-baseline gap-2">
                  <span className="font-semibold text-foreground">{message.user}</span>
                  <span className="text-xs text-muted-foreground">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-foreground mt-1">{message.text}</p>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>

      <div className="p-4 border-t border-border">
        <div className="flex gap-2">
          <Input
            placeholder={`Message #${currentChannel}`}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <Button onClick={handleSendMessage} size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;
