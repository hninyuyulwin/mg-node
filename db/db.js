const config = require("dotenv").config();
const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const initDB = () => {
  mongoose.connect(process.env.MONGO_DB_URL);
  // console.log(connection ? true : false);
  return { mongoose, Schema };
};
module.exports = {
  initDB: initDB(),
};
