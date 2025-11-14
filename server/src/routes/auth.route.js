import express from "express";
import bcrypt from "bcrypt";
import User from "../models/user/user.js";
import { signToken } from "../utils/token.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

const COOKIE_OPTIONS = {
  httpOnly: true,
  // set secure true in production (https)
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
};

// Register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: "Missing fields" });

    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Email already in use" });

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const user = await User.create({ name, email, password: hashed, role });
    const token = signToken({ id: user._id, role: user.role });

    res.cookie("token", token, COOKIE_OPTIONS);
    res
      .status(201)
      .json({
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
  } catch (err) {
    console.log("register error", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Missing fields" });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = signToken({ _id: user._id, role: user.role });
    res.cookie("token", token, COOKIE_OPTIONS);
    res.json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Logout
router.post("/logout", (req, res) => {
  res.clearCookie("token", COOKIE_OPTIONS);
  res.json({ message: "Logged out" });
});

router.put("/update", protect, async (req, res) => {
  try {
    const userId = req.user.id; // ✅ get user ID from token
    const { name, phone, address, password } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // ✅ Update only allowed fields
    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (address) user.address = address;

    // ✅ Optionally update password
    if (password && password.trim() !== "") {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();

    res.json({
      message: "Profile updated successfully ✅",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("update error", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});


// Get current user (protected)
// // const { protect } = require('../middleware/authMiddleware');
// router.get("/me",protect,  (req, res) => {
//   res.json({ user: req.user });
// });

router.get("/me", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
});

router.put("/update-user", protect, async (req, res) => {
  try {
    const { name, phone, address ,email } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, phone, address , email },
      { new: true } 
    ).select("-password");

    res.status(200).json({ success: true, user, message: "Profile updated successfully ✅" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update user", error });
  }
});

// router.get("/me", protect, async (req, res) => {
//   try {
//     // req.user me sirf JWT ke data hote hain (id, email, role)
//     // isliye database se fresh user fetch karte hain
//     const user = await User.findById(req.user._id)
//       .select("-password") // password ko exclude karte hain
//       .populate("vehicles"); // agar vehicles stored hain to unhe include kare

//     if (!user) {
//       return res.status(404).json({ success: false, message: "User not found" });
//     }

//     res.status(200).json({
//       success: true,
//       message: "User details fetched successfully",
//       user,
//     });
//   } catch (error) {
//     console.error("❌ Error fetching user details:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch user details",
//       error: error.message,
//     });
//   }
// });

export default router;
