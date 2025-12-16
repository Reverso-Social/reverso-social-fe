import { useState, useEffect } from "react";
import contactService from "../api/contactService";

export default function useContactsAdmin() {
  const [contacts, setContacts] = useState([]);
  const [contactsLoading, setContactsLoading] = useState(true);
  const [contactsError, setContactsError] = useState("");
  const [selectedContact, setSelectedContact] = useState(null);
  const [showContactDetail, setShowContactDetail] = useState(false);

  const loadContacts = async () => {
    setContactsLoading(true);
    setContactsError("");

    try {
      const data = await contactService.getAll();
      setContacts(data);
    } catch (error) {
      console.error("Error al cargar contactos:", error);
      setContactsError("No se pudieron cargar los contactos");
    } finally {
      setContactsLoading(false);
    }
  };

  useEffect(() => {
    loadContacts();
  }, []);

  const handleViewContact = (contact) => {
    setSelectedContact(contact);
    setShowContactDetail(true);
  };

  const closeContactDetail = () => {
    setSelectedContact(null);
    setShowContactDetail(false);
  };

  const handleContactStatusChange = async (id, newStatus) => {
    try {
      const updated = await contactService.updateStatus(id, newStatus);
      setContacts((prev) => prev.map((c) => (c.id === id ? updated : c)));
    } catch (error) {
      console.error("Error al actualizar estado:", error);
    }
  };

  const deleteContact = async (id) => {
    try {
      await contactService.delete(id);
      setContacts((prev) => prev.filter((c) => c.id !== id));
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };

  return {
    contacts,
    contactsLoading,
    contactsError,
    selectedContact,
    showContactDetail,
    loadContacts,
    handleViewContact,
    closeContactDetail,
    handleContactStatusChange,
    deleteContact,
  };
}
