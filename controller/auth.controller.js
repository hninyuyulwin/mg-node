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
    const { username, password } = req.body;
    const hashPassword = await makeHash(password);
    const user = await userModel.findOne({
      username: username,
    });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = await generateJwtToken(user);
      return res.send({
        msg: "login success",
        token: token,
      });
    } else {
      return res.send({
        message: "Something went wrong!",
      });
    }
  } catch (error) {
    // console.log(error);
    return res.status(500).send({
      message: "Something wrong in login process!",
    });
  }
};

module.exports = {
  register,
  login,
};
