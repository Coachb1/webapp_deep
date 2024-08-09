import { baseURL, userId, visitingBaseUrl } from "../fixtures/utils";

const dynamicTestCodes = [ "Q97STR8", "QQMTKIU"];

describe("Init", () => {
  beforeEach(() => {
    cy.session("loggedInUser", () => {
      cy.visit(visitingBaseUrl);
      cy.contains("Login").click();

      cy.origin("https://coachbotsdev.kinde.com", () => {
        // cy.get('[data-testid="login-account-link"]').click();
        cy.title()
          .should("eq", "Sign in | Coachbotsdev")
          .then(() => {
            cy.get('[data-testid="auth-email-field"]').type(
              "xivij12069@hutov.com"
            );
            cy.get('[data-testid="auth-submit-button"]').click();
            cy.get("#input_field_p_password_password").type("demo#1234");
            cy.contains("Continue").click();
          });
      });

      cy.title()
        .should("eq", "Network - Coachbots")
        .visit(`${visitingBaseUrl}/content-library`);
    });
  });

  dynamicTestCodes.forEach((testCode, i) => {
    it(`${i + 1} Dynamic-${testCode}`, () => {
      cy.visit(`${visitingBaseUrl}/content-library`);

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
      cy.wait(20000);
      cy.get("#chat-element2")
        .shadow()
        .find(`button[onclick="handleProceedClickStt('Yes')"]`, {
          timeout: 20000,
        })
        .should("be.visible")
        .click();

      cy.wait("@testInfo", {
        timeout: 30000,
      }).then((interception) => {
        const testTitle = interception.response?.body.results[0].title;
        const testDescription =
          interception.response?.body.results[0].description;
        const questions =
          interception.response?.body.results[0].questions.filter(
            (question: any) => question.question_for === "user"
          );
        console.log("Initial data received:", interception.response?.body); // Logging initial response
        const questionLength =
          interception.response?.body.results[0].questions.filter(
            (question: any) => question.question_for === "user"
          ).length;
        let question =
          interception.response?.body.results[0]
            .orchestrated_conversation_details.initial_messages[0];

        questions.forEach((qn: any, i: number) => {
          let randomNumber = Math.floor(Math.random() * 100) + 1; // Generate a random number between 1 and 100
          if (i > 0) {
            cy.intercept("POST", "/api/v1/test-responses/").as("testResponse");
            cy.wait("@testResponse");
            if (i > 1) {
              cy.wait("@testResponse");
            }
            cy.wait("@testResponse", {
              timeout: 20000,
            }).then((interception) => {
              console.log(
                `response_text ${i}`,
                interception.response?.body.response_text
              );
              question =
                interception.response?.body.response_text + randomNumber; // Append random number to response
              const formattedQuestion = `Please read Title: ${testTitle} and description: ${testDescription} and generate a short min 20 words max 50 word response for this question/phrase: ${question}. NOTE: Only give response there must be not any introductory message or heading.`;
              cy.request(
                "GET",
                `${baseURL}/documents/get-prompt-response/?prompt=${encodeURIComponent(
                  formattedQuestion
                )}`
              ).then((answerResponse) => {
                console.log(
                  "Generated response for",
                  qn,
                  ":",
                  answerResponse.body
                ); // Logging generated response
                cy.wait(5000);
                cy.get("#chat-element2")
                  .shadow()
                  .find("#text-input")
                  .type(answerResponse?.body["response_text"]);
                cy.wait(5000);
                cy.get("#chat-element2")
                  .shadow()
                  .find(".input-button-svg.inside-right")
                  .click();
              });
            });
          } else {
            question = qn + " " + randomNumber; // Append random number to initial question
            const formattedQuestion = `Please read Title: ${testTitle} and description: ${testDescription} and generate a short min 20 words max 50 word response for this question/phrase: ${question}. NOTE: Only give response there must be not any introductory message or heading.`;
            cy.request(
              "GET",
              `${baseURL}/documents/get-prompt-response/?prompt=${encodeURIComponent(
                formattedQuestion
              )}`
            ).then((answerResponse) => {
              console.log(
                "Generated response for",
                qn,
                ":",
                answerResponse.body
              ); // Logging generated response
              cy.wait(5000);
              cy.get("#chat-element2")
                .shadow()
                .find("#text-input")
                .type(
                  answerResponse?.body["response_text"] + " " + randomNumber
                ); // Append random number directly here
              cy.wait(5000);
              cy.get("#chat-element2")
                .shadow()
                .find(".input-button-svg.inside-right")
                .click();
            });
          }
        });

        cy.wait("@testResponse", {
          timeout: 30000,
        }).then(() => {
          cy.intercept("POST", "/api/v1/frontend-auth/get-report-url/").as(
            "getReportUrl"
          );
          cy.wait("@getReportUrl", {
            timeout: 100000,
          }).then((interception) => {
            console.log(
              "Report URL received:",
              interception.response?.body.url
            ); // Logging the report URL received
            cy.readFile("cypress/results/DynamicReports.txt").then(
              (existingFileContents: any) => {
                const appendedFileContents =
                  existingFileContents +
                  `${testCode} : ${interception.response?.body.url} \n`;
                cy.writeFile(
                  "cypress/results/DynamicReports.txt",
                  appendedFileContents
                );
              }
            );
          });
        });
      });
    });
  });
});
