import { verifyToken } from "../utils/token.js";
import User from "../models/user/user.js";

export async function protect(req, res, next) {
  try {
    const token =
      req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");
    if (!token) return res.status(401).json({ message: "Not authorized" });

    const decoded = verifyToken(token);
    const user = await User.findById(decoded._id).select("-password");
    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user;
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Token invalid", error: err.message });
  }
}

export function authorizeRoles(...roles) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: "Not authorized" });
    if (!roles.includes(req.user.role))
      return res.status(403).json({ message: "Forbidden" });
    next();
  };
}
