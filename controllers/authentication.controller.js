const db = require("../models");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const { Op } = require("sequelize");

const Users = db.users;


exports.signup = async (req, res) => {
  try {
    const { username, email, password, bio, profile_image } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: "Username, email and password are required" });
    }

    const existingUser = await Users.findOne({
      where: { [Op.or]: [{ username }, { email }] }
    });
    if (existingUser) return res.status(400).json({ error: "Username or email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = Math.floor(Math.random() * 900000 + 100000).toString();
    const otpExpiry = new Date(Date.now() + 30 * 1000);

    const newUser = await Users.create({
      username,
      email,
      password_hash: hashedPassword,
      bio: bio || '',
      profile_image: profile_image || '',
      otp,
      otp_expiry: otpExpiry,
      email_verified: 0,
      created_at: new Date()
    });

    // 🍎 Fix: Ensure pass is a string literal
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD, // e.g. "nrrfzjxavktjppvc" — must be quoted
      },
      debug: true,
      logger: true,
      tls: { rejectUnauthorized: false },
    });

    await transporter.verify();
    console.log("✅ SMTP verified successfully");

    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "OTP for User Verification",
      text: `Your OTP is: ${otp}. It will expire in 30 seconds.`,
    });
    console.log("📧 OTP email sent:", info.response);

    return res.status(201).json({
      success: true,
      message: "User registered. OTP sent for verification.",
      userId: newUser.id,
    });

  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ error: "Signup failed", details: error.message });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const { userId, otp } = req.body;

    if (!userId || !otp) {
      return res.status(400).json({ error: "User ID and OTP are required" });
    }

    const user = await Users.findOne({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.email_verified) {
      return res.status(400).json({ error: "Email already verified" });
    }

    const currentTime = new Date();

    if (user.otp !== otp) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    if (currentTime > user.otp_expiry) {
      return res.status(400).json({ error: "OTP has expired" });
    }

    // Update user's email verification status
    user.email_verified = 1;
    user.otp = null;
    user.otp_expiry = null;
    await user.save();

    return res.status(200).json({ success: true, message: "Email verified successfully" });

  } catch (error) {
    console.error("OTP Verification error:", error);
    return res.status(500).json({ error: "OTP verification failed", details: error.message });
  }
};
