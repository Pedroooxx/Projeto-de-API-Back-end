const mongoose = require('mongoose')

const gamesSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Digite o nome do Jogo"]
        },
        year: {
            type: Number,
            required: [true, "Digite o ano de lançamento do jogo"]
        },
        genre: {
            type: String,
            required: [true, "Digite o genero do jogo"]
        },
        ownerId: {
            type: String,
            required: [true]
        },
        achievments: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
)

const Games = mongoose.model("Games", gamesSchema)

module.exports = Games;