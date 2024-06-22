const key = "";
const secret = "";
const subdomain = window.location.hostname.split(".")[0];
const devUrl = "https://coach-api-ovh.coachbots.com/api/v1";
// const devUrl = "http://127.0.0.1:8001/api/v1"   // local baseurl
// const devUrl = "https://coach-api-gcp.coachbots.com/api/v1";
const prodUrl = "https://coach-api-prod-ovh.coachbots.com/api/v1";
const baseURL = subdomain === "platform" ? prodUrl : devUrl;

// const baseURL="https://coach-api-ovh.coachbots.com/api/v1" //local

let deepChatPocElement;
let sessionId = "";
let userId = "";
let userRole;
let participantId;
let testCode;
let ipAddress;
let user;
let codeAvailabilityUserChoice = false;
let optedNo = false;
let questionIndex = 0;

let globalReportUrl;
let maxUploadFailed = false;
let testResponseHandlerFailed = false;
let conversation_id;

//audio configs
let display_name;
let content_type;
let audioFile;
let audioFileSrc = "";
let mediaRecorder;

let inputName = "";
let inputEmail = "";

let gShadowRoot;

// only for mcq type test
let globalQuestionData;
let globalQuestionLength;
let mcqQustionIndex = 0;
let mcqFormId = 0;
let initialQuestionText;

// all variable shifted here from local
let questionText = "";
let reportType = "interactionSessionReport";
let questionId;
let userResponse;

let testId;
let resQuestionNumber;
let questionLength;
let questionData;
let documentId;
let userAudioResponse;

let is_free;
let responseProcessedQuestion = 0;
let senarioDescription;
let senarioTitle;
let senarioCase;
let responsesDone = false;
let senarioMediaDescription;
let userName = "";
let userEmail = "";
let reportUrl;
let testCodeList;
let isRepeatStatus;
let testPrevilage;
let sessionStatus;
let isSessionExpired;
let testType;
let TestUIInfo;
let isHindi = false;
let isProceed;
let isSessionActive = false;
let isEmailType = false;
let recommendations = "";
let isTestSignedIn;
let clientName;
let widgetClientId;
let audioFileSrcMap = {}; // maping response to resquestionNumber
let audioFileMap = {};
let audioDuration;
let isRecordingGlobal = false;
let questionMediaLink;
let isImmersive = false;
let mediaProps;
let questionImageData;
let initialIndex;
let isTranscriptOnly = false;
let isEmailForm = false;
let emailNameformJson = {};
let formFields = [];
let userResponses = [];
let DuplicateResponseCount = 0;
let snnipetConfig;
let askAccessBotCode = false;
let clientAllowAudioInteraction;
let userAllowAudioInteraction;
let prioritiseUserAllowInteraction;
let AttemptTestDirect = false;

let allowPastingAtClientLevel;
let clientBasedBotHeaderText2 = "";
let clientBasedBotFooterText2 = "";
let clientBasedReadHereText2 = "";


function createBasicAuthToken(key = "", secret = "") {
  const token =
    "Yzc3MjFmZGItYTllMC00YTYxLWEzMTYtNDRhODA1N2VkMjY0OjhjNWNlZWZlLTY2Y2QtNDliZi04MTY5LTBhNjMwMmU5NmZlMA==";
  // const token =
  //   "MzdkMGVkNzgtOTI5Ni00MWQwLTk1NjgtYjdjZTBhYjA2OTY5Ojk1ZGIxNTNkLWEzZWMtNDM0Zi05YjIwLTc0M2M3M2Q5ZDZkYg=="; //local
  return token;
}

const basicAuthToken = createBasicAuthToken(key, secret);

user = window.user;
console.log(" User details ", user);
console.log(user === undefined);


  let user_name;
  let user_email;

  console.log(user)

  if (user) {
    user_name = `${user.given_name} ${user.family_name ? user.family_name : ""}`;
    user_email = user.email;
  } else {
    user_name = "coachbots_anonyoususer";
    user_email = getAnonymousEmail();
  }

  if (window.LogRocket) {
    window.LogRocket.identify(user_email, {
      name: user_name,
      email: user_email,
    });
  }
  fetch(`${baseURL}/accounts/`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basicAuthToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_context: {
        name: user_name,
        role: "member",
        user_attributes: {
          tag: "deepchat_profile",
          attributes: {
            name: user_name,
            username: user_name,
            email: user_email,
          },
        },
      },
      identity_context: {
        identity_type: "deepchat_unique_id",
        value: user_email,
      },
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      clientAllowAudioInteraction = data.client_allow_audio_interactions; 
      userAllowAudioInteraction = data.user_allow_audio_interactions;
      prioritiseUserAllowInteraction = data.prioritize_user_audio_interaction;

      participantId = data.uid;
      userId = data.uid;
      userRole = data.role;


      fetch(
        `${baseURL}/accounts/get-client-information/?for=user_info&email=${user_email}`,
        {
          method: "GET",
          headers: {
            Authorization: `Basic ${basicAuthToken}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log("get-client-information : ", data);
      
          allowPastingAtClientLevel = data.data.user_info[0].ui_information.allow_paste_answer
          clientBasedBotHeaderText2 = data.data.user_info[0].ui_information.header
          clientBasedBotFooterText2 = data.data.user_info[0].ui_information.bottom_text
          clientBasedReadHereText2 = data.data.user_info[0].ui_information.read_text
      
      
          const headerText2 = document.getElementById("header-text2");
          const footerText2 = document.getElementById("footer-text2");
          const instructionsPaneList2 = document.getElementById('instructions-list2')
          console.log(headerText2);
          console.log(footerText2);
      
          if (clientBasedBotHeaderText2) {
            headerText2.innerText = clientBasedBotHeaderText2;
          }
      
          if (clientBasedBotFooterText2) {
            footerText2.innerText = clientBasedBotFooterText2;
          }
      
          if (clientBasedReadHereText2) {
            const list = clientBasedReadHereText2
              .trim()
              .split("\n")
              .map((item) => {
                  return `<li>${item.trim()}</li>`;
              });

              instructionsPaneList2.innerHTML = list;
          }
        });

    })
    .catch((err) => console.log(err));





// sample TEst codes
const sampleTestCodes = {
  QEEG5VY: "AWS Cloud Training",
  QMFMKQ4: "Team Building Post-Training Check-In",
  QUPR9AO: "Education Sales Rep Selling a Diploma Course",
  QLDQ2IY: "Coaching Assistant in Assertive Communication",
  QKLX4V0: "Hotel Receptionist: Handling an Angry Guest",
  QULNNNE: "Luxury Real Estate Sales Agent",
  QZ4R9QW: "Cabin Crew Dealing with an Angry Customer",
  QJV5AEY: "Bank Branch Employee Service Call",
  QEYTB3I: "First-Time Manager Feedback in a Corporate Office",
  QYCZJDN: "Patient Care by a Nurse",
  Q125Z1B: "Factory Shop Floor Leadership",
  Q9QW1HF: "Health Package Sales Rep Discussion",
  QHYRLGN: "Insurance Sales Rep Call",
  QJZWYYB: "IT Requirements Gathering",
};

// sample recommendation data
let recommendationsData = [
  [
    {
      title:
        "Pursuing Career Growth: Discussing the Next Steps in the Career Ladder",
      code: "QG8OTQR",
    },
    {
      title:
        "Pursuing Professional Development: Aligning Career Goals with Company's Vision",
      code: "QMWNNU5",
    },
  ], // batch one
  [
    {
      title:
        "Handling Change and Uncertainty: Navigating Uncertainty in a New Role",
      code: "QXA0FHL",
    },
    {
      title:
        "Handling Change and Uncertainty: Seeking Guidance on Adapting to New Leadership",
      code: "QTXLXON",
    },
  ], // batch two
  [
    {
      title: "Team Building & Leadership: Teams using Agile Strategies",
      code: "QQJPCFI",
    },
    {
      title:
        "Leadership Initiatives: Seeking Guidance on Leading Team Through Crisis",
      code: "QO269IW",
    },
  ], // batch three
  [
    {
      title:
        "Making Ethical Decisions: Evaluating Cost vs. Sustainability in Procurement",
      code: "QHZPPK1",
    },
    {
      title:
        "Resource Allocation Decisions: Securing Project Resources from Other Teams",
      code: "QDL75HD",
    },
  ], // batch four
  [
    {
      title:
        "Managing Work-Life Balance: Balancing Workload and Setting Boundaries Discussion",
      code: "QTTDTXG",
    },
    {
      title:
        "Managing Team Conflicts: Addressing Team Conflicts Over Missed Deadline",
      code: "QWN8XTF",
    },
  ], // batch five
  [
    {
      title:
        "Collaborating on Resource Allocation: Resource Allocation Tensions",
      code: "QSKUOD0",
    },
    {
      title: "Navigating Team Dynamics: Aligning Team Direction",
      code: "QKN7VPO",
    },
  ], // batch six
  [
    {
      title:
        "Strategizing Cross-Functional Projects: Navigating Cross-Project Challenges",
      code: "Q7E1DGY",
    },
    {
      title:
        "Interdepartmental Collaboration: Harmonizing Data Interpretations",
      code: "QP22B9R",
    },
  ], // batch seven
];



function getCredentialsForm() {
  let credentialsForm;
  if (window.innerWidth > 868) {
    credentialsForm = `
    <div style="min-width: 730px;">
    <b>For obtaining your report, please submit the following details.</b>
    <div
      id="input-form"
      style="
      display: flex;
      flex-direction: row;
      min-width: 100%;
      gap: 1rem;
      align-items: center;
    "
    >
      <div style="display: flex; flex-direction: column; width: 45%;">
        <label for="name" style="margin: 12px 0 4px 0">Name</label>
        <input
          type="text"
          id="input-name"
          style="
            padding: 8px;
            margin-bottom: 4px;
            border-radius: 4px;
            border: 1px solid rgb(188, 188, 188);
          "
        />
      </div>
      <div style="display: flex; flex-direction: column; width: 45%;">
        <label for="email" style="margin: 12px 0 4px 0">Email</label>
        <input
          id="input-email"
          type="email"
          style="
            padding: 8px;
            margin-bottom: 4px;
            border-radius: 4px;
            border: 1px solid rgb(188, 188, 188);
          "
        />
      </div>
      <button
        style="
          height: fit-content;
          width: fit-content;
          padding: 8px;
          margin-bottom: -1.3rem;
          border: 1px solid rgb(188, 188, 188);
          border-radius: 20px;
          color: white;
          background-color: #1984ff;
        "
        id="submit-btn"
        onclick="submitEmailAndName()"
      >
        Submit
      </button>
    </div>
  </div>
    `;
  } else {
    credentialsForm = `
      <div>
      <b>For obtaining your report, please submit the following details.</b>
      <div
        id="input-form"
        style="
        display: flex;
        flex-direction: column;
        width: 100%;
        gap: 1rem;
        align-items: flex-start;
      "
      >
        <div style="display: flex; flex-direction: column; width: 100%">
          <label for="name" style="margin: 12px 0 4px 0">Name</label>
          <input
            type="text"
            id="input-name"
            style="
              padding: 8px;
              margin-bottom: 4px;
              border-radius: 4px;
              border: 1px solid rgb(188, 188, 188);
            "
          />
        </div>
        <div style="display: flex; flex-direction: column; width: 100%">
          <label for="email" style="margin: 12px 0 4px 0">Email</label>
          <input
            id="input-email"
            type="email"
            style="
              padding: 8px;
              margin-bottom: 4px;
              border-radius: 4px;
              border: 1px solid rgb(188, 188, 188);
            "
          />
        </div>
        <button
          style="
            height: fit-content;
            width: fit-content;
            padding: 8px;
            border: 1px solid rgb(188, 188, 188);
            border-radius: 20px;
            color: white;
            background-color: #1984ff;
          "
          id="submit-btn"
          onclick="submitEmailAndName()"
        >
          Submit
        </button>
      </div>
    </div>
      `;
  }
  return credentialsForm;
}

//* generate component for coaching bot question
function getCoachingQuestionData(questionText) {
  let randomId = Math.floor(Math.random() * 1000000);
  randomId = `coaching-question-${randomId}`;
  let parts = questionText.split(":");
  questionText = parts.length > 1 ? parts[1].trim() : questionText;
  return `
          ${questionText}
          <div id="${randomId}">
            <button style="margin-top:5px; color:white; width:fit-content; padding:6px 12px; border: 1px solid lightgray; border-radius: 4px; background:green;" onclick="handleContinueCoachingClick('${randomId}')">Continue</button>
            <button style="margin-top:5px; width:fit-content; padding:6px 12px; border: 1px solid lightgray; border-radius: 4px; background:red;" onclick="handleEndCoachingClick('${randomId}')">End Session</button>
          </div>`;
}

function createMessageNode(message) {
  const messageNode = document.createElement("div");
  messageNode.classList.add("inner-message-container");

  const messageBubble = document.createElement("div");
  messageBubble.classList.add("message-bubble", "ai-message-text");
  messageBubble.style.maxWidth = "80%";
  messageBubble.style.marginTop = "4px";
  messageBubble.style.borderRadius = "4px";
  messageBubble.style.padding = "4";
  messageBubble.style.backgroundColor = "#f3f4f6";
  messageBubble.style.color = "#374151";
  const messageText = document.createElement("p");
  messageText.innerHTML = message;

  messageBubble.appendChild(messageText);
  messageNode.appendChild(messageBubble);

  return messageNode;
}

//* function to test if a text can be a test code
function isTestCode(text) {
  return text.length == 7 && (text[0] == "q" || text[0] == "Q");
}

//* check for duplicate response
function isDuplicateResponse(text) {
  return userResponses.includes(text);
}

//* add a custom message to chat
function appendMessage(message) {
  gShadowRoot = document.getElementById("chat-element").shadowRoot;
  const messageNode = createMessageNode(message);
  gShadowRoot.getElementById("messages").appendChild(messageNode);
  gShadowRoot.getElementById("messages").scrollBy(0, 100);
}

//* loading element with message 
function LoadingMessageWithText2(message, shadowRoot){
  console.log(shadowRoot)
   //loading message 
   const loadingElement = shadowRoot.querySelector(".loading-message-text")
   //  const dotsFlashingElement = shadowRoot.querySelector(".dots-flashing")
   //  dotsFlashingElement.style.color = "#1f2937"
    loadingElement.style.display = "flex"
    loadingElement.style.flexDirection = "row"
    loadingElement.style.alignItems = "center"
    const messageElement = document.createElement("span")
    messageElement.innerHTML = `<b style="color : white; font-size: ${window.innerWidth < 768 ? "12px" : "14px"}; min-width: 4rem; margin-left: 2rem;">${message}</b>`
    messageElement.setAttribute("id", "loading-message")
    
    loadingElement.style.width = "fit-content"
    loadingElement.appendChild(messageElement)
    shadowRoot.getElementById("messages").scrollBy(0, 500);
}

//************** session management :start */

function getOrSetSessionData(name, email) {
  const retrievedUserDataString = sessionStorage.getItem("coachbots-user-data");

  if (retrievedUserDataString) {
    const retrievedUserData = JSON.parse(retrievedUserDataString);
    console.log(retrievedUserData.name);
    console.log(retrievedUserData.email);
  } else {
    console.log("No user data found in SessionStorage. So setting it now.");
    const userData = {
      name: name,
      email: email,
    };

    const userDataString = JSON.stringify(userData);
    sessionStorage.setItem("coachbots-user-data", userDataString);
  }
}

//************** session management : end */

function getAnonymousEmail() {
  const user_name = "coachbots_anonyoususer";
  const user_sid = getOrSetSessionId();
  const user_email = `${user_name}-${user_sid}@gmail.com`;

  return user_email;
}

//**************get or create sessionId: start */
function getOrSetSessionId() {
  let generatedSessionId = "";
  const retrievedSessionId = localStorage.getItem("coachbots-session-id");
  if (retrievedSessionId) {
    console.log("SessionId found in SessionStorage.");
    generatedSessionId = retrievedSessionId;
  } else {
    console.log("No sessionId found in SessionStorage. So setting it now.");
    generatedSessionId = generateSessionId();
    localStorage.setItem("coachbots-session-id", generatedSessionId);
  }
  return generatedSessionId;
}

//**************get or create sessionId: end */

//************* store user data in localstorage : start */

//* generate unique id for user
function generateSessionId() {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 10);
  return `${timestamp}-${randomString}`;
}

function setUserData(name, email) {
  const rawUserData = {
    name: name,
    email: email,
  };
  localStorage.setItem("coachbots-user", JSON.stringify(rawUserData));
  console.log("data set successfully");
}

function getUserData() {
  // Get saved data from localStorage
  const userData = localStorage.getItem("coachbots-user")
    ? JSON.parse(localStorage.getItem("coachbots-user"))
    : "";
  return userData;
}

//************* store user data in localstorage : end */

//* handle MCQ type test : start
async function setMcqVariables() {
  gShadowRoot = document.getElementById("chat-element").shadowRoot;
  const responseValue = gShadowRoot.querySelector(
    'input[name="mcq_option"]:checked'
  );
  sessionQuestionId = gShadowRoot
    .getElementById("question")
    .getAttribute("value");
  const question_id = sessionQuestionId.split(":")[0];
  const test_attempt_session_id = sessionQuestionId.split(":")[1];

  const optionsName = gShadowRoot.querySelectorAll('[name="mcq_option"]');

  const responseText = responseValue.value;
  const responseOption = responseValue.id;

  console.log("question_id", question_id, "session", test_attempt_session_id);
  console.log(mcqQustionIndex, globalQuestionLength);
  mcqQustionIndex++;

  let qUid;
  let newOption1Name;
  let newOption2Name;
  let newOption1Text;
  let newOption2Text;

  if (mcqQustionIndex != globalQuestionLength) {
    // updating question

    if (testType === "dynamic_mcq") {
      gShadowRoot.getElementById(`mcq-option-${mcqFormId}`).innerHTML =
        "Processing ...";

      queryParams = new URLSearchParams({
        description: senarioDescription,
        situation:
          mcqQustionIndex == 1
            ? globalQuestionData.results[0].questions[mcqQustionIndex - 1]
                .question
            : questionText,
        option_a: optionsName[0].defaultValue,
        option_b: optionsName[0].defaultValue,
        option_selected: responseText,
        test_attempt_session_id: test_attempt_session_id,
      });

      await fetch(
        `${baseURL}/test-attempt-sessions/get_next_mcq_question_options/?${queryParams}`,
        {
          method: "GET",
          headers: {
            Authorization: `Basic ${createBasicAuthToken(key, secret)}`,
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("Dynamic mcq response : ", data);
          console.log(data.options_data);
          questionText = data.options_data.next_situation;
          newOption1Name = data.options_data.option_a;
          newOption2Name = data.options_data.option_b;
          newOption1Text = data.options_data.option_a;
          newOption2Text = data.options_data.option_b;
          // qUid = data.options_data.next_situation;
          qUid = globalQuestionData.results[0].questions[mcqQustionIndex].uid;
        });
    } else {
      console.log("currentquestionidex", mcqQustionIndex);
      console.log(`Story ${responseOption}`);

      const matchingQuestions = globalQuestionData.results[0].questions.filter(
        (question) => question.mcq_path === `Story ${responseOption}`
      );

      qUid = matchingQuestions.map((question) => question.uid)[0];
      const mcqOptions = matchingQuestions.map(
        (question) => question.mcq_options
      )[0];
      const optionName = Object.keys(mcqOptions);
      questionText = matchingQuestions.map((question) => question.question)[0];

      console.log("questionText :", questionText);

      const questionMedia = matchingQuestions.map(
        (question) => question.media_link
      )[0];

      let queImageData;
      if (mediaProps && mediaProps[`question_image ${responseOption}`]) {
        queImageData = [
          mediaProps[`question_image ${responseOption}`],
          mediaProps[`question_image_mobile ${responseOption}`],
        ];
      }

      newOption1Name = optionName[0];
      newOption2Name = optionName[1];
      newOption1Text = mcqOptions[newOption1Name]["opt"];
      newOption2Text = mcqOptions[newOption2Name]["opt"];

      if (questionMedia) {
        let embeddingUrl = "";
        if (questionMedia.length > 0) {
          if (questionMedia.includes("youtube.com")) {
            const videoId = questionMedia.split("v=")[1];
            embeddingUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
          } else if (questionMedia.includes("vimeo.com")) {
            const videoId = questionMedia.split("/").pop();
            embeddingUrl = `https://player.vimeo.com/video/${videoId}?autoplay=1&loop=1`;
          } else if (questionMedia.includes("twitter.com")) {
            embeddingUrl = `https://twitframe.com/show?url=${questionMedia}`;
          }

          if (embeddingUrl) {
            questionText = `▪ Media <br>  <iframe
                          allow="autoplay; encrypted-media; fullscreen;"
                          style="width: 100%; border-radius: 8px; min-height: 50vh; min-width: 50vw;"
                          src=${embeddingUrl}
                          frameborder="0"
                          allowfullscreen
                      >
          `;
          }
          const urlList = questionMedia.split(",");
          console.log("list", urlList);
          if (urlList.length > 1) {
            urlList.forEach((element) => {
              element = element.trim();
              if (element.includes("docs.google.com")) {
                let url =
                  element.split("edit?")[0] +
                  "embed?start=true&loop=true&delayms=3000";
                console.log(url, "googelsheet");
                questionText =
                  questionText +
                  "\n" +
                  `<iframe src=${url}
                              frameborder="0" 
                              style="width: 100%; border-radius: 8px; min-height: 50vh; min-width: 50vw;"
                              allowfullscreen="true" 
                              mozallowfullscreen="true" 
                              webkitallowfullscreen="true"
                              ></iframe>`;
              } else {
                console.log("audio", element);
                questionText =
                  questionText +
                  "\n" +
                  `<div ><audio style="${
                    window.innerWidth < 600
                      ? "width: 200px; max-width: 200px !important;"
                      : " min-width: 50vw !important;"
                  }" controls autoplay>
              <source src=${element} type="audio/mpeg" />
              Your browser does not support the audio element.
                </audio></div>`;
              }
            });
          } else {
            if (questionMedia.includes("docs.google.com")) {
              let url =
                questionMedia.split("edit?")[0] +
                "embed?start=true&loop=true&delayms=3000";
              console.log(url, "google");
              if (isImmersive) {
                questionText = questionText.replaceAll(":", "");
                console.log("first", questionText);

                const urltts = `${baseURL}/test-responses/get-text-to-speech/?text=${questionText}`;
                const response = await fetch(urltts, {
                  method: "GET",
                  headers: {
                    Authorization: `Basic ${createBasicAuthToken(key, secret)}`,
                  },
                });

                const blob = await response.blob();
                console.log("respnse", blob);

                const objectUrl = URL.createObjectURL(blob);

                console.log(objectUrl, "url");
                questionText = `<div ><audio style="${
                  window.innerWidth < 600
                    ? "width: 200px; max-width: 200px !important;"
                    : " min-width: 50vw !important;"
                }" controls autoplay>
                <source src=${objectUrl} type="audio/mpeg" />
                Your browser does not support the audio element.
                </audio></div>`;
                console.log(questionText);
              }
              questionText =
                questionText +
                `<iframe src=${url}
                              frameborder="0" 
                              style="width: 100%; border-radius: 8px; min-height: 50vh; min-width: 50vw;" 
                              allowfullscreen="true" 
                              mozallowfullscreen="true" 
                              webkitallowfullscreen="true"
                              ></iframe>`;
            }
          }
        }
      }
      if (isImmersive && !questionMedia) {
        questionText = questionText.replaceAll(":", "");
        console.log("first", questionText);

        const urltts = `${baseURL}/test-responses/get-text-to-speech/?text=${questionText}`;
        const response = await fetch(urltts, {
          method: "GET",
          headers: {
            Authorization: `Basic ${createBasicAuthToken(key, secret)}`,
          },
        });

        const blob = await response.blob();
        console.log("respnse", blob);

        const objectUrl = URL.createObjectURL(blob);

        console.log(objectUrl, "url");
        questionText = `<div ><audio style="${
          window.innerWidth < 600
            ? "width: 200px; max-width: 200px !important;"
            : " min-width: 50vw !important;"
        }" controls autoplay>
        <source src=${objectUrl} type="audio/mpeg" />
        Your browser does not support the audio element.
        </audio></div>`;
        console.log(questionText);
      }
    }

    console.log("newquestionid", qUid, "session", test_attempt_session_id);

    formRadio = `
                  <div id='question' style="font-size: 16px; margin-bottom: 20px; color: #333;" value="${qUid}:${test_attempt_session_id}"><b>Q. </b>${questionText}</div>
                  <div style="display: flex; flex-direction: row; justify-contents: space-around; gap: 8px;flex-wrap: wrap;">
                    <div style="display: flex; flex-direction: row; align-items: flex-start;">
                      <input type="radio" id="${newOption1Name}" name="mcq_option" value="${newOption1Text}" style="margin-right: 5px;">
                      <label for="${newOption1Name}" style="font-size: 14px; margin-bottom: 10px; display: block;">${newOption1Text}</label>
                    </div>
                    <div style="display: flex; flex-direction: row; align-items: flex-start;">
                      <input type="radio" id="${newOption2Name}" name="mcq_option" value="${newOption2Text}" style="margin-right: 5px;">
                      <label for="${newOption2Name}" style="font-size: 14px; margin-bottom: 10px; display: block;">${newOption2Text}</label>
                    </div>
                  </div>
                  <button id="submit-btn" onclick="setMcqVariables()" style="margin-top: 15px; padding: 10px 15px; width: 100%; border: 1px solid #1984ff; border-radius: 5px; color: white; background-color: #1984ff; cursor: pointer; font-size: 16px;">Submit</button>
                `;
    gShadowRoot.getElementById(`mcq-option-${mcqFormId}`).innerHTML = formRadio;

    // // submitting response
    const testResponse = await fetch(`${baseURL}/test-responses/`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${createBasicAuthToken(key, secret)}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        test_attempt_session_id: test_attempt_session_id,
        question_id: question_id,
        response_text: responseText,
        response_file: "",
        user_attributes: {
          tag: "deepchat_profile",
          attributes: {
            username: "web_user",
            email: user ? user.email : getAnonymousEmail(),
          },
        },
      }),
    });
    const testResponseData = await testResponse.json();
    console.log(testResponseData);
  } else {
    // decisionAnalysisReport

    // let credentialsForm = `
    // <b>For obtaining your report, please submit the following details.</b>
    // <div id="input-form" style="width: 100%;display: flex; flex-direction: row">
    //   <div style="display: flex; flex-direction: column;">
    //       <label for="name" style="margin: 12px 0 4px 0;">Name  </label>
    //       <input
    //       type="text"
    //       id="input-name"
    //       style="
    //           padding: 8px;
    //           margin-bottom:4px;
    //           border-radius: 4px;
    //           border: 1px solid rgb(188, 188, 188);
    //       "
    //       />
    //   </div>
    //   <div style="display: flex; flex-direction: column; margin-top: 8px">
    //       <label for="email" style="margin: 4px 0">Email </label>
    //       <input
    //       type="email"
    //       id="input-email"
    //       style="
    //       padding: 8px;
    //       margin-bottom:4px;
    //       border-radius: 4px;
    //       border: 1px solid rgb(188, 188, 188);
    //       "
    //       />
    //       <button
    //       style="
    //           margin-top: 8px;
    //           padding: 8px 12px;
    //           width: fit-content;
    //           border: 1px solid rgb(188, 188, 188);
    //           border-radius: 20px;
    //           color: white;
    //           background-color: #1984ff;
    //       "
    // id="submit-btn"
    // onclick="submitEmailAndName()"
    //       >
    //       Submit
    //       </button>
    //   </div>
    //   </div>`;

    let credentialsForm = getCredentialsForm();

    console.log("user logged in, so sending email");
    gShadowRoot.getElementById(
      `mcq-option-${mcqFormId}`
    ).innerHTML = `<b>That's it! Thank you for participating in the interaction. Your interaction report is being processed.</b>`;
    // // submitting response
    const testResponse = await fetch(`${baseURL}/test-responses/`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${createBasicAuthToken(key, secret)}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        test_attempt_session_id: test_attempt_session_id,
        question_id: question_id,
        response_text: responseText,
        response_file: "",
        user_attributes: {
          tag: "deepchat_profile",
          attributes: {
            username: "web_user",
            email: user ? user.email : getAnonymousEmail(),
          },
        },
      }),
    });

    const testResponseData = await testResponse.json();
    console.log("last", testResponseData);
    const res = await fetch(
      `${baseURL}/test-attempt-sessions/check-session-data-exist/?session_id=${test_attempt_session_id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Basic ${createBasicAuthToken(key, secret)}`,
          "Content-Type": "application/json",
        },
      }
    );

    const isCheck = await res.json();
    console.log(isCheck);
    if (!isCheck.check) {
      if (testType === "mcq" || testType === "dynamic_mcq") {
        const shadowRoot = document.getElementById("chat-element").shadowRoot;
        const button = shadowRoot.getElementById(`mcq-option-${mcqFormId}`);
        // button.parentNode.removeChild(button)
        const thankYouMessage = document.createElement("div");
        thankYouMessage.innerHTML = "<b>Thank you!</b>"; // You can customize the message here
        // Replace the button with the "Thank you" message
        button.parentNode.replaceChild(thankYouMessage, button);
      }
      if (isProceed === "false") {
        const gshadowRoot = document.getElementById("chat-element").shadowRoot;
        const msg = gshadowRoot.getElementById("proceed-option");
        // button.parentNode.removeChild(button)
        const que_msg = document.createElement("div");
        que_msg.innerHTML = "Thank You"; // You can customize the message here
        // Replace the button with the "Thank you" message
        msg.parentNode.replaceChild(que_msg, msg);
      }
      resetAllVariables(); //reseting variables

      appendMessage(
        "<p style='font-size: 14px;color: #991b1b;'><b>Unfortunately due to technical reasons, your earlier response could not be processed. The session will be terminated. Please try again using the interaction code.</b>.</p>"
      );
      return;
    }

    if (!window.user) {
      console.log("user not logged in, so asking for credentials");
      // gShadowRoot.getElementById(`mcq-option-${mcqFormId}`).innerHTML =
      //   credentialsForm;
      isEmailForm = true;
      formFields = ["name", "email"];
      appendMessage(`<b>Please enter your ${formFields[0]}</b>`);
    }

    await fetch(`${baseURL}/frontend-auth/get-report-url/`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${createBasicAuthToken(key, secret)}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: participantId,
        report_type: "decisionAnalysisReport",
        session_id: test_attempt_session_id,
        interaction_id: globalQuestionData.results[0].uid,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("REPORT 1");
        reportUrl = data.url;
        globalReportUrl = reportUrl;
        responsesDone = true;
        questionIndex = 0;
        mcqFormId++;
        // mcqQustionIndex = 0;

        console.log("Report Url mcq : ", responsesDone, globalReportUrl);

        if (window.user) {
          // append custom message to chat
          appendMessage(
            `<p><b>It's showtime ✨, here is your detailed <a target="_blank" style="color: #3b82f6;text-decoration:none;" href="${globalReportUrl}">feedback report</a>. The feedback is also emailed to you and will be available to you for 60 days.</b></p>`
          );
          //   gShadowRoot.getElementById(
          //     `mcq-option-${mcqFormId}`
          //   ).innerHTML = `<p>It's showtime ✨, here is your detailed <a target="_blank" style="color: #3b82f6;text-decoration:none;" href="${globalReportUrl}">feedback report</a>. The feedback is also emailed to you and will be available to you for 60 days.</p>`;
          //   appendMessage(message);

            //Enable Copy Paste
            var chatElementRef2 = document.getElementById("chat-element");
            const shadowRoot = chatElementRef2.shadowRoot;
        
            const textInputElement = shadowRoot.getElementById("text-input")
            textInputElement.removeAttribute("onpaste")
          //* send message to start new session

          appendMessage(
            "<b>Please enter another access code to start a new interaction.</b>"
          );
          submitEmailAndName();
        }
      });

    // const urlObject = new URL(reportUrl);
    // const baseurl = `${urlObject.protocol}//${urlObject.host}`;

    // const resp = await fetch(baseurl)
    // console.log(resp)
    // if (!resp.ok){
    //   appendMessage("<p style='font-size: 14px;color: #991b1b;'><b>Our report server is currently down. Please try again.</b>.</p>")

    // }
  }
}

