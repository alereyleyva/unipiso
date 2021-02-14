const jwt = require("jsonwebtoken");

const AuthService = {
  createAccessToken: (user) => {
    const { _id, name, username, email } = user;
    const payload = { id: _id, name, username, email };
    return jwt.sign(payload, process.env.TOKEN, { expiresIn: "24h" });
  },
  decodedToken: (token) => {
    return jwt.decode(token, process.env.TOKEN);
  },
};

module.exports = AuthService;
