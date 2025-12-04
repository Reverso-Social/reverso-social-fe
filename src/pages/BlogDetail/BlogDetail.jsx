import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./BlogDetail.scss";
import { blogApi } from "../../data/blogApiMock";

const BlogDetail = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    blogApi
      .getPostBySlug(slug)
      .then((data) => setPost(data))
      .catch(() => setError("Articulo no encontrado."))
      .finally(() => setLoading(false));
  }, [slug]);

  return (
    <div className="blog-detail-page">
      {loading && <p className="blog-status">Cargando articulo...</p>}
      {error && !loading && <p className="blog-status blog-status--error">{error}</p>}

      {post && !loading && (
        <>
          <section className="blog-detail-hero">
            <div className="blog-detail-hero__text">
              <span className="pill-label">{post.category}</span>
              <h1>{post.title}</h1>
              <p className="detail-meta">
                {post.date} · {post.author} · {post.readingTime} min de lectura
              </p>
            </div>
            <div className="blog-detail-hero__image-wrapper">
              <img src={post.image} alt={post.title} />
            </div>
          </section>

          <section className="blog-detail-content">
            <p>{post.body}</p>
          </section>

          <div className="blog-detail-actions">
            <Link to="/blog" className="back-link">
              ← Volver al blog
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default BlogDetail;
