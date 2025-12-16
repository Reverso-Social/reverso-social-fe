const API_ORIGIN = (
    import.meta.env.VITE_API_URL || "http://localhost:8080"
).replace(/\/api\/?$/, "");

const useBlogUrl = () => {
    const getImageUrl = (coverImageUrl) => {
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

    return { getImageUrl };
};

export default useBlogUrl;
