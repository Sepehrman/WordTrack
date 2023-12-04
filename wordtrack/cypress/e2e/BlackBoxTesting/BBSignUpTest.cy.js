/**
 * Black Box Testing of Sign Up Page
 *
 * Derived using Equivilence Partitioning
 * 
 * Inputs:
 * Email
 * Password
 */

// *******************************************************************
// *Email Input
// Email can be checked without entering password inputs
// *******************************************************************

// * Number of Characters

const validEmail = "nathan@mail.com";
const validPassword = "hellothere"; // !Invalid password when signing up

const validEmailShort = "i@li.ca";
const validPasswordShort = "Hellothere1";



// 1
describe("invalid email input login test: empty email", () => {
  it("should show error message and not redirect to home", () => {
    cy.visit("/signup");
    cy.get('[data-cy="input-text-email"]').clear(); // Empty
    cy.get('[data-cy="btn-signup"]').click();
    cy.wait(500);

     // Correct Error message shows up
     cy.get('[data-cy="txt-signup-err"]').should("exist").contains(/Invalid Email. Please enter a valid Email/g)

    // Doesn't redirect
    cy.url().should("equal", `${Cypress.config("baseUrl")}/signup`);
  });
});

// 2
describe("invalid email input login test: short email", () => {
  it("should show error message and not redirect to home", () => {
    cy.visit("/signup");
    cy.get('[data-cy="input-text-email"]').clear().type("a");
    cy.get('[data-cy="input-text-password"]').clear().type(validPassword);
    cy.get('[data-cy="btn-signup"]').click();
    cy.wait(500);

    // Correct Error message shows up
    cy.get('[data-cy="txt-signup-err"]').should("exist").contains(/Invalid Email. Please enter a valid Email/g)

    // shouldn't redirect
    cy.url().should("equal", `${Cypress.config("baseUrl")}/signup`);
  });
});

// 3
// describe('invalid email input login test: 5-short email', () => {
//   it('should redirect to home', () => {
//     cy.visit('/login')
//     cy.get('[data-cy="input-text-email"]').clear().type("“a@a.a")
//     cy.get('[data-cy="input-text-password"]').clear().type(validPasswordShort)
//     cy.get('[data-cy="btn-signup"]').click()
//     cy.wait(500)

    // // Correct Error message shows up
    // cy.get('[data-cy="txt-signup-err"]').should("exist").contains(/Invalid Email. Please enter a valid Email/g)

//     // Doesn't redirect
//     cy.url().should('equal', `${Cypress.config("baseUrl")}/signup`)
//   })
// })

// 4
describe("valid email input login test: short email", () => {
  it("should redirect to home", () => {
    cy.visit("/signup");
    cy.get('[data-cy="input-text-email"]').clear().type("i@li.ca");
    cy.get('[data-cy="btn-signup"]').click();
    cy.wait(500);

    // Correct Error message shows up, email is valid
    cy.get('[data-cy="txt-signup-err"]').should("exist").contains(/Passwords should not be blank./g)
    
    // shouldn't redirect
    cy.url().should('equal', `${Cypress.config("baseUrl")}/signup`)
  });
});

// 5
describe("valid email input login test: longer email", () => {
  it("should redirect to home", () => {
    cy.visit("/signup");
    cy.get('[data-cy="input-text-email"]').clear().type("nathan@mail.com");
    cy.get('[data-cy="btn-signup"]').click();
    cy.wait(500);

    // Correct Error message shows up, email is valid
    cy.get('[data-cy="txt-signup-err"]').should("exist").contains(/Passwords should not be blank./g)

    // shouldn't redirect
    cy.url().should('equal', `${Cypress.config("baseUrl")}/signup`)
  });
});

