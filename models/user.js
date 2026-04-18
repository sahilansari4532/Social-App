const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    followers: [],
    following: []
});

module.exports = mongoose.model("User", userSchema);

