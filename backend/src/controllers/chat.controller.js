import { chatClient } from "../lib/stream.js";

export const getStreamToken = async (req, res) => {
  try {
    const token = chatClient.createToken(req.user.clerkId);
    const returnPayload = {
      name: req.user.name,
      userId: req.user._id,
      userImage: req.user.profileImg,
    };
    console.log(token);
    return res
      .status(200)
      .json({ message: "Stream Token Generated", token, user: returnPayload });
  } catch (error) {
    console.log("Error in getStream token controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
