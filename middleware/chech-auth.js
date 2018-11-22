 const jwt = require('jsonwebtoken');

 const JWT_KEY = "ASD6as5dA";

module.exports = (req, res, next) =>{
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decode = jwt.verify(token, JWT_KEY);



        next();
    }catch (error){
        return res.status(440).json({
           message: "Auth failed"
        });
    }
}