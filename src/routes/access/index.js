"use strict";

const express = require("express");
const accessController = require("../../controllers/access.controller");
const router = express.Router();
const { asyncHandler } = require("../../auth/checkAuth");
const { authentication } = require("../../auth/authUtils");

//signUp
router.post("/shop/signup", asyncHandler(accessController.signUp));
//Login
router.post("/shop/login", asyncHandler(accessController.login));

//Authentication
router.use(authentication);

//logout
router.post("/shop/logout", asyncHandler(accessController.logout));

module.exports = router;