//* handle MCQ type test : end

let queryParams;
async function proceedFormFlow(msg) {
  if (formFields.length > 0) {
    isEmailForm = true;
    const filedname = formFields[0];
    formFields = formFields.slice(1);
    emailNameformJson[filedname] = msg;
  }
}
//*********** hit mail sending api */

function sendEmail(session_id, reportUrl) {
  // responsesDone = false;
  console.log("sending email");
  const queryParams2 = new URLSearchParams({
    test_attempt_session_id: session_id,
    report_url: reportUrl,
    is_whatsapp: false,
  });

  fetch(`${baseURL}/test-attempt-sessions/send-report-email/?${queryParams2}`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${createBasicAuthToken(key, secret)}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      emailSent = data.status;
      console.log("email sent");
      // resetAllVariables();
    })
    .catch((err) => console.log(err));
}

//* submit email and name for report generation : start
async function submitEmailAndName() {
  gShadowRoot = document.getElementById("chat-element").shadowRoot;
  if (!window.user) {
    // const inputNameVal = gShadowRoot.getElementById("input-name").value;
    // const inputEmailVal = gShadowRoot.getElementById("input-email").value;

    // inputName = inputNameVal;
    // inputEmail = inputEmailVal;
    inputEmail = emailNameformJson["email"];
    inputName = emailNameformJson["name"];

    //* store these values in session storage
    // getOrSetSessionData(inputName, inputEmail);

    queryParams = new URLSearchParams({
      participant_id: participantId,
      email: inputEmail,
      name: inputName,
    });
  } else {
    queryParams = new URLSearchParams({
      participant_id: participantId,
      email: window.user.email,
      name: window.user.given_name,
    });
  }
  if (!window.user){
    await fetch(
      `${baseURL}/test-attempt-sessions/set-name-and-email/?${queryParams}`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${createBasicAuthToken(key, secret)}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("name email updated, sending email",data);
      });
    }
      sendEmail(sessionId, globalReportUrl);
      increaseActionPoint(userId, "interaction_attempted");

      if (!window.user) {
        // append custom message to chat
        // const message = `<b>It's showtime ✨, here is your detailed <a target="_blank" style="color: #3b82f6;text-decoration:none;" href="${globalReportUrl}">feedback report</a>. The feedback is also emailed to you and will be available to you for 60 days.</b>`;
        // appendMessage(message);
        // //* send message to start new session
        // appendMessage(
        //   "<b>Please enter another access code to start a new interaction.</b>"
        // );
      }
      const recommDiv = findRelatedItems(recommendationsData, testCode);
      if (recommDiv) {
        appendMessage(recommDiv);
      }
      resetAllVariables();
    // })
    // .catch((err) => {
    //   console.log(err);
    // });

  // await sendEmail();

  //   const queryParams2 = new URLSearchParams({
  //     test_attempt_session_id: sessionId,
  //     report_url: globalReportUrl,
  //     is_whatsapp: false,
  //   });

  //   await fetch(
  //     `${baseURL}/test-attempt-sessions/send-report-email/?${queryParams2}`,
  //     {
  //       method: "POST",
  //       headers: {
  //         Authorization: `Basic ${createBasicAuthToken(key, secret)}`,
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   )
  //     .then((response) => response.json())
  //     .then((data) => {
  //       emailSent = data.status;
  //     })
  //     .catch((err) => console.log(err));
}

//* submit email and name for report generation : end

// handle surprise buton click
function handleSurpriseMeButtonClick() {
  challenges = [
    "QEEG5VY",
    "QMFMKQ4",
    "QUPR9AO",
    "QLDQ2IY",
    "QKLX4V0",
    "QULNNNE",
    "QZ4R9QW",
    "QJV5AEY",
    "QEYTB3I",
    "QYCZJDN",
    "Q125Z1B",
    "Q9QW1HF",
    "QHYRLGN",
    "QJZWYYB",
  ];
  console.log("surprise me! button clicked");

  const randomIndex = Math.floor(Math.random() * challenges.length);
  const randomChallenge = challenges[randomIndex];
  userAcessAvailability = true;
  optedNo = true;

  //   console.log(randomChallenge);
  //   testCode = randomChallenge.test_code;
  //   codeAvailabilityUserChoice = true;
  console.log("random challenge :==>", randomChallenge);
  testCode = randomChallenge.trim();

  gShadowRoot = document.getElementById("chat-element").shadowRoot;
  // gShadowRoot.getElementById("surprise-button").disabled = true;
  // removing button
  // const msg = gShadowRoot.getElementById("surprise-button");
  // // button.parentNode.removeChild(button)
  // const que_msg = document.createElement("div");
  // que_msg.innerHTML = "Please Wait..."; // You can customize the message here
  // // Replace the button with the "Thank you" message
  // msg.parentNode.replaceChild(que_msg, msg);

  gShadowRoot.getElementById("text-input").focus();
  setTimeout(() => {
    gShadowRoot.getElementById("text-input").textContent =
      sampleTestCodes[randomChallenge];
    setTimeout(() => {
      gShadowRoot.querySelector(".input-button").click();
    }, 100);
  }, 100);
}

//* variables containing no-code flow data
const optionDetail = {
  "Integrating a New Team Member": {
    area: "Building Credibility as the New Team Member",
    information:
      "Upon joining the team, the new member conscientiously familiarized themselves with the organization's mission, values, and current projects. They proactively sought opportunities to engage with team members, attending both formal meetings and informal gatherings. Demonstrating a keen understanding of their role, the new member consistently met deadlines and exceeded expectations. Their meticulous approach to tasks and open communication style fostered positive relationships within the team. By actively seeking feedback, the new member showcased a commitment to continuous improvement, solidifying their credibility as a valued team contributor.",
  },

  "Effective Customer Service Management": {
    area: "Handling Impatient Customer Interactions",
    information:
      "During a product launch, a customer voiced impatience about delayed delivery. Responding promptly, the service representative acknowledged the concern empathetically, providing a detailed explanation of the situation and steps being taken for resolution. They assured the customer of their commitment to resolving the issue promptly, offering a personalized discount for the inconvenience. The representative's proactive communication and solution-oriented approach not only pacified the customer but also reinforced the company's dedication to customer satisfaction, effectively diffusing a potentially tense situation.",
  },

  "Cultivating Growth Through Feedback": {
    area: "Personal Growth Through Feedback",
    information:
      "Engaged in a continuous cycle of personal development, the individual proactively sought feedback from peers and supervisors. Embracing constructive criticism, they identified areas for improvement and implemented targeted strategies for growth. Their commitment to self-reflection, coupled with a receptive attitude, propelled them to refine their skills effectively. This dedication to harnessing feedback as a catalyst for personal and professional advancement underscored their commitment to ongoing personal growth within the organizational context.",
  },

  "Cultivating Team Impartiality": {
    area: "Managing Favoritism and Bias",
    information:
      "The team leader, recognizing the importance of impartiality, consistently employed transparent decision-making processes. In project assignments, they carefully considered individual strengths, ensuring a fair distribution of opportunities. Regularly monitoring interactions, the leader actively discouraged favoritism and biased behavior within the team. Recognizing the potential impact on morale, they implemented inclusive practices, fostering an environment where each team member felt valued. By promoting meritocracy and addressing biases head-on, the leader contributed to a harmonious and equitable work atmosphere, reinforcing the team's commitment to professionalism and fairness.",
  },

  "Managing Meeting Momentum": {
    area: "Assertively Handling Interruptions",
    information:
      "During a crucial team meeting, the project lead faced multiple interruptions from team members eager to share their perspectives. With assertiveness, the project lead implemented a structured approach, acknowledging each interruption, expressing appreciation for input, and then redirecting focus to the agenda. This tactful handling of interruptions not only maintained the meeting's momentum but also ensured that all voices were heard without compromising the meeting's objectives. The project lead's ability to navigate interruptions with poise contributed to a more effective and collaborative team environment.",
  },
};

//* function to generate buttons for no-code flow
function generateOptionButtons() {
  // Get the container element
  var container = document.getElementById("option-button-container");

  // Iterate through the data array to create buttons dynamically
  optionDetail.forEach(function (item) {
    // Extract information from the dictionary
    var buttonText = Object.keys(item)[0];
    var area = item[buttonText]["area"];

    // Create a button element
    var button = document.createElement("button");
    button.style.marginTop = "5px";
    button.textContent = buttonText;

    // Set the onclick attribute to call the handleOptionButtonClick function
    button.setAttribute(
      "onclick",
      "handleOptionButtonClick('" + buttonText + "')"
    );

    // Append the button to the container
    container.appendChild(button);
  });
}

//image hover handlers - start
function showTooltip(content, event, tooltipId, imageMapName) {
  const shadowRoot = document.getElementById("chat-element").shadowRoot;
  const tooltip = shadowRoot.getElementById(tooltipId);
  tooltip.innerHTML = content;
  updateTooltipPosition(event, imageMapName, tooltipId);
  tooltip.style.display = "block";
}

function updateTooltipPosition(event, imageMapName, tooltipId) {
  const shadowRoot = document.getElementById("chat-element").shadowRoot;
  const tooltip = shadowRoot.getElementById(tooltipId);

  const xOffset = 0;
  const yOffset = 0;

  const image = shadowRoot.querySelector(`img[usemap='#${imageMapName}']`);
  const imageRect = image.getBoundingClientRect();

  const mouseX = event.clientX + window.pageXOffset;
  const mouseY = event.clientY + window.pageYOffset;

  if (window.innerWidth > 760) {
    tooltip.style.left = event.clientX - 120 + "px";
    tooltip.style.top = event.clientY - 60 + "px";
  } else {
    tooltip.style.left = event.clientX - 90 + "px";
    tooltip.style.top = event.clientY - 180 + "px";
  }
}

function hideTooltip(tooltipId) {
  const shadowRoot = document.getElementById("chat-element").shadowRoot;
  const tooltip = shadowRoot.getElementById(tooltipId);
  // console.log(tooltip)
  tooltip.style.display = "none";
}
//image hover handlers - end

const setHoverPoints = (coords, imageId, imageMapName, tooltipId) => {
  //hover configs
  const shadowRootForImage = document.getElementById("chat-element").shadowRoot;
  const descriptionMediaImage = shadowRootForImage.getElementById(imageId);

  // -map element
  const mapElement = document.createElement("map");
  mapElement.setAttribute("name", imageMapName);
  shadowRootForImage.appendChild(mapElement);

  // -overlay element
  const overlayElement = document.createElement("div");
  overlayElement.setAttribute("class", "image-overlay");
  shadowRootForImage.appendChild(overlayElement);

  // -tooltip
  const tooltipELement = document.createElement("div");
  tooltipELement.setAttribute("id", tooltipId);
  tooltipELement.setAttribute("class", "custom-tooltip");
  tooltipELement.style.position = "absolute";
  tooltipELement.style.backgroundColor = "#333";
  tooltipELement.style.color = "#fff";
  tooltipELement.style.padding = "5px";
  tooltipELement.style.borderRadius = "5px";
  tooltipELement.style.display = "none";
  shadowRootForImage.appendChild(tooltipELement);

  coords.map((item) => {
    console.log(item);
    let coord;
    if (window.innerWidth < 768) {
      coord = item.coord.split("|")[1].replace(/\./g, ",").split(",");
    } else {
      coord = item.coord.split("|")[0].replace(/\./g, ",").split(",");
    }

    const areaElement = document.createElement("area");
    areaElement.setAttribute("coords", coord);
    areaElement.setAttribute("shape", "rect");
    // areaElement.setAttribute("title", item.title);

    mapElement.appendChild(areaElement);

    areaElement.addEventListener("mouseover", (event) => {
      showTooltip(item.title, event, tooltipId, imageMapName);
    });

    areaElement.addEventListener("mousemove", (event) => {
      updateTooltipPosition(event, imageMapName, tooltipId);
    });

    areaElement.addEventListener("mouseout", () => {
      hideTooltip(tooltipId);
    });
  });
};

let clearMultipleBodyData = false;
// to reset all variables
const resetAllVariables = async () => {
  //* reset all variables : start
  AttemptTestDirect = false;
  responsesDone = false;
  questionIndex = 0;
  userResponses = [];
  DuplicateResponseCount = 0;
  console.log("reseting variables");
  questionText = "";
  reportType = "interactionSessionReport";
  questionId = null;
  userResponse = "";

  testId = null;
  resQuestionNumber = null;
  questionLength = null;
  questionData = null;
  documentId = null;
  userAudioResponse = "";

  is_free = true;
  responseProcessedQuestion = 0;
  senarioDescription = "";
  senarioTitle = "";
  senarioCase = "";
  senarioMediaDescription;
  questionMediaLink = null;
  userName = "";
  userEmail = "";
  reportUrl = null;
  testCodeList = [];
  isRepeatStatus = false;
  testPrevilage = "";

  //global variables
  sessionId = "";
  testCode = null;
  optedNo = false;
  globalReportUrl = null;

  //* reset all variables : end
  codeAvailabilityUserChoice = true;
  mcqQustionIndex = 0;
  mcqFormId;
  globalQuestionData;
  globalQuestionLength;
  testType = "";
  isHindi = false;
  TestUIInfo;
  isProceed = "";
  isSessionActive = false;
  isEmailType = false;
  recommendations = "";
  isTestSignedIn;
  clientName = "";
  isTranscriptOnly = false;
  console.log("resetting variables completed");
};

function increaseActionPoint(user_id, field_name) {
  fetch(
    `${baseURL}/test-attempt-sessions/get-or-save-action-point/?mode=save&user_id=${user_id}&for=${field_name}`,
    {
      method: "GET",
      headers: {
        Authorization: `Basic ${createBasicAuthToken(key, secret)}`,
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(`increased.`, data);
    })
    .catch((err) => console.log("increaseActionPoint Error", err));
}

function findRelatedItems(data, targetCode) {
  let matchingItems = [];
  let targetTitle = "";

  for (const sublist of data) {
    for (const item of sublist) {
      if (item.code === targetCode) {
        targetTitle = item.title;
      } else {
        matchingItems.push(item);
      }
    }

    if (matchingItems.length > 0 && targetTitle) {
      break;
    } else {
      matchingItems = [];
    }
  }
  console.log("mat", matchingItems, targetTitle, targetCode, data);
  let resultDiv =
    "<b>System Recommendation: If you like this scenario you can try:<b> <br>";
  matchingItems.forEach((item) => {
    resultDiv += `<strong>Title:</strong> ${item.title}<br> <strong>Code:</strong> ${item.code} <br>`;
  });

  return matchingItems.length > 0 && targetTitle
    ? `<div>${resultDiv}</div>`
    : null;
}

//* handle continue coaching button click
const handleContinueCoachingClick = async (randomId) => {
  console.log("continue coaching button clicked", randomId);
  gShadowRoot = document.getElementById("chat-element").shadowRoot;
  const target = gShadowRoot.getElementById(randomId);
  target.innerHTML = "";
};

//* handle end coaching button click
const handleEndCoachingClick = async (randomId) => {
  console.log("end coaching button clicked");

  const response = await fetch(`${baseURL}/frontend-auth/get-report-url/`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${createBasicAuthToken(key, secret)}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id: participantId,
      report_type: "coachingSessionReport",
      test_attempt_session_id: sessionId,
    }),
  });
  const responseData = await response.json();
  globalReportUrl = responseData.url;
  console.log("Response from Coaching Report : ", globalReportUrl);

  gShadowRoot = document.getElementById("chat-element").shadowRoot;
  const target = gShadowRoot.getElementById(randomId);
  target.innerHTML = "";

  if (window.user) {
    // append custom message to chat
    appendMessage(
      `<p><b>It's showtime ✨, here is your detailed <a target="_blank" style="color: #3b82f6;text-decoration:none;" href="${globalReportUrl}">feedback report</a>. The feedback is also emailed to you and will be available to you for 60 days.</b></p>`
    );
    //   gShadowRoot.getElementById(
    //     `mcq-option-${mcqFormId}`
    //   ).innerHTML = `<p>It's showtime ✨, here is your detailed <a target="_blank" style="color: #3b82f6;text-decoration:none;" href="${globalReportUrl}">feedback report</a>. The feedback is also emailed to you and will be available to you for 60 days.</p>`;
    //   appendMessage(message);

    //* send message to start new session
    submitEmailAndName();
    // sendEmail();
    // resetAllVariables();

      //Enable Copy Paste
      var chatElementRef2 = document.getElementById("chat-element");
      const shadowRoot = chatElementRef2.shadowRoot;
  
      const textInputElement = shadowRoot.getElementById("text-input")
      textInputElement.removeAttribute("onpaste")
                  
    appendMessage(
      "<b>Please enter another access code to start a new interaction.</b>"
    );
  } else {
    // appendMessage(getCredentialsForm());
    isEmailForm = true;
    formFields = ["name", "email"];
    appendMessage(`<b>Please enter your ${formFields[0]}</b>`);
  }
};

