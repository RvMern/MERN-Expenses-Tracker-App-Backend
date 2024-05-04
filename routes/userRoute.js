const express = require("express");
const { registerUser, loginUser, getUserProfile, updateUserProfileDetails, updateUserPassword, deleteUser, logoutUser } = require("../controllers/userCtrl");
const isLoggedIn = require("../middlewares/isLoggedIn");
const route = express.Router();
const multer = require('multer');
const storage = require("../config/cloudinary");
const upload = multer({storage});

route.post('/register', upload.single("file"), registerUser);
route.post('/login',loginUser);
route.get('/userprofile', isLoggedIn, getUserProfile);
route.get('/logout',isLoggedIn, logoutUser);
route.put('/updateuserprofiledetails',isLoggedIn, updateUserProfileDetails);
route.put('/updateuserpassword',isLoggedIn, updateUserPassword);
route.delete('/deleteuser',isLoggedIn, deleteUser);


module.exports = route