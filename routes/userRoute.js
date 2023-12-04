const express = require('express')
const User = require('../models/User')
const Games = require('../models/Game')
const Achievments = require('../models/Achievment')
const {register, login, editUser, deleteUser, getUser, getLibrary, getAGame, adminDeleteUser, adminEditUser, adminGetUsers} = require("../controllers/UserController")
const checkToken = require("../middlewares/checkToken")
const checkAdmin = require("../middlewares/checkAdmin")

const router = express.Router();

router.post('/registro', register)

router.post('/entrar', login)

router.put('/editar', checkToken, editUser)

router.delete('/apagar', checkToken, deleteUser)

router.get('/usuario', checkToken, getUser)

router.get('/usuario/biblioteca', checkToken, getLibrary)

router.get('/usuario/biblioteca/jogo/:id', checkToken, getAGame)

//Rotas de Administrador

router.get('/admin/usuarios', checkToken, checkAdmin(["admin"], "admin"), adminGetUsers)

router.put('/admin/editar/:id', checkToken, checkAdmin(["admin"], "admin"), adminEditUser)

router.delete('/admin/apagar/:id', checkToken, checkAdmin(["admin"], "admin"), adminDeleteUser)

module.exports = router;