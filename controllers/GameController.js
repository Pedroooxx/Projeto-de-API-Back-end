const Games = require("../models/Game");

const getGames = async(req, res) => {
    try { 
        const games = await Games.find({});
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
        const {id} = await req.params;
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