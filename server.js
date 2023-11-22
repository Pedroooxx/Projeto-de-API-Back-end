require("dotenv").config()

const express = require("express")
const app = express()

const mongoose = require("mongoose")

const bcrypt = require("bcrypt")

const jwt = require("jsonwebtoken")

app.get('/', (req, res) => {
    res.status(200).json({msg: "Bem vindo!"})
})

const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASSWORD

mongoose
    .connect(
        `mongodb+srv://${dbUser}:${dbPassword}@cluster0.nbc79ru.mongodb.net/?retryWrites=true&w=majority`
    )
    .then(() => {
    app.listen(3333)
    console.log("Conectado ao MongoDB")
    })
.catch((err) => console.log(err))

