const { verifyToken } = require("../lib/jwt.util");

const authentication = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const authToken = authHeader?.split(" ")[1];
  if (!authToken) {
    return res.status(401).send({
      message: "Login not defined",
    });
  }
  try {
    const { user_id, username } = await verifyToken(authToken);
    req.body = { ...req.body, user_id: user_id, username: username };
    next();
  } catch (error) {
    return res.status(401).send({
      message: "Error found!",
    });
  }
};
module.exports = { authentication };
