const bcrypt = require("bcrypt");

const makeHash = async (string) => {
  const salt = await bcrypt.genSalt(1);
  const hash = await bcrypt.hash(string, salt);
  return hash;
};

module.exports = { makeHash };
