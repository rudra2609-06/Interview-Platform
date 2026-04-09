import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    problem: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      required: true,
    },
    host: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "usertbl",
      required: true,
    },
    participant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "usertbl",
      default: null,
    },
    status: {
      type: String,
      enum: ["active", "completed"],
      default : "active",
    },
    callId: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

const SessionModel =
  mongoose.models.sessiontbl || mongoose.model("sessiontbl", sessionSchema);

export default SessionModel;
