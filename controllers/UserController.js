const bcrypt = require("bcrypt")

const User = require("../models/User");

const register = async(req, res) => {

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
        name: name,
        email: email,
        password: passwordHash
    })
    try {
        await user.save()
        res.status(201).json({msg: "Usuário criado com sucesso."})
    } catch(error) {
        console.log(error)
        res.status(500).json({msg: "Erro no Servidor"})
    }
}

const login = async(req, res) => {

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
            {
                expiresIn: 3600 * 24 * 60 * 60
            }
        )
        res.status(200).json({msg: "Autenticação bem sucedida", token})
    } catch(err) {
        console.log(err)
    }
}

const getUser = async(req, res) => {
    const id = req.params.id

    const user = await User.findById(id, "-password")

    if(!user) {
        return res.status(404).json({msg: "Usuario não encontrado."})
    }
    res.status(200).json({user})
}

module.exports = {
    register,
    login,
    getUser
}