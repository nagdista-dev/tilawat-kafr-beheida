import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email"],
    },
    password: { type: String, required: true, minLength: 6 },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    profilePic: { type: String, default: "" },
  },
  { timestamps: true },
);

const User = await mongoose.model("User", userSchema);
export default User;
