import { ScrollArea } from "@/components/ui/scroll-area";
import { Users } from "lucide-react";

interface UserListProps {
  currentChannel: string | null;
}

interface User {
  username: string;
  ip: string;
  port: number;
}

const UserList = ({ currentChannel }: UserListProps) => {
  // Mock users data - would come from API in real app
  const users: User[] = currentChannel
    ? [
        { username: "votien", ip: "192.168.1.100", port: 8000 },
        { username: "user2", ip: "192.168.1.101", port: 8001 },
        { username: "user3", ip: "192.168.1.102", port: 8002 },
      ]
    : [];

  return (
    <div className="w-64 bg-card border-l border-border flex flex-col">
      <div className="p-4 border-b border-border">
        <h2 className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
          <Users className="h-4 w-4" />
          MEMBERS — {users.length}
        </h2>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2">
          {users.length === 0 ? (
            <div className="text-sm text-muted-foreground text-center py-4">
              {currentChannel ? "No members" : "Select a channel"}
            </div>
          ) : (
            <div className="space-y-1">
              {users.map((user) => (
                <div
                  key={user.username}
                  className="px-3 py-2 rounded-md hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-sm font-medium text-foreground">
                      {user.username}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground ml-4">
                    <div>{user.ip}</div>
                    <div>Port: {user.port}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default UserList;
