// ============================================================
// 🔧 COMPONENTE: Label reutilizável para campos do formulário
// ============================================================
function FieldLabel({ children }) {
  return (
    <label className="block text-xs font-semibold text-purple-300 uppercase tracking-widest mb-1">
      {children}
    </label>
  );
}