import React from 'react';
import { render, screen } from '@testing-library/react';
import { AboutUs } from './About-us';

describe('AboutUs', () => {
  it('should render AboutUs component with alt text name Roman', () => {
    render(<AboutUs />);
    expect(screen.getByAltText('Roman')).toBeInTheDocument();
  });
});

describe('AboutUs', () => {
  it('should render AboutUs component with alt text name Gaziz', () => {
    render(<AboutUs />);
    expect(screen.getByAltText('Gaziz')).toBeInTheDocument();
  });
});

describe('AboutUs', () => {
  it('AboutUs component should have headings', () => {
    render(<AboutUs />);
    expect(screen.getAllByRole('heading')).toBeTruthy();
  });
});

describe('AboutUs', () => {
  it('AboutUs component should have links', () => {
    render(<AboutUs />);
    expect(screen.getAllByRole('link')).toBeTruthy();
  });
});

describe('AboutUs', () => {
  it('AboutUs component should have paragraphs', () => {
    render(<AboutUs />);
    screen.debug();
    expect(screen.getAllByRole('img')).toBeTruthy();
  });
});
