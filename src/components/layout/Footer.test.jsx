import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Footer from './Footer';

describe('Footer', () => {
  it('renders the footer text', () => {
    render(<Footer />);

    expect(
      screen.getByText(/Built in class – Supabase \+ React \+ Vite\./i)
    ).toBeInTheDocument();
  });

  it('renders a footer element', () => {
    const { container } = render(<Footer />);

    const footer = container.querySelector('footer');
    expect(footer).toBeInTheDocument();
  });
});