module.exports = app => {
  const posts = require("../controllers/post.controller");
  const router = require("express").Router();

  router.post("/", posts.createPost);
  router.get("/", posts.getAllPosts);
  router.get("/:id", posts.getPostById);
  router.put("/:id", posts.updatePost);
  router.delete("/:id", posts.deletePost);

  app.use("/api/posts", router);
};
