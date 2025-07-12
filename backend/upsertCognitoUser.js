// This file upserts a user into MongoDB based on Cognito id_token
const User = require('./models/User');

async function upsertCognitoUser(decodedIdToken) {
  if (!decodedIdToken || !decodedIdToken.sub || !decodedIdToken.email) {
    throw new Error('Invalid decoded ID token');
  }
  const filter = { sub: decodedIdToken.sub };
  const update = {
    email: decodedIdToken.email,
    name: decodedIdToken.name || '',
  };
  const options = { upsert: true, new: true, setDefaultsOnInsert: true };
  return User.findOneAndUpdate(filter, update, options);
}

module.exports = upsertCognitoUser;