// 6
describe("valid email input login test: long email", () => {
  it("should redirect to home", () => {
    cy.visit("/signup");
    cy.get('[data-cy="input-text-email"]')
      .clear()
      .type(
        "sixtyfouristhenumberofcharsyoucancountinthisemailaddressusername@this-loong-domain-name-is-exactly-one-hundred-and.eighty-nine-characters-long-including-the-dots-so-if.you-count-all-the-letters-and-dots.you-will-get-one-hundred-and-eighty-nine.ladedu.com"
      );
    cy.get('[data-cy="btn-signup"]').click();
    cy.wait(500);

    // Correct Error message shows up, email is valid
    cy.get('[data-cy="txt-signup-err"]').should("exist").contains(/Passwords should not be blank./g)
    
    // shouldn't redirect
    cy.url().should('equal', `${Cypress.config("baseUrl")}/signup`)
  });
});

// 7
describe("invalid email input login test: too long email", () => {
  it("should show error message and not redirect to home", () => {
    cy.visit("/signup");
    cy.get('[data-cy="input-text-email"]')
      .clear()
      .type(
        "sixtyfouristhenumberofcharsyoucancountinthisemailaddressusernameplusmore@this-loong-domain-name-is-exactly-one-hundred-and.eighty-nine-characters-long-including-the-dots-so-if.you-count-all-the-letters-and-dots.you-will-get-one-hundred-and-eighty-nine.ladedu.com"
      );
    cy.get('[data-cy="input-text-password"]').clear().type(validPasswordShort);
    cy.get('[data-cy="input-text-confirm-password"]').clear().type(validPasswordShort);
    cy.get('[data-cy="btn-signup"]').click();
    cy.wait(500);
    
     // Correct Error message shows up
     cy.get('[data-cy="txt-signup-err"]').should("exist").contains(/Invalid email address format. Please check your Email./g);

    // shouldn't redirect
    cy.url().should("equal", `${Cypress.config("baseUrl")}/signup`);
  });
});

/** 
 * * Number of @ symbols
 */

// 1
describe("invalid email input login test: zero @ symbols", () => {
  it("should show error message and not redirect to home", () => {
    cy.visit("/signup");
    cy.get('[data-cy="input-text-email"]')
      .clear()
      .type(
        "nathanmail.com"
      );
    cy.get('[data-cy="btn-signup"]').click();
    cy.wait(500);

     // Correct Error message shows up
     cy.get('[data-cy="txt-signup-err"]').should("exist").contains(/Invalid Email. Please enter a valid Email/g)

    // Doesn't redirect
    cy.url().should("equal", `${Cypress.config("baseUrl")}/signup`);
  });
});

// 2
describe("valid email input login test: 1 @ symbols", () => {
  it("should redirect to home", () => {
    cy.visit("/signup");
    cy.get('[data-cy="input-text-email"]')
      .clear()
      .type(
        "apple@mail.com"
      );
    cy.get('[data-cy="btn-signup"]').click();
    cy.wait(500);

    // Correct Error message shows up, email is valid
    cy.get('[data-cy="txt-signup-err"]').should("exist").contains(/Passwords should not be blank./g)
    
    // shouldn't redirect
    cy.url().should('equal', `${Cypress.config("baseUrl")}/signup`)
  });
});

// 3
describe("invalid email input login test: 2 @ symbols", () => {
  it("should show error message and not redirect to home", () => {
    cy.visit("/signup");
    cy.get('[data-cy="input-text-email"]')
      .clear()
      .type(
        "@pple@mail.com"
      );
    cy.get('[data-cy="btn-signup"]').click();
    cy.wait(500);

     // Correct Error message shows up
     cy.get('[data-cy="txt-signup-err"]').should("exist").contains(/Invalid Email. Please enter a valid Email/g)

    // Doesn't redirect
    cy.url().should("equal", `${Cypress.config("baseUrl")}/signup`);
  });
});

/** 
 * * Number of . symbols
 */

// 1
describe("invalid email input login test: zero . symbols", () => {
  it("should show error message and not redirect to home", () => {
    cy.visit("/signup");
    cy.get('[data-cy="input-text-email"]')
      .clear()
      .type(
        "name@mailcom"
      );
    cy.get('[data-cy="btn-signup"]').click();
    cy.wait(500);

    // Correct Error message shows up
    cy.get('[data-cy="txt-signup-err"]').should("exist").contains(/Invalid Email. Please enter a valid Email/g)

    // Doesn't redirect
    cy.url().should("equal", `${Cypress.config("baseUrl")}/signup`);
  });
});

