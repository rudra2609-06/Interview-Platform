import { chatClient, streamClient } from "../lib/stream.js";
import SessionModel from "../models/session.model.js";

export const createSession = async (req, res) => {
  try {
    const { problem, difficulty } = req.body;
    const userId = req.user._id;
    const clerkId = req.user.clerkId;

    if (!problem || !difficulty)
      return res.status(400).json({ message: "All Fields Are Required" });

    //generate unique call id from stream vedio call
    const callId = `session_${Date.now()}_${Math.random().toString(36).substring(7)}`;

    const session = await SessionModel.create({
      problem,
      difficulty,
      host: userId,
      callId,
    });

    //create a stream vedio call
    await streamClient.video.call("default", callId).getOrCreate({
      data: {
        created_by_id: clerkId,
        // members : [{user_id : userId}],
        custom: {
          color: "blue",
        },
      },
    });

    //setup chat messaging after initiating vedio call
    const channel = chatClient.channel("messaging", callId, {
      name: `${problem} Session`,
      created_by_id: clerkId,
      members: [clerkId],
    });

    await channel.create();
    res.status(201).json({ message: "Session Created Successfully", session });
  } catch (error) {
    console.log("create session controller error: ", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getActiveSessions = async (req, res) => {
  try {
    const userId = req.user._id;
    const activeSessions = await SessionModel.find({
      status: "active",
      $or: [{ host: userId }, { participant: userId }],
    })
      .populate("host", "name profileImg")
      .populate("participant", "name profileImg")
      .sort({ createdAt: -1 })
      .limit(20);
    res
      .status(200)
      .json({ message: "Active Sessions Fetched", session: activeSessions });
  } catch (error) {
    console.log("get active session controller error: ", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getPastSessions = async (req, res) => {
  try {
    const userId = req.user._id;
    const pastSessions = await SessionModel.find({
      status: "completed",
      $or: [
        {
          host: userId,
        },
        {
          participant: userId,
        },
      ],
    })
      .populate("host", "name profileImg")
      .populate("participant", "name profileImg")
      .sort({ createdAt: -1 })
      .limit(20);
    return res
      .status(200)
      .json({ message: "Past Session Fetched", sessions: pastSessions });
  } catch (error) {
    console.log("get past session controller error: ", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getSessionById = async (req, res) => {
  try {
    const id = req.params.id;
    const session = await SessionModel.findById(id)
      .populate("host", "name profileImg email clerkId")
      .populate("participant", "name profileImg email clerkId");

    if (!session) {
      return res.status(404).json({ message: "Session Not Found" });
    }
    return res
      .status(200)
      .json({ message: "Session Found Successfully", session });
  } catch (error) {
    console.log("get session by id controller error: ", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const joinSession = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const clerkId = req.user.clerkId;

    const session = await SessionModel.findById(id);
    if (!session) return res.status(404).json({ message: "Session Not Found" });

    //if session is already completed
    if (session.status === "completed")
      return res.status(400).json({ message: "Session Already Completed" });

    if (session.host.toString() === userId.toString()) {
      return res
        .status(400)
        .json({ message: "Host Cannot join as participant" });
    }

    //check if session if already full that is it already has 2 participant
    if (session.participant)
      return res
        .status(409)
        .json({ message: "Session Already has 2 Members.Its Full" });

    session.participant = userId;
    await session.save();
    const channel = chatClient.channel("messaging", session.callId);
    channel.addMembers([clerkId]);
    return res
      .status(200)
      .json({ message: "Session Joined Successfully", session });
  } catch (error) {
    console.log("join session controller error: ", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const endSession = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const session = await SessionModel.findById(id);
    if (!session) return res.status(404).json({ message: "Session Not Found" });

    //check if the user is host or not
    if (!(session.host.toString() === userId.toString()))
      return res.status(403).json({ message: "Only Host Can End Session" });

    //check if session if already completed
    if ((session.status === "completed"))
      return res.status(400).json({ message: "Session Already Ended" });

    //delete vedio call
    const call = streamClient.video.call("default", session.callId);
    await call.delete({ hard: true });

    //delete chat messaging
    const channel = chatClient.channel("messaging", session.callId);
    await channel.delete({ hard_delete: true });

    //end the session
    session.status = "completed";
    await session.save();

    return res.status(200).json({ message: "Session Ended Successfully" });
  } catch (error) {
    console.log("end session controller error: ", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
