const express = require('express')
require('dotenv').config()
require('./infra/database/index')
const cors = require('cors');
const { errors } = require('celebrate')

const app = express()   
app.disable('x-powered-by');
app.use(cors());

app.use(express.json())
app.use(express.urlencoded({ extended: true}))

//importando as rotas
require('./routes/routes')(app)
//require('./controllers/index')(app)
app.use(errors())
const PORT = process.env.SERVER_PORT || 3000
app.listen(PORT, () => console.log(`RUNNING on port: ${PORT}`))