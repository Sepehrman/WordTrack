/**
 * Black Box Testing of Login Page
 * 
 * Derived using Equivilence Partitioning
 */

const validEmail = "nathan@mail.com"
const validPassword = "hellothere"  // !Invalid password when signing up

describe('valid login test', () => {
  it('should redirect to home', () => {
    cy.visit('/login')
    cy.get('[data-cy="input-text-email"]').clear().type("nathan@mail.com")
    cy.get('[data-cy="input-text-password"]').clear().type("hellothere")
    cy.get('[data-cy="btn-login"]').click()
    cy.wait(500)
    cy.url().should('equal', `${Cypress.config("baseUrl")}/`)
  })
})