import mongoose, { Schema } from "mongoose";

const schema = new Schema(
  {
    username: {
      type: String,
      require: [true, "User must have a username"],
      unique: true,
    },
    password: {
      type: String,
      require: [true, "User must have a password"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User || mongoose.model("User", schema);
