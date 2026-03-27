import mongoose from "mongoose";
const audioSchema = new mongoose.Schema(
  {
    readerName: { type: String, required: true },
    audioName: { type: String, required: true },
    url: { type: String, required: true },
    description: { type: String, required: true },
    cloudinaryPublicID: { type: String, required: true },
  },
  { timestamps: true },
);

const Audio = mongoose.model("Audio", audioSchema);
export default Audio;
