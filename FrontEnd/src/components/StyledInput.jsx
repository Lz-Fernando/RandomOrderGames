// ============================================================
// 🔧 COMPONENTE: Input de texto genérico estilizado
// ============================================================
function StyledInput({ placeholder, value, onChange, type = "text" }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="
        w-full bg-[#1a0a2e] border border-purple-700/50 text-white text-sm
        rounded-md px-3 py-2 placeholder-purple-500/60
        focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-500/40
        transition-all duration-200
      "
    />
  );
}