const { expressjwt: expressJwt } = require("express-jwt");

function authJwt() {
  const secret = process.env.SECRET;
  const api = process.env.API_URL;

  return expressJwt({
    secret,
    algorithms: ["HS256"],
    isRevoked: isRevoked,
  }).unless({
    path: [
      /* { url: /\public\/uploads(.*)/, methods: ["GET", "OPTIONS"] },
      { url: /\api\/v1\/products(.*)/, methods: ["GET", "OPTIONS"] },
      { url: /\api\/v1\/categories(.*)/, methods: ["GET", "OPTIONS"] },
      `${api}/users/login`,
      `${api}/users/register`, */
      { url: /(.*)/ },
    ],
  });
}

async function isRevoked(req, token) {
  if (!token.payload.isAdmin) {
    return true;
  }
}
module.exports = authJwt;
