const userModel = require("../db/models/User.schema");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const env = require("dotenv").config();
const { generateJwtToken } = require("../lib/jwt.util");
const { makeHash } = require("../lib/hash.util");

const register = async (req, res, next) => {
  try {
    const { profile_image, username, password } = req.body;
    const hashPassword = await makeHash(password);
    // const hashPassword = crypto
    //   .createHmac("md5", process.env.SECRET_KEY)
    //   .update(password);
    const user_id = crypto.randomUUID();
    const createUser = await userModel.create({
      user_id,
      profile_image,
      username,
      password: hashPassword,
    });
    if (createUser) {
      const token = await generateJwtToken(createUser);
      return res.send({
        msg: "success",
        token: token,
      });
    }
  } catch (error) {
    return res.status(500).send({
      message: "Something wrong!",
    });
  }
};

const login = async (req, res, next) => {
  try {
  } catch (error) {}
};

module.exports = {
  register,
  login,
};
