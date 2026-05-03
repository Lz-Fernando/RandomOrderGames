// ============================================================
// 🎲 PÁGINA 2: Tela de Resultado do Sorteio
//
// Exibe um único jogo em destaque, escolhido aleatoriamente
// ============================================================
function RandomResultPage({ game }) {
  return (
    // Área de conteúdo que ocupa o espaço restante e centraliza o card
    <main className="flex-1 flex flex-col overflow-y-auto">
      <RandomGameDisplay game={game} />
    </main>
  );
}