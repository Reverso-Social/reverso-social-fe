import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import useDownloadLeadsAdmin from '../../hooks/useDownloadLeadsAdmin';
import downloadLeadService from '../../data/downloadLeadService'

vi.mock('../../data/downloadLeadService', () => ({
  __esModule: true,
  default: {
    getAllLeads: vi.fn(),
    deleteLead: vi.fn(),
  },
}));

describe('useDownloadLeadsAdmin', () => {
  const mockLeads = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      resourceTitle: 'Resource A',
      createdAt: '2025-01-01T00:00:00Z',
      lastDownloadedAt: '2025-01-02T00:00:00Z',
    },
    {
      id: 2,
      name: 'Mary Smith',
      email: 'mary@example.com',
      resourceTitle: 'Resource B',
      createdAt: '2025-01-03T00:00:00Z',
      lastDownloadedAt: null,
    },
  ];

  beforeEach(() => {
    downloadLeadService.getAllLeads.mockResolvedValue(mockLeads);
    downloadLeadService.deleteLead.mockResolvedValue({});
  });

  it('loads leads correctly', async () => {
    const { result } = renderHook(() => useDownloadLeadsAdmin());

    expect(result.current.leadsLoading).toBe(true);

    await waitFor(() => expect(result.current.leadsLoading).toBe(false));

    expect(result.current.leads).toEqual(mockLeads);
    expect(result.current.filteredLeadsCount).toBe(2);
  });

  it('filters leads by search', async () => {
    const { result } = renderHook(() => useDownloadLeadsAdmin());
    await waitFor(() => expect(result.current.leadsLoading).toBe(false));

    act(() => {
      result.current.setLeadSearch('mary');
    });

    expect(result.current.filteredLeadsCount).toBe(1);
    expect(result.current.paginatedLeads[0].name).toBe('Mary Smith');
  });

  it('deletes a lead', async () => {
    const { result } = renderHook(() => useDownloadLeadsAdmin());
    await waitFor(() => expect(result.current.leadsLoading).toBe(false));

    act(() => {
      result.current.deleteLead(1);
    });

    await waitFor(() => expect(result.current.leads.length).toBe(1));
    expect(result.current.leads[0].id).toBe(2);
  });

  it('changes sorting direction', async () => {
    const { result } = renderHook(() => useDownloadLeadsAdmin());
    await waitFor(() => expect(result.current.leadsLoading).toBe(false));

    act(() => {
      result.current.requestSort('name');
    });

    expect(result.current.sortConfig.key).toBe('name');
    expect(result.current.sortConfig.direction).toBe('asc');

    act(() => {
      result.current.requestSort('name');
    });

    expect(result.current.sortConfig.direction).toBe('desc');
  });

  it('exports leads to CSV', async () => {
    const { result } = renderHook(() => useDownloadLeadsAdmin());
    await waitFor(() => expect(result.current.leadsLoading).toBe(false));

    const clickMock = vi.fn();
    const appendChildMock = vi.fn();
    const removeChildMock = vi.fn();
    const setAttributeMock = vi.fn();

    vi.spyOn(document, 'createElement').mockImplementation(() => ({
      setAttribute: setAttributeMock,
      style: {},
      click: clickMock,
    }));

    vi.spyOn(document.body, 'appendChild').mockImplementation(appendChildMock);
    vi.spyOn(document.body, 'removeChild').mockImplementation(removeChildMock);
    vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:mockurl');

    act(() => {
      result.current.exportLeadsToCSV();
    });

    expect(document.createElement).toHaveBeenCalledWith('a');
    expect(setAttributeMock).toHaveBeenCalledWith('href', 'blob:mockurl');
    expect(setAttributeMock).toHaveBeenCalledWith('download', expect.stringContaining('leads_descarga_'));
    expect(clickMock).toHaveBeenCalled();
    expect(appendChildMock).toHaveBeenCalled();
    expect(removeChildMock).toHaveBeenCalled();
  });
});