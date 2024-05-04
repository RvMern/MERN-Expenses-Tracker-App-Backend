const Transaction = require("../models/transactionModel");
const Account = require("../models/accountModel");
const passError = require("../utils/error");

const getAllTransactions = async(req,res,next) => {
    try{
        const allTransactions = await Transaction.find();
        if(!allTransactions){
            return next(passError(500,"All Transactions Fetching Failed! Try Again After Few Minutes"));
        }
        res.status(200).json({
            success:true,
            message:"All Transactions Fetched Successfully",
            allTransactions
        });
    }
    catch(err){
        next(passError(500,err.message));
    }
}

const getSingleTransaction = async(req,res,next) => {
    try{
        const transactionID = req.params.id;
        const singleTransaction = await Transaction.findById(transactionID);
        if(!singleTransaction){
            return next(passError(404,"Transaction With This ID Doesn't Found"));
        }
        res.status(200).json({
            success:true,
            message:"Transaction With This ID Has Been Fetched Successfully",
            singleTransaction
        });
    }
    catch(err){
        next(passError(500,err.message));
    }
}

const createTransaction = async(req,res,next) => {
    try{
        const accountID = req.params.id;
        let changedAmount = 0; 
        const {transactionName,transactionType,amount,category,color, notes} = req.body;
        if(transactionName === "" || transactionType === "" || amount === "" || category === "" || notes === ""){
            return next(passError(400,"All fields are required"));
        }

        const newTransaction = await Transaction.create({
            transactionName,
            transactionType,
            amount,
            category,
            color,
            createdBy: req.user,
            account:accountID,
            notes
        });
        if(!newTransaction){
            return next(passError(500,"New Transaction Creation Failed! Try Again After Few Minutes"));
        }
        const findAccount = await Account.findById(accountID);
        findAccount.transactions.push(newTransaction._id);
        await findAccount.save();
        res.status(200).json({
            success:true,
            message:"New Transaction Created Successfully",
            newTransaction
        });
    }
    catch(err){
        next(passError(500,err.message));
    }
}

const updateTransaction = async(req,res,next) => {
    try{
        const transactionID = req.params.id;
        const {transactionName,transactionType,amount,category,notes} = req.body;
        if(transactionName === "" || transactionType === "" || amount === "" || category === "" || notes === ""){
            return next(passError(400,"All fields are required"));
        }
        const updatedTransaction = await Transaction.findByIdAndUpdate(transactionID,req.body);
        if(!updatedTransaction){
            return next(passError(500,"Transaction Updation Failed! Try Again After Few Minutes"));
        }
        res.status(200).json({
            success:true,
            message:"Transaction Updation Went Successfully",
            updatedTransaction
        });
    }
    catch(err){
        next(passError(500,err.message));
    }
}

const deleteTransaction = async(req,res,next) => {
    try{
        const transactionID = req.params.id;
        const findTransaction = await Transaction.findById(transactionID);
        const accountID = findTransaction.account;
        const deletedTransaction = await Transaction.findByIdAndDelete(transactionID);
        if(!deletedTransaction){
            return next(passError(500,"Deletion Of Transaction Failed! Please Try Few Minutes Later"))
        }
        const findAccount = await Account.findById(accountID);
        const filteredTransactions = findAccount.transactions.filter(transaction => transaction.toString() !== transactionID);
        findAccount.transactions = filteredTransactions;
        await findAccount.save();
        res.status(200).json({
            success:true,
            message:"Transaction Has Been Deleted Successfully"
        });
    }
    catch(err){
        next(passError(500,err.message));
    }
}


module.exports = {
    getAllTransactions,
    getSingleTransaction,
    createTransaction,
    updateTransaction,
    deleteTransaction
}