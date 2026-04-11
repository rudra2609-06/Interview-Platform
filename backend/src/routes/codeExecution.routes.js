import express from "express";
import { ENV } from "../lib/env.js";

const router = express.Router();

router.post("/execute", async (req, res) => {
  try {
    const { language, code, version } = req.body;
    if (!language || !code || !version)
      return res
        .status(400)
        .json({ message: "Required All Fields To Execute Code" });

    const jdoodleRes = await fetch(`https://api.jdoodle.com/v1/execute`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        clientId: ENV.JDOODLE_CLIENT_ID,
        clientSecret: ENV.JDOODLE_CLIENT_SECRET,
        script: code,
        language: language,
        versionIndex: version,
      }),
    });
    const data = await jdoodleRes.json();
    console.log("JDoodle response:", data);

    if (data.statusCode !== 200) {
      console.log("JDoodle error:", data.error);
      return res.status(data.statusCode).json({
        message: "Code Compilation Failed",
        data: data,
      });
    }
    return res
      .status(200)
      .json({ message: "Code Compiled Successfully", data });
  } catch (error) {
    console.log("Backend error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
