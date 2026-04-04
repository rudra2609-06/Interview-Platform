//A webhook is an automated, HTTP-based callback that allows one application to push real-time data to another whenever a specific event occurs.
import { Inngest } from "inngest";
import dbConnect from "./db.js";
import UserModel from "../models/user.model.js";

export const inngest = new Inngest({ id: "interview-app" });

export const syncUser = inngest.createFunction(
  { id: "sync-user", trigger: { event: "clerk/user.created" } },
  async ({ event, step }) => {
    await dbConnect();
    console.log("DB ready");  
    const { id, image_url, email_addresses, first_name, last_name } =
      event.data;
    const newUser = {
      clerkId: id,
      name: `${first_name || ""} ${last_name}`,
      email: email_addresses[0].email_address,
      profileImg: image_url,
    };
    await UserModel.create(newUser);
  },
  // TODO do something else
);

export const deleteUser = inngest.createFunction(
  { id: "deleteUser", trigger: { event: "clerk/user.deleted" } },
  async ({ event, step }) => {
    await dbConnect();
    const { deleted, id } = event.data;
    if (deleted && id) {
      await UserModel.deleteOne({ clerkId: id });
    }
    // TODO do something else
  },
);
