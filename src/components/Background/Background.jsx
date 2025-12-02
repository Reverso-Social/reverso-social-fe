import React from "react";
import "./Background.scss";

/**
 * Background component
 * --------------------
 * - Aplica el fondo global definido en SCSS.
 * - Permite extender estilos usando props className y style.
 * - Mantiene 100% compatibilidad con el uso actual.
 */

export default function Background({
  children,
  className = "",
  style = {}
}) {
  return (
    <div 
      className={`global-background ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
