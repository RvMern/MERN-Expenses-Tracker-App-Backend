const express = require("express");
const { createChillerData, getChillerData, updateChillerData, getAllChillersData } = require("../controllers/cpm.js");
const route = express.Router();

route.post('/createchillerdata',createChillerData);
route.put('/updatechillerdata/:id', updateChillerData);
route.get('/getchillerdata/:id', getChillerData );
route.get('/getallchillersdata', getAllChillersData );

module.exports = route
