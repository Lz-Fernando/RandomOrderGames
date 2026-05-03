import GameCard from './GameCard';

// ============================================================
// 🗂️ COMPONENTE: Grid de jogos — renderiza lista de GameCards
//
// Props:
//   games — array de jogos a exibir
// ============================================================
function GameGrid({ games }) {
  // Caso não haja jogos para exibir
  if (games.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-purple-500">
        <span className="text-5xl mb-4">🎮</span>
        <p className="text-lg font-semibold">Nenhum jogo encontrado</p>
        <p className="text-sm text-purple-600 mt-1">Tente ajustar os filtros</p>
      </div>
    );
  }

  return (
    // Grid responsivo: 2 colunas em mobile, 3 em md, 4 em xl
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
}