function generateRandomAlphanumeric(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
}

const audioCanvasUiForQuestionsStt = (audio, canvas) => {

  const shadowRoot = document.getElementById("chat-element").shadowRoot
  const audioElements = shadowRoot.querySelectorAll("audio")
  if (audioElements.length > 1) {
    audioElements.forEach((element, i) => {
      if (
        element.id.includes("audio-player-") &&
        i !== audioElements.length - 1
      ) {
        element.pause();
      }
    });
  }

  const canvasCtx = canvas.getContext("2d");
  console.log(canvasCtx);
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  console.log(audioCtx);
  const analyser = audioCtx.createAnalyser();
  const source = audioCtx.createMediaElementSource(audio);

  source.connect(analyser);
  analyser.connect(audioCtx.destination);
  analyser.fftSize = 256;
  const bufferLength = analyser.fftSize;
  const dataArray = new Uint8Array(bufferLength);

  function draw() {
    requestAnimationFrame(draw);

    analyser.getByteFrequencyData(dataArray);

    canvasCtx.fillStyle = "#F3F4F6";
    canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

    const barWidth = (canvas.width / bufferLength) * 2.5;
    let barHeight;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
      barHeight = dataArray[i];

      canvasCtx.fillStyle = "#2CC092";
      canvasCtx.fillRect(
        x,
        canvas.height - barHeight / 2,
        barWidth,
        barHeight / 2
      );

      x += barWidth + 1;
    }
  }

  draw()
}

const handleProceedClick = async (choice) => {
  if (choice == "Yes") {
    isProceed = "true";
    const gshadowRoot = document.getElementById("chat-element").shadowRoot;
    const msg = gshadowRoot.getElementById("proceed-option");
    // button.parentNode.removeChild(button)
    if (msg){
      const que_msg = document.createElement("div");
      que_msg.innerHTML = "Please Wait.."; // You can customize the message here
      // Replace the button with the "Thank you" message
      msg.parentNode.replaceChild(que_msg, msg);
    }

    //disable Copy Paste
    const textInputElement = gshadowRoot.getElementById("text-input")
    // textInputElement.setAttribute("onpaste", "alert('Pasting text is not allowed for answering the questions asked in the simulation.'); return false;")

    if (questionMediaLink && testType != "mcq" && testType != "dynamic_mcq") {
      console.log(questionMediaLink);
      let embeddingUrl = "";

      if (questionMediaLink.length > 0) {
        if (questionMediaLink.includes("youtube.com")) {
          const videoId = questionMediaLink.split("v=")[1];
          embeddingUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        } else if (questionMediaLink.includes("vimeo.com")) {
          const videoId = questionMediaLink.split("/").pop();
          embeddingUrl = `https://player.vimeo.com/video/${videoId}?autoplay=1&loop=1`;
        } else if (questionMediaLink.includes("twitter.com")) {
          embeddingUrl = `https://twitframe.com/show?url=${questionMediaLink}`;
        }

        if (embeddingUrl) {
          appendMessage(`▪ Media <br>  <iframe
                          allow="autoplay; encrypted-media; fullscreen;"
                          style="width: 100%; border-radius: 8px; min-height: 50vh; min-width: 50vw;"
                          src=${embeddingUrl}
                          frameborder="0"
                          allowfullscreen
                        >
                  `);
        }

        const urlList = questionMediaLink.split(",");
        console.log("list", urlList);
        if (urlList.length > 1) {
          urlList.forEach((element) => {
            element = element.trim();
            if (element.includes("docs.google.com")) {
              let url =
                element.split("edit?")[0] +
                "embed?start=true&loop=true&delayms=3000";
              console.log(url);
              appendMessage(`<iframe src=${url}
                              frameborder="0" 
                              style="width: 100%; border-radius: 8px; min-height: 50vh; min-width: 50vw;"
                              allowfullscreen="true" 
                              mozallowfullscreen="true" 
                              webkitallowfullscreen="true"
                              ></iframe>`);
            } else {
              console.log(element);
              appendMessage(`<audio style="${
                window.innerWidth < 600
                  ? "width: 200px; max-width: 200px !important;"
                  : " min-width: 50vw !important;"
              }" controls autoplay>
              <source src=${element} type="audio/mpeg" />
              Your browser does not support the audio element.
              </audio>`);
            }
          });
        } else {
          if (questionMediaLink.includes("docs.google.com")) {
            let url =
              questionMediaLink.split("edit?")[0] +
              "embed?start=true&loop=true&delayms=3000";
            console.log(url);
            appendMessage(`<iframe src=${url}
                            frameborder="0" 
                            style="width: 100%; border-radius: 8px; min-height: 50vh; min-width: 50vw;" 
                            allowfullscreen="true" 
                            mozallowfullscreen="true" 
                            webkitallowfullscreen="true"
                            ></iframe>`);
          } else if (questionMediaLink.includes("guidejar.com")) {
            const guidejarId = questionMediaLink.split("/").pop();
            appendMessage(`
            <div style="width:640px">
            <div style="position:relative;height:0;width:100%;overflow:hidden;box-sizing:border-box;padding-bottom:calc(100% - 0px)">
            <iframe src="https://www.guidejar.com/embed/${guidejarId}?type=1&controls=off" width="100%" height="100%" style="position:absolute;inset:0" allowfullscreen frameborder="0"></iframe
            ></div></div>
            `);
          }
        }
      }

      if (initialQuestionText) {
        const linkPattern = /(http[s]?:\/\/[^\s]+)/;
        const is_link = linkPattern.test(initialQuestionText);
        if (!is_link) {
          let strList = initialQuestionText.replaceAll("*", "");

          strList = strList.split(":", 2);
          let responderName;
          if (strList.length > 1) {
            initialQuestionText = strList[1];
            responderName = strList[0];
          }
          if (isImmersive) {
            console.log(initialQuestionText);
            const queText = initialQuestionText;
            const queDiv = `<p>${queText}</p><br>`;
            const urltts = `${baseURL}/test-responses/get-text-to-speech/?text=${initialQuestionText}`;
            const response = await fetch(urltts, {
              method: "GET",
              headers: {
                Authorization: `Basic ${createBasicAuthToken(key, secret)}`,
              },
            });

            const blob = await response.blob();
            console.log("respnse", blob);

            const objectUrl = URL.createObjectURL(blob);

            console.log(objectUrl, "url");

            const randomIdForAudioElement = generateRandomAlphanumeric(5);
            const shadowRoot = document.getElementById("chat-element").shadowRoot

            initialQuestionText =
              queDiv +
              `<div ><audio id="audio-player-${randomIdForAudioElement}" style="${
                window.innerWidth < 600
                  ? "width: 200px; max-width: 200px !important;"
                  : " min-width: 50vw !important;"
              }" autoplay>
              <source src=${objectUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
              </audio>
              <canvas id="canvas-audio-${randomIdForAudioElement}" width="400" height="40"></canvas>
              </div>`;

              setTimeout(() => {
                const audioElement = shadowRoot.getElementById(`audio-player-${randomIdForAudioElement}`)
                const canvasElement = shadowRoot.getElementById(`canvas-audio-${randomIdForAudioElement}`)
                console.log(audioElement, canvasElement)
                audioCanvasUiForQuestionsStt(audioElement, canvasElement)
              }, 100);

            console.log(initialQuestionText);
          }
          console.log("last", initialQuestionText);
          if (responderName) {
            initialQuestionText =
              `<b>${responderName}:</b><br>` + `<p>${initialQuestionText}</p>`;
          }

          appendMessage(initialQuestionText);
        }
      }
    } else {
      if (
        !questionMediaLink &&
        testType != "orchestrated_conversation" &&
        testType != "mcq" &&
        testType != "dynamic_mcq" &&
        senarioCase != "process_training"
      ) {
        let responderName;
        if (testType === "dynamic_discussion_thread") {
          if (initialQuestionText.includes(":")) {
            initialQuestionText = initialQuestionText.replace(/<\/?p>/g, "");
            const strList = initialQuestionText.split(":", 2);
            responderName = `<b>${strList[0]}:</b><br>`;
            initialQuestionText = strList[1];
          } else {
            responderName = `<b>System:</b><br>`;
          }
        } else {
          let strLIst = initialQuestionText.replaceAll("*", "").split(":", 2);
          if (strLIst.length > 1) {
            initialQuestionText = strLIst[1];
            responderName = `<b>${strLIst[0]}:</b><br>`;
          }
        }
        if (isImmersive) {
          const queText = initialQuestionText;
          const queDiv = `<p>${queText}</p><br>`;
          const url = `${baseURL}/test-responses/get-text-to-speech/?text=${initialQuestionText}`;
          const response = await fetch(url, {
            method: "GET",
            headers: {
              Authorization: `Basic ${createBasicAuthToken(key, secret)}`,
            },
          });

          const blob = await response.blob();
          console.log("respnse", blob);

          const objectUrl = URL.createObjectURL(blob);

          console.log(objectUrl, "url");

          const randomIdForAudioElement = generateRandomAlphanumeric(5);
          const shadowRoot = document.getElementById("chat-element").shadowRoot
          
          initialQuestionText =
            queDiv +
            `<div ><audio id="audio-player-${randomIdForAudioElement}" style="${
              window.innerWidth < 600
                ? "width: 200px; max-width: 200px !important;"
                : " min-width: 50vw !important;"
            }" autoplay>
          <source src=${objectUrl} type="audio/mpeg" />
          Your browser does not support the audio element.
          </audio>
          
          <canvas id="canvas-audio-${randomIdForAudioElement}" width="400" height="40"></canvas>
          </div>`;

          setTimeout(() => {
            const audioElement = shadowRoot.getElementById(`audio-player-${randomIdForAudioElement}`)
            const canvasElement = shadowRoot.getElementById(`canvas-audio-${randomIdForAudioElement}`)
            console.log(audioElement, canvasElement)
            audioCanvasUiForQuestionsStt(audioElement, canvasElement)
          }, 100);
        }
        if (responderName) {
          initialQuestionText = responderName + initialQuestionText;
        }

        appendMessage(initialQuestionText);
      } else if (testType === "orchestrated_conversation") {
        console.log(initialQuestionText);
        const regex = /<p>(.*?)<\/p>/g;

        // Extracting text between <p> and </p> tags
        const matches = Array.from(
          initialQuestionText.matchAll(regex),
          (match) => match[1].trim()
        );

        console.log("matches", matches);
        // Separating each extracted text by ":"
        const separatedText = matches.map((match) => match.split(":", 2));
        console.log("speratedTExt", separatedText);

        // Displaying the separated text
        if (isImmersive) {
          const audioPromises = separatedText.map(async (entry) => {
            const responderName = `<b>${entry[0]}:</b><br>`;
            console.log(entry);
            const queText = entry[1];
            const queDiv = `<p>${queText}</p><br>`;

            const url = `${baseURL}/test-responses/get-text-to-speech/?text=${entry[1]}`;

            const response = await fetch(url, {
              method: "GET",
              headers: {
                Authorization: `Basic ${createBasicAuthToken(key, secret)}`,
              },
            });

            const blob = await response.blob();
            console.log("respnse", blob);

            const objectUrl = URL.createObjectURL(blob);

            console.log(objectUrl, "url");
            let audioCont =
              queDiv +
              `<div ><audio style="${
                window.innerWidth < 600
                  ? "width: 200px; max-width: 200px !important;"
                  : " min-width: 50vw !important;"
              }" controls>
            <source src=${objectUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
            </audio></div>`;
            if (responderName) {
              audioCont = responderName + audioCont;
            }

            return audioCont;
          });

          console.log(audioPromises, "audioPromises");

          const audioContents = await Promise.all(audioPromises);

          audioContents.forEach((content) => {
            appendMessage(content);
          });
        } else {
          separatedText.forEach((entry) => {
            const container = `<b>${entry[0]}:</b><br>` + `<p>${entry[1]}</P`;
            appendMessage(container);
          });
        }
      } else if (
        mediaProps &&
        Object.keys(mediaProps).includes(`que_image ${initialIndex}`)
      ) {
        const questionpropName = `que_image ${initialIndex}`;

        const url = Object.keys(mediaProps[questionpropName])[0];
        let narration;
        let coords = [];
        const coordAndTitleNarrationList = mediaProps[questionpropName][url];

        coordAndTitleNarrationList.forEach((element) => {
          if (typeof element === "string") {
            narration = element;
          } else {
            coords.push(element);
          }
        });

        const testImage = {
          image: url,
          coords: coords,
          narration: narration,
        };
        console.log(testImage);
        const imageUrl = url;

        const urltts = `${baseURL}/test-responses/get-text-to-speech/?text=${narration}`;
        const response = await fetch(urltts, {
          method: "GET",
          headers: {
            Authorization: `Basic ${createBasicAuthToken(key, secret)}`,
          },
        });

        const blob = await response.blob();
        console.log("respnse", blob);

        const objectUrl = URL.createObjectURL(blob);

        console.log(objectUrl, "url");
        const ttsNarration = `<div ><audio style="${
          window.innerWidth < 600
            ? "width: 200px; max-width: 200px !important;"
            : " min-width: 50vw !important;"
        }" controls autoplay>
        <source src=${objectUrl} type="audio/mpeg" />
        Your browser does not support the audio element.
        </audio></div>`;
        const imageId = `mediaImage${initialIndex}`;
        const imageMapName = `image-map${initialIndex}`;
        const imageTooltipId = `tooltip-${initialIndex}`;

        appendMessage(`▪ ${ttsNarration}<br><br>
                        ▪ <img src=${imageUrl} ${
          window.innerWidth < 768 ? "width='200'" : "width='400'"
        } usemap="#${imageMapName}" id=${imageId} style="border-radius: 8px; margin-top: 4px;" /> <br><br>
                        ▪ Question : <br> ${initialQuestionText}<br><br>`);
        setHoverPoints(coords, imageId, imageMapName, imageTooltipId);
        console.log("IMAGE MAPPED WITH COORDS");

        // questionText2 = questionText2 + imageDiv
      } else {
        if (testType != "mcq" && testType != "dynamic_mcq") {
          let strList = initialQuestionText.replaceAll("*", "");
          strList = strList.split(":", 2);
          if (strList.length > 1) {
            initialQuestionText = strList[1];
            initialQuestionText =
              `<b>${strList[0]}:</b><br>` + `<p>${initialQuestionText}</p>`;
          }
        }
        appendMessage(initialQuestionText);
      }
    }
  } else {
    resetAllVariables();
    const gshadowRoot = document.getElementById("chat-element").shadowRoot;
    const msg = gshadowRoot.getElementById("proceed-option");
    // button.parentNode.removeChild(button)
    const que_msg = document.createElement("div");
    que_msg.innerHTML = "Please Wait..."; // You can customize the message here
    // Replace the button with the "Thank you" message
    msg.parentNode.replaceChild(que_msg, msg);
    if (Object.keys(snnipetConfig).length > 0){
      appendMessage("<b>Your session is terminated. You can either enter a simulation code or refresh the page for generating the a new simulation.</b>");
      
    } else{
      appendMessage("<b>Your session is terminated. You can restart again!</b>");
    }

     //enable Copy Paste
     const textInputElement = gshadowRoot.getElementById("text-input")
     textInputElement.removeAttribute("onpaste")
  }
};

const handleAttemptScenaios = async (title, test_code) =>{
  console.log('Attempting Scenaios', test_code, title)
  testCode = test_code;
  userAcessAvailability = true;
  optedNo = true;
  AttemptTestDirect = true;

  gShadowRoot = document.getElementById("chat-element").shadowRoot;
  const createScenraiobtn = gShadowRoot.querySelectorAll("#create-scenario-section button")
  if (createScenraiobtn){
    createScenraiobtn.forEach((btn) => {
      btn.disabled = true;
      btn.style.cursor = "not-allowed";
      btn.removeAttribute("onclick");
      btn.removeAttribute('onmouseover');
      btn.removeAttribute('onmouseout');
    })
  }
  // gShadowRoot.getElementById("text-input").focus();
  // setTimeout(() => {
  //   gShadowRoot.getElementById("text-input").textContent = title;
  //   setTimeout(() => {
  //     gShadowRoot.querySelector(".input-button").click();
  //   }, 100);
  // }, 100);

  gShadowRoot.getElementById("text-input").focus();
  setTimeout(() => {
    gShadowRoot.getElementById("text-input").textContent = title;
    gShadowRoot.querySelector(".input-button").click();

    
    setTimeout(() => {

      var chatElement = document.getElementById("chat-element");
    const shdwroot = chatElement.shadowRoot;
    const messageContainers = shdwroot.querySelectorAll(".outer-message-container")
    messageContainers.forEach((container) => {
      const messageText = container.querySelector(".user-message-text p");
      if (
        messageText &&
        messageText.textContent.trim() === title.trim()
      ) {
        container.remove();
      }
    });
    }, 100);
  }, 100);
}

async function handleScenarioRegenerationCT(signals) {
  const gShadowRoot2 = document.getElementById("chat-element").shadowRoot;
  console.log(signals)


  const regenerateButton = gShadowRoot2.getElementById(
    "scenario-regenerate-button"
  );
  if (regenerateButton) {
    regenerateButton.disabled = true;
    regenerateButton.style.cursor = "wait";
    regenerateButton.removeAttribute("onclick");

    regenerateButton.innerText = "Regenerating..."
  }

  const errRegenerateButton = gShadowRoot2.getElementById(
    "scenario-err-regenerate-button"
  );

  if(errRegenerateButton) {
    errRegenerateButton.disabled = true;
    errRegenerateButton.style.cursor = "wait";
    errRegenerateButton.removeAttribute("onclick");

    errRegenerateButton.innerText = "Regenerating..."
  }
 if(false){
  gShadowRoot2.getElementById("text-input").focus();
  setTimeout(() => {
    gShadowRoot2.getElementById("text-input").textContent = "No";
    gShadowRoot2.querySelectorAll(".input-button")[1].click();

    setTimeout(() => {
      var chatElement = document.getElementById("chat-element2");
      const shdwroot = chatElement.shadowRoot;
      let cont = [];
      const messageContainers = shdwroot.querySelectorAll(
        ".outer-message-container"
      );
      messageContainers.forEach((container, i) => {
        const messageText = container.querySelector(".user-message-text p");
        if (messageText && messageText.textContent.trim() === "No") {
          cont.push(container);
        }
      });
      cont.forEach((element, i) => {
        if (i === cont.length - 1) {
          element.remove();
        }
      });
    }, 100);
  }, 100);
 }


  var currentURL = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ":" + window.location.port : "") + window.location.pathname + window.location.search + window.location.hash;
  // var currentURL = "https://coachbots-rajan.blogspot.com/2024/05/project-management.html"

  const url = new URL(
    `${baseURL}/tests/get_or_create_test_scenarios_by_site/`
  );
  const params = new URLSearchParams();
  params.set("mode", "A");
  params.set(
    "url",
    currentURL
  );
  params.set("access_token", `Basic ${createBasicAuthToken2(key2, secret2)}`);
  console.log('is_micro', snnipetConfigSTT.isMicro)
  if (snnipetConfigSTT.isMicro !== undefined){
    params.set("is_micro", `${snnipetConfigSTT.isMicro === 'true'? true : false}`);
  }

  params.set("regeneration", true);

  url.search = params;

  await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Basic ${createBasicAuthToken2(key2, secret2)}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Dynamically created Test result stt", data);

      if(regenerateButton){
        regenerateButton.style.cursor = "not-allowed";
      }
      // allMessages.forEach((indvMessage) => {
      //   if (
      //     indvMessage.innerText === "Please wait, we are generating your scenarios...") {
      //     indvMessage.remove();
      //   }
      // });
      const challenges = data;
      // const randomIndex = Math.floor(Math.random() * challenges.length);
      // const randomChallenge = challenges[randomIndex];

      let scenarios = [];
      try {
        if (challenges.length > 2) {
          const element1 = challenges[challenges.length - 1];

          if (element1.title) {
            if (element1.test_type !== "dynamic_discussion_thread") {
              scenarios.push(element1);
            }
          }

          const element2 = challenges[challenges.length - 2];

          if (element2.title) {
            if (element2.test_type !== "dynamic_discussion_thread") {
              scenarios.push(element2);
            }
          }
        } else {
          challenges.forEach((element) => {
            if (element.title) {
              if (element.test_type !== "dynamic_discussion_thread") {
                scenarios.push(element);
              }
            }
          });
        }
      } catch (e) {
        console.error(`go error ${e}`);
      }

      console.log('sucessfully crated scenarios: ', scenarios)
      if (scenarios.length == 0){
        console.log('failed to generate')
        
        const ErrorDiv =  `
        <div id='error-section' style="display: flex; flex-direction: column; align-items: start; justify-content: start; border: 1px solid darkgray; border-radius: 6px; padding: 6px; margin: 0;">
        <p style="font-size: 14px; color: #333; margin: 0; font-weight : 600; margin-top: 10px;">Scenario generation failed because of failure of page extraction</p>
        <div style="width: 100%; display:flex; flex-direction: row; justify-content: end;">

        <button 
        onmouseover="this.style.cursor ='pointer',this.style.backgroundColor = '#dbeafe'" 
        style="
          background-color: #bfdbfe; 
          border-radius : 6px; 
          font-size: 14px; 
          font-weight : 600; 
          border: 1px solid #1d4ed8; 
          color : #1d4ed8; 
          width : 100%; 
          padding: 4px; 
          margin : 8px 0 0 0;
        "
        onmouseout="this.style.backgroundColor = '#bfdbfe'"
        id="scenario-err-regenerate-button"
        >
          Regenerate
        </button>
        </div>
        </div>
        `

        setTimeout(() => {
          setTimeout(() => {
            const regenerateButton = shadowRoot.getElementById(
              "scenario-err-regenerate-button"
            );
            regenerateButton.onclick = () => {
              handleScenarioRegenerationCT(signals);
            };
          }, 50);
        }, 100);
       
        if (false){
          signals.onResponse({
            html: ErrorDiv
          })
        } else{
          appendMessage(ErrorDiv)
        }
        return;
      }

      const prevScenarioComponent = gShadowRoot2.getElementById(
        "create-scenario-section"
      );

      if(prevScenarioComponent){
        prevScenarioComponent.parentNode.remove()
      }

      const prevErrorSection = gShadowRoot2.getElementById(
        "error-section"
      );

      if(prevErrorSection){
        prevErrorSection.parentNode.remove()
      }

      const shadowRoot = document.getElementById("chat-element2").shadowRoot
      let divCont = '';
      scenarios.forEach((element, i) => {
        divCont += `
        <div style="display: flex; flex-direction: column; align-items: start; justify-content: start; border: 1px solid darkgray; border-radius: 6px; padding: 6px; margin: 0; ${i === 1 && "margin-top : 10px"}">
        <div style="background-color: #34d399; border-radius: 4px; color: white; font-weight: 600; padding: 3px 6px; font-size: 12px; border-bottom: 4px;">${element.test_type === 'test' ? "Simulation" : "Roleplay" }</div>
        <p style="font-size: 14px; color: #333; margin: 0; font-weight : 600; margin-top: 10px;">${element.title}</p>
        <p style="font-size: 12px; color: #333; margin: 0; font-weight : 300; margin-top: 10px;">${element.description}</p>
        <div style="width: 100%; display:flex; flex-direction: row; justify-content: end;">
          <button 
            onmouseover="this.style.cursor ='pointer',this.style.backgroundColor = '#22c55e'" 
            style="
              margin-top: 8px;
              padding: 6px 10px;
              border: none;
              border-radius: 4px;
              background-color: #16a34a;
              color: white;
              font-size: 12px;
              font-weight: 600;
              transition: background-color 0.3s ease;
            " 
            id="attempt-btn-regen-${i}"
            onmouseout="this.style.backgroundColor = '#16a34a'">
            Attempt
          </button>
        </div>
        </div>
        `

        setTimeout(() => {
          const btn = gShadowRoot.getElementById(`attempt-btn-regen-${i}`)
          btn.onclick = () => {
            handleAttemptScenaios(element.title, element.test_code)
          }
        }, 100);

      }); 


      if (false) {
        signals.onResponse({
          html: `<div id='create-scenario-section' style="max-width: 500px;display: flex; flex-direction: column; gap: 4px;">
            ${divCont}
            </div>`,
        });
      } else {
        appendMessage(`
            <div id='create-scenario-section' style="max-width: 500px;display: flex; flex-direction: column; gap: 4px; padding: 8px;">
            ${divCont}
            </div>
            `);
      }
    })
    .catch((err) => console.log(err));
}

