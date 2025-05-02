describe('Register Page Tests', () => {
  beforeEach(() => {
    cy.visit('/signup')
  })

  it('should display registration form', () => {
    cy.get('form').should('exist')
    cy.get('input[name="name"]').should('exist')
    cy.get('input[name="email"]').should('exist')
    cy.get('input[name="password"]').should('exist')
    cy.get('input[name="confirmPassword"]').should('exist')
    cy.get('button[type="submit"]').should('exist')
  })

  it('should show error message with invalid email format', () => {
    cy.get('input[name="name"]').type('Test User')
    cy.get('input[name="email"]').type('invalid-email')
    cy.get('input[name="password"]').type('password123')
    cy.get('input[name="confirmPassword"]').type('password123')
    cy.get('button[type="submit"]').click()
    cy.contains('Please fill all required fields').should('be.visible')
  })

  it('should show error message with weak password', () => {
    cy.get('input[name="name"]').type('Test User')
    cy.get('input[name="email"]').type('test@example.com')
    cy.get('input[name="password"]').type('weak')
    cy.get('input[name="confirmPassword"]').type('weak')
    cy.get('button[type="submit"]').click()
    cy.contains('Password must be at least 8 characters long').should('be.visible')
  })

  it('should show error message when passwords do not match', () => {
    cy.get('input[name="name"]').type('Test User')
    cy.get('input[name="email"]').type('test@example.com')
    cy.get('input[name="password"]').type('StrongPassword123!')
    cy.get('input[name="confirmPassword"]').type('DifferentPassword123!')
    cy.get('button[type="submit"]').click()
    cy.contains('Passwords do not match').should('be.visible')
  })

  it('should show error message when required fields are empty', () => {
    cy.get('button[type="submit"]').click()
    cy.contains('Please fill all required fields').should('be.visible')
  })

  it('should successfully register with valid information', () => {
    cy.get('input[name="name"]').type('Test User')
    cy.get('input[name="email"]').type('test@example.com')
    cy.get('input[name="password"]').type('StrongPassword123!')
    cy.get('input[name="confirmPassword"]').type('StrongPassword123!')
    cy.get('button[type="submit"]').click()
    cy.url().should('include', '/login')
  })

  it('should navigate to login page when clicking login link', () => {
    cy.contains('Sign in').click()
    cy.url().should('include', '/login')
  })
}) 
