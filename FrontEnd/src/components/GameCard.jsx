// ============================================================
// 🃏 COMPONENTE: Card individual de jogo
//
// Props:
//   game — objeto { id, name, platform, genre, score, year, image }
// ============================================================
function GameCard({ game }) {
  return (
    <article className="
      group relative bg-[#1a0a2e] rounded-xl overflow-hidden
      border border-purple-900/40 hover:border-purple-500/70
      shadow-md hover:shadow-purple-900/60 hover:shadow-xl
      transition-all duration-300 hover:-translate-y-1 cursor-pointer
    ">
      {/* Imagem do jogo com efeito de escala ao hover */}
      <div className="overflow-hidden aspect-[3/4] bg-[#0d0618]">
        <img
          src={game.image}
          alt={`Capa do jogo ${game.name}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Informações do card */}
      <div className="p-3">
        {/* Nome do jogo */}
        <h3 className="text-white font-bold text-sm truncate">{game.name}</h3>

        {/* Linha com plataforma e nota */}
        <div className="flex items-center justify-between mt-1">
          <span className="text-purple-400 text-xs">{game.platform}</span>
          <span className="
            bg-purple-600/30 text-purple-300 text-xs font-bold
            px-2 py-0.5 rounded-full border border-purple-600/50
          ">
            ⭐ {game.score}
          </span>
        </div>
      </div>

      {/* Badge de gênero no canto superior */}
      <div className="absolute top-2 left-2">
        <span className="
          bg-black/60 backdrop-blur-sm text-purple-300 text-[10px]
          px-2 py-0.5 rounded-full border border-purple-700/50
        ">
          {game.genre}
        </span>
      </div>
    </article>
  );
}
