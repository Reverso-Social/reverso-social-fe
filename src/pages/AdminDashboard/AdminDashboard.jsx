import React, { useState, useEffect } from "react";
import "./AdminDashboard.scss";
import { blogApi } from "../../services/blogApiMock";
import { resourcesApi } from "../../services/resourcesApiMock";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("blog"); 

 
  const [posts, setPosts] = useState([]);
  const [blogLoading, setBlogLoading] = useState(false);
  const [blogError, setBlogError] = useState("");

  
  const [resources, setResources] = useState([]);
  const [resourcesLoading, setResourcesLoading] = useState(false);
  const [resourcesError, setResourcesError] = useState("");

  
  useEffect(() => {
    if (activeTab !== "blog") return;

    setBlogLoading(true);
    setBlogError("");

    blogApi
      .listPosts()
      .then((data) => setPosts(data))
      .catch(() => setBlogError("No se pudieron cargar las entradas del blog."))
      .finally(() => setBlogLoading(false));
  }, [activeTab]);

  
  useEffect(() => {
    if (activeTab !== "resources") return;

    setResourcesLoading(true);
    setResourcesError("");

    resourcesApi
      .listResources()
      .then((data) => setResources(data))
      .catch(() => setResourcesError("No se pudieron cargar los recursos."))
      .finally(() => setResourcesLoading(false));
  }, [activeTab]);

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <h1>Panel de administración</h1>
        <p className="admin-subtitle">
          Gestiona el contenido público de Reverso Social de forma sencilla.
        </p>
      </header>

      <nav className="admin-tabs" aria-label="Secciones de administración">
        <button
          type="button"
          className={`admin-tab ${activeTab === "blog" ? "is-active" : ""}`}
          onClick={() => setActiveTab("blog")}
        >
          Blog
        </button>

        <button
          type="button"
          className={`admin-tab ${
            activeTab === "resources" ? "is-active" : ""
          }`}
          onClick={() => setActiveTab("resources")}
        >
          Recursos
        </button>

        <button
          type="button"
          className={`admin-tab ${activeTab === "email" ? "is-active" : ""}`}
          onClick={() => setActiveTab("email")}
        >
          Email
        </button>
      </nav>

      <section className="admin-content">
        
        {activeTab === "blog" && (
          <div className="admin-panel">
            <div className="admin-panel-header">
              <div>
                <h2>Gestión de blog</h2>
                <p className="admin-panel-help">
                  Revisa y administra las entradas publicadas en el blog.
                </p>
              </div>

              <button type="button" className="admin-primary-btn" disabled>
                + Nueva entrada
              </button>
            </div>

            {blogLoading && (
              <p className="admin-status">Cargando entradas...</p>
            )}

            {blogError && !blogLoading && (
              <p className="admin-status admin-status--error">{blogError}</p>
            )}

            {!blogLoading && !blogError && posts.length === 0 && (
              <p className="admin-status">
                No hay entradas de blog disponibles.
              </p>
            )}

            {!blogLoading && !blogError && posts.length > 0 && (
              <div className="admin-table-wrapper">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Título</th>
                      <th>Categoría</th>
                      <th>Fecha</th>
                      <th>Estado</th>
                      <th className="admin-table-actions-col">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {posts.map((post) => (
                      <tr key={post.id}>
                        <td className="admin-table-title">{post.title}</td>
                        <td>{post.category}</td>
                        <td>{post.date}</td>
                        <td>
                          <span className="status-pill status-pill--published">
                            {post.status === "PUBLISHED"
                              ? "Publicado"
                              : post.status}
                          </span>
                        </td>
                        <td className="admin-table-actions">
                          <button
                            type="button"
                            className="admin-action-btn"
                            disabled
                          >
                            Editar
                          </button>
                          <button
                            type="button"
                            className="admin-action-btn admin-action-btn--secondary"
                            disabled
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        
        {activeTab === "resources" && (
          <div className="admin-panel">
            <div className="admin-panel-header">
              <div>
                <h2>Gestión de recursos</h2>
                <p className="admin-panel-help">
                  Revisa y administra los recursos (guías, informes, vídeos, etc.).
                </p>
              </div>

              <button type="button" className="admin-primary-btn" disabled>
                + Nuevo recurso
              </button>
            </div>

            {resourcesLoading && (
              <p className="admin-status">Cargando recursos...</p>
            )}

            {resourcesError && !resourcesLoading && (
              <p className="admin-status admin-status--error">
                {resourcesError}
              </p>
            )}

            {!resourcesLoading &&
              !resourcesError &&
              resources.length === 0 && (
                <p className="admin-status">No hay recursos disponibles.</p>
              )}

            {!resourcesLoading &&
              !resourcesError &&
              resources.length > 0 && (
                <div className="admin-table-wrapper">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Título</th>
                        <th>Tipo</th>
                        <th>Visibilidad</th>
                        <th>Creado</th>
                        <th>Actualizado</th>
                        <th className="admin-table-actions-col">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {resources.map((resource) => (
                        <tr key={resource.id}>
                          <td className="admin-table-title">
                            {resource.title}
                          </td>
                          <td>{resource.type}</td>
                          <td>
                            <span
                              className={
                                "status-pill " +
                                (resource.public
                                  ? "status-pill--public"
                                  : "status-pill--private")
                              }
                            >
                              {resource.public ? "Público" : "Privado"}
                            </span>
                          </td>
                          <td>{resource.created_at}</td>
                          <td>{resource.updated_at}</td>
                          <td className="admin-table-actions">
                            <button
                              type="button"
                              className="admin-action-btn"
                              disabled
                            >
                              Editar
                            </button>
                            <button
                              type="button"
                              className="admin-action-btn admin-action-btn--secondary"
                              disabled
                            >
                              Eliminar
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
          </div>
        )}

        
        {activeTab === "email" && (
          <div className="admin-panel">
            <h2>Gestión de email</h2>
            <p className="admin-panel-help">
              Espacio reservado para futuras funciones relacionadas con email.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
