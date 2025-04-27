const express = require("express");

const signupController = require("../controllers/userController");
const { authenticateToken } = require("../middlewares/jwt-helper")

const router = express.Router();

router.post("/register", signupController.createUser);
router.post("/login", signupController.loginUser);
router.get("/tasks", authenticateToken, (req, res) => {
    res.json({message: "Authenticated!", user:req.user});
});

module.exports = router;