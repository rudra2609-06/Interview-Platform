//A webhook is an automated, HTTP-based callback that allows one application to push real-time data to another whenever a specific event occurs.
import { Inngest } from "inngest";
import dbConnect from "./db.js";
import UserModel from "../models/user.model.js";

export const inngest = new Inngest({ id: "interview-app" });

export const syncUser = inngest.createFunction(
  { id: "sync-user", triggers: { event: "clerk/user.created" } },
  async ({ event, step }) => {
    try {
      await dbConnect();
      const { id, image_url, email_addresses, first_name, last_name } =
        event.data;
      const newUser = {
        clerkId: id,
        name: `${first_name || ""} ${last_name}`,
        email: email_addresses[0].email_address,
        profileImg: image_url,
      };
      await UserModel.create(newUser);
      return { success: true };
    } catch (error) {
      console.error("Error syncing user:", error);
      throw error; // Let Inngest handle the error properly
    }
  },
  // TODO do something else
);

export const deleteUser = inngest.createFunction(
  { id: "deleteUser", triggers: { event: "clerk/user.deleted" } },
  async ({ event, step }) => {
    try {
      const { deleted, id } = event.data;
      if (deleted && id) {
        await UserModel.deleteOne({ clerkId: id });
      }
      return { success: true };
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
    // TODO do something else
  },
);
