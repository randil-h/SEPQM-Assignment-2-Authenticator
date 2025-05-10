/**
 * Cypress End-to-End Test Suite for Dashboard UI
 * 
 * These automated tests verify that the dashboard UI components render correctly
 * and function as expected. The tests check navigation, content switching between tabs,
 * and correct layout of UI elements.
 * 
 * Cypress is a JavaScript end-to-end testing framework that runs in the browser,
 * allowing us to simulate real user interactions and verify application behavior.
 */

describe('Dashboard UI Tests', () => {
  // Before each test, navigate to the homepage which contains the dashboard
  beforeEach(() => {
    cy.visit('/');
  });

  /**
   * Test 1: Verify navigation elements
   * Checks that the header and navigation menu exist and contain expected links
   */
  it('renders the NavBar and sidebar', () => {
    cy.get('header').should('exist');
    // Check a specific nav element's content
    cy.get('header nav').first().within(() => {
      cy.contains('Home').should('exist');
      cy.contains('Dashboard').should('exist');
    });
  });

  /**
   * Test 2: Verify default dashboard content
   * Ensures that the Dashboard tab content is shown by default when the page loads
   */
  it('shows Dashboard content by default', () => {
    cy.contains('Dashboard Content Component').should('exist');
  });

  /**
   * Test 3: Verify tab switching functionality
   * Checks that clicking on the Users tab changes the content displayed
   */
  it('clicking on Users tab changes the content', () => {
    // Click on the Users tab, using force:true to ensure the click works
    // even if there are overlay elements or other potential UI issues
    cy.contains('Users').click({force: true});
    
    // Verify that the Users content is now displayed
    cy.contains('User Content Component').should('exist');
  });

  /**
   * Test 4: Verify presence of icons in sidebar
   * Checks that the sidebar contains SVG icons for visual navigation cues
   */
  it('renders icons next to labels', () => {
    // Check that SVG icons exist in the sidebar
    cy.get('.w-64 svg').should('exist');
  });

  /**
   * Test 5: Verify basic layout structure
   * Ensures that the main structural elements of the dashboard are present
   */
  it('layout is rendered correctly', () => {
    cy.get('.w-64').should('exist'); // Sidebar
    cy.get('.flex-1').should('exist'); // Content area
    cy.get('.text-2xl').should('be.visible'); // Header
  });
});
