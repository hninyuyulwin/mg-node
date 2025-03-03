const { initDB } = require("../db");
const { mongoose } = initDB;
// const { Schema } = require("mongoose");

// const { connection, Schema } = initDB;
// const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  user_id: { type: String },
  profile_image: { type: String, default: null },
  username: { type: String, default: null },
  password: { type: String, default: null },
});

module.exports = mongoose.model("User", userSchema);
