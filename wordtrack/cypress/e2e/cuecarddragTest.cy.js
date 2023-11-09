
  describe("Drag Button to Location Test", () => {
    it("should drag a button to another location on the webpage", () => {
      // Visit your application or webpage where the button and the target location exist.
      cy.visit('/login')
      cy.get('[data-cy="input-text-email"]').clear().type("nathan@mail.com")
      cy.get('[data-cy="input-text-password"]').clear().type("hellothere")
      cy.wait(500)
      cy.get('[data-cy="btn-login"]').click()
      cy.wait(500)
      cy.visit('/profile')
  
      // Locate the button element you want to drag and the target location element.
      cy.get('[data-cy="cue-card-button-apple")].as("buttonToDrag")');
      cy.get('[data-cy="category-bananna"]').as("targetLocation");
  
      // Use the cy.drag() command to simulate the drag-and-drop interaction.
      cy.get("@buttonToDrag").drag("@targetLocation", "center", { force: true });
  
      // You can add assertions to verify the result of the drag-and-drop operation.
      // For example, you can check if the button is now located at the target location.
      cy.get("@buttonToDrag").should("be.near", "@targetLocation", 10); // Adjust the tolerance (10) as needed.
    });
  });