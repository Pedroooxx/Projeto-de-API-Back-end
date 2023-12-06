require("dotenv").config()
const mongoose = require("mongoose")

const express = require("express")
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))

const installDbRoute = require('./routes/installDbRoute');
app.use('/install', installDbRoute);

const userRoute = require('./routes/userRoute');
app.use('/', userRoute);

const gameRoute = require('./routes/gameRoute');
app.use('/game', gameRoute); 

const achievmentsRoute = require('./routes/achievmentsRoute');
app.use('/game/achievment', achievmentsRoute);

const swaggerRoute = require('./routes/swaggerRoute');
app.use('/docs', swaggerRoute);

const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASSWORD
const PORT = process.env.PORT

mongoose
    .connect(
        `mongodb+srv://${dbUser}:${dbPassword}@cluster0.nbc79ru.mongodb.net/?retryWrites=true&w=majority`
    )
    .then(() => {
    app.listen(PORT)
    console.log("Conectado ao MongoDB...")
    })
.catch((err) => console.log(err))

