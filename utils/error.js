//  Error Handler using class 
// class PassError extends Error{
//     constructor(statusCode,message){
//         super(message || "Internal Server Error");
//         this.statusCode = statusCode || 500;
//         this.success = false;
//     }
// }


const passError = (statusCode,message) => {
    const error = new Error(message || "Internal Server Error");
    error.statusCode = statusCode || 500
    return error;
}

module.exports = passError