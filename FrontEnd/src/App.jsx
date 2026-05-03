import './App.css'
import Sidebar from './components/sidebar'
import GridPrincipal from './components/GameGrid'
import GameCard from './components/gameCard'

// ============================================================
// 🏠 COMPONENTE RAIZ: App
//
// Controla qual tela está ativa e centraliza o estado dos filtros.
// Em produção, aqui entraria o React Router ou equivalente.
// ============================================================
export default function App() {
  // ── Estado de navegação entre telas ──
  // "filter" = Tela de Filtros | "random" = Tela de Sorteio
  const [activePage, setActivePage] = useState("filter");

  // ── Estado dos campos de filtro da sidebar ──
  const [filters, setFilters] = useState({
    name: "",
    platform: "",
    genre: "",
    scoreMin: "",
    scoreMax: "",
    yearFrom: "",
    yearTo: "",
  });

  // ── Estado dos jogos exibidos (resultado dos filtros) ──
  const [displayedGames, setDisplayedGames] = useState(MOCK_GAMES);

  // ── Estado do jogo sorteado ──
  const [randomGame, setRandomGame] = useState(null);

  // ──────────────────────────────────────────────────────────
  // Lógica de filtragem dos jogos mockados.
  // Em produção, substituir por chamada à API com os filtros.
  // ──────────────────────────────────────────────────────────
  function handleFilter() {
    const filtered = MOCK_GAMES.filter((game) => {
      const matchName = filters.name
        ? game.name.toLowerCase().includes(filters.name.toLowerCase())
        : true;
      const matchPlatform = filters.platform
        ? game.platform === filters.platform
        : true;
      const matchGenre = filters.genre
        ? game.genre === filters.genre
        : true;
      const matchScoreMin = filters.scoreMin
        ? game.score >= parseFloat(filters.scoreMin)
        : true;
      const matchScoreMax = filters.scoreMax
        ? game.score <= parseFloat(filters.scoreMax)
        : true;
      const matchYearFrom = filters.yearFrom
        ? game.year >= parseInt(filters.yearFrom)
        : true;
      const matchYearTo = filters.yearTo
        ? game.year <= parseInt(filters.yearTo)
        : true;

      return (
        matchName && matchPlatform && matchGenre &&
        matchScoreMin && matchScoreMax &&
        matchYearFrom && matchYearTo
      );
    });

    setDisplayedGames(filtered);
    setActivePage("filter"); // Garante que vai para a tela de resultados
  }

  // ──────────────────────────────────────────────────────────
  // Lógica de sorteio: escolhe um jogo aleatório da lista filtrada.
  // Em produção, a API poderia retornar um jogo aleatório.
  // ──────────────────────────────────────────────────────────
  function handleRandom() {
    if (displayedGames.length === 0) return;
    const randomIndex = Math.floor(Math.random() * displayedGames.length);
    setRandomGame(displayedGames[randomIndex]);
    setActivePage("random"); // Navega para a tela de sorteio
  }

  return (
    // Container raiz: fundo escuro com fundo sutil de textura roxa
    <div className="flex min-h-screen bg-[#0d0618] font-sans">

      {/* ── Sidebar compartilhada entre as duas telas ── */}
      <Sidebar
        filters={filters}
        setFilters={setFilters}
        onFilter={handleFilter}
        onRandom={handleRandom}
      />

      {/* ── Área de conteúdo principal (muda conforme tela ativa) ── */}
      <div className="flex-1 flex flex-col">

        {/* ── Barra de navegação superior entre telas ── */}
        <nav className="
          flex gap-1 p-3 border-b border-purple-900/40 bg-[#0d0618]/80
          backdrop-blur-sm sticky top-0 z-10
        ">
          {/* Botão para Tela 1 — Filtros */}
          <button
            onClick={() => setActivePage("filter")}
            className={`
              px-4 py-1.5 rounded-lg text-sm font-bold uppercase tracking-wider
              transition-all duration-200
              ${activePage === "filter"
                ? "bg-purple-600 text-white shadow shadow-purple-800"
                : "text-purple-400 hover:text-white hover:bg-purple-800/30"
              }
            `}
          >
            🗂️ Resultados
          </button>

          {/* Botão para Tela 2 — Sorteio */}
          <button
            onClick={() => setActivePage("random")}
            className={`
              px-4 py-1.5 rounded-lg text-sm font-bold uppercase tracking-wider
              transition-all duration-200
              ${activePage === "random"
                ? "bg-purple-600 text-white shadow shadow-purple-800"
                : "text-purple-400 hover:text-white hover:bg-purple-800/30"
              }
            `}
          >
            🎲 Sorteio
          </button>
        </nav>

        {/* ── Renderização condicional de páginas ── */}
        {activePage === "filter" && (
          <FilterResultsPage games={displayedGames} />
        )}

        {activePage === "random" && (
          <RandomResultPage game={randomGame} />
        )}
      </div>
    </div>
  );
}