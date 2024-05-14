import { baseURL } from "../fixtures/utils";

const staticTestCodes = ["Q877O08", "Q9SSEH3"];

describe("Init", () => {
  beforeEach(() => {
    cy.session("loggedInUser", () => {
      loginUser();
      cy.visit("http://localhost:3000/content-library");
    });
  });

  it("static tests - Coachscribe", () => {
    cy.visit("http://localhost:3000/content-library");
    interactWithChatBot();
    performTests();
  });
});

function loginUser() {
  cy.visit("http://localhost:3000/");
  cy.contains("Login").click();

  cy.origin("https://coachbots.kinde.com", () => {
    cy.get('[data-testid="login-account-link"]').click();
    cy.title().should("eq", "Sign in | Coachbots").then(() => {
      cy.get('[data-testid="auth-email-field"]').type("a2@coachbots.com");
      cy.get('[data-testid="auth-submit-button"]').click();
      cy.get("#input_field_p_password_password").type("demo#1234");
      cy.contains("Continue").click();
    });
  });

  cy.title().should("eq", "Network - Coachbots");
}

function interactWithChatBot() {
  cy.get(".chat-icon").click();
  cy.get("#chat-element")
    .shadow()
    .find(".deep-chat-suggestion-button")
    .contains("Yes")
    .click();
}

function performTests() {
  staticTestCodes.forEach((testCode) => {
    handleTestCode(testCode);
  });
}

function handleTestCode(testCode: any) {
  cy.intercept("GET", `/api/v1/tests/?test_code=${testCode}`).as("testInfo");
  cy.get("#chat-element").shadow().find("#text-input").type(testCode);
  cy.get("#chat-element")
    .shadow()
    .find(".input-button-svg.inside-right")
    .click();

  cy.wait("@testInfo", { timeout: 30000 }).then((interception) => {
    const { title, description, questions } = interception.response?.body.results[0];
    proceedWithTest(title, description, questions);
  });
}

function proceedWithTest(title: any, description: any, questions: any) {
  cy.get("#chat-element")
    .shadow()
    .find(`button[onclick="handleProceedClick('Yes')"]`, { timeout: 10000 })
    .click();

  questions.forEach((question: any, i: any) => {
    processQuestion(question, title, description);
  });
}

function processQuestion(question: any, title:any, description:any) {
  const formattedQuestion = formatQuestion(question, title, description);
  cy.request("GET", `${baseURL}/documents/get-prompt-response/?prompt=${encodeURIComponent(formattedQuestion)}`)
    .then((response) => {
      const audioResponse = `${baseURL}/test-responses/get-text-to-speech/?text=${response.body.response_text}`;
      handleAudioResponse(audioResponse);
    });
}

function handleAudioResponse(audioResponse: any) {
  cy.request("GET", audioResponse).then((response) => {
    const audioBlob = new Blob([response.body], { type: "audio/mpeg" });
    const audioFile = new File([audioBlob], "temp_audio.mp3", { type: "audio/mpeg" });
    // Additional steps to handle audio file, depending on test requirements
  });
}

function formatQuestion(question:any, title: any, description: any) {
  return `Please read Title: ${title} and description: ${description} and generate a short min 20 words max 100 word response for this question/phrase: ${question}. NOTE: Only give response there must be not any introductory message or heading.`;
}
