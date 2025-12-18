import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import useContactsAdmin from "../../hooks/useContactsAdmin";
import contactService from "../../api/contactService";

vi.mock("../../api/contactService", () => ({
  default: {
    getAll: vi.fn(),
    updateStatus: vi.fn(),
    delete: vi.fn(),
  },
}));

describe("useContactsAdmin hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should load contacts on mount", async () => {
    const mockContacts = [
      { id: 1, fullName: "John Doe" },
      { id: 2, fullName: "Jane Smith" },
    ];
    contactService.getAll.mockResolvedValue(mockContacts);

    const { result } = renderHook(() => useContactsAdmin());

    await waitFor(() => expect(result.current.contacts.length).toBe(2));

    expect(contactService.getAll).toHaveBeenCalled();
    expect(result.current.contacts).toEqual(mockContacts);
    expect(result.current.contactsLoading).toBe(false);
  });

  it("should handle contact load error", async () => {
    contactService.getAll.mockRejectedValue(new Error("Network Error"));

    const { result } = renderHook(() => useContactsAdmin());

    await waitFor(() => expect(result.current.contactsLoading).toBe(false));

    expect(result.current.contactsError).toBe("No se pudieron cargar los contactos");
  });

  it("should open and close contact detail", () => {
    const { result } = renderHook(() => useContactsAdmin());

    const contact = { id: 1, fullName: "John Doe" };
    act(() => {
      result.current.handleViewContact(contact);
    });

    expect(result.current.selectedContact).toEqual(contact);
    expect(result.current.showContactDetail).toBe(true);

    act(() => {
      result.current.closeContactDetail();
    });

    expect(result.current.selectedContact).toBeNull();
    expect(result.current.showContactDetail).toBe(false);
  });

  it("should update contact status", async () => {
    const initialContacts = [{ id: 1, fullName: "John Doe", status: "NEW" }];
    contactService.getAll.mockResolvedValue(initialContacts);

    const updatedContact = { id: 1, fullName: "John Doe", status: "READ" };
    contactService.updateStatus.mockResolvedValue(updatedContact);

    const { result } = renderHook(() => useContactsAdmin());

    await waitFor(() => expect(result.current.contacts.length).toBe(1));

    await act(async () => {
      await result.current.handleContactStatusChange(1, "READ");
    });

    expect(contactService.updateStatus).toHaveBeenCalledWith(1, "READ");
    expect(result.current.contacts[0].status).toBe("READ");
  });

  it("should delete contact", async () => {
    const initialContacts = [
      { id: 1, fullName: "John Doe" },
      { id: 2, fullName: "Jane Smith" },
    ];
    contactService.getAll.mockResolvedValue(initialContacts);
    contactService.delete.mockResolvedValue();

    const { result } = renderHook(() => useContactsAdmin());

    await waitFor(() => expect(result.current.contacts.length).toBe(2));

    await act(async () => {
      await result.current.deleteContact(1);
    });

    expect(contactService.delete).toHaveBeenCalledWith(1);
    expect(result.current.contacts.length).toBe(1);
    expect(result.current.contacts[0].id).toBe(2);
  });
});