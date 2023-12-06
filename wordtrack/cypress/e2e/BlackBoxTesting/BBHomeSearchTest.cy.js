/**
 * Black Box Testing of Login Page
 * 
 * Derived using Equivilence Partitioning
 */

describe('definition input text: empty search input', () => {
  it('should exist', () => {
    cy.visit('/')
    cy.get('[data-cy="input-text-definition-search"]').clear();   // Empty
    cy.get('[data-cy="input-btn-definition-search"]').click();

    // Definition container will not appear, invalid search input
    cy.get('[data-cy="word-def-container"]').should("not.exist")
  })
})

describe('definition input text: 1 character long search input', () => {
  it('should exist', () => {
    cy.visit('/')
    cy.get('[data-cy="input-text-definition-search"]').clear().type("a")

    cy.get('[data-cy="input-btn-definition-search"]').click()
    cy.wait(500)
    cy.get('[data-cy="definition-container"]').should("exist")
    cy.get('[data-cy="text-definition-word"]').should("exist")

    // Word should appear in definition
    cy.get('[data-cy="text-definition-word"]').contains(/a/g)
    
    cy.get('[data-cy="definition-note-textarea"]').should("exist")
    
    cy.get('[data-cy="btn-definition-pronouce"]').first().should("exist")
    cy.get('[data-cy="btn-save-word"]').should("exist")
  })
})

describe('definition input text: 2 character long search input', () => {
  it('should exist', () => {
    cy.visit('/')
    cy.get('[data-cy="input-text-definition-search"]').clear().type("me")

    cy.get('[data-cy="input-btn-definition-search"]').click()
    cy.wait(500)
    cy.get('[data-cy="definition-container"]').should("exist")
    cy.get('[data-cy="text-definition-word"]').should("exist")

    // Word should appear in definition
    cy.get('[data-cy="text-definition-word"]').contains(/me/g)
    
    cy.get('[data-cy="definition-note-textarea"]').should("exist")
    
    cy.get('[data-cy="btn-definition-pronouce"]').first().should("exist")
    cy.get('[data-cy="btn-save-word"]').should("exist")
  })
})