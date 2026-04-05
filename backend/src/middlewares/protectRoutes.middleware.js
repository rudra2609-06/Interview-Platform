import { requireAuth, getAuth } from "@clerk/express";
import UserModel from "../models/user.model.js";

export const protectRoutes = [
  requireAuth(),
  async (req, res, next) => {
    try {
      const {userId : clerkId} = getAuth(req);
      if (!clerkId)
        return res
          .status(401)
          .json({ message: "Unauthorized - Invalid Token" });

      const user = await UserModel.findOne({ clerkId });
      if (!user) return res.status(404).json({ message: "User not found" });
      req.user = user;
      next();
    } catch (error) {
      console.log("error in protectRoutes middleware",error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
];
