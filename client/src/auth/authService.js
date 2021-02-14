import jwt from "jsonwebtoken";
import moment from "moment";
import { AccessToken } from "users/userConstants";

export function getAccessToken() {
  const token = localStorage.getItem(AccessToken);
  if (!token) {
    return null;
  }
  return willExpireToken(token) ? null : token;
}

export function decodeToken(token) {
  return jwt.decode(token);
}

export function logout() {
  localStorage.removeItem(AccessToken);
}

function willExpireToken(token) {
  const decodedToken = jwt.decode(token);
  const { exp } = decodedToken;
  const now = moment().unix();
  return now > exp;
}
