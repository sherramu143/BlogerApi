module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define("posts", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    title: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    slug: {
      type: Sequelize.STRING(255),
      allowNull: false,
      unique: true,
    },
    content: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    published: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    created_at: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updated_at: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  }, {
    tableName: "posts",
    timestamps: false,
  });

  return Post;
};
