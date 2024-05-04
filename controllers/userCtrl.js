const User = require("../models/userModel");
const passError = require("../utils/error");
const Account = require("../models/accountModel");
const Transaction = require("../models/transactionModel");

const registerUser = async(req,res,next) => {
    try{
        
        const {fullname, email, password} = req.body;
        if(fullname === "" || email === "" || password === ""){
            return next(passError(400,"All fields are required"));
        }
        const profilePhoto = req.file ? req.file.path : undefined;
        const foundUser = await User.findOne({email});
        if(!foundUser){
            const newUser = await User.create({
                fullname,
                email,
                profileImage: profilePhoto,
                password
            });
            return res.status(200).json({
                success:true,
                message: "New User Has Been Created Successfully",
                newUser
            });
        }
        next(passError(400,"User Already Exists"));
    }
    catch(err){
        next(passError(500,err.message));
    }
}

const loginUser = async(req,res,next) => {
    try{
        const {email,password} = req.body;
        if(email === "" || password === ""){
            return next(passError(403,"All fields are required"));
        }
        const foundUser = await User.findOne({email});
        if(!foundUser){
            return next(passError(403,"Invalid Credentials"));
        }
        const validatePassword = await foundUser.validatePassword(password);
        if(!validatePassword){
            return next(passError(403,"Invalid Credentials"));
        }

        const generatedToken = await foundUser.generateToken();
        res.status(200).json({
            success:true,
            generatedToken
        })

    }
    catch(err){
        next(passError(400,err.message));
    }
}

const getUserProfile = async(req,res,next) => {
    try{
        const foundUser = await User.findById(req.user).populate("accounts");
        res.json({
            message:`Welcome ${foundUser.fullname}`,
            details: foundUser
        })
    }
    catch(err){
        next(passError(500,err.message));
    }
}

const updateUserProfileDetails = async(req,res,next) => {
    try{
        const {email} = req.body;
        if(email){
            const findUser = await User.findOne({email});
            if(findUser){
                return next(passError(402,"Email Already Takn"));
            }
            const updatedUser = await User.findByIdAndUpdate(req.user,req.body);
            if(!updatedUser){
                return next(passError(400,"User Update Failed! Try Again After Few Finutes"));
            }
            res.status(200).json({
                success:true,
                message: "User Update Went Successfully"
            });    
        }
        else{
            const updatedUser = await User.findByIdAndUpdate(req.user,req.body);
            if(!updatedUser){
                return next(passError(400,"User Update Failed! Try Again After Few Finutes"));
            }
            res.status(200).json({
                success:true,
                message: "User Update Went Successfully"
            });  
        }
    }
    catch(err){
        next(passError(500,err.message));
    }
}

const updateUserPassword = async(req,res,next) => {
    try{
        const {oldPassword, newPassword, confirmNewPassword} = req.body;
        if(oldPassword === "" || newPassword === "" || confirmNewPassword === ""){
            return next(passError(400,"All fields are required"));
        }
        const findUser = await User.findById(req.user);
        const validOldPassword = findUser.validatePassword(oldPassword);
        if(!validOldPassword){
            return next(passError(403,"Old Password Doesn't Match"));
        }
        if(newPassword !== confirmNewPassword){
            return next(passError(400,"New Password Doesn't MAtch"));
        }
        findUser.password = newPassword;
        await findUser.save();
    }
    catch(err){
        next(passError(500,err.message));
    }
}

const logoutUser = async(req,res,next) => {
    try{
        res.setHeader('Authorization',"");
        res.status(200).json({
            success:true,
            message: "User Logout Successfully"
        });
    }
    catch(err){
        next(passError(500,err.message));
    }
}


const deleteUser = async(req,res,next) => {
    try{
        const findUser = await User.findById(req.user);
        findUser.accounts.forEach(async(accountID) => {
            const findAccount = await Account.findBtId(accountID);
            findAccount.transactions.forEach(async(transactionID)=>{
                await Transaction.findByIdAndDelete(transactionID);
            });
            await Account.findByIdAndDelete(accountID);
        });
        const deletedUser = await User.findByIdAndDelete(req.user);
        if(!deletedUser){
            return next(passError(401,"User Deletion Failed! Try Again After Few Minutes"));
        }
        res.status(200).json({
            success:true,
            message:"User Is Deleted Successfully"
        });
    }
    catch(err){
        next(passError(500,err.message));
    }
}

module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfileDetails,
    updateUserPassword,
    logoutUser,
    deleteUser
}