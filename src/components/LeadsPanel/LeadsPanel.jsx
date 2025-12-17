import React from "react";
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
}) => {
    return (
        <div className="admin-panel">
            <div className="admin-panel-header">
                <h2>Leads de Descarga</h2>
                <div className="admin-panel-header-actions">
                    <SearchBar
                        value={search}
                        onChange={setSearch}
                        placeholder="Buscar por nombre, email o recurso..."
                        ariaLabel="Buscar leads"
                    />
                    <button
                        className="admin-secondary-btn"
                        onClick={onExport}
                        disabled={count === 0}
                    >
                        📥 Exportar CSV
                    </button>
                </div>
            </div>

            {loading && <p className="admin-status">Cargando leads...</p>}

            {error && <p className="admin-status admin-status--error">{error}</p>}

            {!loading && !error && count === 0 && (
                <p className="admin-status">No hay leads de descarga disponibles.</p>
            )}

            {!loading && !error && count > 0 && (
                <>
                    <div className="admin-table-wrapper">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Email</th>
                                    <th>Recurso Descargado</th>
                                    <th className="admin-table-date-col text-center">Fecha</th>
                                    <th className="admin-table-actions-col text-center">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leads.map((lead) => (
                                    <tr key={lead.id}>
                                        <td className="admin-table-title">{lead.name}</td>
                                        <td>{lead.email}</td>
                                        <td>{lead.resourceTitle}</td>
                                        <td className="admin-table-date-col text-center">
                                            {new Date(lead.createdAt).toLocaleDateString("es-ES", {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </td>
                                        <td className="admin-table-actions text-center">
                                            {authService.isAdmin() && (
                                                <button
                                                    className="admin-action-btn admin-action-btn--delete"
                                                    onClick={() => onDelete(lead)}
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

                    <Pagination
                        currentPage={page}
                        totalItems={count}
                        pageSize={pageSize}
                        onPageChange={setPage}
                        ariaLabel="Paginación de leads"
                    />
                </>
            )}
        </div>
    );
};

export default LeadsPanel;
