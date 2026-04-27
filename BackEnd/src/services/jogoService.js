const { buscarJogos } = require("../integrations/rawgClient");

function obterFiltroDeDataRecente() {
    const hoje = new Date();
    const seisMesesAtras = new Date();
    seisMesesAtras.setMonth(hoje.getMonth() - 6);

    const formataData = (data) => data.toISOString().split('T')[0];
    
    return `${formataData(seisMesesAtras)},${formataData(hoje)}`;
}

function formatarAnos(anoInicio, anoFim) {
    if (!anoInicio && !anoFim) return undefined;

    const inicio = anoInicio ? `${anoInicio}-01-01` : "1970-01-01";
    const fim = anoFim ? `${anoFim}-12-31` : new Date().toISOString().split('T')[0];
    
    return `${inicio},${fim}`;
}

function formatarMetacritic(notaMin, notaMax) {
    if (!notaMin && !notaMax) return undefined;

    if (notaMin && !notaMax) return `${notaMin},100`
    
    if (notaMin && notaMax) return `${notaMin},${notaMax}`
    
    if (!notaMin && notaMax) return `1,${notaMax}`
}

async function obterJogoAleatorio(filtros) {
    let metacritic = formatarMetacritic(filtros.notaMin, filtros.notaMax);
    let anos = formatarAnos(filtros.anoInicio, filtros.anoFim)

    let dados = await buscarJogos(filtros.search, filtros.platforms, filtros.genres, metacritic, anos, undefined);
    let totalJogos = dados.count;

    if (!totalJogos || totalJogos === 0) {
        return { erro: "nenhum jogo encontrado com esses filtros."};
    }

    let totalPaginas = Math.ceil(totalJogos / 20);
    let paginasMaximas = Math.min(totalPaginas, 500);
    let paginaSorteada = Math.floor(Math.random() * paginasMaximas) + 1;

    dados = await buscarJogos(filtros.search, filtros.platforms, filtros.genres, metacritic, anos, undefined, paginaSorteada);
    let listaJogos = dados.results;

    let numeroSorteado = Math.floor(Math.random() * listaJogos.length);

    return listaJogos[numeroSorteado];
}

async function listarJogos(filtros) {
    let metacritic = formatarMetacritic(filtros.notaMin, filtros.notaMax);
    let anos = formatarAnos(filtros.anoInicio, filtros.anoFim)

    let dados = await buscarJogos(filtros.search, filtros.platforms, filtros.genres, metacritic, anos, undefined, filtros.page);
    
    return dados.results;
}

async function listarPopulares(page) {
    const data = obterFiltroDeDataRecente();
    const ordem = "-added";

    let dados = await buscarJogos(undefined, undefined, undefined, undefined, data, ordem, page);
    
    return dados.results;
}

module.exports = { obterJogoAleatorio, listarJogos, listarPopulares }