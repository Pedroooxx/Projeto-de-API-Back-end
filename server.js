require("dotenv").config()

const express = require("express")
const app = express()

const mongoose = require("mongoose")

const bcrypt = require("bcrypt")

const jwt = require("jsonwebtoken")

app.use(express.json())

const User = require("./models/User")

app.get('/', (req, res) => {
    res.status(200).json({msg: "Bem vindo!"})
})

app.post('/registro', async(req, res) => {

    const {name, password, email} = req.body

    if(!name) {
        return res.status(422).json({msg: "Digite o Nome."})
    }
    if(!password) {
        return res.status(422).json({msg: "Digite a Senha."})
    }
    if(!email) {
        return res.status(422).json({msg: "Digite o Email."})
    }

    const userExists = await User.findOne({email: email})

    if(userExists) {
        return res.status(422).json({msg: "Utilize outro Email"})
    }

    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    const user = new User({
        name,
        email,
        password
    })
    try {
        await user.save()
        res.status(201).json({msg: "Usuário criado com sucesso."})
    } catch(error) {
        console.log(error)
        res.status(500).json({msg: "Erro no Servidor"})
    }



})

const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASSWORD

mongoose
    .connect(
        `mongodb+srv://${dbUser}:${dbPassword}@cluster0.nbc79ru.mongodb.net/?retryWrites=true&w=majority`
    )
    .then(() => {
    app.listen(3333)
    console.log("Conectado ao MongoDB...")
    })
.catch((err) => console.log(err))

