const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getMe } = require('../controllers/userController')

const { protect } = require('../middleware/authMiddleware'); //when addded as a second argument to the route, it will verify w our protect function

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe)

module.exports = router;