const express = require('express')
const User = require('../models/User')
const Games = require('../models/Game')
const Achievments = require('../models/Achievment')
const {editUser, deleteUser, getUsers} = require("../controllers/AdminController")
const checkToken = require("../middlewares/checkToken")

const router = express.Router();

router.get('usuarios', checkToken, getUsers)

router.put('editar/:id', checkToken, editUser)

router.delete('apagar/:id', checkToken, deleteUser)


module.exports = router;