import React from "react";
import { useTranslation } from "react-i18next";
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
    const { t } = useTranslation('admin');
    return (
        <div className="admin-panel">
            <div className="admin-panel-header">
                <h2>{t('resources.title')}</h2>
                <div className="admin-panel-header-actions">
                    <SearchBar
                        value={search}
                        onChange={setSearch}
                        placeholder={t('resources.search')}
                        ariaLabel={t('resources.searchPlaceholder')}
                    />
                    <button className="admin-primary-btn" onClick={onOpenCreate}>
                        {t('resources.add')}
                    </button>
                </div>
            </div>

            {loading && <p className="admin-status">{t('resources.loading')}</p>}
            {error && <p className="admin-status admin-status--error">{error}</p>}

            {!loading && !error && count === 0 && (
                <p className="admin-status">{t('resources.empty')}</p>
            )}

            {!loading && !error && count > 0 && (
                <>
                    <div className="admin-table-wrapper">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>{t('resources.tableTitle')}</th>
                                    <th>{t('resources.tableType')}</th>
                                    <th className="admin-table-status-col text-center">{t('resources.tableVisibility')}</th>
                                    <th className="text-center">{t('resources.tableDownloads')}</th>
                                    <th className="admin-table-date-col text-center">{t('resources.tableDate')}</th>
                                    <th className="admin-table-actions-col text-center">{t('resources.tableActions')}</th>
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
                                                {resource.isPublic ? t('resources.visibilityPublic') : t('resources.visibilityPrivate')}
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
                                                {t('resources.edit')}
                                            </button>
                                            <button
                                                className="admin-action-btn admin-action-btn--delete"
                                                onClick={() => onDelete(resource)}
                                            >
                                                {t('resources.delete')}
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
                            {formMode === "create" ? t('resources.formTitleAdd') : t('resources.formTitleEdit')}
                        </h3>
                        <button className="admin-form-close" onClick={onCloseForm}>
                            ✕
                        </button>
                    </div>

                    <form className="admin-form" onSubmit={onSubmit}>
                        <div className="admin-form-grid">
                            <div className="admin-form-field">
                                <label htmlFor="resource-title">{t('resources.fieldTitle')} *</label>
                                <input
                                    id="resource-title"
                                    name="title"
                                    type="text"
                                    value={form.title}
                                    onChange={onFieldChange}
                                    placeholder={t('resources.fieldTitlePlaceholder')}
                                    disabled={formLoading}
                                />
                                {formErrors.title && (
                                    <p className="admin-form-error">{formErrors.title}</p>
                                )}
                            </div>

                            <div className="admin-form-field">
                                <label htmlFor="resource-type">{t('resources.fieldType')} *</label>
                                <select
                                    id="resource-type"
                                    name="type"
                                    value={form.type}
                                    onChange={onFieldChange}
                                    disabled={formLoading}
                                >
                                    <option value="GUIDE">{t('resources.typeGuide')}</option>
                                    <option value="REPORT">{t('resources.typeReport')}</option>
                                    <option value="ARTICLE">{t('resources.typeArticle')}</option>
                                    <option value="VIDEO">{t('resources.typeVideo')}</option>
                                    <option value="OTHER">{t('resources.typeOther')}</option>
                                </select>
                                {formErrors.type && (
                                    <p className="admin-form-error">{formErrors.type}</p>
                                )}
                            </div>

                            <div className="admin-form-field admin-form-field--full">
                                <label htmlFor="resource-description">
                                    {t('resources.fieldDescription')}
                                </label>
                                <textarea
                                    id="resource-description"
                                    name="description"
                                    rows={3}
                                    value={form.description}
                                    onChange={onFieldChange}
                                    placeholder={t('resources.fieldDescriptionPlaceholder')}
                                    disabled={formLoading}
                                />
                                <div className="admin-form-helper-row">
                                    <span
                                        className={`admin-form-helper-count ${wordCount > 50 ? "admin-form-helper-count--error" : ""
                                            }`}
                                    >
                                        {t('resources.wordsCount', { count: wordCount })}
                                    </span>
                                </div>
                                {formErrors.description && (
                                    <p className="admin-form-error">{formErrors.description}</p>
                                )}
                            </div>

                            <div className="admin-form-field">
                                <label htmlFor="resource-file-local">{t('resources.fieldDocument')}</label>
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
                                        {t('resources.uploadDocument')}
                                    </label>
                                    <span className="admin-file-upload__filename">
                                        {files.localFile
                                            ? files.localFile.name
                                            : t('resources.noFileSelected')}
                                    </span>
                                </div>
                            </div>

                            <div className="admin-form-field">
                                <label htmlFor="resource-image-local">{t('resources.fieldImage')}</label>
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
                                        {t('resources.uploadImage')}
                                    </label>
                                    <span className="admin-file-upload__filename">
                                        {files.localImage
                                            ? files.localImage.name
                                            : t('resources.noImageSelected')}
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
                                <label htmlFor="resource-public">{t('resources.fieldPublic')}</label>
                            </div>
                        </div>

                        <div className="admin-form-actions">
                            <button
                                type="button"
                                className="admin-secondary-btn"
                                onClick={onCloseForm}
                                disabled={formLoading}
                            >
                                {t('resources.cancel')}
                            </button>
                            <button
                                type="submit"
                                className="admin-primary-btn"
                                disabled={formLoading}
                            >
                                {formLoading
                                    ? t('resources.saving')
                                    : formMode === "create"
                                        ? t('resources.create')
                                        : t('resources.save')}
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
