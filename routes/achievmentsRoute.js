const express = require('express')
const Achievments = require('../models/Achievment')
const {getAchievment, addAchievment, editAchievment, deleteAchievment} = require("../controllers/AchievmentsController")
const checkToken = require("../middlewares/checkToken")

const router = express.Router();

router.get('/:id',checkToken, getAchievment)

router.post('/:id',checkToken, addAchievment)

router.put('/',checkToken, editAchievment)

router.delete('/',checkToken, deleteAchievment)

module.exports = router;