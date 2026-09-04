import { findById } from "../utils/db.js";

export function authorizeModification(req, res, next) {
  const userId = parseInt(req.params.userId);
  const id = req.user.id;
  const tokenUser = findById(id);

  if (!tokenUser || tokenUser.role === "child" && userId !== req.user.id) {
    return res.status(403).json({ error: "Access denied" });
  }
  next();
}
