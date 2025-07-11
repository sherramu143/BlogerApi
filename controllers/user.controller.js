const db = require('../models');
const Users = db.users;
const { Op } = db.Sequelize;

// 1. Create User
exports.createUser = async (req, res) => {
  try {
    const { username, email, password, bio, profile_image } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Username, email, and password are required." });
    }

    const existingUser = await Users.findOne({
      where: {
        [Op.or]: [{ username }, { email }]
      }
    });

    if (existingUser) {
      return res.status(409).json({ message: "Username or email already exists." });
    }

    const newUser = await Users.create({
      username,
      email,
      password_hash: password,
      bio: bio || null,
      profile_image: profile_image || null,
    });

    res.status(201).json({
      message: "User created successfully.",
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        bio: newUser.bio,
        profile_image: newUser.profile_image,
        created_at: newUser.created_at,
      },
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// 2. Get All Users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await Users.findAll({
      attributes: { exclude: ['password_hash'] }
    });
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// 3. Get User By ID
exports.getUserById = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await Users.findByPk(userId, {
      attributes: { exclude: ['password_hash'] }
    });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// 4. Delete User
exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const deleted = await Users.destroy({
      where: { id: userId }
    });

    if (!deleted) {
      return res.status(404).json({ message: "User not found or already deleted." });
    }

    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
