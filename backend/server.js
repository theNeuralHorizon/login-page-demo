/* global process, require, module */
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const authRouter = require('./auth');

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: 'http://localhost:3000', // Your React app's origin
  credentials: true,
}));

app.use(bodyParser.json());
app.use(cookieParser());

app.use('/auth', authRouter);

const verifyJwt = require('./verifyJwt'); // Keep this line
const verifyIdTokenCookie = require('./verifyIdTokenCookie');

// Example of a protected route (you might not need this if all protection is on the frontend)
app.get('/api/protected', verifyJwt, (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
});

app.get('/api/profile', verifyJwt, (req, res) => {
  // This endpoint can now fetch more detailed data from the DB if needed
  // The basic user info is available at /api/user
  res.json({ message: 'This is a protected profile route', user: req.user, more_data: 'some_db_info' });
});

app.get('/api/user', verifyIdTokenCookie, (req, res) => {
  // req.user is populated by verifyIdTokenCookie middleware with ID token payload
  res.json(req.user);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
