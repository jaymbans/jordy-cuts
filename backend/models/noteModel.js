// This file shows the schema needed for a user creation

const mongoose = require('mongoose');

// MDB syntax uses an object w/type and the other associated fields
//ex:  name :{type: String}
const noteSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  ticket: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Ticket',
  },
  text: {
    type: String,
    required: [true, 'Please add a note'],
  },
  isStaff: {
    type: Boolean,
    default: false,
  },
  staffId: {
    type: String
  },
},
  {
    timestamps: true //adds timestamps to each field
  })

module.exports = mongoose.model('Note', noteSchema);