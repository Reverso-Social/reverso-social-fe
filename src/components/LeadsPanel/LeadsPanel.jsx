import React from "react";
import { useTranslation } from "react-i18next";
import SearchBar from "../SearchBar/SearchBar";
import Pagination from "../Pagination/Pagination";
import authService from "../../api/authService";

const LeadsPanel = ({
    loading,
    error,
    count,
    leads,
    page,
    setPage,
    pageSize,
    search,
    setSearch,
    onExport,
    onDelete,
    sortConfig,
    onSort,
}) => {
    const { t } = useTranslation('leadsPanel');
    const getSortIndicator = (key) => {
        if (!sortConfig || sortConfig.key !== key) return null;
        return sortConfig.direction === 'asc' ? ' ▲' : ' ▼';
    };

    const isHotLead = (createdAt, lastDownloadedAt) => {
        if (!lastDownloadedAt) return false;
        const created = new Date(createdAt);
        const last = new Date(lastDownloadedAt);

        return (last - created) > 86400000;
    };

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
                    <button
                        className="admin-secondary-btn"
                        onClick={onExport}
                        disabled={count === 0}
                    >
                        {t('exportButton')}
                    </button>
                </div>
            </div>

            {loading && <p className="admin-status">{t('loadingMessage')}</p>}

            {error && <p className="admin-status admin-status--error">{error}</p>}

            {!loading && !error && count === 0 && (
                <p className="admin-status">{t('emptyState')}</p>
            )}

            {!loading && !error && count > 0 && (
                <>
                    <div className="admin-table-wrapper">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>{t('tableName')}</th>
                                    <th>{t('tableEmail')}</th>
                                    <th>{t('tableResource')}</th>
                                    <th className=" text-center">{t('tableCount')}</th>
                                    <th className="admin-table-date-col text-center" onClick={() => onSort('createdAt')} style={{ cursor: 'pointer' }}>
                                        {t('tableFirstDownload')} {getSortIndicator('createdAt')}
                                    </th>
                                    <th className="admin-table-date-col text-center" onClick={() => onSort('lastDownloadedAt')} style={{ cursor: 'pointer' }}>
                                        {t('tableLastDownload')} {getSortIndicator('lastDownloadedAt')}
                                    </th>
                                    <th className="admin-table-actions-col text-center">{t('tableActions')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leads.map((lead) => (
                                    <tr key={lead.id}>
                                        <td className="admin-table-title">{lead.name}</td>
                                        <td>{lead.email}</td>
                                        <td>{lead.resourceTitle}</td>
                                        <td className="text-center" style={{ textAlign: 'center' }}>
                                            <span className="badge badge--info" style={{ fontSize: '0.9rem', padding: '0.2rem 0.6rem', borderRadius: '12px' }}>
                                                {lead.downloadCount}
                                            </span>
                                        </td>
                                        <td className="admin-table-date-col text-center">
                                            {new Date(lead.createdAt).toLocaleDateString("es-ES", {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </td>
                                        <td className="admin-table-date-col text-center">
                                            {(() => {
                                                const dateToUse = lead.lastDownloadedAt || lead.createdAt;
                                                return (
                                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                        <span>
                                                            {new Date(dateToUse).toLocaleDateString("es-ES", {
                                                                year: "numeric",
                                                                month: "short",
                                                                day: "numeric",
                                                                hour: "2-digit",
                                                                minute: "2-digit",
                                                            })}
                                                        </span>
                                                        {isHotLead(lead.createdAt, lead.lastDownloadedAt) && lead.downloadCount > 1 && (
                                                            <span className="badge badge--warning" style={{ fontSize: '0.75rem', marginTop: '0.25rem', padding: '0.1rem 0.4rem', borderRadius: '4px', backgroundColor: '#fff3cd', color: '#856404' }}>
                                                                Re-descarga
                                                            </span>
                                                        )}
                                                    </div>
                                                );
                                            })()}
                                        </td>
                                        <td className="admin-table-actions text-center">
                                            {authService.isAdmin() && (
                                                <button
                                                    className="admin-action-btn admin-action-btn--delete"
                                                    onClick={() => onDelete(lead)}
                                                >
                                                    {t('deleteButton')}
                                                </button>
                                            )}
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
        </div>
    );
};

export default LeadsPanel;
