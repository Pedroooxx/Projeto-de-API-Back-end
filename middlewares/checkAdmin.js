const User = require("../models/User");

function checkAdmin (permissions) {
    return(req, res, next) => {
        const userRole = "admin"
        console.log(userRole)
        if(permissions.includes(userRole)){
            next()
        } else {
            res.status(401).json({msg: "Acesso NEGADO."})
        }
    }
}

const adminPerms = (req, res, next) => {
    next()
}

module.exports = {checkAdmin, adminPerms}