const express = require('express')
require('dotenv').config()
require('./infra/database/index')
const { errors } = require('celebrate')

const app = express()   


app.use(express.json())
app.use(express.urlencoded({ extended: true}))

//importando as rotas
require('./routes/routes')(app)
app.use(errors())
const PORT = process.env.SERVER_PORT || 3000
app.listen(PORT, () => console.log(`RUNNING on port: ${PORT}`))