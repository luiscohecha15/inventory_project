import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CreateProduct from './CreateProduct';

vi.mock('../services/api', () => ({
  default: { get: vi.fn(() => Promise.resolve({ data: [] })), post: vi.fn() },
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

describe('CreateProduct', () => {
  it('renders heading', () => {
    render(
      <BrowserRouter>
        <CreateProduct />
      </BrowserRouter>
    );
    expect(screen.queryByText('Create Product')).toBeTruthy();
  });

  it('renders inputs and select', () => {
    const { container } = render(
      <BrowserRouter>
        <CreateProduct />
      </BrowserRouter>
    );
    expect(container.querySelectorAll('input').length).toBeGreaterThanOrEqual(3);
    expect(container.querySelector('select')).toBeTruthy();
  });
});
