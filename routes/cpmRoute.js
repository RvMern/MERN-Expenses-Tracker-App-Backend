const express = require("express");
const { createChillerData, getChillerData, updateChillerData } = require("../controllers/cpm.js");
const route = express.Router();

route.post('/createchillerdata',createChillerData);
route.put('/updatechillerdata/:id', updateChillerData);
route.get('/getchillerdata/:id', getChillerData );

module.exports = route
