const gameTestCodes = [
  "Q742R5A",
  "QZTKIRM",
  "QOTMM0I",
  "Q0W76DW",
  "Q5I4BBA",
  "QROEPWW",
  "QBZF35B",
];

describe("Game Tests", () => {
  beforeEach(() => {
    cy.session("loggedInUser", () => {
      cy.visit("http://localhost:3000/");
      cy.contains("Login").click();

      cy.origin("https://coachbotsdev.kinde.com", () => {
        // cy.get('[data-testid="login-account-link"]').click();
        cy.title()
          .should("eq", "Sign in | Coachbots Dev")
          .then(() => {
            cy.get('[data-testid="auth-email-field"]').type(
              "xivij12069@hutov.com"
            );
            cy.get('[data-testid="auth-submit-button"]').click();
            cy.get("#verify_password_p_password").type("demo#1234");
            cy.contains("Continue").click();
          });
      });

      cy.title()
        .should("eq", "Network - Coachbots")
        .visit("http://localhost:3000/content-library");
    });
  });

  gameTestCodes.forEach((testCode, i) => {
    it(`${i} Game - ${testCode}`, () => {
      cy.visit("http://localhost:3000/content-library?dev-bot");

      //open the bot
      cy.get(".chat-icon2", { timeout: 30000 }).click();

      //yes / no
      cy.get("#chat-element2")
        .shadow()
        .find(".deep-chat-suggestion-button")
        .contains("Yes")
        .click();

      // type the test code
      cy.get("#chat-element2").shadow().find("#text-input").type(testCode);
      cy.intercept("GET", `/api/v1/tests/?test_code=${testCode}`).as(
        "testInfo"
      );
      //click send
      cy.get("#chat-element2")
        .shadow()
        .find(".input-button-svg.inside-right")
        .click();

      cy.wait("@testInfo", {
        timeout: 30000,
      }).then((interception) => {
        const questions: string[] = [];
        interception.response?.body.results[0].questions.forEach(
          (item: any) => {
            questions.push(item.question);
            console.log(item.question);
          }
        );

        cy.get("#chat-element2")
          .shadow()
          .find(`button[onclick="handleProceedClickStt('Yes')"]`, {
            timeout: 10000,
          })
          .click();

        cy.intercept("POST", "/api/v1/test-responses/").as("testResponse");

        const selectionType = interception.response?.body.results[0]
          .is_single_select
          ? "radio"
          : "checkbox";

        answerGameQuestions(selectionType, testCode);
      });
    });
  });
});

function answerGameQuestions(
  type: "radio" | "checkbox",
  testCode: string,
  start: boolean = true
) {
  cy.wait(6000);

  cy.get("#chat-element2")
    .shadow()
    .find(".message-bubble.ai-message-text", {
      timeout: 10000,
    })
    .last()
    .then(($messageBubble) => {
      if ($messageBubble.length > 0) {
        if (
          $messageBubble.get(0).innerHTML.includes("Question") ||
          $messageBubble.get(0).innerHTML.includes("Scenario")
        ) {
          if (type === "checkbox") {
            cy.get("#chat-element2")
              .shadow()
              .find('input[type="checkbox"]')
              .filter(":not(:disabled)")
              .then(($activeCheckboxes) => {
                if ($activeCheckboxes.length > 0) {
                  const randomCheckboxes = Cypress._.sampleSize(
                    $activeCheckboxes.toArray(),
                    2
                  );
                  randomCheckboxes.forEach((checkbox) => {
                    cy.wrap(checkbox).click();
                  });
                } else {
                  cy.log("No active checkboxes available.");
                }
              });
          } else {
            cy.get("#chat-element2")
              .shadow()
              .find('input[type="radio"]')
              .filter(":not(:disabled)")
              .then(($activeRadios) => {
                if ($activeRadios.length > 0) {
                  const randomRadio = Cypress._.random(
                    0,
                    $activeRadios.length - 1
                  );
                  cy.wrap($activeRadios[randomRadio]).click();
                } else {
                  cy.log("No active radio buttons available.");
                }
              });
          }

          cy.get("#chat-element2")
            .shadow()
            .find("button.deep-chat-button")
            .last()
            .contains("Submit")
            .click();

          cy.intercept("POST", "/api/v1/test-responses/").as(
            "testResponseGame"
          );

          cy.wait("@testResponseGame", {
            timeout: 100000,
          }).then(() => {
            answerGameQuestions(type, testCode, false);
          });
        } else {
          cy.log("No more questions, ending the process.");

          cy.wait(3000);
          cy.wait("@testResponseGame", {
            timeout: 100000,
          }).then((interception) => {
            cy.log(interception.response?.body);
            const results = interception.response?.body;
            const questionText = results.question_text;

            if (questionText.includes("end_message")) {
              cy.readFile("cypress/results/GameTypeReport.txt").then(
                (existingFileContents) => {
                  const appendedFileContents =
                    existingFileContents +
                    `${testCode} : ${JSON.parse(questionText).end_message} \n`;

                  cy.writeFile(
                    "cypress/results/GameTypeReport.txt",
                    appendedFileContents
                  );
                }
              );
            }
          });
        }
      }
    });
}
