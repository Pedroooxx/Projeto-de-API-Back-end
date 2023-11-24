const express = require('express')
const Achievments = require('../models/Achievment')
const {getAchievments, addAchievments, editAchievments, deleteAchievments} = require("../controllers/AchievmentsController")
const checkToken = require("../middlewares/checkToken")

const router = express.Router();

/*router.get('',checkToken, getAchievments)

router.post('',checkToken, addAchievments)

router.put('',checkToken, editAchievments)

router.delete('',checkToken, deleteAchievments)*/

module.exports = router;