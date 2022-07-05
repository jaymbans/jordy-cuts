// This file shows the schema needed for a user creation

const mongoose = require('mongoose');

// MDB syntax uses an object w/type and the other associated fields
//ex:  name :{type: String}
const ticketSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  product: {
    type: String,
    required: [true, 'Please select a product'],
    enum: ['Buzzcut', 'Fade - Sides Only', 'Fade - Complete', 'Facial Hair']
  },
  description: {
    type: String,
    required: [true, 'Please enter a description of what you want'],
  },
  status: {
    type: String,
    required: true,
    enum: ['requested', 'under review', 'accepted', 'rejected', 'closed'],
    default: 'requested'
  }
},
  {
    timestamps: true //adds timestamps to each field
  })

module.exports = mongoose.model('Ticket', ticketSchema);