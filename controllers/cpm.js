const Chiller = require("../models/ChillerModel.js");
const passError = require("../utils/error");
const mongoose = require("mongoose");


const getAllChillersData = async(req,res,next) => {
    try{
        const chillersData = await Chiller.find();
        if (chillersData.length == 0){
            return next(passError(400,"No Chiller Data exist"));
        }
        res.status(200).json({
            success:true,
            chillersData
        });
    }
    catch(err){
        return next(passError(500,err.message));
    }
}

const getChillerData = async(req,res,next) => {
    try{
        const chillerID = req.params.id;
        const chillerData = await Chiller.find({ id: chillerID });
        if (chillerData.length == 0){
            return next(passError(400,"The chiller with specified id does not exist"));
        }
        res.status(200).json({
            success:true,
            chillerData
        });
    }
    catch(err){
        return next(passError(500,err.message));
    }
}

const createChillerData = async(req,res,next) => {
    try{
        const {id, dataname, setpoint,load,rangeMin,rangeMax,tmp, fanStatus, status} = req.body;
        // if(id == "", dataname == "", setpoint == "",load == "",rangeMin == "",rangeMax == "",tmp == "", fanStatus == "", status == ""){
        //     return next(passError(404,"All fields are required"));
        // }
            const newChiller = await Chiller.create({
                id,
                dataname,
                setpoint,
                tmp,
                load,
                fanStatus,
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
    catch(err){
        next(passError(500,err.message));
    }
}

const updateChillerData = async(req,res,next) => {
    try{
        const chillerID = req.params.id;
        const {id, dataname, setpoint,load,rangeMin,rangeMax,tmp,fanStatus, status} = req.body;
        if(id == "", dataname == "", setpoint == "",load == "",rangeMin == "",rangeMax == "",tmp == "", fanStatus == "", status == ""){
            return next(passError(404,"All fields are required"));
        }
        const findChiller = await Chiller.findById(chillerID);
        if(!findChiller){
            return next(passError(500,"You are trying to update something which does not exist"));
        }
        const updatedChiller = await Chiller.findByIdAndUpdate(chillerID,req.body,{ new: true });
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
    updateChillerData,
    getAllChillersData
}
