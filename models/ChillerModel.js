const mongoose = require("mongoose");

const chillerSchema = new mongoose.Schema({
  id:{
    type: Number,
    required: true
  },
  dataname: {
    type: String,
    required: true
  },
  setpoint: {
    type: Number,
    required: true
  },
  fanStatus: {
    type: Boolean,
    default: true,
    required: true
  },
  load: {
    type: Number,
    required: true
  },
  tmp: {
    type: Number,
    required: true
  },
  rangeMin: {
    type: Number, // e.g., 1
    required: true
  },
  rangeMax: {
    type: Number, // e.g., 5
    required: true
  },
  status: {
    type: Boolean,
    required: true
  }
},{
    timestamps:true
});

module.exports = new mongoose.model("Chiller",chillerSchema);




