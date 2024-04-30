import { baseURL } from "../fixtures/utils";
const staticTestCodes = ["Q877O08", "Q9SSEH3"];

const botId = "avatar_bot-2f3b2-parul-dengre";
const userId = "10822f2f-2e05-438e-b1b4-0107b95745f2";

describe("Init", () => {
  beforeEach(() => {
    cy.viewport(1280, 1000);
    cy.session("loggedInUser", () => {
      cy.visit("http://localhost:3000/");
      cy.contains("Login").click();

      cy.origin("https://coachbots.kinde.com", () => {
        cy.get('[data-testid="login-account-link"]').click();
        cy.title()
          .should("eq", "Sign in | Coachbots")
          .then(() => {
            cy.get('[data-testid="auth-email-field"]').type("a3@coachbots.com");
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
    cy.intercept(
      "GET",
      `/api/v1/coaching-conversations/bot-conversation-data/?for=user&user_id=${userId}&bot_id=${botId}`
    ).as("coachingConversations");
    cy.visit(`http://localhost:3000/coach/${botId}`);
    cy.get(".chat-icon2").click();

    cy.wait("@coachingConversations", { timeout: 40000 }).then(
      (interception) => {
        cy.get("button")
          .contains("Begin session", { timeout: 20000 })
          .click()
          .then(() => {
            let userResponse =
              "Hey there, how are you doing. let's discuss about Work life balance.";
            let geminiResponseMessage: any;
            for (let i = 0; i < 5; i++) {
              if (i > 0) {
                cy.intercept("POST", "/api/gemini-stream").as("geminiResponse");
                cy.intercept(
                  "POST",
                  "/api/v1/coaching-conversations/save-ai-response/"
                ).as("saveAIResponse");
                cy.wait("@geminiResponse", { timeout: 100000 }).then(
                  (geminiResponse) => {
                    geminiResponseMessage = geminiResponse.response?.body;

                    cy.wait("@saveAIResponse", { timeout: 20000 }).then(() => {
                      const formattedQuestion = `I'll be providing you the question please pick a topic and make the converstion accordingly, here's the question ${geminiResponseMessage}. NOTE : Keep your responses in minimum 20 words and max 30 words.  NOTE: Only give response there must be not any introductory message or heading.`;
                      cy.request(
                        "GET",
                        `${baseURL}/documents/get-prompt-response/?prompt=${encodeURIComponent(
                          formattedQuestion
                        )}`
                      ).then((response) => {
                        // userResponse = response?.body["response_text"];

                        if (i === 5 || i === 4) {
                          cy.wait("@geminiResponse", { timeout: 100000 });
                          cy.wait("@geminiResponse", { timeout: 100000 }).then(
                            () => {
                              cy.get("button")
                                .contains("End and Email Summary")
                                .click();
                            }
                          );
                        } else {
                          cy.get("#chat-element2")
                            .shadow()
                            .find("#text-input")
                            .type(response?.body["response_text"]);

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
            // cy.get("button").contains("End and Email Summary").click();
          });
      }
    );
  });
});
