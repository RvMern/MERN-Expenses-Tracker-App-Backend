const express = require("express");
// const { registerUser, loginUser, getUserProfile, updateUserProfileDetails, updateUserPassword, deleteUser, logoutUser } = require("../controllers/userCtrl");
// const isLoggedIn = require("../middlewares/isLoggedIn");
const route = express.Router();

route.post('/chiller', registerUser);
route.put('/updatechiller/:id', registerUser);
route.get('/chiller/:id', getUserProfile);

module.exports = route
