describe('Login Page Tests', () => {
  beforeEach(() => {
    cy.visit('/login')
  })

  it('should display login form', () => {
    cy.get('form').should('exist')
    cy.get('input[name="email"]').should('exist')
    cy.get('input[name="password"]').should('exist')
    cy.get('button[type="submit"]').should('exist')
    cy.contains('Welcome back !').should('exist')
    cy.contains('Sign in to your account').should('exist')
  })

  it('should show error message with invalid credentials', () => {
    cy.get('input[name="email"]').type('invalid@example.com')
    cy.get('input[name="password"]').type('wrongpassword')
    cy.get('button[type="submit"]').click()
    cy.get('.bg-red-50').should('be.visible')
    cy.contains('Invalid credentials').should('be.visible')
  })

  it('should successfully login with valid credentials', () => {
    cy.get('input[name="email"]').type('test@example.com')
    cy.get('input[name="password"]').type('password123')
    cy.get('button[type="submit"]').click()
    cy.url().should('include', '/resops-dashboard')
  })

  it('should navigate to signup page when clicking signup link', () => {
    cy.contains('Sign up').click()
    cy.url().should('include', '/signup')
  })

  it('should navigate to forgot password page', () => {
    cy.contains('Forgot password?').click()
    cy.url().should('include', '/forgot-password')
  })
}) 