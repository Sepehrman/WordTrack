describe('personal profile test', () => {
    it('route exists', () => {
      cy.visit('/profile').should("exist")
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
  
  describe('go to personal page', () => {
    it('should exist', () => {
      cy.visit('/login')
      cy.get('[data-cy="input-text-email"]').clear().type("nathan@mail.com")
      cy.get('[data-cy="input-text-password"]').clear().type("hellothere")
      cy.get('[data-cy="btn-login"]').click()
      cy.wait(500)
      cy.visit('/profile')
      cy.get('[data-cy="profile-text-bar"]').should("exist")
      cy.get('[data-cy="category-button"]').should("exist")
    })
  })


  describe('add a category', () => {
    it('should exist', () => {
      cy.visit('/login')
      cy.get('[data-cy="input-text-email"]').clear().type("nathan@mail.com")
      cy.get('[data-cy="input-text-password"]').clear().type("hellothere")
      cy.get('[data-cy="btn-login"]').click()
      cy.wait(500)
      cy.visit('/profile')
      cy.get('[data-cy="profile-text-bar"]').should("exist")
      cy.get('[data-cy="category-button"]').should("exist")
      cy.get('[data-cy="profile-text-bar"]').clear().type("apple")
      cy.get('[data-cy="category-button"]').click()
      cy.wait(500)
      cy.get('[data-cy="category-apple"]').should("exist")
    })
  })


  describe('Delete a Category', () => {
    it('should exist', () => {
      cy.visit('/login')
      cy.get('[data-cy="input-text-email"]').clear().type("nathan@mail.com")
      cy.get('[data-cy="input-text-password"]').clear().type("hellothere")
      cy.get('[data-cy="btn-login"]').click()
      cy.wait(500)
      cy.visit('/profile')
      cy.wait(500)
      cy.get('[data-cy="delete-category-button-apple"]').click()
      cy.wait(500)
      cy.visit('/profile')
      cy.wait(500)
      cy.get('[data-cy="category-apple"]').should("not.exist")
  })})

  describe('adds categories in alphabetical order', () => {
    it('should exist', () => {
      cy.visit('/login')
      cy.get('[data-cy="input-text-email"]').clear().type("nathan@mail.com")
      cy.get('[data-cy="input-text-password"]').clear().type("hellothere")
      cy.wait(500)
      cy.get('[data-cy="btn-login"]').click()
      cy.wait(500)
      cy.visit('/profile')
      cy.get('[data-cy="profile-text-bar"]').should("exist")
      cy.get('[data-cy="category-button"]').should("exist")
      cy.get('[data-cy="profile-text-bar"]').clear().type("apple")
      cy.wait(500)
      cy.get('[data-cy="category-button"]').click()
      cy.wait(500)
      cy.get('[data-cy="profile-text-bar"]').clear().type("bannana")
      cy.wait(500)
      cy.get('[data-cy="category-button"]').click()
      cy.wait(500)
      cy.get('[data-cy="category-apple"]').should("exist")
    })
  })
