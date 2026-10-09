const express = require("express");
const router = express.Router();

const posts = require("../data/posts.json");

router.get("/", (req, res) => {
    res.json(posts);
});

router.post("/", (req, res) => {
    const { author, category, title, content } = req.body;

    if (!author || !title || !content) {
        return res.status(400).json({
            message: "Author, title and content are required"
        });
    }

    const newPost = {
        id: posts.length + 1,
        author,
        category: category || "General",
        title,
        content
    };

    posts.push(newPost);

    res.status(201).json(newPost);
});

module.exports = router;