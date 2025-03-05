const userModel = require("../db/models/User.schema");
const adminMiddleware = async (req, res, next) => {
  try {
    const { user_id } = req.body;
    const user = await userModel.findOne({
      user_id: user_id,
    });
    if (user.is_admin) {
      return next();
    }
    return res.status(401).send({
      message: "Access Denied!",
    });
  } catch (error) {
    return res.send({
      message: "User create not success!",
    });
  }
};
module.exports = { adminMiddleware };
