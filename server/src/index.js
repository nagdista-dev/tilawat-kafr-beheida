import express from "express";
import "dotenv/config";
import connectDB from "./configs/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import adminRouter from "./routes/admin.routes.js";
import upload from "./configs/multer.js";
import cloudinary from "./configs/cloudinary.js";
import Audio from "./models/audio.js";
// !TESTING AREA
// !START PLAYING
await connectDB();

const app = express();
// !MIDDLE WARES
app.use(express.json());
app.use(cookieParser());
app.use(cors());
const port = process.env.PORT || 3001;

app.get("/", (_, res) => {
  res.json({ message: "Server is live | Tilawat Kaf beheida" });
});

app.post("/api/upload", upload.single("audio"), async (req, res) => {
  try {
    const audio = req.file;
    const { audioName, readerName, description } = req.body;
    if (!audio || !audioName || !readerName || !description) {
      return res.status(400).send("No file uploaded, Please fill all fields");
    }

    const result = await cloudinary.uploader.upload(audio.path, {
      resource_type: "video",
      folder: "audios",
      transformation: [
        { quality: "auto", bit_rate: "64k", audio_codec: "mp3" },
      ],
    });

    const newAudio = await Audio.create({
      audioName,
      readerName,
      url: result.secure_url,
      description,
    });
    res.json({
      message: "Audio uploaded successfully",
      audioName: newAudio.audioName,
      audioURL: newAudio.url,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/all", async (req, res) => {
  try {
    const allAudios = await Audio.find({});
    res.status(200).json({ length:allAudios.length,audios: allAudios });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/upload", upload.single("audio"));
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.listen(port, () => {
  console.log("Server is live on port: ", port);
});
