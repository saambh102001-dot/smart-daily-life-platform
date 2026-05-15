import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import About from '../src/Component/About'; 
import '@testing-library/jest-dom';
import React from 'react';

describe("About Component", () => {
  it("should render the heading", () => {
    render(<About />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
  });

  it("should show the developer name", () => {
    render(<About />);
    const nameText = screen.getByText(/developed by/i);
    expect(nameText).toBeInTheDocument();
  });
});