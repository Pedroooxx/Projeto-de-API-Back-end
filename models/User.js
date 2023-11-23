const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
        nome: {
            type: String,
            required: [true, "Digite seu Nome"]
        },
        email: {
            type: String,
            required: [true, "Digite seu Email"]
        },
        senha: {
            type: String,
            required: [true, "Digite sua Senha"]
        }
    },
    {
        timestamps: true
    }
)

const User = mongoose.model("User", userSchema)

module.exports = User;