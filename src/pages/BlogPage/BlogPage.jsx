import React, { useEffect, useState } from "react";
import "./BlogPage.scss";
import BlogCard from "../../components/BlogCard/BlogCard";
import FeaturedBlogPost from "../../components/FeaturedBlogPost/FeaturedBlogPost";
import blogApi from "../../api/blogApi";
import blogHeroImage from "../../assets/img/group1.webp";
import Background from "../../components/Background/Background";

const BlogPage = () => {
  const [featuredPost, setFeaturedPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Backend instruction: fetch latest posts with limit (1 featured + 12 grid)
    blogApi
      .getLatest(13)
      .then((data) => {
        if (data && data.length > 0) {
          setFeaturedPost(data[0]);
          setRecentPosts(data.slice(1));
        } else {
          setFeaturedPost(null);
          setRecentPosts([]);
        }
      })
      .catch(() => setError("No pudimos cargar los artículos."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Background className="blog-page">
      <section className="blog-hero">
        <div className="blog-hero__content">
          <div className="blog-hero__text">
            <span className="pill-label">Nuestro blog</span>
            <h1>
              Noticias y <span className="gradient-text">actualidad</span>
            </h1>
            <p>
              Explora artículos, análisis y novedades sobre incidencia social y política.
            </p>
          </div>

          <div className="blog-hero__visual" aria-hidden="true">
            <div className="circle circle--1"></div>
            <div className="circle circle--2"></div>
            <div className="circle circle--3"></div>

            <div className="blog-hero__image-frame">
              <img src={blogHeroImage} alt="Personas colaborando" className="blog-hero__image" />
            </div>
          </div>
        </div>
      </section>

      <section className="blog-grid-container">
        {loading && <p className="blog-status">Cargando artículos...</p>}
        {error && !loading && <p className="blog-status blog-status--error">{error}</p>}

        {!loading && !error && (
          <>
            {/* Show Featured Post if available */}
            {featuredPost && (
              <div className="blog-featured-section">
                <FeaturedBlogPost post={featuredPost} />
              </div>
            )}

            {/* Show Grid if there are remaining posts */}
            {recentPosts.length > 0 ? (
              <div className="blog-grid">
                {recentPosts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              /* Fallback if only 1 post (featured) or 0 posts but no error (though 0 handled by featured check kinda) */
              !featuredPost && <p className="blog-status">No hay artículos publicados aún.</p>
            )}
          </>
        )}
      </section>
    </Background>
  );
};

export default BlogPage;
