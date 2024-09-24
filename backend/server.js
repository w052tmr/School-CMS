process.on("uncaughtException", (err) => {
    console.log("Uncaught Exception Error");
    console.log(err.stack);
    console.log("Shutting down...");
    process.exit(1);
});

require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");

mongoose
    .connect(
        process.env.DB_CONNECTION.replace("<password>", process.env.DB_PASSWORD)
    )
    .then(() => {
        console.log("Database Connection Successful!");
    })
    .catch((err) => {
        console.log(err);
    });

const port = 3001 || 3002;
server = app.listen(port, () => {
    console.log(`Server running on port ${port}...`);
});

process.on("unhandledRejection", (err) => {
    console.log("Unhandled Rejection Error");
    console.log(err.name, err.message);
    console.log("Closing server...");
    server.close(() => {
        console.log(`Server closed on port ${port}.`);
        process.exit(1);
    });
});

process.on("SIGTERM", () => {
    console.log("SIGTERM Received: Shutting down server gracefully...");
    server.close(() => {
        console.log("Process terminted.");
    });
});
