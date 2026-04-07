import { StreamChat } from "stream-chat";
import { StreamClient } from "@stream-io/node-sdk";
import { ENV } from "./env.js";

const streamApiKey = ENV.STREAM_API_KEY;
const streamApiSecret = ENV.STREAM_API_SECRET;

if (!streamApiKey || !streamApiSecret) {
  throw new Error("Require StreamApiKey or StreamApiSecret");
}

export const chatClient = StreamChat.getInstance(streamApiKey, streamApiSecret);
export const streamClient = new StreamClient(streamApiKey, streamApiSecret, {
  timeout: 6000,
});


export const upsertStreamUser = async (userData) => {
  try {
    await chatClient.upsertUser(userData);
    return userData;
  } catch (error) {
    console.log("error upstreaming user:", error);
    throw error;
  }
};

export const deleteStreamUser = async (userId) => {
  try {
    await chatClient.deleteUser(userId);
    return userId;
  } catch (error) {
    console.log("error deleting stream user:", error);
    throw error;
  }
};
