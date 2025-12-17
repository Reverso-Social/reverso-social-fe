import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import Pagination from "../Pagination/Pagination";

const BlogPanel = ({
    loading,
    error,
    count,
    blogs,
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
    localImage,
    onOpenCreate,
    onOpenEdit,
    onCloseForm,
    onFieldChange,
    onImageChange,
    onSubmit,
    onDelete,
}) => {
    return (
        <div className="admin-panel">
            <div className="admin-panel-header">
                <h2>Gestión de Blog</h2>
                <div className="admin-panel-header-actions">
                    <SearchBar
                        value={search}
                        onChange={setSearch}
                        placeholder="Buscar entradas de blog..."
                        ariaLabel="Buscar entradas de blog"
                    />
                    <button className="admin-primary-btn" onClick={onOpenCreate}>
                        + Añadir entrada
                    </button>
                </div>
            </div>

            {!loading && !error && count === 0 && (
                <p className="admin-status">No hay entradas de blog disponibles.</p>
            )}

            {count > 0 && (
                <>
                    <div className="admin-table-wrapper">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Título</th>
                                    <th>Subtítulo</th>
                                    <th>Categoría</th>
                                    <th className="admin-table-status-col text-center">Estado</th>
                                    <th className="admin-table-date-col text-center">Fecha</th>
                                    <th className="admin-table-actions-col text-center">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {blogs.map((blog) => (
                                    <tr key={blog.id}>
                                        <td className="admin-table-title">{blog.title}</td>
                                        <td>{blog.subtitle}</td>
                                        <td>{blog.category}</td>
                                        <td className="admin-table-status-col text-center">
                                            <span
                                                className={`status-pill ${blog.status === "PUBLISHED"
                                                    ? "status-pill--public"
                                                    : "status-pill--private"
                                                    }`}
                                            >
                                                {blog.status === "PUBLISHED"
                                                    ? "Publicado"
                                                    : blog.status}
                                            </span>
                                        </td>
                                        <td className="admin-table-date-col text-center">
                                            {blog.createdAt
                                                ? new Date(blog.createdAt).toLocaleDateString()
                                                : "-"}
                                        </td>
                                        <td className="admin-table-actions text-center">
                                            <button
                                                className="admin-action-btn"
                                                onClick={() => onOpenEdit(blog)}
                                            >
                                                Editar
                                            </button>
                                            <button
                                                className="admin-action-btn admin-action-btn--delete"
                                                onClick={() => onDelete(blog)}
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
                        ariaLabel="Paginación de blog"
                    />
                </>
            )}

            {showForm && (
                <div className="admin-form-wrapper">
                    <div className="admin-form-header">
                        <h3>
                            {formMode === "create"
                                ? "Añadir entrada de blog"
                                : "Editar entrada de blog"}
                        </h3>
                        <button className="admin-form-close" onClick={onCloseForm}>
                            ✕
                        </button>
                    </div>

                    <form className="admin-form" onSubmit={onSubmit}>
                        <div className="admin-form-grid">
                            <div className="admin-form-field">
                                <label htmlFor="blog-title">Título *</label>
                                <input
                                    id="blog-title"
                                    name="title"
                                    type="text"
                                    value={form.title}
                                    onChange={onFieldChange}
                                    disabled={formLoading}
                                />
                                {formErrors.title && (
                                    <p className="admin-form-error">{formErrors.title}</p>
                                )}
                            </div>

                            <div className="admin-form-field">
                                <label htmlFor="blog-subtitle">Subtítulo</label>
                                <input
                                    id="blog-subtitle"
                                    name="subtitle"
                                    type="text"
                                    value={form.subtitle}
                                    onChange={onFieldChange}
                                    disabled={formLoading}
                                />
                                {formErrors.subtitle && (
                                    <p className="admin-form-error">{formErrors.subtitle}</p>
                                )}
                            </div>

                            <div className="admin-form-field admin-form-field--full">
                                <label htmlFor="blog-content">Contenido *</label>
                                <textarea
                                    id="blog-content"
                                    name="content"
                                    rows={6}
                                    value={form.content}
                                    onChange={onFieldChange}
                                    disabled={formLoading}
                                />
                                {formErrors.content && (
                                    <p className="admin-form-error">{formErrors.content}</p>
                                )}
                            </div>

                            <div className="admin-form-field">
                                <label htmlFor="blog-category">Categoría *</label>
                                <input
                                    id="blog-category"
                                    name="category"
                                    type="text"
                                    value={form.category}
                                    onChange={onFieldChange}
                                    placeholder="Ej. Comunidad"
                                    disabled={formLoading}
                                />
                                {formErrors.category && (
                                    <p className="admin-form-error">{formErrors.category}</p>
                                )}
                            </div>

                            <div className="admin-form-field">
                                <label htmlFor="blog-status">Estado *</label>
                                <select
                                    id="blog-status"
                                    name="status"
                                    value={form.status}
                                    onChange={onFieldChange}
                                    disabled={formLoading}
                                >
                                    <option value="PUBLISHED">Publicado</option>
                                    <option value="DRAFT">Borrador</option>
                                    <option value="ARCHIVED">Archivado</option>
                                </select>
                                {formErrors.status && (
                                    <p className="admin-form-error">{formErrors.status}</p>
                                )}
                            </div>

                            <div className="admin-form-field">
                                <label htmlFor="blog-image-local">Imagen</label>
                                <div className="admin-file-upload">
                                    <input
                                        id="blog-image-local"
                                        name="blogLocalImage"
                                        type="file"
                                        accept="image/*"
                                        onChange={onImageChange}
                                        disabled={formLoading}
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
                                        {localImage
                                            ? localImage.name
                                            : "Ningún archivo seleccionado"}
                                    </span>
                                </div>
                                {formErrors.image && (
                                    <p className="admin-form-error">{formErrors.image}</p>
                                )}
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
                                {formMode === "create" ? "Crear entrada" : "Guardar cambios"}
                            </button>
                        </div>
                        {formErrors.submit && (
                            <p
                                className="admin-form-error"
                                style={{ textAlign: "right", marginTop: "1rem" }}
                            >
                                {formErrors.submit}
                            </p>
                        )}
                    </form>
                </div>
            )}
        </div>
    );
};

export default BlogPanel;
