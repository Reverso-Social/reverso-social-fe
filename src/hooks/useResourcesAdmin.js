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

      if (resourceFiles.localFile) {
        console.log('📤 Subiendo archivo a /resources/upload...');
        fileUrl = await resourceService.uploadFile(resourceFiles.localFile);
        console.log('✅ Archivo subido, URL:', fileUrl);
      }

      if (resourceFiles.localImage) {
        console.log('📤 Subiendo imagen a /resources/upload...');
        previewImageUrl = await resourceService.uploadFile(resourceFiles.localImage);
        console.log('✅ Imagen subida, URL:', previewImageUrl);
      }

      const resourceData = {
        title: resourceForm.title.trim(),
        description: resourceForm.description?.trim() || null,
        type: resourceForm.type,
        fileUrl: fileUrl,
        previewImageUrl: previewImageUrl || null,
        isPublic: resourceForm.isPublic
      };

      console.log('📦 Guardando recurso con JSON:', resourceData);
      console.log('🔑 Token presente:', !!localStorage.getItem('reverso_token'));

      if (resourceFormMode === "create") {
        const response = await resourceService.create(resourceData);
        console.log('✅ Recurso creado:', response);
      } else if (resourceFormMode === "edit" && editingResourceId) {
        const response = await resourceService.update(editingResourceId, resourceData);
        console.log('✅ Recurso actualizado:', response);
      }

      await loadResources();
      handleCloseResourceForm();
    } catch (error) {
      console.error("❌ Error al guardar recurso:", error);

      let errorMessage = "Error al guardar el recurso.";
      
      if (error.response?.data) {
        const errorData = error.response.data;
        
        if (errorData.message) {
          errorMessage = errorData.message;
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
      
      console.log('🔍 Error detallado:', errorMessage);
      
      setResourceFormErrors({
        submit: errorMessage
      });
    } finally {
      setResourceFormLoading(false);
    }
  };

  const deleteResource = async (id) => {
    try {
      await resourceService.delete(id);
      setResources((prev) => prev.filter((r) => r.id !== id));
    } catch (error) {
      console.error("Error al eliminar recurso:", error);
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