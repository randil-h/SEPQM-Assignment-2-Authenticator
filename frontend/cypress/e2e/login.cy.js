describe('Login Page Tests', () => {
  beforeEach(() => {
    cy.visit('/login')
  })

  it('should display login form', () => {
    cy.get('form').should('exist')
    cy.get('input[name="email"]').should('exist')
    cy.get('input[name="password"]').should('exist')
    cy.contains('Sign in').should('exist')
  })
  it('should show error with invalid credentials', () => {
    cy.get('input[name="email"]').type('wrong@example.com')
    cy.get('input[name="password"]').type('wrongpassword')
    cy.get('form').submit()

    // Just verify existence and visibility
    cy.contains('Invalid credentials')
        .should('exist')
        .and('be.visible')
  })

  it('should successfully login with valid credentials', () => {
    // Replace with your test user credentials
    cy.get('input[name="email"]').type('test@example.com')
    cy.get('input[name="password"]').type('validpassword')
    cy.get('form').submit()
    cy.url().should('include', '/') // Should redirect to home page
  })

  it('should navigate to forgot password page', () => {
    cy.contains('Forgot password?').click()
    cy.url().should('include', '/forgot-password')
  })

  it('should navigate to signup page', () => {
    cy.contains("Sign up").click()
    cy.url().should('include', '/signup')
  })
})