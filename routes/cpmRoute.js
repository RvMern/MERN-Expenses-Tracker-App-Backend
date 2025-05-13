const express = require("express");
// const { registerUser, loginUser, getUserProfile, updateUserProfileDetails, updateUserPassword, deleteUser, logoutUser } = require("../controllers/userCtrl");
// const isLoggedIn = require("../middlewares/isLoggedIn");
const route = express.Router();

route.post('/register', upload.single("file"), registerUser);
route.put('/register', upload.single("file"), registerUser);
route.get('/userprofile', isLoggedIn, getUserProfile);


module.exports = route
