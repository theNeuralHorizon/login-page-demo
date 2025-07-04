const jwt = require('jsonwebtoken');
const jwksRsa = require('jwks-rsa');

const userPoolId = process.env.COGNITO_USER_POOL_ID || 'eu-north-1_TyieKLhfi'; // update if needed
const client = jwksRsa({
  jwksUri: `https://cognito-idp.eu-north-1.amazonaws.com/${userPoolId}/.well-known/jwks.json`
});

function getKey(header, callback) {
  client.getSigningKey(header.kid, function(err, key) {
    const signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}

function verifyJwt(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }
  const token = authHeader.split(' ')[1];
  jwt.verify(token, getKey, { algorithms: ['RS256'] }, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token', details: err.message });
    }
    req.user = decoded;
    next();
  });
}

module.exports = verifyJwt;
