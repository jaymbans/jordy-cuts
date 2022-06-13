// This file shows the schema needed for a user creation

const mongoose = require('mongoose');

// MDB syntax uses an object w/type and the other associated fields
//ex:  name :{type: String}
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add your name']
  },
  email: {
    type: String,
    required: [true, 'Please add your email'],
    unqiue: true,
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false
  }
},
  {
    timestamps: true //adds timestamps to each field
  })

module.exports = mongoose.model('User', userSchema);