import { baseURL, shortenUrl, visitingBaseUrl } from "../fixtures/utils";

const dynamicTestCodes = ["QQMTKIU", "Q97STR8", "QE4334M", "QWGW7N3"];

describe("Init", () => {
  beforeEach(() => {
    cy.session("loggedInUser", () => {
      cy.visit(visitingBaseUrl);
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
        .visit(`http://localhost:3000/content-library`);
    });
  });

  dynamicTestCodes.forEach((testCode, i) => {
    it(`${i + 1} Dynamic-${testCode}`, () => {
      cy.visit(`http://localhost:3000/content-library?dev-bot`);

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
        const testTitle = interception.response?.body.results[0].title;
        const testDescription =
          interception.response?.body.results[0].description;

        cy.get("#chat-element2")
          .shadow()
          .find(`button[onclick="handleProceedClickStt('Yes')"]`, {
            timeout: 10000,
          })
          .click();

        cy.log("Initial data received:", interception.response?.body); // Logging initial response

        const questions = interception.response?.body.results[0].questions;

        let question =
          interception.response?.body.results[0]
            .orchestrated_conversation_details.initial_messages;

        cy.log("Initial question:", question);

        const questionsLength = questions.filter(
          (question: any) => question.question_for === "user"
        ).length;

        cy.log("Q length : ", questionsLength);

        Array.from({
          length: questionsLength,
        }).forEach((qn: any, i: number) => {
          const currentQuestion = Array.isArray(question)
            ? question.join(" ")
            : question;

          cy.log("Current question:", currentQuestion);
          let formattedQuestion = `Please read Title: ${testTitle} and description: ${testDescription} and generate a short min 20 words max 50 word response for this question/phrase:  ${currentQuestion}. NOTE: Only give response there must be not any introductory message or heading.`;
          cy.request(
            "GET",
            `${baseURL}/documents/get-prompt-response/?prompt=${encodeURIComponent(
              formattedQuestion
            )}`
          ).then((answerResponse) => {
            cy.log("Generated response for", question, ":", answerResponse); // Logging generated response
            cy.get("#chat-element2")
              .shadow()
              .find("#text-input")
              .type(answerResponse?.body["response_text"].replace(/\n/g, " "))
              .then(() => {
                cy.get("#chat-element2")
                  .shadow()
                  .find(".input-button-svg.inside-right")
                  .click();
              });
          });

          cy.intercept("POST", "/api/v1/test-responses/").as("testResponse");
          cy.wait("@testResponse", {
            timeout: 100000,
          }).then((res) => {
            const response = res.response?.body;
            question =
              response.responder_display_name + ":\n" + response.response_text;
          });
          if (i > 0) {
            cy.wait("@testResponse", {
              timeout: 100000,
            }).then((res) => {
              const response = res.response?.body;
              question =
                response.responder_display_name +
                ":\n" +
                response.response_text;
            });
          }
          cy.wait("@testResponse", {
            timeout: 100000,
          }).then((res) => {
            const response = res.response?.body;
            question =
              response.responder_display_name + ":\n" + response.response_text;

            cy.log("Updated question:", question);
          });
        });

        cy.wait("@testResponse", {
          timeout: 100000,
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
            );

            const reportUrl = interception.response?.body.url;

            shortenUrl(reportUrl).then((shortenedUrl) => {
              console.log("Shortened Report URL:", shortenedUrl);

              cy.readFile("cypress/results/DynamicReports.txt").then(
                (existingFileContents) => {
                  const appendedFileContents =
                    existingFileContents + `${testCode} : ${shortenedUrl} \n`;

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
});
