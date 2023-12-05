const Achievments = require("../models/Achievment");
const Games = require("../models/Game");
const User = require("../models/User");

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

        let game = await Games.findById(gameId)
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

        //Regra de Negocio
        const achievs = game.achievments + 1

        game = await Games.findByIdAndUpdate(gameId, {achievments: achievs})

        if(game.achievments == 2 ){
            console.log(game.achievments)
            const user = await User.findById(game.ownerId)
            const addCompleted = user.completedGames + 1
            await User.findByIdAndUpdate(game.ownerId, {completedGames: addCompleted})
        }

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

const deleteAchievment = async(req, res) => {
    try { 

        const achievmentId = req.params.id
        const achievment = await Achievments.findById(achievmentId)
        const game = await Games.findById(achievment.gameId)

        if(game.ownerId != req.userId)
        {
            return res.status(404).json({message: "Usuário não está ligado a esse jogo."})
        }
        const achievmentOut = await Achievments.findByIdAndDelete(achievmentId);
        if(!achievmentOut){
            res.status(404)
            throw new Error({message: "Conquista não encontrada"})
        }
        res.status(200).json(achievmentOut)
    }
    catch (error) {
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