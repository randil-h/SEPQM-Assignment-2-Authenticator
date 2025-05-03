import 'cypress-plugin-api';
describe('Auth API Functional Tests', () => {
    const baseUrl = 'http://localhost:5555'; // Update with your actual base URL
    const user = {
        username: `testuser${Date.now()}`,
        password: 'test1234'
    };

    let token;

    it('TC1: Should register a new user successfully', () => {
        cy.api({
            method: 'POST',
            url: `${baseUrl}/api/register`,
            body: user
        }).then((res) => {
            expect(res.status).to.eq(201);
            expect(res.body.message).to.eq('User registered');
        });
    });

    it('TC2: Should login with valid credentials', () => {
        cy.api({
            method: 'POST',
            url: `${baseUrl}/api/login`,
            body: user
        }).then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body).to.have.property('token');
            token = res.body.token;
        });
    });

    it('TC3: Should fail login with invalid password', () => {
        cy.api({
            method: 'POST',
            url: `${baseUrl}/api/login`,
            body: {
                username: user.username,
                password: 'wrongpass'
            },
            failOnStatusCode: false
        }).then((res) => {
            expect(res.status).to.eq(400);
            expect(res.body.message).to.eq('Invalid credentials');
        });
    });
});
