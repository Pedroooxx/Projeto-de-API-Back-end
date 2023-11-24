const mongoose = require('mongoose')

const gamesSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Digite o nome da Tarefa"]
        },
        year: {
            type: Number,
            required: [true, "Digite o ano de lançamento do jogo"]
        },
        genre: {
            type: String,
            required: [true, "Digite o genero do jogo"]
        }
    },
    {
        timestamps: true
    }
)

const Games = mongoose.model("Games", gamesSchema)

module.exports = Games;