//A webhook is an automated, HTTP-based callback that allows one application to push real-time data to another whenever a specific event occurs.
import { Inngest } from "inngest";
import dbConnect from "./db.js";
import UserModel from "../models/user.model.js";
import { deleteStreamUser, upsertStreamUser } from "./stream.js";

export const inngest = new Inngest({ id: "interview-app" });

export const syncUser = inngest.createFunction(
  { id: "sync-user", triggers: [{ event: "clerk/user.created" }] },
  async ({ event, step }) => {
    try {
      await dbConnect();
      const { id, image_url, email_addresses, first_name, last_name } =
        event.data;
      const newUser = {
        clerkId: id,
        name: `${first_name || ""} ${last_name}`,
        email: email_addresses[0]?.email_address,
        profileImg: image_url,
      };
      await UserModel.create(newUser);
      await upsertStreamUser({
        id: newUser.clerkId.toString(),
        name: newUser.name,
        image: newUser.profileImg,
      });
    } catch (error) {
      console.error("Error syncing user:", error);
      throw error;
    }
  },
);

export const deleteUser = inngest.createFunction(
  { id: "deleteUser", triggers: [{ event: "clerk/user.deleted" }] },
  async ({ event, step }) => {
    try {
      await dbConnect();
      const { deleted, id } = event.data;
      if (deleted && id) {
        await UserModel.deleteOne({ clerkId: id });
        await deleteStreamUser(id.toString());
      }
    } catch (error) {
      console.error("Inngest error deleting user:", error);
      throw error;
    }
  },
);
