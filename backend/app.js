const express = require("express");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const cors = require("cors");

const courseRoutes = require("./routes/courseRoutes");
const assignmentRoutes = require("./routes/assignmentRoutes");
const userRoutes = require("./routes/userRoutes");
const studentRoutes = require("./routes/studentRoutes");
const teacherRoutes = require("./routes/teacherRoutes");

const AppError = require("./utils/AppError");
const globalErrorController = require("./controllers/globalErrorController");

const app = express();

app.use(express.json({ limit: "100kb" }));
app.use(cookieParser());

app.use(
    cors({
        credentials: true,
        allowedHeaders: [
            "Content-Type",
            "Authorization",
            "Access-Control-Allow-Origin",
        ],
        origin: [
            "http://localhost:5173",
            "https://school-cms-client.vercel.app",
        ],
    })
);

app.use(helmet());

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/students", studentRoutes);
app.use("/api/v1/teachers", teacherRoutes);
app.use("/api/v1/courses", courseRoutes);
app.use("/api/v1/assignments", assignmentRoutes);

app.all("*", (req, res, next) => {
    return next(
        new AppError(
            404,
            `Invalid Route: ${req.protocol}://${req.get("host")}${
                req.path
            } could not be found on this server.`
        )
    );
});

app.use(globalErrorController);

module.exports = app;
