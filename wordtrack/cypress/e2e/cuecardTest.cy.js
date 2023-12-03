/* eslint-disable no-undef */
describe('Showcases cue card word info', () => {
  it('should exist', () => {
    cy.visit('/login')
    cy.get('[data-cy="input-text-email"]').clear().type("nathan@mail.com")
    cy.get('[data-cy="input-text-password"]').clear().type("hellothere")
    cy.wait(500)
    cy.get('[data-cy="btn-login"]').click()
    cy.wait(500)
    cy.url().should('equal', `${Cypress.config("baseUrl")}/`)

    cy.visit('/profile')
    cy.wait(500)
    cy.get('[data-cy="cue-card-button-apple"]').click()
    cy.wait(500)
    cy.get('[data-cy="cue-card-def"]').should("exist")
    cy.get('[data-cy="h1-def"]').contains('Definition: apple')
    

  })
})