// import express from "express";
// const router = express.Router();

// router.get("/", (req, res) => {
//   res.send("Post route working");
// });

// export default router;

import express from "express";
import Post from "../models/Post.js";
import Comment from "../models/Comment.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();


// ✅ CREATE POST
router.post("/", auth, async (req, res) => {
  try {
    const post = await Post.create({
      userId: req.userId,
      content: req.body.content,
    });
    res.json(post);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});


// ✅ GET ALL POSTS (FEED)
router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("userId", "name")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});


// ✅ LIKE / UNLIKE
router.put("/like/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post.likes.includes(req.userId)) {
      post.likes.push(req.userId);
    } else {
      post.likes = post.likes.filter(id => id.toString() !== req.userId);
    }

    await post.save();
    res.json(post);

  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});


// ✅ ADD COMMENT
router.post("/comment/:id", auth, async (req, res) => {
  try {
    const comment = await Comment.create({
      postId: req.params.id,
      userId: req.userId,
      text: req.body.text,
    });

    res.json(comment);

  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});


// ✅ GET COMMENTS OF POST
router.get("/comment/:id", auth, async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.id })
      .populate("userId", "name");

    res.json(comments);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

export default router;
