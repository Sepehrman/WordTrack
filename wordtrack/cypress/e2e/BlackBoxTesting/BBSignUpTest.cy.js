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
describe("invalid email input signup test: empty email", () => {
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
describe("invalid email input signup test: short email", () => {
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
// describe('invalid email input signup test: 5-short email', () => {
//   it('should redirect to home', () => {
//     cy.visit('/signup')
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
describe("valid email input signup test: short email", () => {
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
describe("valid email input signup test: longer email", () => {
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
describe("valid email input signup test: long email", () => {
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
describe("invalid email input signup test: too long email", () => {
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
describe("invalid email input signup test: zero @ symbols", () => {
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
describe("valid email input signup test: 1 @ symbols", () => {
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
describe("invalid email input signup test: 2 @ symbols", () => {
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
describe("invalid email input signup test: zero . symbols", () => {
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
describe("valid email input signup test: 1 . symbols", () => {
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
describe("valid email input signup test: 2 . symbols", () => {
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
describe("invalid password input signup test: empty input", () => {
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
describe("invalid password input signup test: 6 chars long input", () => {
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
describe("invalid password input signup test: 7 chars long input", () => {
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
describe("valid password input signup test: 8 chars long input", () => {
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
describe("valid password input signup test: 12 chars long input", () => {
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

// 6
describe("valid password input signup test: 200 chars long input", () => {
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

// 7
describe("invalid password input signup test: 201 chars long input", () => {
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


// * Number of Uppercase Letters

// 1
describe("invalid password input signup test: 0 uppercase in input", () => {
  it("should show correct error message and not redirect to home", () => {
    cy.visit("/signup");
    cy.get('[data-cy="input-text-email"]').clear().type(validEmail);
    cy.get('[data-cy="input-text-password"]').clear().type("password1");
    cy.get('[data-cy="input-text-confirm-password"]').clear().type("password1");
    cy.get('[data-cy="btn-signup"]').click();
    cy.wait(500);
    
    // Correct Error message shows up
    cy.get('[data-cy="txt-signup-err"]').should("exist").contains(/Invalid Password. Password must contain at least 8 characters with one uppercase letter, one lowercase letter, and one digit./g)

    // shouldn't redirect
    cy.url().should("equal", `${Cypress.config("baseUrl")}/signup`);
  });
});

// 2
describe("valid password input signup test: 1 uppercase in input", () => {
  it("should show correct error message and not redirect to home", () => {
    cy.visit("/signup");
    cy.get('[data-cy="input-text-email"]').clear().type(validEmail);
    cy.get('[data-cy="input-text-password"]').clear().type("Password1");
    cy.get('[data-cy="input-text-confirm-password"]').clear().type("Password1");
    cy.get('[data-cy="btn-signup"]').click();
    cy.wait(500);
    
    // Correct Error message shows up for valid passwords
    cy.get('[data-cy="txt-signup-err"]').should("exist").contains(/The email address is already registered in our system/g)

    // shouldn't redirect
    cy.url().should("equal", `${Cypress.config("baseUrl")}/signup`);
  });
});

// 3
describe("valid password input signup test: 2 uppercase in input", () => {
  it("should show correct error message and not redirect to home", () => {
    cy.visit("/signup");
    cy.get('[data-cy="input-text-email"]').clear().type(validEmail);
    cy.get('[data-cy="input-text-password"]').clear().type("PAssword1");
    cy.get('[data-cy="input-text-confirm-password"]').clear().type("PAssword1");
    cy.get('[data-cy="btn-signup"]').click();
    cy.wait(500);
    
    // Correct Error message shows up for valid passwords
    cy.get('[data-cy="txt-signup-err"]').should("exist").contains(/The email address is already registered in our system/g)

    // shouldn't redirect
    cy.url().should("equal", `${Cypress.config("baseUrl")}/signup`);
  });
});

// * Number of Lowercase Letters

// 1
describe("invalid password input signup test: 0 lowercase in input", () => {
  it("should show correct error message and not redirect to home", () => {
    cy.visit("/signup");
    cy.get('[data-cy="input-text-email"]').clear().type(validEmail);
    cy.get('[data-cy="input-text-password"]').clear().type("PASSWORD1");
    cy.get('[data-cy="input-text-confirm-password"]').clear().type("PASSWORD1");
    cy.get('[data-cy="btn-signup"]').click();
    cy.wait(500);
    
    // Correct Error message shows up
    cy.get('[data-cy="txt-signup-err"]').should("exist").contains(/Invalid Password. Password must contain at least 8 characters with one uppercase letter, one lowercase letter, and one digit./g)

    // shouldn't redirect
    cy.url().should("equal", `${Cypress.config("baseUrl")}/signup`);
  });
});

// 2
describe("valid password input signup test: 1 lowercase in input", () => {
  it("should show correct error message and not redirect to home", () => {
    cy.visit("/signup");
    cy.get('[data-cy="input-text-email"]').clear().type(validEmail);
    cy.get('[data-cy="input-text-password"]').clear().type("pASSWORD1");
    cy.get('[data-cy="input-text-confirm-password"]').clear().type("pASSWORD1");
    cy.get('[data-cy="btn-signup"]').click();
    cy.wait(500);
    
    // Correct Error message shows up for valid passwords
    cy.get('[data-cy="txt-signup-err"]').should("exist").contains(/The email address is already registered in our system/g)

    // shouldn't redirect
    cy.url().should("equal", `${Cypress.config("baseUrl")}/signup`);
  });
});

// 3
describe("valid password input signup test: 2 lowercase in input", () => {
  it("should show correct error message and not redirect to home", () => {
    cy.visit("/signup");
    cy.get('[data-cy="input-text-email"]').clear().type(validEmail);
    cy.get('[data-cy="input-text-password"]').clear().type("paSSWORD1");
    cy.get('[data-cy="input-text-confirm-password"]').clear().type("paSSWORD1");
    cy.get('[data-cy="btn-signup"]').click();
    cy.wait(500);
    
    // Correct Error message shows up for valid passwords
    cy.get('[data-cy="txt-signup-err"]').should("exist").contains(/The email address is already registered in our system/g)

    // shouldn't redirect
    cy.url().should("equal", `${Cypress.config("baseUrl")}/signup`);
  });
});

// * Number of Numbers

// 1
describe("invalid password input signup test: 0 numbers in input", () => {
  it("should show correct error message and not redirect to home", () => {
    cy.visit("/signup");
    cy.get('[data-cy="input-text-email"]').clear().type(validEmail);
    cy.get('[data-cy="input-text-password"]').clear().type("Password");
    cy.get('[data-cy="input-text-confirm-password"]').clear().type("Password");
    cy.get('[data-cy="btn-signup"]').click();
    cy.wait(500);
    
    // Correct Error message shows up
    cy.get('[data-cy="txt-signup-err"]').should("exist").contains(/Invalid Password. Password must contain at least 8 characters with one uppercase letter, one lowercase letter, and one digit./g)

    // shouldn't redirect
    cy.url().should("equal", `${Cypress.config("baseUrl")}/signup`);
  });
});

// 2
describe("valid password input signup test: 1 numbers in input", () => {
  it("should show correct error message and not redirect to home", () => {
    cy.visit("/signup");
    cy.get('[data-cy="input-text-email"]').clear().type(validEmail);
    cy.get('[data-cy="input-text-password"]').clear().type("Password1");
    cy.get('[data-cy="input-text-confirm-password"]').clear().type("Password1");
    cy.get('[data-cy="btn-signup"]').click();
    cy.wait(500);
    
    // Correct Error message shows up for valid passwords
    cy.get('[data-cy="txt-signup-err"]').should("exist").contains(/The email address is already registered in our system/g)

    // shouldn't redirect
    cy.url().should("equal", `${Cypress.config("baseUrl")}/signup`);
  });
});

// 3
describe("valid password input signup test: 2 numbers in input", () => {
  it("should show correct error message and not redirect to home", () => {
    cy.visit("/signup");
    cy.get('[data-cy="input-text-email"]').clear().type(validEmail);
    cy.get('[data-cy="input-text-password"]').clear().type("Password12");
    cy.get('[data-cy="input-text-confirm-password"]').clear().type("Password12");
    cy.get('[data-cy="btn-signup"]').click();
    cy.wait(500);
    
    // Correct Error message shows up for valid passwords
    cy.get('[data-cy="txt-signup-err"]').should("exist").contains(/The email address is already registered in our system/g)

    // shouldn't redirect
    cy.url().should("equal", `${Cypress.config("baseUrl")}/signup`);
  });
});

// * Interdependency Test: Password Input and Confirm Password Input

// 1
describe("valid and non-matching password input and confirm password input signup test: 2 valid & different inputs", () => {
  it("should show correct error message and not redirect to home", () => {
    cy.visit("/signup");
    cy.get('[data-cy="input-text-email"]').clear().type(validEmail);
    cy.get('[data-cy="input-text-password"]').clear().type("Password1");
    cy.get('[data-cy="input-text-confirm-password"]').clear().type("DifferentPassword1");
    cy.get('[data-cy="btn-signup"]').click();
    cy.wait(500);
    
    // Correct Error message shows up for non matching passwords
    cy.get('[data-cy="txt-signup-err"]').should("exist").contains(/Passwords do not match. Please ensure both passwords are the same./g)

    // shouldn't redirect
    cy.url().should("equal", `${Cypress.config("baseUrl")}/signup`);
  });
});

// 2
describe("valid and non-matching password input and confirm password input signup test: 2 valid & different inputs", () => {
  it("should show correct error message and not redirect to home", () => {
    cy.visit("/signup");
    cy.get('[data-cy="input-text-email"]').clear().type(validEmail);
    cy.get('[data-cy="input-text-password"]').clear().type("Password1");
    cy.get('[data-cy="input-text-confirm-password"]').clear().type("Password1");
    cy.get('[data-cy="btn-signup"]').click();
    cy.wait(500);
    
    // Correct Error message shows up for valid password and confirm password
    cy.get('[data-cy="txt-signup-err"]').should("exist").contains(/The email address is already registered in our system/g)

    // shouldn't redirect
    cy.url().should("equal", `${Cypress.config("baseUrl")}/signup`);
  });
});