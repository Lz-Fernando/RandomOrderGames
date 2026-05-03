// ============================================================
// 📄 COMPONENTE: Paginação — apenas visual, sem lógica real
//
// Props:
//   currentPage  — página ativa (destacada)
//   totalPages   — total de páginas disponíveis
//   onPageChange — callback com número da página clicada
// ============================================================
function Pagination({ currentPage, totalPages, onPageChange }) {
  // Gera array com os números de página: [1, 2, 3, ...]
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      aria-label="Paginação"
      className="flex items-center justify-center gap-2 mt-8 flex-wrap"
    >
      {/* Botão "Anterior" — desabilitado na primeira página */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="
          px-4 py-2 rounded-lg text-sm font-semibold
          border border-purple-700/60 text-purple-400
          hover:bg-purple-700/30 hover:text-white
          disabled:opacity-30 disabled:cursor-not-allowed
          transition-all duration-200
        "
      >
        ← Anterior
      </button>

      {/* Botões numerados de página */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          aria-current={page === currentPage ? "page" : undefined}
          className={`
            w-9 h-9 rounded-lg text-sm font-bold transition-all duration-200
            ${page === currentPage
              ? "bg-purple-600 text-white shadow-lg shadow-purple-900/50"
              : "border border-purple-700/60 text-purple-400 hover:bg-purple-700/30 hover:text-white"
            }
          `}
        >
          {page}
        </button>
      ))}

      {/* Botão "Próximo" — desabilitado na última página */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="
          px-4 py-2 rounded-lg text-sm font-semibold
          border border-purple-700/60 text-purple-400
          hover:bg-purple-700/30 hover:text-white
          disabled:opacity-30 disabled:cursor-not-allowed
          transition-all duration-200
        "
      >
        Próximo →
      </button>
    </nav>
  );
}