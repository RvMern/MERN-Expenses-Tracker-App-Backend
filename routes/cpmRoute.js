const express = require("express");
const { createChillerData, getChillerData, updateChillerData } = require("../controllers/cpm");
const route = express.Router();

route.post('/chiller',createChillerData);
route.put('/updatechiller/:id', updateChillerData);
route.get('/chiller/:id', getChillerData );

module.exports = route
