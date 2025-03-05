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
const { adminMiddleware } = require("../middleware/admin.middleware");

router.get("/list", authentication, getUserList);
router.post("/create", authentication, adminMiddleware, createUser);
router.put("/update", updateUser);
router.delete("/delete", deleteUser);

module.exports = router;
