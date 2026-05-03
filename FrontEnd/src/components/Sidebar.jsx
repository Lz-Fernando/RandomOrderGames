// ============================================================
// 📦 COMPONENTE: Sidebar de filtros — COMPARTILHADA entre telas
//
// Props:
//   filters     — objeto com os valores atuais dos filtros
//   setFilters  — função para atualizar os filtros
//   onFilter    — callback disparado ao clicar em "FILTRAR"
//   onRandom    — callback disparado ao clicar em "SORTear"
// ============================================================
function Sidebar({ filters, setFilters, onFilter, onRandom }) {
  // Helper para atualizar um campo específico do estado de filtros
  const update = (field) => (e) =>
    setFilters((prev) => ({ ...prev, [field]: e.target.value }));

  return (
    // Sidebar fixa à esquerda, fundo escuro com tom roxo profundo
    <aside className="
      w-64 min-w-[16rem] bg-[#120822] border-r border-purple-900/60
      flex flex-col gap-5 p-5 h-full min-h-screen
    ">
      {/* Cabeçalho da sidebar com ícone de controle */}
      <div className="flex items-center gap-2 mb-2">
        <span className="text-2xl">🎮</span>
        <span className="text-purple-300 font-bold text-sm uppercase tracking-widest">
          Filtros
        </span>
      </div>

      {/* ── Campo: Nome ── */}
      <div>
        <FieldLabel>Nome</FieldLabel>
        <StyledInput
          placeholder="Digite um nome..."
          value={filters.name}
          onChange={update("name")}
        />
      </div>

      {/* ── Campo: Plataforma ── */}
      <div>
        <FieldLabel>Plataforma</FieldLabel>
        <StyledSelect
          placeholder="Selecione uma plataforma"
          options={PLATFORMS}
          value={filters.platform}
          onChange={update("platform")}
        />
      </div>

      {/* ── Campo: Gênero ── */}
      <div>
        <FieldLabel>Gênero</FieldLabel>
        <StyledSelect
          placeholder="Selecione um gênero"
          options={GENRES}
          value={filters.genre}
          onChange={update("genre")}
        />
      </div>

      {/* ── Campo: Nota (mínima e máxima) ── */}
      <div>
        <FieldLabel>Nota</FieldLabel>
        <div className="flex gap-2">
          <StyledInput
            type="number"
            placeholder="Mín"
            value={filters.scoreMin}
            onChange={update("scoreMin")}
          />
          <StyledInput
            type="number"
            placeholder="Máx"
            value={filters.scoreMax}
            onChange={update("scoreMax")}
          />
        </div>
      </div>

      {/* ── Campo: Lançamento (ano inicial e final) ── */}
      <div>
        <FieldLabel>Lançamento</FieldLabel>
        <div className="flex gap-2">
          <StyledInput
            type="number"
            placeholder="De"
            value={filters.yearFrom}
            onChange={update("yearFrom")}
          />
          <StyledInput
            type="number"
            placeholder="Até"
            value={filters.yearTo}
            onChange={update("yearTo")}
          />
        </div>
      </div>

      {/* ── Espaço flexível para empurrar botões ao fundo ── */}
      <div className="flex-1" />

      {/* ── Botões de ação ── */}
      <div className="flex flex-col gap-3">
        {/* Botão SORTear: roxo sólido, chama onRandom */}
        <button
          onClick={onRandom}
          className="
            w-full py-2.5 rounded-lg font-bold text-sm uppercase tracking-widest
            bg-purple-600 hover:bg-purple-500 active:scale-95
            text-white shadow-lg shadow-purple-900/50
            transition-all duration-200
          "
        >
          🎲 Sortear
        </button>

        {/* Botão FILTRAR: borda roxa com fundo transparente */}
        <button
          onClick={onFilter}
          className="
            w-full py-2.5 rounded-lg font-bold text-sm uppercase tracking-widest
            border-2 border-purple-500 hover:bg-purple-500/20 active:scale-95
            text-purple-300 hover:text-white
            transition-all duration-200
          "
        >
          🔍 Filtrar
        </button>
      </div>
    </aside>
  );
}