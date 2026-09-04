import { verifyToken } from "../utils/jwt.js";

export function authenticate(req, res, next) {
  const auth = req.headers.authorization;

  if (!auth || !auth.startsWith("Bearer")) {
    return res.status(401).json({ error: "No token provided." });
  }
  const token = auth.split(" ")[1];
  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(401).json({ error: "Invalid or expired token." });
  }
  req.user = decoded;
  next();
}
