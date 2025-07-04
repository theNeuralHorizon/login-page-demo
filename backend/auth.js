require('dotenv').config();
const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/token', async (req, res) => {
  console.log("Received /auth/token request with body:", req.body);
  console.log("COGNITO_CLIENT_ID:", process.env.COGNITO_CLIENT_ID);
  console.log("COGNITO_REDIRECT_URI:", process.env.COGNITO_REDIRECT_URI);
  console.log("COGNITO_DOMAIN:", process.env.COGNITO_DOMAIN);
  const { code } = req.body;
  const params = new URLSearchParams();
  params.append('grant_type', 'authorization_code');
  params.append('client_id', process.env.COGNITO_CLIENT_ID);
  params.append('redirect_uri', process.env.COGNITO_REDIRECT_URI);
  params.append('code', code);

  try {
    const response = await axios.post(
      `${process.env.COGNITO_DOMAIN}/oauth2/token`,
      params,
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );
    console.log("Cognito token exchange success:", response.data);
    res.json(response.data);
  } catch (err) {
    console.error("Cognito token exchange error:", err.response?.data || err.message);
    if (err.response) {
      console.error("Full error response:", err.response.data, err.response.status, err.response.headers);
    }
    res.status(400).json({ error: 'Token exchange failed', details: err.response?.data || err.message });
  }
});

module.exports = router;
