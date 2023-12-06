const jwt = require("jsonwebtoken")

const User = require("../models/User");
const Games = require("../models/Game");
const Achievments = require("../models/Achievment");

const ranking = async(req, res) => {

    let ranking
    const pagina = parseInt(req.query.page) || 1
    const pageSize = 5

    ranking = await User.find()
    .sort({completedGames: -1})
    .skip((pagina-1) *pageSize)
    .limit(pageSize)

    if(!ranking) {
        return res.status(404).json({msg: "Base de Usuários vazia."})
    }
    showRanking = ranking.name + ranking.completedGames

    res.status(200).json({ranking})
}

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

    const user = new User({
        name: name,
        email: email,
        password: password
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

    const user = await User.findOne({email: email, password: password})

    if(!user) {
        return res.status(404).json({msg: "Login ou Senha Invalido"})
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

const editUser = async (req, res) => {
    try{
        const id = req.userId
        const user = await User.findByIdAndUpdate(id, req.body);
        
        if(!user) {
            return res.status(404).json({message: "Usuário não encontrado"})
        }
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
}

const deleteUser = async (req, res) => {
    try{
        const id = req.userId
        const user = await User.findByIdAndDelete(id);
        if(!user){
            res.status(404)
            throw new Error({message: "Usuario não encontrado"})
        }
        res.status(200).json(user)
    }
    catch (error){
        res.status(500)
        throw new Error(error.message)
    }
}

const getUser = async(req, res) => {
    const id = req.userId
    let user
    try{
        user = await User.findById(id)
    } catch {
        return res.status(404).json({msg: "Id não encontrada."})
    }

    if(!user) {
        return res.status(404).json({msg: "Usuario não encontrado."})
    }
    res.status(200).json({user})
}

const getLibrary = async(req, res) => {
    const id = req.userId
    let user, games

    const pagina = parseInt(req.query.page) || 1
    const pageSize = 5

    try{
        user = await User.findById(id, "-password")
        games = await Games.find({ownerId: id})
        .skip((pagina-1) *pageSize)
        .limit(pageSize);
    } catch {
        return res.status(404).json({msg: "Id não encontrada."})
    }

    if(!user) {
        return res.status(404).json({msg: "Usuario não encontrado."})
    }
    res.status(200).json({user, games})
}


const getAGame = async(req, res) => {
    const{id} = req.params;
    let game, achievments

    const pagina = parseInt(req.query.page) || 1
    const pageSize = 5

    try{
        game = await Games.findById(id)
        if(game.ownerId != req.userId)
        {
            return res.status(404).json({message: "Usuário não está ligado a esse jogo."})
        }
        achievments = await Achievments.find({gameId: id})
        .skip((pagina-1) *pageSize)
        .limit(pageSize);
    } catch {
        return res.status(404).json({msg: "Id não encontrada."})
    }
    res.status(200).json({game, achievments})
}

// Admin Controllers

const adminEditUser = async (req, res) => {
    const {id} = req.params;
    try{
        const user = await User.findByIdAndUpdate(id, req.body);
        
        if(!user) {
            return res.status(404).json({message: "Usuário não encontrado"})
        }
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
}

const adminDeleteUser = async (req, res) => {
    const {id} = req.params;
    try{
        const user = await User.findByIdAndDelete(id);
        if(!user){
            res.status(404)
            throw new Error({message: "Usuario não encontrado"})
        }
        res.status(200).json(user)
    }
    catch (error){
        res.status(500)
        throw new Error(error.message)
    }
}

const adminGetUsers = async(req, res) => {
    
    let users
    const pagina = parseInt(req.query.page) || 1
    const pageSize = 5

    try{
        users = await User.find()
        .skip((pagina-1) *pageSize)
        .limit(pageSize);

    } catch {
        return res.status(404).json({msg: "Id não encontrada."})
    }

    if(!users) {
        return res.status(404).json({msg: "Base de Usuários vazia."})
    }
    res.status(200).json({users})
}

module.exports = {
    ranking,
    register,
    login,
    editUser,
    deleteUser,
    getUser,
    getLibrary,
    getAGame,
    adminDeleteUser,
    adminEditUser,
    adminGetUsers
}