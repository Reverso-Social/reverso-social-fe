import React from "react";
import { useParams, Link } from "react-router-dom";
import SEO from "../../components/SEO/SEO";
import "./BlogDetail.scss";
import useFetchPost from "../../hooks/useFetchPost";
import useBlogUrl from "../../hooks/useBlogUrl";

const BlogDetail = () => {
  const { slug } = useParams();
  const { post, loading, error } = useFetchPost(slug);
  const { getImageUrl } = useBlogUrl();

  const imageSrc = getImageUrl(post?.coverImageUrl);

  if (loading) return <p className="blog-status">Cargando artículo...</p>;
  if (error) return <p className="blog-status blog-status--error">{error}</p>;

  return (
    <div className="blog-detail-page">
      <SEO
        title={`${post.title} | Reverso Social`}
        description={post.content ? post.content.substring(0, 160) + "..." : "Artículo en Reverso Social"}
        name="Reverso Social"
        type="article"
      />
      <section className="blog-detail-hero">
        <div className="blog-detail-hero__text">
          <span className="pill-label">{post.category}</span>
          <h1>{post.title}</h1>

          <p className="detail-meta">
            {post.createdAt?.split("T")[0]} · {post.author}
          </p>
        </div>

        <div className="blog-detail-hero__image-wrapper">
          {imageSrc && (
            <img
              className="blog-detail-image"
              src={imageSrc}
              alt={post.title}
            />
          )}
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
