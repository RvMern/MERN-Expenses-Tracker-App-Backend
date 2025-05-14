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

// const updateChillerData = async(req,res,next) => {
//     try{
//         const chillerID = req.params.id;
//         const {id, dataname, setpoint,load,rangeMin,rangeMax,tmp,fanStatus, status} = req.body;
//         if(id == "", dataname == "", setpoint == "",load == "",rangeMin == "",rangeMax == "",tmp == "", fanStatus == "", status == ""){
//             return next(passError(404,"All fields are required"));
//         }
//         const findChiller = await Chiller.findById(chillerID);
//         if(!findChiller){
//             return next(passError(500,"You are trying to update something which does not exist"));
//         }
//         const updatedChiller = await Chiller.findByIdAndUpdate(chillerID,req.body,{ new: true });
//         res.status(200).json({
//             success:true,
//             message:"Chiller Updation Went Successfully",
//             updatedChiller
//         });
//     }
//     catch(err){
//         next(passError(500,err.message));
//     }
// }


const updateChillerData = async (req, res, next) => {
    try {
        const chillerID = req.params.id;
        // const {id, dataname, setpoint, load, rangeMin, rangeMax, tmp, fanStatus, status} = req.body;

        // Check if at least one field is provided
        // if (
        //     id === undefined &&
        //     dataname === undefined &&
        //     setpoint === undefined &&
        //     load === undefined &&
        //     rangeMin === undefined &&
        //     rangeMax === undefined &&
        //     tmp === undefined &&
        //     fanStatus === undefined &&
        //     status === undefined
        // ) {
        //     return next(passError(400, "At least one field is required to update"));
        // }

        const findChiller = await Chiller.findById(chillerID);
        if (!findChiller) {
            return next(passError(404, "Chiller not found"));
        }

        // Build an object with only the provided fields
        // const updateFields = {};
        // if (id !== undefined) updateFields.id = id;
        // if (dataname !== undefined) updateFields.dataname = dataname;
        // if (setpoint !== undefined) updateFields.setpoint = setpoint;
        // if (load !== undefined) updateFields.load = load;
        // if (rangeMin !== undefined) updateFields.rangeMin = rangeMin;
        // if (rangeMax !== undefined) updateFields.rangeMax = rangeMax;
        // if (tmp !== undefined) updateFields.tmp = tmp;
        // if (fanStatus !== undefined) updateFields.fanStatus = fanStatus;
        // if (status !== undefined) updateFields.status = status;

        // const updatedChiller = await Chiller.findByIdAndUpdate(chillerID, updateFields, { new: true });
        const updatedChiller = await Chiller.findByIdAndUpdate(chillerID, req.body, { new: true });
        res.status(200).json({
            success: true,
            message: "Chiller updated successfully",
            updatedChiller
        });
    } catch (err) {
        next(passError(500, err.message));
    }
};


module.exports = {
    getChillerData,
    createChillerData,
    updateChillerData,
    getAllChillersData
}
