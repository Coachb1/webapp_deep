import { baseURL } from "../fixtures/utils";
import { saveAs } from "file-saver";
// const staticTestCodes = ["Q877O08", "Q9SSEH3"];
const botId =
  "avatar_bot-121c8-leadership-elevating-emerging-leaders-through-tailored-and-strategic-mentorship";
const userId = "10822f2f-2e05-438e-b1b4-0107b95745f2";

const RUNS = 3;
const END_AT = 3;

describe("Init", () => {
  let botMessages: string[] = [];
  let responseTexts: string[] = [];

  beforeEach(() => {
    cy.viewport(1280, 1000);
    cy.session("loggedInUser", () => {
      cy.visit("http://localhost:3000/");
      cy.contains("Login").click();

      cy.origin("https://coachbotsdev.kinde.com", () => {
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
        .visit("http://localhost:3000/content-library");
    });
  });

  it("Avatar bot", () => {
    cy.visit(`http://localhost:3000/coach/${botId}`);

    cy.intercept(
      "GET",
      `/api/v1/coaching-conversations/bot-conversation-data/?for=user&user_id=${userId}&bot_id=${botId}`
    ).as("coachingConversations");

    cy.get(".chat-icon2").click();

    cy.wait(10000);
    cy.get("button")
      // .contains("Begin session", { timeout: 20000 })
      .get("#begin-session-button", { timeout: 20000 })
      .click()
      .then(() => {
        let userResponse =
          "Hey there, how are you doing. let's discuss about Work life balance.";
        let geminiResponseMessage: any;
        for (let i = 0; i < RUNS; i++) {
          if (i > 0) {
            cy.intercept("POST", "/api/gemini-stream").as("geminiResponse");
            cy.intercept(
              "POST",
              "/api/v1/coaching-conversations/save-ai-response/"
            ).as("saveAIResponse");
            cy.wait("@geminiResponse", { timeout: 100000 }).then(
              (geminiResponse) => {
                geminiResponseMessage = geminiResponse.response?.body;
                botMessages.push(geminiResponseMessage);

                cy.wait("@saveAIResponse", { timeout: 20000 }).then(() => {
                  const formattedQuestion = `I'll be providing you the question please pick a topic and make the converstion accordingly, here's the question ${geminiResponseMessage}. NOTE : Keep your responses in minimum 20 words and max 30 words.  NOTE: Only give response there must be not any introductory message or heading.`;
                  cy.request(
                    "GET",
                    `${baseURL}/documents/get-prompt-response/?prompt=${encodeURIComponent(
                      formattedQuestion
                    )}`
                  ).then((response) => {
                    const responseText = response?.body["response_text"];
                    responseTexts.push(responseText);

                    if (i === END_AT) {
                      cy.wait("@geminiResponse", { timeout: 100000 });
                      cy.wait("@geminiResponse", { timeout: 100000 }).then(
                        () => {
                          if (cy.get("button").contains("End session")) {
                            cy.get("button").contains("End session").click();
                          } else {
                            cy.get("button")
                              .contains("End and Email Summary")
                              .click();
                          }
                        }
                      );
                    } else {
                      cy.wait(10000);
                      cy.get("#chat-element2")
                        .shadow()
                        .find("#text-input")
                        .type(responseText); //response?.body["response_text"]);

                      cy.wait(5000);
                      cy.get("#chat-element2")
                        .shadow()
                        .find(".input-button-svg.inside-right")
                        .click();
                    }
                  });
                });
              }
            );
          } else {
            cy.get("#chat-element2")
              .shadow()
              .find("#text-input")
              .type(userResponse);

            cy.get("#chat-element2")
              .shadow()
              .find(".input-button-svg.inside-right")
              .click();
            cy.intercept("POST", "/api/gemini-stream").as("geminiResponse");
            cy.intercept(
              "POST",
              "/api/v1/coaching-conversations/save-ai-response/"
            ).as("saveAIResponse");
          }
        }
        cy.wait("@saveAIResponse", { timeout: 20000 });
        cy.wait("@geminiResponse", { timeout: 20000 });
        // cy.get("#chat-element2").shadow().find("#text-input").clear();
        // cy.get("button").contains("End session").click();
      });
  });

  afterEach(() => {
    const csvContent =
      "Bot Messages,Response Texts\n" +
      botMessages
        .map((botMessage, index) => {
          // Escape any quotes and commas, enclose each value in quotes
          const escapedBotMessage = `"${botMessage?.replace(/"/g, '""')}"`;
          const escapedResponseText = `"${responseTexts[index]?.replace(
            /"/g,
            '""'
          )}"`;
          return `${escapedBotMessage},${escapedResponseText}`;
        })
        .join("\n");

    const csvWithBom =
      new Uint8Array([0xef, 0xbb, 0xbf]).reduce(
        (acc, cur) => acc + String.fromCharCode(cur),
        ""
      ) + csvContent;

    const blob = new Blob([csvWithBom], { type: "text/csv;charset=utf-8;" });
    // saveAs(blob, "conversation_data.csv");
  });
});
