const express = require('express')
const User = require('../models/User')
const {register, login, editUser, deleteUser, getUser} = require("../controllers/UserController")
const checkToken = require("../middlewares/checkToken")

const router = express.Router();

router.post('/registro', register)

router.post('/entrar', login)

router.put('/editar',checkToken, editUser)

router.delete('/apagar',checkToken, deleteUser)

router.get('/usuario',checkToken, getUser)

module.exports = router;