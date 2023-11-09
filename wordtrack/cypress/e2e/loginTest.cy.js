describe('route test', () => {
  it('route exists', () => {
    cy.visit('/login').should("exist")
  })
})

describe('elements test', () => {
  it('should exist', () => {
    cy.visit('/login')
    cy.get('[data-cy="input-text-email"]').should("exist")
    cy.get('[data-cy="input-text-password"]').should("exist")
    cy.get('[data-cy="btn-login"]').should("exist")
  })
})

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

