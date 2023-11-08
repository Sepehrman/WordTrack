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
      cy.get('[data-cy="btn-signup"]').should("exist")
    })
  })
  
  describe('invalid login test', () => {
    it('should fail to login', () => {
      cy.visit('/login')
      cy.get('[data-cy="input-text-email"]').clear().type("bruhmoment")
      cy.get('[data-cy="input-text-password"]').clear().type("hhehehehe")
      cy.get('[data-cy="btn-login"]').click()
      cy.wait(500)
      cy.url().should('equal', `${Cypress.config("baseUrl")}/login`)
    })
  })
  
  