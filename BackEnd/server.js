const express = require('express')
const cors = require('cors')
require('dotenv').config()
const jogoRoutes = require('./src/routes/jogoRoutes')
const app = express()
const port = 3000

app.use(cors());

app.use('/api/jogos', jogoRoutes);

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})