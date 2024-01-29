const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require("../config")

function userauth(req, res, next) {
   
    const authheader = req.headers.authorization
   
    if (!authheader || !authheader.startsWith('Bearer')) {
        res.status(403).json({})
  
    }

    const token = authheader.split(' ')[1]

    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        req.userId = decoded.userid
        next()
    } catch (error) {
        console.log(error);
    }
}

module.exports = userauth