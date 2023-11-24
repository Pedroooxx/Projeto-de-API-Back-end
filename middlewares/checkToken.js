const jwt = require("jsonwebtoken")

function checkToken(req, res, next) {

    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]
    
    if(!token) {
        return res.status(401).json({msg: "Acesso negado."})
    }

    try{
        const secret = process.env.SECRET
        
        const userId = jwt.verify(token, secret)

        req.userId = userId.id

        next()

    } catch(error) {
        res.status(400).json({msg: "Token Invalido."})
    }
}

module.exports = checkToken