const User = require("../models/User");

function checkAdmin (role, permissions) {

    return(req, res, next) => {
        console.log(role)
        if(permissions.includes(role)){
            next()
        } else {
            res.status(401).json({msg: "Acesso NEGADO."})
        }
    }
}

module.exports = checkAdmin