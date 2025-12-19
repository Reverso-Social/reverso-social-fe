import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import Pagination from "../Pagination/Pagination";

const ResourcesPanel = ({
    loading,
    error,
    count,
    resources,
    page,
    setPage,
    pageSize,
    search,
    setSearch,
    showForm,
    formMode,
    form,
    formErrors,
    formLoading,
    files,
    wordCount,
    onOpenCreate,
    onOpenEdit,
    onCloseForm,
    onFieldChange,
    onFileChange,
    onSubmit,
    onDelete,
}) => {
    return (
        <div className="admin-panel">
            <div className="admin-panel-header">
                <h2>Gestión de Recursos</h2>
                <div className="admin-panel-header-actions">
                    <SearchBar
                        value={search}
                        onChange={setSearch}
                        placeholder="Buscar recursos..."
                        ariaLabel="Buscar recursos por título"
                    />
                    <button className="admin-primary-btn" onClick={onOpenCreate}>
                        + Añadir Recurso
                    </button>
                </div>
            </div>

            {loading && <p className="admin-status">Cargando recursos...</p>}
            {error && <p className="admin-status admin-status--error">{error}</p>}

            {!loading && !error && count === 0 && (
                <p className="admin-status">No hay recursos disponibles.</p>
            )}

            {!loading && !error && count > 0 && (
                <>
                    <div className="admin-table-wrapper">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Título</th>
                                    <th>Tipo</th>
                                    <th className="admin-table-status-col text-center">Visibilidad</th>
                                    <th className="text-center">Descargas</th>
                                    <th className="admin-table-date-col text-center">Fecha</th>
                                    <th className="admin-table-actions-col text-center">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {resources.map((resource) => (
                                    <tr key={resource.id}>
                                        <td className="admin-table-title">{resource.title}</td>
                                        <td>{resource.type}</td>
                                        <td className="admin-table-status-col text-center">
                                            <span
                                                className={`status-pill ${resource.isPublic
                                                    ? "status-pill--public"
                                                    : "status-pill--private"
                                                    }`}
                                            >
                                                {resource.isPublic ? "Público" : "Privado"}
                                            </span>
                                        </td>
                                        <td className="text-center">{resource.downloadCount || 0}</td>
                                        <td className="admin-table-date-col text-center">
                                            {new Date(resource.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="admin-table-actions text-center">
                                            <button
                                                className="admin-action-btn"
                                                onClick={() => onOpenEdit(resource)}
                                            >
                                                Editar
                                            </button>
                                            <button
                                                className="admin-action-btn admin-action-btn--delete"
                                                onClick={() => onDelete(resource)}
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
                        currentPage={page}
                        totalItems={count}
                        pageSize={pageSize}
                        onPageChange={setPage}
                        ariaLabel="Paginación de recursos"
                    />
                </>
            )}

            {showForm && (
                <div className="admin-form-wrapper">
                    <div className="admin-form-header">
                        <h3>
                            {formMode === "create" ? "Añadir Recurso" : "Editar Recurso"}
                        </h3>
                        <button className="admin-form-close" onClick={onCloseForm}>
                            ✕
                        </button>
                    </div>

                    <form className="admin-form" onSubmit={onSubmit}>
                        <div className="admin-form-grid">
                            <div className="admin-form-field">
                                <label htmlFor="resource-title">Título *</label>
                                <input
                                    id="resource-title"
                                    name="title"
                                    type="text"
                                    value={form.title}
                                    onChange={onFieldChange}
                                    placeholder="Ej. Guía de Igualdad"
                                    disabled={formLoading}
                                />
                                {formErrors.title && (
                                    <p className="admin-form-error">{formErrors.title}</p>
                                )}
                            </div>

                            <div className="admin-form-field">
                                <label htmlFor="resource-type">Tipo *</label>
                                <select
                                    id="resource-type"
                                    name="type"
                                    value={form.type}
                                    onChange={onFieldChange}
                                    disabled={formLoading}
                                >
                                    <option value="GUIDE">Guía</option>
                                    <option value="REPORT">Informe</option>
                                    <option value="ARTICLE">Artículo</option>
                                    <option value="VIDEO">Vídeo</option>
                                    <option value="OTHER">Otro</option>
                                </select>
                                {formErrors.type && (
                                    <p className="admin-form-error">{formErrors.type}</p>
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
                                    value={form.description}
                                    onChange={onFieldChange}
                                    placeholder="Breve descripción del recurso"
                                    disabled={formLoading}
                                />
                                <div className="admin-form-helper-row">
                                    <span
                                        className={`admin-form-helper-count ${wordCount > 50 ? "admin-form-helper-count--error" : ""
                                            }`}
                                    >
                                        {wordCount}/50 palabras
                                    </span>
                                </div>
                                {formErrors.description && (
                                    <p className="admin-form-error">{formErrors.description}</p>
                                )}
                            </div>

                            <div className="admin-form-field">
                                <label htmlFor="resource-file-local">Documento</label>
                                <div className="admin-file-upload">
                                    <input
                                        id="resource-file-local"
                                        name="localFile"
                                        type="file"
                                        accept=".pdf,.doc,.docx,.ppt,.pptx"
                                        onChange={onFileChange}
                                        disabled={formLoading}
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
                                        {files.localFile
                                            ? files.localFile.name
                                            : "Ningún archivo seleccionado"}
                                    </span>
                                </div>
                            </div>

                            <div className="admin-form-field">
                                <label htmlFor="resource-image-local">Imagen</label>
                                <div className="admin-file-upload">
                                    <input
                                        id="resource-image-local"
                                        name="localImage"
                                        type="file"
                                        accept="image/*"
                                        onChange={onFileChange}
                                        disabled={formLoading}
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
                                        {files.localImage
                                            ? files.localImage.name
                                            : "Ninguna imágen seleccionada"}
                                    </span>
                                </div>
                            </div>

                            <div className="admin-form-field admin-form-field--inline">
                                <input
                                    id="resource-public"
                                    name="isPublic"
                                    type="checkbox"
                                    checked={form.isPublic}
                                    onChange={onFieldChange}
                                    disabled={formLoading}
                                />
                                <label htmlFor="resource-public">Recurso público</label>
                            </div>
                        </div>

                        <div className="admin-form-actions">
                            <button
                                type="button"
                                className="admin-secondary-btn"
                                onClick={onCloseForm}
                                disabled={formLoading}
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="admin-primary-btn"
                                disabled={formLoading}
                            >
                                {formLoading
                                    ? "Guardando..."
                                    : formMode === "create"
                                        ? "Crear Recurso"
                                        : "Guardar Cambios"}
                            </button>
                        </div>
                        {formErrors.submit && (
                            <p className="admin-form-error" style={{ marginBottom: "1rem" }}>
                                {formErrors.submit}
                            </p>
                        )}
                    </form>
                </div>
            )}
        </div>
    );
};

export default ResourcesPanel;
