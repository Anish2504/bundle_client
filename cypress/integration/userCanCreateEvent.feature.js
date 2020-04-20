describe("user can create an event", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.server();
    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/events",
      response: "fixture:create_event_response.json",
    });
  });

  it("succesfully see create event", () => {
    cy.get("#create-button").contains("Create Event").click();
    cy.get("#create-form").within(() => {
      cy.get("#title").type("Play baseball");
      cy.get("#description").type("I need a lot of people");
      cy.get("div[name='people']").click();
      cy.get('div[role="option"]').contains("5").click();
      cy.get("div[name='category']").click();
      cy.get('div[role="option"]').contains("Outdoors").click();
      cy.get("#submit").click();
    });
    cy.get("#create-message").should("contain", "Your event has been created");
    cy.get("#event-3").within(() => {
      cy.get("#title").should("contain", "Play baseball");
      cy.get("#description").should("contain", "I need a lot of people");
    });
  });
});

describe("user cannot create event with empty fields", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.server();
    cy.route({
      method: "POST",
      url: "http://localhost:3000",
      response: "fixture:create_event_response.json",
    });
  });

  it("cannot create event without a title", () => {
    cy.get("#create-button").contains("Create Event").click();
    cy.get("#create-form").within(() => {
      cy.get("#description").type("I need a lot of people");
      cy.get("div[name='people']").click();
      cy.get('div[role="option"]').contains("5").click();
      cy.get("div[name='category']").click();
      cy.get('div[role="option"]').contains("Outdoors").click();
      cy.get("#submit").click();
    });
    it("contain", "#Title can't be empty");
  });

  it("cannot create event without a description", () => {
    cy.get("#create-button").contains("Create Event").click();
    cy.get("#create-form").within(() => {
      cy.get("#title").type("Play baseball");
      cy.get("div[name='people']").click();
      cy.get('div[role="option"]').contains("5").click();
      cy.get("div[name='category']").click();
      cy.get('div[role="option"]').contains("Outdoors").click();
      cy.get("#submit").click();
    });
    it("contain", "# Description can't be empty");
  });

  it("cannot create event without specifying how many people are invited", () => {
    cy.get("#create-button").contains("Create Event").click();
    cy.get("#create-form").within(() => {
      cy.get("#title").type("Play baseball");
      cy.get("#description").type("I need a lot of people");
      cy.get("div[name='category']").click();
      cy.get('div[role="option"]').contains("Outdoors").click();
      cy.get("#submit").click();
    });
    it("contain", "# Description can't be empty");
  });

  it("cannot create event without specifying category", () => {
    cy.get("#create-button").contains("Create Event").click();
    cy.get("#create-form").within(() => {
      cy.get("#title").type("Play baseball");
      cy.get("#description").type("I need a lot of people");
      cy.get("div[name='people']").click();
      cy.get('div[role="option"]').contains("5").click();
      cy.get("#submit").click();
    });
    it("contain", "# Description can't be empty");
  });
});
