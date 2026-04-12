import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { StreamChat } from "stream-chat";
import { sessionApi } from "../api/api";
import { disconnectStreamClient, initializeStreamClient } from "../lib/stream";

function useStreamClient({ session, loadingSession, isHost, isParticipant }) {
  const [streamClient, setStreamClient] = useState(null);
  const [call, setCall] = useState(null);
  const [chat, setChat] = useState(null);
  const [channel, setChannel] = useState(null);
  const [isInitializingCall, setIsInitializingCall] = useState(true);

  useEffect(() => {
    let videoCall = null;
    let chatClient = null;

    const initCall = async () => {
      if (!session?.callId) {
        setIsInitializingCall(false);
        return;
      }
      if (!isHost && !isParticipant) {
        setIsInitializingCall(false);
        return;
      }
      try {
        const { data, videoToken, chatToken } =
          await sessionApi.getStreamToken();
        const userDetails = {
          id: data.userId,
          name: data.name,
          image: data.userImage,
        };
        console.log("session", session);
        const client = await initializeStreamClient(userDetails, videoToken);
        console.log("client", client);
        console.log("videoToken", videoToken);
        console.log("userDetails", userDetails);
        setStreamClient(client);
        videoCall = client.call("default", session.callId);
        await videoCall.join({ create: true });
        setCall(videoCall);

        const apikey = import.meta.env.VITE_STREAM_API_KEY;
        chatClient = StreamChat.getInstance(apikey);
        await chatClient.connectUser(userDetails, chatToken);
        setChat(chatClient);
        const channel = chatClient.channel("messaging", session.callId);
        await channel.watch();
        setChannel(channel);
      } catch (error) {
        console.log("error init call", error);
        toast.error("Failed To Join Vedio Call");
      } finally {
        setIsInitializingCall(false);
      }
    };

    if (session && !loadingSession) initCall();

    return () => {
      (async () => {
        try {
          if (videoCall) await videoCall.leave();
          if (chatClient) await chatClient.disconnectUser();
          await disconnectStreamClient();
        } catch (error) {
          console.log("cleanup error", error);
        }
      })();
    };
  }, [isHost, isParticipant, session, loadingSession]);

  return {
    streamClient,
    call,
    chat,
    channel,
    isInitializingCall,
  };
}

export default useStreamClient;
