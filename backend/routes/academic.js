const express = require("express");
const router = express.Router();

const branches = require("../data/branches.json");
const courses = require("../data/course.json");

router.get("/:branch", (req, res) => {
    const branch = req.params.branch;

    const branchData = branches[branch];

    if (!branchData) {
        return res.status(404).json({
            message: "Branch not found"
        });
    }

    const group = branchData.group;
    const subjects = courses[group];

    res.json({
        branch: branchData.name,
        group: group,
        subjects: subjects
    });
});

module.exports = router;