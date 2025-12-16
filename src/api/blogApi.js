import axiosInstance from "../config/axios";
const BASE_PATH = "/blogposts";

const blogApi = {
  async getAll({ status, category } = {}) {
    try {
      const params = {};

      if (status) params.status = status;
      if (category) params.category = category;

      const res = await axiosInstance.get(BASE_PATH, { params });
      return res.data;
    } catch (error) {
      console.error("blogApi.getAll error:", error);
      throw error;
    }
  },

  async getPublished() {
    return this.getAll({ status: "PUBLISHED" });
  },

  async getLatest(limit = 5) {
    try {
      const res = await axiosInstance.get(`${BASE_PATH}/latest`, {
        params: { limit },
      });
      return res.data;
    } catch (error) {
      console.error("blogApi.getLatest error:", error);
      throw error;
    }
  },

  async getById(id) {
    try {
      const res = await axiosInstance.get(`${BASE_PATH}/${id}`);
      return res.data;
    } catch (error) {
      console.error("blogApi.getById error:", error);
      throw error;
    }
  },

  async getBySlug(slug) {
    try {
      const res = await axiosInstance.get(`${BASE_PATH}/slug/${slug}`);
      return res.data;
    } catch (error) {
      console.error("blogApi.getBySlug error:", error);
      throw error;
    }
  },

  async create({ title, subtitle, content, category, status, image }) {
    try {
      const dto = {
        title,
        subtitle,
        content,
        category,
        status,
      };

      const formData = new FormData();
      formData.append(
        "data",
        new Blob([JSON.stringify(dto)], {
          type: "application/json",
        })
      );
      if (image) {
        formData.append("image", image);
      }

      const res = await axiosInstance.post(BASE_PATH, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return res.data;
    } catch (error) {
      if (error.response) {
        console.error("blogApi.create 400/500:", {
          status: error.response.status,
          data: error.response.data,
        });
      } else {
        console.error("blogApi.create error:", error);
      }
      throw error;
    }
  },
  async update(id, { title, subtitle, content, category, status, image }) {
    try {
      const dto = {
        title,
        subtitle,
        content,
        category,
        status,
      };

      const formData = new FormData();

      formData.append(
        "data",
        new Blob([JSON.stringify(dto)], {
          type: "application/json",
        })
      );

      if (image) {
        formData.append("image", image);
      }

      const res = await axiosInstance.put(`${BASE_PATH}/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return res.data;
    } catch (error) {
      if (error.response) {
        console.error("blogApi.update 400/500:", {
          status: error.response.status,
          data: error.response.data,
        });
      } else {
        console.error("blogApi.update error:", error);
      }
      throw error;
    }
  },

  async remove(id) {
    try {
      await axiosInstance.delete(`${BASE_PATH}/${id}`);
      return true;
    } catch (error) {
      if (error.response) {
        console.error("blogApi.remove 400/500:", {
          status: error.response.status,
          data: error.response.data,
        });
      } else {
        console.error("blogApi.remove error:", error);
      }
      throw error;
    }
  },
};

export default blogApi;
