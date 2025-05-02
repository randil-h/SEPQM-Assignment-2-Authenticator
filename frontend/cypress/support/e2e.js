// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import @testing-library/cypress commands
import '@testing-library/cypress/add-commands'

// Custom commands
Cypress.Commands.add('login', (email, password) => {
  cy.visit('/login')
  cy.get('input[name="email"]').type(email)
  cy.get('input[name="password"]').type(password)
  cy.get('button[type="submit"]').click()
})

Cypress.Commands.add('register', (name, email, password, confirmPassword) => {
  cy.visit('/signup')
  cy.get('input[name="name"]').type(name)
  cy.get('input[name="email"]').type(email)
  cy.get('input[name="password"]').type(password)
  cy.get('input[name="confirmPassword"]').type(confirmPassword)
  cy.get('button[type="submit"]').click()
}) 
