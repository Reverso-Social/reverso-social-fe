import React from "react";
import { useTranslation } from "react-i18next";
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
    const { t } = useTranslation('blogPanel');
    return (
        <div className="admin-panel">
            <div className="admin-panel-header">
                <h2>{t('title')}</h2>
                <div className="admin-panel-header-actions">
                    <SearchBar
                        value={search}
                        onChange={setSearch}
                        placeholder={t('searchPlaceholder')}
                        ariaLabel={t('searchAriaLabel')}
                    />
                    <button className="admin-primary-btn" onClick={onOpenCreate}>
                        {t('addButton')}
                    </button>
                </div>
            </div>

            {!loading && !error && count === 0 && (
                <p className="admin-status">{t('emptyState')}</p>
            )}

            {count > 0 && (
                <>
                    <div className="admin-table-wrapper">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>{t('tableTitle')}</th>
                                    <th>{t('tableSubtitle')}</th>
                                    <th>{t('tableCategory')}</th>
                                    <th className="admin-table-status-col text-center">{t('tableStatus')}</th>
                                    <th className="admin-table-date-col text-center">{t('tableDate')}</th>
                                    <th className="admin-table-actions-col text-center">{t('tableActions')}</th>
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
                                                    ? t('statusPublished')
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
                                                {t('editButton')}
                                            </button>
                                            <button
                                                className="admin-action-btn admin-action-btn--delete"
                                                onClick={() => onDelete(blog)}
                                            >
                                                {t('deleteButton')}
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
                        ariaLabel={t('paginationLabel')}
                    />
                </>
            )}

            {showForm && (
                <div className="admin-form-wrapper">
                    <div className="admin-form-header">
                        <h3>
                            {formMode === "create"
                                ? t('addModalTitle')
                                : t('editModalTitle')}
                        </h3>
                        <button className="admin-form-close" onClick={onCloseForm}>
                            {t('closeButton')}
                        </button>
                    </div>

                    <form className="admin-form" onSubmit={onSubmit}>
                        <div className="admin-form-grid">
                            <div className="admin-form-field">
                                <label htmlFor="blog-title">{t('formTitle')}</label>
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
                                <label htmlFor="blog-subtitle">{t('formSubtitle')}</label>
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
                                <label htmlFor="blog-content">{t('formContent')}</label>
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
                                <label htmlFor="blog-category">{t('formCategory')}</label>
                                <input
                                    id="blog-category"
                                    name="category"
                                    type="text"
                                    value={form.category}
                                    onChange={onFieldChange}
                                    placeholder={t('formCategoryPlaceholder')}
                                    disabled={formLoading}
                                />
                                {formErrors.category && (
                                    <p className="admin-form-error">{formErrors.category}</p>
                                )}
                            </div>

                            <div className="admin-form-field">
                                <label htmlFor="blog-status">{t('formStatus')}</label>
                                <select
                                    id="blog-status"
                                    name="status"
                                    value={form.status}
                                    onChange={onFieldChange}
                                    disabled={formLoading}
                                >
                                    <option value="PUBLISHED">{t('formStatusPublished')}</option>
                                    <option value="DRAFT">{t('formStatusDraft')}</option>
                                    <option value="ARCHIVED">{t('formStatusArchived')}</option>
                                </select>
                                {formErrors.status && (
                                    <p className="admin-form-error">{formErrors.status}</p>
                                )}
                            </div>

                            <div className="admin-form-field">
                                <label htmlFor="blog-image-local">{t('formImage')}</label>
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
                                        {t('uploadImageButton')}
                                    </label>
                                    <span className="admin-file-upload__filename">
                                        {localImage
                                            ? localImage.name
                                            : t('noFileSelected')}
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
                                {t('cancelButton')}
                            </button>
                            <button
                                type="submit"
                                className="admin-primary-btn"
                                disabled={formLoading}
                            >
                                {formMode === "create" ? t('createButton') : t('saveButton')}
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
