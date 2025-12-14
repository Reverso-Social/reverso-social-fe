import { useState, useEffect, useMemo } from "react";
import blogApi from "../api/blogApi";

export const BLOG_STATUS = ["DRAFT", "PUBLISHED", "ARCHIVED"];

const BLOG_PAGE_SIZE = 6;

export default function useBlogAdmin() {
  const [blogs, setBlogs] = useState([]);
  const [blogSearch, setBlogSearch] = useState("");
  const [blogPage, setBlogPage] = useState(1);

  const [showBlogForm, setShowBlogForm] = useState(false);
  const [blogFormMode, setBlogFormMode] = useState("create");
  const [editingBlogId, setEditingBlogId] = useState(null);

  const [blogForm, setBlogForm] = useState({
    title: "",
    subtitle: "",
    content: "",
    category: "",
    status: "PUBLISHED",
    imageUrl: "",
  });

  const [blogFormErrors, setBlogFormErrors] = useState({});
  const [blogFormLoading, setBlogFormLoading] = useState(false);
  const [blogLocalImage, setBlogLocalImage] = useState(null);

  const loadBlogs = async () => {
    try {
      const data = await blogApi.getAll();
      setBlogs(data);
    } catch (error) {
      console.error("Error loading blogs:", error);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  useEffect(() => {
    setBlogPage(1);
  }, [blogSearch, blogs.length]);

  const resetBlogForm = () => {
    setBlogForm({
      title: "",
      subtitle: "",
      content: "",
      category: "",
      status: "PUBLISHED",
      imageUrl: "",
    });
    setBlogFormErrors({});
    setBlogLocalImage(null);
    setEditingBlogId(null);
    setBlogFormMode("create");
  };

  const handleOpenBlogFormCreate = () => {
    resetBlogForm();
    setShowBlogForm(true);
  };

  const handleOpenBlogFormEdit = (blog) => {
    setBlogFormMode("edit");
    setEditingBlogId(blog.id);

    setBlogForm({
      title: blog.title || "",
      subtitle: blog.subtitle || "",
      content: blog.content || "",
      category: blog.category || "",

      status: blog.status || "PUBLISHED",

      imageUrl: blog.coverImageUrl || blog.imageUrl || "",
    });

    setBlogFormErrors({});
    setBlogLocalImage(null);
    setShowBlogForm(true);
  };

  const handleCloseBlogForm = () => {
    setShowBlogForm(false);
    resetBlogForm();
  };

  const handleBlogFieldChange = (event) => {
    const { name, value } = event.target;
    setBlogForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    setBlogFormErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleBlogImageChange = (event) => {
    const file =
      event.target.files && event.target.files[0] ? event.target.files[0] : null;
    setBlogLocalImage(file);
  };

  const validateBlogForm = () => {
    const errors = {};

    // Validar Título (5-100 caracteres)
    if (!blogForm.title.trim()) {
      errors.title = "El título es obligatorio.";
    } else if (blogForm.title.trim().length < 5) {
      errors.title = "El título debe tener al menos 5 caracteres.";
    } else if (blogForm.title.trim().length > 100) {
      errors.title = "El título no puede exceder los 100 caracteres.";
    }

    // Validar Subtítulo (Max 250 caracteres)
    if (blogForm.subtitle && blogForm.subtitle.trim().length > 250) {
      errors.subtitle = "El subtítulo no puede exceder los 250 caracteres.";
    }

    // Validar Contenido (10-5000 caracteres)
    if (!blogForm.content.trim()) {
      errors.content = "El contenido es obligatorio.";
    } else if (blogForm.content.trim().length < 10) {
      errors.content = "El contenido debe tener al menos 10 caracteres.";
    } else if (blogForm.content.trim().length > 5000) {
      errors.content = "El contenido no puede exceder los 5000 caracteres.";
    }

    // Validar Categoría (Max 50 caracteres)
    if (!blogForm.category.trim()) {
      errors.category = "La categoría es obligatoria.";
    } else if (blogForm.category.trim().length > 50) {
      errors.category = "La categoría no puede exceder los 50 caracteres.";
    }

    // Validar Estado
    if (!blogForm.status) {
      errors.status = "Selecciona un estado.";
    } else if (!BLOG_STATUS.includes(blogForm.status)) {
      errors.status = "Estado inválido.";
    }

    // Validar Imagen (si se ha seleccionado una nueva)
    if (blogLocalImage) {
      const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!allowedTypes.includes(blogLocalImage.type)) {
        errors.image = "Solo se permiten imágenes JPG, PNG o WEBP.";
      } else if (blogLocalImage.size > maxSize) {
        errors.image = "La imagen no debe superar los 5MB.";
      }
    }

    return errors;
  };

  const handleBlogSubmit = async (e) => {
    if (e) e.preventDefault();
    setBlogFormErrors({});

    const errors = validateBlogForm();
    if (Object.keys(errors).length > 0) {
      setBlogFormErrors(errors);
      return;
    }

    setBlogFormLoading(true);

    try {
      if (blogFormMode === "create") {
        const createdBlog = await blogApi.create({
          title: blogForm.title,
          subtitle: blogForm.subtitle,
          content: blogForm.content,
          category: blogForm.category,
          status: blogForm.status,
          image: blogLocalImage,
        });

        setBlogs((prev) => [createdBlog, ...prev]);
      } else if (blogFormMode === "edit" && editingBlogId) {
        const updatedBlog = await blogApi.update(editingBlogId, {
          title: blogForm.title,
          subtitle: blogForm.subtitle,
          content: blogForm.content,
          category: blogForm.category,
          status: blogForm.status,
          image: blogLocalImage,
        });

        setBlogs((prev) =>
          prev.map((b) => (b.id === editingBlogId ? updatedBlog : b))
        );
      }

      handleCloseBlogForm();
    } catch (error) {
      console.error("Error saving blog:", error);

      let errorMessage = "Ocurrió un error al guardar. Inténtalo de nuevo.";

      if (error.response) {
        const { status, data } = error.response;
        console.error("Backend error detail (blog):", status, data);

        // Si el backend envía un mensaje específico, úsalo (asumiendo estructura estandar)
        if (data && data.message) {
          errorMessage = data.message;
        } else if (status === 409) {
          errorMessage = "Conflicto: Es posible que el título ya exista.";
        } else if (status === 413) {
          errorMessage = "El archivo es demasiado grande.";
        }
      }

      setBlogFormErrors((prev) => ({
        ...prev,
        submit: errorMessage,
      }));
    } finally {
      setBlogFormLoading(false);
    }
  };
  const deleteBlog = async (id) => {
    try {
      await blogApi.remove(id);
      setBlogs((prev) => prev.filter((b) => b.id !== id));
      if (editingBlogId === id) {
        handleCloseBlogForm();
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      if (error.response) {
        console.error(
          "Backend error detail (delete):",
          error.response.status,
          error.response.data
        );
      }
    }
  };
  const filteredBlogs = useMemo(() => {
    const query = blogSearch.toLowerCase();
    return blogs.filter((blog) => {
      return (
        (blog.title && blog.title.toLowerCase().includes(query)) ||
        (blog.subtitle && blog.subtitle.toLowerCase().includes(query)) ||
        (blog.content && blog.content.toLowerCase().includes(query))
      );
    });
  }, [blogs, blogSearch]);

  const paginatedBlogs = useMemo(() => {
    const startIndex = (blogPage - 1) * BLOG_PAGE_SIZE;
    return filteredBlogs.slice(startIndex, startIndex + BLOG_PAGE_SIZE);
  }, [filteredBlogs, blogPage]);

  return {
    blogs,
    blogSearch,
    setBlogSearch,
    blogPage,
    setBlogPage,
    pageSize: BLOG_PAGE_SIZE,
    filteredBlogsCount: filteredBlogs.length,
    paginatedBlogs,

    showBlogForm,
    blogFormMode,
    editingBlogId,
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
  };
}
