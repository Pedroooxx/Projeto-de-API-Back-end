const express = require('express')
const User = require('../models/User')
const {register, login, getUser} = require("../controllers/UserController")
const checkToken = require("../middlewares/checkToken")

const router = express.Router();

router.post('/registro', register)

router.post('/entrar', login)

router.get('/usuario/:id',checkToken, getUser)

module.exports = router;