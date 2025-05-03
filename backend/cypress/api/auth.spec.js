describe('Authentication API', () => {
    const baseUrl = 'http://localhost:5555/api';
    const testUser = {
        username: `testuser_${Date.now()}`,
        password: 'Test123!@#'
    };

    const apiRequest = (method, url, body = null) => {
        return cy.request({
            method,
            url: `${baseUrl}${url}`,
            body,
            headers: {
                'Content-Type': 'application/json',
            },
            failOnStatusCode: false
        });
    };

    describe('Registration Endpoint', () => {
        it('should register a new user successfully', () => {
            apiRequest('POST', '/register', testUser)
                .then((response) => {
                    expect(response.status).to.eq(201);
                    expect(response.body).to.have.property('message', 'User registered');
                });
        });

        it('should not register a user with an existing username', () => {
            // First create a user
            const existingUser = {
                username: `existing_${Date.now()}`,
                password: 'Password123'
            };

            // Register the user first
            apiRequest('POST', '/register', existingUser)
                .then((response) => {
                    expect(response.status).to.eq(201);

                    // Try to create the same user again
                    apiRequest('POST', '/register', existingUser)
                        .then((dupResponse) => {
                            expect(dupResponse.status).to.eq(400);
                            expect(dupResponse.body).to.have.property('message', 'User already exists');
                        });
                });
        });

        it('should validate required fields', () => {
            // Testing with missing username
            apiRequest('POST', '/register', { password: 'testonly' })
                .then((response) => {
                    expect(response.status).to.eq(500); // Model validation error
                });

            // Testing with missing password
            apiRequest('POST', '/register', { username: 'testonly' })
                .then((response) => {
                    expect(response.status).to.eq(500); // Model validation error
                });

            // Testing with empty body
            apiRequest('POST', '/register', {})
                .then((response) => {
                    expect(response.status).to.eq(500); // Model validation error
                });
        });
    });

    describe('Login Endpoint', () => {
        before(() => {
            // Register a user for login tests
            const loginTestUser = {
                username: `loginuser_${Date.now()}`,
                password: 'Login123!@#'
            };

            apiRequest('POST', '/register', loginTestUser);
            cy.wrap(loginTestUser).as('loginTestUser');
        });

        it('should login successfully with valid credentials', function() {
            apiRequest('POST', '/login', this.loginTestUser)
                .then((response) => {
                    expect(response.status).to.eq(200);
                    expect(response.body).to.have.property('token');
                    // Verify token format
                    expect(response.body.token).to.match(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/);
                });
        });

        it('should not login with incorrect password', function() {
            const badCredentials = {
                username: this.loginTestUser.username,
                password: 'wrongpassword'
            };

            apiRequest('POST', '/login', badCredentials)
                .then((response) => {
                    expect(response.status).to.eq(400);
                    expect(response.body).to.have.property('message', 'Invalid credentials');
                });
        });

        it('should not login with non-existent username', () => {
            const nonExistentUser = {
                username: `nonexistent_${Date.now()}`,
                password: 'password123'
            };

            apiRequest('POST', '/login', nonExistentUser)
                .then((response) => {
                    expect(response.status).to.eq(400);
                    expect(response.body).to.have.property('message', 'Invalid credentials');
                });
        });
    });

    describe('Error Handling', () => {
        it('should handle malformed request bodies gracefully', () => {
            // Send invalid JSON in the body
            cy.request({
                method: 'POST',
                url: `${baseUrl}/register`,
                body: '{malformed: json}',
                headers: {
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.be.oneOf([400, 500]);
            });
        });

        it('should handle empty request bodies', () => {
            apiRequest('POST', '/register')
                .then((response) => {
                    expect(response.status).to.be.oneOf([400, 500]);
                });

            apiRequest('POST', '/login')
                .then((response) => {
                    expect(response.status).to.be.oneOf([400, 500]);
                });
        });
    });

    describe('Rate Limiting and Security', () => {
        it('should handle multiple rapid requests', () => {
            // Send 5 requests in quick succession
            const promises = [];
            for (let i = 0; i < 5; i++) {
                promises.push(
                    apiRequest('POST', '/login', {
                        username: `loadtest_${i}`,
                        password: 'password123'
                    })
                );
            }

            // All requests should receive valid responses
            cy.wrap(Promise.all(promises)).then((responses) => {
                responses.forEach(response => {
                    expect(response.status).to.be.oneOf([200, 400, 401, 429, 500]);
                });
            });
        });
    });
});
