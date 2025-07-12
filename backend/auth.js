require('dotenv').config();
const express = require('express');
const axios = require('axios');
const upsertCognitoUser = require('./upsertCognitoUser');
const { CognitoJwtVerifier } = require("aws-jwt-verify");
const router = express.Router();

// Use environment variable for MCP connection string
const MCP_CONNECTION_STRING = process.env.MCP_CONNECTION_STRING;

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

  // Add debug logging for all parameters
  console.log('Sending to Cognito:', {
    grant_type: 'authorization_code',
    client_id: process.env.COGNITO_CLIENT_ID,
    redirect_uri: process.env.COGNITO_REDIRECT_URI,
    code
  });

  try {
    const response = await axios.post(
      `${process.env.COGNITO_DOMAIN}/oauth2/token`,
      params,
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );
    console.log("Cognito token exchange success:", response.data);

    // Decode id_token and upsert user in MongoDB
    const { id_token } = response.data;
    
       
    // Verify the ID token
    let payload;
    try {
      const verifier = CognitoJwtVerifier.create({
        userPoolId: process.env.COGNITO_USER_POOL_ID,
        tokenUse: "id",
        clientId: process.env.COGNITO_CLIENT_ID,
      });

      payload = await verifier.verify(id_token);
      console.log("ID Token verified. Payload:", payload);
    } catch (verifyError) {
      console.error("ID Token verification error:", verifyError);
      return res.status(401).json({ error: 'ID Token verification failed', details: verifyError.message });
    }

    // Upsert user in MongoDB
    try {
      await upsertCognitoUser(payload);
      console.log('User upserted in MongoDB');
    } catch (dbErr) {
      console.error('Error upserting user in MongoDB:', dbErr);
      return res.status(500).json({ error: 'Database error', details: dbErr.message });
    }

    res.json({ ...response.data, redirect: '/profile' }); // Add redirect hint to frontend
  } catch (err) {
    console.error("Cognito token exchange error:", err.response?.data || err.message);
    if (err.response) {
      console.error("Full error response:", err.response.data, err.response.status, err.response.headers);
      // In production, you might want to send a more generic error
      const error_detail = process.env.NODE_ENV === 'production' 
        ? 'Invalid request.' 
        : err.response.data;
      return res.status(err.response.status).json({ error: 'Token exchange failed', details: error_detail });
    }
    return res.status(500).json({ error: 'An unexpected error occurred.' });
  }
});

module.exports = router;
