import { userModel } from "../models/user.model.js";

export const verifyEmail = async (req, res) => {
  const { token } = req.params;

  const user = await userModel.findOne({
    verificationToken: token,
    verificationTokenExpiry: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).json({ message: "Invalid or expired token" });
  }

  user.isVerified = true;
  user.verificationToken = undefined;
  user.verificationTokenExpiry = undefined;

  await user.save();

  return res.redirect(`${process.env.FRONT_URL}/login`);
};
