/* eslint-disable no-undef */
describe('template spec', () => {
  it('should visit', () => {
    cy.visit('/').should("exist")
  })
})

describe('template spec', () => {
  it('asserts true', () => {
    expect(true).to.equal(true)
  })
})

describe('definition input text', () => {
  it('should exist', () => {
    cy.visit('/')
    cy.get('[data-cy="input-text-definition-search"]').should("exist")
    cy.get('[data-cy="input-btn-definition-search"]').should("exist")
  })
})

describe('definition search no input', () => {
  it('word-def-container should not exist', () => {
    cy.visit('/')
    cy.get('[data-cy="input-text-definition-search"]').clear();   // Empty
    cy.get('[data-cy="input-btn-definition-search"]').click();
    cy.get('[data-cy="word-def-container"]').should("not.exist")
  })
})

describe('definition search basic input', () => {
  it('definition elements all exist and function', () => {
    cy.visit('/')
    cy.get('[data-cy="input-text-definition-search"]').clear().type("apple")

    cy.get('[data-cy="input-btn-definition-search"]').click()
    cy.wait(500)
    cy.get('[data-cy="definition-container"]').should("exist")
    cy.get('[data-cy="text-definition-word"]').should("exist")
    cy.get('[data-cy="text-definition-word"]').contains(/apple/g)
    
    cy.get('[data-cy="definition-note-textarea"]').should("exist")
    
    cy.get('[data-cy="btn-definition-pronouce"]').first().should("exist").click()
    cy.get('[data-cy="btn-save-word"]').should("exist").click()
  })
})

describe('definition search not found', () => {
  it('expected elements if word not found', () => {
    cy.visit('/')
    cy.get('[data-cy="input-text-definition-search"]').clear().type("awfhogwh")
    cy.get('[data-cy="input-btn-definition-search"]').click()
    cy.wait(500)
    // Assert here
    cy.get('[data-cy="text-definition-word"]').should("not.exist")
  })
})