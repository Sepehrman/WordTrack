/**
 * Black Box Testing of Login Page
 *
 * Derived using Equivilence Partitioning
 * 
 * Inputs:
 * Email
 * Password
 */

// *******************************************************************
// *Email Input
// *******************************************************************

// * Number of Characters

const validEmail = "nathan@mail.com";
const validPassword = "hellothere"; // !Invalid password when signing up

const validEmailShort = "i@li.ca";
const validPasswordShort = "Hellothere1";

// 1
describe("invalid email input login test: empty email", () => {
  it("should show error message and not redirect to home", () => {
    cy.visit("/login");
    cy.get('[data-cy="input-text-email"]').clear(); // Empty
    cy.get('[data-cy="input-text-password"]').clear().type(validPassword);
    cy.get('[data-cy="btn-login"]').click();
    cy.wait(500);

    // Error message shows up
    cy.get('[data-cy="txt-login-err"]').should("exist");

    // Doesn't redirect
    cy.url().should("equal", `${Cypress.config("baseUrl")}/login`);
  });
});

// 2
describe("invalid email input login test: short email", () => {
  it("should show error message and not redirect to home", () => {
    cy.visit("/login");
    cy.get('[data-cy="input-text-email"]').clear().type("a");
    cy.get('[data-cy="input-text-password"]').clear().type(validPassword);
    cy.get('[data-cy="btn-login"]').click();
    cy.wait(500);

    // Error message shows up
    cy.get('[data-cy="txt-login-err"]').should("exist");

    // shouldn't redirect
    cy.url().should("equal", `${Cypress.config("baseUrl")}/login`);
  });
});

// 3
// describe('invalid email input login test: 5-short email', () => {
//   it('should redirect to home', () => {
//     cy.visit('/login')
//     cy.get('[data-cy="input-text-email"]').clear().type("“a@a.a")
//     cy.get('[data-cy="input-text-password"]').clear().type(validPasswordShort)
//     cy.get('[data-cy="btn-login"]').click()
//     cy.wait(500)

//     // Error message shows up
//     cy.get('[data-cy="txt-login-err"]').should("exist")

//     // Doesn't redirect
//     cy.url().should('equal', `${Cypress.config("baseUrl")}/login`)
//   })
// })

// 4
describe("valid email input login test: short email", () => {
  it("should redirect to home", () => {
    cy.visit("/login");
    cy.get('[data-cy="input-text-email"]').clear().type("i@li.ca");
    cy.get('[data-cy="input-text-password"]').clear().type(validPasswordShort);
    cy.get('[data-cy="btn-login"]').click();
    cy.wait(500);

    // redirect
    cy.url().should("equal", `${Cypress.config("baseUrl")}/`);
  });
});

// 5
describe("valid email input login test: longer email", () => {
  it("should redirect to home", () => {
    cy.visit("/login");
    cy.get('[data-cy="input-text-email"]').clear().type("nathan@mail.com");
    cy.get('[data-cy="input-text-password"]').clear().type(validPassword);
    cy.get('[data-cy="btn-login"]').click();
    cy.wait(500);

    // redirect
    cy.url().should("equal", `${Cypress.config("baseUrl")}/`);
  });
});

// 6
describe("valid email input login test: long email", () => {
  it("should redirect to home", () => {
    cy.visit("/login");
    cy.get('[data-cy="input-text-email"]')
      .clear()
      .type(
        "sixtyfouristhenumberofcharsyoucancountinthisemailaddressusername@this-loong-domain-name-is-exactly-one-hundred-and.eighty-nine-characters-long-including-the-dots-so-if.you-count-all-the-letters-and-dots.you-will-get-one-hundred-and-eighty-nine.ladedu.com"
      );
    cy.get('[data-cy="input-text-password"]').clear().type(validPasswordShort);
    cy.get('[data-cy="btn-login"]').click();
    cy.wait(500);

    // redirect
    cy.url().should("equal", `${Cypress.config("baseUrl")}/`);
  });
});

// 7
describe("invalid email input login test: too long email", () => {
  it("should show error message and not redirect to home", () => {
    cy.visit("/login");
    cy.get('[data-cy="input-text-email"]')
      .clear()
      .type(
        "sixtyfouristhenumberofcharsyoucancountinthisemailaddressusernameplusmore@this-loong-domain-name-is-exactly-one-hundred-and.eighty-nine-characters-long-including-the-dots-so-if.you-count-all-the-letters-and-dots.you-will-get-one-hundred-and-eighty-nine.ladedu.com"
      );
    cy.get('[data-cy="input-text-password"]').clear().type(validPasswordShort);
    cy.get('[data-cy="btn-login"]').click();
    cy.wait(500);

    // Error message shows up
    cy.get('[data-cy="txt-login-err"]').should("exist");

    // shouldn't redirect
    cy.url().should("equal", `${Cypress.config("baseUrl")}/login`);
  });
});

/** 
 * * Number of @ symbols
 */

// 1
describe("invalid email input login test: zero @ symbols", () => {
  it("should show error message and not redirect to home", () => {
    cy.visit("/login");
    cy.get('[data-cy="input-text-email"]')
      .clear()
      .type(
        "nathanmail.com"
      );
    cy.get('[data-cy="input-text-password"]').clear().type(validPassword);
    cy.get('[data-cy="btn-login"]').click();
    cy.wait(500);

    // Error message shows up
    cy.get('[data-cy="txt-login-err"]').should("exist");

    // shouldn't redirect
    cy.url().should("equal", `${Cypress.config("baseUrl")}/login`);
  });
});

