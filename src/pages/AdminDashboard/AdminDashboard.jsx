import React from "react";
import "./AdminDashboard.scss";

export default function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <h1>Panel de Administración</h1>

      <section className="admin-section">
        <h2>Gestión de Blog</h2>
      </section>

      <section className="admin-section">
        <h2>Gestión de Recursos</h2>
      </section>
    </div>
  );
}
