const mongoose = require("mongoose");
const validator = require("validator");

const accountSchema = new mongoose.Schema({
    accountName:{
        type:String,
        required:[true,"Account Name is required"]
    },
    accountType:{
        type:String,
        enum:["Savings", "Current", "Investment", "Checking",
        "Credit Card","Building", "School", "Project", "Utilities", "Travel", "Personal", "Groceries", "Education", "Entertainment", "Loan" ,"Cash Flow", "Uncategorized"],
        required:true
    },
    initialBalance:{
        type:Number,
        default:0
    },
    transactions:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Transaction'
        }
    ],
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        requried:true
    },
    notes:{
        type:String,
        required:true
    }
},{
    timestamps:true,
    toJSON:{
        virtuals:true
    }
});


module.exports = new mongoose.model("Account",accountSchema);
