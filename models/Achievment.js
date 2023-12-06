const mongoose = require('mongoose')

const achievmentsSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        points: {
            type: Number,
            required: true
        },
        difficulty: {
            type: String,
            required: true
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