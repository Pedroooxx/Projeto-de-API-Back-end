const swaggerAutogen = require("swagger-autogen")()

require("dotenv").config()
const PORT = process.env.PORT

output = './swagger_doc.json'

endpoints = ['./routes/userRoute', './routes/gameRoute', './routes/achievmentsRoute']

const doc = {
    info: {
        title: "API REST de Gerenciamento de biblioteca de jogos.",
        description: "Api Rest com banco Mongo onde um ussuário pode adicionar jogos a uma biblioteca particupar bem como conquistas para esses jogos, enquanto parcipa de um Ranking público."
    },
    host: "http://localhost:"+PORT
}

swaggerAutogen(output, endpoints, doc)