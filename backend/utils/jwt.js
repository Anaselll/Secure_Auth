import jwt from "jsonwebtoken";

const JWT_SECRET = "pdmkeoninvworivnowv";

export function generateToken(payload, expiresIn = "1m") {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
}
process.env.JWT_SECRET;
export function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}
