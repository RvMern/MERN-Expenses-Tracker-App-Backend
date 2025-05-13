const Chiller = require("../models/ChillerModel.js");
const passError = require("../utils/error");
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
        return next(passError(400,"Unable to find the data of chiller with specified id"));
    }
}

const createChillerData = async(req,res,next) => {
    try{
        const {id, dataname, setpoint,load,rangeMin,rangeMax,tmp, status} = req.body;
        if(id == "", dataname == "", setpoint == "",load == "",rangeMin == "",rangeMax == "",tmp == "", status == ""){
            return next(passError(404,"All fields are required"));
        }
        const foundChiller = await Chiller.find({id:id});
        if(!foundChiller){
            const newChiller = await Chiller.create({
                id,
                dataname,
                setpoint,
                tmp,
                load,
                rangeMin,
                rangeMax,
                status
            });
            return res.status(200).json({
                success:true,
                message: "Chiller Data Has Been Created Successfully",
                newChiller
            });
        }
        next(passError(400,"Chiller Data Already Exists"));
    }
    catch(err){
        next(passError(500,err.message));
    }
}

const updateChillerData = async(req,res,next) => {
    try{
        const chillerID = req.params.id;
        const {id, dataname, setpoint,load,rangeMin,rangeMax,tmp, status} = req.body;
        if(id == "", dataname == "", setpoint == "",load == "",rangeMin == "",rangeMax == "",tmp == "", status == ""){
            return next(passError(404,"All fields are required"));
        }
        const findChiller = await Chiller.findById(chillerID);
        if(!findChiller){
            return next(passError(500,"You are trying to update something which does not exist"));
        }
        const updatedChiller = await Chiller.findByIdAndUpdate(chillerID,req.body);
        res.status(200).json({
            success:true,
            message:"Chiller Updation Went Successfully",
            updatedChiller
        });
    }
    catch(err){
        next(passError(500,err.message));
    }
}



module.exports = {
    getChillerData,
    createChillerData,
    updateChillerData
}
