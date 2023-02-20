const fs = require("fs")

const authenticator = (req,res,next) => {
    
    // const token = req.headers.authorization;
    if(req.path === "/" || req.path === "/login" ){
        next();
    } 
}

const validator = (req,res,next) => {
    res.send("validate user")
}
const logger = (req,res,next) => {
    if(req.path === "/login"){
        
    }
}