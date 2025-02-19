const logger = require("./logger");
const jwt = require("jsonwebtoken");
const config = require("./config");

const errorHandler = (error, req, res, next) => {

    
    logger.error(error.message);
    if (error.name === "ValidationError") {
        
        return res.status(400).json({error: error.message});
        
    }
    
    if (error.name === "CastError") {
        return res.status(400).json({error: error.message});
    }
    
    if (error.name === "UsernameExistsOrMissing") {
        return res.status(400).json({error: error.message})
    }

    if (error.name === "PasswordTooShort") {
        return res.status(400).json({error: error.message})
    }

    if (error.name === "UsernameMissing") {
        return res.status(400).json({error: error.message})
    }
    
    if (error.name === "UserNotFound") {
        return res.status(404).json({error: error.message})
    }

    if (error.name === "IncorrectPassword") {
        return res.status(401).json({error: error.message})
    }

    if (error.name === "JsonWebTokenError") {
        return res.status(400).json({error: "Token missing or invalid"})
    }

    if (error.name === "AuthenticationError") {
        return res.status(401).json({error: error.message})
    }

    next(error);
}


const tokenExtract = (req, res, next) => {
    const auth = req.get('authorization');
    if (auth && auth.startsWith('Bearer ')) {
        const token = auth.replace('Bearer ', '');
        const decode = jwt.verify(token, config.SECRET);
        if (!decode) {
            return res.status(401).json({
                error: "Invalid token"
            })
        }
        req.user = decode;
        next();
        return;
    }
    if (req.method === "GET") {
        next();
        return;
    }
    res.status(401).json({error: "Token not provided"});
    
}

module.exports = {errorHandler, tokenExtract};