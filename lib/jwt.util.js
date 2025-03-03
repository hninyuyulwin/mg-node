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

module.exports = { generateJwtToken };
