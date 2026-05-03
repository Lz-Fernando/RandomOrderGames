// ============================================================
// 🎯 COMPONENTE: Exibição do jogo sorteado (Tela 2)
//
// Props:
//   game — objeto do jogo sorteado
// ============================================================
function RandomGameDisplay({ game }) {
  if (!game) return null;

  return (
    // Container centralizado que ocupa toda a área de conteúdo
    <div className="flex flex-col items-center justify-center flex-1 px-6 py-12">

      {/* Título da seção */}
      <div className="text-center mb-10">
        <p className="text-purple-400 text-sm uppercase tracking-[0.3em] font-semibold mb-2">
          🎲 Jogo Sorteado
        </p>
        <h2 className="text-white text-3xl font-black tracking-tight">
          Sua escolha aleatória
        </h2>
      </div>

      {/* Card grande e centralizado do jogo sorteado */}
      <article className="
        relative bg-[#1a0a2e] rounded-2xl overflow-hidden
        border border-purple-700/50 shadow-2xl shadow-purple-900/60
        w-full max-w-sm
        animate-[fadeIn_0.5s_ease-in-out]
      ">
        {/* Brilho decorativo atrás do card */}
        <div className="
          absolute -inset-1 bg-gradient-to-br from-purple-600/30 to-violet-800/20
          rounded-2xl blur-xl -z-10
        " />

        {/* Imagem grande do jogo */}
        <div className="aspect-[3/4] overflow-hidden">
          <img
            src={game.image}
            alt={`Capa do jogo ${game.name}`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Informações detalhadas do jogo sorteado */}
        <div className="p-6 space-y-3">
          <h3 className="text-white text-2xl font-black">{game.name}</h3>

          {/* Tags de metadados */}
          <div className="flex flex-wrap gap-2">
            <span className="bg-purple-600/30 border border-purple-600/50 text-purple-300 text-xs px-3 py-1 rounded-full font-semibold">
              {game.platform}
            </span>
            <span className="bg-purple-600/30 border border-purple-600/50 text-purple-300 text-xs px-3 py-1 rounded-full font-semibold">
              {game.genre}
            </span>
            <span className="bg-yellow-500/20 border border-yellow-600/50 text-yellow-300 text-xs px-3 py-1 rounded-full font-semibold">
              ⭐ {game.score}
            </span>
          </div>

          <p className="text-purple-400 text-sm">📅 Lançamento: {game.year}</p>
        </div>
      </article>

      {/* Texto motivacional abaixo do card */}
      <p className="text-purple-500 text-sm mt-8 text-center max-w-xs">
        Use a sidebar para aplicar filtros antes de sortear um jogo da lista.
      </p>
    </div>
  );
}