const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs'); //password encryption module
const jwt = require('jsonwebtoken')

const User = require('../models/userModel');
const e = require('express');

//  registers a user
//  route: /api/users
//  access: Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  // user validation
  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Please populate all fields')
  }

  // Check if user already exists
  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create the User
  const user = await User.create({
    name,
    email,
    password: hashedPassword
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }


  res.send('Register Route')
})



//  login a user
//  route: /api/users/login
//  access: Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  // checks if the user exists and that the password matches the unencrypted password
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id) //generates a token that needs to be put in in order to view
    })
  } else {
    res.status(401);
    throw new Error('Username or Password credentials not valid')
  }
})

// Generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d' //token expiration date of 30 days
  })
}

module.exports = {
  registerUser,
  loginUser
}