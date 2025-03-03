const express = require("express");
// const initDB = require("./db/db");
// const env = require("dotenv").config();
const app = express();
const port = 3000;
// const userModel = require("./db/models/User.schema");
const bodyParser = require("body-parser");
const userRouter = require("./router/user.router");
const authRouter = require("./router/auth.router");

app.use(bodyParser.json());
app.use("/users", userRouter);
app.use("/auth", authRouter);
app.listen(port, () => {
  // userModel.create({
  //   profile_image: "testing",
  //   username: "testing",
  //   password: "123123",
  // });
  console.log(`Example app listening on port ${port}`);
});
