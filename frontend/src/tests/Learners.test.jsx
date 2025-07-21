import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Learners from '../pages/Learners';
import { LearnerContext } from '../context/LearnerContext';
import { vi } from 'vitest';

// Mock AddModal and ViewModal so they don't interfere with test
vi.mock('../components/AddModal', () => ({
  default: ({ isOpen, title }) => isOpen ? <div>{title}</div> : null,
}));

vi.mock('../components/ViewModal', () => ({
  default: ({ isOpen, data }) => isOpen ? <div>Viewing {data?.fullName}</div> : null,
}));

describe('Learners Component', () => {
  const learnersMock = [
    {
      _id: '1',
      fullName: 'Emma Johnson',
      dateOfBirth: '2020-05-01',
      gender: 'Female',
      guardianName: 'Sarah Johnson',
      contactNumber: '712345678',
    },
  ];

  const mockAddLearner = vi.fn();

  const renderWithContext = (data = learnersMock) => {
    render(
      <LearnerContext.Provider
        value={{
          learnersData: data,
          addLearner: mockAddLearner,
          error: null,
        }}
      >
        <Learners />
      </LearnerContext.Provider>
    );
  };

  it('renders learners list', () => {
    renderWithContext();
    expect(screen.getByText('Emma Johnson')).toBeInTheDocument();
    expect(screen.getByText(/Female/)).toBeInTheDocument();
    expect(screen.getByText(/Sarah Johnson/)).toBeInTheDocument();
    expect(screen.getByText('+27 712345678')).toBeInTheDocument();
  });

  it('opens AddModal when "Add Child" is clicked', () => {
    renderWithContext();
    fireEvent.click(screen.getByRole('button', { name: /add child/i }));
    expect(screen.getByText(/add new learner/i)).toBeInTheDocument();
  });

//   it('shows empty state when there are no learners', () => {
//     renderWithContext([]);
//     expect(screen.getByText(/no added learners/i)).toBeInTheDocument();
//   });

  it('opens ViewModal when "View" is clicked', () => {
    renderWithContext();
    fireEvent.click(screen.getByText(/view/i));
    expect(screen.getByText(/viewing emma johnson/i)).toBeInTheDocument();
  });
});
