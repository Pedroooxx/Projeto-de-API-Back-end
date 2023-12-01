const express = require('express')
const Game = require('../models/Game')
const {getGames, addGame, editGame, deleteGame} = require("../controllers/GameController")
const checkToken = require("../middlewares/checkToken")

const router = express.Router();

router.get('/',checkToken, getGames)

router.post('/',checkToken, addGame)

router.put('/:id',checkToken, editGame)

router.delete('/:id',checkToken, deleteGame)

module.exports = router;