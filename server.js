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

app.get("/usuario/:id", checkToken, async (req, res) => {
    const id = req.params.id

    const user = await User.findById(id, "-password")

    if(!user) {
        return res.status(404).json({msg: "Usuario não encontrado."})
    }
    res.status(200).json({user})
})

function checkToken(req, res, next) {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]
    
    if(!token) {
        return res.status(401).json({msg: "Acesso negado."})
    }

    try{
        const secret = process.env.SECRET
        jwt.verify(token, secret)

        next()

    } catch(error) {
        res.status(400).json({msg: "Token Invalido."})
    }
}

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
        password: passwordHash
    })
    try {
        await user.save()
        res.status(201).json({msg: "Usuário criado com sucesso."})
    } catch(error) {
        console.log(error)
        res.status(500).json({msg: "Erro no Servidor"})
    }
})

app.post('/entrar', async(req, res) => {

    const {password, email} = req.body

    if(!email) {
        return res.status(422).json({msg: "Digite o Email."})
    }
    if(!password) {
        return res.status(422).json({msg: "Digite a Senha."})
    }

    const user = await User.findOne({email: email})

    if(!user) {
        return res.status(404).json({msg: "Email Invalido"})
    }

    const checkPassword = await bcrypt.compare(password, user.password)

    if(!checkPassword) {
        return res.status(404).json({msg: "Senha Invalida"})
    }

    try {
        const secret = process.env.SECRET
        const token = jwt.sign(
            {
            id: user._id,
            },
            secret,
        )
        res.status(200).json({msg: "Autenticação bem sucedida", token})
    } catch(err) {
        console.log(error)
        
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

