const Chiller = require("../models/ChillerModel.js");
const mongoose = require("mongoose");

const getChiller = async(req,res,next) => {
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

const createAccount = async(req,res,next) => {
}

const updateAccount = async(req,res,next) => {
}
