import { baseURL, shortenUrl, WEB_URL } from "../fixtures/utils";

const staticTestCodes = ["Q877O08", "Q9SSEH3", "Q9PYJY2"];

describe("Init", () => {
  beforeEach(() => {
    cy.loginAndNavigate();
  });

  staticTestCodes.forEach((testCode, i) => {
    it(`${i} Static - ${testCode}`, () => {
      cy.visit(`${WEB_URL}/content-library?dev-bot`);

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
        questions.forEach((question, i) => {
          const formattedQuestion = `Please read Title: ${testTitle} and description: ${testDescription} and generate a short min 20 words max 100 word response for this question/phrase: ${question}. NOTE: Only give response there must be not any introductory message or heading.`;
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

        cy.wait("@testResponse", {
          timeout: 30000,
        }).then(() => {
          cy.intercept("POST", "/api/v1/frontend-auth/get-report-url/").as(
            "getReportUrl"
          );
          cy.wait("@getReportUrl", {
            timeout: 100000,
          }).then((interception) => {
            const reportUrl = interception.response?.body.url;

            shortenUrl(reportUrl).then((shortenedUrl) => {
              console.log("Shortened Report URL:", shortenedUrl);

              cy.task("logToCloud", `${testCode} : ${shortenedUrl}`);

              cy.readFile("cypress/results/staticReports.txt").then(
                (existingFileContents) => {
                  const appendedFileContents =
                    existingFileContents + `${testCode} : ${shortenedUrl} \n`;

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
});
