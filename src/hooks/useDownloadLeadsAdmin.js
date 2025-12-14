import { useState, useEffect, useMemo } from 'react';
import downloadLeadService from '../data/downloadLeadService';

export default function useDownloadLeadsAdmin() {
  const [leads, setLeads] = useState([]);
  const [leadsLoading, setLeadsLoading] = useState(true);
  const [leadsError, setLeadsError] = useState('');
  const [leadSearch, setLeadSearch] = useState('');
  const [leadPage, setLeadPage] = useState(1);
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

  const filteredLeadsCount = filteredLeads.length;

  const paginatedLeads = useMemo(() => {
    const start = (leadPage - 1) * pageSize;
    const end = start + pageSize;
    return filteredLeads.slice(start, end);
  }, [filteredLeads, leadPage]);

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

    const headers = ['Nombre', 'Email', 'Recurso', 'Fecha'];
    const rows = filteredLeads.map((lead) => [
      lead.name,
      lead.email,
      lead.resourceTitle,
      new Date(lead.createdAt).toLocaleDateString('es-ES'),
    ]);

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
  };
}