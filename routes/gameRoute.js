const express = require('express')
const {getGame, addGame, editGame, deleteGame} = require("../controllers/GameController")
const checkToken = require("../middlewares/checkToken")

const router = express.Router();

router.get('/:id',checkToken, getGame)

router.post('/',checkToken, addGame)

router.put('/:id',checkToken, editGame)

router.delete('/:id',checkToken, deleteGame)

module.exports = router;