//* Function to handle button click for no-code flow : start
async function handleOptionButtonClick(labelText, signals, is_regenerate=false) {
  console.log("button clicked", labelText, is_regenerate);
  const gShadowRoot = document.getElementById("chat-element").shadowRoot;

  if(is_regenerate){
    gShadowRoot.getElementById("text-input").focus();
  setTimeout(() => {
    gShadowRoot.getElementById("text-input").textContent = "No";
    gShadowRoot.querySelector(".input-button").click();

    
    setTimeout(() => {

      var chatElement = document.getElementById("chat-element");
      const shdwroot = chatElement.shadowRoot;
      let cont = []
      const messageContainers = shdwroot.querySelectorAll(".outer-message-container")
      messageContainers.forEach((container,i) => {
        console.log(i,messageContainers.length - 1)
        const messageText = container.querySelector(".user-message-text p");
        if (
          messageText &&
          messageText.textContent.trim() === "No"
           
        ) {
          cont.push(container)
        }

      });
      cont.forEach((element,i) => {
        if ( i === (cont.length-1)){
          element.remove();
        }
      });

      }, 100);
    }, 100);
    
    return;
  }
      
  const button = gShadowRoot.getElementById("create-new-scenario");
  if (button) {
    button.disabled = true;
  }

  if (gShadowRoot.querySelector("#create-scenario-section")){
    console.log(`already existed`,gShadowRoot.querySelector("#create-scenario-section") )
    return
  }
  optedNo = true;
  var currentURL = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ":" + window.location.port : "") + window.location.pathname + window.location.search + window.location.hash;
  // var currentURL = "https://coachbots-rajan.blogspot.com/2024/05/project-management.html"
  console.log('currenturl',currentURL);

  // const generationLoader = `<div id="scenario-generation-loader" styte="font-size: 12px; color: lightgray; padding: 10px 0;">Please wait, we are generating your scenarios...</div>`
  // appendMessage(generationLoader)

  const allMessages = gShadowRoot.getElementById("messages").childNodes;

  const url = new URL(`${baseURL}/tests/get_or_create_test_scenarios_by_site/`);
  const params = new URLSearchParams();
  params.set("mode", "A");
  params.set(
    "url",
    currentURL
  );
  params.set("access_token", `Basic ${createBasicAuthToken(key, secret)}`);
  console.log('is_micro', snnipetConfig.isMicro)
  if (snnipetConfig.isMicro !== undefined){
    params.set("is_micro", `${snnipetConfig.isMicro === 'true'? true : false}`);
  }
  if (snnipetConfig.flavour !== undefined){
    params.set("flavour", snnipetConfig.flavour);
  }
  url.search = params;

  const shadowRoot = document.getElementById("chat-element").shadowRoot

  await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Basic ${createBasicAuthToken(key, secret)}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Dynamically created Test result", data);
      allMessages.forEach((indvMessage) => {
        if (
          indvMessage.innerText === "Please wait, we are generating your scenarios...") {
          indvMessage.remove();
        }
      });
      const challenges = data;
      // const randomIndex = Math.floor(Math.random() * challenges.length);
      // const randomChallenge = challenges[randomIndex];

      let scenarios = [];
      try {
        if (challenges.length > 2) {
          const element1 = challenges[challenges.length - 1];

          if (element1.title) {
            if (element1.test_type !== "dynamic_discussion_thread") {
              scenarios.push(element1);
            }
          }

          const element2 = challenges[challenges.length - 2];

          if (element2.title) {
            if (element2.test_type !== "dynamic_discussion_thread") {
              scenarios.push(element2);
            }
          }
        } else {
          challenges.forEach((element) => {
            if (element.title) {
              if (element.test_type !== "dynamic_discussion_thread") {
                scenarios.push(element);
              }
            }
          });
        }
      } catch (e) {
        console.error(`go error ${e}`);
      }

      if (scenarios.length == 0){
        console.log('failed to generate')
        
        const ErrorDiv =  `
        <div id='error-section' style="display: flex; flex-direction: column; align-items: start; justify-content: start; border: 1px solid darkgray; border-radius: 6px; padding: 6px; margin: 0;">
        <p style="font-size: 14px; color: #333; margin: 0; font-weight : 600; margin-top: 10px;">Scenario generation failed because of failure of page extraction</p>
        <div style="width: 100%; display:flex; flex-direction: row; justify-content: end;">
        <button 
        onmouseover="this.style.cursor ='pointer',this.style.backgroundColor = '#dbeafe'" 
        style="
          background-color: #bfdbfe; 
          border-radius : 6px; 
          font-size: 14px; 
          font-weight : 600; 
          border: 1px solid #1d4ed8; 
          color : #1d4ed8; 
          width : 100%; 
          padding: 4px; 
          margin : 8px 0 0 0;
        "
        onmouseout="this.style.backgroundColor = '#bfdbfe'"
        id="scenario-err-regenerate-button"
        >
          Regenerate
        </button>
        </div>
        </div>
        `

        setTimeout(() => {
          const regenerateButton = shadowRoot.getElementById(
            "scenario-err-regenerate-button"
          );
          regenerateButton.onclick = () => {
            handleScenarioRegenerationCT(signals);
          };
        }, 100);
        if (signals){
          signals.onResponse({
            html: ErrorDiv
          })
        } else{
          appendMessage(ErrorDiv)
        }
        return;
      }

      console.log('sucessfully crated scenarios: ', scenarios)
      // console.log(randomChallenge);
      // testCode = randomChallenge.test_code;
      // codeAvailabilityUserChoice = true;

      
      let divCont = '';
      scenarios.forEach((element,i) => {
        console.log('element', element);
        divCont += `
        <div style="display: flex; flex-direction: column; align-items: start; justify-content: start; border: 1px solid darkgray; border-radius: 6px; padding: 6px; margin: 0; ${i === 1 && "margin-top : 10px"}">
        <div style="background-color: #34d399; border-radius: 4px; color: white; font-weight: 600; padding: 3px 6px; font-size: 12px; border-bottom: 4px;">${element.test_type === 'test'? "Simulation" : "Roleplay" }</div>
        <p style="font-size: 14px; color: #333; margin: 0; font-weight : 600; margin-top: 10px;">${element.title}</p>
        <p style="font-size: 12px; color: #333; margin: 0; font-weight : 300; margin-top: 10px;">${element.description}</p>
        <div style="width: 100%; display:flex; flex-direction: row; justify-content: end;">
          <button 
            onmouseover="this.style.cursor ='pointer',this.style.backgroundColor = '#22c55e'" 
            style="
              margin-top: 8px;
              padding: 6px 10px;
              border: none;
              border-radius: 4px;
              background-color: #16a34a;
              color: white;
              font-size: 12px;
              font-weight: 600;
              transition: background-color 0.3s ease;
            " 
            id="attempt-btn-${i}"
            onmouseout="this.style.backgroundColor = '#16a34a'">
            Attempt
          </button>
        </div>
        </div>
        `
        setTimeout(() => {
          const btn = gShadowRoot.getElementById(`attempt-btn-${i}`)
          btn.onclick = () => {
            handleAttemptScenaios(element.title, element.test_code)
          }
        }, 100);
      }); 


      if (signals){
        signals.onResponse(
          {
            html: `
            <div id='create-scenario-section' style="padding: 15px 8px; max-width: 500px;">
            ${divCont}
            <div style="width: 100%; display:flex; flex-direction: row; justify-content: end;">
            <button 
            onmouseover="this.style.cursor ='pointer',this.style.backgroundColor = '#dbeafe'" 
            style="
              background-color: #bfdbfe; 
              border-radius : 6px; 
              font-size: 14px; 
              font-weight : 600; 
              border: 1px solid #1d4ed8; 
              color : #1d4ed8; 
              width : fit-content; 
              padding: 4px; 
              margin : 8px 0 0 0;
            "
            onmouseout="this.style.backgroundColor = '#bfdbfe'"
            id="scenario-regenerate-button"
            >
              Regenerate
            </button>
            </div>
            </div>
            `
          }
        )
        setTimeout(() => {
          const regenerateButton = shadowRoot.getElementById("scenario-regenerate-button")
          regenerateButton.onclick = () => {
            handleScenarioRegenerationCT(signals)
          }
      }, 50);
      } else{
      appendMessage(`
      <div id='create-scenario-section' style="max-width: 500px;display: flex; flex-direction: column; gap: 4px;">
      ${divCont}
      </div>
      `);
      }
    })
    .catch((err) => console.log(err));
}

//* Function to handle button click for no-code flow : end

async function loadExternalModule() {
  try {
    const { DeepChat } = await import(
      // "https://unpkg.com/deep-chat@1.4.0/dist/deepChat.bundle.js"
      "https://storage.googleapis.com/coachbots-simulator/deepchat-bundle.js"
    );
  } catch (error) {
    console.error("Error loading external module:", error);
  }
}

