const mongoose = require("../configurations/dbConfig");
const bcrypt = require("bcrypt"); //Convert password to Hash

const userSchema = new mongoose.Schema({
    email: { type: String, required: true},  
    password: { type: String, required: true},
});

module.exports = mongoose.model("User", userSchema); //exporting the UserSchema