import Reader from "../models/reader.js";

// !UPLOAD NEW AUDIO
export const addNewReader = async (req, res) => {
  try {
    const { name: readerName } = req.body;
    const newReader = await Reader.create({ name: readerName });
    res.json({ message: "Reader Added Successfully" });
  } catch (error) {
    console.log("Error from add new reader");
    res.json({ message: error.message });
  }
};
// !UPLOAD NEW AUDIO
export const uploadNewAudio = async (req, res) => {
  try {
  } catch (error) {
    console.log("Error from >>>");
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
