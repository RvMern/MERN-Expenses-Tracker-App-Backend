const express = require("express");
const { createChillerData, getChillerData, updateChillerData } = require("../controllers/cpm.js");
const route = express.Router();

route.post('/createchiller',createChillerData);
route.put('/updatechiller/:id', updateChillerData);
route.get('/getchiller/:id', getChillerData );

module.exports = route
