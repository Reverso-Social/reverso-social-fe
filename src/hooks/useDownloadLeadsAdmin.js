import { useState, useEffect, useMemo } from 'react';
import downloadLeadService from '../data/downloadLeadService';

export default function useDownloadLeadsAdmin() {
  const [leads, setLeads] = useState([]);
  const [leadsLoading, setLeadsLoading] = useState(true);
  const [leadsError, setLeadsError] = useState('');
  const [leadSearch, setLeadSearch] = useState('');
  const [leadPage, setLeadPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: 'lastDownloadedAt', direction: 'desc' });
  const pageSize = 10;

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      setLeadsLoading(true);
      setLeadsError('');
      const data = await downloadLeadService.getAllLeads();


      setLeads(data);
    } catch (err) {
      console.error('Error al cargar leads:', err);
      setLeadsError('No se pudieron cargar los leads de descarga');
    } finally {
      setLeadsLoading(false);
    }
  };

  const filteredLeads = useMemo(() => {
    if (!leadSearch.trim()) return leads;

    const searchLower = leadSearch.toLowerCase().trim();
    return leads.filter(
      (lead) =>
        lead.name?.toLowerCase().includes(searchLower) ||
        lead.email?.toLowerCase().includes(searchLower) ||
        lead.resourceTitle?.toLowerCase().includes(searchLower)
    );
  }, [leads, leadSearch]);

  const sortedLeads = useMemo(() => {
    let sortableLeads = [...filteredLeads];
    if (sortConfig.key) {
      sortableLeads.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];


        if (sortConfig.key === 'lastDownloadedAt' || sortConfig.key === 'createdAt') {
          aValue = new Date(a[sortConfig.key] || a.createdAt);
          bValue = new Date(b[sortConfig.key] || b.createdAt);
        }

        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableLeads;
  }, [filteredLeads, sortConfig]);

  const requestSort = (key) => {
    let direction = 'asc';
    if (
      sortConfig.key === key &&
      sortConfig.direction === 'asc'
    ) {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const filteredLeadsCount = filteredLeads.length;

  const paginatedLeads = useMemo(() => {
    const start = (leadPage - 1) * pageSize;
    const end = start + pageSize;
    return sortedLeads.slice(start, end);
  }, [sortedLeads, leadPage]);

  useEffect(() => {
    setLeadPage(1);
  }, [leadSearch]);

  const deleteLead = async (id) => {
    try {
      await downloadLeadService.deleteLead(id);
      setLeads((prev) => prev.filter((lead) => lead.id !== id));
    } catch (err) {
      console.error('Error al eliminar lead:', err);
      alert('No se pudo eliminar el lead');
    }
  };

  const exportLeadsToCSV = () => {
    if (filteredLeads.length === 0) {
      alert('No hay leads para exportar');
      return;
    }

    const headers = ['Nombre', 'Email', 'Recurso', 'Descargas', 'Fecha Registro', 'Última Descarga'];
    const rows = filteredLeads.map((lead) => {
      const lastDownload = lead.lastDownloadedAt || lead.createdAt;
      return [
        lead.name,
        lead.email,
        lead.resourceTitle,
        lead.downloadCount,
        new Date(lead.createdAt).toLocaleDateString('es-ES'),
        new Date(lastDownload).toLocaleDateString('es-ES')
      ];
    });

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', `leads_descarga_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return {
    leads,
    leadsLoading,
    leadsError,
    leadSearch,
    setLeadSearch,
    leadPage,
    setLeadPage,
    pageSize,
    filteredLeadsCount,
    paginatedLeads,
    deleteLead,
    exportLeadsToCSV,
    refreshLeads: fetchLeads,
    sortConfig,
    requestSort,
  };
}