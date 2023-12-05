const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Digite seu Nome"]
        },
        email: {
            type: String,
            required: [true, "Digite seu Email"]
        },
        password: {
            type: String,
            required: [true, "Digite sua Senha"]
        },
        role: {
            type: String,
            default: "user",
            required: true
        },
        completedGames: {
            type: Number,
            default: 0,
            required: true
        }
    },
    {
        timestamps: true
    }
)

const User = mongoose.model("User", userSchema)

module.exports = User;