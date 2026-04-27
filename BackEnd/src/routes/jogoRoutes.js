const { obterJogoAleatorio, listarJogos, listarPopulares } = require("../services/jogoService")
const express = require('express')
const router = express.Router()

router.get('/trending', async(req, res) => {
    const { page } = req.query;
    
    res.json(await listarPopulares(page));
})

router.get('/random', async(req, res) => {

    const {
        search,
        platforms,
        genres,
        notaMin,
        notaMax,
        anoInicio,
        anoFim,
    } = req.query;
    
    const filtros = {search, platforms, genres, notaMin, notaMax, anoInicio, anoFim}

    let jogoSorteado = await obterJogoAleatorio(filtros);
    res.json(jogoSorteado);

})

router.get('/', async(req, res) => {
    const {
        search,
        platforms,
        genres,
        notaMin,
        notaMax,
        anoInicio,
        anoFim,
        page
    } = req.query;
    
    const filtros = {search, platforms, genres, notaMin, notaMax, anoInicio, anoFim, page}

    res.json(await listarJogos(filtros));
})

module.exports = router