// 2
describe("valid email input login test: 1 . symbols", () => {
  it("should show error message and not redirect to home", () => {
    cy.visit("/signup");
    cy.get('[data-cy="input-text-email"]')
      .clear()
      .type(
        "apple@mail.com"
      );
    cy.get('[data-cy="btn-signup"]').click();
    cy.wait(500);

    // Correct Error message shows up, email is valid
    cy.get('[data-cy="txt-signup-err"]').should("exist").contains(/Passwords should not be blank./g)
    
    // shouldn't redirect
    cy.url().should('equal', `${Cypress.config("baseUrl")}/signup`)
  });
});

// 3
describe("valid email input login test: 2 . symbols", () => {
  it("should show correct error message and not redirect to home", () => {
    cy.visit("/signup");
    cy.get('[data-cy="input-text-email"]')
      .clear()
      .type(
        "app.le@mail.com"
      );
    cy.get('[data-cy="btn-signup"]').click();
    cy.wait(500);

    // Correct Error message shows up, email is valid
    cy.get('[data-cy="txt-signup-err"]').should("exist").contains(/Passwords should not be blank./g)
    
    // shouldn't redirect
    cy.url().should('equal', `${Cypress.config("baseUrl")}/signup`)
  });
});


// *******************************************************************
// * Password Input and Confirm Password Input
// *******************************************************************
// * Tested together because they are interdependent and should
// * the same values for the system to accept it

// * Number of Characters

// 1
describe("invalid password input login test: empty input", () => {
  it("should show correct error message and not redirect to home", () => {
    cy.visit("/signup");
    cy.get('[data-cy="input-text-email"]')
      .clear()
      .type(validEmail);
    cy.get('[data-cy="input-text-password"]').clear();  // Empty
    cy.get('[data-cy="input-text-confirm-password"]').clear();  // Empty
    cy.get('[data-cy="btn-signup"]').click();
    cy.wait(500);
    
    // Correct Error message shows up
    cy.get('[data-cy="txt-signup-err"]').should("exist").contains(/Passwords should not be blank./g)

    // shouldn't redirect
    cy.url().should("equal", `${Cypress.config("baseUrl")}/signup`);
  });
});

// 2
describe("invalid password input login test: 6 chars long input", () => {
  it("should show correct error message and not redirect to home", () => {
    cy.visit("/signup");
    cy.get('[data-cy="input-text-email"]')
      .clear()
      .type(validEmail);
    cy.get('[data-cy="input-text-password"]').clear().type("Short1");
    cy.get('[data-cy="input-text-confirm-password"]').clear().type("Short1");
    cy.get('[data-cy="btn-signup"]').click();
    cy.wait(500);
    
    // Correct Error message shows up
    cy.get('[data-cy="txt-signup-err"]').should("exist").contains(/Invalid Password. Password must contain at least 8 characters with one uppercase letter, one lowercase letter, and one digit./g)

    // shouldn't redirect
    cy.url().should("equal", `${Cypress.config("baseUrl")}/signup`);
  });
});

// 3
describe("invalid password input login test: 7 chars long input", () => {
  it("should show correct error message and not redirect to home", () => {
    cy.visit("/signup");
    cy.get('[data-cy="input-text-email"]')
      .clear()
      .type(validEmail);
    cy.get('[data-cy="input-text-password"]').clear().type("Seven_7");
    cy.get('[data-cy="input-text-confirm-password"]').clear().type("Seven_7");
    cy.get('[data-cy="btn-signup"]').click();
    cy.wait(500);
    
    // Correct Error message shows up
    cy.get('[data-cy="txt-signup-err"]').should("exist").contains(/Invalid Password. Password must contain at least 8 characters with one uppercase letter, one lowercase letter, and one digit./g)

    // shouldn't redirect
    cy.url().should("equal", `${Cypress.config("baseUrl")}/signup`);
  });
});

