
const errorHandler = (err,req,res,next) => {
    const statusCode = err.statusCode;
    const message = err.message;
    const errorStack = err.stack;

    res.status(statusCode).json({
        success:false,
        message,
        errorStack
    })
}

module.exports = errorHandler