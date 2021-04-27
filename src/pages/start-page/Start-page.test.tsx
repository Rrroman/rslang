import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { StartPage } from './Start-page';

describe('StartPage', () => {
  it('should render StartPage component', () => {
    render(
      <Router>
        <StartPage />
      </Router>
    );
  });
});

describe('StartPage', () => {
  it('should render StartPage component with text "Начать" ', () => {
    render(
      <Router>
        <StartPage />
      </Router>
    );
    expect(screen.getByText(/Начать/i)).toBeInTheDocument();
  });
});

describe('StartPage', () => {
  it('should render StartPage component with list element ', () => {
    render(
      <Router>
        <StartPage />
      </Router>
    );
    expect(screen.getByRole('list')).toBeInTheDocument();
  });
});

test('renders h1 with text Учите новые слова легко с приложением Smart Cat!', () => {
  render(
    <Router>
      <StartPage />
    </Router>
  );
  const h1Element = screen.getByText(
    /Учите новые слова легко с приложением Smart Cat!/i
  );
  expect(h1Element).toBeInTheDocument();
});

test('start button should navigate to /dashboard', () => {
  render(
    <Router>
      <StartPage />
    </Router>
  );
  expect(screen.getByRole('link')).toHaveAttribute('href', '/dashboard');
});
