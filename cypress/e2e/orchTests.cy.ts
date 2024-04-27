import { baseURL, userId, visitingBaseUrl } from "../fixtures/utils";

const orchestratedTestCodes = ["QSKUOD0", "Q7E1DGY"];

describe("Init", () => {
  beforeEach(() => {
    cy.session("loggedInUser", () => {
      cy.visit(visitingBaseUrl);
      cy.contains("Login").click();

      cy.origin("https://coachbots.kinde.com", () => {
        cy.get('[data-testid="login-account-link"]').click();
        cy.title()
          .should("eq", "Sign in | Coachbots")
          .then(() => {
            cy.get('[data-testid="auth-email-field"]').type("a2@coachbots.com");
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

  it("Orchestrated tests", () => {
    cy.visit(`${visitingBaseUrl}/content-library`);

    //open the bot
    cy.get(".chat-icon2").click();

    //yes / no
    cy.get("#chat-element2")
      .shadow()
      .find(".deep-chat-suggestion-button")
      .contains("Yes")
      .click();

    orchestratedTestCodes.forEach((testCode) => {
      // type the test code
      cy.get("#chat-element2").shadow().find("#text-input").type(testCode);
      cy.intercept("GET", `/api/v1/tests/?test_code=${testCode}`).as(
        "testInfo"
      );
      cy.intercept("POST", "/api/v1/test-attempt-sessions/").as("testSession");
      //click send
      cy.get("#chat-element2")
        .shadow()
        .find(".input-button-svg.inside-right")
        .click();

      cy.get("#chat-element2")
        .shadow()
        .find(`button[onclick="handleProceedClickStt('Yes')"]`)
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
        const questionLength =
          interception.response?.body.results[0].questions.filter(
            (question: any) => question.question_for === "user"
          ).length;
        let question =
          interception.response?.body.results[0]
            .orchestrated_conversation_details.initial_messages[0];

        cy.wait("@testSession").then((sessionInterception) => {
          const sessionId = sessionInterception.response?.body.uid;

          questions.forEach((qn: any, i: number) => {
            if (i > 0) {
              cy.intercept("POST", "/api/v1/test-responses/").as(
                "testResponse"
              );
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
                question = interception.response?.body.response_text;
                const formattedQuestion = `Please read Title: ${testTitle} and description: ${testDescription} and generate a short min 20 words max 50 word response for this question/phrase: ${question}. NOTE: Only give response there must be not any introductory message or heading.`;
                cy.request(
                  "GET",
                  `${baseURL}/documents/get-prompt-response/?prompt=${encodeURIComponent(
                    formattedQuestion
                  )}`
                ).then((response) => {
                  cy.get("#chat-element2")
                    .shadow()
                    .find("#text-input")
                    .type(response?.body["response_text"]);
                  cy.get("#chat-element2")
                    .shadow()
                    .find(".input-button-svg.inside-right")
                    .click();
                });
              });
            } else {
              const formattedQuestion = `Please read Title: ${testTitle} and description: ${testDescription} and generate a short min 20 words max 50 word response for this question/phrase: ${question}. NOTE: Only give response there must be not any introductory message or heading. NOTE : Keep your answer little different from the question`;
              cy.request(
                "GET",
                `${baseURL}/documents/get-prompt-response/?prompt=${encodeURIComponent(
                  formattedQuestion
                )}`
              ).then((response) => {
                cy.get("#chat-element2")
                  .shadow()
                  .find("#text-input")
                  .type(response?.body["response_text"]);
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
              timeout: 30000,
            }).then((interception) => {
              cy.intercept(
                "POST",
                `/api/v1/test-attempt-sessions/send-report-email/?test_attempt_session_id=${sessionId}&report_url=${encodeURIComponent(
                  interception.response?.body.url
                )}&is_whatsapp=false`
              ).as("sessionReportEmail");

              cy.readFile("cypress/results/OrchestratedReports.txt").then(
                (existingFileContents: any) => {
                  const appendedFileContents =
                    existingFileContents +
                    `${testCode} : ${interception.response?.body.url} \n`;
                  cy.writeFile(
                    "cypress/results/OrchestratedReports.txt",
                    appendedFileContents
                  );
                }
              );
              cy.wait("@sessionReportEmail", { timeout: 100000 });
            });
          });
        });
      });
    });
  });
});
