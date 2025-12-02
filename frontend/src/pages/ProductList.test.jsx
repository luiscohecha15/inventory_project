import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProductList from './ProductList';

vi.mock('../services/api', () => ({
  default: { get: vi.fn(() => Promise.resolve({ data: [] })) },
}));

describe('ProductList', () => {
  it('renders heading', () => {
    render(
      <BrowserRouter>
        <ProductList />
      </BrowserRouter>
    );
    expect(screen.queryByText('Products')).toBeTruthy();
  });

  it('renders table element', () => {
    const { container } = render(
      <BrowserRouter>
        <ProductList />
      </BrowserRouter>
    );
    expect(container.querySelector('table')).toBeTruthy();
  });
});
