import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import BlogCard from '../../components/BlogCard/BlogCard.jsx';

describe("BlogCard component", () => {
  const mockPost = {
    title: "Test Blog Post",
    slug: "test-blog-post",
    category: "Tech",
    createdAt: "2025-12-18T10:00:00Z",
    coverImageUrl: "/uploads/test-image.jpg",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    excerpt: "This is a test excerpt",
  };

  it("renders title, category and date correctly", () => {
    render(
      <MemoryRouter>
        <BlogCard post={mockPost} />
      </MemoryRouter>
    );

    expect(screen.getByText(mockPost.title)).toBeInTheDocument();
    expect(screen.getByText(mockPost.category)).toBeInTheDocument();
    expect(screen.getByText("2025-12-18")).toBeInTheDocument();
  });

  it("renders excerpt if provided", () => {
    render(
      <MemoryRouter>
        <BlogCard post={mockPost} />
      </MemoryRouter>
    );

    expect(screen.getByText(mockPost.excerpt)).toBeInTheDocument();
  });

  it("renders preview text from content if excerpt is missing", () => {
    const postWithoutExcerpt = { ...mockPost, excerpt: "" };
    render(
      <MemoryRouter>
        <BlogCard post={postWithoutExcerpt} />
      </MemoryRouter>
    );

    const previewText = postWithoutExcerpt.content
      .split(" ")
      .slice(0, 40)
      .join(" ")
      .concat("…");

    expect(screen.getByText(previewText)).toBeInTheDocument();
  });

  it("renders image with correct src if coverImageUrl is relative", () => {
    render(
      <MemoryRouter>
        <BlogCard post={mockPost} />
      </MemoryRouter>
    );

    const img = screen.getByAltText(mockPost.title);
    expect(img).toBeInTheDocument();
    expect(img.src).toContain(mockPost.coverImageUrl); 
  });

  it("does not render image if coverImageUrl is missing", () => {
    const postNoImage = { ...mockPost, coverImageUrl: null };
    render(
      <MemoryRouter>
        <BlogCard post={postNoImage} />
      </MemoryRouter>
    );

    const img = screen.queryByRole("img");
    expect(img).not.toBeInTheDocument();
  });

  it("has correct link to blog detail page", () => {
    render(
      <MemoryRouter>
        <BlogCard post={mockPost} />
      </MemoryRouter>
    );

    const link = screen.getByRole("link", { name: /leer más/i });
    expect(link).toHaveAttribute("href", `/blog/${mockPost.slug}`);
  });
});