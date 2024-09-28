const router = require("express").Router();

const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const response = require("../utils/ResponseHandlers");

// fetch user by id
router.get("/userId/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById({ _id: userId });
      response(res, 200, "User fetched!!!", user);
      } catch (err) {
      response(res, 500, err.message, null);
      }
}
);


module.exports = router;