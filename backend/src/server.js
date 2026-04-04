import express from "express";
import { ENV } from "./lib/env.js";
import path from "node:path";
import dbConnect from "./lib/db.js";
import { serve } from "inngest/express";
import { inngest, deleteUser, syncUser } from "./lib/inngest.js";
import cors from "cors";

const app = express();

const __dirname = path.resolve();

const functions = [deleteUser, syncUser];

app.use(express.json());
app.use(
  cors({
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
    origin:
      ENV.NODE_ENV === "development"
        ? ENV.CLIENT_URL
        : ENV.CLIENT_URL_PRODUCTION,
  }),
);

app.use("/api/inngest", serve({ client: inngest, functions }));

app.get("/check", (req, res) => {
  res.send("hi we are ready");
});

//make it ready for deployement
if (ENV.NODE_ENV !== "development") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("/{any}", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

app.listen(ENV.PORT, (err) => {
  if (err) {
    console.log(err.message || err);
    process.exit(1); //0 means success 1 means false
  } else {
    console.log(`Server Started at http://localhost:${process.env.PORT}`);
    dbConnect();
  }
});
