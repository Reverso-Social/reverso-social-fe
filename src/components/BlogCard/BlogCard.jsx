import React from "react";
import { Link } from "react-router-dom";
import "./BlogCard.scss";

const BlogCard = ({ post }) => {

  const formattedDate = new Date(post.createdAt).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Si el backend no tiene imagen aún, placeholder para evitar el 404 / 403
  const imageUrl = post.coverImageUrl || "/images/default-blog.jpg";

  const excerpt =
    post.content.split(" ").slice(0, 25).join(" ") +
    (post.content.split(" ").length > 25 ? "..." : "");

  return (
    <article className="blog-card">
      <div className="card-image">
        <img src={imageUrl} alt={post.title} />
        {post.category && <span className="category-tag">{post.category}</span>}
      </div>

      <div className="card-content">
        <span className="date">{formattedDate}</span>
        <h3>{post.title}</h3>
        <p>{excerpt}</p>

        <div className="card-footer">
          <Link to={`/blog/${post.slug}`} className="read-more-btn">
            Leer más <span className="arrow-icon">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
