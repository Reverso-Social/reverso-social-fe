import React, { useState, useEffect, useRef } from "react";
import "./AdminDashboard.scss";
import { blogApi } from "../../data/blogApiMock";
import { resourcesApi } from "../../data/resourcesApiMock";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("blog");

  const [posts, setPosts] = useState([]);
  const [blogLoading, setBlogLoading] = useState(true);
  const [blogError, setBlogError] = useState("");

  const [resources, setResources] = useState([]);
  const [resourcesLoading, setResourcesLoading] = useState(true);
  const [resourcesError, setResourcesError] = useState("");

  const [showResourceForm, setShowResourceForm] = useState(false);
  const [resourceFormMode, setResourceFormMode] = useState("create"); // 'create' | 'edit'
  const [editingResourceId, setEditingResourceId] = useState(null);

  const [resourceForm, setResourceForm] = useState({
    title: "",
    description: "",
    type: "GUIDE",
    file_url: "",
    preview_image_url: "",
    public: true,
  });
  const [resourceFile, setResourceFile] = useState(null);
  const [resourceImageFile, setResourceImageFile] = useState(null);
  const [resourceFormError, setResourceFormError] = useState("");

  const resourceFileInputRef = useRef(null);
  const resourceImageInputRef = useRef(null);


  useEffect(() => {
    let cancelled = false;

    blogApi
      .listPosts()
      .then((data) => {
        if (!cancelled) {
          setPosts(data);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setBlogError("No se pudieron cargar las entradas del blog.");
        }
      })
      .finally(() => {
        if (!cancelled) {
          setBlogLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  
  useEffect(() => {
    let cancelled = false;

    resourcesApi
      .listResources()
      .then((data) => {
        if (!cancelled) {
          setResources(data);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setResourcesError("No se pudieron cargar los recursos.");
        }
      })
      .finally(() => {
        if (!cancelled) {
          setResourcesLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const resetResourceForm = () => {
    setResourceForm({
      title: "",
      description: "",
      type: "GUIDE",
      file_url: "",
      preview_image_url: "",
      public: true,
    });
    setResourceFile(null);
    setResourceImageFile(null);
    setEditingResourceId(null);
    setResourceFormMode("create");
  };

  const handleOpenResourceFormCreate = () => {
    resetResourceForm();
    setShowResourceForm(true);
    setResourceFormError("");
  };

  const handleCloseResourceForm = () => {
    setShowResourceForm(false);
    setResourceFormError("");
    resetResourceForm();
  };

  const handleResourceFieldChange = (event) => {
    const { name, value, type, checked } = event.target;

    setResourceForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleResourceFileChange = (event) => {
    const file = event.target.files?.[0] || null;
    setResourceFile(file);
  };

  const handleResourceImageChange = (event) => {
    const file = event.target.files?.[0] || null;
    setResourceImageFile(file);
  };

  const handleEditResource = (resource) => {
    setResourceFormMode("edit");
    setEditingResourceId(resource.id);
    setResourceForm({
      title: resource.title || "",
      description: resource.description || "",
      type: resource.type || "GUIDE",
      file_url: resource.file_url || "",
      preview_image_url: resource.preview_image_url || "",
      public: !!resource.public,
    });
    setResourceFile(null);
    setResourceImageFile(null);
    setResourceFormError("");
    setShowResourceForm(true);
  };

  const handleDeleteResource = (resourceId) => {
    const confirmed = window.confirm(
      "¿Seguro que quieres eliminar este recurso? Esta acción no se puede deshacer todavía en el backend, pero desaparecerá de la lista."
    );
    if (!confirmed) return;

    setResources((prev) => prev.filter((r) => r.id !== resourceId));

    if (editingResourceId === resourceId) {
      handleCloseResourceForm();
    }
  };

  const handleResourceSubmit = (event) => {
    event.preventDefault();
    setResourceFormError("");

    if (!resourceForm.title.trim() || !resourceForm.type) {
      setResourceFormError("Título y tipo son obligatorios.");
      return;
    }

    const fileUrlFromText = resourceForm.file_url.trim();
    const fileUrlFromFile = resourceFile ? resourceFile.name : "";
    const finalFileUrl = fileUrlFromText || fileUrlFromFile;

    if (!finalFileUrl) {
      setResourceFormError("Debes indicar un archivo (URL o fichero).");
      return;
    }

    const previewUrlFromText = resourceForm.preview_image_url.trim();
    const previewUrlFromFile = resourceImageFile ? resourceImageFile.name : "";
    const finalPreviewUrl = previewUrlFromText || previewUrlFromFile;

    const now = new Date().toISOString();

    if (resourceFormMode === "create") {
      const newResource = {
        id: `temp-${Date.now()}`,
        title: resourceForm.title.trim(),
        description: resourceForm.description.trim(),
        type: resourceForm.type,
        file_url: finalFileUrl,
        preview_image_url: finalPreviewUrl,
        public: resourceForm.public,
        created_at: now,
        updated_at: now,
        user_id: "admin-mock",
      };

      setResources((prev) => [newResource, ...prev]);
    } else if (resourceFormMode === "edit" && editingResourceId) {
      setResources((prev) =>
        prev.map((resource) =>
          resource.id === editingResourceId
            ? {
                ...resource,
                title: resourceForm.title.trim(),
                description: resourceForm.description.trim(),
                type: resourceForm.type,
                file_url: finalFileUrl,
                preview_image_url: finalPreviewUrl,
                public: resourceForm.public,
                updated_at: now,
              }
            : resource
        )
      );
    }

    handleCloseResourceForm();
  };

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <h1>Panel de Administración</h1>
        <p className="admin-subtitle">
          Gestiona el contenido público de Reverso Social.
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

              <button
                type="button"
                className="admin-primary-btn"
                onClick={handleOpenResourceFormCreate}
              >
                + Cargar recurso
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
                              onClick={() => handleEditResource(resource)}
                            >
                              Editar
                            </button>
                            <button
                              type="button"
                              className="admin-action-btn admin-action-btn--secondary"
                              onClick={() =>
                                handleDeleteResource(resource.id)
                              }
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

            {showResourceForm && (
              <div className="admin-form-wrapper">
                <div className="admin-form-header">
                  <h3>
                    {resourceFormMode === "create"
                      ? "Cargar nuevo recurso"
                      : "Editar recurso"}
                  </h3>
                  <button
                    type="button"
                    className="admin-form-close"
                    onClick={handleCloseResourceForm}
                  >
                    ✕
                  </button>
                </div>

                {resourceFormError && (
                  <p className="admin-status admin-status--error">
                    {resourceFormError}
                  </p>
                )}

                <form
                  className="admin-form"
                  onSubmit={handleResourceSubmit}
                  noValidate
                >
                  <div className="admin-form-grid">
                    <div className="admin-form-field">
                      <label htmlFor="resource-title">Título *</label>
                      <input
                        id="resource-title"
                        name="title"
                        type="text"
                        value={resourceForm.title}
                        onChange={handleResourceFieldChange}
                        placeholder="Ej. Guía de Igualdad"
                        required
                      />
                    </div>

                    <div className="admin-form-field">
                      <label htmlFor="resource-type">Tipo *</label>
                      <select
                        id="resource-type"
                        name="type"
                        value={resourceForm.type}
                        onChange={handleResourceFieldChange}
                        required
                      >
                        <option value="GUIDE">Guía</option>
                        <option value="REPORT">Informe</option>
                        <option value="ARTICLE">Artículo</option>
                        <option value="VIDEO">Vídeo</option>
                        <option value="OTHER">Otro</option>
                      </select>
                    </div>

                    <div className="admin-form-field admin-form-field--full">
                      <label htmlFor="resource-description">
                        Descripción
                      </label>
                      <textarea
                        id="resource-description"
                        name="description"
                        rows={3}
                        value={resourceForm.description}
                        onChange={handleResourceFieldChange}
                        placeholder="Breve descripción del recurso"
                      />
                    </div>

                    <div className="admin-form-field admin-form-field--file">
                      <label>Archivo (PDF o vídeo)</label>
                      <div className="admin-file-control">
                        <button
                          type="button"
                          className="admin-file-btn"
                          onClick={() => resourceFileInputRef.current?.click()}
                        >
                          Subir archivo
                        </button>
                        <span className="admin-file-name">
                          {resourceFile
                            ? resourceFile.name
                            : "Ningún archivo seleccionado"}
                        </span>
                        <input
                          ref={resourceFileInputRef}
                          type="file"
                          accept=".pdf,video/*"
                          onChange={handleResourceFileChange}
                          className="admin-file-input"
                        />
                      </div>
                    </div>

                    <div className="admin-form-field">
                      <label htmlFor="resource-file-url">
                        URL del archivo
                      </label>
                      <input
                        id="resource-file-url"
                        name="file_url"
                        type="text"
                        value={resourceForm.file_url}
                        onChange={handleResourceFieldChange}
                        placeholder="/resources/mi-archivo.pdf"
                      />
                    </div>

                    <div className="admin-form-field admin-form-field--file">
                      <label>Imagen de portada</label>
                      <div className="admin-file-control">
                        <button
                          type="button"
                          className="admin-file-btn"
                          onClick={() =>
                            resourceImageInputRef.current?.click()
                          }
                        >
                          Subir imagen
                        </button>
                        <span className="admin-file-name">
                          {resourceImageFile
                            ? resourceImageFile.name
                            : "Ninguna imagen seleccionada"}
                        </span>
                        <input
                          ref={resourceImageInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleResourceImageChange}
                          className="admin-file-input"
                        />
                      </div>
                    </div>

                    <div className="admin-form-field">
                      <label htmlFor="resource-preview-image-url">
                        URL de imagen de portada
                      </label>
                      <input
                        id="resource-preview-image-url"
                        name="preview_image_url"
                        type="text"
                        value={resourceForm.preview_image_url}
                        onChange={handleResourceFieldChange}
                        placeholder="/img/resources/mi-imagen.webp"
                      />
                    </div>

                    <div className="admin-form-field admin-form-field--inline">
                      <label htmlFor="resource-public">Recurso público</label>
                      <input
                        id="resource-public"
                        name="public"
                        type="checkbox"
                        checked={resourceForm.public}
                        onChange={handleResourceFieldChange}
                      />
                    </div>
                  </div>

                  <div className="admin-form-actions">
                    <button
                      type="button"
                      className="admin-secondary-btn"
                      onClick={handleCloseResourceForm}
                    >
                      Cancelar
                    </button>
                    <button type="submit" className="admin-primary-btn">
                      {resourceFormMode === "create"
                        ? "Guardar recurso"
                        : "Guardar cambios"}
                    </button>
                  </div>
                </form>
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
