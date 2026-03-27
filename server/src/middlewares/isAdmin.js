const isAdmin = (req, res, next) => {
  try {
    const isAdmin = req.user.role === "admin";
    if (!isAdmin) {
      return res.json({ message: "You must be an admin" });
    }
    next();
  } catch (error) {
    console.log("Error from is admin");
    re.json({ message: error.message });
  }
};

export default isAdmin ; 