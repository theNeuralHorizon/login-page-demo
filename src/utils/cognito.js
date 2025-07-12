import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails
} from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID,
  ClientId: process.env.REACT_APP_COGNITO_CLIENT_ID,
};

const userPool = new CognitoUserPool(poolData);

export function login(email, password, onSuccess, onFailure) {
  const user = new CognitoUser({ Username: email, Pool: userPool });
  const auth = new AuthenticationDetails({ Username: email, Password: password });

  user.authenticateUser(auth, {
    onSuccess: onSuccess,
    onFailure: onFailure
  });
}
