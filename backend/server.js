const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')


// connect database to server
connectDB();

app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to the Support Desk API'
  })
})


// Routes
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/tickets', require('./routes/ticketRoutes'))

app.use(errorHandler);

app.listen(PORT, () => console.log(`This is a test to see if the server has started on port ${PORT}`))