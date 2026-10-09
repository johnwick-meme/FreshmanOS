const express = require("express");
const router = express.Router();

const subjects = require("../data/subjects.json");

// Get all subjects
router.get("/", (req, res) => {
    res.json(subjects);
});

// Get one subject
router.get("/:id", (req, res) => {
    const subject = subjects.find(
        (item) => item.id === req.params.id
    );

    if (!subject) {
        return res.status(404).json({
            message: "Subject not found"
        });
    }

    res.json(subject);
});

module.exports = router;