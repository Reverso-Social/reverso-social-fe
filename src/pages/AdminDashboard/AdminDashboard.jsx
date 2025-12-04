import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye } from "lucide-react";
import "./AdminDashboard.scss";
import authService from "../../data/authService";
import contactService from "../../data/contactService";
import resourceService from "../../data/resourceService";
import ContactDetailModal from "../../components/ContactDetailModal/ContactDetailModal";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("contactos");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Estados de contactos
  const [contacts, setContacts] = useState([]);
  const [contactsLoading, setContactsLoading] = useState(true);
  const [contactsError, setContactsError] = useState("");
  const [selectedContact, setSelectedContact] = useState(null);
  const [showContactDetail, setShowContactDetail] = useState(false);

  // Estados de recursos
  const [resources, setResources] = useState([]);
  const [resourcesLoading, setResourcesLoading] = useState(true);
  const [resourcesError, setResourcesError] = useState("");

  // Estados del formulario de recursos
  const [showResourceForm, setShowResourceForm] = useState(false);
  const [resourceFormMode, setResourceFormMode] = useState("create");
  const [editingResourceId, setEditingResourceId] = useState(null);
  const [resourceForm, setResourceForm] = useState({
    title: "",
    description: "",
    type: "GUIDE",
    fileUrl: "",
    previewImageUrl: "",
    isPublic: true,
  });
  const [resourceFormError, setResourceFormError] = useState("");
  const [resourceFormLoading, setResourceFormLoading] = useState(false);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      navigate("/");
      return;
    }
    setUser(currentUser);

    contactService
      .getAll()
      .then((data) => setContacts(data))
      .catch(() => setContactsError("No se pudieron cargar los contactos"))
      .finally(() => setContactsLoading(false));

    loadResources();
  }, [navigate]);

  const loadResources = () => {
    setResourcesLoading(true);
    resourceService
      .getAll()
      .then((data) => setResources(data))
      .catch(() => setResourcesError("No se pudieron cargar los recursos"))
      .finally(() => setResourcesLoading(false));
  };

  const handleLogout = () => {
    authService.logout();
    navigate("/");
  };

  const handleViewContact = (contact) => {
    setSelectedContact(contact);
    setShowContactDetail(true);
  };

  const handleContactStatusChange = async (id, newStatus) => {
    try {
      const updated = await contactService.updateStatus(id, newStatus);
      setContacts((prev) => prev.map((c) => (c.id === id ? updated : c)));
    } catch (error) {
      console.error("Error al actualizar estado:", error);
    }
  };

  const handleDeleteContact = async (id) => {
    if (!window.confirm("¿Eliminar este contacto?")) return;
    try {
      await contactService.delete(id);
      setContacts((prev) => prev.filter((c) => c.id !== id));
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };

  const resetResourceForm = () => {
    setResourceForm({
      title: "",
      description: "",
      type: "GUIDE",
      fileUrl: "",
      previewImageUrl: "",
      isPublic: true,
    });
    setEditingResourceId(null);
    setResourceFormMode("create");
    setResourceFormError("");
  };

  const handleOpenResourceFormCreate = () => {
    resetResourceForm();
    setShowResourceForm(true);
  };

  const handleOpenResourceFormEdit = (resource) => {
    setResourceFormMode("edit");
    setEditingResourceId(resource.id);
    setResourceForm({
      title: resource.title || "",
      description: resource.description || "",
      type: resource.type || "GUIDE",
      fileUrl: resource.fileUrl || "",
      previewImageUrl: resource.previewImageUrl || "",
      isPublic: resource.isPublic !== undefined ? resource.isPublic : true,
    });
    setResourceFormError("");
    setShowResourceForm(true);
  };

  const handleCloseResourceForm = () => {
    setShowResourceForm(false);
    resetResourceForm();
  };

  const handleResourceFieldChange = (event) => {
    const { name, value, type, checked } = event.target;
    setResourceForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleResourceSubmit = async (e) => {
    e.preventDefault();
    setResourceFormError("");

    if (!resourceForm.title.trim() || !resourceForm.type) {
      setResourceFormError("Título y tipo son obligatorios.");
      return;
    }

    if (!resourceForm.fileUrl.trim()) {
      setResourceFormError("La URL del archivo es obligatoria.");
      return;
    }

    setResourceFormLoading(true);

    try {
      if (resourceFormMode === "create") {
        await resourceService.create(resourceForm);
      } else if (resourceFormMode === "edit" && editingResourceId) {
        await resourceService.update(editingResourceId, resourceForm);
      }

      loadResources();
      handleCloseResourceForm();
    } catch (error) {
      console.error("Error al guardar recurso:", error);
      setResourceFormError("Error al guardar el recurso. Intenta de nuevo.");
    } finally {
      setResourceFormLoading(false);
    }
  };

  const handleDeleteResource = async (id) => {
    if (!window.confirm("¿Eliminar este recurso?")) return;

    try {
      await resourceService.delete(id);
      setResources((prev) => prev.filter((r) => r.id !== id));
      if (editingResourceId === id) {
        handleCloseResourceForm();
      }
    } catch (error) {
      console.error("Error al eliminar recurso:", error);
      alert("Error al eliminar el recurso");
    }
  };

  if (!user) return null;

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div>
          <h1>Panel de Administración</h1>
          <p className="admin-subtitle">Bienvenida, {user.fullName}</p>
        </div>
        <button onClick={handleLogout} className="admin-logout-btn">
          Cerrar Sesión
        </button>
      </header>

      <nav className="admin-tabs" aria-label="Secciones">
        <button
          className={`admin-tab ${activeTab === "contactos" ? "is-active" : ""}`}
          onClick={() => setActiveTab("contactos")}
        >
          Contactos
        </button>
        <button
          className={`admin-tab ${activeTab === "recursos" ? "is-active" : ""}`}
          onClick={() => setActiveTab("recursos")}
        >
          Recursos
        </button>
        <button
          className={`admin-tab ${activeTab === "blog" ? "is-active" : ""}`}
          onClick={() => setActiveTab("blog")}
        >
          Blog
        </button>
      </nav>

      <section className="admin-content">
        {activeTab === "contactos" && (
          <div className="admin-panel">
            <div className="admin-panel-header">
              <h2>Gestión de Contactos</h2>
            </div>

            {contactsLoading && <p className="admin-status">Cargando contactos...</p>}
            {contactsError && <p className="admin-status admin-status--error">{contactsError}</p>}

            {!contactsLoading && !contactsError && contacts.length === 0 && (
              <p className="admin-status">No hay contactos disponibles.</p>
            )}

            {!contactsLoading && !contactsError && contacts.length > 0 && (
              <div className="admin-table-wrapper">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Email</th>
                      <th>Mensaje</th>
                      <th>Estado</th>
                      <th>Fecha</th>
                      <th className="admin-table-view-col">Ver</th>
                      <th className="admin-table-actions-col">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contacts.map((contact) => (
                      <tr key={contact.id}>
                        <td className="admin-table-title">{contact.fullName}</td>
                        <td>{contact.email}</td>
                        <td className="admin-table-message">{contact.message}</td>
                        <td>
                          <select
                            value={contact.status}
                            onChange={(e) => handleContactStatusChange(contact.id, e.target.value)}
                            className="status-select"
                          >
                            <option value="PENDING">Pendiente</option>
                            <option value="IN_PROGRESS">En Proceso</option>
                            <option value="RESOLVED">Resuelto</option>
                          </select>
                        </td>
                        <td>{new Date(contact.createdAt).toLocaleDateString()}</td>
                        <td className="admin-table-view">
                          <button
                            className="admin-view-btn"
                            onClick={() => handleViewContact(contact)}
                            aria-label="Ver detalle del contacto"
                          >
                            <Eye size={18} />
                          </button>
                        </td>
                        <td className="admin-table-actions">
                          {authService.isAdmin() && (
                            <button
                              className="admin-action-btn admin-action-btn--delete"
                              onClick={() => handleDeleteContact(contact.id)}
                            >
                              Eliminar
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === "recursos" && (
          <div className="admin-panel">
            <div className="admin-panel-header">
              <h2>Gestión de Recursos</h2>
              <button className="admin-primary-btn" onClick={handleOpenResourceFormCreate}>
                + Añadir Recurso
              </button>
            </div>

            {resourcesLoading && <p className="admin-status">Cargando recursos...</p>}
            {resourcesError && <p className="admin-status admin-status--error">{resourcesError}</p>}

            {!resourcesLoading && !resourcesError && resources.length === 0 && (
              <p className="admin-status">No hay recursos disponibles.</p>
            )}

            {!resourcesLoading && !resourcesError && resources.length > 0 && (
              <div className="admin-table-wrapper">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Título</th>
                      <th>Tipo</th>
                      <th>Visibilidad</th>
                      <th>Descargas</th>
                      <th>Fecha</th>
                      <th className="admin-table-actions-col">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {resources.map((resource) => (
                      <tr key={resource.id}>
                        <td className="admin-table-title">{resource.title}</td>
                        <td>{resource.type}</td>
                        <td>
                          <span
                            className={`status-pill ${
                              resource.isPublic ? "status-pill--public" : "status-pill--private"
                            }`}
                          >
                            {resource.isPublic ? "Público" : "Privado"}
                          </span>
                        </td>
                        <td>{resource.downloadCount || 0}</td>
                        <td>{new Date(resource.createdAt).toLocaleDateString()}</td>
                        <td className="admin-table-actions">
                          <button
                            className="admin-action-btn"
                            onClick={() => handleOpenResourceFormEdit(resource)}
                          >
                            Editar
                          </button>
                          <button
                            className="admin-action-btn admin-action-btn--delete"
                            onClick={() => handleDeleteResource(resource.id)}
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
                  <h3>{resourceFormMode === "create" ? "Añadir Recurso" : "Editar Recurso"}</h3>
                  <button className="admin-form-close" onClick={handleCloseResourceForm}>
                    ✕
                  </button>
                </div>

                {resourceFormError && (
                  <p className="admin-status admin-status--error">{resourceFormError}</p>
                )}

                <form className="admin-form" onSubmit={handleResourceSubmit}>
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
                        disabled={resourceFormLoading}
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
                        disabled={resourceFormLoading}
                      >
                        <option value="GUIDE">Guía</option>
                        <option value="REPORT">Informe</option>
                        <option value="ARTICLE">Artículo</option>
                        <option value="VIDEO">Vídeo</option>
                        <option value="OTHER">Otro</option>
                      </select>
                    </div>

                    <div className="admin-form-field admin-form-field--full">
                      <label htmlFor="resource-description">Descripción</label>
                      <textarea
                        id="resource-description"
                        name="description"
                        rows={3}
                        value={resourceForm.description}
                        onChange={handleResourceFieldChange}
                        placeholder="Breve descripción del recurso"
                        disabled={resourceFormLoading}
                      />
                    </div>

                    <div className="admin-form-field">
                      <label htmlFor="resource-file-url">URL del archivo *</label>
                      <input
                        id="resource-file-url"
                        name="fileUrl"
                        type="text"
                        value={resourceForm.fileUrl}
                        onChange={handleResourceFieldChange}
                        placeholder="/resources/mi-archivo.pdf"
                        required
                        disabled={resourceFormLoading}
                      />
                    </div>

                    <div className="admin-form-field">
                      <label htmlFor="resource-preview-image-url">URL de imagen</label>
                      <input
                        id="resource-preview-image-url"
                        name="previewImageUrl"
                        type="text"
                        value={resourceForm.previewImageUrl}
                        onChange={handleResourceFieldChange}
                        placeholder="/img/resources/mi-imagen.webp"
                        disabled={resourceFormLoading}
                      />
                    </div>

                    <div className="admin-form-field admin-form-field--inline">
                      <input
                        id="resource-public"
                        name="isPublic"
                        type="checkbox"
                        checked={resourceForm.isPublic}
                        onChange={handleResourceFieldChange}
                        disabled={resourceFormLoading}
                      />
                      <label htmlFor="resource-public">Recurso público</label>
                    </div>
                  </div>

                  <div className="admin-form-actions">
                    <button
                      type="button"
                      className="admin-secondary-btn"
                      onClick={handleCloseResourceForm}
                      disabled={resourceFormLoading}
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="admin-primary-btn"
                      disabled={resourceFormLoading}
                    >
                      {resourceFormLoading
                        ? "Guardando..."
                        : resourceFormMode === "create"
                        ? "Crear Recurso"
                        : "Guardar Cambios"}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}

        {activeTab === "blog" && (
          <div className="admin-panel">
            <h2>Gestión de Blog</h2>
            <p className="admin-panel-help">Funcionalidad en desarrollo.</p>
          </div>
        )}
      </section>

      <ContactDetailModal 
        contact={selectedContact}
        open={showContactDetail}
        onClose={() => setShowContactDetail(false)}
      />
    </div>
  );
}