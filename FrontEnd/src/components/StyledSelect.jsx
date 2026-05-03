// ============================================================
// 🔧 COMPONENTE: Select estilizado com lista de opções
// ============================================================
function StyledSelect({ placeholder, options, value, onChange }) {
  return (
    <select
      value={value}
      onChange={onChange}
      className="
        w-full bg-[#1a0a2e] border border-purple-700/50 text-sm
        rounded-md px-3 py-2 appearance-none cursor-pointer
        focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-500/40
        transition-all duration-200
        text-white
      "
    >
      {/* Opção padrão vazia (placeholder) */}
      <option value="" className="text-purple-400">{placeholder}</option>
      {options.map((opt) => (
        <option key={opt} value={opt} className="text-white bg-[#1a0a2e]">
          {opt}
        </option>
      ))}
    </select>
  );
}
