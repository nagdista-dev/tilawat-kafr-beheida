import mongoose from "mongoose";
const readerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    profilePic: { type: String, default: "" },
    bio: { type: String, default: "" },
    audios: [{ type: mongoose.Types.ObjectId, ref: "Audio" }],
  },
  { timestamps: true, minimize: false },
);

const Reader = mongoose.model("Reader", readerSchema);
export default Reader;
