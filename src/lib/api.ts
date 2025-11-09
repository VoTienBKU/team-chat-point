// API Service - Currently using fake data, will be replaced with real endpoints later

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  token?: string;
  message?: string;
}

export interface UpdateAddressRequest {
  ip: string;
  port: number;
}

export interface CreateChannelRequest {
  name: string;
}

export interface JoinChannelRequest {
  name: string;
}

export interface MyChannelsResponse {
  channels: string[];
}

export interface User {
  username: string;
  ip: string;
  port: number;
}

export interface UserChannelsResponse {
  users: User[];
}

// Fake data storage
let fakeChannels: string[] = ["general", "random"];
let fakeUsers: User[] = [
  { username: "votien", ip: "192.168.1.10", port: 8000 },
  { username: "user2", ip: "192.168.1.11", port: 8001 },
  { username: "user3", ip: "192.168.1.12", port: 8002 },
];

// POST /login
export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Fake validation
  if (data.username === "votien" && data.password === "1234") {
    return {
      success: true,
      token: "fake-jwt-token-" + Date.now(),
    };
  }
  
  return {
    success: false,
    message: "Invalid credentials",
  };
};

// POST /update_address
export const updateAddress = async (data: UpdateAddressRequest): Promise<{ success: boolean }> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  console.log("Updated address:", data);
  return { success: true };
};

// POST /create_channel
export const createChannel = async (data: CreateChannelRequest): Promise<{ success: boolean; channel?: string }> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  if (!fakeChannels.includes(data.name)) {
    fakeChannels.push(data.name);
  }
  
  return { success: true, channel: data.name };
};

// POST /join_channel
export const joinChannel = async (data: JoinChannelRequest): Promise<{ success: boolean }> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  console.log("Joined channel:", data.name);
  return { success: true };
};

// GET /my_channels
export const getMyChannels = async (): Promise<MyChannelsResponse> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return {
    channels: fakeChannels,
  };
};

// GET /user_channels?name=channel_name
export const getUserChannels = async (channelName: string): Promise<UserChannelsResponse> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Return all fake users for any channel
  return {
    users: fakeUsers,
  };
};
