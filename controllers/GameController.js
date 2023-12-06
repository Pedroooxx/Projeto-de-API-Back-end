const Games = require("../models/Game");

const getGame = async(req, res) => {

    try{
        const{id} = req.params;
        const game = await Games.findById(id)
        if(game.ownerId != req.userId)
        {   
            return res.status(404).json({message: "Usuário não está ligado a esse jogo."})
        }

        if(!game) {
            return res.status(404).json({message: "Jogo não encontrado"})
        }
        res.status(200).json(game);
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
}

const addGame = async (req, res) => {
    const userId = req.userId
    try{
        const {title, genre, year} = req.body

        if(!title) {
            return res.status(422).json({msg: "Digite o titulo do jogo."})
        }
        if(!genre) {
            return res.status(422).json({msg: "Digite o genero do jogo."})
        }
        if(!year) {
            return res.status(422).json({msg: "Digite o ano do jogo."})
        }

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

        const {title, genre, year} = req.body

        const game = await Games.findByIdAndUpdate(id, (title, genre, year));

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
    getGame,
    addGame,
    editGame,
    deleteGame
}