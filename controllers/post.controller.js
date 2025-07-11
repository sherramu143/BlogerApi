const db = require('../models');
const Posts = db.posts;

exports.createPost = async (req, res) => {
  try {
    const { user_id, title, slug, content, published } = req.body;

    if (!user_id || !title || !slug || !content) {
      return res.status(400).json({ message: "All fields except published are required." });
    }

    const post = await Posts.create({
      user_id,
      title,
      slug,
      content,
      published: published || false,
    });

    res.status(201).json(post);
  } catch (error) {
    console.error("Create Post Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Posts.findAll();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving posts" });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Posts.findByPk(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving post" });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const result = await Posts.update(req.body, {
      where: { id: req.params.id },
    });

    if (result[0] === 0) return res.status(404).json({ message: "Post not found or no changes" });

    res.json({ message: "Post updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating post" });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const deleted = await Posts.destroy({ where: { id: req.params.id } });

    if (!deleted) return res.status(404).json({ message: "Post not found" });

    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting post" });
  }
};
