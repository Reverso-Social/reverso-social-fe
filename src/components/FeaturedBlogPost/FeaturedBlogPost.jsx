import React from "react";
import { Link } from "react-router-dom";
import "./FeaturedBlogPost.scss";

// Duplicating logic to ensure isolation as requested to not risk breaking other components
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

const FeaturedBlogPost = ({ post }) => {
    if (!post) return null;

    const imageSrc = getImageSrc(post.coverImageUrl);

    // Use excerpt if available, otherwise truncate content
    const previewText =
        post?.excerpt && post.excerpt.trim().length > 0
            ? post.excerpt
            : post?.content
                ? post.content
                    .replace(/[#*`]/g, "") // Remove markdown chars
                    .replace(/\s+/g, " ")
                    .split(" ")
                    .slice(0, 55) // Longer preview for featured post
                    .join(" ")
                    .concat("…")
                : "";

    const formattedDate = post.createdAt
        ? new Date(post.createdAt).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
        : "";

    return (
        <article className="featured-blog-post">
            <div className="featured-blog-post__image-container">
                {imageSrc && (
                    <img
                        src={imageSrc}
                        alt={post.title}
                        loading="eager" // Load important image immediately
                    />
                )}
            </div>

            <div className="featured-blog-post__content">
                <span className="featured-blog-post__label">En Portada</span>

                {formattedDate && (
                    <span className="featured-blog-post__date">{formattedDate}</span>
                )}

                <h2>
                    <Link to={`/blog/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        {post.title}
                    </Link>
                </h2>

                <p>{previewText}</p>

                <div className="featured-blog-post__footer">
                    <Link to={`/blog/${post.slug}`} className="featured-blog-post__read-more">
                        Leer artículo completo
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </Link>
                </div>
            </div>
        </article>
    );
};

export default FeaturedBlogPost;
