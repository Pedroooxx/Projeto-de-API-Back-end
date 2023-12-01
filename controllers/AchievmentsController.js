const Achievments = require("../models/Achievment");
const Games = require("../models/Game");

const getAchievment = async(req, res) => {

    const achievmentId = req.params.id

    const achievment = await Achievments.findById(achievmentsId)

    const owner = await Games.findById(achievment.gameId)
    if(owner.ownerId != req.userId)
    {
        return res.status(404).json({message: "Usuário não está ligado a esse jogo."})
    }

    try { 
        const games = await Games.find({ownerId: userId});
        res.status(200).json(games)
    }
    catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
}

const addAchievments = async (req, res) => {
    
    //const userId = req.userId
    //console.log(await Games.findById(gameId)

    try{
        const {title, points, difficulty} = req.body
        const gameId = req.params.id

        const owner = await Games.findById(gameId)
        if(owner.ownerId != req.userId)
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

const editAchievments = async (req, res) => {
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

const deleteAchievments = async (req, res) => {
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
    addAchievments,
    editAchievments,
    deleteAchievments
}