// Call the function to load and use the external module
loadExternalModule().then(() => {
  deepChatPocElement = document.getElementsByClassName("coachbots-coachtalk")?.[0];
  deepChatPocElement.innerHTML = `
  <div class="chat-wrapper">
      <div
      onclick="closeFromTop()"
      id="backdrop2"
      style="
      display: none;
      position: fixed;
      top: 0; right: 0; bottom: 0; left: 0;
      background: black;
      opacity: 0.8;
      z-index: 998;
      "
    ></div>
    <button
      type="button"
      onclick="openChatContainer()"
      class="chat-icon-container"
      id="chat-icon"
      style="
        height: 4.5rem;
        width: 4.5rem;
        background-color: white;
        box-shadow: 0px 0px 10px rgb(125, 125, 125);
        border-radius: 40%;
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        left: 2rem;
        bottom: 2rem;
        cursor: pointer;
        border-top-width: 0px;
        border-right-width: 0px;
        border-bottom-width: 0px;
        border-left-width: 0px;
        z-index: 999;
      "
    >
      <img
        class="chat-icon"
        style="height: 100%; width: 100%; border-radius:40%;"
        src="https://cdn.statically.io/gh/falahh6/coachbots/main/coachbot-logo-bot.png"
        alt="chat-bot-image"
      />
    </button>
  </div>
  
  <div
    class="chat-container"
    id="chat-container"
    style="
      position: fixed;
      scale: 0;
      bottom: 15vh;
      width: 80vw;
      left: 6rem;
      transition: 0.4s ease-in-out;
      transform-origin: left bottom;
      padding-bottom: 0.8rem;
      border-radius: 1rem 1rem 1rem 0rem;
      box-shadow: 0px 0px 10px rgb(196, 196, 196);
      background-color: white;
      z-index: 999 !important;
      hiegth: 75vh;
    "
  >
  <div 
  style="
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: fit-content;
  background-color: #f3f4f6;
  border-radius: 1rem 1rem 0 0;
">
    <div 
    style="
      display: flex;
      justify-content: center;
      align-items: center;
      height: fit-content;
      background-color: #f3f4f6;
      border-radius: 1rem 1rem 0 0;
    ">
   
    <h1 style="
    margin : 8px;
    color : #2DC092;
    border : 2px solid #2DC092;
    padding : 3px;
    font-size : 16px;
    line-height : 20px;
    font-weight : 800;
  ">
    <span style="
      background-color : #2DC092;
      color : white;
      font-size : 14px;
      font-weight : 700;
      margin-right : 4px;
      padding : 4px;
    ">
      COACH
    </span>
    BOTS
  </h1>
  </div>
  <div style="margin: 0; padding: 0; margin-bottom: 0.4rem; font-size: 14px;">
  <p id="header-text2" style="font-size: ${
    window.innerWidth < 768 ? "10px" : "12px"
  };">Accessibility features may not work inside the bot.</p>
</div>
    <div 
      id="close-top" 
      onmouseover="this.style.cursor ='pointer'"
      onclick="closeFromTop()"
      style="
        width : 50px;
        position: absolute;
        right : 1rem;
      "
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" stroke="10" height="24" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
      </svg>
    </div>
   
    </div>
    <deep-chat 
      id="chat-element"
      style="position: relative; top : 0; bottom: 0; left: 0 ; right: 0; width: 10%; height: 68vh; border: none;"
      microphone='{
        "files": {"format": "mp3", "maxNumberOfFiles": 1},
        "button": {"position": "outside-right"}
      }'
      messageStyles='{
        "default": {
          "shared": {"bubble": {"maxWidth": "80%", "marginTop": "4px", "borderRadius" : "4px", "padding" : "10px 8px", "fontWeight" : "normal"}},
          "ai" : {"bubble": {"backgroundColor": "#f3f4f6"}},
          "user" : {"bubble": {"backgroundColor": "#2DC092"}}
        },
        "loading": {
          "bubble": {"fontSize": "20px", "color": "white", "width" : "2rem", "padding": "10px" ,"paddingLeft": "2rem", "backgroundColor" : "#7fdbbe"}
        }
      }'
      textInput='{
        "styles": {
          "text": {"color": "black", "fontSize" : "14px"},
          "container": {"padding":"4px", "backgroundColor": "white", "border" : "1px solid #d1d5db", "zIndex" : "1"},
          "focus": {"border": "1px solid #9ca3af"}
        },
        "placeholder": {"text": "Welcome, Please follow provided instructions."}
      }'
      submitButtonStyles='{
        "submit": {
          "container": {
            "default": {"padding" : "4px" },
            "hover": {"backgroundColor": "#c6e1ff",  "padding" : "4px" },
            "click": {"backgroundColor": "#acd3ff",  "padding" : "4px" }
          },
          "svg": {
            "styles": {
              "default": {
                "height" : "24px", "width" : "24px", "paddingBottom" : "16px"
              }
            }
          }
        },
        "alwaysEnabled": true,
        "position": "inside-right"
      }'
      demo="true"
      style="border: none"
      displayLoadingBubble="true"
      errorMessages='{
        "overrides": {
          "default": "System Error. But please continue and/or retry."
        }
      }'
      attachmentContainerStyle='{"backgroundColor": "transparent", "width" : "fit-content", "position": "absolute", "right": "10%"}'
    >
    </deep-chat>
    <p id="bot-footer" style="font-size: ${
      window.innerWidth < 768 ? "10px" : "12px"
    }; width: 100%; text-align: center; padding: 0 10%; height:25px;"> <span id="footer-text2">Usage direction for Coachbots. Follow the instructions for optimum performance.</span>  <span id="read-more-button2" onmouseover="this.style.cursor ='pointer'">
        <button style="border: 1px solid darkgrey; padding: 1px 4px; border-radius: 4px; font-weight: 600; color: #3b82f6"> 
          Read here
        </button>
      </span> 
      <div id="instructions-pane2" style="position : absolute; left : 0px; bottom: 0px; right : 0px; width: 95%; border-radius: 10px; background-color: #eff6ff; margin: 20px; margin-left:  ${window.innerWidth < 768 ? "5px" : "25px" }; margin-bottom: 15px; z-index: 999; padding: 10px; display: none; justify-content: space-between; align-items: start;  border: 1px solid lightgray;">
        <div style="font-size: 12px;">
          <ul id="instructions-list2">
           <li>1 . For Coaching interactions : To maintain a record of sessions with coaches/mentors, simply click on "End & Email Summary ". Your coach/mentor will receive notification, and a transcript will be shared afterward. For Icons by AI, no emails are going sent.  </li>
           <li>2 . For Simulations; Depending upon the subject and context these may take several forms. The short version contains 3 questions and the standard version contains 6 questions. Each simulation will have a detailed feedback report that will contain speech analytics if audio is sent via the system.</li>
           <li>3 . For Deep dive surveys : Consider responding to at least five questions for completeness. Always review requestor instructions in the email or on the page for details.</li>
           <li>4 . For Feedback Bots: Consider responding to at least five questions for completeness and hit the submit button for the record. Only positive feedback is displayed publically, critical feedback is delivered over email privately. </li>
           <li>5 . In responses, it's important to avoid unrelated questions, answers, or comments, as well as overly rapid responses, as these may trigger system errors. Please be sure to adhere to the topic context (or the coach context) for best results. The aim is to simulate real-world interactions.</li>
           <li>6 . Optimal responses should range between 10 to 400 words. You have the option to either type or speak your responses.</li>
           <li>7 . System availability issues may occasionally cause delays in responses and reports. </li>
           <li>8 . For best results consider the system has no prior memory and restate your context whenever possible.</li>
          </ul>
        </div>
        <span id="close-intructions-pane2" onmouseover="this.style.cursor ='pointer'" style="padding : 2px; border-radius: 50%; background-color: white;">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
          </svg>
        </span>
      </div> 
    </p> 
  </div>
  `;

  const readMoreButton = document.getElementById('read-more-button2')
  const instructionsPane = document.getElementById('instructions-pane2')
  const closeInstructionsPane = document.getElementById('close-intructions-pane2')

  readMoreButton.addEventListener("click", () => {
    instructionsPane.style.display = "flex"
  })

  closeInstructionsPane.addEventListener("click", () => {
    instructionsPane.style.display = "none"
  })


  const chatContainer = document.getElementById("chat-container");
  const chatElementRef = document.getElementById("chat-element");
  const chatIcon = document.getElementById("chat-icon");
  const chatbotHeading = document.getElementById("chatbot-heading");
  const closeFromTopp = document.getElementById("close-top");
  widgetClientId = document.querySelector(".coachbots-coachtalk").dataset.clientId;
  snnipetConfig = document.querySelector(".coachbots-coachtalk").dataset;
  console.log("widgetInfo: ",document.querySelector(".coachbots-coachtalk").dataset )


  if(!window.location.href.includes("coachbots.com") && !window.location.href.includes("localhost")){
    const list = 
    `<li>1 . The simulations generated by our skills engine and AI pipeline are designed for real-world comprehension and practice based on the learning content presented on the page. The simulation may not be generated if the page's content is restricted or unreadable. </li>
     <li>2 . You should avoid responding with unrelated questions, answers, or comments, and extremely rapid responses, as they may cause system errors. The usage aims to mimic real-world interactions.</li>
     <li>3 . Keep responses between 10 to 400 words for optimal results. You can either type or speak your responses. For audio responses, a speech analysis in reports will be provided.</li>
     <li>4 . In rare cases, delays in responses and reports may occur due to system availability issues.</li>
     <li>5 . The feedback reports may not instantaneously capture all the data. Simply try refreshing the page if anything appears missing. Thanks!</li>
    `
    instructionsPane.innerHTML = list
  }


  console.log("widget cliennt Id :",widgetClientId)
  //responsive styles for phones
  // if (window.innerWidth < 600) {
  //   chatContainer.style.width = "80vw";
  //   chatContainer.style.left = "10vw";
  //   chatContainer.style.height = "70vh";
  //   chatContainer.style.bottom = "12vh";
  //   chatElementRef.style.height = "60vh";
  //   chatElementRef.style.width = "80vw";
  //   chatContainer.style.position = "fixed";
  //   chatIcon.style.width = "3rem";
  //   chatIcon.style.height = "3rem";
  //   chatIcon.style.position = "fixed";
  //   closeFromTopp.style.width = "30px";
  //   closeFromTopp.style.left = "0.3rem";
  //   closeFromTopp.style.top = "0.2rem";
  // }

  if (window.innerWidth < 600) {
    chatContainer.style.borderRadius = "0";
    chatContainer.style.width = "100vw";
    chatContainer.style.left = "0";
    chatContainer.style.height = "100vh";
    chatContainer.style.bottom = "0";
    chatElementRef.style.height = "85vh";
    chatElementRef.style.width = "100vw";
    chatContainer.style.position = "fixed";
    chatIcon.style.width = "3rem";
    chatIcon.style.height = "3rem";
    chatIcon.style.position = "fixed";
    closeFromTopp.style.width = "30px";
    closeFromTopp.style.right = "0.3rem";
    closeFromTopp.style.top = "1rem";
  }


  let credentialsForm;
  if (window.innerWidth > 868) {
    credentialsForm = `
    <div style="min-width: 730px;">
    <b>For obtaining your report, please submit the following details.</b>
    <div
      id="input-form"
      style="
      display: flex;
      flex-direction: row;
      min-width: 100%;
      gap: 1rem;
      align-items: center;
    "
    >
      <div style="display: flex; flex-direction: column; width: 45%;">
        <label for="name" style="margin: 12px 0 4px 0">Name</label>
        <input
          type="text"
          id="input-name"
          style="
            padding: 8px;
            margin-bottom: 4px;
            border-radius: 4px;
            border: 1px solid rgb(188, 188, 188);
          "
        />
      </div>
      <div style="display: flex; flex-direction: column; width: 45%;">
        <label for="email" style="margin: 12px 0 4px 0">Email</label>
        <input
          id="input-email"
          type="email"
          style="
            padding: 8px;
            margin-bottom: 4px;
            border-radius: 4px;
            border: 1px solid rgb(188, 188, 188);
          "
        />
      </div>
      <button
        style="
          height: fit-content;
          width: fit-content;
          padding: 8px;
          margin-bottom: -1.3rem;
          border: 1px solid rgb(188, 188, 188);
          border-radius: 20px;
          color: white;
          background-color: #1984ff;
        "
        id="submit-btn"
        onclick="submitEmailAndName()"
      >
        Submit
      </button>
    </div>
  </div>
    `;
  } else {
    credentialsForm = `
      <div>
      <b>For obtaining your report, please submit the following details.</b>
      <div
        id="input-form"
        style="
        display: flex;
        flex-direction: column;
        width: 100%;
        gap: 1rem;
        align-items: flex-start;
      "
      >
        <div style="display: flex; flex-direction: column; width: 100%">
          <label for="name" style="margin: 12px 0 4px 0">Name</label>
          <input
            type="text"
            id="input-name"
            style="
              padding: 8px;
              margin-bottom: 4px;
              border-radius: 4px;
              border: 1px solid rgb(188, 188, 188);
            "
          />
        </div>
        <div style="display: flex; flex-direction: column; width: 100%">
          <label for="email" style="margin: 12px 0 4px 0">Email</label>
          <input
            id="input-email"
            type="email"
            style="
              padding: 8px;
              margin-bottom: 4px;
              border-radius: 4px;
              border: 1px solid rgb(188, 188, 188);
            "
          />
        </div>
        <button
          style="
            height: fit-content;
            width: fit-content;
            padding: 8px;
            border: 1px solid rgb(188, 188, 188);
            border-radius: 20px;
            color: white;
            background-color: #1984ff;
          "
          id="submit-btn"
          onclick="submitEmailAndName()"
        >
          Submit
        </button>
      </div>
    </div>
      `;
  }

  if (Object.keys(snnipetConfig).length > 0){
    chatElementRef.initialMessages = [
      {
        html: `<p>Welcome to AI powdered simulation learning. This bot analyses the content on the page and creates a simulation and roleplay which can be attempted by the users to get insightful feedback report. Please enter your passcode to get started.</p>`,
        role: "ai",
      },
    ];
    askAccessBotCode = true;
  } else{

    chatElementRef.initialMessages = [
      {
        html: `<p>Welcome to Coachbots. Do you have access code for your simulation? (Hint : Try samples on the page!)
        </p>`,
        role: "ai",
      },
      {
        html: `<div class="deep-chat-temporary-message"><button class="deep-chat-button deep-chat-suggestion-button" style="border: 1px solid green">Yes</button>
          <button class="deep-chat-button deep-chat-suggestion-button" style="border: 1px solid #d80000">No</button> </div>`,
        role: "user",
      },
    ];
    chatElementRef.htmlClassUtilities = {
      ["deep-chat-temporary-message"]: {
        styles: {
          default: {},
        },
      },
      ["button"]: {
        styles: {
          default: {
            backgroundColor: "transparent",
          },
          hover: {
            backgroundColor: "white",
          },
        },
      },
    };
  }

  

  // set email and name
  //   const setNameEmail = async (inputEmail, inputName) => {
  //     const queryParams = new URLSearchParams({
  //       participant_id: participantId,
  //       email: inputEmail,
  //       name: inputName,
  //     });
  //     await fetch(
  //       `${baseURL}/test-attempt-sessions/set-name-and-email/?${queryParams}`,
  //       {
  //         method: "POST",
  //         headers: {
  //           Authorization: `Basic ${createBasicAuthToken(key, secret)}`,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     )
  //       .then((response) => response.json())
  //       .then((data) => {
  //         credsUpdated = data.status;
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   };

  //   // send email
  //   const sendEmail = async () => {
  //     const queryParams2 = new URLSearchParams({
  //       test_attempt_session_id: sessionId,
  //       report_url: reportUrl,
  //       is_whatsapp: false,
  //     });

  //     await fetch(
  //       `${baseURL}/test-attempt-sessions/send-report-email/?${queryParams2}`,
  //       {
  //         method: "POST",
  //         headers: {
  //           Authorization: `Basic ${createBasicAuthToken(key, secret)}`,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     )
  //       .then((response) => response.json())
  //       .then((data) => {
  //         emailSent = data.status;
  //       })
  //       .catch((err) => console.log(err));
  //   };

  function excludeSpecialCharacters2(inputString) {
    const regex = /[^a-zA-Z0-9!.,:'? ]/g;
    const cleanedString = inputString.replace(regex, "");
    return cleanedString;
  }

  function removeResponderTypeName(responderDisplayName, responseText) {
    const responderType = responderDisplayName.toLowerCase();
    const regex = new RegExp(responderType, "i");
    let updatedText = responseText.replace(regex, "").trim();
    return updatedText;
  }

  // to check word limit
  function isValidMessage(text, limit=10,is_greater=false) {
    const words = text.split(" ");
    let uppercaseArray = words.map((element) => element.toUpperCase());
    if (
      uppercaseArray.includes("SKIP") &&
      (isTranscriptOnly || testType === "coaching")
    ) {
      return true;
    }
    if(is_greater){
      if (words.length > limit) {
        return false;
      } else {
        return true;
      }
    }
    else{
      if (words.length < limit) {
        return false;
      } else {
        return true;
      }
    }
  }

  // to cancel all active test for a user
  const cancelTest = async (user_id) => {
    const url = `${baseURL}/test-attempt-sessions/cancel-test-sessions/?user_id=${user_id}`;

    try {
      if (user_id) {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Basic ${createBasicAuthToken(key, secret)}`,
          },
        });

        const responseJson = await response.json();
        console.log(responseJson);
      }
    } catch (error) {
      console.error(`Error in cancelTest: ${error}`);
    }
  };

  // get session status
  const getSessionStatus = async (session_id) => {
    const url = `${baseURL}/test-attempt-sessions/get-session-status/?session_id=${session_id}`;

    try {
      if (session_id) {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Basic ${createBasicAuthToken(key, secret)}`,
          },
        });

        const responseJson = await response.json();
        console.log(responseJson);

        sessionStatus = responseJson["status"];
        isSessionExpired = responseJson["is_expired"];
        console.log(sessionStatus);
      } else {
        sessionStatus = "inactive";
        isSessionExpired = false;
      }
    } catch (error) {
      console.error(`Error in getSessionStatus: ${error}`);
    }
  };

  // apis for restriction to attempt test like test previllage
  const getAttemptedTestList = async (userId) => {
    const url = `${baseURL}/test-attempt-sessions/get-attempted-test-list/?user_id=${userId}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Basic ${createBasicAuthToken(key, secret)}`,
        },
      });

      const responseJson = await response.json();
      console.log(responseJson);

      testCodeList = responseJson["data"]["codes"];
      console.log(testCodeList);
    } catch (error) {
      console.error(`Error in getAttemptedTestList: ${error}`);
    }
  };

  const getIsRepeatStatus = async (participantId) => {
    const url = `${baseURL}/accounts/get_is_repeat_status/?participant_id=${participantId}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Basic ${createBasicAuthToken(key, secret)}`,
        },
      });

      isRepeatStatus = await response.json();
      console.log(isRepeatStatus);
    } catch (error) {
      console.error(`Error in getIsRepeatStatus: ${error}`);
    }
  };

  const getTestPrevilage = async (participantId) => {
    const url = `${baseURL}/tests/get-test-previlage-user/?user_id=${participantId}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Basic ${createBasicAuthToken(key, secret)}`,
        },
      });

      testPrevilage = await response.json();
      console.log(testPrevilage);
    } catch (error) {
      console.error(`Error in getTestPrevilage: ${error}`);
    }
  };

  const getTestCodesByRule = async (rule) => {
    const url = `${baseURL}/accounts/get-test-codes-for-web/`;

    // const url = `${baseURL}/tests/get-test-previlage-user/?user_id=${participantId}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Basic ${createBasicAuthToken(key, secret)}`,
        },
      });

      const resp_json = await response.json();
      console.log(resp_json);
      try {
        if (rule === "my_lib") {
          return resp_json["data"][rule];
        } else {
          return resp_json["data"][rule].split(",");
        }
      } catch (error) {
        return [];
      }
    } catch (error) {
      console.error(`Error in getTestCodesByRule: ${error}`);
    }
  };

  const getClientInformation = async (use_case, user_id) => {
    const url = `${baseURL}/accounts/get-client-information/?for=${use_case}`;
    // use case can ====> my_lib or (user_info, user_id)
    if (user_id && use_case === "user_info") {
      url += `&user_id=${user_id}`;
    }
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Basic ${createBasicAuthToken(key, secret)}`,
        },
      });

      const resp_json = await response.json();
      console.log(resp_json);
      return resp_json["data"][`${use_case}`];
    } catch (error) {
      console.error(`Error in getClientInformation: ${error}`);
    }
  };

  const SesseionCheck = async (session_id) => {
    const url = `${baseURL}/test-attempt-sessions/check-session-data-exist/?session_id=${session_id}`;

    // const url = `${baseURL}/tests/get-test-previlage-user/?user_id=${participantId}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Basic ${createBasicAuthToken(key, secret)}`,
        },
      });

      const resp_json = await response.json();
      console.log(resp_json);
      return resp_json.check;
    } catch (error) {
      console.error(`Error in SesseionCheck: ${error}`);
    }
  };

  const TTSContainer = async (text) => {
    const queDiv = `<p>${text}</p><br>`;
    const url = `${baseURL}/test-responses/get-text-to-speech/?text=${text}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Basic ${createBasicAuthToken(key, secret)}`,
      },
    });

    const blob = await response.blob();
    console.log("respnse", blob);

    const objectUrl = URL.createObjectURL(blob);

    console.log(objectUrl, "url");

    const randomIdForAudioElement = generateRandomAlphanumeric(5);
    const shadowRoot = document.getElementById("chat-element").shadowRoot

    const audioCont =
      queDiv +
      `<div ><audio id="audio-player-${randomIdForAudioElement}" style="${
        window.innerWidth < 600
          ? "width: 200px; max-width: 200px !important;"
          : " min-width: 50vw !important;"
      }" autoplay>
    <source src=${objectUrl} type="audio/mpeg" />
    Your browser does not support the audio element.
    </audio>
    
    <canvas id="canvas-audio-${randomIdForAudioElement}" width="400" height="40"></canvas>
    </div>`;

    setTimeout(() => {
      const audioElement = shadowRoot.getElementById(`audio-player-${randomIdForAudioElement}`)
      const canvasElement = shadowRoot.getElementById(`canvas-audio-${randomIdForAudioElement}`)
      console.log(audioElement, canvasElement)
      audioCanvasUiForQuestionsStt(audioElement, canvasElement)
    }, 100);

    return audioCont;
  };

  const testResponseHandler = async (formdata, questionObj) => {
    try {
      const shadowRoot = document.getElementById("chat-element").shadowRoot;
      const players = shadowRoot.querySelectorAll(".audio-player");
      const targetPlayer = players[players.length - 1];
      targetPlayer.src = audioFileSrc;
      // if audio response in orch
      if (
        testType === "orchestrated_conversation" ||
        interactionMode === "text"
      ) {
        formdata["transcribe_file"] = true;
      }

      // trrow a error randomly
      // if ( 3 > 2 |  questionObj.uid == 'd3240961-93f7-4ec5-bf1f-a479c5d3f7bc') {
      //   throw new Error("Random error");
      // }

      // const uploadDocResponse = await fetch(`${baseURL}/documents/upload/`, {
      //   method: "POST",
      //   headers: {
      //     Authorization: `Basic ${createBasicAuthToken(key, secret)}`,
      //   },
      //   body: formdata,
      // });

      function uploadDoc(formdata) {
        const basicAuthToken = createBasicAuthToken(key, secret);
        try {
          return fetch(`${baseURL}/documents/upload/`, {
            method: "POST",
            headers: {
              Authorization: `Basic ${basicAuthToken}`,
            },
            body: formdata,
          });
        } catch (error) {
          console.log("error in uploading audio(try)", error);
          return fetch(`${baseURL}/documents/upload/`, {
            method: "POST",
            headers: {
              Authorization: `Basic ${basicAuthToken}`,
            },
            body: formdata,
          });
        }
      }

      let uploadDocResponse = await uploadDoc(formdata);

      console.log("Jiks : ", uploadDocResponse);

      let documentUploadFailsCount = 0;

      while (uploadDocResponse.status !== 201) {
        console.log("error in uploading audio");
        documentUploadFailsCount += 1;
        if (documentUploadFailsCount > 1) {
          console.log("document upload failed more than 1 times");
          await cancelTest(participantId); // cancelling session
          resetAllVariables(); //reseting variables
          if (isProceed === "false") {
            const gshadowRoot =
              document.getElementById("chat-element").shadowRoot;
            const msg = gshadowRoot.getElementById("proceed-option");
            // button.parentNode.removeChild(button)
            const que_msg = document.createElement("div");
            que_msg.innerHTML = "Thank You"; // You can customize the message here
            // Replace the button with the "Thank you" message
            msg.parentNode.replaceChild(que_msg, msg);
          }

          if (questionIndex <= questionLength) {
            appendMessage(
              "<p style='font-size: 14px;color: #991b1b;'><b>Unfortunately due to technical reasons, your earlier response could not be processed. The session will be terminated. Please try again using the interaction code.</b>.</p>"
            );
          }
          maxUploadFailed = true;
          break;
        }
        uploadDocResponse = await uploadDoc(formdata);
      }

      if (documentUploadFailsCount > 1) {
        return;
      }

      const uploadDocData = await uploadDocResponse.json();
      documentId = uploadDocData.uid;

      const docUrlResponse = await fetch(
        `${baseURL}/documents/${documentId}/url/`,
        {
          method: "GET",
          headers: {
            Authorization: `Basic ${createBasicAuthToken(key, secret)}`,
          },
        }
      );

      const docUrlData = await docUrlResponse.json();
      userAudioResponse = docUrlData.url;

      if (testType === "coaching") {
        const response = await fetch(
          `${baseURL}/coaching-conversations/${conversation_id}/reply/`,
          {
            method: "POST",
            headers: {
              Authorization: `Basic ${createBasicAuthToken(key, secret)}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              participant_message_text: "",
              participant_message_url: userAudioResponse,
            }),
          }
        );
        const responseData = await response.json();
        console.log("Response from Coaching submit response : ", responseData);

        questionText = responseData["coach_message_text"];
        conversation_id = responseData["uid"];
        console.log("coaching question Text: ", questionText);

        console.log(questionData);
        return;
      } else if (
        testType === "orchestrated_conversation" ||
        interactionMode === "text"
      ) {
        // handling audio response in orch
        const usertext = uploadDocData["transcript_details"]["text"];
        console.log(usertext);

        const testResponse = await fetch(`${baseURL}/test-responses/`, {
          method: "POST",
          headers: {
            Authorization: `Basic ${createBasicAuthToken(key, secret)}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            test_attempt_session_id: sessionId,
            question_id: questionObj.uid,
            response_text: usertext,
            response_file: "",
            user_attributes: {
              tag: "deepchat_profile",
              attributes: {
                username: "web_user",
                email: user ? user.email : getAnonymousEmail(),
              },
            },
          }),
        });
        const testResponseData = await testResponse.json();
        resQuestionNumber = testResponseData.question.question_number;
      } else {
        const testResponse = await fetch(`${baseURL}/test-responses/`, {
          method: "POST",
          headers: {
            Authorization: `Basic ${createBasicAuthToken(key, secret)}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            test_attempt_session_id: sessionId,
            question_id: questionObj.uid,
            response_text: "",
            response_file: userAudioResponse,
            user_attributes: {
              tag: "deepchat_profile",
              attributes: {
                username: "web_user",
                email: user ? user.email : getAnonymousEmail(),
              },
            },
          }),
        });
        const testResponseData = await testResponse.json();
        console.log(testResponseData);
        resQuestionNumber = testResponseData.question.question_number;
        console.log("que-num", resQuestionNumber);
      }

      // for generating question for dynamic and group meeting test type
      if (questionIndex < questionLength) {
        if (
          testType === "dynamic_discussion_thread" ||
          testType === "orchestrated_conversation"
        ) {
          questionIndex += 1;
          responseProcessedQuestion++;
          console.log(questionIndex);
          const response_text = await fetch(`${baseURL}/test-responses/`, {
            method: "POST",
            headers: {
              Authorization: `Basic ${createBasicAuthToken(key, secret)}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              test_attempt_session_id: sessionId,
              question_id:
                questionData.results[0].questions[questionIndex - 2].uid,
              response_text: "",
              response_file: "",
              user_attributes: {
                tag: "deepchat_profile",
                attributes: {
                  username: "web_user",
                  email: user ? user.email : getAnonymousEmail(),
                },
              },
            }),
          });

          const testResponseText = await response_text.json();
          questionText = testResponseText.response_text;

          // checking if botname is present or not
          const responder_name = testResponseText.responder_display_name;
          if (!questionText.includes(responder_name)) {
            questionText = responder_name + " : " + questionText;
          }
          if (isImmersive) {
            questionText = questionText.replace(`${responder_name}`, "");
            questionText = questionText.replace(`:`, "");
            questionText = responder_name + " : " + questionText;
          }

          console.log(testResponseText);
          console.log(questionText);
        }
      }

      return resQuestionNumber;
    } catch (error) {
      console.log("error in testResponseHandler", error);
      console.log(
        "questionIndex: ",
        questionIndex,
        "questionLength: ",
        questionLength,
        "testType: ",
        testType
      );
      if (questionIndex <= questionLength && testType != "coaching") {
        setTimeout(() => {
          appendMessage(
            "<p style='font-size: 14px;color: #991b1b;'><b>Unfortunately due to technical reasons, your earlier response could not be processed. The session will be terminated. Please try again using the interaction code.</b>.</p>"
          );
        }, 200);
      }
      testResponseHandlerFailed = true;
      return;
    }
  };

  chatElementRef.request = {
    handler: async (body, signals) => {
      try {
        console.log("bodybody", body)
        if (body instanceof FormData) {
          const bodyLength = [...body.entries()].length;
          console.log(bodyLength);
          if (bodyLength > 1) {
              console.log("FROM HERE", body);
              const userMessageValue = JSON.parse(body.get("message1"));
              const newObj = {
                messages: [userMessageValue],
              };
              body = newObj;

              console.log(body);
              const shadowRoot =
                document.getElementById("chat-element").shadowRoot;
              const lastAudioMessageBubble = shadowRoot.querySelectorAll(
                ".user-message-text.audio-message"
              );
              lastAudioMessageBubble[
                lastAudioMessageBubble.length - 1
              ].remove();
          }

          // const audioFileBodySize = body.get("files").size
          // if (audioFileBodySize === 0) {
          //   const shadowRoot =
          //     document.getElementById("chat-element").shadowRoot;
          //   const lastAudioMessageBubble = shadowRoot.querySelectorAll(
          //     ".user-message-text.audio-message"
          //   );
          //   lastAudioMessageBubble.forEach((element) => {
          //     console.log(element)
          //   })
          //   lastAudioMessageBubble[lastAudioMessageBubble.length - 1].remove()
          //   const allMessages = shadowRoot.getElementById("messages").childNodes;
          //   allMessages.forEach((indvMessage) => {
          //     if (
          //       indvMessage.innerText === "."
          //     ) {
          //       indvMessage.remove();
          //     }
          //   });
          // }
        }
        if (body instanceof FormData) {
          //AUDIO RESPONSES

          if (isEmailForm) {
            signals.onResponse({
              html: "<p style='font-size: 14px;color: #991b1b;'>Please provide response in text.</p>",
            });
            return;
          }

          // to check session active or not
          if (testType === "mcq" || testType === "dynamic_mcq") {
            signals.onResponse({
              html: "<p style='font-size: 14px;color: #991b1b;'>Not allowed! choose option to continue. </p>",
            });
            return;
          }
          if (isProceed === "false") {
            console.log(isProceed);

            signals.onResponse({
              html: "<p style='font-size: 14px;color: #991b1b;'>Not allowed! choose option to continue. </p>",
            });
            return;
          }

          await getSessionStatus(sessionId);

          if (sessionStatus != "in_progress") {
            console.log(
              "sessionStatus",
              sessionStatus,
              sessionId,
              responsesDone
            );
            signals.onResponse({
              html: "<b>To Start Your Session Please Enter Interaction Code..</b>",
            });
            return;
          } else if (sessionStatus === "in_progress" && isSessionExpired) {
            // checking sessionexpiry
            await cancelTest(participantId);
            resetAllVariables();
            signals.onResponse({
              html: "<p style='font-size: 14px;color: #991b1b;'><b>Your Session is expired. Please restart again.</b></p>",
            });
            //Enable Copy Paste
            // var chatElementRef2 = document.getElementById("chat-element");
            // var shadowRoot = chatElementRef2.shadowRoot;
        
            const textInputElement = shadowRoot.getElementById("text-input")
            textInputElement.removeAttribute("onpaste")
            return;
          }

          if (isEmailType) {
            signals.onResponse({
              html: "<p style='font-size: 14px;color: #991b1b;'><b>Only Text response allowed for this interaction.</b></p>",
            });
            return;
          }

          console.log("isRecordingGlobal", isRecordingGlobal);
          while (isRecordingGlobal) {
            console.log("isrecordingglobal", isRecordingGlobal);
            await new Promise((resolve) => setTimeout(resolve, 500));
          }
          let file = audioFile;
          if (file === undefined || file?.name.length === 0 || file?.size === "") {
            signals.onResponse({
              html: "<p style='font-size: 14px;color: #991b1b;'><b>Your audio could not be processed. Please submit again.</b></p>",
            });
            return;
          }

          console.log("At execution - Audio duration:", audioDuration);
          if (audioDuration < 10.0) {
            signals.onResponse({
              html: "<p style='font-size: 14px;color: #991b1b;'><b>The response length detected is below the recommended limit. Please try again.</b></p>",
            });
            return;
          }

          body = undefined
          audioFile = undefined

          const formdata = new FormData();
          formdata.append("owner_type", "user");
          formdata.append("owner_id", userId);
          formdata.append("display_name", file.name);
          formdata.append("doc_type", "AUDIO_ANSWER");
          formdata.append("file", file, file.name);
          formdata.append("actions_pipeline[0]action", "transcribe");
          formdata.append("actions_pipeline[0]context", "null");

          if (questionIndex < questionLength) {
            if (
              testType != "dynamic_discussion_thread" &&
              testType != "orchestrated_conversation" &&
              testType != "coaching"
            ) {
              questionText =
                questionData.results[0].questions[questionIndex].question;
              questionMediaLink =
                questionData.results[0].questions[questionIndex].media_link;
              if (isHindi) {
                questionText = TestUIInfo[`Question ${questionIndex + 1}`];
              }
              let responderName;
              let strList = questionText.replaceAll("*", "").split(":", 2);
              if (strList.length > 1) {
                questionText = strList[1];
                responderName = `<b>${strList[0]}:</b><br>`;
              }
              if (isImmersive) {
                questionText = await TTSContainer(questionText);
              }

              if (responderName) {
                questionText = responderName + questionText;
              }

              const linkPattern = /(http[s]?:\/\/[^\s]+)/;
              const is_link = linkPattern.test(questionText);

              if (questionMediaLink) {
                console.log(questionText);
                let embeddingUrl = "";
                if (questionMediaLink.length > 0) {
                  if (questionMediaLink.includes("youtube.com")) {
                    const videoId = questionMediaLink.split("v=")[1];
                    embeddingUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
                  } else if (questionMediaLink.includes("vimeo.com")) {
                    const videoId = questionMediaLink.split("/").pop();
                    embeddingUrl = `https://player.vimeo.com/video/${videoId}?autoplay=1&loop=1`;
                  } else if (questionMediaLink.includes("twitter.com")) {
                    embeddingUrl = `https://twitframe.com/show?url=${questionMediaLink}`;
                  }

                  if (embeddingUrl) {
                    questionText = `▪ Media <br>  <iframe
                            allow="autoplay; encrypted-media; fullscreen;"
                            style="width: 100%; border-radius: 8px; min-height: 50vh; min-width: 50vw;"
                            src=${embeddingUrl}
                            frameborder="0"
                            allowfullscreen
                          >
                        `;
                  }
                  const urlList = questionMediaLink.split(",");
                  console.log("list", urlList);
                  if (urlList.length > 1) {
                    urlList.forEach((element) => {
                      element = element.trim();
                      if (element.includes("docs.google.com")) {
                        let url =
                          element.split("edit?")[0] +
                          "embed?start=true&loop=true&delayms=3000";
                        console.log(url);
                        appendMessage(`<iframe src=${url}
                                          frameborder="0" 
                                          style="width: 100%; border-radius: 8px; min-height: 50vh; min-width: 50vw;"
                                          allowfullscreen="true" 
                                          mozallowfullscreen="true" 
                                          webkitallowfullscreen="true"
                                          ></iframe>`);
                      } else {
                        console.log(element);
                        appendMessage(`<div ><audio style="${
                          window.innerWidth < 600
                            ? "width: 200px; max-width: 200px !important;"
                            : " min-width: 50vw !important;"
                        }" controls autoplay>
                          <source src=${element} type="audio/mpeg" />
                          Your browser does not support the audio element.
                          </audio></div>`);
                      }
                    });
                  } else {
                    if (questionMediaLink.includes("docs.google.com")) {
                      let url =
                        questionMediaLink.split("edit?")[0] +
                        "embed?start=true&loop=true&delayms=3000";
                      console.log(url);
                      appendMessage(`<iframe src=${url}
                                        frameborder="0" 
                                        style="width: 100%; border-radius: 8px; min-height: 50vh; min-width: 50vw;" 
                                        allowfullscreen="true" 
                                        mozallowfullscreen="true" 
                                        webkitallowfullscreen="true"
                                        ></iframe>`);
                    } else if (questionMediaLink.includes("guidejar.com")) {
                      const guidejarId = questionMediaLink.split("/").pop();
                      appendMessage(`
                        <div style="width:640px">
                        <div style="position:relative;height:0;width:100%;overflow:hidden;box-sizing:border-box;padding-bottom:calc(100% - 0px)">
                        <iframe src="https://www.guidejar.com/embed/${guidejarId}?type=1&controls=off" width="100%" height="100%" style="position:absolute;inset:0" allowfullscreen frameborder="0"></iframe
                        ></div></div>
                        `);
                    }
                  }
                }
              }

              console.log(`que_image ${questionIndex + 1}`);
              if (
                mediaProps &&
                Object.keys(mediaProps).includes(
                  `que_image ${questionIndex + 1}`
                )
              ) {
                const questionpropName = `que_image ${questionIndex + 1}`;

                const url = Object.keys(mediaProps[questionpropName])[0];
                let narration;
                let coords = [];
                const coordAndTitleNarrationList =
                  mediaProps[questionpropName][url];

                coordAndTitleNarrationList.forEach((element) => {
                  if (typeof element === "string") {
                    narration = element;
                  } else {
                    coords.push(element);
                  }
                });

                const imageUrl = url;

                const ttsNarration = await TTSContainer(narration);
                const imageId = `mediaImage${questionIndex}`;
                const imageMapName = `image-map${questionIndex}`;
                const imageTooltipId = `tooltip-${questionIndex}`;

                questionText = `▪ ${ttsNarration}<br><br>
                                  ▪ <img src=${imageUrl} ${
                  window.innerWidth < 768 ? "width='200'" : "width='400'"
                } usemap="#${imageMapName}" id=${imageId} style="border-radius: 8px; margin-top: 4px;" /> <br><br>
                                  ▪ Question : <br> ${questionText}
                                  `;

                signals.onResponse({
                  html: questionText,
                });
                setHoverPoints(coords, imageId, imageMapName, imageTooltipId);
                console.log("IMAGE MAPPED WITH COORDS");
              } else {
                signals.onResponse({
                  html: questionText,
                });
              }
            }
          }

          if (questionIndex === questionLength) {
            
            const shadowRoot =
            document.getElementById("chat-element").shadowRoot;
            
            LoadingMessageWithText2("Crunching report data", shadowRoot)

            const messageNode = document.createElement("div");
            messageNode.classList.add("inner-message-container");
            const messageBubble = document.createElement("div");
            messageBubble.classList.add("message-bubble", "ai-message-text");
            messageBubble.style.maxWidth = "80%";
            messageBubble.style.marginTop = "4px";
            messageBubble.style.borderRadius = "4px";
            messageBubble.style.padding = "4";
            messageBubble.style.backgroundColor = "#f3f4f6";
            messageBubble.style.color = "#374151";
            const messageText = document.createElement("p");
            messageText.innerHTML = `<b>That's it! Thank you for participating in the interaction. Your interaction report is being processed.</b>${
              user ? "" : "<b> Hang tight for next steps </b>"
            }`;
            messageBubble.appendChild(messageText);
            messageNode.appendChild(messageBubble);
            shadowRoot.getElementById("messages").appendChild(messageNode);
            shadowRoot.getElementById("messages").scrollBy(0, 100);
          }

          file = "";
          if (questionIndex <= questionLength) {
            questionIndex++;

            try {
              if (testType != "coaching" || questionIndex == 0) {
                questionId =
                  questionData.results[0].questions[questionIndex - 2].uid;
              }
              const questionObj =
                questionData.results[0].questions[questionIndex - 2];

              console.log("going to call testResponseHandler()");
              await testResponseHandler(formdata, questionObj);
              console.log("call to testResponseHandler() done");
              if (
                maxUploadFailed === true ||
                testResponseHandlerFailed === true
              ) {
                maxUploadFailed = false;
                testResponseHandlerFailed = false;
                resetAllVariables();
                signals.onResponse({
                  html: "<p style='font-size: 14px;color: #991b1b;'><b>Unfortunately due to technical reasons, your earlier response could not be processed. The session will be terminated. Please try again using the interaction code.</b>.</p>",
                });
                return;
              }

              if (testType === "coaching") {
                let responderName;
                const strList = questionText.split(":", 2);
                if (strList.length > 1) {
                  responderName = `<b>${strList[0]}:</b><br>`;
                  questionText = strList[1];
                }
                if (isImmersive) {
                  questionText = await TTSContainer(questionText);
                }

                if (responderName) {
                  questionText = responderName + questionText;
                }
                const dataToShow = getCoachingQuestionData(questionText);
                signals.onResponse({
                  html: dataToShow,
                });
              }

              responseProcessedQuestion++;
              responsesDone = resQuestionNumber === questionLength;

              if (!responsesDone) {
                if (
                  testType === "orchestrated_conversation" ||
                  testType === "dynamic_discussion_thread"
                ) {
                  const stringList = questionText.split(":");
                  console.log(stringList);
                  let responderName;
                  if (stringList.length > 1) {
                    responderName = `<b>${stringList[0]}:</b><br>`;
                    questionText = excludeSpecialCharacters2(stringList.join("").replace(stringList[0], ""));
                  }
                  if (isImmersive && questionIndex != 0) {
                    questionText = await TTSContainer(questionText);
                  }
                  if (responderName) {
                    questionText = responderName + questionText;
                  }
                  signals.onResponse({
                    html: questionText,
                  });
                }
              }
              if (responsesDone) {
                const isCheck = await SesseionCheck(sessionId);
                if (!isCheck) {
                  if (testType === "mcq" || testType === "dynamic_mcq") {
                    const shadowRoot =
                      document.getElementById("chat-element").shadowRoot;
                    const button = shadowRoot.getElementById(
                      `mcq-option-${mcqFormId}`
                    );
                    // button.parentNode.removeChild(button)
                    const thankYouMessage = document.createElement("div");
                    thankYouMessage.innerHTML = "<b>Thank you!</b>"; // You can customize the message here
                    // Replace the button with the "Thank you" message
                    button.parentNode.replaceChild(thankYouMessage, button);
                  }
                  if (isProceed === "false") {
                    const gshadowRoot =
                      document.getElementById("chat-element").shadowRoot;
                    const msg = gshadowRoot.getElementById("proceed-option");
                    // button.parentNode.removeChild(button)
                    const que_msg = document.createElement("div");
                    que_msg.innerHTML = "Thank You"; // You can customize the message here
                    // Replace the button with the "Thank you" message
                    msg.parentNode.replaceChild(que_msg, msg);
                  }
                  resetAllVariables(); //reseting variables

                  signals.onResponse({
                    html: "<p style='font-size: 14px;color: #991b1b;'><b>Unfortunately due to technical reasons, your earlier response could not be processed. The session will be terminated. Please try again using the interaction code.</b>.</p>",
                  });
                  return;
                }
                if (!window.user) {
                  // appendMessage(
                  //   "<b>For obtaining your report, please submit the following details.</b>"
                  // );
                  // signals.onResponse({
                  //   html: credentialsForm,
                  // });
                  isEmailForm = true;
                  formFields = ["name", "email"];
                  signals.onResponse({
                    html: `<b>Please enter your ${formFields[0]}</b>`,
                  });
                }
              }

              //   if (window.user) {
              //     console.log("calling send email");
              //     sendEmail();
              //     console.log("sendEmail completed");
              //     const message = `It's showtime ✨, here is your detailed <a target="_blank" style="color: #3b82f6;text-decoration:none;" href="${globalReportUrl}">feedback report</a>. The feedback is also emailed to you and will be available to you for 60 days.`;
              //     appendMessage(message);
              //     //* send message to start new session
              //     signals.onResponse({
              //       text: "Please enter another access code to start a new interaction.",
              //     });
              //     return;
              //   } else {
              //     //* else show the form to collect the data
              //     signals.onResponse({
              //       text: "For obtaining your report, please submit the following details.",
              //       html: credentialsForm,
              //     });
              //   }

              console.log(sessionId);

              let getReportBody = {
                user_id: participantId,
                report_type: reportType,
                session_id: sessionId,
                interaction_id: testId,
              };

              if (is_free) {
                reportType = "summaryFeedbackReport";
                getReportBody = {
                  user_id: participantId,
                  report_type: reportType,
                  session_id: sessionId,
                  interaction_id: testId,
                };
              } else if (testType === "dynamic_discussion_thread") {
                reportType = "dynamicDiscussionReport";
                getReportBody = {
                  user_id: participantId,
                  report_type: reportType,
                  test_attempt_session_id: sessionId,
                  interaction_id: testId,
                };
              } else if (testType === "orchestrated_conversation") {
                reportType = "meetingAnalysisReport";
                getReportBody = {
                  user_id: participantId,
                  report_type: reportType,
                  test_attempt_session_id: sessionId,
                };
              } else if (senarioCase === "process_training") {
                reportType = "processTrainingReport";
                getReportBody = {
                  user_id: participantId,
                  report_type: reportType,
                  test_attempt_session_id: sessionId,
                };
              }

              console.log(getReportBody, senarioCase);

              if (responsesDone) {
                await fetch(`${baseURL}/frontend-auth/get-report-url/`, {
                  method: "POST",
                  headers: {
                    Authorization: `Basic ${createBasicAuthToken(key, secret)}`,
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(getReportBody),
                })
                  .then((response) => response.json())
                  .then((data) => {
                    console.log("REPORT 2");

                    reportUrl = data.url;
                    globalReportUrl = reportUrl;
                    console.log("Report Url : ", reportUrl, globalReportUrl);
                    clearMultipleBodyData = true
                    //* send report message or form to collect data : start
                    if (window.user) {
                      // sendEmail();
                      const message = `<b>It's showtime ✨, here is your detailed <a target="_blank" style="color: #3b82f6;text-decoration:none;" href="${globalReportUrl}">feedback report</a>. The feedback is also emailed to you and will be available to you for 60 days.</b>`;
                      appendMessage(message);
                      // //* send message to start new session
                      signals.onResponse({
                        html: "<b>Please enter another access code to start a new interaction.</b>",
                      });
                      submitEmailAndName();



                    //Enable Copy Paste
                    var chatElementRef2 = document.getElementById("chat-element");
                    const shadowRoot = chatElementRef2.shadowRoot;
                
                    const textInputElement = shadowRoot.getElementById("text-input")
                    textInputElement.removeAttribute("onpaste")
                      return;
                    }
                  });
                // const urlObject = new URL(reportUrl);
                // const baseurl = `${urlObject.protocol}//${urlObject.host}`;

                // const resp = await fetch(baseurl)
                // if (!resp.ok){
                //   appendMessage("<p style='font-size: 14px;color: #991b1b;'><b>Our report server is currently down. Please try again.</b>.</p>")
                // }
              }
            } catch (error) {
              console.log(error);
              if (error) {
                signals.onResponse({
                  html: "<p style='font-size: 14px;color: #991b1b;'>There might be some error from our end. Please wait and try again later.</p>",
                });
              }
            }
          }
        } else {
          // TEXT RESPONSES
          clearMultipleBodyData = false
          // get latest message
          // const latestMessage = body.messages[body.messages.length - 1].text;

          let latestMessage = body.messages[body.messages.length - 1].text;
          globalSignals = signals
          //slicing 400 words from user responses > 400 words
          if(latestMessage.split(" ").length >= 400){
            latestMessage = latestMessage.split(" ").slice(0, 400).join(" ")

            console.log("SLICED \n", latestMessage)
          } 

          const shadowRoot =
            document.getElementById("chat-element").shadowRoot;

          if (askAccessBotCode){
            const code = 'DEMO2024'
            if (latestMessage === code){
              console.log("Access Code Matched")
              LoadingMessageWithText2("Please wait, we are generating your scenario!!",shadowRoot)
              askAccessBotCode = false
              if (snnipetConfig.isDemo === 'true'){
                handleOptionButtonClick("",signals)
              } else{
                signals.onResponse(
                  {
                    html: `<b>Do you have access code for your simulation?</b><br/><br/>
                  <div class="deep-chat-temporary-message">
                  <button class="deep-chat-button deep-chat-suggestion-button" style="border: 1px solid green">Yes</button>
                  <button class="deep-chat-button deep-chat-suggestion-button" style="border: 1px solid #d80000">No</button> </div>
                  `

                  }
                )
                
                
              }
              return;
            } else {
              LoadingMessageWithText2("Response loading...", shadowRoot)
            }
            signals.onResponse({
              html: "<p style='font-size: 14px;color: #991b1b;'>Enter a valid code to proceed.</p>",
            });
            return;
          }

          if (isEmailForm) {
            await proceedFormFlow(latestMessage);
            if (formFields.length > 0) {
              signals.onResponse({
                html: `<b>Please enter your ${formFields[0]}<b>`,
              });
            } else {
              isEmailForm = false;

              const message = `<b>It's showtime ✨, here is your detailed <a target="_blank" style="color: #3b82f6;text-decoration:none;" href="${globalReportUrl2}">feedback report</a>. The feedback is also emailed to you and will be available to you for 60 days.</b>`;
              appendMessage(message);
              // //* send message to start new session

              signals.onResponse({
                html: "<b>Please enter another access code to start a new interaction.</b>",
              });
              submitEmailAndName();
            }
            return;
          }
          console.log("Latest Message ===> ", latestMessage);
          if (
            (testType === "mcq" || testType === "dynamic_mcq") &&
            latestMessage.toUpperCase() != "STOP"
          ) {
            signals.onResponse({
              html: "<p style='font-size: 14px;color: #991b1b;'>Not allowed! choose option to continue. </p>",
            });
            return;
          }
          if (isProceed === "false" && latestMessage.toUpperCase() != "STOP") {
            signals.onResponse({
              html: "<p style='font-size: 14px;color: #991b1b;'>Not allowed! choose option to continue. </p>",
            });
            return;
          }

          if (isTestCode(latestMessage)) {
            //* check if a session is already running
            console.log("responsesDone ===> ", responsesDone, questionIndex);
            if (responsesDone === false && questionIndex > 0) {
              signals.onResponse({
                html: "<b>You are already in a session. Please complete the current session or  type 'STOP' to end the session.</b>",
              });
              return;
            }

            await cancelTest(participantId);
            //* reset all variables : start
            resetAllVariables();
          }

          const userAcessAvailability = latestMessage// body.messages[0].text;
          if (userAcessAvailability === "Yes" && !isSessionActive) {
            signals.onResponse({
              html: "<b>Please enter the access code to get started.</b>",
            });
            return;
          } else if (userAcessAvailability === "No" && !isSessionActive) {
            optedNo = true;
            console.log(window.location.hostname,'domain')
            if (!["playground.coachbots.com","platform.coachbots.com",'localhost'].includes(window.location.hostname)){

              handleOptionButtonClick("",signals)
            } else {
              signals.onResponse({
                html: "<b>Please ask your administrator for test codes.</b>",
              });
            }
            // signals.onResponse({
            //   html: `<div id="option-button-container" >
            //         <button id="surprise-button" style="margin-top:5px; width:fit-content; padding:6px 12px; border: 1px solid lightgray; border-radius: 4px;" onclick="handleSurpriseMeButtonClick()">Initiate a surprise Interaction</button>
            //         <button id="create-new-scenario" style="margin-top:5px; width:fit-content; padding:6px 12px; border: 1px solid lightgray; border-radius: 4px;" onclick="handleOptionButtonClick()">Create Scenario</button>
            //         </div>
            //         `,
            // });
            // signals.onResponse({
            //   text: "No problem , here are a few samples you can try out (Experimental):",
            //   html: `
            //                   <div id="option-button-container" >
            //                   <button style="margin-top:5px; width:100%; padding:6px 4px; border: 1px solid lightgray; border-radius: 4px;" onclick="handleOptionButtonClick('Integrating a New Team Member')">Integrating a New Team Member</button>

            //                   <button style="margin-top:5px; width:100%; padding:6px 4px; border: 1px solid lightgray; border-radius: 4px;"  onclick="handleOptionButtonClick('Effective Customer Service Management')">Effective Customer Service Management</button>

            //                   <button style="margin-top:5px; width:100%; padding:6px 4px; border: 1px solid lightgray; border-radius: 4px;"  onclick="handleOptionButtonClick('Cultivating Growth Through Feedback')">Cultivating Growth Through Feedback</button>

            //                   <button style="margin-top:5px; width:100%; padding:6px 4px; border: 1px solid lightgray; border-radius: 4px;"  onclick="handleOptionButtonClick('Cultivating Team Impartiality')">Cultivating Team Impartiality</button>

            //                   <button style="margin:5px 0; width:100%; padding:6px 4px; border: 1px solid lightgray; border-radius: 4px;"  onclick="handleOptionButtonClick('Managing Meeting Momentum')">Managing Meeting Momentum</button>
            //               </div>
            //                           `,
            // });
            return;
          }

          if (body.messages[0].text.toUpperCase() === "STOP") {
            if (testType === "mcq" || testType === "dynamic_mcq") {
              const shadowRoot =
                document.getElementById("chat-element").shadowRoot;
              const button = shadowRoot.getElementById(
                `mcq-option-${mcqFormId}`
              );
              // button.parentNode.removeChild(button)
              const thankYouMessage = document.createElement("div");
              thankYouMessage.innerHTML = "<b>Thank you!</b>"; // You can customize the message here
              // Replace the button with the "Thank you" message
              button.parentNode.replaceChild(thankYouMessage, button);
            }
            if (isProceed === "false") {
              const gshadowRoot =
                document.getElementById("chat-element").shadowRoot;
              const msg = gshadowRoot.getElementById("proceed-option");
              // button.parentNode.removeChild(button)
              const que_msg = document.createElement("div");
              que_msg.innerHTML = "Thank You"; // You can customize the message here
              // Replace the button with the "Thank you" message
              msg.parentNode.replaceChild(que_msg, msg);
            }
            await cancelTest(participantId); // cancelling session
            // resetAllVariables(); //reseting variables

            // signals.onResponse({
            //   html: "<b>Your session is terminated. You can restart again!</b>",
            // });
            resetAllVariables().then(() => {
              console.log("Your session is terminated. You can restart again!");

              if (Object.keys(snnipetConfig).length > 0){
                signals.onResponse({
                  html: "<b>Your session is terminated. You can either enter a simulation code or refresh the page for generating the a new simulation.</b>",
                });
              } else{
                signals.onResponse({
                  html: "<b>Your session is terminated. You can restart again!</b>",
                });
              }

              //Enable Copy Paste
              var chatElementRef2 = document.getElementById("chat-element");
              var shadowRoot = chatElementRef2.shadowRoot;
          
              const textInputElement = shadowRoot.getElementById("text-input")
              textInputElement.removeAttribute("onpaste")
            });
            // setTimeout(() => {
            //   window.location.reload();
            // }, 2000);
            return;
          }

          // to check session is active or not
          if (!isTestCode(latestMessage)) {
            if (isHindi) {
              signals.onResponse({
                html: "<p style='font-size: 14px;color: #991b1b;'><b>Only Audio response allowed for this interaction.</b></p>",
              });
              return;
            }
            await getSessionStatus(sessionId);

            // getting text which is from option-button-container
            const shadowRoot =
              document.getElementById("chat-element").shadowRoot;
            const option_buttons = shadowRoot.querySelectorAll(
              "#option-button-container button"
            );

            const buttonTextArray = [];

            option_buttons.forEach((button) => {
              const buttonText = button.textContent.trim();
              buttonTextArray.push(buttonText);
            });

            const opiton_scenarios = shadowRoot.querySelectorAll("#create-scenario-section p")
            opiton_scenarios.forEach((b) =>{
              const buttonText = b.textContent.trim();
              buttonTextArray.push(buttonText);
            })
            // adding sample test code title
            const sampleTestCodesValues = Object.values(sampleTestCodes);
            sampleTestCodesValues.forEach((value) => {
              buttonTextArray.push(value.trim());
            });

            //end
            if ( buttonTextArray.includes(latestMessage)){
              if (responsesDone === false && questionIndex > 0) {
                signals.onResponse({
                  html: "<b>You are already in a session. Please complete the current session or  type 'STOP' to end the session.</b>",
                });
                return;
              }
            }

            if (!buttonTextArray.includes(latestMessage)) {
              if (sessionStatus != "in_progress") {
                signals.onResponse({
                  html: "<b>To Start Your Session Please Enter Interaction Code..</b>",
                });
                return;
              } else if (sessionStatus === "in_progress" && isSessionExpired) {
                // checking sessionexpiry
                await cancelTest(participantId);
                signals.onResponse({
                  html: "<p style='font-size: 14px;color: #991b1b;'><b>Your Session is expired. Please restart again.</b></p>",
                });

                //Enable Copy Paste
                // var chatElementRef2 = document.getElementById("chat-element2");
                // var shadowRoot = chatElementRef2.shadowRoot;
            
                const textInputElement = shadowRoot.getElementById("text-input")
                textInputElement.removeAttribute("onpaste")
                return;
              }

              //************* check if user message is atleast 15 words */
              if (!isValidMessage(latestMessage)) {
                signals.onResponse({
                  html: "<p style='font-size: 14px;color: #991b1b;'><b>Your input is too less. Please respond with minimum 15 words.</b></p>",
                });
                return;
              }

              if (isDuplicateResponse(latestMessage)) {
                DuplicateResponseCount += 1;
                if (DuplicateResponseCount > 1) {
                  resetAllVariables();
                  signals.onResponse({
                    html: "<p style='font-size: 14px;color: #991b1b;'><b> Your session has terminated because of multiple duplicate responses. please try again with unique responses </b></p>",
                  });
                  return;
                }

                signals.onResponse({
                  html: "<p style='font-size: 14px;color: #d3a008;'><b>Duplicate Response detected. this may lead to inaccuracies and session termination. please proceed with caution.</b></p>",
                });
                return;
              } else {
                userResponses2.push(latestMessage);
              }
            }
          }

          let isTestcodeValid;
          const validTestCodes = [
            "QU7G2X3",
            "QPN48NO",
            "QLW2EVP",
            "Q16EWL2",
            "QWLHI90",
            "Q2GGMFP",
            "QJ3RTFF",
            "QBEWUOM",
          ];
          if (questionIndex === 0 && userAcessAvailability.length !== 0) {
            if (snnipetConfig.isDemo === 'true' && isTestCode(latestMessage)){
              signals.onResponse({
                html: "<p style='font-size: 14px;color: #991b1b;'><b>This feature blocked...</b></p>",
              })
              return;
            }
            const shadowRoot = document.getElementById("chat-element").shadowRoot;
            if (optedNo === false) {
              testCode = latestMessage // body.messages[0].text;
              LoadingMessageWithText2("Please wait while we are processing ...", shadowRoot)
              // appendMessage("Please wait while we are processing ...");
            } else {
              LoadingMessageWithText2("Please wait while we are processing ...", shadowRoot)
              // appendMessage("Please wait while we are processing ...");
              // //wait while test code is being processed
              // while (!codeAvailabilityUserChoice) {
              //   await new Promise((resolve) => setTimeout(resolve, 500));
              // }
            }

            codeAvailabilityUserChoice = true;
          }

          if (questionIndex > 0 && !responsesDone) {
            userResponse = latestMessage// body.messages[0].text;
          }

          if (
            !responsesDone &&
            userName.length === 0 &&
            userEmail.length === 0 &&
            codeAvailabilityUserChoice
          ) {
            try {
              if (questionIndex === 0) {
                const response = await fetch(
                  `${baseURL}/tests/?test_code=${testCode}`,
                  {
                    method: "GET",
                    headers: {
                      Authorization: `Basic ${createBasicAuthToken(
                        key,
                        secret
                      )}`,
                    },
                  }
                );

                questionData = await response.json();

                if (questionData.results.length === 0) {
                  signals.onResponse({
                    html: "<p style='font-size: 14px;color: #991b1b;'><b>Code is Invalid. Please enter a valid code.</b></p>",
                  });
                  return;
                }
                console.log("TESTCODE DATA :", questionData);
                questionLength = questionData.results[0].questions.length;
                testId = questionData.results[0].uid;
                interactionMode = questionData.results[0].interaction_mode;
                is_free = questionData.results[0].is_free;
                senarioDescription = questionData.results[0].description;
                senarioTitle = questionData.results[0].title;
                senarioCase = questionData.results[0].scenario_case;
                senarioMediaDescription =
                  questionData.results[0].description_media;
                TestUIInfo = questionData.results[0].ui_information;
                isEmailType = questionData.results[0].is_email_type;
                console.log(senarioMediaDescription);
                clientName = questionData.results[0].client_name;
                isTestSignedIn = questionData.results[0].is_logged_in;
                isImmersive = questionData.results[0].is_immersive;
                mediaProps = questionData.results[0].media_props;
                isTranscriptOnly = questionData.results[0].is_transcript_only;

                console.log(mediaProps, "props");

                isTestcodeValid = true;

                testType = questionData.results[0].test_type;
                orch_details =
                  questionData.results[0].orchestrated_conversation_details;

                if (Object.keys(snnipetConfig).length > 0){
                  isImmersive = snnipetConfig.allowAudioInteraction === 'true';
                } else {
                  console.log("clientAllowAudioInteraction" , clientAllowAudioInteraction)
                  console.log("userAllowAudioInteraction" , userAllowAudioInteraction)
                  console.log("prioritiseUserAllowInteraction" , prioritiseUserAllowInteraction)

                  if(clientAllowAudioInteraction){
                    isImmersive = userAllowAudioInteraction
                  } else {
                    isImmersive = false
                  }

                }
                  console.log('isImmersive', isImmersive)
                  

                if (TestUIInfo) {
                  if (Object.keys(TestUIInfo).length > 0) {
                    senarioTitle = TestUIInfo["title"];
                    senarioDescription = TestUIInfo["description"];
                    isHindi = true;
                  }
                }

                if (testType === "mcq") {
                  globalQuestionLength = Math.log2(questionLength + 1);
                  globalQuestionData = questionData;
                }

                if (testType === "dynamic_mcq") {
                  globalQuestionLength = questionLength;
                  globalQuestionData = questionData;
                }

                //signed user rules

                if (user) {
                  const group_list = ["Demo", "free", "Free"];
                  // const my_lib = await getTestCodesByRule("my_lib");
                  console.log('widgetClientId',widgetClientId)
                  if (widgetClientId != null){
                    group_list.push(widgetClientId)
                  } else {
                    const my_lib = await getClientInformation("my_lib");
                    for (const item of my_lib) {
                      if (item.emails.includes(user.email)) {
                        group_list.push(item.group);
                      }
                    }
                  }
                  if (!group_list.includes(clientName)) {
                    // clientName Demo means Free type test
                    signals.onResponse({
                      html: "<b>You are not allowed to attempt this interaction. Please check if you are logged in with the correct account and if your access code is correct. Contact the administrator if you face problems, via the help widget.</b>",
                    });
                    return;
                  }
                } else {
                  console.log("signedin", isTestSignedIn);
                  if (isTestSignedIn) {
                    signals.onResponse({
                      html: "<b>You are not allowed to attempt this interaction. Please check if you are logged in with the correct account and if your access code is correct. Contact the administrator if you face problems, via the help widget.</b>",
                    });
                    return;
                  }

                  const group_list = ["Demo", "free", "Free"];

                  console.log('widgetClientId',widgetClientId)
                  if (widgetClientId != null){
                    group_list.push(widgetClientId)
                  }
                  
                  if (!group_list.includes(clientName)) {
                    signals.onResponse({
                      html: "<b>You are not allowed to attempt this interaction. Please check if you are logged in with the correct account and if your access code is correct. Contact the administrator if you face problems, via the help widget.</b>",
                    });
                    return;
                  }
                }

                // restriction check like monthly test allowed start
                // await getAttemptedTestList(participantId);
                await getIsRepeatStatus(participantId);
                await getTestPrevilage(participantId);

                if (isRepeatStatus["monthly_remaining_tests"] < 1) {
                  signals.onResponse({
                    html: "You have reached your monthly limit. Please contact your coach/administrator to get more simulations.",
                  });
                  return;
                }

                // Test privilege
                if (
                  testPrevilage &&
                  testPrevilage.active &&
                  !testPrevilage.data.includes(testCode)
                ) {
                  signals.onResponse({
                    html: "<b>You are not allowed to attempt this interaction. Please check if you are logged in with the correct account and if your access code is correct. Contact the administrator if you face problems, via the help widget.</b>",
                  });
                  return;
                }

                // User cannot attempt the test more than once if it is active
                console.log(userRole);
                if (userRole && userRole !== "admin") {
                  if (!isRepeatStatus.is_repeat) {
                    await getAttemptedTestList(participantId);
                    if (testCodeList.includes(testCode)) {
                      signals.onResponse({
                        html: "<b>You are not allowed to attempt this interaction again. Please check if you are logged in with the correct account and if your access code is correct. Contact the administrator if you face problems, via the help widget.</b>",
                      });
                      return;
                    }
                  }
                }
                //end

                try {
                  const response = await fetch(
                    `${baseURL}/test-attempt-sessions/`,
                    {
                      method: "POST",
                      headers: {
                        Authorization: `Basic ${createBasicAuthToken(
                          key,
                          secret
                        )}`,
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        participant_id: participantId,
                        ordering: "-id",
                        test_id: testId,
                      }),
                    }
                  );

                  const data = await response.json();
                  sessionId = data.uid;
                  isSessionActive = true;
                  console.log("Session Created => ", sessionId);
                  // initialize coaching conversation if test is coaching type
                  try {
                    if (testType === "coaching") {
                      const response = await fetch(
                        `${baseURL}/coaching-conversations/initialize/`,
                        {
                          method: "POST",
                          headers: {
                            Authorization: `Basic ${createBasicAuthToken(
                              key,
                              secret
                            )}`,
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({
                            test_attempt_session_id: sessionId,
                          }),
                        }
                      );

                      const data = await response.json();
                      console.log("Coaching Conversation Created => ", data);
                      conversation_id = data.uid;
                      questionLength = 999;
                      console.log("conversation_id", conversation_id);
                    }
                  } catch (err) {
                    console.log("Error while creating session : ", err);
                    isSessionActive = false;
                  }
                } catch (err) {
                  console.log(err);
                  isSessionActive = false;
                }
              }

              if (questionIndex <= questionLength) {
                if (questionIndex < questionLength) {
                  console.log("TEST TYPE: ", testType);
                  if (
                    testType === "dynamic_discussion_thread" ||
                    testType === "orchestrated_conversation"
                  ) {
                    if (questionIndex === 0) {
                      let initial_msg = orch_details["initial_messages"];
                      let start_with_user =
                        orch_details["start_with_user"] ?? "none";

                      if (start_with_user != "none") {
                        if (start_with_user === "manager-team") {
                          questionText =
                            "Start the discussion as a manager to support the team member.";
                        } else if (start_with_user === "team-manager") {
                          questionText =
                            "Start the discussion as a team member and engage with your manager.";
                        } else if (start_with_user === "sales-customer") {
                          questionText =
                            "Start the discussion as a sales and service manager to interact with the customer.";
                        } else if (start_with_user === "customer-sales") {
                          questionText =
                            "Start the discussion as a customer to interact with the sales & service manager.";
                        } else {
                          questionText =
                            "Start the discussion by commenting your thoughts on this.";
                        }
                      } else {
                        let resultString = "";

                        for (let i = 0; i < initial_msg.length; i++) {
                          resultString += "<p>" + initial_msg[i] + "</p>";

                          if (i < initial_msg.length - 1) {
                            resultString += "<br>";
                          }
                        }
                        questionText = resultString;
                      }
                    }
                  } else {
                    if (testType === "mcq" || testType === "dynamic_mcq") {
                      console.log("mcq or dynamic mcq : YES");
                      questionText =
                        questionData.results[0].questions[questionIndex]
                          .question;
                      questionMediaLink =
                        questionData.results[0].questions[questionIndex]
                          .media_link;

                      questionId =
                        questionData.results[0].questions[questionIndex].uid;
                      const mcqOptions =
                        questionData.results[0].questions[questionIndex]
                          .mcq_options;
                      const optionName = Object.keys(mcqOptions);
                      console.log(mcqOptions, optionName, questionData);
                      const option1Name = optionName[0];
                      const option2Name = optionName[1];
                      const option1Text = mcqOptions[option1Name]["opt"];
                      const option2Text = mcqOptions[option2Name]["opt"];
                      if (questionMediaLink) {
                        let embeddingUrl = "";
                        if (questionMediaLink.length > 0) {
                          if (questionMediaLink.includes("youtube.com")) {
                            const videoId = questionMediaLink.split("v=")[1];
                            embeddingUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
                          } else if (questionMediaLink.includes("vimeo.com")) {
                            const videoId = questionMediaLink.split("/").pop();
                            embeddingUrl = `https://player.vimeo.com/video/${videoId}?autoplay=1&loop=1`;
                          } else if (
                            questionMediaLink.includes("twitter.com")
                          ) {
                            embeddingUrl = `https://twitframe.com/show?url=${questionMediaLink}`;
                          }

                          if (embeddingUrl) {
                            questionText = `▪ Media <br>  <iframe
                                          allow="autoplay; encrypted-media; fullscreen;"
                                          style="width: 100%; border-radius: 8px; min-height: 50vh; min-width: 50vw;"
                                          src=${embeddingUrl}
                                          frameborder="0"
                                          allowfullscreen
                                        >
                          `;
                          }
                          const urlList = questionMediaLink.split(",");
                          console.log("list", urlList);
                          if (urlList.length > 1) {
                            urlList.forEach((element) => {
                              element = element.trim();
                              if (element.includes("docs.google.com")) {
                                let url =
                                  element.split("edit?")[0] +
                                  "embed?start=true&loop=true&delayms=3000";
                                console.log(url);
                                questionText =
                                  questionText +
                                  "\n" +
                                  `<iframe src=${url}
                                                frameborder="0" 
                                                style="width: 100%; border-radius: 8px; min-height: 50vh; min-width: 50vw;"
                                                allowfullscreen="true" 
                                                mozallowfullscreen="true" 
                                                webkitallowfullscreen="true"
                                                ></iframe>`;
                              } else {
                                console.log(element);
                                questionText =
                                  questionText +
                                  "\n" +
                                  `<div ><audio style="${
                                    window.innerWidth < 600
                                      ? "width: 200px; max-width: 200px !important;"
                                      : " min-width: 50vw !important;"
                                  }" controls autoplay>
                                <source src=${element} type="audio/mpeg" />
                                Your browser does not support the audio element.
                                </audio></div>`;
                              }
                            });
                          } else {
                            if (questionMediaLink.includes("docs.google.com")) {
                              let url =
                                questionMediaLink.split("edit?")[0] +
                                "embed?start=true&loop=true&delayms=3000";
                              console.log(url);
                              questionText = questionText.replaceAll(":", "");
                              if (isImmersive) {
                                console.log(questionText);
                                const urltts = `${baseURL}/test-responses/get-text-to-speech/?text=${questionText}`;
                                const response = await fetch(urltts, {
                                  method: "GET",
                                  headers: {
                                    Authorization: `Basic ${createBasicAuthToken(
                                      key,
                                      secret
                                    )}`,
                                  },
                                });

                                const blob = await response.blob();
                                console.log("respnse", blob);

                                const objectUrl = URL.createObjectURL(blob);

                                console.log(objectUrl, "url");
                                questionText = `<div ><audio style="${
                                  window.innerWidth < 600
                                    ? "width: 200px; max-width: 200px !important;"
                                    : " min-width: 50vw !important;"
                                }" controls autoplay>
                                <source src=${objectUrl} type="audio/mpeg" />
                                Your browser does not support the audio element.
                                </audio></div>`;
                                console.log(questionText);
                              }
                              console.log("last", questionText);

                              questionText =
                                questionText +
                                "\n" +
                                `<iframe src=${url}
                                              frameborder="0" 
                                              style="width: 100%; border-radius: 8px; min-height: 50vh; min-width: 50vw;" 
                                              allowfullscreen="true" 
                                              mozallowfullscreen="true" 
                                              webkitallowfullscreen="true"
                                              ></iframe>`;
                            }
                          }
                        }
                      }

                      if (isImmersive && !questionMediaLink) {
                        questionText = questionText.replaceAll(":", "");
                        console.log("first", questionText);

                        const urltts = `${baseURL}/test-responses/get-text-to-speech/?text=${questionText}`;
                        const response = await fetch(urltts, {
                          method: "GET",
                          headers: {
                            Authorization: `Basic ${createBasicAuthToken(
                              key,
                              secret
                            )}`,
                          },
                        });

                        const blob = await response.blob();
                        console.log("respnse", blob);

                        const objectUrl = URL.createObjectURL(blob);

                        console.log(objectUrl, "url");
                        questionText = `<div ><audio style="${
                          window.innerWidth < 600
                            ? "width: 200px; max-width: 200px !important;"
                            : " min-width: 50vw !important;"
                        }" controls autoplay>
                          <source src=${objectUrl} type="audio/mpeg" />
                          Your browser does not support the audio element.
                          </audio></div>`;
                        console.log(questionText);
                      }

                      formRadio = `
                      <div id='mcq-option-${mcqFormId}' style="box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); padding: 20px; max-width: 100%; width: 100%; box-sizing: border-box;">
                        <div id='question' style="font-size: 16px; margin-bottom: 20px; color: #333;" value="${questionId}:${sessionId}"><b>Q. </b>${questionText}</div>
                        <div style="display: flex; flex-direction: row; justify-contents: space-around; gap: 8px; flex-wrap: wrap;">
                          <div style="display: flex; flex-direction: row; align-items: flex-start;">
                            <input type="radio" id="${option1Name}" name="mcq_option" value="${option1Text}" style="margin-right: 5px;">
                            <label for="${option1Name}" style="font-size: 14px; margin-bottom: 10px; display: block;">${option1Text}</label>
                          </div>
                          <div style="display: flex; flex-direction: row; align-items: flex-start;">
                            <input type="radio" id="${option2Name}" name="mcq_option" value="${option2Text}" style="margin-right: 5px;">
                            <label for="${option2Name}" style="font-size: 14px; margin-bottom: 10px; display: block;">${option2Text}</label>
                          </div>
                        </div>
                        <button id="submit-btn" onclick="setMcqVariables()" style="margin-top: 15px; padding: 10px 15px; width: 100%; border: 1px solid #1984ff; border-radius: 5px; color: white; background-color: #1984ff; cursor: pointer; font-size: 16px;">Submit</button>
                      </div>`;
                      questionText = formRadio;
                    } else {
                      if (testType != "coaching" || questionIndex == 0) {
                        questionText =
                          questionData.results[0].questions[questionIndex]
                            .question;
                        questionMediaLink =
                          questionData.results[0].questions[questionIndex]
                            .media_link;
                      }

                      if (isHindi) {
                        questionText =
                          TestUIInfo[`Question ${questionIndex + 1}`];
                      }
                      const linkPattern = /(http[s]?:\/\/[^\s]+)/;
                      const is_link = linkPattern.test(questionText);
                    }
                  }

                  console.log("QuestionIndes is : ", questionIndex);
                  if (questionIndex === 0) {
                    console.log("Yes inside if");
                    initialQuestionText = questionText;
                    initialIndex = questionIndex + 1;
                    isProceed = "false";
                    questionText = `
                    <div id="proceed-option" >
                    <b>Proceed ?</b>
                        <button style="margin-top:5px; width: fit-content; padding:6px 12px; border: 1px solid lightgray; border-radius: 4px;" onclick="handleProceedClick('Yes')">Yes</button>
                        <button style="margin-top:5px; width: fit-content; padding:6px 12px; border: 1px solid lightgray; border-radius: 4px;" onclick="handleProceedClick('No')">No</button>
                    </div>`;
                    if ( AttemptTestDirect){
                      signals.onResponse({
                        html: "Get ready! Your scenario starts now. Good luck!",
                      })
                      setTimeout(() => {
                        handleProceedClick('Yes')
                      }, 1000);
                      
                    }

                    if (senarioMediaDescription && !AttemptTestDirect) {
                      let embeddingUrl = "";
                      if (senarioMediaDescription.length > 0) {
                        if (senarioMediaDescription.includes("youtube.com")) {
                          const videoId =
                            senarioMediaDescription.split("v=")[1];
                          embeddingUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;

                          appendMessage(
                            `▪ Title : ${senarioTitle} <br><br>
                               ▪ Description : ${senarioDescription} <br><br>
                               ▪ Instructions : Audio/Video Messages should be atleast 15 secs long.<br><br>
                               ▪ Media <br>  <iframe
                                                style="width: 100%; border-radius: 8px; min-height: 50vh; min-width: 50vw;"
                                                src=${embeddingUrl}
                                                frameborder="0"
                                                allowfullscreen
                                              >
                              
                              `
                          );
                        } else if (
                          senarioMediaDescription.includes("vimeo.com")
                        ) {
                          const videoId = senarioMediaDescription
                            .split("/")
                            .pop();
                          embeddingUrl = `https://player.vimeo.com/video/${videoId}?autoplay=1&loop=1`;

                          appendMessage(
                            `▪ Title : ${senarioTitle} <br><br>
                               ▪ Description : ${senarioDescription} <br><br>
                               ▪ Instructions : Audio/Video Messages should be atleast 15 secs long.<br><br>
                               ▪ Media <br>  <iframe
                                                style="width: 100%; border-radius: 8px; min-height: 50vh; min-width: 50vw;"
                                                src=${embeddingUrl}
                                                frameborder="0"
                                                allowfullscreen
                                              >
                              
                              `
                          );
                        } else if (
                          senarioMediaDescription.includes("twitter.com")
                        ) {
                          embeddingUrl = `https://twitframe.com/show?url=${senarioMediaDescription}`;

                          appendMessage(
                            `▪ Title : ${senarioTitle} <br><br>
                                 ▪ Description : ${senarioDescription} <br><br>
                                 ▪ Instructions : Audio/Video Messages should be atleast 15 secs long. <br><br>
                                 ▪ Media <br> <iframe
                                            allow="autoplay; encrypted-media; fullscreen;
                                            style="width: 100%; border-radius: 8px; min-height: 50vh; min-width: 50vw;"
                                            src=${embeddingUrl}
                                            frameborder="0"
                                            allowfullscreen
                                          >
                                `
                          );
                        } else {
                          const urlList = senarioMediaDescription.split(",");
                          console.log(urlList);
                          if (urlList.length > 1) {
                            appendMessage(`▪ Title : ${senarioTitle} <br><br>
                                ▪ Description : ${senarioDescription} <br><br>
                                ▪ Instructions : Audio/Video Messages should be atleast 15 secs long. <br><br>`);
                            urlList.forEach((element) => {
                              element = element.trim();
                              if (element.includes("docs.google.com")) {
                                let url =
                                  element.split("edit?")[0] +
                                  "embed?start=true&loop=true&delayms=3000";
                                console.log(url);
                                appendMessage(`<iframe src=${url}
                                                frameborder="0" 
                                                style="width: 100%; border-radius: 8px; min-height: 50vh; min-width: 50vw;"
                                                allowfullscreen="true" 
                                                mozallowfullscreen="true" 
                                                webkitallowfullscreen="true"
                                                ></iframe>`);
                              } else {
                                console.log(element);
                                appendMessage(
                                  `<div ><audio style="${
                                    window.innerWidth < 600
                                      ? "width: 200px; max-width: 200px !important;"
                                      : " min-width: 50vw !important;"
                                  }" controls autoplay>
                                  <source src=${element} type="audio/mpeg" />
                                  Your browser does not support the audio element.
                                  </audio></div>`
                                );
                              }
                            });
                          } else {
                            if (
                              senarioMediaDescription.includes(
                                "docs.google.com"
                              )
                            ) {
                              let url =
                                senarioMediaDescription.split("edit?")[0] +
                                "embed?start=true&loop=true&delayms=3000";
                              console.log(url);
                              appendMessage(
                                `▪ Title : ${senarioTitle} <br><br>
                              ▪ Description : ${senarioDescription} <br><br>
                              ▪ Instructions : Audio/Video Messages should be atleast 15 secs long. <br><br>`
                              );
                              appendMessage(`<iframe src=${url}
                                              frameborder="0" 
                                              style="width: 100%; border-radius: 8px; min-height: 50vh; min-width: 50vw;" 
                                              allowfullscreen="true" 
                                              mozallowfullscreen="true" 
                                              webkitallowfullscreen="true"
                                              ></iframe>`);
                            } else if (
                              senarioMediaDescription.includes("guidejar.com")
                            ) {
                              const guidejarId = senarioMediaDescription
                                .split("/")
                                .pop();
                              appendMessage(
                                `▪ Title : ${senarioTitle} <br><br>
                              ▪ Description : ${senarioDescription} <br><br>
                              ▪ Instructions : Audio/Video Messages should be atleast 15 secs long. <br><br>`
                              );

                              appendMessage(`
                              <div style="width:640px">
                              <div style="position:relative;height:0;width:100%;overflow:hidden;box-sizing:border-box;padding-bottom:calc(100% - 0px)">
                              <iframe src="https://www.guidejar.com/embed/${guidejarId}?type=1&controls=off" width="100%" height="100%" style="position:absolute;inset:0" allowfullscreen frameborder="0"></iframe
                              ></div></div>
                              `);
                            } else {
                              appendMessage(
                                `▪ Title : ${senarioTitle} <br><br>
                                    ▪ Description : ${senarioDescription} <br><br>
                                    ▪ Instructions : Audio/Video Messages should be atleast 15 secs long. <br><br>
                                    ▪ Media : <a href="${senarioMediaDescription}" target="_blank">Click here to read the article.</a>
                                    `
                              );
                            }
                          }
                        }
                        // if (!senarioMediaDescription.includes("twitter.com")) {
                        //   appendMessage(
                        //     `▪ Title : ${senarioTitle} <br><br>
                        //        ▪ Description : ${senarioDescription} <br><br>
                        //        ▪ Instructions : Audio/Video Messages should be atleast 15 secs long.<br><br>
                        //        ▪ Media <br>  <iframe
                        //                         style="width: 100%; border-radius: 8px; min-height: 50vh; min-width: 50vw;"
                        //                         src=${embeddingUrl}
                        //                         frameborder="0"
                        //                         allowfullscreen
                        //                       >

                        //       `
                        //   );
                        // }
                      } else {
                        appendMessage(
                          `▪ Title : ${senarioTitle} <br><br>
                             ▪ Description : ${senarioDescription} <br><br>
                             ▪ Instructions : Audio/Video Messages should be atleast 15 secs long.`
                        );
                      }
                      //   if (testType != "coaching") {
                      signals.onResponse({
                        html: questionText,
                      });
                      //   }
                    } else if (
                      mediaProps &&
                      Object.keys(mediaProps).includes("test_image")
                      && !AttemptTestDirect
                    ) {
                      console.log("Media props here", mediaProps);
                      console.log("SHOW MEDIA PROPS here", mediaProps);
                      // const [imageUrl, coords] = Object.entries(
                      //   mediaProps.test_image
                      // )[0];
                      const imageUrl = Object.keys(mediaProps["test_image"])[0];
                      let narration;
                      let coords = [];
                      const coordAndTitleNarrationList =
                        mediaProps["test_image"][imageUrl];

                      coordAndTitleNarrationList.forEach((element) => {
                        if (typeof element === "string") {
                          narration = element;
                        } else {
                          coords.push(element);
                        }
                      });
                      const ttsNarration = await TTSContainer(narration);
                      const imageId = "mediaImage";
                      const imageMapName = "image-map";
                      const imageTooltipId = "tooltip";

                      appendMessage(
                        `▪ Title : ${senarioTitle} <br><br>
                             ▪ Description : ${senarioDescription} <br><br>
                             ▪ Instructions : Response should be at least 15 words. <br><br>
                             ▪  <img src=${imageUrl} ${
                          window.innerWidth < 768
                            ? "width='200'"
                            : "width='400'"
                        } usemap="#${imageMapName}" id=${imageId} style="border-radius: 8px; margin-top: 4px;" /> <br><br>
                             ▪ ${ttsNarration}`
                      );
                      signals.onResponse({
                        html: questionText,
                      });

                      // pass - coords, imagemap-name,
                      setHoverPoints(
                        coords,
                        imageId,
                        imageMapName,
                        imageTooltipId
                      );
                      console.log("IMAGE MAPPED WITH COORDS");
                    } else {
                      if (!AttemptTestDirect){
                        signals.onResponse({
                          html: questionText,
                          text: ` ▪ Title : ${senarioTitle} \n\n  ▪ Description : ${senarioDescription} \n\n ▪ Instructions : Audio/Video Messages should be atleast 15 secs long.`,
                        });
                      }
                    }
                    // appendMessage(` ▪ Title : ${senarioTitle} \n\n  ▪ Description : ${senarioDescription} \n\n ▪ Instructions : Audio/Video Messages should be atleast 15 secs long.`)
                  } else {
                    if (
                      testType != "orchestrated_conversation" &&
                      testType != "dynamic_discussion_thread" &&
                      testType != "coaching"
                      
                    ) {
                      let responderName;
                      let strList = questionText.replaceAll("*", "").split(":", 2);
                      if (strList.length > 1) {
                        questionText = strList[1];
                        responderName = `<b>${strList[0]}:</b><br>`;
                      }
                      if (isImmersive) {
                        questionText = await TTSContainer(questionText);
                      }

                      if (responderName) {
                        questionText = responderName + questionText;
                      }

                      if (questionMediaLink) {
                        console.log(questionText);
                        let embeddingUrl = "";
                        if (questionMediaLink.length > 0) {
                          if (questionMediaLink.includes("youtube.com")) {
                            const videoId = questionMediaLink.split("v=")[1];
                            embeddingUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
                          } else if (questionMediaLink.includes("vimeo.com")) {
                            const videoId = questionMediaLink.split("/").pop();
                            embeddingUrl = `https://player.vimeo.com/video/${videoId}?autoplay=1&loop=1`;
                          } else if (
                            questionMediaLink.includes("twitter.com")
                          ) {
                            embeddingUrl = `https://twitframe.com/show?url=${questionMediaLink}`;
                          }

                          if (embeddingUrl) {
                            questionText = `▪ Media <br>  <iframe
                                          allow="autoplay; encrypted-media; fullscreen;"
                                          style="width: 100%; border-radius: 8px; min-height: 50vh; min-width: 50vw;"
                                          src=${embeddingUrl}
                                          frameborder="0"
                                          allowfullscreen
                                        >
                          `;
                          }
                          const urlList = questionMediaLink.split(",");
                          console.log("list", urlList);
                          if (urlList.length > 1) {
                            urlList.forEach((element) => {
                              element = element.trim();
                              if (element.includes("docs.google.com")) {
                                let url =
                                  element.split("edit?")[0] +
                                  "embed?start=true&loop=true&delayms=3000";
                                console.log(url);
                                appendMessage(`<iframe src=${url}
                                                frameborder="0" 
                                                style="width: 100%; border-radius: 8px; min-height: 50vh; min-width: 50vw;"
                                                allowfullscreen="true" 
                                                mozallowfullscreen="true" 
                                                webkitallowfullscreen="true"
                                                ></iframe>`);
                              } else {
                                console.log(element);
                                appendMessage(`<div ><audio style="${
                                  window.innerWidth < 600
                                    ? "width: 200px; max-width: 200px !important;"
                                    : " min-width: 50vw !important;"
                                }" controls autoplay>
                                <source src=${element} type="audio/mpeg" />
                                Your browser does not support the audio element.
                                </audio></div>`);
                              }
                            });
                          } else {
                            if (questionMediaLink.includes("docs.google.com")) {
                              let url =
                                questionMediaLink.split("edit?")[0] +
                                "embed?start=true&loop=true&delayms=3000";
                              console.log(url);
                              appendMessage(`<iframe src=${url}
                                              frameborder="0" 
                                              style="width: 100%; border-radius: 8px; min-height: 50vh; min-width: 50vw;" 
                                              allowfullscreen="true" 
                                              mozallowfullscreen="true" 
                                              webkitallowfullscreen="true"
                                              ></iframe>`);
                            } else if (
                              questionMediaLink.includes("guidejar.com")
                            ) {
                              const guidejarId = questionMediaLink
                                .split("/")
                                .pop();
                              appendMessage(`
                              <div style="width:640px">
                              <div style="position:relative;height:0;width:100%;overflow:hidden;box-sizing:border-box;padding-bottom:calc(100% - 0px)">
                              <iframe src="https://www.guidejar.com/embed/${guidejarId}?type=1&controls=off" width="100%" height="100%" style="position:absolute;inset:0" allowfullscreen frameborder="0"></iframe
                              ></div></div>
                              `);
                            }
                          }
                        }
                      }
                      if (questionText) {
                        console.log(`que_image ${questionIndex + 1}`);
                        if (
                          mediaProps &&
                          Object.keys(mediaProps).includes(
                            `que_image ${questionIndex + 1}`
                          )
                        ) {
                          const questionpropName = `que_image ${
                            questionIndex + 1
                          }`;

                          const url = Object.keys(
                            mediaProps[questionpropName]
                          )[0];
                          let narration;
                          let coords = [];
                          const coordAndTitleNarrationList =
                            mediaProps[questionpropName][url];

                          coordAndTitleNarrationList.forEach((element) => {
                            if (typeof element === "string") {
                              narration = element;
                            } else {
                              coords.push(element);
                            }
                          });

                          const imageUrl = url;

                          const ttsNarration = await TTSContainer(narration);
                          const imageId = `mediaImage${questionIndex}`;
                          const imageMapName = `image-map${questionIndex}`;
                          const imageTooltipId = `tooltip-${questionIndex}`;

                          questionText = `▪  ${ttsNarration}<br><br>
                                          ▪ <br> <img src=${imageUrl} ${
                            window.innerWidth < 768
                              ? "width='200'"
                              : "width='400'"
                          } usemap="#${imageMapName}" id=${imageId} style="border-radius: 8px; margin-top: 4px;" /> <br><br>
                                          ▪ Question : <br> ${questionText}
                                          `;

                          signals.onResponse({
                            html: questionText,
                          });
                          setHoverPoints(
                            coords,
                            imageId,
                            imageMapName,
                            imageTooltipId
                          );
                          console.log("IMAGE MAPPED WITH COORDS");

                          // questionText2 = questionText2 + imageDiv
                        } else {
                          console.log("resp", questionText);
                          signals.onResponse({
                            html: questionText,
                          });
                        }
                      }
                    }
                  }
                }
                if (
                  questionIndex === questionLength &&
                  userResponse.length > 0
                ) {
                  const shadowRoot =
                     document.getElementById("chat-element").shadowRoot;

                  LoadingMessageWithText2("Crunching report data", shadowRoot)

                  const messageNode = document.createElement("div");
                  messageNode.classList.add("inner-message-container");
                  const messageBubble = document.createElement("div");
                  messageBubble.classList.add(
                    "message-bubble",
                    "ai-message-text"
                  );
                  messageBubble.style.maxWidth = "80%";
                  messageBubble.style.marginTop = "4px";
                  messageBubble.style.borderRadius = "4px";
                  messageBubble.style.padding = "4";
                  messageBubble.style.backgroundColor = "#f3f4f6";
                  messageBubble.style.color = "#374151";
                  const messageText = document.createElement("p");
                  messageText.innerHTML = `<b>That's it! Thank you for participating in the interaction. Your interaction report is being processed.</b> ${
                    user ? "" : "<b> Hang tight for next steps </b>"
                  }`;
                  messageBubble.appendChild(messageText);
                  messageNode.appendChild(messageBubble);
                  shadowRoot
                    .getElementById("messages")
                    .appendChild(messageNode);
                  shadowRoot.getElementById("messages").scrollBy(0, 100);
                }
                if (questionIndex > 0) {
                  if (testType != "coaching" || questionIndex == 0) {
                    questionId =
                      questionData.results[0].questions[questionIndex - 1].uid;
                  }
                  questionIndex++;

                  if (testType === "coaching") {
                    const response = await fetch(
                      `${baseURL}/coaching-conversations/${conversation_id}/reply/`,
                      {
                        method: "POST",
                        headers: {
                          Authorization: `Basic ${createBasicAuthToken(
                            key,
                            secret
                          )}`,
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          participant_message_text: userResponse,
                          participant_message_url: "",
                        }),
                      }
                    );
                    const responseData = await response.json();
                    console.log(
                      "Response from Coaching submit response : ",
                      responseData
                    );

                    questionText = responseData["coach_message_text"];
                    conversation_id = responseData["uid"];
                    console.log("coaching question Text: ", questionText);
                    let responderName;
                    const strList = questionText.split(":", 2);
                    if (strList.length > 1) {
                      responderName = `<b>${strList[0]}:</b><br>`;
                      questionText = strList[1];
                    }
                    if (isImmersive) {
                      questionText = await TTSContainer(questionText);
                    }

                    if (responderName) {
                      questionText = responderName + questionText;
                    }
                    const dataToShow = getCoachingQuestionData(questionText);
                    signals.onResponse({
                      html: dataToShow,
                    });
                    console.log(questionData);
                  } else {
                    const response = await fetch(`${baseURL}/test-responses/`, {
                      method: "POST",
                      headers: {
                        Authorization: `Basic ${createBasicAuthToken(
                          key,
                          secret
                        )}`,
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        test_attempt_session_id: sessionId,
                        question_id: questionId,
                        response_text: userResponse,
                        response_file: "",
                        user_attributes: {
                          tag: "deepchat_profile",
                          attributes: {
                            username: "web_user",
                            email: user ? user.email : getAnonymousEmail(),
                          },
                        },
                      }),
                    });
                    const responseData = await response.json();
                    console.log(
                      "Response from submit response : ",
                      responseData
                    );
                    resQuestionNumber = responseData.question.question_number;
                  }

                  if (questionIndex < questionLength) {
                    if (
                      testType === "dynamic_discussion_thread" ||
                      testType === "orchestrated_conversation"
                    ) {
                      questionId =
                        questionData.results[0].questions[questionIndex - 1]
                          .uid;

                      questionIndex++;

                      const questionResponse = await fetch(
                        `${baseURL}/test-responses/`,
                        {
                          method: "POST",
                          headers: {
                            Authorization: `Basic ${createBasicAuthToken(
                              key,
                              secret
                            )}`,
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({
                            test_attempt_session_id: sessionId,
                            question_id: questionId,
                            response_text: "",
                            response_file: "",
                            user_attributes: {
                              tag: "deepchat_profile",
                              attributes: {
                                username: "web_user",
                                email: user ? user.email : getAnonymousEmail(),
                              },
                            },
                          }),
                        }
                      );

                      const qRespnse = await questionResponse.json();
                      questionText = qRespnse["response_text"];
                      console.log('dynamic or orch response',qRespnse)
                      // checking if botname is present or not
                      const responder_name = qRespnse.responder_display_name;
                      if (!questionText.includes(responder_name)) {
                        questionText = responder_name + " : " + questionText;
                      }
                      if (isImmersive) {
                        questionText = questionText.replace(
                          `${responder_name}`,
                          ""
                        );
                        questionText = questionText.replace(`:`, "");
                        questionText = responder_name + " : " + questionText;
                      }
                      console.log(questionText);
                      resQuestionNumber = qRespnse.question.question_number;
                    }
                  }
                }

                if (resQuestionNumber != questionLength) {
                  if (
                    testType === "orchestrated_conversation" ||
                    testType === "dynamic_discussion_thread"
                  ) {
                    const stringList = questionText.split(":");
                    console.log(stringList);
                    let responderName;
                    if (stringList.length > 1) {
                      responderName = `<b>${stringList[0]}:</b><br>`;
                      questionText = excludeSpecialCharacters2(stringList.join("").replace(stringList[0], ""));
                    }
                    if (isImmersive && questionIndex != 0) {
                      questionText = await TTSContainer(questionText);
                    }
                    if (responderName) {
                      questionText = responderName + questionText;
                    }
                    signals.onResponse({
                      html: questionText,
                    });
                  }
                }
                userResponse = "";

                if (questionIndex === 0) {
                  questionIndex++;
                }

                if (resQuestionNumber === questionLength) {
                  responsesDone = true;
                  const isCheck = await SesseionCheck(sessionId);
                  if (!isCheck) {
                    if (testType === "mcq" || testType === "dynamic_mcq") {
                      const shadowRoot =
                        document.getElementById("chat-element").shadowRoot;
                      const button = shadowRoot.getElementById(
                        `mcq-option-${mcqFormId}`
                      );
                      // button.parentNode.removeChild(button)
                      const thankYouMessage = document.createElement("div");
                      thankYouMessage.innerHTML = "<b>Thank you!</b>"; // You can customize the message here
                      // Replace the button with the "Thank you" message
                      button.parentNode.replaceChild(thankYouMessage, button);
                    }
                    if (isProceed === "false") {
                      const gshadowRoot =
                        document.getElementById("chat-element").shadowRoot;
                      const msg = gshadowRoot.getElementById("proceed-option");
                      // button.parentNode.removeChild(button)
                      const que_msg = document.createElement("div");
                      que_msg.innerHTML = "Thank You"; // You can customize the message here
                      // Replace the button with the "Thank you" message
                      msg.parentNode.replaceChild(que_msg, msg);
                    }
                    resetAllVariables(); //reseting variables

                    signals.onResponse({
                      html: "<p style='font-size: 14px;color: #991b1b;'><b>Unfortunately due to technical reasons, your earlier response could not be processed. The session will be terminated. Please try again using the interaction code.</b>.</p>",
                    });
                    return;
                  }

                  if (!window.user) {
                    // appendMessage(
                    //   "<b>For obtaining your report, please submit the following details.</b>"
                    // );
                    // signals.onResponse({
                    //   html: credentialsForm,
                    // });
                    isEmailForm = true;
                    formFields = ["name", "email"];
                    signals.onResponse({
                      html: `<b>Please enter your ${formFields[0]}</b>`,
                    });
                  }

                  //   if (window.user) {
                  //     sendEmail();
                  //     const message = `It's showtime ✨, here is your detailed <a target="_blank" style="color: #3b82f6;text-decoration:none;" href="${globalReportUrl}">feedback report</a>. The feedback is also emailed to you and will be available to you for 60 days.`;
                  //     appendMessage(message);
                  //     // //* send message to start new session

                  //     signals.onResponse({
                  //       text: "Please enter another access code to start a new interaction.",
                  //     });
                  //     return;
                  //   } else {
                  //     //* else show the form to collect the data
                  //     signals.onResponse({
                  //       text: "For obtaining your report, please submit the following details.",
                  //       html: credentialsForm,
                  //     });
                  //   }

                  let getReportBody = {
                    user_id: participantId,
                    report_type: reportType,
                    session_id: sessionId,
                    interaction_id: testId,
                  };

                  if (is_free) {
                    reportType = "summaryFeedbackReport";
                    getReportBody = {
                      user_id: participantId,
                      report_type: reportType,
                      session_id: sessionId,
                      interaction_id: testId,
                    };
                  } else if (testType === "dynamic_discussion_thread") {
                    reportType = "dynamicDiscussionReport";
                    getReportBody = {
                      user_id: participantId,
                      report_type: reportType,
                      test_attempt_session_id: sessionId,
                      interaction_id: testId,
                    };
                  } else if (testType === "orchestrated_conversation") {
                    reportType = "meetingAnalysisReport";
                    getReportBody = {
                      user_id: participantId,
                      report_type: reportType,
                      test_attempt_session_id: sessionId,
                    };
                  } else if (senarioCase === "process_training") {
                    reportType = "processTrainingReport";
                    getReportBody = {
                      user_id: participantId,
                      report_type: reportType,
                      session_id: sessionId,
                      interaction_id: testId,
                    };
                  }

                  console.log(getReportBody, senarioCase);

                  console.log(sessionId);
                  const reportResponse = await fetch(
                    `${baseURL}/frontend-auth/get-report-url/`,
                    {
                      method: "POST",
                      headers: {
                        Authorization: `Basic ${createBasicAuthToken(
                          key,
                          secret
                        )}`,
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify(getReportBody),
                    }
                  );

                  const reportData = await reportResponse.json();
                  reportUrl = reportData.url;
                  globalReportUrl = reportUrl;
                  console.log("REPORT 3");
                  console.log("Report Url : ", reportUrl, globalReportUrl);
                  // const urlObject = new URL(reportUrl);
                  // const baseurl = `${urlObject.protocol}//${urlObject.host}`;

                  // const resp = await fetch(baseurl)
                  // if (!resp.ok){
                  //   appendMessage("<p style='font-size: 14px;color: #991b1b;'><b>Our report server is currently down. Please try again.</b>.</p>")
                  // }

                  //* send report message or form to collect data : start
                  if (window.user) {
                    // sendEmail();
                    const message = `<b>It's showtime ✨, here is your detailed <a target="_blank" style="color: #3b82f6;text-decoration:none;" href="${globalReportUrl}">feedback report</a>. The feedback is also emailed to you and will be available to you for 60 days.</b>`;
                    appendMessage(message);
                    // //* send message to start new session

                    signals.onResponse({
                      html: "<b>Please enter another access code to start a new interaction.</b>",
                    });
                    submitEmailAndName();

                    //Enable Copy Paste
                    var chatElementRef2 = document.getElementById("chat-element");
                    const shadowRoot = chatElementRef2.shadowRoot;
                
                    const textInputElement = shadowRoot.getElementById("text-input")
                    textInputElement.removeAttribute("onpaste")
                    return;
                  }

                  //* send report message or form to collect data : end
                }
              }
            } catch (err) {
              console.log(err);
              if (testType === "mcq" || testType === "dynamic_mcq") {
                const shadowRoot =
                  document.getElementById("chat-element").shadowRoot;
                const button = shadowRoot.getElementById(
                  `mcq-option-${mcqFormId}`
                );
                // button.parentNode.removeChild(button)
                const thankYouMessage = document.createElement("div");
                thankYouMessage.innerHTML = "<b>Thank you!</b>"; // You can customize the message here
                // Replace the button with the "Thank you" message
                button.parentNode.replaceChild(thankYouMessage, button);
              }
              if (isProceed === "false") {
                const gshadowRoot =
                  document.getElementById("chat-element").shadowRoot;
                const msg = gshadowRoot.getElementById("proceed-option");
                // button.parentNode.removeChild(button)
                const que_msg = document.createElement("div");
                que_msg.innerHTML = "Thank You"; // You can customize the message here
                // Replace the button with the "Thank you" message
                msg.parentNode.replaceChild(que_msg, msg);
              }
              resetAllVariables(); //reseting variables

              if (body.messages[0].text.toUpperCase() !== "STOP") {
                signals.onResponse({
                  html: "<p style='font-size: 14px;color: #991b1b;'><b>Unfortunately due to technical reasons, your earlier response could not be processed. The session will be terminated. Please try again using the interaction code.</b>.</p>",
                });
              }
            }
          }
        }
      } catch (e) {
        console.log(e);
        await cancelTest(participantId); // cancelling session
        if (testType === "mcq" || testType === "dynamic_mcq") {
          const shadowRoot = document.getElementById("chat-element").shadowRoot;
          const button = shadowRoot.getElementById(`mcq-option-${mcqFormId}`);
          // button.parentNode.removeChild(button)
          const thankYouMessage = document.createElement("div");
          thankYouMessage.innerHTML = "<b>Thank you!</b>"; // You can customize the message here
          // Replace the button with the "Thank you" message
          button.parentNode.replaceChild(thankYouMessage, button);
        }
        if (isProceed === "false") {
          const gshadowRoot =
            document.getElementById("chat-element").shadowRoot;
          const msg = gshadowRoot.getElementById("proceed-option");
          // button.parentNode.removeChild(button)
          const que_msg = document.createElement("div");
          que_msg.innerHTML = "Thank You"; // You can customize the message here
          // Replace the button with the "Thank you" message
          msg.parentNode.replaceChild(que_msg, msg);
        }
        resetAllVariables(); //reseting variables

        signals.onResponse({
          html: "<p style='font-size: 14px;color: #991b1b;'><b>Unfortunately due to technical reasons, your earlier response could not be processed. The session will be terminated. Please try again using the interaction code.</b>.</p>",
        });
      }
    },
  };
});

