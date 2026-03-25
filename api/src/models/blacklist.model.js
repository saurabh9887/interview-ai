import mongoose from "mongoose";

const blacklistTokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: [
        true,
        "The token is required in order to add it into the blacklist",
      ],
    },
  },
  { timestamps: true },
);

export const tokenBlackListModel = mongoose.model(
  "BlacklistToken",
  blacklistTokenSchema,
);
