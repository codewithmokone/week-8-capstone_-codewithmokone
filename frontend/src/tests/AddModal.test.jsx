import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AddModal from '../components/AddModal';
import { vi } from 'vitest';

describe('AddModal', () => {
  const mockFields = [
    { name: 'name', placeholder: 'Enter name', required: true },
    { name: 'email', type: 'email', placeholder: 'Enter email', required: true },
  ];

  const setup = (props = {}) => {
    const defaultProps = {
      title: 'Add User',
      fields: mockFields,
      onSubmit: vi.fn(),
      onClose: vi.fn(),
      isOpen: true,
    };

    return render(<AddModal {...defaultProps} {...props} />);
  };

  it('does not render when isOpen is false', () => {
    setup({ isOpen: false });
    expect(screen.queryByText(/Add User/i)).not.toBeInTheDocument();
  });

  it('renders correctly with title and fields', () => {
    setup();

    expect(screen.getByText('Add User')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter email/i)).toBeInTheDocument();
  });

  it('updates input values on change', () => {
    setup();

    const nameInput = screen.getByPlaceholderText(/Enter name/i);
    fireEvent.change(nameInput, { target: { value: 'Alice' } });
    expect(nameInput.value).toBe('Alice');

    const emailInput = screen.getByPlaceholderText(/Enter email/i);
    fireEvent.change(emailInput, { target: { value: 'alice@example.com' } });
    expect(emailInput.value).toBe('alice@example.com');
  });

  it('calls onSubmit with form data and onClose on submit', () => {
    const onSubmit = vi.fn();
    const onClose = vi.fn();
    setup({ onSubmit, onClose });

    fireEvent.change(screen.getByPlaceholderText(/Enter name/i), {
      target: { value: 'Bob' },
    });

    fireEvent.change(screen.getByPlaceholderText(/Enter email/i), {
      target: { value: 'bob@example.com' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Add/i }));

    expect(onSubmit).toHaveBeenCalledWith({
      name: 'Bob',
      email: 'bob@example.com',
    });

    expect(onClose).toHaveBeenCalled();
  });

  it('calls onClose when Cancel is clicked', () => {
    const onClose = vi.fn();
    setup({ onClose });

    fireEvent.click(screen.getByRole('button', { name: /Cancel/i }));
    expect(onClose).toHaveBeenCalled();
  });
});
