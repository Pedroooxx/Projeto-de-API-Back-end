const Achievments = require("../models/Achievment");
const Games = require("../models/Game");

const getAchievment = async(req, res) => {

    try { 
        
        const achievmentId = req.params.id
        const achievment = await Achievments.findById(achievmentId)
        const game = await Games.findById(achievment.gameId)

        if(game.ownerId != req.userId)
        {
            return res.status(404).json({message: "Usuário não está ligado a esse jogo."})
        }
        res.status(200).json(achievment)
    }
    catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
}

const addAchievment = async (req, res) => {

    try{
        const {title, points, difficulty} = req.body
        const gameId = req.params.id

        const game= await Games.findById(gameId)
        if(game.ownerId != req.userId)
        {
            return res.status(404).json({message: "Usuário não está ligado a esse jogo."})
        }

        const achievment = await Achievments.create({
            title: title,
            points: points,
            difficulty: difficulty,
            gameId: gameId
        })

        res.status(200).json(achievment)
    }
    catch (error){
        res.status(500)
        throw new Error(error.message)
    }
}

const editAchievment = async(req, res) => {
    try { 

        const achievmentId = req.params.id
        const achievment = await Achievments.findById(achievmentId)
        const game = await Games.findById(achievment.gameId)

        if(game.ownerId != req.userId)
        {
            return res.status(404).json({message: "Usuário não está ligado a esse jogo."})
        }

        const achievmentFinal = await Achievments.findByIdAndUpdate(achievmentId, req.body);
        res.status(200).json(achievmentFinal)
    }
    catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
}

const deleteAchievment = async (req, res) => {
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
    getAchievment,
    addAchievment,
    editAchievment,
    deleteAchievment
}