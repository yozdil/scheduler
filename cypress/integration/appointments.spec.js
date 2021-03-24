describe("Appointments", () => {
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");

    cy.visit("/");

    cy.contains("Monday");
  });
  it("should book an interview", () => {
    // 1.Clicks on the "Add" button in the second appointment
    cy.get("[alt=Add]").first().click();
    // 2.Enters their name
    cy.get("[data-testid=student-name-input]").type("Yam");
    // 3.Chooses an interviewer
    cy.get("[alt='Sylvia Palmer']").click();
    // 4.Clicks the save button
    cy.contains("Save").click();
    // 5.Sees the booked appointment
    cy.contains(".appointment__card--show", "Yam");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });
  it("should edit an interview", () => {
    // 1.Clicks the edit button for the existing appointment
    cy.get("[alt=Edit]").first().click({ force: true });
    // 2.Changes the name and interviewer
    cy.get("[data-testid=student-name-input]").clear().type("Some other Yam");
    cy.get("[alt='Tori Malcolm']").click();
    // 3.Clicks the save button
    cy.contains("Save").click();
    // 4.Sees the edit to the appointment
    cy.contains(".appointment__card--show", "Some other Yam");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });
  it("should cancel an interview", () => {
    // 1.Clicks the delete button for the existing appointment
    cy.get("[alt=Delete]").click({ force: true });
    // 2.Clicks the confirm button
    cy.contains("Confirm").click();
    // 3.Sees the Deleting message
    cy.contains("Deleting").should("exist");
    cy.contains("Deleting").should("not.exist");
    // 4.Sees that the appointment slot is empty
    cy.contains(".appointment__card--show", "Archie Cohen").should("not.exist");
  });
});
