import { useState, useEffect } from "react";
import blogApi from "../api/blogApi";

const useFetchPost = (slug) => {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!slug) return;

        setLoading(true);
        blogApi
            .getBySlug(slug)
            .then((data) => setPost(data))
            .catch(() => setError("Artículo no encontrado."))
            .finally(() => setLoading(false));
    }, [slug]);

    return { post, loading, error };
};

export default useFetchPost;
