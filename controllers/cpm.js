

const getChiller = async(req,res,next) => {
    try{
        const acconntID = req.params.id;
        const findAccount = await Account.findById(acconntID).populate('transactions');
        if(!findAccount){
            return next(passError(404,"Unable to find! Invalid Account ID"));
        }
        res.status(200).json({
            success:true,
            Account:findAccount
        });
    }
    catch(err){
        next(passError(500,err.message));
    }
}

const createAccount = async(req,res,next) => {
}

const updateAccount = async(req,res,next) => {
}
