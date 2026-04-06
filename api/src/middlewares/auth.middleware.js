import jwt from "jsonwebtoken";
import { tokenBlackListModel } from "../models/blacklist.model.js";

export const authUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Check if header exists and is properly formatted
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Authorization token missing or malformed" });
    }

    const token = authHeader.split(" ")[1];

    // Check blacklist
    const isTokenBlackListed = await tokenBlackListModel.findOne({ token });
    if (isTokenBlackListed) {
      return res.status(401).json({ message: "Token is not valid" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
