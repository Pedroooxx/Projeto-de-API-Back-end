const mongoose = require('mongoose')

const gamesSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        year: {
            type: Number,
            required: true
        },
        genre: {
            type: String,
            required: true
        },
        ownerId: {
            type: String,
            required: true
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