require("dotenv").config()
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const express = require("express")
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))

const userRoute = require('./routes/userRoute');

app.get('/', (req, res) => {
    res.status(200).json({msg: "Bem vindo!"})
})


app.use('/', userRoute);


const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASSWORD
const PORT = process.env.PORT

mongoose
    .connect(
        `mongodb+srv://${dbUser}:${dbPassword}@cluster0.nbc79ru.mongodb.net/?retryWrites=true&w=majority`
    )
    .then(() => {
    app.listen(PORT)
    console.log("Conectado ao MongoDB...")
    })
.catch((err) => console.log(err))

