import { StreamChat } from "stream-chat";
import { ENV } from "./env.js";

const streamApiKey = ENV.STREAM_API_KEY;
const streamApiSecret = ENV.STREAM_API_SECRET;

if (!streamApiKey || !streamApiSecret) {
  throw new Error("Require StreamApiKey or StreamApiSecret");
}

export const chatClient = StreamChat.getInstance(streamApiKey, streamApiSecret);

export const upsertStreamUser = async (userData) => {
  try {
    await chatClient.upsertUser(userData);
    return userData;
  } catch (error) {
    throw new Error("Error upserting stream user", error);
  }
};

export const deleteStreamUser = async (userId) => {
  try {
    await chatClient.deleteUser(userId);
    return userId;
  } catch (error) {
    throw new Error("Error deleting stream user", error);
  }
};