// 4
describe("valid password input login test: 8 chars long input", () => {
  it("should show correct error message and not redirect to home", () => {
    cy.visit("/signup");
    cy.get('[data-cy="input-text-email"]')
      .clear()
      .type(validEmail);
    cy.get('[data-cy="input-text-password"]').clear().type("Eight888");
    cy.get('[data-cy="input-text-confirm-password"]').clear().type("Eight888");
    cy.get('[data-cy="btn-signup"]').click();
    cy.wait(500);
    
    // Correct Error message shows up for valid passwords
    cy.get('[data-cy="txt-signup-err"]').should("exist").contains(/The email address is already registered in our system/g)

    // shouldn't redirect
    cy.url().should("equal", `${Cypress.config("baseUrl")}/signup`);
  });
});

// 5
describe("valid password input login test: 12 chars long input", () => {
  it("should show correct error message and not redirect to home", () => {
    cy.visit("/signup");
    cy.get('[data-cy="input-text-email"]')
      .clear()
      .type(validEmail);
    cy.get('[data-cy="input-text-password"]').clear().type("TwelveLettersLong1");
    cy.get('[data-cy="input-text-confirm-password"]').clear().type("TwelveLettersLong1");
    cy.get('[data-cy="btn-signup"]').click();
    cy.wait(500);
    
    // Correct Error message shows up for valid passwords
    cy.get('[data-cy="txt-signup-err"]').should("exist").contains(/The email address is already registered in our system/g)

    // shouldn't redirect
    cy.url().should("equal", `${Cypress.config("baseUrl")}/signup`);
  });
});

const valid200CharLongPassword = "urhBHqfIK4HUVGQQDs85n6mM4YrIHSqeCD612lLbERNuBvI6tD+U12Q3eiZ3ALA1NZDUFlA/nhHTh/QRG75bfaudASAVxy+AjeGFMuNzWDHpqHE9Y8UNfdujScKunzPtDR48kxyiAa6jvun6TvFtKuY4fG4Ahc/v2ySrGExJTfeTdAWz5bItbRK3Tl2oD8Kq53fsbMJg";

const invalid201CharLongPassword = "urhBHqfIK4HUVGQQDs85n6mM4YrIHSqeCD612lLbERNuBvI6tD+U12Q3eiZ3ALA1NZDUFlA/nhHTh/QRG75bfaudASAVxy+AjeGFMuNzWDHpqHE9Y8UNfdujScKunzPtDR48kxyiAa6jvun6TvFtKuY4fG4Ahc/v2ySrGExJTfeTdAWz5bItbRK3Tl2oD8Kq53fsbMJg+";

// 5
describe("valid password input login test: 200 chars long input", () => {
  it("should show correct error message and not redirect to home", () => {
    cy.visit("/signup");
    cy.get('[data-cy="input-text-email"]').clear().type("nathan@mail.com");
    cy.get('[data-cy="input-text-password"]').clear().type(valid200CharLongPassword);
    cy.get('[data-cy="input-text-confirm-password"]').clear().type(valid200CharLongPassword);
    cy.get('[data-cy="btn-signup"]').click();
    cy.wait(500);
    
    // Correct Error message shows up for valid passwords
    // cy.get('[data-cy="txt-signup-err"]').should("exist").contains(/The email address is already registered in our system/g);
    cy.get('[data-cy="txt-signup-err"]').should("exist").contains("The email address is already registered in our system");

    // shouldn't redirect
    cy.url().should("equal", `${Cypress.config("baseUrl")}/signup`);
  });
});

// 6
describe("invalid password input login test: 201 chars long input", () => {
  it("should show correct error message and not redirect to home", () => {
    cy.visit("/signup");
    cy.get('[data-cy="input-text-email"]').clear().type(validEmail);
    cy.get('[data-cy="input-text-password"]').clear().type(invalid201CharLongPassword);
    cy.get('[data-cy="input-text-confirm-password"]').clear().type(invalid201CharLongPassword);
    cy.get('[data-cy="btn-signup"]').click();
    cy.wait(500);
    
    // Correct Error message shows up
    cy.get('[data-cy="txt-signup-err"]').should("exist").contains(/Invalid Password. Password must be less than 200 characters or less./g);

    // shouldn't redirect
    cy.url().should("equal", `${Cypress.config("baseUrl")}/signup`);
  });
});
