const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
        username,
        email,
        password: hashedPassword
    });

    await user.save();
    res.json({ message: "User registered" });
});

// Follow user
router.put("/follow/:id", async (req, res) => {
    try {
        const userToFollow = await User.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId);

        if (!userToFollow.followers.includes(req.body.userId)) {

            userToFollow.followers.push(req.body.userId);
            currentUser.following.push(req.params.id);

            await userToFollow.save();
            await currentUser.save();

            res.json("Followed");

        } else {

            userToFollow.followers =
                userToFollow.followers.filter(id => id !== req.body.userId);

            currentUser.following =
                currentUser.following.filter(id => id !== req.params.id);

            await userToFollow.save();
            await currentUser.save();

            res.json("Unfollowed");
        }

    } catch (err) {
        console.log(err);
        res.status(500).json("Error in follow");
    }
});

// Login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(400).json("User not found");

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(400).json("Wrong password");

    const token = jwt.sign({ id: user._id }, "secretkey");

    res.json({ token });
});

router.get("/users", async (req, res) => {
    const users = await User.find();
    res.json(users);
});

module.exports = router;