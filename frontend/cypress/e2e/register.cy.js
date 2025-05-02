describe('Register Page Tests', () => {
  beforeEach(() => {
    cy.visit('/signup')
  })

  it('should display signup form', () => {
    cy.get('form').should('exist')
    cy.get('input[name="name"]').should('exist')
    cy.get('input[name="email"]').should('exist')
    cy.get('input[name="password"]').should('exist')
    cy.get('input[name="confirmPassword"]').should('exist')
    cy.contains('Continue').should('exist')
  })

  it('should show error when passwords dont match', () => {
    cy.get('input[name="name"]').type('Test User')
    cy.get('input[name="email"]').type('test@example.com')
    cy.get('input[name="password"]').type('password123')
    cy.get('input[name="confirmPassword"]').type('differentpassword')
    cy.get('form').submit()
    cy.contains('Passwords do not match').should('exist')
  })

  it('should proceed to step 2 with valid step 1 data', () => {
    cy.get('input[name="name"]').type('Test User')
    cy.get('input[name="email"]').type('test@example.com')
    cy.get('input[name="password"]').type('password123')
    cy.get('input[name="confirmPassword"]').type('password123')
    cy.get('form').submit()
    cy.contains('Just a few more details').should('exist')
  })

  it('should show error when required fields are missing', () => {
    cy.get('form').submit()
    cy.contains('Please fill all required fields').should('exist')
  })

  it('should navigate to login page', () => {
    // More specific selector with force:true to ensure click
    cy.contains('Sign in')
        .should('be.visible')
        .click({ force: true })

    // Add timeout and more specific assertion
    cy.url({ timeout: 10000 }).should('eq', 'http://localhost:3000/login')
  })

  describe('Step 2 Tests', () => {
    beforeEach(() => {
      // Fill and submit step 1 first
      cy.get('input[name="name"]').type('Test User')
      cy.get('input[name="email"]').type('test@example.com')
      cy.get('input[name="password"]').type('password123')
      cy.get('input[name="confirmPassword"]').type('password123')
      cy.get('form').submit()
    })

    it('should display step 2 form', () => {
      cy.get('input[name="address"]').should('exist')
      cy.get('select[name="role"]').should('exist')
      cy.get('input[name="agree"]').should('exist')
      cy.contains('Create Account').should('exist')
    })

    it('should go back to step 1', () => {
      cy.contains('Back').click()
      cy.contains("Let's get started").should('exist')
    })

    it('should require agreement checkbox', () => {
      cy.get('input[name="address"]').type('123 Test Street')
      cy.get('select[name="role"]').select('customer')
      cy.get('form').submit()
      cy.contains('Registration failed').should('exist')
    })
  })
})