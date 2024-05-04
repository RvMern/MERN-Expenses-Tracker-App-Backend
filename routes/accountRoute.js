const express = require("express");
const { getAllAccounts, getSingleAccount, updateAccount, deleteAccount, createAccount } = require("../controllers/accountCtrl");
const isLoggedIn = require("../middlewares/isLoggedIn");
const route = express.Router();

route.get("/allaccounts",getAllAccounts);
route.get("/singleaccount/:id",getSingleAccount);
route.post("/createaccount",isLoggedIn, createAccount);

route.put("/updateaccount/:id",isLoggedIn, updateAccount);
route.delete("/deleteaccount/:id",isLoggedIn, deleteAccount);




module.exports = route