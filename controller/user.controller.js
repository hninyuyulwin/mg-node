const userModel = require("../db/models/User.schema");
const crypto = require("crypto");
const { makeHash } = require("../lib/hash.util");

const getUserList = async (req, res, next) => {
  try {
    console.log(req.body.user_id);
    const users = await userModel.find();
    return res.send({
      data: users,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Something wrong!",
    });
  }
};

const createUser = async (req, res, next) => {
  try {
    const { profile_image, username, password } = req.body;
    const hashPassword = await makeHash(password);
    const user_id = crypto.randomUUID();
    const createUser = await userModel.create({
      user_id,
      profile_image,
      username,
      password: hashPassword,
    });
    if (createUser) {
      return res.send({
        msg: "success",
        data: createUser,
      });
    }
  } catch (error) {
    return res.status(500).send({
      message: "Something wrong!",
    });
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { user_id, profile_image, username } = req.body;
    const updatePayload = {
      profile_image,
      username,
    };
    const updateUser = await userModel.findOneAndUpdate(
      { user_id: user_id },
      updatePayload
    );
    if (updateUser) {
      return res.send({
        msg: "Updated Success",
        data: updateUser,
      });
    }
  } catch (error) {
    return res.status(500).send({
      message: "Something wrong!",
    });
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { user_id } = req.body;
    const deletedUser = await userModel.deleteOne({ user_id });
    if (deletedUser) {
      return res.send({
        msg: "Data Deleted Success",
      });
    }
  } catch (error) {
    return res.status(500).send({
      message: "Something wrong!",
    });
  }
};
module.exports = {
  getUserList,
  createUser,
  updateUser,
  deleteUser,
};
