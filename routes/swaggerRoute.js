const express = require('express')

const swaggerUi = require("swagger-ui-express")
const swaggerFile = require("../swagger_doc.json")

const router = express.Router();

router.use('/ui', swaggerUi.serve, swaggerUi.setup(swaggerFile))

router.get('/', swagger = (req, res) => {
    res.status(200).json({swaggerFile})
})

module.exports = router;