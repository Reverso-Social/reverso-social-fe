import { Search, X } from "lucide-react";
import "./SearchBar.scss";

export default function SearchBar({
  value,
  onChange,
  placeholder = "Buscar...",
  ariaLabel = "Buscar",
  onClear,
}) {
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  const handleClear = () => {
    onChange("");
    onClear?.();
  };

  return (
    <div className="search-bar">
      <span className="search-bar__icon" aria-hidden="true">
        <Search size={16} />
      </span>
      <input
        type="text"
        className="search-bar__input"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        aria-label={ariaLabel}
      />
      {value && (
        <button
          type="button"
          className="search-bar__clear"
          onClick={handleClear}
          aria-label="Limpiar búsqueda"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}
