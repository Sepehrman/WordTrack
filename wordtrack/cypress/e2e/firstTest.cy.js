describe('template spec', () => {
  it('should visit', () => {
    // cy.visit('/')
    cy.visit('/definition')
  })
})
describe('template spec', () => {
  it('asserts true', () => {
    expect(true).to.equal(true)
  })
})
describe('definition input text', () => {
  it('should exist', () => {
    cy.visit('/definition')
    cy.get('[data-cy=input-text-definition]').should("exist")
  })
})