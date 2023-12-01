const mongoose = require('mongoose')

const achievmentsSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Digite o nome da Conquista"]
        },
        points: {
            type: Number,
            required: [true, "Digite a pontuação da Conquista"]
        },
        difficulty: {
            type: String,
            required: [true, "Digite a dificuldade da Conquista"]
        },
        gameId: {
            type: String
        }
    },
    {
        timestamps: true
    }
)

const Achievments = mongoose.model("Achievments", achievmentsSchema)

module.exports = Achievments;