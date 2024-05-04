const passError = require("../utils/error");
const User = require("../models/userModel");
const Account = require("../models/accountModel");
const Transaction = require("../models/transactionModel");
const mongoose = require("mongoose");

const getAllAccounts = async(req,res,next) => {
    try{
        const allAccounts = await Account.find();
        if(!allAccounts){
            return next(passError(400,"All Accounts Fetching Failed"));
        }
        res.status(200).json({
            success:false,
            allAccounts
        });
    }
    catch(err){
        next(passError(500,err.message));
    }
}

const getSingleAccount = async(req,res,next) => {
    try{
        const acconntID = req.params.id;
        const findAccount = await Account.findById(acconntID).populate('transactions');
        if(!findAccount){
            return next(passError(404,"Unable to find! Invalid Account ID"));
        }
        res.status(200).json({
            success:true,
            Account:findAccount
        });
    }
    catch(err){
        next(passError(500,err.message));
    }
}

const createAccount = async(req,res,next) => {
    try{
        const {accountName, accountType, initialBalance, notes} = req.body;
        if(accountName === "" || accountType === "" || notes === ""){
            return next(passError(400,"All fields are required"));
        }

        const newAccount = await Account.create({
            accountName,
            accountType,
            initialBalance: initialBalance === '' ? 0 : initialBalance,
            createdBy:req.user,
            notes
        });

        if(!newAccount){
            return next(passError(500,"New Account Creation Failed"));
        }

        const findUser = await User.findById(req.user);
        findUser.accounts.push(newAccount._id);
        await findUser.save();
        
        res.status(200).json({
            success:true,
            newAccount
        });
    }
    catch(err){
        next(passError(500,err.message))
    }
}

const updateAccount = async(req,res,next) => {
    try{
        const accountID = req.params.id;
        const updatedAccount = await Account.findByIdAndUpdate(accountID,req.body);
        if(!updatedAccount){
            return next(passError(400,"Updation Of Account Failed! Try Again After Few Minutes"));
        }
        res.status(200).json({
            success:true,
            message:"Updation Of Account Went Successfully"
        });
    }
    catch(err){
        next(passError(500,err.message))
    }
}

const deleteAccount = async(req,res,next) => {
    try{
        const accountID = req.params.id;
        if(!mongoose.isValidObjectId(accountID)){
            return next(passError(403,"Invalid Account ID"));
        }
        const findAccount = await Account.findById(accountID);
        findAccount.transactions.forEach(async(transactionID) => {
            await Transaction.findByIdAndDelete(transactionID);
        });
        const deletedAccount = await Account.findByIdAndDelete(accountID);
        if(!deleteAccount){
            return next(passError(400,"Deletion Of Account Failed! Try Again After Few Minutes"));
        }
        const findUser = await User.findById(req.user);
        const filteredAccounts = findUser.accounts.filter(account =>
            account.toString() !== accountID
        )
        findUser.accounts = filteredAccounts;
        await findUser.save();
        res.status(200).json({
            success:true,
            message: "Account Deletion Went Successfully",
            deletedAccount
        });
    }
    catch(err){
        next(passError(500,err.message));
    }
}


module.exports = {
    getAllAccounts,
    getSingleAccount,
    createAccount,
    updateAccount,
    deleteAccount
}