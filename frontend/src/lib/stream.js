import { StreamVideoClient } from "@stream-io/video-react-sdk";

const apikey = import.meta.env.VITE_STREAM_API_KEY;

let client = null;

export const initializeStreamClient = async (user, token) => {
  if (client && client.user?.id === user.id) return client;

  if (client) {
    await disconnectStreamClient();
  }
  if (!apikey || !user || !token) return;

  console.log("user", user);

  client = new StreamVideoClient({
    apiKey: apikey,
    user,
    token,
  });

  return client;
};

export const disconnectStreamClient = async () => {
  try {
    if (client) {
      await client.disconnectUser();
      client = null;
    }
  } catch (error) {
    console.log("error disconnecting string client", error);
  }
};
