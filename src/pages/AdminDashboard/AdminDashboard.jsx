import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye } from "lucide-react";
import "./AdminDashboard.scss";

import authService from "../../data/authService";
import ContactDetailModal from "../../components/ContactDetailModal/ContactDetailModal";
import GlobalModal from "../../components/GlobalModal/GlobalModal";
import SearchBar from "../../components/SearchBar/SearchBar";
import Pagination from "../../components/Pagination/Pagination";

import useContactsAdmin from "../../hooks/useContactsAdmin";
import useResourcesAdmin from "../../hooks/useResourcesAdmin";
import useBlogAdmin from "../../hooks/useBlogAdmin";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("contactos");
  const navigate = useNavigate();

  const currentUser = authService.getCurrentUser();

  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    }
  }, [navigate, currentUser]);

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

  const {
    contacts,
    contactsLoading,
    contactsError,
    selectedContact,
    showContactDetail,
    handleViewContact,
    closeContactDetail,
    handleContactStatusChange,
    deleteContact,
  } = useContactsAdmin();

  const {
    resourcesLoading,
    resourcesError,
    resourceSearch,
    setResourceSearch,
    resourcePage,
    setResourcePage,
    pageSize: RESOURCES_PAGE_SIZE,
    filteredResourcesCount,
    paginatedResources,
    showResourceForm,
    resourceFormMode,
    resourceForm,
    resourceFormErrors,
    resourceFormLoading,
    resourceFiles,
    descriptionWordCount,
    handleOpenResourceFormCreate,
    handleOpenResourceFormEdit,
    handleCloseResourceForm,
    handleResourceFieldChange,
    handleLocalFileChange,
    handleResourceSubmit,
    deleteResource,
  } = useResourcesAdmin();

  const {
    blogSearch,
    setBlogSearch,
    blogPage,
    setBlogPage,
    pageSize: BLOG_PAGE_SIZE,
    filteredBlogsCount,
    paginatedBlogs,
    showBlogForm,
    blogFormMode,
    blogForm,
    blogFormErrors,
    blogFormLoading,
    blogLocalImage,
    handleOpenBlogFormCreate,
    handleOpenBlogFormEdit,
    handleCloseBlogForm,
    handleBlogFieldChange,
    handleBlogImageChange,
    handleBlogSubmit,
    deleteBlog,
  } = useBlogAdmin();

  const handleLogout = () => {
    authService.logout();
    navigate("/");
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

  const handleResourceFormSubmit = (e) => {
    e.preventDefault();

    if (resourceFormMode === "edit") {
      setSaveConfirmModal({
        open: true,
        onConfirm: () => handleResourceSubmit(null),
      });
      return;
    }

    handleResourceSubmit(e);
  };

  const handleBlogFormSubmit = (e) => {
    e.preventDefault();

    if (blogFormMode === "edit") {
      setSaveConfirmModal({
        open: true,
        onConfirm: () => handleBlogSubmit(null),
      });
      return;
    }

    handleBlogSubmit(e);
  };

  if (!currentUser) return null;

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div>
          <h1>Panel de Administración</h1>
          <p className="admin-subtitle">Bienvenida, {currentUser.fullName}</p>
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
              filteredResourcesCount === 0 && (
                <p className="admin-status">
                  No hay recursos disponibles.
                </p>
              )}

            {!resourcesLoading &&
              !resourcesError &&
              filteredResourcesCount > 0 && (
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
                    totalItems={filteredResourcesCount}
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
                  onSubmit={handleResourceFormSubmit}
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

                    {/* <div className="admin-form-field">
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
                    </div> */}

                    {/* <div className="admin-form-field">
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
                    </div> */}

                    <div className="admin-form-field">
                      <label htmlFor="resource-file-local">
                        Documento
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
                        Imágen
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
                            : "Ninguna imagen seleccionada"}
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

            {filteredBlogsCount === 0 && (
              <p className="admin-status">
                No hay entradas de blog disponibles.
              </p>
            )}

            {filteredBlogsCount > 0 && (
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
                  totalItems={filteredBlogsCount}
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

                <form className="admin-form" onSubmit={handleBlogFormSubmit}>
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

                    {/* <div className="admin-form-field">
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
                    </div> */}

                    <div className="admin-form-field">
                      <label htmlFor="blog-image-local">
                        Imágen
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
        onClose={closeContactDetail}
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
