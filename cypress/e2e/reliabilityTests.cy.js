//T or total number of test cases derived from the formula = 787.9 or 788 test cases
//(T * 1.38s) + (0.05 * 1800s * T) = 72000s
//(T× time per test)+(failure rate×time to fix a bug×T)= total time available for testing


//Note a single test case here might be composed of multiple test cases
//since a test case might be prerequisite for the next test case, but for
//our reliability here each for loop is considered a test case here.

//Reading Today’s word definition 0.2
for(let i = 0; i < 157; ++i){
    describe('template spec', () => {
        it('should visit', () => {
          cy.visit('/').should("exist")
        })
      })      
}

//Looking up word 0.3
for(let i = 0; i < 236; ++i){
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
}

//Listening to word pronunciation 0.05
for(let i = 0; i < 39; ++i){
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
}

//Adding a note to looked up word 0.01
for(let i = 0; i < 7; ++i){
    //N/A
}

//Replacing a word’s note 0.01
for(let i = 0; i < 7; ++i){
 //N/A
}

//Viewing previously looked up words 0.05
for(let i = 0; i < 39; ++i){

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
}

//Deleting a saved word 0.05
for(let i = 0; i < 39; ++i){
 //N/A
}

//Creating word category/Group 0.1
for(let i = 0; i < 78; ++i){
    describe('add a category', () => {
        it('should exist', () => {
          cy.visit('/login')
          cy.get('[data-cy="input-text-email"]').clear().type("nathan@mail.com")
          cy.get('[data-cy="input-text-password"]').clear().type("hellothere")
          cy.get('[data-cy="btn-login"]').click()
          cy.wait(1000)
          cy.url().should('equal', `${Cypress.config("baseUrl")}/`)
          cy.wait(500)
          cy.visit('/profile')
          cy.wait(500)
          cy.get('[data-cy="profile-text-bar"]').should("exist")
          cy.get('[data-cy="category-button"]').should("exist")
          cy.get('[data-cy="profile-text-bar"]').clear().type("apple")
          cy.get('[data-cy="category-button"]').click()
          cy.wait(500)
          cy.get('[data-cy="category-apple"]').should("exist")
        })
      })
    
}

//Deleting a word category/Group 0.01
for(let i = 0; i < 7; ++i){
    describe('add a category', () => {
        it('should exist', () => {
          cy.visit('/login')
          cy.get('[data-cy="input-text-email"]').clear().type("nathan@mail.com")
          cy.get('[data-cy="input-text-password"]').clear().type("hellothere")
          cy.get('[data-cy="btn-login"]').click()
          cy.wait(1000)
          cy.url().should('equal', `${Cypress.config("baseUrl")}/`)
          cy.wait(500)
          cy.visit('/profile')
          cy.wait(500)
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
          cy.wait(1000)
          cy.url().should('equal', `${Cypress.config("baseUrl")}/`)
          cy.wait(500)
          cy.visit('/profile')
          cy.wait(500)
          cy.get('[data-cy="delete-category-button-apple"]').click()
          cy.wait(500)
          cy.visit('/profile')
          cy.wait(500)
          cy.get('[data-cy="category-apple"]').should("not.exist")
      })})
    
}

//Renaming a word category/Group 0.02
for(let i = 0; i < 15; ++i){
 //N/A
}

//Adding words to a word category/Group 0.1
for(let i = 0; i < 78; ++i){
    describe('add a category', () => {
        it('should exist', () => {
          cy.visit('/login')
          cy.get('[data-cy="input-text-email"]').clear().type("nathan@mail.com")
          cy.get('[data-cy="input-text-password"]').clear().type("hellothere")
          cy.get('[data-cy="btn-login"]').click()
          cy.wait(1000)
          cy.url().should('equal', `${Cypress.config("baseUrl")}/`)
          cy.wait(500)
          cy.visit('/profile')
          cy.wait(500)
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
          cy.wait(1000)
          cy.url().should('equal', `${Cypress.config("baseUrl")}/`)
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
          cy.url().should('equal', `${Cypress.config("baseUrl")}/`)
          cy.wait(500)
          cy.url().should('equal', `${Cypress.config("baseUrl")}/`)
          cy.wait(500)
          cy.visit('/profile')
          cy.wait(500)
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
    
}

//Creating cue cards from a word category/Group
for(let i = 0; i < 78; ++i){
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
}


