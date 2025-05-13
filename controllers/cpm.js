const Chiller = require("../models/ChillerModel.js");
const mongoose = require("mongoose");

const getChillerData = async(req,res,next) => {
    try{
        const chillerID = req.params.id;
        const chillerData = await Chiller.find({ id: chillerID });
        res.status(200).json({
            success:true,
            chillerData
        });
    }
    catch(err){
        console.log('Unable to find the data of chiller with specified id');
    }
}

const createChillerData = async(req,res,next) => {
    try{
        const {id, email, password} = req.body;
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
