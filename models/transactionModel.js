const mongoose = require("mongoose");
const validator = require("validator");

const transactionSchema = new mongoose.Schema({
    transactionName:{
        type:String,
        required:true
    },
    transactionType:{
        type:String,
        enum:["Income", "Expenses"],
        required:true
    },
    amount:{
        type:Number,
        required:true,
    },
    category:{
        type: String,
        enum:["Food", "Transportation", "Entertainment", "Shopping", "Utilities", "Health", "Travel", "Education", "Personal", "Groceries", "Bills", "Uncategorized"],
        required:true
    },
    color:{
        type:String
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    account:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Account'
    },
    date:{
        type:Date,
        default: Date.now()
    },
    notes:{
        type:String,
        required:true
    }
},{
    timestamps:true,
    toJSON:{virtuals:true}
});


module.exports = new mongoose.model("Transaction",transactionSchema);
