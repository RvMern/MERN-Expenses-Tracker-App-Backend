const express = require("express");
const path = require('path');
const cors = require('cors');
const app = express();
require("dotenv").config();
const userRouter = require("./routes/userRoute");
const accountRouter = require("./routes/accountRoute");
const transactionRouter = require("./routes/transactionRoute");
const errorHandler = require("./middlewares/errorHandler");
require("./config/dbConnect");

// ! Middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname,'/public')));
app.use(express.urlencoded({extended:true}));
app.use(cors());

// TODO : Routes
app.use("/api/v1/user",userRouter);
app.use("/api/v1/account",accountRouter);
app.use("/api/v1/transaction",transactionRouter);

// TODO : Error Handler
app.use(errorHandler);





app.listen(process.env.PORT,process.env.HOSTNAME,()=>{
    console.log(`Server is running successfully on ${process.env.HOSTNAME}:${process.env.PORT}`);
});