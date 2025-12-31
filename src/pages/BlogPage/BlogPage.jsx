import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./BlogPage.scss";
import BlogCard from "../../components/BlogCard/BlogCard";
import FeaturedBlogPost from "../../components/FeaturedBlogPost/FeaturedBlogPost";
import blogApi from "../../api/blogApi";
import blogHeroImage from "../../assets/img/group1.webp";
import Background from "../../components/Background/Background";

const BlogPage = () => {
  const { t } = useTranslation('blog');
  const [featuredPost, setFeaturedPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
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
      .catch(() => setError(t('errorLoading')))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Background className="blog-page">
      <section className="blog-hero">
        <div className="blog-hero__content">
          <div className="blog-hero__text">
            <span className="pill-label">{t('label')}</span>
            <h1>
              {t('title')} <span className="gradient-text">{t('titleHighlight')}</span>
            </h1>
            <p>
              {t('subtitle')}
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
        {loading && <p className="blog-status">{t('loading')}</p>}
        {error && !loading && <p className="blog-status blog-status--error">{error}</p>}

        {!loading && !error && (
          <>

            {featuredPost && (
              <div className="blog-featured-section">
                <FeaturedBlogPost post={featuredPost} />
              </div>
            )}


            {recentPosts.length > 0 ? (
              <div className="blog-grid">
                {recentPosts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            ) : (

              !featuredPost && <p className="blog-status">{t('empty')}</p>
            )}
          </>
        )}
      </section>
    </Background>
  );
};

export default BlogPage;
