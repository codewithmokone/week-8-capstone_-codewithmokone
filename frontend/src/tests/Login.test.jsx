import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from '../pages/Login';
import axios from 'axios';
import '@testing-library/jest-dom';
import { expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

// Mock axios
vi.mock('axios');

// Mock TaskList child component
// vi.mock('../pages/Login', () => ({
//   default: vi.fn(() => <div>Mocked Login</div>),
// }));

describe('Login page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the main heading and input field', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    // render(<Login />);
    expect(screen.getByText(/Sign In/i)).toBeInTheDocument();
    // expect(screen.getByText((content, element) =>
    //   element.textContent === 'Sign In'
    // ))
    expect(screen.getByText(/Email:/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter email/i)).toBeInTheDocument();
    expect(screen.getByText(/Password:/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
  });

  it('updates input values', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText(/Enter email/i);
    const passwordInput = screen.getByPlaceholderText(/Enter password/i);

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: '123456' } });

    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('123456');
  });

  it('submits form and stores user data on success', async () => {
    const mockUser = { id: '1', name: 'John Doe' };
    axios.post.mockResolvedValueOnce({
      data: {
        token: 'fake_token',
        user: { id: '1', name: 'John Doe' }
      }
    });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/Enter email/i), {
      target: { value: 'john@example.com' }
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter password/i), {
      target: { value: '123456' }
    });

    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    await waitFor(() => {
      expect(localStorage.getItem('token')).toBe('fake_token');
      expect(JSON.parse(localStorage.getItem('user'))).toEqual(mockUser);
    });
  });

  it('displays error message on failed login', async () => {
    axios.post.mockRejectedValueOnce({
      response: {
        data: {
          message: 'Invalid credentials',
        },
      },
    });

    render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );

    fireEvent.change(screen.getByPlaceholderText(/Enter email/i), {
      target: { value: 'wrong@example.com' }
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter password/i), {
      target: { value: 'badpass' }
    });

    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    await waitFor(() => {
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
    });
  });
});