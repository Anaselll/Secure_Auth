import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
// check  for user privilege
export function authenticate(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: err.message });
    }
    req.user = decoded;
    next();
  });
}
