/* global process, require, module */
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const authRouter = require('./auth');
const verifyJwt = require('./verifyJwt');

const app = express();
app.use(bodyParser.json());

app.use('/auth', authRouter);

app.get('/api/profile', verifyJwt, (req, res) => {
  res.json({ message: 'This is a protected profile route', user: req.user });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