let sendBtn;
let InputField; 
const openChatContainer = () => {
  let chatContainer = document.getElementsByClassName("chat-container")?.[0];
  let chatIcon = document.getElementsByClassName("chat-icon")?.[0];

  const coachScribeChatIcon = document.getElementsByClassName("chat-icon2")?.[0]
  const coachScribeContainer = document.getElementsByClassName("chat-icon-container2")?.[0]
  console.log(coachScribeChatIcon, coachScribeContainer)

  if(window.innerWidth < 600){
    coachScribeChatIcon.style.display = "none"
    coachScribeContainer.style.display = "none"
  }

  const shadowR = document.getElementById("chat-element").shadowRoot

  const container = shadowR.getElementById("container")
  container.oncopy = () => {
    alert("Copying is not allowed")
    return false
  }

  const inputField = shadowR.getElementById("text-input")
  if(allowPastingAtClientLevel){
    inputField.onpaste = () => {
      alert("Pasting is not allowed.")
      return false
    }
  }

  let backdrop2 = document.getElementById("backdrop2")
  backdrop2.style.display = "block"
  document.body.style.overflowY = "hidden";

  const chatE = document.getElementById("chat-element");
  micButton = chatE.shadowRoot.getElementById("microphone-button");
  sendBtn = chatE.shadowRoot.querySelector(".input-button");
  InputField = chatE.shadowRoot.getElementById("text-input")
  let isRecording = false;
  let audioChunks = [];
  let stream;



  async function startRecording() {
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      mediaRecorder = new MediaRecorder(stream);
      isRecording = true;
      isRecordingGlobal = true;
      console.log("IS RECORDING ", isRecording, isRecordingGlobal);
      audioChunks = [];
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.push(event.data);
        }
      };

      const audioContext = new window.AudioContext();
      mediaRecorder.onstop = async () => {
        let audioBlob = new Blob(audioChunks, { type: "audio/wav" });

        const audioBuffer = await audioContext.decodeAudioData(
          await audioBlob.arrayBuffer()
        );
        audioDuration = audioBuffer.duration;
        console.log("at INIT - Audio duration:", audioDuration);
        isRecording = false;
        isRecordingGlobal = false;

        audioFile = new File([audioBlob], "user-audio", {
          type: audioBlob.type,
        });
        audioChunks.length = 0;

        console.log(audioFile,'audioFile')

        // audioFileMap[`${questionIndex}`] = audioFile
        const fileUrl = window.URL.createObjectURL(audioFile);
        audioFileSrc = fileUrl;
        // audioFileSrcMap[`${questionIndex}`] = fileUrl;
      };

      mediaRecorder.start();
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  }

  console.log("IS RECORDING ", isRecording);
  if (micButton) {
    micButton.addEventListener("click", () => {
      if (!isRecording) {
        startRecording();
      }
    });
  }

  if (sendBtn) {
    sendBtn.addEventListener("click", () => {
      if(isRecording){
        stream.getTracks().forEach((track) => track.stop());
        if (mediaRecorder && mediaRecorder.state !== "inactive") {
          mediaRecorder.stop();
          console.log("glrecor", isRecordingGlobal);
        }
      }
    });
  }

  // Using the ipinfo.io API
  // fetch("https://ipinfo.io/106.221.193.225?token=4ba5b2bde0816f")
  //   .then((response) => response.json())
  //   .then((data) => {
  //     ipAddress = data.ip;
  //   })
  //   .catch((error) => console.error("Error fetching IP address:", error));

  //   const user_data = getUserData();

  //   if (user_data) {
  //     user_name = user_data.name;
  //     user_email = user_data.email;
  //   } else {
  //     user_name = "coachbots_anonyoususer";
  //     user_sid = generateSessionId();
  //     user_email = `${user_name}-${sid}@gmail.com`;
  //   }

  // let user_name;
  // let user_email;

  // if (user) {
  //   user_name = `${user.given_name} ${user.family_name ? user.family_name : ""}`;
  //   user_email = user.email;
  // } else {
  //   user_name = "coachbots_anonyoususer";
  //   user_email = getAnonymousEmail();
  // }

  // if (window.LogRocket) {
  //   window.LogRocket.identify(user_email, {
  //     name: user_name,
  //     email: user_email,
  //   });
  // }
  // fetch(`${baseURL}/accounts/`, {
  //   method: "POST",
  //   headers: {
  //     Authorization: `Basic ${basicAuthToken}`,
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     user_context: {
  //       name: user_name,
  //       role: "member",
  //       user_attributes: {
  //         tag: "deepchat_profile",
  //         attributes: {
  //           name: user_name,
  //           username: user_name,
  //           email: user_email,
  //         },
  //       },
  //     },
  //     identity_context: {
  //       identity_type: "deepchat_unique_id",
  //       value: user_email,
  //     },
  //   }),
  // })
  //   .then((response) => response.json())
  //   .then((data) => {
  //     clientAllowAudioInteraction = data.client_allow_audio_interactions; 
  //     userAllowAudioInteraction = data.user_allow_audio_interactions;
  //     prioritiseUserAllowInteraction = data.prioritize_user_audio_interaction;

  //     participantId = data.uid;
  //     userId = data.uid;
  //     userRole = data.role;
  //   })
  //   .catch((err) => console.log(err));

  if (chatContainer.style.scale === "1") {
    chatContainer.style.scale = 0;
    chatContainer.style["transform-origin"] = "0% 100%";
    document.body.style.overflowY = "scroll";
    backdrop2.style.display = "none"
  } else {
    chatContainer.style.scale = 1;
    chatContainer.style["transform-origin"] = "100% 0%";

    // close stt bot
    const chatContainer2 = document.getElementById("chat-container2");
    chatContainer2.style.scale = 0;
    chatContainer2.style["transform-origin"] = "100% 100%";
    const backdrop = document.getElementById("backdrop")
    backdrop.style.display ="none";

    const chatIcon2 = document.getElementsByClassName("chat-icon2")?.[0];
    chatIcon2.src =
      "https://cdn.statically.io/gh/falahh6/coachbots/main/coachbot-logo-bot.png";
  }

  if (
    chatIcon.src ===
    "https://cdn.statically.io/gh/falahh6/coachbots/main/coachbot-logo-bot.png"
  ) {
    chatIcon.src =
      "https://cdn.statically.io/gh/falahh6/coachbots/main/close-btn.png";
  } else {
    chatIcon.src =
      "https://cdn.statically.io/gh/falahh6/coachbots/main/coachbot-logo-bot.png";
  }
};

