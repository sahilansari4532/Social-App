const express = require("express");
const Post = require("../models/Post");

const router = express.Router();

// Create post
router.post("/", async (req, res) => {
    const post = new Post(req.body);
    await post.save();
    res.json(post);
});

// Get all posts
router.get("/", async (req, res) => {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
});

// Like post
router.put("/:id/like", async (req, res) => {
    const post = await Post.findById(req.params.id);

    if (!post.likes.includes(req.body.userId)) {
        post.likes.push(req.body.userId);
    } else {
        post.likes = post.likes.filter(id => id !== req.body.userId);
    }

    await post.save();
    res.json(post);
});

module.exports = router;