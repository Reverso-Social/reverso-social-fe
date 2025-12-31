import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Eye } from "lucide-react";
import "./AdminDashboard.scss";

import authService from "../../api/authService";
import ContactDetailModal from "../../components/ContactDetailModal/ContactDetailModal";
import GlobalModal from "../../components/GlobalModal/GlobalModal";


import useContactsAdmin from "../../hooks/useContactsAdmin";
import useResourcesAdmin from "../../hooks/useResourcesAdmin";
import useBlogAdmin from "../../hooks/useBlogAdmin";
import useDownloadLeadsAdmin from "../../hooks/useDownloadLeadsAdmin";

import ContactsPanel from "../../components/ContactsPanel/ContactsPanel";
import ResourcesPanel from "../../components/ResourcesPanel/ResourcesPanel";
import BlogPanel from "../../components/BlogPanel/BlogPanel";
import LeadsPanel from "../../components/LeadsPanel/LeadsPanel";

export default function AdminDashboard() {
  const { t } = useTranslation('admin');
  const [activeTab, setActiveTab] = useState("contactos");
  const navigate = useNavigate();

  const currentUser = authService.getCurrentUser();

  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    }
  }, [navigate, currentUser]);

  const [confirmModal, setConfirmModal] = useState({
    open: false,
    title: "",
    description: "",
    confirmLabel: "",
    variant: "default",
    onConfirm: null,
  });

  const [saveConfirmModal, setSaveConfirmModal] = useState({
    open: false,
    onConfirm: null,
  });

  const [successModal, setSuccessModal] = useState({
    open: false,
    message: "",
    title: t('modals.successTitle'),
  });

  const [errorModal, setErrorModal] = useState({
    open: false,
    message: "",
    title: t('modals.errorTitle'),
  });


  const {
    contacts,
    contactsLoading,
    contactsError,
    selectedContact,
    showContactDetail,
    handleViewContact,
    closeContactDetail,
    handleContactStatusChange,
    deleteContact,
  } = useContactsAdmin();

  const {
    resourcesLoading,
    resourcesError,
    resourceSearch,
    setResourceSearch,
    resourcePage,
    setResourcePage,
    pageSize: RESOURCES_PAGE_SIZE,
    filteredResourcesCount,
    paginatedResources,
    showResourceForm,
    resourceFormMode,
    resourceForm,
    resourceFormErrors,
    resourceFormLoading,
    resourceFiles,
    descriptionWordCount,
    handleOpenResourceFormCreate,
    handleOpenResourceFormEdit,
    handleCloseResourceForm,
    handleResourceFieldChange,
    handleLocalFileChange,
    handleResourceSubmit,
    deleteResource,
  } = useResourcesAdmin();

  const {
    blogSearch,
    setBlogSearch,
    blogPage,
    setBlogPage,
    pageSize: BLOG_PAGE_SIZE,
    filteredBlogsCount,
    paginatedBlogs,
    showBlogForm,
    blogFormMode,
    blogForm,
    blogFormErrors,
    blogFormLoading,
    blogLocalImage,
    handleOpenBlogFormCreate,
    handleOpenBlogFormEdit,
    handleCloseBlogForm,
    handleBlogFieldChange,
    handleBlogImageChange,
    handleBlogSubmit,
    deleteBlog,
  } = useBlogAdmin();

  const {
    leads,
    leadsLoading,
    leadsError,
    leadSearch,
    setLeadSearch,
    leadPage,
    setLeadPage,
    pageSize: LEADS_PAGE_SIZE,
    filteredLeadsCount,
    paginatedLeads,
    deleteLead,
    exportLeadsToCSV,
    sortConfig,
    requestSort,
  } = useDownloadLeadsAdmin();



  const openDeleteContactModal = (contact) => {
    setConfirmModal({
      open: true,
      title: "Eliminar contacto",
      description: `¿Seguro que quieres eliminar el contacto «${contact.fullName}»? Esta acción no se puede deshacer.`,
      confirmLabel: "Eliminar",
      variant: "danger",
      onConfirm: () => deleteContact(contact.id),
    });
  };

  const openDeleteResourceModal = (resource) => {
    setConfirmModal({
      open: true,
      title: "Eliminar recurso",
      description: `¿Seguro que quieres eliminar el recurso «${resource.title}»? Esta acción no se puede deshacer.`,
      confirmLabel: "Eliminar",
      variant: "danger",
      onConfirm: async () => {
        const result = await deleteResource(resource.id);
        if (!result.success) {
          setErrorModal({
            open: true,
            title: t('modals.errorDelete'),
            message: result.error || "No se pudo eliminar el recurso. Inténtalo de nuevo."
          });
        }
      },
    });
  };

  const openDeleteBlogModal = (blog) => {
    setConfirmModal({
      open: true,
      title: "Eliminar entrada de blog",
      description: `¿Seguro que quieres eliminar la entrada «${blog.title}»? Esta acción no se puede deshacer.`,
      confirmLabel: "Eliminar",
      variant: "danger",
      onConfirm: () => deleteBlog(blog.id),
    });
  };

  const openDeleteLeadModal = (lead) => {
    setConfirmModal({
      open: true,
      title: "Eliminar contacto de descarga",
      description: `¿Seguro que quieres eliminar el lead de «${lead.name}» (${lead.email})? Esta acción no se puede deshacer.`,
      confirmLabel: "Eliminar",
      variant: "danger",
      onConfirm: () => deleteLead(lead.id),
    });
  };

  const closeConfirmModal = () => {
    setConfirmModal({
      open: false,
      title: "",
      description: "",
      confirmLabel: "",
      variant: "default",
      onConfirm: null,
    });
  };

  const closeSaveConfirmModal = () => {
    setSaveConfirmModal({
      open: false,
      onConfirm: null,
    });
  };

  const handleResourceFormSubmit = async (e) => {
    e.preventDefault();

    if (resourceFormMode === "edit") {
      setSaveConfirmModal({
        open: true,
        onConfirm: async () => {
          const result = await handleResourceSubmit(null);
          if (!result.success) {
            setErrorModal({
              open: true,
              title: t('modals.errorSave'),
              message: result.error || t('modals.errorSaveMessage')
            });
          }
        },
      });
      return;
    }

    const result = await handleResourceSubmit(e);
    if (!result.success) {
      setErrorModal({
        open: true,
        title: t('modals.errorSave'),
        message: result.error || t('modals.errorCreateMessage')
      });
    }
  };

  const handleBlogSuccess = (blog) => {
    if (!blog) return;
    let message = "Operación realizada con éxito";

    if (blog.status === "PUBLISHED") {
      message = "Entrada publicada con éxito";
    } else if (blog.status === "DRAFT") {
      message = "Borrador guardado";
    } else if (blog.status === "ARCHIVED") {
      message = "Entrada archivada con éxito";
    }

    setSuccessModal({ open: true, message, title: null });
  };

  const handleBlogFormSubmit = async (e) => {
    e.preventDefault();

    if (blogFormMode === "edit") {
      setSaveConfirmModal({
        open: true,
        onConfirm: async () => {
          const result = await handleBlogSubmit(null);
          if (result && result.success) {
            handleBlogSuccess(result.blog);
          }
        },
      });
      return;
    }

    const result = await handleBlogSubmit(e);
    if (result && result.success) {
      handleBlogSuccess(result.blog);
    }
  };

  if (!currentUser) return null;

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div>
          <h1>{t('dashboard.title')}</h1>
          <p className="admin-subtitle">{t('dashboard.welcome', { name: currentUser.fullName })}</p>
        </div>

      </header>

      <nav className="admin-tabs" aria-label={t('dashboard.sections')}>
        <button
          className={`admin-tab ${activeTab === "contactos" ? "is-active" : ""
            }`}
          onClick={() => setActiveTab("contactos")}
        >
          {t('dashboard.tabs.contacts')}
        </button>
        <button
          className={`admin-tab ${activeTab === "recursos" ? "is-active" : ""
            }`}
          onClick={() => setActiveTab("recursos")}
        >
          {t('dashboard.tabs.resources')}
        </button>
        <button
          className={`admin-tab ${activeTab === "blog" ? "is-active" : ""}`}
          onClick={() => setActiveTab("blog")}
        >
          {t('dashboard.tabs.blog')}
        </button>
        <button
          className={`admin-tab ${activeTab === "leads" ? "is-active" : ""}`}
          onClick={() => setActiveTab("leads")}
        >
          {t('dashboard.tabs.leads')}
        </button>
      </nav>

      <section className="admin-content">
        {activeTab === "contactos" && (
          <ContactsPanel
            contacts={contacts}
            loading={contactsLoading}
            error={contactsError}
            onView={handleViewContact}
            onStatusChange={handleContactStatusChange}
            onDelete={openDeleteContactModal}
          />
        )}

        {activeTab === "recursos" && (
          <ResourcesPanel
            loading={resourcesLoading}
            error={resourcesError}
            count={filteredResourcesCount}
            resources={paginatedResources.map(resource => {
              const count = leads
                .filter(l => l.resourceTitle === resource.title)
                .reduce((acc, l) => acc + (l.downloadCount || 0), 0);
              return { ...resource, downloadCount: count };
            })}
            page={resourcePage}
            setPage={setResourcePage}
            pageSize={RESOURCES_PAGE_SIZE}
            search={resourceSearch}
            setSearch={setResourceSearch}
            showForm={showResourceForm}
            formMode={resourceFormMode}
            form={resourceForm}
            formErrors={resourceFormErrors}
            formLoading={resourceFormLoading}
            files={resourceFiles}
            wordCount={descriptionWordCount}
            onOpenCreate={handleOpenResourceFormCreate}
            onOpenEdit={handleOpenResourceFormEdit}
            onCloseForm={handleCloseResourceForm}
            onFieldChange={handleResourceFieldChange}
            onFileChange={handleLocalFileChange}
            onSubmit={handleResourceFormSubmit}
            onDelete={openDeleteResourceModal}
          />
        )}

        {activeTab === "blog" && (
          <BlogPanel
            loading={blogFormLoading}
            count={filteredBlogsCount}
            blogs={paginatedBlogs}
            page={blogPage}
            setPage={setBlogPage}
            pageSize={BLOG_PAGE_SIZE}
            search={blogSearch}
            setSearch={setBlogSearch}
            showForm={showBlogForm}
            formMode={blogFormMode}
            form={blogForm}
            formErrors={blogFormErrors}
            formLoading={blogFormLoading}
            localImage={blogLocalImage}
            onOpenCreate={handleOpenBlogFormCreate}
            onOpenEdit={handleOpenBlogFormEdit}
            onCloseForm={handleCloseBlogForm}
            onFieldChange={handleBlogFieldChange}
            onImageChange={handleBlogImageChange}
            onSubmit={handleBlogFormSubmit}
            onDelete={openDeleteBlogModal}
          />
        )}

        {activeTab === "leads" && (
          <LeadsPanel
            loading={leadsLoading}
            error={leadsError}
            count={filteredLeadsCount}
            leads={paginatedLeads}
            page={leadPage}
            setPage={setLeadPage}
            pageSize={LEADS_PAGE_SIZE}
            search={leadSearch}
            setSearch={setLeadSearch}
            onExport={exportLeadsToCSV}
            onDelete={openDeleteLeadModal}
            sortConfig={sortConfig}
            onSort={requestSort}
          />
        )}
      </section>

      <ContactDetailModal
        contact={selectedContact}
        open={showContactDetail}
        onClose={closeContactDetail}
      />

      <GlobalModal
        open={confirmModal.open}
        title={confirmModal.title}
        onClose={closeConfirmModal}
        variant={confirmModal.variant}
        closeOnOverlayClick={false}
        primaryAction={{
          label: confirmModal.confirmLabel || "Confirmar",
          onClick: () => {
            if (confirmModal.onConfirm) {
              confirmModal.onConfirm();
            }
            closeConfirmModal();
          },
        }}
        secondaryAction={{
          label: "Cancelar",
          onClick: closeConfirmModal,
        }}
      >
        <p>{confirmModal.description}</p>
      </GlobalModal>

      <GlobalModal
        open={saveConfirmModal.open}
        title="Confirmar cambios"
        onClose={closeSaveConfirmModal}
        variant="default"
        closeOnOverlayClick={false}
        primaryAction={{
          label: "Guardar cambios",
          onClick: () => {
            if (saveConfirmModal.onConfirm) {
              saveConfirmModal.onConfirm();
            }
            closeSaveConfirmModal();
          },
        }}
        secondaryAction={{
          label: "Cancelar",
          onClick: closeSaveConfirmModal,
        }}
      >
        <p>¿Seguro que quieres guardar los cambios?</p>
      </GlobalModal>

      <GlobalModal
        open={successModal.open}
        title={successModal.title || null}
        onClose={() => setSuccessModal({ ...successModal, open: false })}
        variant="small"
        closeOnOverlayClick={true}
        showCloseButton={false}
        primaryAction={{
          label: "Aceptar",
          onClick: () => setSuccessModal({ ...successModal, open: false })
        }}
      >
        <p style={{ textAlign: 'center', fontSize: '1.1rem', marginTop: '0.5rem', marginBottom: '0.5rem' }}>
          <strong>{successModal.message}</strong>
        </p>
      </GlobalModal>

      <GlobalModal
        open={errorModal.open}
        title={errorModal.title || "Error"}
        onClose={() => setErrorModal({ ...errorModal, open: false })}
        variant="danger"
        closeOnOverlayClick={true}
        showCloseButton={true}
        primaryAction={{
          label: "Cerrar",
          onClick: () => setErrorModal({ ...errorModal, open: false })
        }}
      >
        <p style={{ textAlign: 'center', fontSize: '1rem', marginTop: '1rem', marginBottom: '1rem' }}>
          {errorModal.message}
        </p>
      </GlobalModal>
    </div>
  );
}
