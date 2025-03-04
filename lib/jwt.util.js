const jwtLib = require("jsonwebtoken");
const config = require("dotenv").config();

const generateJwtToken = async (payload) => {
  const { user_id, username } = payload;

  const token = jwtLib.sign(
    {
      user_id: user_id,
      username: username,
    },
    process.env.SECRET_KEY,
    {
      algorithm: "HS512",
    }
  );
  return token;
};

const verifyToken = async (token) => {
  return await jwtLib.verify(token, process.env.SECRET_KEY, {
    algorithms: "HS512",
  });
};

module.exports = { generateJwtToken, verifyToken };
