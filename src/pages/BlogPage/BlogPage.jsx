import React, { useEffect, useState } from "react";
import "./BlogPage.scss";
import BlogCard from "../../components/BlogCard/BlogCard";
import { blogApi } from "../../services/blogApiMock";
import blogHeroImage from "../../assets/img/group1.webp";
import Background from "../../components/Background/Background";

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    blogApi
      .listPosts()
      .then((data) => setPosts(data))
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
              Explora nuestros artículos, análisis y novedades sobre incidencia
              social y política. Un espacio para la reflexión y el cambio.
            </p>
          </div>

          <div className="blog-hero__visual" aria-hidden="true">
            <div className="circle circle--1"></div>
            <div className="circle circle--2"></div>
            <div className="circle circle--3"></div>

            <div className="blog-hero__image-frame">
              <img
                src={blogHeroImage}
                alt="Personas colaborando en Reverso Social"
                className="blog-hero__image"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="blog-grid-container">
        {loading && <p className="blog-status">Cargando artículos...</p>}
        {error && !loading && (
          <p className="blog-status blog-status--error">{error}</p>
        )}
        {!loading && !error && (
          <div className="blog-grid">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>
    </Background>
  );
};

export default BlogPage;
