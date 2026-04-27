async function buscarJogos(pesquisa, plataforma, genero, nota, dates, ordering, page) {
    let url = `https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}`;

    if (pesquisa) {
        url += `&search=${pesquisa}`
    }

    if (plataforma) {
        url += `&platforms=${plataforma}`
    }
    
    if (genero) {
        url += `&genres=${genero}`
    }
    
    if (nota) {
        url += `&metacritic=${nota}` 
    }

    if (dates) {
        url += `&dates=${dates}`
    }
    
    if (ordering) {
        url += `&ordering=${ordering}`
    }

    if (page) {
        url += `&page=${page}`
    }

    try {
        const resposta = await fetch(url);

        if (!resposta.ok) {
            console.log("Erro na API do RAWG:", resposta.status);
            return { results: [], count: 0 };
        }

        const dados = await resposta.json()
        return dados;
    } catch (error) {
        console.log(error);
        return { results: [], count: 0};
    }
}

module.exports = { buscarJogos }