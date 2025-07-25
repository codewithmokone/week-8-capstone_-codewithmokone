import '../support/commands';

describe('Login Page', () => {
  const email = 'simon@simon.com';
  const password = '012345';

  beforeEach(() => {
    cy.login('admin@admin.com', '012345');
    cy.visit('/'); // or the actual login route in your app
  });

  it('should render login form', () => {
    cy.get('h1').contains('Sign In');
    cy.get('#email').should('exist');
    cy.get('#password').should('exist');
    cy.get('button').contains('Login').should('be.visible');
  });

  it('should show error if fields are empty', () => {
    cy.get('button').contains('Login').click();
    cy.contains('Please enter both email and password').should('be.visible');
  });

  it('should show error on incorrect credentials', () => {
    cy.get('#email').type('wrong@example.com');
    cy.get('#password').type('wrongpass');
    cy.get('button').contains('Login').should('be.visible');

    // cy.contains('Invalid credentials').should('be.visible');
    cy.get('p.text-red-600', { timeout: 10000 })
    .and('contain.text', 'Invalid');
  });

  it('should login successfully with valid credentials', () => {
    cy.get('#email').type(email);
    cy.get('#password').type(password);
    cy.get('button').contains('Login').click();

    cy.url().should('include', '/dashboard');
    cy.contains('Logged in Success').should('exist'); // works if toast shows up in DOM
  });
});
