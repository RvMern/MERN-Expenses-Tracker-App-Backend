const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    fullname:{
        type: String,
        minlength: [3,"The first name should at least contain 3 characters"],
        maxlength: [30,"The first name should not exceed 30 characters"],
        required:[true,"Fullname is required"],
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true,
        validate: {
            validator: (value)=>{validator.isEmail(value)},
            message: "Please Enter Valid Email ID"
        },
    },
    password:{
        type:String,
        required:[true,"Password is required"],
        minlength:[8,"Please Enter Strong Password Which contain al least 8 characters"]
    },
    profileImage:{
        type:String,
        default: 'https://res.cloudinary.com/doopi5cs6/image/upload/v1710910555/Income-Expenses-Tracker/User%20Profile%20Photos/rr8deibhranzu1ug2zuw.png'
    },
    hasCreatedAccount:{
        type:Boolean,
        default:false
    },
    accounts:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Account'
        }
    ]
},{
    timestamps:true,
    toJSON:{
        virtuals:true
    }
});


userSchema.pre("save", async function(next){
    if(!this.isModified('password')){
        next();
    }
    this.password = await bcrypt.hash(this.password,10);
});

userSchema.methods.validatePassword = async function(password){
    const validPass = await bcrypt.compare(password,this.password)
    return validPass;
}

userSchema.methods.generateToken = async function(){
    const token = await JWT.sign({id:this._id},process.env.JWT_SECRET,{expiresIn: "7days"});
    return token;
}

module.exports = new mongoose.model("User",userSchema);
