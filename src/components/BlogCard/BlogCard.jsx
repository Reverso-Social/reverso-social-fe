import React from "react";
import { Link } from "react-router-dom";
import "./BlogCard.scss";


const API_ORIGIN = (
  import.meta.env.VITE_API_URL || "http://localhost:8080"
).replace(/\/api\/?$/, "");

const getImageSrc = (coverImageUrl) => {
  if (!coverImageUrl) return null;

  if (
    coverImageUrl.startsWith("http://") ||
    coverImageUrl.startsWith("https://")
  ) {
    return coverImageUrl;
  }
  const normalized =
    coverImageUrl.startsWith("/") ? coverImageUrl : `/${coverImageUrl}`;
  return `${API_ORIGIN}${normalized}`;
};

const BlogCard = ({ post }) => {
  const imageSrc = getImageSrc(post.coverImageUrl);
  const previewText =
    post?.excerpt && post.excerpt.trim().length > 0
      ? post.excerpt
      : post?.content
      ? post.content
          .replace(/\s+/g, " ")
          .split(" ")
          .slice(0, 40)
          .join(" ")
          .concat("…")
      : "";

  return (
    <article className="blog-card">
      <div className="card-image">
        {imageSrc && (
          <img
            src={imageSrc}
            alt={post.title}
          />
        )}
        <span className="category-tag">{post.category}</span>
      </div>

      <div className="card-content">
        <span className="date">
          {post.createdAt ? post.createdAt.split("T")[0] : ""}
        </span>

        <h3>{post.title}</h3>
        <p>{previewText}</p>

        <div className="card-footer">
          <Link to={`/blog/${post.slug}`} className="read-more-btn">
            Leer más →
          </Link>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
