const express = require('express')
const User = require('../models/User')
const {register, login, getUser} = require("../controllers/UserController")

const router = express.Router();

router.post('/registro', register)

router.post('/entrar', login)

router.get('/usuario/:id', getUser)

module.exports = router;