import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CreateCategory from './CreateCategory';

vi.mock('../services/api', () => ({
  default: { post: vi.fn() },
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

describe('CreateCategory', () => {
  it('renders heading', () => {
    render(
      <BrowserRouter>
        <CreateCategory />
      </BrowserRouter>
    );
    expect(screen.queryByText('Create Category')).toBeTruthy();
  });

  it('renders form input', () => {
    const { container } = render(
      <BrowserRouter>
        <CreateCategory />
      </BrowserRouter>
    );
    expect(container.querySelector('input')).toBeTruthy();
  });

  it('renders submit button', () => {
    render(
      <BrowserRouter>
        <CreateCategory />
      </BrowserRouter>
    );
    expect(screen.queryByRole('button')).toBeTruthy();
  });
});
