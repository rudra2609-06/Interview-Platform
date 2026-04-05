//A webhook is an automated, HTTP-based callback that allows one application to push real-time data to another whenever a specific event occurs.
import { Inngest } from "inngest";
import dbConnect from "./db.js";
<<<<<<< Updated upstream
import UserModel from "../models/user.model.js";
=======
import { deleteStreamUser, upsertStreamUser } from "./stream.js";
>>>>>>> Stashed changes

export const inngest = new Inngest({ id: "interview-app" });

export const syncUser = inngest.createFunction(
  { id: "sync-user", triggers: { event: "clerk/user.created" } },
  async ({ event, step }) => {
<<<<<<< Updated upstream
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
=======
    dbConnect();
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
>>>>>>> Stashed changes
  },
);

export const deleteUser = inngest.createFunction(
  { id: "deleteUser", triggers: { event: "clerk/user.deleted" } },
  async ({ event, step }) => {
<<<<<<< Updated upstream
    try {
      const { deleted, id } = event.data;
      if (deleted && id) {
        await UserModel.deleteOne({ clerkId: id });
      }
      return { success: true };
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
=======
    dbConnect();
    const { deleted, id } = event.data;
    if (deleted && id) {
      await UserModel.deleteOne({ clerkId: id });
      await deleteStreamUser(id.toString());
>>>>>>> Stashed changes
    }
  },
);
