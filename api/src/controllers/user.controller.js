import { userModel } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { tokenBlackListModel } from "../models/blacklist.model.js";

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  if ((!username, !email, !password))
    return res.status(400).json({ message: "All fields are required" });

  const isUserAlreadyExists = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserAlreadyExists)
    return res
      .status(400)
      .json({ message: "Account already exists with this email or username" });

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await userModel.create({
    username,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign(
    { id: newUser._id, username: newUser.username },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "User Registered Successfully",
    username: newUser._id,
    email: newUser.email,
  });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "All fields are required" });

  const user = await userModel.findOne({ email });
  if (!user)
    return res.status(400).json({
      message: "User with the provided email address does not exists",
    });

  const isCorrectPassword = await bcrypt.compare(password, user.password);

  if (!isCorrectPassword)
    return res.status(400).json({ message: "Password is incorrect" });

  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("token", token);

  return res.status(200).json({
    message: "User logged in successfully!",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
};

export const logoutUser = async (req, res) => {
  const token = req.cookies.token;

  if (token) {
    await tokenBlackListModel.create({ token });
  }

  res.clearCookie("token");
  return res.status(200).json({ message: "User logged out successfully" });
};

export const getMeController = async (req, res) => {
  const user = await userModel.findById(req.user.id);
  return res.status(200).json({
    message: "User details fetched successfully",
    user: {
      id: user._id,
      email: user.email,
      username: user.username,
    },
  });
};
