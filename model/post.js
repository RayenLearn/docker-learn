import mongoose from "mongoose";

const Schema = new mongoose.Schema(
  {
    title: {
      type: String,
      requires: [true, "Post must have title"],
    },
    body: {
      type: String,
      required: [true, "Post must have body"],
    },
  },
  { timestamps: true }
);

export default mongoose.models.Post || mongoose.model("Post", Schema);
