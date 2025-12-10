// src/pages/AdminDashboard/AdminDashboard.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye } from "lucide-react";
import "./AdminDashboard.scss";
import authService from "../../data/authService";
import contactService from "../../data/contactService";
import resourceService from "../../data/resourceService";
import ContactDetailModal from "../../components/ContactDetailModal/ContactDetailModal";
import GlobalModal from "../../components/GlobalModal/GlobalModal";
import SearchBar from "../../components/SearchBar/SearchBar";
import Pagination from "../../components/Pagination/Pagination";

const RESOURCES_PAGE_SIZE = 6;
const BLOG_PAGE_SIZE = 6;

function countWords(text) {
  if (!text) return 0;
  const words = text.trim().split(/\s+/).filter(Boolean);
  return words.length;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("contactos");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const [contacts, setContacts] = useState([]);
  const [contactsLoading, setContactsLoading] = useState(true);
  const [contactsError, setContactsError] = useState("");
  const [selectedContact, setSelectedContact] = useState(null);
  const [showContactDetail, setShowContactDetail] = useState(false);

  const [resources, setResources] = useState([]);
  const [resourcesLoading, setResourcesLoading] = useState(true);
  const [resourcesError, setResourcesError] = useState("");

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
  const [resourceFormErrors, setResourceFormErrors] = useState({});
  const [resourceFormLoading, setResourceFormLoading] = useState(false);
  const [resourceFiles, setResourceFiles] = useState({
    localFile: null,
    localImage: null,
  });

  const [resourceSearch, setResourceSearch] = useState("");
  const [resourcePage, setResourcePage] = useState(1);

  const [blogs, setBlogs] = useState([]);
  const [blogSearch, setBlogSearch] = useState("");
  const [blogPage, setBlogPage] = useState(1);
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [blogFormMode, setBlogFormMode] = useState("create");
  const [editingBlogId, setEditingBlogId] = useState(null);
  const [blogForm, setBlogForm] = useState({
    title: "",
    subtitle: "",
    content: "",
    category: "",
    status: "PUBLISHED",
    imageUrl: "",
  });
  const [blogFormErrors, setBlogFormErrors] = useState({});
  const [blogFormLoading] = useState(false);
  const [blogLocalImage, setBlogLocalImage] = useState(null);

  const [confirmModal, setConfirmModal] = useState({
    open: false,
    title: "",
    description: "",
    confirmLabel: "",
    variant: "default",
    onConfirm: null,
  });

  const [saveConfirmModal, setSaveConfirmModal] = useState({
    open: false,
    onConfirm: null,
  });

  useEffect(() => {
    const currentUser = authService.getCurrentUser();

    if (!currentUser) {
      navigate("/");
      return;
    }
    setUser(currentUser);

    contactService
      .getAll()
      .then((data) => {
        setContacts(data);
      })
      .catch((error) => {
        console.error("Error al cargar contactos:", error);
        setContactsError("No se pudieron cargar los contactos");
      })
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

  const deleteContact = async (id) => {
    try {
      await contactService.delete(id);
      setContacts((prev) => prev.filter((c) => c.id !== id));
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };

  const deleteResource = async (id) => {
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

  const deleteBlog = (id) => {
    setBlogs((prev) => prev.filter((b) => b.id !== id));
    if (editingBlogId === id) {
      handleCloseBlogForm();
    }
  };

  const openDeleteContactModal = (contact) => {
    setConfirmModal({
      open: true,
      title: "Eliminar contacto",
      description: `¿Seguro que quieres eliminar el contacto «${contact.fullName}»? Esta acción no se puede deshacer.`,
      confirmLabel: "Eliminar",
      variant: "danger",
      onConfirm: () => deleteContact(contact.id),
    });
  };

  const openDeleteResourceModal = (resource) => {
    setConfirmModal({
      open: true,
      title: "Eliminar recurso",
      description: `¿Seguro que quieres eliminar el recurso «${resource.title}»? Esta acción no se puede deshacer.`,
      confirmLabel: "Eliminar",
      variant: "danger",
      onConfirm: () => deleteResource(resource.id),
    });
  };

  const openDeleteBlogModal = (blog) => {
    setConfirmModal({
      open: true,
      title: "Eliminar entrada de blog",
      description: `¿Seguro que quieres eliminar la entrada «${blog.title}»? Esta acción no se puede deshacer.`,
      confirmLabel: "Eliminar",
      variant: "danger",
      onConfirm: () => deleteBlog(blog.id),
    });
  };

  const closeConfirmModal = () => {
    setConfirmModal({
      open: false,
      title: "",
      description: "",
      confirmLabel: "",
      variant: "default",
      onConfirm: null,
    });
  };

  const closeSaveConfirmModal = () => {
    setSaveConfirmModal({
      open: false,
      onConfirm: null,
    });
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
    setResourceFormErrors({});
    setResourceFiles({
      localFile: null,
      localImage: null,
    });
    setEditingResourceId(null);
    setResourceFormMode("create");
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
    setResourceFormErrors({});
    setResourceFiles({
      localFile: null,
      localImage: null,
    });
    setShowResourceForm(true);
  };

  const handleCloseResourceForm = () => {
    setShowResourceForm(false);
    resetResourceForm();
  };

  const handleResourceFieldChange = (event) => {
    const { name, value, type, checked } = event.target;

    if (name === "description") {
      const words = value.trim().split(/\s+/).filter(Boolean);
      const limited =
        words.length > 50 ? words.slice(0, 50).join(" ") : value;

      setResourceForm((prev) => ({
        ...prev,
        [name]: limited,
      }));
      setResourceFormErrors((prev) => ({
        ...prev,
        description: "",
      }));
      return;
    }

    setResourceForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setResourceFormErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleLocalFileChange = (event) => {
    const { name, files } = event.target;
    const file = files && files[0] ? files[0] : null;
    setResourceFiles((prev) => ({
      ...prev,
      [name]: file,
    }));
  };

  const validateResourceForm = () => {
    const errors = {};

    if (!resourceForm.title.trim()) {
      errors.title = "Agrega un título.";
    }

    if (!resourceForm.type) {
      errors.type = "Selecciona un tipo.";
    }

    const descriptionWords = countWords(resourceForm.description);
    if (descriptionWords > 50) {
      errors.description = "La descripción no puede superar las 50 palabras.";
    }

    if (!resourceForm.fileUrl.trim()) {
      errors.fileUrl = "Agrega la URL del archivo.";
    }

    return errors;
  };

  const handleResourceSubmit = async (e, options = {}) => {
    if (e) e.preventDefault();
    const { skipConfirm } = options;

    if (!skipConfirm && resourceFormMode === "edit") {
      setSaveConfirmModal({
        open: true,
        onConfirm: () => handleResourceSubmit(null, { skipConfirm: true }),
      });
      return;
    }

    setResourceFormErrors({});

    const errors = validateResourceForm();
    if (Object.keys(errors).length > 0) {
      setResourceFormErrors(errors);
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
    } finally {
      setResourceFormLoading(false);
    }
  };

  const resetBlogForm = () => {
    setBlogForm({
      title: "",
      subtitle: "",
      content: "",
      category: "",
      status: "PUBLISHED",
      imageUrl: "",
    });
    setBlogFormErrors({});
    setBlogLocalImage(null);
    setEditingBlogId(null);
    setBlogFormMode("create");
  };

  const handleOpenBlogFormCreate = () => {
    resetBlogForm();
    setShowBlogForm(true);
  };

  const handleOpenBlogFormEdit = (blog) => {
    setBlogFormMode("edit");
    setEditingBlogId(blog.id);
    setBlogForm({
      title: blog.title || "",
      subtitle: blog.subtitle || "",
      content: blog.content || "",
      category: blog.category || "",
      status: blog.status || "PUBLISHED",
      imageUrl: blog.imageUrl || "",
    });
    setBlogFormErrors({});
    setBlogLocalImage(null);
    setShowBlogForm(true);
  };

  const handleCloseBlogForm = () => {
    setShowBlogForm(false);
    resetBlogForm();
  };

  const handleBlogFieldChange = (event) => {
    const { name, value } = event.target;
    setBlogForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    setBlogFormErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleBlogImageChange = (event) => {
    const file =
      event.target.files && event.target.files[0] ? event.target.files[0] : null;
    setBlogLocalImage(file);
  };

  const validateBlogForm = () => {
    const errors = {};

    if (!blogForm.title.trim()) {
      errors.title = "Agrega un título.";
    }
    if (!blogForm.content.trim()) {
      errors.content = "Agrega contenido.";
    }
    if (!blogForm.category.trim()) {
      errors.category = "Agrega una categoría.";
    }
    if (!blogForm.status) {
      errors.status = "Selecciona un estado.";
    }

    return errors;
  };

  const handleBlogSubmit = (e, options = {}) => {
    if (e) e.preventDefault();
    const { skipConfirm } = options;

    if (!skipConfirm && blogFormMode === "edit") {
      setSaveConfirmModal({
        open: true,
        onConfirm: () => handleBlogSubmit(null, { skipConfirm: true }),
      });
      return;
    }

    setBlogFormErrors({});

    const errors = validateBlogForm();
    if (Object.keys(errors).length > 0) {
      setBlogFormErrors(errors);
      return;
    }

    if (blogFormMode === "create") {
      const newBlog = {
        id: Date.now().toString(),
        title: blogForm.title,
        subtitle: blogForm.subtitle,
        content: blogForm.content,
        category: blogForm.category,
        status: blogForm.status,
        imageUrl: blogForm.imageUrl,
        createdAt: new Date().toISOString(),
      };
      setBlogs((prev) => [newBlog, ...prev]);
    } else if (blogFormMode === "edit" && editingBlogId) {
      setBlogs((prev) =>
        prev.map((b) =>
          b.id === editingBlogId
            ? {
                ...b,
                title: blogForm.title,
                subtitle: blogForm.subtitle,
                content: blogForm.content,
                category: blogForm.category,
                status: blogForm.status,
                imageUrl: blogForm.imageUrl,
              }
            : b
        )
      );
    }

    handleCloseBlogForm();
  };

  useEffect(() => {
    setResourcePage(1);
  }, [resourceSearch, resources.length]);

  useEffect(() => {
    setBlogPage(1);
  }, [blogSearch, blogs.length]);

  if (!user) return null;

  const filteredResources = resources.filter((resource) =>
    resource.title
      ? resource.title.toLowerCase().includes(resourceSearch.toLowerCase())
      : false
  );

  const startIndex = (resourcePage - 1) * RESOURCES_PAGE_SIZE;
  const paginatedResources = filteredResources.slice(
    startIndex,
    startIndex + RESOURCES_PAGE_SIZE
  );

  const descriptionWordCount = countWords(resourceForm.description);

  const filteredBlogs = blogs.filter((blog) => {
    const query = blogSearch.toLowerCase();
    return (
      (blog.title && blog.title.toLowerCase().includes(query)) ||
      (blog.subtitle && blog.subtitle.toLowerCase().includes(query)) ||
      (blog.content && blog.content.toLowerCase().includes(query))
    );
  });

  const blogStartIndex = (blogPage - 1) * BLOG_PAGE_SIZE;
  const paginatedBlogs = filteredBlogs.slice(
    blogStartIndex,
    blogStartIndex + BLOG_PAGE_SIZE
  );

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
          className={`admin-tab ${
            activeTab === "contactos" ? "is-active" : ""
          }`}
          onClick={() => setActiveTab("contactos")}
        >
          Consultas
        </button>
        <button
          className={`admin-tab ${
            activeTab === "recursos" ? "is-active" : ""
          }`}
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

            {contactsLoading && (
              <p className="admin-status">Cargando contactos...</p>
            )}
            {contactsError && (
              <p className="admin-status admin-status--error">
                {contactsError}
              </p>
            )}

            {!contactsLoading && !contactsError && contacts.length === 0 && (
              <p className="admin-status">No hay contactos disponibles.</p>
            )}

            {!contactsLoading &&
              !contactsError &&
              contacts.length > 0 && (
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
                          <td className="admin-table-title">
                            {contact.fullName}
                          </td>
                          <td>{contact.email}</td>
                          <td className="admin-table-message">
                            {contact.message}
                          </td>
                          <td>
                            <select
                              value={contact.status}
                              onChange={(e) =>
                                handleContactStatusChange(
                                  contact.id,
                                  e.target.value
                                )
                              }
                              className="status-select"
                            >
                              <option value="PENDING">Pendiente</option>
                              <option value="IN_PROGRESS">
                                En Proceso
                              </option>
                              <option value="RESOLVED">Resuelto</option>
                            </select>
                          </td>
                          <td>
                            {new Date(
                              contact.createdAt
                            ).toLocaleDateString()}
                          </td>
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
                                onClick={() =>
                                  openDeleteContactModal(contact)
                                }
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
              <div className="admin-panel-header-actions">
                <SearchBar
                  value={resourceSearch}
                  onChange={setResourceSearch}
                  placeholder="Buscar recursos..."
                  ariaLabel="Buscar recursos por título"
                />
                <button
                  className="admin-primary-btn"
                  onClick={handleOpenResourceFormCreate}
                >
                  + Añadir Recurso
                </button>
              </div>
            </div>

            {resourcesLoading && (
              <p className="admin-status">Cargando recursos...</p>
            )}
            {resourcesError && (
              <p className="admin-status admin-status--error">
                {resourcesError}
              </p>
            )}

            {!resourcesLoading &&
              !resourcesError &&
              filteredResources.length === 0 && (
                <p className="admin-status">
                  No hay recursos disponibles.
                </p>
              )}

            {!resourcesLoading &&
              !resourcesError &&
              filteredResources.length > 0 && (
                <>
                  <div className="admin-table-wrapper">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Título</th>
                          <th>Tipo</th>
                          <th>Visibilidad</th>
                          <th>Descargas</th>
                          <th>Fecha</th>
                          <th className="admin-table-actions-col">
                            Acciones
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedResources.map((resource) => (
                          <tr key={resource.id}>
                            <td className="admin-table-title">
                              {resource.title}
                            </td>
                            <td>{resource.type}</td>
                            <td>
                              <span
                                className={`status-pill ${
                                  resource.isPublic
                                    ? "status-pill--public"
                                    : "status-pill--private"
                                }`}
                              >
                                {resource.isPublic
                                  ? "Público"
                                  : "Privado"}
                              </span>
                            </td>
                            <td>{resource.downloadCount || 0}</td>
                            <td>
                              {new Date(
                                resource.createdAt
                              ).toLocaleDateString()}
                            </td>
                            <td className="admin-table-actions">
                              <button
                                className="admin-action-btn"
                                onClick={() =>
                                  handleOpenResourceFormEdit(resource)
                                }
                              >
                                Editar
                              </button>
                              <button
                                className="admin-action-btn admin-action-btn--delete"
                                onClick={() =>
                                  openDeleteResourceModal(resource)
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

                  <Pagination
                    currentPage={resourcePage}
                    totalItems={filteredResources.length}
                    pageSize={RESOURCES_PAGE_SIZE}
                    onPageChange={setResourcePage}
                    ariaLabel="Paginación de recursos"
                  />
                </>
              )}

            {showResourceForm && (
              <div className="admin-form-wrapper">
                <div className="admin-form-header">
                  <h3>
                    {resourceFormMode === "create"
                      ? "Añadir Recurso"
                      : "Editar Recurso"}
                  </h3>
                  <button
                    className="admin-form-close"
                    onClick={handleCloseResourceForm}
                  >
                    ✕
                  </button>
                </div>

                <form
                  className="admin-form"
                  onSubmit={handleResourceSubmit}
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
                        disabled={resourceFormLoading}
                      />
                      {resourceFormErrors.title && (
                        <p className="admin-form-error">
                          {resourceFormErrors.title}
                        </p>
                      )}
                    </div>

                    <div className="admin-form-field">
                      <label htmlFor="resource-type">Tipo *</label>
                      <select
                        id="resource-type"
                        name="type"
                        value={resourceForm.type}
                        onChange={handleResourceFieldChange}
                        disabled={resourceFormLoading}
                      >
                        <option value="GUIDE">Guía</option>
                        <option value="REPORT">Informe</option>
                        <option value="ARTICLE">Artículo</option>
                        <option value="VIDEO">Vídeo</option>
                        <option value="OTHER">Otro</option>
                      </select>
                      {resourceFormErrors.type && (
                        <p className="admin-form-error">
                          {resourceFormErrors.type}
                        </p>
                      )}
                    </div>

                    <div className="admin-form-field admin-form-field--full">
                      <label htmlFor="resource-description">
                        Descripción (máximo 50 palabras)
                      </label>
                      <textarea
                        id="resource-description"
                        name="description"
                        rows={3}
                        value={resourceForm.description}
                        onChange={handleResourceFieldChange}
                        placeholder="Breve descripción del recurso"
                        disabled={resourceFormLoading}
                      />
                      <div className="admin-form-helper-row">
                        <span
                          className={`admin-form-helper-count ${
                            descriptionWordCount > 50
                              ? "admin-form-helper-count--error"
                              : ""
                          }`}
                        >
                          {descriptionWordCount}/50 palabras
                        </span>
                      </div>
                      {resourceFormErrors.description && (
                        <p className="admin-form-error">
                          {resourceFormErrors.description}
                        </p>
                      )}
                    </div>

                    <div className="admin-form-field">
                      <label htmlFor="resource-file-url">
                        URL del archivo *
                      </label>
                      <div className="admin-file-upload">
                        <input
                          id="resource-file-url"
                          name="fileUrl"
                          type="text"
                          value={resourceForm.fileUrl}
                          onChange={handleResourceFieldChange}
                          placeholder="/resources/mi-archivo.pdf"
                          disabled={resourceFormLoading}
                        />
                        <button
                          type="button"
                          className="admin-file-upload__button"
                          disabled={resourceFormLoading}
                        >
                          Subir documento
                        </button>
                      </div>
                      {resourceFormErrors.fileUrl && (
                        <p className="admin-form-error">
                          {resourceFormErrors.fileUrl}
                        </p>
                      )}
                    </div>

                    <div className="admin-form-field">
                      <label htmlFor="resource-preview-image-url">
                        URL de imagen
                      </label>
                      <div className="admin-file-upload">
                        <input
                          id="resource-preview-image-url"
                          name="previewImageUrl"
                          type="text"
                          value={resourceForm.previewImageUrl}
                          onChange={handleResourceFieldChange}
                          placeholder="/img/resources/mi-imagen.webp"
                          disabled={resourceFormLoading}
                        />
                        <button
                          type="button"
                          className="admin-file-upload__button"
                          disabled={resourceFormLoading}
                        >
                          Subir imagen
                        </button>
                      </div>
                    </div>

                    <div className="admin-form-field">
                      <label htmlFor="resource-file-local">
                        Documento desde tu ordenador (opcional)
                      </label>
                      <div className="admin-file-upload">
                        <input
                          id="resource-file-local"
                          name="localFile"
                          type="file"
                          accept=".pdf,.doc,.docx,.ppt,.pptx"
                          onChange={handleLocalFileChange}
                          disabled={resourceFormLoading}
                          className="admin-file-upload__input"
                          style={{ display: "none" }}
                        />
                        <label
                          htmlFor="resource-file-local"
                          className="admin-file-upload__button"
                        >
                          Subir documento
                        </label>
                        <span className="admin-file-upload__filename">
                          {resourceFiles.localFile
                            ? resourceFiles.localFile.name
                            : "Ningún archivo seleccionado"}
                        </span>
                      </div>
                    </div>

                    <div className="admin-form-field">
                      <label htmlFor="resource-image-local">
                        Imagen desde tu ordenador (opcional)
                      </label>
                      <div className="admin-file-upload">
                        <input
                          id="resource-image-local"
                          name="localImage"
                          type="file"
                          accept="image/*"
                          onChange={handleLocalFileChange}
                          disabled={resourceFormLoading}
                          className="admin-file-upload__input"
                          style={{ display: "none" }}
                        />
                        <label
                          htmlFor="resource-image-local"
                          className="admin-file-upload__button"
                        >
                          Subir imagen
                        </label>
                        <span className="admin-file-upload__filename">
                          {resourceFiles.localImage
                            ? resourceFiles.localImage.name
                            : "Ningún archivo seleccionado"}
                        </span>
                      </div>
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
                      <label htmlFor="resource-public">
                        Recurso público
                      </label>
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
            <div className="admin-panel-header">
              <h2>Gestión de Blog</h2>
              <div className="admin-panel-header-actions">
                <SearchBar
                  value={blogSearch}
                  onChange={setBlogSearch}
                  placeholder="Buscar entradas de blog..."
                  ariaLabel="Buscar entradas de blog"
                />
                <button
                  className="admin-primary-btn"
                  onClick={handleOpenBlogFormCreate}
                >
                  + Añadir entrada
                </button>
              </div>
            </div>

            {filteredBlogs.length === 0 && (
              <p className="admin-status">
                No hay entradas de blog disponibles.
              </p>
            )}

            {filteredBlogs.length > 0 && (
              <>
                <div className="admin-table-wrapper">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Título</th>
                        <th>Subtítulo</th>
                        <th>Categoría</th>
                        <th>Estado</th>
                        <th>Fecha</th>
                        <th className="admin-table-actions-col">
                          Acciones
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedBlogs.map((blog) => (
                        <tr key={blog.id}>
                          <td className="admin-table-title">
                            {blog.title}
                          </td>
                          <td>{blog.subtitle}</td>
                          <td>{blog.category}</td>
                          <td>
                            <span
                              className={`status-pill ${
                                blog.status === "PUBLISHED"
                                  ? "status-pill--public"
                                  : "status-pill--private"
                              }`}
                            >
                              {blog.status === "PUBLISHED"
                                ? "Publicado"
                                : blog.status}
                            </span>
                          </td>
                          <td>
                            {blog.createdAt
                              ? new Date(
                                  blog.createdAt
                                ).toLocaleDateString()
                              : "-"}
                          </td>
                          <td className="admin-table-actions">
                            <button
                              className="admin-action-btn"
                              onClick={() =>
                                handleOpenBlogFormEdit(blog)
                              }
                            >
                              Editar
                            </button>
                            <button
                              className="admin-action-btn admin-action-btn--delete"
                              onClick={() => openDeleteBlogModal(blog)}
                            >
                              Eliminar
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <Pagination
                  currentPage={blogPage}
                  totalItems={filteredBlogs.length}
                  pageSize={BLOG_PAGE_SIZE}
                  onPageChange={setBlogPage}
                  ariaLabel="Paginación de entradas de blog"
                />
              </>
            )}

            {showBlogForm && (
              <div className="admin-form-wrapper">
                <div className="admin-form-header">
                  <h3>
                    {blogFormMode === "create"
                      ? "Añadir entrada de blog"
                      : "Editar entrada de blog"}
                  </h3>
                  <button
                    className="admin-form-close"
                    onClick={handleCloseBlogForm}
                  >
                    ✕
                  </button>
                </div>

                <form className="admin-form" onSubmit={handleBlogSubmit}>
                  <div className="admin-form-grid">
                    <div className="admin-form-field">
                      <label htmlFor="blog-title">Título *</label>
                      <input
                        id="blog-title"
                        name="title"
                        type="text"
                        value={blogForm.title}
                        onChange={handleBlogFieldChange}
                        disabled={blogFormLoading}
                      />
                      {blogFormErrors.title && (
                        <p className="admin-form-error">
                          {blogFormErrors.title}
                        </p>
                      )}
                    </div>

                    <div className="admin-form-field">
                      <label htmlFor="blog-subtitle">Subtítulo</label>
                      <input
                        id="blog-subtitle"
                        name="subtitle"
                        type="text"
                        value={blogForm.subtitle}
                        onChange={handleBlogFieldChange}
                        disabled={blogFormLoading}
                      />
                    </div>

                    <div className="admin-form-field admin-form-field--full">
                      <label htmlFor="blog-content">Contenido *</label>
                      <textarea
                        id="blog-content"
                        name="content"
                        rows={6}
                        value={blogForm.content}
                        onChange={handleBlogFieldChange}
                        disabled={blogFormLoading}
                      />
                      {blogFormErrors.content && (
                        <p className="admin-form-error">
                          {blogFormErrors.content}
                        </p>
                      )}
                    </div>

                    <div className="admin-form-field">
                      <label htmlFor="blog-category">Categoría *</label>
                      <input
                        id="blog-category"
                        name="category"
                        type="text"
                        value={blogForm.category}
                        onChange={handleBlogFieldChange}
                        placeholder="comunidad"
                        disabled={blogFormLoading}
                      />
                      {blogFormErrors.category && (
                        <p className="admin-form-error">
                          {blogFormErrors.category}
                        </p>
                      )}
                    </div>

                    <div className="admin-form-field">
                      <label htmlFor="blog-status">Estado *</label>
                      <select
                        id="blog-status"
                        name="status"
                        value={blogForm.status}
                        onChange={handleBlogFieldChange}
                        disabled={blogFormLoading}
                      >
                        <option value="PUBLISHED">Publicado</option>
                        <option value="DRAFT">Borrador</option>
                      </select>
                      {blogFormErrors.status && (
                        <p className="admin-form-error">
                          {blogFormErrors.status}
                        </p>
                      )}
                    </div>

                    <div className="admin-form-field">
                      <label htmlFor="blog-image-url">URL de imagen</label>
                      <input
                        id="blog-image-url"
                        name="imageUrl"
                        type="text"
                        value={blogForm.imageUrl}
                        onChange={handleBlogFieldChange}
                        placeholder="/img/blog/mi-imagen.webp"
                        disabled={blogFormLoading}
                      />
                    </div>

                    <div className="admin-form-field">
                      <label htmlFor="blog-image-local">
                        Imagen desde tu ordenador (opcional)
                      </label>
                      <div className="admin-file-upload">
                        <input
                          id="blog-image-local"
                          name="blogLocalImage"
                          type="file"
                          accept="image/*"
                          onChange={handleBlogImageChange}
                          disabled={blogFormLoading}
                          className="admin-file-upload__input"
                          style={{ display: "none" }}
                        />
                        <label
                          htmlFor="blog-image-local"
                          className="admin-file-upload__button"
                        >
                          Subir imagen
                        </label>
                        <span className="admin-file-upload__filename">
                          {blogLocalImage
                            ? blogLocalImage.name
                            : "Ningún archivo seleccionado"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="admin-form-actions">
                    <button
                      type="button"
                      className="admin-secondary-btn"
                      onClick={handleCloseBlogForm}
                      disabled={blogFormLoading}
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="admin-primary-btn"
                      disabled={blogFormLoading}
                    >
                      {blogFormMode === "create"
                        ? "Crear entrada"
                        : "Guardar cambios"}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}
      </section>

      <ContactDetailModal
        contact={selectedContact}
        open={showContactDetail}
        onClose={() => setShowContactDetail(false)}
      />

      <GlobalModal
        open={confirmModal.open}
        title={confirmModal.title}
        onClose={closeConfirmModal}
        variant={confirmModal.variant}
        closeOnOverlayClick={false}
        primaryAction={{
          label: confirmModal.confirmLabel || "Confirmar",
          onClick: () => {
            if (confirmModal.onConfirm) {
              confirmModal.onConfirm();
            }
            closeConfirmModal();
          },
        }}
        secondaryAction={{
          label: "Cancelar",
          onClick: closeConfirmModal,
        }}
      >
        <p>{confirmModal.description}</p>
      </GlobalModal>

      <GlobalModal
        open={saveConfirmModal.open}
        title="Confirmar cambios"
        onClose={closeSaveConfirmModal}
        variant="default"
        closeOnOverlayClick={false}
        primaryAction={{
          label: "Guardar cambios",
          onClick: () => {
            if (saveConfirmModal.onConfirm) {
              saveConfirmModal.onConfirm();
            }
            closeSaveConfirmModal();
          },
        }}
        secondaryAction={{
          label: "Cancelar",
          onClick: closeSaveConfirmModal,
        }}
      >
        <p>¿Seguro que quieres guardar los cambios?</p>
      </GlobalModal>
    </div>
  );
}
