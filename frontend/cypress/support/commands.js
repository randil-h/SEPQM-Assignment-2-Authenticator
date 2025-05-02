Cypress.Commands.add('login', (email, password) => {
    cy.visit('/login')
    cy.get('input[name="email"]').type(email)
    cy.get('input[name="password"]').type(password)
    cy.get('form').submit()
    cy.url().should('include', '/') // Verify redirect to home
})

Cypress.Commands.add('logout', () => {
    // Implement logout logic based on your app
    cy.get('[data-testid="logout-button"]').click()
    cy.url().should('include', '/login')
})