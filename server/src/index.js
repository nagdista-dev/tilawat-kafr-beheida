import express from "express";
import "dotenv/config";
import connectDB from "./configs/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
// !TESTING AREA
// !START PLAYING
await connectDB();

const app = express();
// !MIDDLE WARES
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["https://tilawat-kafr-beheida-client.vercel.app"],
    credentials: true,
  }),
);
const port = process.env.PORT || 3001;

app.get("/", (_, res) => {
  res.json({ message: "Server is live | Tilawat Kaf beheida" });
});
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.listen(port, () => {
  console.log("Server is live on port: ", port);
});
