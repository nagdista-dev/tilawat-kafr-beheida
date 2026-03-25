import cloudinary from "../configs/cloudinary.js";
import User from "../modules/user.js";

// !UPDATE PROFILE PICTURE
export const updateProfilePicture = async (req, res) => {
  try {
    const id = req.user._id;
    const profileImage = req.file;
    console.log(profileImage);
    if (!profileImage) {
      return res.json({ message: "Please select an image to update profile" });
    }

    const response = await cloudinary.uploader.upload(profileImage.path, {
      folder: "profile_pics",
      quality: "auto:low",
      fetch_format: "auto",
    });

    await User.findByIdAndUpdate(
      id,
      { profilePic: response.secure_url },
      { returnDocument: "after" },
    );

    res.json({ message: "User updated successfully " });
  } catch (error) {
    console.log("Error from update profile");
    res.json({ message: error.message });
  }
};

// !TEST
export const test = async (req, res) => {
  try {
  } catch (error) {
    console.log("Error from >>>");
    res.json({ message: error.message });
  }
};
