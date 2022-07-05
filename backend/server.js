const path = require('path')
const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8080;
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')


// connect database to server
connectDB();

app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: false }))





// Routes
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/tickets', require('./routes/ticketRoutes'))

// Serve the frontend
if (process.env.NODE_ENV === 'production') {
  // creating and setting build folder as static
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  app.get('*', (req, res) => res.sendFile(__dirname, '../', 'frontend', 'build', 'index.html'))
} else {
  app.get('/', (req, res) => {
    res.status(200).json({
      message: 'Welcome to the Cut Request API'
    })
  })
}

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server Started Successfully on port ${PORT}`))