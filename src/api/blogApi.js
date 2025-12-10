const BASE_URL = "http://localhost:8080/api/blogposts";

const blogApi = {
  async getAll({ status, category } = {}) {
    try {
      const params = new URLSearchParams();

      if (status) params.append("status", status);
      if (category) params.append("category", category);

      const res = await fetch(`${BASE_URL}?${params.toString()}`);
      if (!res.ok) throw new Error("Error fetching blog posts");

      return await res.json();
    } catch (error) {
      console.error("blogApi.getAll:", error);
      throw error;
    }
  },

  async getPublished() {
    return this.getAll({ status: "PUBLISHED" });
  },

  async getLatest(limit = 5) {
    try {
      const res = await fetch(`${BASE_URL}/latest?limit=${limit}`);
      if (!res.ok) throw new Error("Error fetching latest posts");
      return await res.json();
    } catch (error) {
      console.error("blogApi.getLatest:", error);
      throw error;
    }
  },

  async getById(id) {
    try {
      const res = await fetch(`${BASE_URL}/${id}`);
      if (!res.ok) throw new Error("Error fetching post by ID");
      return await res.json();
    } catch (error) {
      console.error("blogApi.getById:", error);
      throw error;
    }
  },

  async getBySlug(slug) {
    try {
      const res = await fetch(`${BASE_URL}/slug/${slug}`);
      if (!res.ok) throw new Error("Error fetching post by slug");
      return await res.json();
    } catch (error) {
      console.error("blogApi.getBySlug:", error);
      throw error;
    }
  },

  async create({ title, category, content, status, image }) {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("category", category);
      formData.append("content", content);
      formData.append("status", status);
      if (image) formData.append("image", image);

      const res = await fetch(BASE_URL, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.message || "Error creating blog post");
      }

      return await res.json();
    } catch (error) {
      console.error("blogApi.create:", error);
      throw error;
    }
  },

  async update(id, { title, category, content, status, image }) {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("category", category);
      formData.append("content", content);
      formData.append("status", status);
      if (image) formData.append("image", image);

      const res = await fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.message || "Error updating blog post");
      }

      return await res.json();
    } catch (error) {
      console.error("blogApi.update:", error);
      throw error;
    }
  },

  async remove(id) {
    try {
      const res = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Error deleting blog post");

      return true;
    } catch (error) {
      console.error("blogApi.remove:", error);
      throw error;
    }
    
  },
};

export default blogApi;
