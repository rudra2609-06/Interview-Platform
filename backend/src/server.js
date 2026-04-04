import express from "express";
import { ENV } from "./lib/env.js";
import path from "node:path";
import dbConnect from "./lib/db.js";

const app = express();

const __dirname = path.resolve();

app.get("/check",(req,res) => {
  res.send("hi we are ready");
})

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
