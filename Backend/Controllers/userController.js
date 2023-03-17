const asyncHandler = require("express-async-Handler");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const User = require("../Model/userModel");

const registerUser = asyncHandler(async (req, res) => {

    const { username, email, password } = req.body;
  
    if (!username || !email || !password) {
      res.status(400).json({ message: "All fields are mandatory" });
      return;
    }
  
    const userAvailable = await User.findOne({ email });
  
    if (userAvailable) {
      res.status(400).json({ message: "User already registered" });
      return;
    }
  
    const hashPassword = await bcrypt.hash(password, 11);
  
    const user = await User.create({
      username,
      email,
      password: hashPassword,
    });
  
    if (user) {
      res.status(201).json({ _id: user.id, email: user.email });
    } else {
      res.status(400).json({ message: "User not valid" });
    }
  
  });
  

const loginUser = asyncHandler(async (req, res) => {


    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All feilds are mandatory");
    }

    const user = await User.findOne({ email });
    // COmpare passwrod with hash paasword

    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign(
            {
                user: {
                    username: user.username,
                    email: user.email,
                    id: user.id
                },
            },
            process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
        );
        res.status(200).json({ accessToken });
    }else{
        res.status(401);
        throw new Error("Credential are not valid")
    }

    // res.json({ message: "User login suceessfully" })
})

const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
})

module.exports = { registerUser, loginUser, currentUser };
