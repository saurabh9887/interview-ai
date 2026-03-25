import jwt from "jsonwebtoken";
import { tokenBlackListModel } from "../models/blacklist.model.js";

export const authUser = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) return res.status(400).json({ messaage: "Token not provided." });

  const isTokenBlackListed = await tokenBlackListModel.findOne({ token });
  if (isTokenBlackListed)
    return res.status(401).json({ message: "Token is not valid" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Invalid token provided" });
  }
};
