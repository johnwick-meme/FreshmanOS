const express = require("express");
const router = express.Router();

const events = require("../data/events.json");

// GET /api/events
router.get("/", (req, res) => {
    res.json(events);
});

// GET /api/events/1
router.get("/:id", (req, res) => {
    const event = events.find(e => String(e.id) === req.params.id);

    if (!event) {
        return res.status(404).json({ message: "Event not found" });
    }

    res.json(event);
});

module.exports = router;