// 2
describe("valid email input login test: 1 @ symbols", () => {
  it("should redirect to home", () => {
    cy.visit("/login");
    cy.get('[data-cy="input-text-email"]')
      .clear()
      .type(
        "nathan@mail.com"
      );
    cy.get('[data-cy="input-text-password"]').clear().type(validPassword);
    cy.get('[data-cy="btn-login"]').click();
    cy.wait(500);

    // redirect
    cy.url().should("equal", `${Cypress.config("baseUrl")}/`);
  });
});

// 3
describe("invalid email input login test: 2 @ symbols", () => {
  it("should show error message and not redirect to home", () => {
    cy.visit("/login");
    cy.get('[data-cy="input-text-email"]')
      .clear()
      .type(
        "@pple@mail.com"
      );
    cy.get('[data-cy="input-text-password"]').clear().type(validPassword);
    cy.get('[data-cy="btn-login"]').click();
    cy.wait(500);

    // Error message shows up
    cy.get('[data-cy="txt-login-err"]').should("exist");

    // shouldn't redirect
    cy.url().should("equal", `${Cypress.config("baseUrl")}/login`);
  });
});

/** 
 * * Number of . symbols
 */

// 1
describe("invalid email input login test: zero . symbols", () => {
  it("should show error message and not redirect to home", () => {
    cy.visit("/login");
    cy.get('[data-cy="input-text-email"]')
      .clear()
      .type(
        "nathan@mailcom"
      );
    cy.get('[data-cy="input-text-password"]').clear().type(validPassword);
    cy.get('[data-cy="btn-login"]').click();
    cy.wait(500);

    // Error message shows up
    cy.get('[data-cy="txt-login-err"]').should("exist");

    // shouldn't redirect
    cy.url().should("equal", `${Cypress.config("baseUrl")}/login`);
  });
});

// 2
describe("valid email input login test: 1 . symbols", () => {
  it("should redirect to home", () => {
    cy.visit("/login");
    cy.get('[data-cy="input-text-email"]')
      .clear()
      .type(
        "nathan@mail.com"
      );
    cy.get('[data-cy="input-text-password"]').clear().type(validPassword);
    cy.get('[data-cy="btn-login"]').click();
    cy.wait(500);

    // redirect
    cy.url().should("equal", `${Cypress.config("baseUrl")}/`);
  });
});

// 3
describe("invalid email input login test: 2 . symbols", () => {
  it("should show error message and not redirect to home", () => {
    cy.visit("/login");
    cy.get('[data-cy="input-text-email"]')
      .clear()
      .type(
        "nath.an@mail.com"
      );
    cy.get('[data-cy="input-text-password"]').clear().type(validPassword);
    cy.get('[data-cy="btn-login"]').click();
    cy.wait(500);

    // Error message shows up
    cy.get('[data-cy="txt-login-err"]').should("exist");

    // shouldn't redirect
    cy.url().should("equal", `${Cypress.config("baseUrl")}/login`);
  });
});


// *******************************************************************
// * Password Input
// *******************************************************************

// * Number of Characters

// 1
describe("invalid password input login test: empty input", () => {
  it("should show correct error message and not redirect to home", () => {
    cy.visit("/login");
    cy.get('[data-cy="input-text-email"]')
      .clear()
      .type(validEmail);
    cy.get('[data-cy="input-text-password"]').clear();  // Empty
    cy.get('[data-cy="btn-login"]').click();
    cy.wait(500);
    
    // Correct Error message shows up
    cy.get('[data-cy="txt-login-err"]').should("exist").contains(/Missing Credentials: Please enter your Password/g)

    // shouldn't redirect
    cy.url().should("equal", `${Cypress.config("baseUrl")}/login`);
  });
});

// 2
describe("invalid password input login test: 1 long input", () => {
  it("should show correct error message and not redirect to home", () => {
    cy.visit("/login");
    cy.get('[data-cy="input-text-email"]')
      .clear()
      .type(validEmail);
    cy.get('[data-cy="input-text-password"]').clear().type("a");  // Empty
    cy.get('[data-cy="btn-login"]').click();
    cy.wait(500);
    
    // Correct Error message shows up
    cy.get('[data-cy="txt-login-err"]').should("exist").contains(/Invalid Login Credentials. please check your Email & Password/g)

    // shouldn't redirect
    cy.url().should("equal", `${Cypress.config("baseUrl")}/login`);
  });
});

// 3
describe("invalid password input login test: non-empty input", () => {
  it("should show correct error message and not redirect to home", () => {
    cy.visit("/login");
    cy.get('[data-cy="input-text-email"]')
      .clear()
      .type(validEmail);
    cy.get('[data-cy="input-text-password"]').clear().type("LongButIncorrectPassword");  // Empty
    cy.get('[data-cy="btn-login"]').click();
    cy.wait(500);
    
    // Correct Error message shows up
    cy.get('[data-cy="txt-login-err"]').should("exist").contains(/Invalid Login Credentials. please check your Email & Password/g)

    // shouldn't redirect
    cy.url().should("equal", `${Cypress.config("baseUrl")}/login`);
  });
});