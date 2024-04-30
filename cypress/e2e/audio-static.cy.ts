import { baseURL } from "../fixtures/utils";
const staticTestCodes = ["Q877O08", "Q9SSEH3"];
describe("Init", () => {
  beforeEach(() => {
    cy.session("loggedInUser", () => {
      cy.visit("http://localhost:3000/");
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
        .visit("http://localhost:3000/content-library");
    });
  });

  it("static tests - Coachscribe", () => {
    cy.visit("http://localhost:3000/content-library");

    //open the bot
    cy.get(".chat-icon").click();

    //yes / no
    cy.get("#chat-element")
      .shadow()
      .find(".deep-chat-suggestion-button")
      .contains("Yes")
      .click();

    staticTestCodes.forEach((testCode) => {
      // type the test code
      cy.intercept("GET", `/api/v1/tests/?test_code=${testCode}`).as(
        "testInfo"
      );
      cy.get("#chat-element").shadow().find("#text-input").type(testCode);

      //click send
      cy.get("#chat-element")
        .shadow()
        .find(".input-button-svg.inside-right")
        .click();

      //proceed yes

      cy.wait("@testInfo", {
        timeout: 30000,
      }).then((interception) => {
        const testTitle = interception.response?.body.results[0].title;
        const testDescription =
          interception.response?.body.results[0].description;
        // const questionsData = interception.response?.body.results[0].questions;
        const questions: string[] = [];
        interception.response?.body.results[0].questions.forEach(
          (item: any) => {
            questions.push(item.question);
            console.log(item.question);
          }
        );
        cy.get("#chat-element")
          .shadow()
          .find(`button[onclick="handleProceedClick('Yes')"]`, {
            timeout: 10000,
          })
          .click();

        cy.intercept("POST", "/api/v1/test-responses/").as("testResponse");
        questions.forEach((question, i) => {
          if (i !== 0) {
            cy.wait("@testResponse", {
              timeout: 20000,
            });
          }
          const formattedQuestion = `Please read Title: ${testTitle} and description: ${testDescription} and generate a short min 20 words max 100 word response for this question/phrase: ${question}. NOTE: Only give response there must be not any introductory message or heading.`;
          cy.request(
            "GET",
            `${baseURL}/documents/get-prompt-response/?prompt=${encodeURIComponent(
              formattedQuestion
            )}`
          ).then((response) => {
            cy.request(
              "GET",
              `${baseURL}/test-responses/get-text-to-speech/?text=${response?.body["response_text"]}`
            ).then((response) => {
              // const audioBlob = new Blob([response.body], {
              //   type: "audio/mpeg",
              // });
              // const audioFile = new File([audioBlob], "temp_audio.mp3", {
              //   type: "audio/mpeg",
              // });
              // cy.writeFile("cypress/temp/temp_audio.mp3", audioFile);
              // cy.readFile("cypress/temp/temp_audio.mp3", "base64").then(
              //   (base64Audio) => {
              //     cy.get("#chat-element")
              //       .shadow()
              //       .find("#text-input")
              //       .type(`data:audio/mpeg;base64,${base64Audio}`);
              //     cy.get("#chat-element")
              //       .shadow()
              //       .find(".input-button-svg.inside-right")
              //       .click();
              //   }
              // );
            });

            // cy.get("#chat-element")
            //   .shadow()
            //   .find("#text-input")
            //   .type();
            // cy.get("#chat-element")
            //   .shadow()
            //   .find(".input-button-svg.inside-right")
            //   .click();
          });
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
            cy.readFile("cypress/results/staticReports.txt").then(
              (existingFileContents: any) => {
                const appendedFileContents =
                  existingFileContents +
                  `${testCode} : ${interception.response?.body.url} \n`;
                cy.writeFile(
                  "cypress/results/staticReports.txt",
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
