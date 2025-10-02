import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  try {
    const utoken = req.headers['utoken'];

    if (!utoken) {
      return res.status(401).json({ success: false, message: "Not Authorized, token not provided." });
    }

    const token_decode = jwt.verify(utoken, process.env.JWT_SECRET);

    // ✅ THE FIX: Ensure req.body is an object before using it.
    if (!req.body) {
      req.body = {};
    }

    req.body.userId = token_decode.id;
    next();
  } catch (error) {
    console.error("ERROR in authUser middleware:", error.message);
    return res.status(500).json({
        success: false,
        message: "Server error in authUser middleware.",
        error: error.message,
      });
  }
};

export default authUser;