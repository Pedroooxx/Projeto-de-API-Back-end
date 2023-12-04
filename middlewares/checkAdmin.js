const User = require("../models/User");

function checkAdmin (permissions, userRole) {

    return(req, res, next) => {
        console.log()
        if(permissions.includes(userRole)){
            next()
        } else {
            res.status(401).json({msg: "Acesso NEGADO."})
        }
    }
}

module.exports = checkAdmin