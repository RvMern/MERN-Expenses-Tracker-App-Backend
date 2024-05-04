const JWT = require("jsonwebtoken");
const passError = require("../utils/error");

const isLoggedIn = async(req,res,next) => {
    const header = req.headers.authorization;
    if(!header){
        return next(passError(403,"No Token is attached to Header"));
    }
    try{
        const token = header.split(" ")[1];
        const userData = await JWT.verify(token,process.env.JWT_SECRET);
        if(!userData){
            return next(passError(403,"Invalid Token"))
        }
        req.user = userData.id;
        next();
    }
    catch(err){
        return next(passError(403,err.message));
    }

}


module.exports = isLoggedIn