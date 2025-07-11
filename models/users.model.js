module.exports = (sequelize, Sequelize) => {
  const Users = sequelize.define(
    "users",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },
      password_hash: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      bio: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      profile_image: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      otp: {
        type: Sequelize.STRING(6),  // 6-digit OTP stored as string
        allowNull: true,
      },
      otp_expiry: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      email_verified: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    },
    {
      tableName: "users",
      timestamps: false, // disables Sequelize auto timestamps
    }
  );

  return Users;
};
