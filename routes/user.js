const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const auth = require("../middleware/auth");

//register
router.post("/register", async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const existingUser = await User.findOne({ username, email });
    if (existingUser) {
      res.status(404).json("Username already exists");
    }
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashed, email });
    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });
    res.status(200).json({ token: token });
  } catch (error) {
    res.status(404).json("Unable to Register User!!!");
  }
});

// login
router.post("/login", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user =
      (await User.findOne({ username })) || (await User.findOne({ email }));
    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(404).json("Invalid Credentials");
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });
    res.status(200).json({ token: token });
  } catch (error) {
    res.status(404).json("Unable to Login User!!!");
  }
});

// give a friend request
router.post("/:id/friend-request", auth, async (req, res) => {
  try {
    const targetUser = await User.findById(req.params.id);
    if (!targetUser) {
      res.status(404).json({ msg: "Selected User not found" });
    }
    if (!targetUser.friendRequests.includes(req.user.id)) {
      targetUser.friendRequests.push(req.user.id);
      await targetUser.save();
    }
    res.status(201).json({ msg: "Friend Request Sent!!!" });
  } catch (error) {
    res.status(404).json({ msg: "Unable to give a Friend Request!!!" });
  }
});

// accept friend request
router.post("/:id/accept-request", auth, async (req, res) => {
  try {
    const requester = await User.findById(req.params.id);
    const user = await User.findById(req.user.id);
    if (user.friendRequests.includes(requester._id)) {
      user.friendRequests = user.friendRequests.filter(
        (id) => id.toString() !== requester._id.toString()
      );
      user.friends.push(requester._id);
      await user.save();
      requester.friends.push(user._id);
      await requester.save();
    }
    res.status(201).json({ msg: "Friend Request accepted!!!" });
  } catch (error) {
    res.status(404).json({ msg: "Unable to accept Friend Request!!!" });
  }
});

// follow
router.post("/:id/follow", auth, async (req, res) => {
  try {
    const targetUser = await User.findById(req.params.id);
    const user = await User.findById(req.user.id);
    if (!targetUser) {
      res.status(404).json({ msg: "Selected User not found" });
    }
    if (!targetUser.followers.includes(req.user.id)) {
      targetUser.followers.push(req.user.id);
      await targetUser.save();
      user.following.push(targetUser._id);
      await user.save();
    }
    res.status(201).json({ msg: "followed" });
  } catch (error) {
    res.status(404).json({ msg: "Unable to follow selected user" });
  }
});

// unfollow
router.post("/:id/unfollow", auth, async (req, res) => {
  try {
    const targetUser = await User.findById(req.params.id);
    const user = await User.findById(req.user.id);
    if (user.following.includes(targetUser._id)) {
      user.following = user.following.filter(
        (id) => id.toString() !== targetUser._id.toString()
      );
      await user.save();
      targetUser.followers = targetUser.followers.filter(
        (id) => id.toString() !== user._id.toString()
      );
      await targetUser.save();
    }
    res.status(201).json({ msg: "unfollowed" });
  } catch (error) {
    res.status(404).json({ msg: "Unable to unfollow selected user" });
  }
});

// to change profile visiblity
router.put("/change-visiblity", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.visiblity === "public") {
      user.visiblity = "private";
      await user.save();
      return res
        .status(201)
        .json({ msg: "Profile Visiblity was changed to Private!" });
    }
    if (user.visiblity === "private") {
      user.visiblity = "public";
      await user.save();
      return res
        .status(201)
        .json({ msg: "Profile Visiblity was changed to Public!" });
    }
  } catch (error) {
    res.status(403).json({ msg: error });
  }
});

module.exports = router;