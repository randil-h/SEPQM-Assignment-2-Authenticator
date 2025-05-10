/**
 * Cypress End-to-End Test Suite for Signup Page UI
 * 
 * These tests verify that all UI components of the signup page
 * render correctly and function as expected. Each test focuses
 * on a specific aspect of the signup flow.
 */

describe("Signup Page UI Components", () => {
  // Before each test, navigate to the signup page
  beforeEach(() => {
    cy.visit("/signup");
  });

  /**
   * Test 1: Verify basic page elements
   * Checks that the main heading and login link text are visible
   */
  it("displays heading and instructions", () => {
    cy.contains("Join us today !").should("be.visible");
    cy.contains("Already have an account?").should("be.visible");
  });

  /**
   * Test 2: Verify all input fields in step 1
   * Checks that all required fields for the first step of signup exist
   * and have the correct input types
   */
  it("displays all step 1 input fields", () => {
    cy.get("input[name='name']").should("be.visible").and("have.attr", "type", "text");
    cy.get("input[name='email']").should("be.visible").and("have.attr", "type", "email");
    cy.get("input[name='password']").should("be.visible").and("have.attr", "type", "password");
    cy.get("input[name='confirmPassword']").should("be.visible").and("have.attr", "type", "password");
    cy.get("button[type='submit']").contains("Continue").should("be.visible");
  });

  /**
   * Test 3: Verify navigation to step 2
   * Fills out step 1 with valid data and checks that we can
   * proceed to step 2 of the signup process
   */
  it("navigates to step 2 when 'Next' is clicked with valid data", () => {
    // Fill out all required fields in step 1
    cy.get("input[name='name']").type("Cypress Tester");
    cy.get("input[name='email']").type("tester@example.com");
    cy.get("input[name='password']").type("testpassword");
    cy.get("input[name='confirmPassword']").type("testpassword");
    cy.get("button[type='submit']").click();

    // Verify we've moved to step 2 by checking for the step 2 heading
    cy.contains("Just a few more details to complete your profile").should("be.visible");
  });

  /**
   * Test 4: Verify step 2 form fields
   * Checks that all expected fields are present in the second step
   * of the signup process
   */
  it("displays step 2 fields correctly", () => {
    // Complete step 1 first to get to step 2
    cy.get("input[name='name']").type("Cypress Tester");
    cy.get("input[name='email']").type("tester@example.com");
    cy.get("input[name='password']").type("testpassword");
    cy.get("input[name='confirmPassword']").type("testpassword");
    cy.get("button[type='submit']").click();

    // Now check step 2 UI elements
    cy.get("input[name='address']").should("be.visible");
    cy.get("select[name='role']").should("be.visible");
    cy.get("input[name='agree']").should("exist").should("have.attr", "type", "checkbox");
    cy.get("button[type='submit']").contains("Create Account").should("be.visible");
  });

  /**
   * Test 5: Verify login page link
   * Checks that the link to the login page exists and has the correct URL
   */
  it("has link to login page", () => {
    cy.contains("Already have an account?")
      .parent()
      .find("a")
      .should("have.attr", "href")
      .and("include", "/login");
  });
});
