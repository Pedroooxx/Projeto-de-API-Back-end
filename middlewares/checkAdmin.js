const User = require("../models/User");

const checkAdmin = async (req, res, next) => {
    
    const user = await User.findById(req.userId)
    const userRole = user.role

    if("admin".includes(userRole)){
        next()
    } else {
        res.status(401).json({msg: "Acesso NEGADO."})
    }

}

module.exports = checkAdmin