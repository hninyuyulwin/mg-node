const express = require("express");
const router = express.Router();

// router.get("list", (req, res, next) => {
//   return res.status(200).send({
//     data: [],
//   });
// });
const {
  getUserList,
  createUser,
  updateUser,
  deleteUser,
} = require("../controller/user.controller");
const { authentication } = require("../middleware/auth.middleware");

router.get("/list", authentication, getUserList);
router.post("/create", createUser);
router.put("/update", updateUser);
router.delete("/delete", deleteUser);

module.exports = router;
