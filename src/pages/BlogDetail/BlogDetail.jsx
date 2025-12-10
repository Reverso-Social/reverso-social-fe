import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./BlogDetail.scss";
import blogApi from "../../api/blogApi";

const BlogDetail = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);

    blogApi
      .getBySlug(slug)
      .then((data) => setPost(data))
      .catch(() => setError("Artículo no encontrado."))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return <p className="blog-status">Cargando artículo...</p>;
  }

  if (error) {
    return (
      <p className="blog-status blog-status--error">
        {error}
      </p>
    );
  }

  const formattedDate = new Date(post.createdAt).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Manejo imagen
  const imageUrl = post.coverImageUrl || "/images/default-blog.jpg";

  return (
    <div className="blog-detail-page">
      <section className="blog-detail-hero">
        <div className="blog-detail-hero__text">
          {post.category && <span className="pill-label">{post.category}</span>}
          <h1>{post.title}</h1>
          <p className="detail-meta">
            {formattedDate}
          </p>
        </div>

        <div className="blog-detail-hero__image-wrapper">
          <img src={imageUrl} alt={post.title} />
        </div>
      </section>

      <section className="blog-detail-content">
        <p>{post.content}</p>
      </section>

      <div className="blog-detail-actions">
        <Link to="/blog" className="back-link">
          ← Volver al blog
        </Link>
      </div>
    </div>
  );
};

export default BlogDetail;
