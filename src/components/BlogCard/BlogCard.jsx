import React from "react";
import { Link } from "react-router-dom";
import "./BlogCard.scss";

const BlogCard = ({ post }) => {
  return (
    <article className="blog-card">
      <div className="card-image">
        <img src={post.image} alt={post.title} />
        <span className="category-tag">{post.category}</span>
      </div>
      <div className="card-content">
        <span className="date">{post.date}</span>
        <h3>{post.title}</h3>
        <p>{post.excerpt}</p>
        <div className="card-footer">
          <Link to={`/blog/${post.slug}`} className="read-more-btn">
            Leer mas <span className="arrow-icon">-&gt;</span>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
