import express from "express";
import { ENV } from "./lib/env.js";

const app = express();

app.listen(ENV.PORT, (err) => {
  if (err) {
    console.log(err.message || err);
  } else {
    console.log(`Server Started at http://localhost:${process.env.PORT}`);
  }
});
