import { chatClient, streamClient } from "../lib/stream.js";

export const getStreamToken = async (req, res) => {
  try {
    const issuedAt = Math.floor(Date.now() / 1000) - 60; //behind 60seconds
    const chatToken = chatClient.createToken(
      req.user.clerkId,
      undefined,
      issuedAt,
    );
    const videoToken = streamClient.generateUserToken({
      user_id: req.user.clerkId,
      iat: issuedAt,
    });


    const returnPayload = {
      name: req.user.name,
      userId: req.user.clerkId,
      userImage: req.user.profileImg,
    };
    return res.status(200).json({
      message: "Stream Token Generated",
      chatToken,
      videoToken,
      user: returnPayload,
    });
  } catch (error) {
    console.log("Error in getStream token controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
