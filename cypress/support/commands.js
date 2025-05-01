// cypress/support/commands.js

// Custom Cypress commands for API testing

Cypress.Commands.add('apiRequest', (method, url, body = null) => {
    return cy.request({
        method,
        url: `${Cypress.env('apiUrl')}${url}`,
        body,
        headers: {
            'Content-Type': 'application/json',
        },
        failOnStatusCode: false
    });
});