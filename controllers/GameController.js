const Games = require("../models/Game");
const User = require("../models/User");

const getGames = async(req, res) => {
    const userId = req.userId
    try { 
        const games = await Games.find({ownerId: userId});
        res.status(200).json(games)
    }
    catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
}

const addGame = async (req, res) => {
    const userId = req.userId
    try{
        const {title, genre, year} = req.body

        const game = await Games.create({
            title: title,
            genre: genre,
            year: year,
            ownerId: userId
        })

        res.status(200).json(game)
    }
    catch (error){
        res.status(500)
        throw new Error(error.message)
    }
}

const editGame = async (req, res) => {
    try{
        const{id} = req.params;
        const owner = await Games.findById(id)
        if(owner.ownerId != req.userId)
        {
            return res.status(404).json({message: "Usuário não está ligado a esse jogo."})
        }
        const game = await Games.findByIdAndUpdate(id, req.body);
        console.log(game.ownerId)

        if(!game) {
            return res.status(404).json({message: "Jogo não encontrado"})
        }
        res.status(200).json(game);
    }
    catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
}

const deleteGame = async (req, res) => {
    try{
        const {id} = await req.params;
        const owner = await Games.findById(id)
        if(owner.ownerId != req.userId)
        {
            return res.status(404).json({message: "Usuário não está ligado a esse jogo."})
        }
        const game = await Games.findByIdAndDelete(id);
        if(!game){
            res.status(404)
            throw new Error({message: "Jogo não encontrado"})
        }
        res.status(200).json(game)
    }
    catch (error){
        res.status(500)
        throw new Error(error.message)
    }
}

module.exports = {
    getGames,
    addGame,
    editGame,
    deleteGame
}