const closeFromTop = () => {
  let chatContainer = document.getElementsByClassName("chat-container")?.[0];
  let chatIcon = document.getElementsByClassName("chat-icon")?.[0];
  document.body.style.overflowY = "scroll";
  let backdrop2 = document.getElementById("backdrop2")
  backdrop2.style.display = "none"
  chatContainer.style.scale = 0;
  chatContainer.style["transform-origin"] = "0% 100%";

  const coachScribeChatIcon = document.getElementsByClassName("chat-icon2")?.[0]
  const coachScribeContainer = document.getElementsByClassName("chat-icon-container2")?.[0]
  console.log(coachScribeChatIcon, coachScribeContainer)

  if (window.innerWidth < 600) {
    coachScribeChatIcon.style.display = "block";
    coachScribeContainer.style.display = "block";
  }

  if (
    chatIcon.src ===
    "https://cdn.statically.io/gh/falahh6/coachbots/main/coachbot-logo-bot.png"
  ) {
    chatIcon.src =
      "https://cdn.statically.io/gh/falahh6/coachbots/main/close-btn.png";
  } else {
    chatIcon.src =
      "https://cdn.statically.io/gh/falahh6/coachbots/main/coachbot-logo-bot.png";
  }
};

// handling for enter key send while recording
document.addEventListener("keydown", (event) => {
  if (event.keyCode === 13 || event.which === 13) {
    if(isRecordingGlobal) {
      sendBtn.click()
    }
  }
});