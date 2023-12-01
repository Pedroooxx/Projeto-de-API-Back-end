const express = require('express')
const Achievments = require('../models/Achievment')
const {getAchievment, addAchievments, editAchievments, deleteAchievments} = require("../controllers/AchievmentsController")
const checkToken = require("../middlewares/checkToken")

const router = express.Router();

router.get('/:id',checkToken, getAchievment)

router.post('/:id',checkToken, addAchievments)

router.put('/',checkToken, editAchievments)

router.delete('/',checkToken, deleteAchievments)

module.exports = router;