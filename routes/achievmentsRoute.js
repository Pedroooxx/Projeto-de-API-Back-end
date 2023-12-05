const express = require('express')
const {getAchievment, addAchievment, editAchievment, deleteAchievment} = require("../controllers/AchievmentsController")
const checkToken = require("../middlewares/checkToken")

const router = express.Router();

router.get('/:id',checkToken, getAchievment)

router.post('/:id',checkToken, addAchievment)

router.put('/:id',checkToken, editAchievment)

router.delete('/:id',checkToken, deleteAchievment)

module.exports = router;