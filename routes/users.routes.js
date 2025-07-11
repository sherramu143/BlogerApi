module.exports = app => {
  const userController = require("../controllers/user.controller");
  const router = require("express").Router();

  router.post("/", userController.createUser);
  router.get("/", userController.getAllUsers);
  router.get("/:userId", userController.getUserById);
  router.delete("/:userId", userController.deleteUser);

  app.use("/api/users", router);
};
