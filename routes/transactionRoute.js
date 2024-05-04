const express = require("express");
const { getAllTransactions, getSingleTransaction, updateTransaction, deleteTransaction, createTransaction } = require("../controllers/transactionCtrl");
const isLoggedIn = require("../middlewares/isLoggedIn");
const route = express.Router();

route.get("/alltransactions",isLoggedIn, getAllTransactions);
route.get("/singletransaction/:id",isLoggedIn, getSingleTransaction);
route.post("/createtransaction/:id",isLoggedIn, createTransaction);
route.put("/updatetransaction/:id",isLoggedIn, updateTransaction);
route.delete("/deletetransaction/:id",isLoggedIn, deleteTransaction);




module.exports = route