require("dotenv").config({ path: `${__dirname}/../.env` });
const mongoose = require("mongoose");
const app = require("../app");
const fs = require("fs");
const { User } = require("../models/userModel");

const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, "utf-8"));

const db = process.env.DB_CONNECTION.replace(
    "<password>",
    process.env.DB_PASSWORD
);

mongoose
    .connect(db)
    .then(() => {
        console.log("Database Connection Successful!");
    })
    .catch((err) => {
        console.log(err);
    });

const port = 3000 || 3001;
server = app.listen(port, () => {
    console.log(`Server running on port ${port}...`);
});

const importDevData = async () => {
    return await Promise.all([User.create(users)]);
};

const deleteDevData = async () => {
    return await User.deleteMany({});
};

if (process.argv[2] === "--import") {
    importDevData().then(() => process.exit(0));
} else if (process.argv[2] === "--delete") {
    deleteDevData().then(() => process.exit(0));
}
