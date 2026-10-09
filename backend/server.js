const express = require("express");
const cors = require("cors");

const subjectsRouter = require("./routes/subjects");
const academicRouter = require("./routes/academic");
const campusRouter = require("./routes/campus");
const postsRouter = require("./routes/posts");
const eventsRouter = require("./routes/events");

const app = express();

const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use("/api/subjects", subjectsRouter);
app.use("/api/academic", academicRouter);
app.use("/api/campus", campusRouter);
app.use("/api/posts", postsRouter);
app.use("/api/events", eventsRouter);

app.get("/", (req, res) => {
    res.json({
        message: "FreshmanOS backend is running!"
    });
});

app.listen(PORT, () => {
    console.log(`FreshmanOS server running at http://localhost:${PORT}`);
});