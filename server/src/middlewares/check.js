import User from "../models/user.js";
import jwt from "jsonwebtoken";
const check = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id } = decoded;
    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.json({ message: "Authentication Error" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("error from check");
    res.json({ message: error.message });
  }
};

export default check;
