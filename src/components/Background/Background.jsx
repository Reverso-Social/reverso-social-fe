import React from "react";
import "./Background.scss";



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
