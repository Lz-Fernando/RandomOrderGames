// ============================================================
// 📺 PÁGINA 1: Tela de Resultados com Filtros
//
// Exibe grid de jogos filtrados + paginação
// ============================================================
function FilterResultsPage({ games }) {
  // Estado de página atual (apenas visual — sem lógica de slice real)
  const [currentPage, setCurrentPage] = useState(1);
  const TOTAL_PAGES = 3; // Valor mockado para fins visuais

  return (
    <main className="flex-1 flex flex-col p-6 overflow-y-auto">
      {/* Cabeçalho da página de resultados */}
      <header className="mb-6">
        <h1 className="text-white text-2xl font-black tracking-tight">
          Resultados
        </h1>
        <p className="text-purple-400 text-sm mt-1">
          {games.length} jogo{games.length !== 1 ? "s" : ""} encontrado{games.length !== 1 ? "s" : ""}
        </p>
      </header>

      {/* Grid de cards de jogos */}
      <GameGrid games={games} />

      {/* Paginação visual abaixo do grid */}
      <Pagination
        currentPage={currentPage}
        totalPages={TOTAL_PAGES}
        onPageChange={setCurrentPage}
      />
    </main>
  );
}