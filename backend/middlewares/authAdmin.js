import jwt from "jsonwebtoken";

// admin authentication middleware
const authAdmin = async (req, res, next) => {
  try {
    const { atoken } = req.headers;
    if (!atoken) {
      return res
        .status(404)
        .json({ success: false, meessage: "Not Authorized" });
    }

    const token_decode = jwt.verify(atoken, process.env.JWT_SECRET);

    if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res
        .status(404)
        .json({ success: false, meessage: "Not Authorized" });
    }
    next();
  } catch (error) {
    console.error("ERROR IN addDoctor:", error); // Use console.error for better logging
    return res
      .status(500)
      .json({
        success: false,
        message: "Server error occurred.",
        error: error.message,
      });
  }
};

export default authAdmin