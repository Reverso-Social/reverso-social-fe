import { useState, useEffect, useMemo } from "react";
import resourceService from "../api/resourceService";

const RESOURCES_PAGE_SIZE = 6;

function countWords(text) {
  if (!text) return 0;
  const words = text.trim().split(/\s+/).filter(Boolean);
  return words.length;
}

export default function useResourcesAdmin() {
  const [resources, setResources] = useState([]);
  const [resourcesLoading, setResourcesLoading] = useState(true);
  const [resourcesError, setResourcesError] = useState("");

  const [showResourceForm, setShowResourceForm] = useState(false);
  const [resourceFormMode, setResourceFormMode] = useState("create");
  const [editingResourceId, setEditingResourceId] = useState(null);
  const [resourceForm, setResourceForm] = useState({
    title: "",
    description: "",
    type: "GUIDE",
    fileUrl: "",
    previewImageUrl: "",
    isPublic: true,
  });
  const [resourceFormErrors, setResourceFormErrors] = useState({});
  const [resourceFormLoading, setResourceFormLoading] = useState(false);
  const [resourceFiles, setResourceFiles] = useState({
    localFile: null,
    localImage: null,
  });

  const [resourceSearch, setResourceSearch] = useState("");
  const [resourcePage, setResourcePage] = useState(1);

  const loadResources = async () => {
    setResourcesLoading(true);
    setResourcesError("");

    try {
      const data = await resourceService.getAll();
      setResources(data);
    } catch (error) {
      console.error("Error al cargar recursos:", error);
      setResourcesError("No se pudieron cargar los recursos");
    } finally {
      setResourcesLoading(false);
    }
  };

  useEffect(() => {
    loadResources();
  }, []);

  useEffect(() => {
    setResourcePage(1);
  }, [resourceSearch, resources.length]);

  const resetResourceForm = () => {
    setResourceForm({
      title: "",
      description: "",
      type: "GUIDE",
      fileUrl: "",
      previewImageUrl: "",
      isPublic: true,
    });
    setResourceFormErrors({});
    setResourceFiles({
      localFile: null,
      localImage: null,
    });
    setEditingResourceId(null);
    setResourceFormMode("create");
  };

  const handleOpenResourceFormCreate = () => {
    resetResourceForm();
    setShowResourceForm(true);
  };

  const handleOpenResourceFormEdit = (resource) => {
    setResourceFormMode("edit");
    setEditingResourceId(resource.id);
    setResourceForm({
      title: resource.title || "",
      description: resource.description || "",
      type: resource.type || "GUIDE",
      fileUrl: resource.fileUrl || "",
      previewImageUrl: resource.previewImageUrl || "",
      isPublic: resource.isPublic !== undefined ? resource.isPublic : true,
    });
    setResourceFormErrors({});
    setResourceFiles({
      localFile: null,
      localImage: null,
    });
    setShowResourceForm(true);
  };

  const handleCloseResourceForm = () => {
    setShowResourceForm(false);
    resetResourceForm();
  };

  const handleResourceFieldChange = (event) => {
    const { name, value, type, checked } = event.target;

    if (name === "description") {
      const words = value.trim().split(/\s+/).filter(Boolean);
      const limited =
        words.length > 50 ? words.slice(0, 50).join(" ") : value;

      setResourceForm((prev) => ({
        ...prev,
        [name]: limited,
      }));
      setResourceFormErrors((prev) => ({
        ...prev,
        description: "",
      }));
      return;
    }

    setResourceForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setResourceFormErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleLocalFileChange = (event) => {
    const { name, files } = event.target;
    const file = files && files[0] ? files[0] : null;
    setResourceFiles((prev) => ({
      ...prev,
      [name]: file,
    }));

    if (file && name === "localFile") {
      setResourceFormErrors((prev) => ({
        ...prev,
        fileUrl: "",
      }));
    }
  };

  const validateResourceForm = () => {
    const errors = {};

    if (!resourceForm.title.trim()) {
      errors.title = "Agrega un título.";
    }

    if (resourceForm.title.length > 60) {
      errors.title = "El título no puede superar 60 caracteres.";
    }

    if (!resourceForm.type) {
      errors.type = "Selecciona un tipo.";
    }

    const descriptionWords = countWords(resourceForm.description);
    if (descriptionWords > 50) {
      errors.description = "La descripción no puede superar las 50 palabras.";
    }

    if (resourceFormMode === "create" && !resourceFiles.localFile) {
      errors.fileUrl = "Debes subir un documento.";
    }

    return errors;
  };

  const handleResourceSubmit = async (e) => {
    if (e) e.preventDefault();
    setResourceFormErrors({});

    const errors = validateResourceForm();
    if (Object.keys(errors).length > 0) {
      setResourceFormErrors(errors);
      return;
    }

    setResourceFormLoading(true);

    try {
      let fileUrl = resourceForm.fileUrl;
      let previewImageUrl = resourceForm.previewImageUrl;

      if (resourceFormMode === "create") {
        if (!resourceFiles.localFile) {
          setResourceFormErrors({ fileUrl: "Debes subir un documento." });
          setResourceFormLoading(false);
          return;
        }

        fileUrl = await resourceService.uploadFile(resourceFiles.localFile);
      } else if (resourceFormMode === "edit" && resourceFiles.localFile) {
        fileUrl = await resourceService.uploadFile(resourceFiles.localFile);
      }

      if (resourceFiles.localImage) {
        previewImageUrl = await resourceService.uploadFile(resourceFiles.localImage);
      }

      if (!fileUrl || fileUrl.trim() === '') {
        setResourceFormErrors({
          fileUrl: "Error: No se pudo obtener la URL del archivo."
        });
        setResourceFormLoading(false);
        return;
      }

      const resourceData = {
        title: resourceForm.title.trim(),
        description: resourceForm.description?.trim() || "",
        type: resourceForm.type,
        fileUrl: fileUrl,
        previewImageUrl: previewImageUrl || "",
        isPublic: resourceForm.isPublic ?? true
      };

      if (resourceFormMode === "create") {
        await resourceService.create(resourceData);
      } else if (resourceFormMode === "edit" && editingResourceId) {
        await resourceService.update(editingResourceId, resourceData);
      }

      await loadResources();
      handleCloseResourceForm();
      return { success: true };
    } catch (error) {
      console.error("Error al guardar recurso:", error);

      let errorMessage = "Error al guardar el recurso.";

      if (error.response?.status === 400 && error.response?.data?.message?.includes("description")) {
        errorMessage = "La descripción no puede exceder de 50 palabras";
      } else if (error.response?.data) {
        const errorData = error.response.data;

        if (errorData.message) {
          errorMessage = errorData.message === "Input validation failed"
            ? "Por favor, verifica los datos del formulario."
            : errorData.message;
        } else if (errorData.error) {
          errorMessage = errorData.error;
        } else if (errorData.errors) {
          if (Array.isArray(errorData.errors)) {
            errorMessage = errorData.errors.join(', ');
          } else if (typeof errorData.errors === 'object') {
            errorMessage = Object.values(errorData.errors).join(', ');
          }
        }
      } else if (error.message) {
        errorMessage = error.message;
      }

      setResourceFormErrors({
        submit: errorMessage
      });
      return { success: false, error: errorMessage };
    } finally {
      setResourceFormLoading(false);
    }
  };

  const deleteResource = async (id) => {
    try {
      await resourceService.delete(id);
      setResources((prev) => prev.filter((r) => r.id !== id));
      return { success: true };
    } catch (error) {
      console.error("Error al eliminar recurso:", error);
      let errorMessage = "No se ha podido borrar el recurso, inténtalo nuevamente";

      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      }

      if (errorMessage.includes("constraint") || errorMessage.includes("download_leads")) {
        errorMessage = "No se puede eliminar el recurso porque tiene descargas asociadas.";
      }

      return { success: false, error: errorMessage };
    }
  };

  const filteredResources = useMemo(() => {
    const query = resourceSearch.toLowerCase();
    return resources.filter((resource) =>
      resource.title
        ? resource.title.toLowerCase().includes(query)
        : false
    );
  }, [resources, resourceSearch]);

  const paginatedResources = useMemo(() => {
    const startIndex = (resourcePage - 1) * RESOURCES_PAGE_SIZE;
    return filteredResources.slice(
      startIndex,
      startIndex + RESOURCES_PAGE_SIZE
    );
  }, [filteredResources, resourcePage]);

  const descriptionWordCount = useMemo(
    () => countWords(resourceForm.description),
    [resourceForm.description]
  );

  return {
    resources,
    resourcesLoading,
    resourcesError,
    resourceSearch,
    setResourceSearch,
    resourcePage,
    setResourcePage,
    pageSize: RESOURCES_PAGE_SIZE,
    filteredResourcesCount: filteredResources.length,
    paginatedResources,

    showResourceForm,
    resourceFormMode,
    editingResourceId,
    resourceForm,
    resourceFormErrors,
    resourceFormLoading,
    resourceFiles,
    descriptionWordCount,

    loadResources,
    handleOpenResourceFormCreate,
    handleOpenResourceFormEdit,
    handleCloseResourceForm,
    handleResourceFieldChange,
    handleLocalFileChange,
    handleResourceSubmit,
    deleteResource,
  };
}