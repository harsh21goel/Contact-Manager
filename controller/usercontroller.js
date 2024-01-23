const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//@desc Register the user
//@route POST /api/users/register
//@access public
const registeruser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Please fill all the fields");
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("Email address already exists");
  }
  //hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  // console.log(hashedPassword)
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });
  // console.log(`user created ${user}`)
  if (user) {
    res.status(201).json({ _id: user._id, email: user.email });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }
});
//@desc Login the user
//@route POST /api/users/login
//@access public
const loginuser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error(" all the fields are mandatory");
  }
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user._id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      {expiresIn:"15m"}
    );
    res.status(200).json({ accessToken });
  }else{
    res.status(401)
    throw new Error("Email and password id not valid")
  }
  
});
//@desc Current user
//@route GET /api/users/currrent
//@access private
const currentuser = asyncHandler(async (req, res) => {
    res.json(req.user)
  res.json({ message: "Current User information" });
});
module.exports = {
  registeruser,
  loginuser,
  currentuser,
};
