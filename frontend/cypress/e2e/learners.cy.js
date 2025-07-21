describe('Learners Page', () => {
  const mockUser = {
    id: '123',
    name: 'Test User',
    role: 'admin', // or 'teacher', 'student' depending on app logic
  };

  beforeEach(() => {
    // Mock current logged-in user API call
    cy.intercept('GET', '/api/currentUser', {
      statusCode: 200,
      body: mockUser,
    }).as('getCurrentUser');
    
    // Mock learners GET API call with role on each learner
    cy.intercept('GET', '/api/learners', {
      statusCode: 200,
      body: [
        {
          _id: '1',
          fullName: 'Test Learner',
          dateOfBirth: '2020-01-01',
          gender: 'Female',
          guardianName: 'Jane Doe',
          contactNumber: '712345678',
        },
      ],
    }).as('getLearners');

    // Visit the learners page
    cy.visit('http://localhost:5173/learners');

    // Wait for both API calls to complete
    cy.wait('@getCurrentUser');
    cy.wait('@getLearners');
  });

  it('should display the learners list', () => {
    cy.contains('Learners');
    cy.get('table').should('exist');
    cy.get('tbody tr').its('length').should('be.gte', 0);
  });

  it('should open the Add Learner modal and submit', () => {
    cy.contains('Add Child').click();

    // Modal should be visible
    cy.contains('Add New Learner').should('be.visible');

    // Fill the form
    cy.get('input[name="fullName"]').type('Test Learner');
    cy.get('input[name="dateOfBirth"]').type('2020-01-01');
    cy.get('input[name="gender"]').type('Female');
    cy.get('input[name="guardianName"]').type('Jane Doe');
    cy.get('input[name="contactNumber"]').type('712345678');

    // Submit
    cy.contains('Add').click();

    // Modal should close (you may mock this if testing frontend only)
    cy.contains('Add New Learner').should('not.exist');

    // Expect new row (depending on state update or backend)
    cy.contains('Test Learner');
  });

  it('should open View modal when clicking View link', () => {
    // Ensure there is at least one row to click
    cy.get('tbody tr').first().within(() => {
      cy.contains('View').click();
    });

    cy.contains('Viewing').should('be.visible');
  });
});
