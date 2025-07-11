const express = require('express');
const router = express.Router();

module.exports = router;

module.exports = app => {
 const userController = require('../controllers/authentication.controller'); // Adjust path as needed


  const router = require("express").Router();

  // POST /signup - user registration
router.post('/signup', userController.signup);
router.post('/verify',userController.verifyOtp);


  app.use("/api/authentiction", router);
};
