const express = require("express");
const Post = require("../models/Post");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("multer");
const cloudinary = require("../config/cloudinary");
require("dotenv").config;
const storage = multer.memoryStorage();
const upload = multer({ storage });

//create a post
router.post("/create-post", upload.array("media"), auth, async (req, res) => {
  try {
    const mediaUrls = await Promise.all(
      req.files.map(async (file) => {
        return new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              resource_type: "auto",
            },
            (error, result) => {
              if (error) return reject(error);
              resolve(result.secure_url);
            }
          );
          uploadStream.end(file.buffer);
        });
      })
    );
    const post = new Post({
      author: req.user.id,
      media: mediaUrls,
      content: req.body.content,
    });
    await post.save();
    res.status(201).json({ msg: "Posted successfully!" });
  } catch (error) {
    res.status(404).json({ msg: error });
  }
});

// like a post
router.post("/:id/like", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.user.id)) {
      post.likes.push(req.user.id);
    }
    await post.save();
    res.status(201).json({ msg: "Liked a post" });
  } catch (error) {
    res.status(404).json({ msg: error });
  }
});


// comment a post
router.post("/:id/comment", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    post.comments.push({user : req.user.id,text :req.body.text});
    await post.save();
    res.status(201).json({ msg: "Comment saved successfully!" });
  } catch (error) {
    res.status(404).json({ msg: error });
  }
});


module.exports = router;
