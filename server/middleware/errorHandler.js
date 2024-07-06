const {statusConst}=require('./statusCode')

const errorHandler =(req,res,error,next ) =>{

    const statusCode=req.statusCode ? req.statusCode : 500;
    

};


module.exports =errorHandler;