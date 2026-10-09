const express = require("express");
const router = express.Router();

const campus = require("../data/campus.json");

router.get("/", (req, res) => {
    res.json(campus);
});

router.get("/:id", (req, res) => {
    const location = campus.find(
        (item) => item.id === req.params.id
    );

    if (!location) {
        return res.status(404).json({
            message: "Campus location not found"
        });
    }

    res.json(location);
});

module.exports = router;