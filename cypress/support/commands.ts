/// <reference types="cypress" />
export {};

Cypress.Commands.add("loginAndNavigate", () => {
  cy.intercept({ resourceType: /xhr/ }, { log: false });

  cy.session("loggedInUser", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Login").click();

    cy.origin("https://coachbotsdev.kinde.com", () => {
      // cy.get('[data-testid="login-account-link"]').click();
      cy.title()
        .should("eq", "Sign in | Coachbots Dev")
        .then(() => {
          cy.get('[data-testid="auth-email-field"]').type(
            "mevibok234@vasomly.com"
          );
          cy.get('[data-testid="auth-submit-button"]').click();
          cy.get("#verify_password_p_password").type("demo#1234");
          cy.contains("Continue").click();
        });
    });

    cy.title()
      .should("eq", "Network - Coachbots")
      .visit(`http://localhost:3000/content-library`);
  });
});

declare global {
  namespace Cypress {
    interface Chainable {
      loginAndNavigate(): Chainable<void>;
    }
  }
}
