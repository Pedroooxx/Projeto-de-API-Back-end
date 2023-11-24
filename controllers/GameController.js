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
    try{
        const game = await Games.create(req.body)
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
        console.log(id)
        const game = await Games.findByIdAndUpdate(id, req.body);
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
        const {id} = await req.body;
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