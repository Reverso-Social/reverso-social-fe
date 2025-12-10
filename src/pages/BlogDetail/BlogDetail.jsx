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
    blogApi
      .getBySlug(slug)
      .then((data) => setPost(data))
      .catch(() => setError("Artículo no encontrado."))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <p className="blog-status">Cargando artículo...</p>;
  if (error) return <p className="blog-status blog-status--error">{error}</p>;

  return (
    <div className="blog-detail-page">
      <section className="blog-detail-hero">
        <div className="blog-detail-hero__text">
          <span className="pill-label">{post.category}</span>
          <h1>{post.title}</h1>

          <p className="detail-meta">
            {post.createdAt?.split("T")[0]} · {post.author}
          </p>
        </div>

        <div className="blog-detail-hero__image-wrapper">
          <img src={post.coverImageUrl} alt={post.title} />
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
