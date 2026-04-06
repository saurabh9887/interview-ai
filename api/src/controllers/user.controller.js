import { userModel } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { tokenBlackListModel } from "../models/blacklist.model.js";
import { sendEmail } from "../EmailService/emailService.js";
import crypto from "crypto";

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password)
    return res.status(400).json({ message: "All fields are required" });

  const isUserAlreadyExists = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserAlreadyExists) {
    if (!isUserAlreadyExists.isVerified) {
      const verificationToken = crypto.randomBytes(32).toString("hex");

      isUserAlreadyExists.verificationToken = verificationToken;
      isUserAlreadyExists.verificationTokenExpiry = Date.now() + 1000 * 60 * 60; // 1 hour

      await isUserAlreadyExists.save();

      const verificationLink = `${process.env.BASE_URL}/api/auth/verify-email/${verificationToken}`;

      await sendEmail({
        to: isUserAlreadyExists.email,
        subject: "Verify your email",
        html: `Click here to verify: ${verificationLink}`,
      });

      return res.status(200).json({
        message:
          "Email already registered but not verified. New verification link sent.",
      });
    }

    return res.status(400).json({
      message: "Account already exists. Please login.",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const verificationToken = crypto.randomBytes(32).toString("hex");

  const newUser = await userModel.create({
    username,
    email,
    password: hashedPassword,
    verificationToken,
    verificationTokenExpiry: Date.now() + 1000 * 60 * 60,
  });

  const verificationLink = `${process.env.BASE_URL}/api/auth/verify-email/${verificationToken}`;

  await sendEmail({
    to: email,
    subject: "Verify your email",
    html: `
  <div style="font-family: Arial, sans-serif; background-color: #f4f7fb; padding: 40px 0;">
    <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
      
      <!-- Header -->
      <div style="background: #4f46e5; padding: 20px; text-align: center; color: white;">
        <h1 style="margin: 0;">PrepAI</h1>
        <p style="margin: 5px 0 0; font-size: 14px;">Smarter Interview Preparation</p>
      </div>

      <!-- Body -->
      <div style="padding: 30px; color: #333;">
        <h2 style="margin-top: 0;">Verify your email</h2>
        <p style="font-size: 15px; line-height: 1.6;">
          Thanks for signing up with <strong>PrepAI</strong>. Please confirm your email address to get started.
        </p>

        <!-- Button -->
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verificationLink}" 
             style="background: #4f46e5; color: #ffffff; padding: 12px 25px; text-decoration: none; border-radius: 6px; font-size: 16px; display: inline-block;">
            Verify Email
          </a>
        </div>

        <p style="font-size: 13px; color: #666;">
          This link will expire in 1 hour. If you did not create an account, you can safely ignore this email.
        </p>
      </div>

      <!-- Footer -->
      <div style="background: #f4f7fb; padding: 15px; text-align: center; font-size: 12px; color: #888;">
        © ${new Date().getFullYear()} PrepAI. All rights reserved.
      </div>

    </div>
  </div>
`,
  });

  return res.status(201).json({
    message: "Verification email sent. Please verify before login.",
  });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "All fields are required" });

  const user = await userModel.findOne({ email });
  // console.log(user);

  if (!user.isVerified) {
    console.log(user.isVerified);
    return res.status(400).json({
      message: "Please verify your email before you proceed",
    });
  }
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

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    path: "/",
  });

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

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(200).json({
      message: "No account exists for shared email",
    });
  }

  const resetToken = crypto.randomBytes(32).toString("hex");

  user.resetPasswordToken = resetToken;
  user.resetPasswordExpiry = Date.now() + 1000 * 60 * 15;

  await user.save();

  const resetLink = `${process.env.FRONT_URL}/reset-password/${resetToken}`;

  await sendEmail({
    to: user.email,
    subject: "Reset your password",
    html: `
  <div style="font-family: Arial, sans-serif; background-color: #fff7ed; padding: 40px 0;">
    <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
      
      <!-- Header -->
      <div style="background: #ea580c; padding: 20px; text-align: center; color: white;">
        <h1 style="margin: 0;">PrepAI</h1>
        <p style="margin: 5px 0 0; font-size: 14px;">Password Reset Request</p>
      </div>

      <!-- Body -->
      <div style="padding: 30px; color: #333;">
        <h2 style="margin-top: 0;">Reset your password</h2>

        <p style="font-size: 15px; line-height: 1.6;">
          We received a request to reset your password. Click the button below to set a new password.
        </p>

        <!-- Button -->
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetLink}" 
             style="background: #ea580c; color: #ffffff; padding: 12px 25px; text-decoration: none; border-radius: 6px; font-size: 16px; display: inline-block;">
            Reset Password
          </a>
        </div>

        <p style="font-size: 13px; color: #666;">
          This link will expire in 15 minutes for security reasons.
        </p>

        <p style="font-size: 13px; color: #666;">
          If you did not request a password reset, you can safely ignore this email. Your account remains secure.
        </p>
      </div>

      <!-- Footer -->
      <div style="background: #fff7ed; padding: 15px; text-align: center; font-size: 12px; color: #888;">
        © ${new Date().getFullYear()} PrepAI. All rights reserved.
      </div>

    </div>
  </div>
`,
  });
  res.status(200).json({
    message:
      "Password reset link is shared over the email, please click it and reset your password",
  });
};

export const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({
        message: "Token and password are required",
      });
    }

    const user = await userModel.findOne({
      resetPasswordToken: token,
      resetPasswordExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired token",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpiry = undefined;

    await user.save();

    return res.status(200).json({
      message: "Password reset successful. You can now login.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};
