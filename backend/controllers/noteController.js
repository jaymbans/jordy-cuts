const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');
const Note = require('../models/noteModel');
const Ticket = require('../models/ticketModel');
const { restart } = require('nodemon');

// @desc    Get notes for a cut
// @route   GET req: /api/tickets/:ticketId/notes
// @access  Private
const getNotes = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401);
    throw new Error('User not Found!')
  }

  const ticket = await Ticket.findById(req.params.ticketId)

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized to view content')
  }

  const notes = await Note.find({ ticket: req.params.ticketId })

  res.status(200).json(notes)
})

// @desc    create note
// @route   POST req: /api/tickets/:ticketId/notes
// @access  Private
const createNote = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401);
    throw new Error('User not Found!')
  }

  const ticket = await Ticket.findById(req.params.ticketId)

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized to view content')
  }

  const note = await Note.create({
    ticket: req.params.ticketId,
    isStaff: false,
    text: req.body.text,
    user: req.user.id
  })

  res.status(200).json(note)
})

module.exports = {
  getNotes,
  createNote
}