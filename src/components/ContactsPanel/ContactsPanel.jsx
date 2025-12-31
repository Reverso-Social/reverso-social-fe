import React from "react";
import { useTranslation } from "react-i18next";
import { Eye } from "lucide-react";
import authService from "../../api/authService";

const ContactsPanel = ({
    contacts,
    loading,
    error,
    onView,
    onStatusChange,
    onDelete,
}) => {
    const { t } = useTranslation('admin');
    return (
        <div className="admin-panel">
            <div className="admin-panel-header">
                <h2>{t('contacts.title')}</h2>
            </div>

            {loading && <p className="admin-status">{t('contacts.loading')}</p>}
            {error && <p className="admin-status admin-status--error">{error}</p>}

            {!loading && !error && contacts.length === 0 && (
                <p className="admin-status">{t('contacts.empty')}</p>
            )}

            {!loading && !error && contacts.length > 0 && (
                <div className="admin-table-wrapper">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Email</th>
                                <th>Mensaje</th>
                                <th className="admin-table-status-col text-center">Estado</th>
                                <th className="admin-table-date-col text-center">Fecha</th>
                                <th className="admin-table-view-col text-center">Ver</th>
                                <th className="admin-table-actions-col text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contacts.map((contact) => (
                                <tr key={contact.id}>
                                    <td className="admin-table-title">{contact.fullName}</td>
                                    <td>{contact.email}</td>
                                    <td className="admin-table-message">{contact.message}</td>
                                    <td className="admin-table-status-col text-center">
                                        <select
                                            value={contact.status}
                                            onChange={(e) => onStatusChange(contact.id, e.target.value)}
                                            className="status-select"
                                        >
                                            <option value="PENDING">Pendiente</option>
                                            <option value="IN_PROGRESS">En Proceso</option>
                                            <option value="RESOLVED">Resuelto</option>
                                        </select>
                                    </td>
                                    <td className="admin-table-date-col text-center">
                                        {new Date(contact.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="admin-table-view text-center">
                                        <button
                                            className="admin-view-btn"
                                            onClick={() => onView(contact)}
                                            aria-label="Ver detalle del contacto"
                                        >
                                            <Eye size={18} />
                                        </button>
                                    </td>
                                    <td className="admin-table-actions text-center">
                                        {authService.isAdmin() && (
                                            <button
                                                className="admin-action-btn admin-action-btn--delete"
                                                onClick={() => onDelete(contact)}
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
    );
};

export default ContactsPanel;
