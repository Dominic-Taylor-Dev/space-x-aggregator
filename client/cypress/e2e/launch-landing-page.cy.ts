type LaunchResult = {
  id: string;
  launchName: string;
  rocketName: string;
  launchpadName: string;
  details: string | null;
  date: string;
  success: boolean;
};

describe("Launches landing page", () => {
  describe("When there is no API response", () => {
    it("Displays an error message", () => {
      cy.visit("/");
      cy.contains(
        "We are sorry but something went wrong with your request. Please refresh the page."
      ).should("be.visible");
    });
  });

  describe("When there is a delayed API response", () => {
    it("Displays a spinner", () => {
      cy.intercept("GET", Cypress.env("LAUNCHES_API_ENDPOINT"), {
        fixture: "launches",
        delay: 5000,
      }).as("getDelayedLaunches");

      cy.visit("/");

      cy.get('[data-cy="spinner"]').should("be.visible");

      cy.wait("@getDelayedLaunches").then(() => {
        cy.get('[data-cy="card-list"]').should("be.visible");
      });
    });
  });

  describe("When there is a successful API response", () => {
    it("Displays a list of cards", () => {
      cy.intercept("GET", Cypress.env("LAUNCHES_API_ENDPOINT"), {
        fixture: "launches",
      });
      cy.visit("/");

      cy.fixture("launches").then((launches: { results: LaunchResult[] }) => {
        launches.results.forEach((result) => {
          cy.contains(result.launchName).should("be.visible");
          cy.contains(result.rocketName).should("be.visible");
          cy.contains(result.launchpadName).should("be.visible");

          if (result.details !== null) {
            cy.contains(result.details).should("be.visible");
          }

          if (result.success) {
            cy.contains("Succeeded").should("be.visible");
          } else {
            cy.contains("Failed").should("be.visible");
          }
        });
      });
    });
  });
});
