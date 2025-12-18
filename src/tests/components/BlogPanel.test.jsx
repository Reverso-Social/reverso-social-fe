import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import BlogPanel from '../../components/BlogPanel/BlogPanel';


vi.mock('../../components/SearchBar/SearchBar', () => ({
  default: ({ value, onChange }) => (
    <input
      data-testid="search-bar"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  ),
}));

vi.mock('../../components/Pagination/Pagination', () => ({
  default: ({ onPageChange }) => (
    <button
      data-testid="pagination"
      onClick={() => onPageChange(2)}
    >
      Next
    </button>
  ),
}));


const baseProps = {
  loading: false,
  error: '',
  count: 0,
  blogs: [],
  page: 1,
  setPage: vi.fn(),
  pageSize: 10,
  search: '',
  setSearch: vi.fn(),
  showForm: false,
  formMode: 'create',
  form: {
    title: '',
    subtitle: '',
    content: '',
    category: '',
    status: 'PUBLISHED',
  },
  formErrors: {},
  formLoading: false,
  localImage: null,
  onOpenCreate: vi.fn(),
  onOpenEdit: vi.fn(),
  onCloseForm: vi.fn(),
  onFieldChange: vi.fn(),
  onImageChange: vi.fn(),
  onSubmit: vi.fn(),
  onDelete: vi.fn(),
};


describe('BlogPanel component', () => {
  it('renders empty state when there are no blogs', () => {
    render(<BlogPanel {...baseProps} />);

    expect(
      screen.getByText(/no hay entradas de blog disponibles/i)
    ).toBeInTheDocument();
  });

  it('renders blog table when blogs exist', () => {
    const blogs = [
      {
        id: 1,
        title: 'React Testing',
        subtitle: 'Testing components',
        category: 'Tech',
        status: 'PUBLISHED',
        createdAt: '2025-01-01',
      },
    ];

    render(
      <BlogPanel
        {...baseProps}
        blogs={blogs}
        count={1}
      />
    );

    expect(screen.getByText('React Testing')).toBeInTheDocument();
    expect(screen.getByText('Publicado')).toBeInTheDocument();
  });

  it('calls onOpenCreate when clicking add button', () => {
    render(<BlogPanel {...baseProps} />);

    screen.getByText('+ Añadir entrada').click();

    expect(baseProps.onOpenCreate).toHaveBeenCalled();
  });

  it('calls edit and delete callbacks', () => {
    const blog = {
      id: 1,
      title: 'Edit me',
      subtitle: '',
      category: 'Tech',
      status: 'DRAFT',
      createdAt: '2025-01-01',
    };

    render(
      <BlogPanel
        {...baseProps}
        blogs={[blog]}
        count={1}
      />
    );

    screen.getByText('Editar').click();
    expect(baseProps.onOpenEdit).toHaveBeenCalledWith(blog);

    screen.getByText('Eliminar').click();
    expect(baseProps.onDelete).toHaveBeenCalledWith(blog);
  });

  it('renders form when showForm is true', () => {
    render(
      <BlogPanel
        {...baseProps}
        showForm
      />
    );

    expect(
      screen.getByText(/añadir entrada de blog/i)
    ).toBeInTheDocument();
  });

  it('changes page when pagination is clicked', () => {
    render(
      <BlogPanel
        {...baseProps}
        count={20}
      />
    );

    screen.getByTestId('pagination').click();

    expect(baseProps.setPage).toHaveBeenCalledWith(2);
  });
});