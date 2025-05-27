const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    media: [String],
    content: String,
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        text: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Post',postSchema);
