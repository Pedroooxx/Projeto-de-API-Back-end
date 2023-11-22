require("dotenv").config()

const express = require("express")
const app = express()

const mongoose = require("mongoose")

const bcrypt = require("bcrypt")

const jwt = require("jsonwebtoken")

app.get('/', (req, res) => {
    res.status(200).json({msg: "Bem vindo!"})
})

app.listen(3333)