const key2 = "";
const secret2 = "";

const subdomainStt = window.location.hostname.split(".")[0];
const devUrlStt = "https://coach-api-ovh.coachbots.com/api/v1";
// const devUrlStt = "http://127.0.0.1:8001/api/v1"
// const devUrlStt = "https://coach-api-gcp.coachbots.com/api/v1";
const prodUrlStt = "https://coach-api-prod-ovh.coachbots.com/api/v1";
const baseURL2 = subdomainStt === "platform" ? prodUrlStt : devUrlStt;

// const baseURL2="https://coach-api-ovh.coachbots.com/api/v1" //local

const style = document.createElement('style');
style.textContent = `
    #dropdown {
        position: absolute;
        background-color: white;
        border: 1px solid #ccc;
        width: 200px;
        display: none;
        margin-top: 5px;
        z-index: 1000;
    }
    .dropdown-item {
        padding: 10px;
        cursor: pointer;
    }
    .dropdown-item:hover {
        background-color: #f1f1f1;
    }
    .hiddenn {
        display: none;
    }
`;
document.head.appendChild(style);


let deepChatPocElement2;
let sessionId2 = "";
let userId2 = "";
let userRole2;
let participantId2;
let testCode2;
let ipAddress2;
let user2;
let codeAvailabilityUserChoice2 = false;
let optedNo2 = false;
let questionIndex2 = 0;
let audioRes

let clientAllowAudioInteraction2; 
let userAllowAudioInteraction2;
let prioritiseUserAllowInteraction2;
let gShadowRoot2;
let globalReportUrl2 = "";
let conversation_id2;

//audio configs
let display_name2;
let content_type2;

let inputName2 = "";
let inputEmail2 = "";

let emailSent2;
let globalSignals;

// only for mcq type test
let globalQuestionDataStt;
let globalQuestionLengthStt;
let mcqQustionIndexStt = 0;
let mcqFormIdStt = 0;

let questionText2 = "";
let reportType2 = "interactionSessionReport";
let questionId2;
let userResponse2;
let reportUrl2 = "";

let testId2;
let resQuestionNumber2;
let questionLength2;
let questionData2;
let senarioDescription2;
let senarioTitle2;
let senarioCase2;
let senarioMediaDescription2;
let responsesDone2 = false;
let userName2 = "";
let userEmail2 = "";
let is_free2;
let testCodeList2;
let isRepeatStatus2;
let testPrevilage2;
let sessionStatusStt;
let isSessionExpiredStt;
let testType2;
let isHindiStt = false;
let testUIInfoStt;
let isProceedStt;
let initialQuestionTextStt;
let isSessionActiveStt = false;
let recommendationsStt = "";
let isTestSignedInStt;
let clientNameStt;
let questionMediaLinkStt;
let isImmersiveStt = false;
let mediaPropsStt;
let questionImageDataStt;
let initialIndexStt;
let isTranscriptOnlyStt = false;
let isBotInitialized = false;
let globalBotDetails;
let faqHtmlData = "";
let fitmentAnalysisInProgress = false;
let fitmentAnalysisIndex = 1;
let fitmentAnalysisQuestions;
let fitmentAnalysisQnA = {};
let feedbackBotIndex = 1;
let initialfeedbackBotQuestions;
let feedbackBotQuestions;
let feedbackBotQnA = {};
let isFeedbackConvEnd = false;
let isFeedbackConvInProcess = false;
let uniqueSesssionContainerId;
let FeedbackUserEmail;
let feedbackUserName;
let botId;
let sttWidgetClientId;
let botType;
let botScenarioCase;
let recommendationClicked = false;
let allowRecommendationTestCode = false;
let fitmentAnalysisOptions;
let IsPositiveFeedback = false;
let isBeginSessionProceed = false;
let botInitialQuestions;
let botInitialQuestionsIndex = 1;
let isAskingInitialQuestions = false;
let botInitialQuestionsQnA = {};
let isFitmentAllowed = false;
let isStrictFitment = false;
let isBotAudioResponse = false;
let isEmailFormstt = false;
let emailNameformJsonstt = {};
let formFieldsstt = [];
let CoachingForFitment;
let previousFitmentJson = {};
let userResponses2 = [];
let DuplicateResponseCount2 = 0;
let isAttemptingRecommendation = false;
let optedBeginSession = false;
let botWelcomeMessage = "";
let previousBotConversationId = "";
let isBotRecommendationFetched = false;
let isBotConversationPopulated = false;
let botIntakeQuestions;
let isIntakeInProgress = false;
let isIntakeCompleted = false;
let isIDPDiscussionOpted = false;
let botIntakeQna = {};
let isIntakeSummaryDisplayed = false;
let isIntakeClicked = false;
let IntakeUid = "";
let fitmentContainerId = 1;
let endSessionButton;
let intakeButton;
let isAnonymous = false;
let UserProfileInfo;
let sessionQnAdata = [];
let intakebuttonText = 'Pre-Check'
let askDeepDiveAccessCode = false;
let quickMatchMessage;
let isSomeActivityActive=false;
let askInitialQuestionDeepDive = false;
let deepDiveInitialQueIndex;

let selectedResponseType = undefined;

function createBasicAuthToken2(key2 = "", secret2 = "") {
  const token2 =
    "Yzc3MjFmZGItYTllMC00YTYxLWEzMTYtNDRhODA1N2VkMjY0OjhjNWNlZWZlLTY2Y2QtNDliZi04MTY5LTBhNjMwMmU5NmZlMA==";
  // "MDU2MTUwZWYtYjliYS00NTRlLTkzYTYtMDliZDdjNzFlYjNiOjFkOWMwZGJhLTI0OTAtNDZmYS1hMTNiLTU3Yjg5NDdhNjMwMg==";
  // "MzdkMGVkNzgtOTI5Ni00MWQwLTk1NjgtYjdjZTBhYjA2OTY5Ojk1ZGIxNTNkLWEzZWMtNDM0Zi05YjIwLTc0M2M3M2Q5ZDZkYg=="; //local
  return token2;
}

const basicAuthToken2 = createBasicAuthToken2(key2, secret2);

user2 = window.user;
console.log(user2);

let user_name2;
let user_email2;

if (window.user) {
  user_name2 = `${window.user.given_name} ${window.user.family_name ? window.user.family_name : ""}`;
  user_email2 = window.user.email;
} else {
  user_name2 = "coachbots_anonyoususer";
  user_email2 = getAnonymousEmail();
}

if (window.LogRocket) {
  window.LogRocket.identify(user_email2, {
    name: user_name2,
    email: user_email2,
  });
}

// 2 - account creation
console.log("user_name2", user_name2)
console.log("user_email2", user_email2)
fetch(`${baseURL2}/accounts/`, {
  method: "POST",
  headers: {
    Authorization: `Basic ${basicAuthToken2}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    user_context: {
      name: user_name2,
      role: "member",
      user_attributes: {
        tag: "deepchat_profile",
        attributes: {
          name: user_name2,
          username: user_name2,
          email: user_email2,
        },
      },
    },
    identity_context: {
      identity_type: "deepchat_unique_id",
      value: user_email2,
    },
  }),
})
  .then((response) => response.json())
  .then((data) => {
    console.log("START -> ", data)
    clientAllowAudioInteraction2 = data.client_allow_audio_interactions; 
    userAllowAudioInteraction2 = data.user_allow_audio_interactions;
    prioritiseUserAllowInteraction2 = data.prioritize_user_audio_interaction;
    selectedResponseType = data.preferences.response_style

    participantId2 = data.uid;
    userId2 = data.uid;
    userRole2 = data.role;
  })
  .catch((err) => console.log(err));

// sample recommendation data
let recommendationsDataStt = [
  [
    {
      title:
        "Pursuing career growth : Discussing the next steps in the career ladder",
      code: "QG8OTQR",
    },
    {
      title:
        "Pursuing professional development : Aligning career Goals with company's vision",
      code: "QMWNNU5",
    },
  ], // batch one
  [
    {
      title:
        "Handling change and uncertainty : Navigating uncertainty in a new role",
      code: "QXA0FHL",
    },
    {
      title:
        "Handling change and uncertainty : Seeking Guidance on Adapting to New Leadership",
      code: "QTXLXON",
    },
  ], // batch two
  [
    {
      title: "Team building & Leadership : Teams using Agile Strategies",
      code: "QQJPCFI",
    },
    {
      title:
        "Leadership initiatives : Seeking Guidance on Leading Team Through Crisis",
      code: "QO269IW",
    },
  ], // batch three
  [
    {
      title:
        "Making ethical decisions : Evaluating Cost vs. Sustainability in Procurement",
      code: "QHZPPK1",
    },
    {
      title:
        "Resource allocation decisions : Securing Project Resources from other teams",
      code: "QDL75HD",
    },
  ], // batch four
  [
    {
      title:
        "Managing Work Life Balance: Balancing Workload and Setting Boundaries Discussion",
      code: "QTTDTXG",
    },
    {
      title:
        "Managing Team Conflicts : Addressing Team Conflicts Over Missed Deadline",
      code: "QWN8XTF",
    },
  ], // batch five
  [
    {
      title:
        "Collaborating on resource allocation : Resource Allocation Tensions",
      code: "QSKUOD0",
    },
    {
      title: "Navigating team dynamics: Aligning Team Direction",
      code: "QKN7VPO",
    },
  ], // batch six
  [
    {
      title:
        "Strategizing cross functional projects: Navigating cross-project challenges",
      code: "Q7E1DGY",
    },
    {
      title:
        "Interdepartmental collaboration : Harmonizing Data Interpretations",
      code: "QP22B9R",
    },
  ], // batch seven
];

const emojis = ['😀','😃','😄','😁','😆','😅','🤣','😂','🙂','🙃','😉','😊','😇','🥰','😍','🤩','😘','😗','☺️','😚','😙','😋','😛','😜','🤪','😝','🤑','🤗','🤭','🤫','🤔','🤐','🤨','😐️','😑','😶','😏','😒','🙄','😬','🤥','😌','😔','😪','😮‍','💨','🤤','😴','😷','🤒','🤕','🤢','🤮','🤧','🥵','🥶','😶‍','🌫️','🥴','😵‍','💫','😵','🤯','🤠','🥳','😎','🤓','🧐','😕','😟','🙁','☹️','😮','😯','😲','😳','🥺','😦','😧','😨','😰','😥','😢','😭','😱','😖','😣','😞','😓','😩','😫','🥱','😤','😡','😠','🤬']

// sample TEst codes
const sampleTestCodesStt = {
  QEEG5VY: "AWS Cloud Training",
  QMFMKQ4: "Team Building Post Training Check In",
  QUPR9AO: "Education Sales Rep Selling A Diploma Course",
  QLDQ2IY: "Coaching Assistant In Assertive Communication",
  QKLX4V0: "Hotel Receptionist Handle Angry Guest",
  QULNNNE: "Luxury Real Estate Sales Agent",
  QZ4R9QW: "Cabin Crew Dealing With Angry Customer",
  QJV5AEY: "Bank Branch Employee Service Call",
  QEYTB3I: "First Time Manager Feedback In Corporate Office",
  QYCZJDN: "Patient Care By Nurse",
  Q125Z1B: "Factory Shop Floor Leadership",
  Q9QW1HF: "Health Package Sales Rep Discussion",
  QHYRLGN: "Insurance Sales Rep Call",
  QJZWYYB: "IT Requirements Gathering",
};

const fitment_analysis = {
  coaching_intake: {
    1: "Can you share a bit about your background and the specific goals you hope to achieve?",
    2: "What do you expect to gain from these sessions?",
    3: "How do you learn best?",
    4: "What are the three biggest changes you'd like to make in your life within the near future?",
    5: "How do you prefer to communicate and receive feedback?",
    6: "Are there any specific values that are important to you, and that you would like your coach to be aware of?",
    7: "What challenges or obstacles do you anticipate in achieving your goals, and how do you envision the coach supporting you in overcoming them?",
  },
  mentoring_intake: {
    1: "What are your career goals and how can I help support you in working towards them?",
    2: "What strengths do you hope to enhance through this mentorship?",
    3: "How do you best learn new information or skills?",
    4: "What challenges are you currently facing that you'd like advice on?",
    5: "Are there specific milestones or achievements you're aiming for?",
    6: "How often would you like to meet and what's the best way to communicate between sessions?",
    7: "What motivated you to seek out a mentorship relationship?",
  },
};



function isTestCode(text) {
  return text.length == 7 && (text[0] == "q" || text[0] == "Q");
}

function isDuplicateResponse(text) {
  return userResponses2.includes(text);
}

function getAnonymousEmail() {
  const user_name = "coachbots_anonyoususer";
  const user_sid = getOrSetSessionId();
  const user_email = `${user_name}-${user_sid}@gmail.com`;

  return user_email;
}

function isEmail(emailAdress){
  let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

if (emailAdress.match(regex)) 
  return true; 

 else 
  return false; 
}

function getOrSetSessionId() {
  let generatedSessionId = "";
  const retrievedSessionId = localStorage.getItem("coachbots-session-id");
  if (retrievedSessionId) {
    console.log("SessionId found in SessionStorage.");
    generatedSessionId = retrievedSessionId;
  } else {
    console.log("No sessionId found in SessionStorage. So setting it now.");
    generatedSessionId = "generateSessionId()";
    localStorage.setItem("coachbots-session-id", generatedSessionId);
  }
  return generatedSessionId;
}


const getUserOrAnonymousDetailsDeepDive = async (choice) => {
  console.log(choice);
  disableOrEnableButtons(`anonymous-${uniqueSesssionContainerId}`);
  if (choice === "No") {
    isAnonymous = false;
    if (!window.user) {
      isEmailFormstt = true;
      formFieldsstt = ["name","email"];
      console.log("### formFieldsstt : ",formFieldsstt, "other data: ",`<b>Please enter your ${formFieldsstt[0]}</b>`)
      appendMessage2(`<b>Please enter your ${formFieldsstt[0]}</b>`);
    }
    else{
      // we are asking initial question
      askInitialQuestionDeepDive=true;
      deepDiveInitialQueIndex = 1;
      appendMessage2(botInitialQuestions[`${deepDiveInitialQueIndex}`])
    }
  }
  else if (choice === "Yes") {
    // appendMessage2("<p>Please click on <b>Begin Session</b> to continue..</p>")
    // appendMessage2("Please let us know more about your context for this survey such as role , impact  and whatever else you may feel comfortable with.")
    isAnonymous = true;
    if (!window.user) {
      isEmailFormstt = true;
      formFieldsstt = ["name","email"];
      console.log("### formFieldsstt : ",formFieldsstt, "other data: ",`<b>Please enter your ${formFieldsstt[0]}</b>`)
      appendMessage2(`<b>Please enter your ${formFieldsstt[0]}</b>`);
    }
    else{
      askInitialQuestionDeepDive=true;
      deepDiveInitialQueIndex = 1;
      appendMessage2(botInitialQuestions[`${deepDiveInitialQueIndex}`])
    }

  }

  isSomeActivityActive = false;


}

const startDeepDiveConv = () => {

  gShadowRoot2.getElementById("text-input").focus();
  setTimeout(() => {
    gShadowRoot2.getElementById("text-input").textContent = "START";
    gShadowRoot2.querySelectorAll(".input-button")[1].click();

    
    setTimeout(() => {

      var chatElement = document.getElementById("chat-element2");
    const shdwroot = chatElement.shadowRoot;
    const messageContainers = shdwroot.querySelectorAll(".outer-message-container")
    console.log('deepdive-msgcont',messageContainers)
    messageContainers.forEach((container) => {
      console.log('deepdive-cont',container)
      const messageText = container.querySelector(".user-message-text p");
      if (
        messageText &&
        messageText.textContent.trim().toLowerCase() === "start"
      ) {
        container.remove();
      }
    });
    }, 100);
  }, 100);
}

const getUserOrAnonymousDetails = async (choice) => {
  console.log(choice);
  disableOrEnableButtons(`anonymous-${uniqueSesssionContainerId}`);
  if (choice === "No") {
    if (!window.user) {
      isAnonymous = false;
      let emailForm;
      if (window.innerWidth > 768) {
        emailForm = `<div id="feedback-email-form"style="min-width: 730px;>
          <b>Please Enter your email</b>
          <div
            id="feedback-email-input"
            style="
            display: flex;
            flex-direction: row;
            min-width: 100%;
            gap: 1rem;
            align-items: center;
          "
          >
            <div style="display: flex; flex-direction: column; width: 45%;">
              <label for="email" style="margin: 12px 0 4px 0">Email</label>
              <input
                id="feedback-email-input2"
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
              id="submit-btn2"
              onclick="feedbackBotInitialFlow('save_email')"
            >
              Submit
            </button>
          </div>
        </div>`;
      } else {
        emailForm = `<div if = "feedback-email-form" style="min-width: 200px;">
        <b>Please Enter your email</b>
        <div
          id="feedback-email-input"
          style="
          display: flex;
          flex-direction: column;
          min-width: 100%;
          gap: 8px;
          align-items: flex-start;
          justify-content: flex-start;
        "
        >
          <div style="display: flex; flex-direction: column; width: 100%;">
            <label for="email" style="margin: 12px 0 4px 0">Email</label>
            <input
              id="feedback-email-input2"
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
            id="submit-btn2"
            onclick="onclick="feedbackBotInitialFlow('save_email')""
          >
            Submit
          </button>
        </div>
      </div>`;
      }
      // appendMessage2(emailForm)
      isEmailFormstt = true;
      formFieldsstt = ["name","email"];
      console.log("### formFieldsstt : ",formFieldsstt, "other data: ",`<b>Please enter your ${formFieldsstt[0]}</b>`)
      appendMessage2(`<b>Please enter your ${formFieldsstt[0]}</b>`);
    } else {
      FeedbackUserEmail = user.email;
      console.log("jiks FeedbackUserEmail", FeedbackUserEmail);
      const thumbsupdiv = await feedbackBotInitialFlow("save_email");
      appendMessage2(thumbsupdiv);
    }
  } else if (choice === "Yes") {
    console.log("hi");
    FeedbackUserEmail = "Anonymous User";
    isAnonymous = true;
    const thumbsupdiv = await feedbackBotInitialFlow("save_email");
    appendMessage2(thumbsupdiv);
  }
};

const restartFeedbackProcess = async () => {
  disableOrEnableButtons(`restart_feedback-${uniqueSesssionContainerId}`);
  feedbackBotInitialFlow("initial");
  feedbackBotIndex = 1;
  feedbackBotQnA = {};
  isFeedbackConvEnd = false;
  isFeedbackConvInProcess = false;
};

const handleFeedbackSubmit = async () => {
  if (isFeedbackConvInProcess) {
    return;
  }
  disableOrEnableButtons(`submit_feedback-${uniqueSesssionContainerId}`);

  appendMessage2("<p> That's it Thank you for your feedback.");
  appendMessage2(`
  <div id="restart_feedback-${uniqueSesssionContainerId}">
  <b>Want to give another feedback?</b>
  <button style="margin-top:5px;  width:fit-content; padding:6px 12px; border: 1px solid lightgray; border-radius: 4px;"  onmouseover="this.style.cursor ='pointer'" onclick="restartFeedbackProcess()">Yes</button>
  </div>
    `);
  increaseActionPointStt(userId2, "feedback_given");
  const queryparams = new URLSearchParams({
    conversation: JSON.stringify(feedbackBotQnA),
    bot_id: botId,
    type_of_email: "feedback_conv",
    user_email: FeedbackUserEmail,
    user_name: feedbackUserName,
    is_positive: IsPositiveFeedback ? "True" : "False",
  });

  console.log('user_email',FeedbackUserEmail)

  // sending feedback conversation to bot owner
  const response = await fetch(
    `${baseURL2}/test-attempt-sessions/send-feedback-transcript-email/?${queryparams}`,
    {
      method: "GET",
      headers: {
        Authorization: `Basic ${createBasicAuthToken2(key2, secret2)}`,
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      console.log("Dynamic mcq response : ", data);
    });

  // saving feedback to database
  const queryparam = new URLSearchParams({
    method: "post",
    qna: JSON.stringify(feedbackBotQnA),
    bot_id: botId,
    is_positive: IsPositiveFeedback ? "True" : "False",
    qna_type: "feedback",
    user_id: userId2,
    is_anonymous: isAnonymous ? "True" : "False",
  });

  const resp = await fetch(
    `${baseURL2}/accounts/get-user-feedback-data/?${queryparam}`,
    {
      method: "GET",
      headers: {
        Authorization: `Basic ${createBasicAuthToken2(key2, secret2)}`,
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      console.log("Dynamic mcq response : ", data);
    });
};
const handleEndFeedback = async () => {
  if (isFeedbackConvEnd) {
    return;
  }
  isFeedbackConvEnd = true;
  appendMessage2("<p> That's it Thank you for your feedback.");
  increaseActionPointStt(userId2, "feedback_given");
  const queryparams = new URLSearchParams({
    conversation: JSON.stringify(feedbackBotQnA),
    bot_id: botId,
    type_of_email: "feedback_conv",
    user_email: FeedbackUserEmail,
    user_name: feedbackUserName,
  });

  // sending feedback conversation to bot owner
  const response = await fetch(
    `${baseURL2}/test-attempt-sessions/send-feedback-transcript-email/?${queryparams}`,
    {
      method: "GET",
      headers: {
        Authorization: `Basic ${createBasicAuthToken2(key2, secret2)}`,
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      console.log("Dynamic mcq response : ", data);
    });

  const queryparam = new URLSearchParams({
    method: "post",
    qna: JSON.stringify(feedbackBotQnA),
    bot_id: botId,
    is_positive: IsPositiveFeedback ? "True" : "False",
    qna_type: "feedback",
    is_anonymous: isAnonymous ? "True" : "False",
    user_id: userId2,
  });

  const resp = await fetch(
    `${baseURL2}/accounts/get-user-feedback-data/?${queryparam}`,
    {
      method: "GET",
      headers: {
        Authorization: `Basic ${createBasicAuthToken2(key2, secret2)}`,
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(" response : ", data);
    });

  // resetAllVariablesStt()
  appendMessage2(
    "please wait while we are getting some recommendations for you..."
  );

  try {
    const params = new URLSearchParams({
      context: JSON.stringify(feedbackBotQnA),
      for: "feedback_bot",
    });
    const response = await fetch(
      `${baseURL2}/tests/get-recommendetion-tests/?${params}`,
      {
        method: "GET",
        headers: {
          Authorization: `Basic ${createBasicAuthToken2(key2, secret2)}`,
        },
      }
    );

    const recommendation_tests_data = await response.json();

    const fetched_test_code = Object.keys(
      recommendation_tests_data.matching_tests
    )[0];
    const fetched_test =
      recommendation_tests_data.matching_tests[fetched_test_code];

    const created_test_code = Object.keys(
      recommendation_tests_data.created_scenario
    )[0];
    const created_test =
      recommendation_tests_data.created_scenario[created_test_code];
    console.log(
      "fetched_test : ",
      fetched_test,
      recommendation_tests_data.matching_tests,
      "created_test : ",
      created_test
    );

    appendMessage2(
      `<b >Here are some recommendations for you : </b> <br>
          <button onmouseover="this.style.cursor ='pointer'" style="margin-top:5px; width:100%; padding:6px 4px; border: 1px solid lightgray; border-radius: 4px;" onclick="handleSurpriseMeButtonClick2('${created_test_code}','${created_test}')">${created_test}      (experimental)</button>
          `
    );
    console.log(
      "recommendation_tests_data : ",
      recommendation_tests_data.matching_tests
    );
    recommendationClicked = false;
    isFeedbackConvEnd = true;
  } catch (error) {
    console.error(`Error in get recommendation tests: ${error}`);
  }
};

function renameKey(obj) {
  let newObj = {};
  for (const key in obj) {
    const oldKey = key;
    const newKey = parseInt(oldKey) + 1;
    newObj[`${newKey}`] = obj[oldKey];
  }
  console.log(newObj);
  return newObj;
}

const feedbackBotQnAFlow = (flow) => {
  disableOrEnableButtons(`thumbsup-down-${uniqueSesssionContainerId}`);
  console.log("isAnonymous =>", isAnonymous, "flow => ",flow);
  if (flow === "up") {
    feedbackBotQuestions = renameKey(initialfeedbackBotQuestions);
    feedbackBotQuestions["1"] = "Why are you giving me a thumbs up today?";

    IsPositiveFeedback = true;
    const queryparams = new URLSearchParams({
      conversation: "",
      bot_id: botId,
      type_of_email: "like",
      user_email: FeedbackUserEmail,
      user_name: feedbackUserName,
    });
    const response = fetch(
      `${baseURL2}/test-attempt-sessions/send-feedback-transcript-email/?${queryparams}`,
      {
        method: "GET",
        headers: {
          Authorization: `Basic ${createBasicAuthToken2(key2, secret2)}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Dynamic mcq response : ", data);
      });

    console.log("sent email");
    feedbackBotIndex += 1;
    isFeedbackConvInProcess = true;
    appendMessage2(feedbackBotQuestions[feedbackBotIndex]);
    // setTimeout(() => {
    //   appendMessage2(
    //     `<button style="margin-top:5px; width:100%; padding:6px 4px; border-radius: 4px; border: 1px solid darkgray; padding: 4px 8px;" onclick="handleEndFeedback()">End</button>`
    //   );
    // }, 200);
  } else if (flow === "down") {
    console.log("### FeedbackbotQuestions before rename => ", feedbackBotQuestions)
    feedbackBotQuestions = renameKey(initialfeedbackBotQuestions);
    console.log("### FeedbackbotQuestions  after rename => ", feedbackBotQuestions)
    feedbackBotQuestions["1"] = "Why are you giving me a thumbs down today?";
    console.log("### FeedbackbotQuestions after indexing => ", feedbackBotQuestions)
    isFeedbackConvInProcess = true;
    feedbackBotIndex += 1;
    appendMessage2(feedbackBotQuestions[feedbackBotIndex]);

    const queryparams = new URLSearchParams({
      conversation: "",
      bot_id: botId,
      type_of_email: "dislike",
      user_email: FeedbackUserEmail,
      user_name: feedbackUserName,
    });
    const response = fetch(
      `${baseURL2}/test-attempt-sessions/send-feedback-transcript-email/?${queryparams}`,
      {
        method: "GET",
        headers: {
          Authorization: `Basic ${createBasicAuthToken2(key2, secret2)}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Dynamic mcq response : ", data);
      });

    console.log("sent email");
    // setTimeout(() => {
    //   appendMessage2(
    //     `<button style="margin-top:5px; width:100%; padding:6px 4px; border-radius: 8px; " onclick="handleEndFeedback()">End</button>`
    //   );
    // }, 200);
  }
};

const feedbackBotInitialFlow = async (flow) => {
  if (flow === "initial") {
    uniqueSesssionContainerId = generateRandomAlphanumeric(6);
    console.log("feedbacksessionid: ", uniqueSesssionContainerId);
    const anonymous_text = `<div id="anonymous-${uniqueSesssionContainerId}">
        <b>Want to continue as Anonymous?</b>
        </br> <div>
            <button onmouseover="this.style.cursor ='pointer'" style="margin-top:5px; width:fit-content; padding:6px 12px; border: 1px solid lightgray; border-radius: 4px;" onclick="getUserOrAnonymousDetails('Yes')">Yes</button>
            <button onmouseover="this.style.cursor ='pointer'" style="margin-top:5px; width:fit-content; padding:6px 12px; border: 1px solid lightgray; border-radius: 4px;" onclick="getUserOrAnonymousDetails('No')">No</button>
            </div>
        </div>`;
    appendMessage2(anonymous_text);
  } else if (flow === "save_email") {
    if (!window.user && FeedbackUserEmail != "Anonymous User") {
      // const shadowRoot2 = document.getElementById("chat-element2").shadowRoot;
      // FeedbackUserEmail = shadowRoot2.getElementById("feedback-email-input2").value;
      
      console.log("emailNameformJsonstt", emailNameformJsonstt);
      FeedbackUserEmail = emailNameformJsonstt["email"];

      // if(! isEmail(FeedbackUserEmail)){
      //   appendMessage2("<p style='font-size: 14px;color: #991b1b;'> please enter a valid email to continue </p>");
        // feedbackBotInitialFlow("save_email");
        // return;
        // signals.onResponse({
        //   html: "<p style='font-size: 14px;color: #991b1b;'>Not allowed! choose option to continue. </p>",
        // });
        // return;
      // }

      // const gshadowRoot = document.getElementById("chat-element2").shadowRoot;
      // const msg = gshadowRoot.getElementById("feedback-email-form");
      // button.parentNode.removeChild(button)
      // const que_msg = document.createElement("div");
      // que_msg.innerHTML = "Thank You"; // You can customize the message here
      // // Replace the button with the "Thank you" message
      // msg.parentNode.replaceChild(que_msg, msg);
    }
    feedbackBotIndex = 0;
    const div_cont = `<div id="thumbsup-down-${uniqueSesssionContainerId}" >
        
        <b style="margin-bottom: 4px;">What is your first general impression feedback about me?</b>
            <br>
            <button onmouseover="this.style.cursor ='pointer'" style="margin-top:5px; width:20%; padding:6px 4px; border: 1px solid lightgray; border-radius: 4px;" onclick="feedbackBotQnAFlow('up')"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#148f56" class="bi bi-hand-thumbs-up" viewBox="0 0 16 16">
            <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2 2 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a10 10 0 0 0-.443.05 9.4 9.4 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a9 9 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.2 2.2 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.9.9 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"/>
          </svg></button>
            <button onmouseover="this.style.cursor ='pointer'" style="margin-top:5px; width:20%; padding:6px 4px; border: 1px solid lightgray; border-radius: 4px;" onclick="feedbackBotQnAFlow('down')">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#d71414" class="bi bi-hand-thumbs-down" viewBox="0 0 16 16"><path d="M8.864 15.674c-.956.24-1.843-.484-1.908-1.42-.072-1.05-.23-2.015-.428-2.59-.125-.36-.479-1.012-1.04-1.638-.557-.624-1.282-1.179-2.131-1.41C2.685 8.432 2 7.85 2 7V3c0-.845.682-1.464 1.448-1.546 1.07-.113 1.564-.415 2.068-.723l.048-.029c.272-.166.578-.349.97-.484C6.931.08 7.395 0 8 0h3.5c.937 0 1.599.478 1.934 1.064.164.287.254.607.254.913 0 .152-.023.312-.077.464.201.262.38.577.488.9.11.33.172.762.004 1.15.069.13.12.268.159.403.077.27.113.567.113.856s-.036.586-.113.856c-.035.12-.08.244-.138.363.394.571.418 1.2.234 1.733-.206.592-.682 1.1-1.2 1.272-.847.283-1.803.276-2.516.211a10 10 0 0 1-.443-.05 9.36 9.36 0 0 1-.062 4.51c-.138.508-.55.848-1.012.964zM11.5 1H8c-.51 0-.863.068-1.14.163-.281.097-.506.229-.776.393l-.04.025c-.555.338-1.198.73-2.49.868-.333.035-.554.29-.554.55V7c0 .255.226.543.62.65 1.095.3 1.977.997 2.614 1.709.635.71 1.064 1.475 1.238 1.977.243.7.407 1.768.482 2.85.025.362.36.595.667.518l.262-.065c.16-.04.258-.144.288-.255a8.34 8.34 0 0 0-.145-4.726.5.5 0 0 1 .595-.643h.003l.014.004.058.013a9 9 0 0 0 1.036.157c.663.06 1.457.054 2.11-.163.175-.059.45-.301.57-.651.107-.308.087-.67-.266-1.021L12.793 7l.353-.354c.043-.042.105-.14.154-.315.048-.167.075-.37.075-.581s-.027-.414-.075-.581c-.05-.174-.111-.273-.154-.315l-.353-.354.353-.354c.047-.047.109-.176.005-.488a2.2 2.2 0 0 0-.505-.804l-.353-.354.353-.354c.006-.005.041-.05.041-.17a.9.9 0 0 0-.121-.415C12.4 1.272 12.063 1 11.5 1"/>
          </svg>
          </button>
        </div>`;
    return div_cont;
  }
};

const getUserBotConversation = async (participant_id) => {
  const url = `${baseURL2}/coaching-conversations/bot-conversation-data/?for=user&user_id=${participant_id}&bot_id=${botId}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Basic ${createBasicAuthToken2(key2, secret2)}`,
      },
    });

    const botConv = await response.json();
    console.log(
      "PRevious conversations",
      botConv
    );
    let botConversations;
    if (botConv.length > 0) {
      botConv.forEach((element) => {
        if (element.bot_id === botId) {
          botConversations = element;
          console.log("bot_conv", botConversations);
        }
      });
      if (botConversations["results"].length > 0) {
        const lastConv =
          botConversations["results"][botConversations["results"].length - 1];
        console.log(
          "last converstion session",
          lastConv.uid,
          lastConv.session_id,
          lastConv
        );
        previousBotConversationId = `${lastConv.uid}:${lastConv.session_id}:${lastConv.coach_message_text}`;
      }
    }
  } catch (error) {
    console.error(`Error in getUserBotConversation: ${error}`);
  }
};

async function populateBotConversation(participant_id) {
  const url = `${baseURL2}/coaching-conversations/bot-conversation-data/?for=user&user_id=${participant_id}&bot_id=${botId}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Basic ${createBasicAuthToken2(key2, secret2)}`,
    },
  });

  const botConv = await response.json();
  console.log("PRevious conversations", botConv);
  if (botConv.length > 0) {
    // disabling intakebutton
    // if (botType === "avatar_bot") {
    //   if (intakeButton) {
    //     intakeButton.disabled = true;
    //     intakeButton.style.backgroundColor = "#d3d3d3";
    //     intakeButton.style.color = "#a0a0a0";
    //     intakeButton.removeAttribute("onmouseover");
    //     intakeButton.removeAttribute("onmouseleave");
    //   }
    // }

    console.log("populating conversation");
    let botConversations;
    botConv.forEach((element) => {
      if (element.bot_id === botId) {
        botConversations = element;
      }
    });

    if (botType === "user_bot") {
      // setting previous session and conversation id
      if (botConversations["results"].length > 0) {
        const lastConv =
          botConversations["results"][botConversations["results"].length - 1];
        console.log(
          "last converstion session",
          lastConv.uid,
          lastConv.session_id,
          lastConv
        );
        conversation_id2 = lastConv.uid;
        sessionId2 = lastConv.session_id;
        coachMessage = lastConv.coach_message_text;
        isBotInitialized = true;
        isSessionActiveStt = true;
      }
    }

    const results = botConversations["results"];
    results.forEach((element,index) => {
      const coach_message_text = element["coach_message_text"];
      const participant_message_text = element["participant_message_text"];
      
      if (coach_message_text && coach_message_text !== "" && index !== 0) {
        appendMessage2(coach_message_text);
      }
      if (participant_message_text && participant_message_text !== "") {
        if (participant_message_text && participant_message_text !== "") {
          appendMessageForUser2(participant_message_text.replace(" I am not sure if you are getting my point, let me know and I can explain further.", "").replace(" Always respond in less than 50 tokens. Note: Never mention token count.", ""));
        }
      } else if (participant_message_text && participant_message_text !== "") {
        if (participant_message_text && participant_message_text !== "") {
          appendMessageForUser2(participant_message_text.replace(" I am not sure if you are getting my point, let me know and I can explain further.", "").replace(" Always respond in less than 50 tokens. Note: Never mention token count.", ""));
        }
      } else if (participant_message_text && participant_message_text !== "") {
        // If there's no coach message, only append participant message
        appendMessageForUser2(participant_message_text.replace(" I am not sure if you are getting my point, let me know and I can explain further.", "").replace(" Always respond in less than 50 tokens. Note: Never mention token count.", ""));
      }
     
      // if (coach_message_text && coach_message_text !== "") {
      //   appendMessage2(coach_message_text);

      //   if (participant_message_text && participant_message_text !== "") {
      //     appendMessageForUser2(participant_message_text);
      //   }
      // } else if (participant_message_text && participant_message_text !== "") {
      //   // If there's no coach message, only append participant message
      //   appendMessageForUser2(participant_message_text);
      // }
    });
    isBotConversationPopulated = true;
  } else {
    if (botType === "user_bot") {
      appendMessage2(
        addStickerToMessage(
          "Welcome",
          "Very good day! Looks like you are all set to start your session. Let me know what would you like to discuss today?"
        )
      );
    }
  }
}

const saveBotEngagement = (bot_id, user_id, field_name) => {
  const myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    `Basic ${createBasicAuthToken2(key2, secret2)}`
  );

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
  };

  fetch(
    `${baseURL2}/test-attempt-sessions/create-or-get-bot-engagements/?bot_id=${bot_id}&user_id=${user_id}&field_name=${field_name}`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => console.log("bot engagement button clicked", result))
    .catch((error) =>
      console.error("got error in bot engagement button clicked", error)
    );
};

const getUserProfile = async (user_id) => {
  await fetch(
    `${baseURL2}/accounts/coach-coachee-mentor-mentee-profile/?user_id=${user_id}`,
    {
      method: "GET",
      headers: {
        Authorization: `Basic ${createBasicAuthToken2(key2, secret2)}`,
      },
    }
  )
    .then((resp) => resp.json())
    .then((result) => {
      console.log("user profile", result.data);
      if (result.data.length > 0) {
        const userProfile = result.data[0];
        console.log(userProfile);
        UserProfileInfo = userProfile;
      }
    })
    .catch((error) => console.error("got error in user_profile", error));
};

const getIdps = async (user_id) =>{
  try{
    const resp = await fetch(`${baseURL2}/accounts/get_or_create_idp/?user_id=${user_id}`, {
      method: "GET",
      headers: {
        Authorization: `Basic ${createBasicAuthToken2(key2,secret2)}`,
      },
    })
    result = await resp.json()
    if(result.length > 0){
      return true; // means there is idp so proceed idp related question
    }else{
      return false;
    }
  } catch (error) {
    console.error("Error while fetching idp details", error);
    return false;
  }
  

    
}

const getBotDetails2 = async (botId) => {
  try {
    const response = await fetch(
      `${baseURL2}/accounts/get-bot-details/?bot_id=${botId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Basic ${createBasicAuthToken2(key2, secret2)}`,
        },
      }
    );

    const botDetails = await response.json();
    console.log("Bot Details : ", botDetails);
    console.log("FAQS => ", botDetails.data.faqs);
    globalBotDetails = botDetails;
    botType = botDetails.data.bot_type;
    botScenarioCase = botDetails.data.scenario_case;
    

    if (botType === "user_bot") {
      botWelcomeMessage = "Welcome to my custom bot.";
    } else if (botType === "deep_dive") {
      botWelcomeMessage = " Welcome to the deep dive survey. Consider this as a check in to get your detailed point of view around the topic mentioned on this on this page. The response to the survey can be totally anonymous - so repond frankly and give voice to critical topics important to the team. Click  begin 'session' to get started and respond in detail.";
    } else if (botType === "avatar_bot") {
      botWelcomeMessage =
        "Welcome to my Coach AI Frame. I have curated some FAQs about my practice. Additionally I am trained to answer other questions that you may have. Don't worry I will be personally looking at the conversation offline and if my AI Frame gets something wrong, I will correct it. We all are learning after all!";
    } else if (botType === "feedback_bot") {
      botWelcomeMessage = addStickerToMessage(
        "Welcome",
        "Welcome to my feedback bot. I am delighted that you are considering leaveing me a feedback. It really means a lot to me."
      );
    } else {
      botWelcomeMessage = botDetails.data.attributes.heading;
    }
    console.log(botType);

    //footer of the bots according to bot type
    const botFooterElement = document.getElementById("bot-footer");
    // if (
    //   botType === "subject_matter_bot" ||
    //   botType === "helper_bot" ||
    //   botType === "coachbots"
    // ) {
    //   botFooterElement.innerHTML =
    //     "<p>The Expert bots work curated framework and knowledge. Unrelated questions may case errors. For optimum results use 15 words or more in response.</p>";
    // } else if (botType === "avatar_bot") {
    //   botFooterElement.innerHTML = `<p>AI Frame works based on the coach-provided background. For optimum results use 15 words or more in response.</p>`;
    // } else if (botType === "feedback_bot") {
    //   botFooterElement.innerHTML = `<p>Please note that the "SUBMIT" button at the end of the feedback button must be clicked in order to record the feedback. Only postive feedback is displayed in the wall. The negative feedback is privately delivered by the system.</p>`;
    // } else if (botType === "user_bot") {
    //   botFooterElement.innerHTML = `<p>User created bot based on enterprise & personal knowledge.</p>`;
    // }

    let buttons = "";
    let buttonsWrapper = document.createElement("div");
    buttonsWrapper.setAttribute(
      "style",
      "display: flex; flex-direction: row; gap : 4px; width: fit-content; overflow: scroll; padding-bottom: 2px; scrollbar-width : none; scrollbar-width: none; "
    );

    const faqButtonsGenerator = (actionName, buttonText) => {
      const button = document.createElement("button");
      button.setAttribute(
        "style",
        `width: fit-content; padding: 4px 8px; font-size: 12px; border: 1px solid lightgray; border-radius: 4px; min-width: fit-content;`
      );
      button.setAttribute(
        "onmouseover",
        "this.style.backgroundColor = '#e5e7eb'"
      );
      button.setAttribute(
        "onmouseleave",
        "this.style.backgroundColor = 'transparent'"
      );
      button.setAttribute("onclick", `handleFaqButtonClick('${actionName}')`);
      button.innerText = buttonText;
      buttonsWrapper.appendChild(button);
    };

    if (botDetails.data.faqs && !["user_bot",'deep_dive'].includes(botType)) {
      let faqs = Object.keys(botDetails.data.faqs);
      if (faqs.length > 0) {
        // faqs.forEach((title) => {
        //   faqButtonsGenerator(title, title);
        // });
        faqButtonsGenerator("know_your_coach", "Know your coach");
      }
    }

    // faqButtonsGenerator("recommendations", "Recommendations");

    // if (
    //   botType === "avatar_bot" ||
    //   botType === "helper_bot" ||
    //   botType === "coachbots"
    // ) {
    //   if(['role_bot','skill_bot','skill_guide'].includes(botDetails.data.scenario_case) ){
    //     intakebuttonText = 'Orientation'
    //   }
    //   // faqButtonsGenerator("intake", "Intake");
    //   intakeButton = document.createElement("button");
    //   intakeButton.setAttribute(
    //     "style",
    //     `width: fit-content; padding: 4px 8px; font-size: 12px; border: none; border-radius: 4px; min-width: fit-content; background : #dc2626; color : white;`
    //   );
    //   intakeButton.setAttribute(
    //     "onmouseover",
    //     "this.style.backgroundColor = '#f87171'"
    //   );
    //   intakeButton.setAttribute(
    //     "onmouseleave",
    //     "this.style.backgroundColor = '#dc2626'"
    //   );
    //   intakeButton.setAttribute("onclick", `handleFaqButtonClick('intake')`);
    //   intakeButton.innerText = intakebuttonText;
    //   buttonsWrapper.appendChild(intakeButton);
    // }

    function convertTextToCorrectFormat(text) {
      return text
        .replace(/_/g, " ") 
        .split(/\s+/)
        .map((word) =>
          word.replace(/(?:^|\s)([a-z])/g, (match, group) =>
            group.toUpperCase()
          )
        )
        .join(" ");
    }

    function convertTextToOriginalFormat(text) {
      return text
        .split(/\s+/)
        .map((word) =>
          word.replace(/(?:^|\s)([A-Z])/g, (match, group) =>
            group.toLowerCase()
          )
        )
        .join("_");
    }

    let dropdownButtonText = "Styles";
    if (selectedResponseType) {
      dropdownButtonText =
        "Response style : " +
        `<b>${convertTextToCorrectFormat(selectedResponseType)}</b>`;
    }

    if (["avatar_bot"].includes(botType)) {
      const dropdownButton = document.createElement("button");
      dropdownButton.id = "styles-dropdown-button";
      dropdownButton.innerHTML = dropdownButtonText;
      dropdownButton.setAttribute(
        "style",
        `width: fit-content; padding: 4px 8px; font-size: 12px; border: none; border-radius: 4px; min-width: fit-content; background : lightgray; color: black;`
      );
      buttonsWrapper.appendChild(dropdownButton);

      const dropdown = document.createElement("div");
      dropdown.id = "dropdown";
      dropdown.style.position = "absolute";
      dropdown.style.backgroundColor = "#f3f4f6";
      dropdown.style.borderRadius = "4px";
      dropdown.style.border = "1px solid #1f2937";
      if (window.innerWidth < 768) {
        dropdown.style.bottom = "7rem";
        dropdown.style.left = "1rem";
      } else {
        dropdown.style.bottom = "6rem";
        dropdown.style.left = "6rem";
      }
      dropdown.classList.add("hiddenn");

      const options = [
        "crusader",
        "cheerleader",
        "change_manager",
        "calculator",
        "chatter",
        "co_creator",
      ];
      options.forEach((option, i) => {
        const item = document.createElement("div");

        item.style.padding = "8px 12px";
        item.style.fontSize = "14px";
        if (window.innerWidth < 768) {
          item.style.fontSize = "12px";
        } else {
          item.style.fontSize = "14px";
        }
        item.setAttribute(
          "onmouseover",
          "this.style.backgroundColor = '#e5e7eb',this.style.cursor = 'pointer', this.style.borderRadius = '4px'"
        );
        item.setAttribute(
          "onmouseleave",
          "this.style.backgroundColor = '#f3f4f6',this.style.cursor = 'default', this.style.borderRadius = '4px'"
        );
        if (i !== options.length - 1) {
          item.style.borderBottom = "1px solid #1f2937";
        }
        item.className = "dropdown-item";
        item.textContent = convertTextToCorrectFormat(option);

        item.addEventListener("click", (event) => {
          console.log(
            convertTextToOriginalFormat(event.target.textContent),
            participantId2
          );
          fetch(`${baseURL2}/coaching-conversations/save-response-style/`, {
            method: "POST",
            headers: {
              Authorization: `Basic ${createBasicAuthToken2(key2, secret2)}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user_id: participantId2,
              response_style: convertTextToOriginalFormat(
                event.target.textContent
              ),
            }),
          })
            .then((res) => {
              res.json;
            })
            .then((data) => {
              data;
            });
          dropdownButton.innerHTML =
            "Response style : " + `<b>${event.target.textContent}</b>`;
          dropdown.classList.add("hiddenn");
          dropdown.style.display = "none";
        });
        dropdown.appendChild(item);
      });

      dropdownButton.addEventListener("click", () => {
        const shadowRootForDropdowns =
          document.getElementById("chat-element2").shadowRoot;
        shadowRootForDropdowns.appendChild(dropdown);
        console.log(dropdown);
        dropdown.style.display =
          dropdown.style.display === "block" ? "none" : "block";
      });

      document.addEventListener("click", (event) => {
        if (
          !dropdownButton.contains(event.target) &&
          !dropdown.contains(event.target)
        ) {
          dropdown.classList.add("hiddenn");
          dropdown.style.display = "none";
        }
      });
    }

    if (botDetails.data.is_fitment_analysis && !['role_bot','skill_bot','skill_guide','icons_by_ai'].includes(botDetails.data.scenario_case) && !["user_bot",'deep_dive'].includes(botType)) {
      // faqButtonsGenerator("fitness_analysis", "Match Score");
      const button = document.createElement("button");
      button.setAttribute(
        "style",
        `width: fit-content; padding: 4px 8px; font-size: 12px; border: none; border-radius: 4px; min-width: fit-content; background : #f97316; color : white; `
      );
      button.setAttribute(
        "onmouseover",
        "this.style.backgroundColor = '#fb923c'"
      );
      button.setAttribute(
        "onmouseleave",
        "this.style.backgroundColor = '#f97316'"
      );
      button.setAttribute(
        "onclick",
        `handleFaqButtonClick('fitness_analysis')`
      );
      button.setAttribute("id", `quick-match-button`);
      button.innerText = "Match Score";
      buttonsWrapper.appendChild(button);
    }

    if (botType !== "user_bot") {
      const begginSessionButton = document.createElement("button");
      begginSessionButton.setAttribute(
        "style",
        `width: fit-content; padding: 4px 8px; font-size: 12px; border: none; border-radius: 4px; min-width: fit-content; background : #22c55e; color: white;`
      );
      begginSessionButton.setAttribute(
        "onmouseover",
        "this.style.backgroundColor = '#4ade80'"
      );
      begginSessionButton.setAttribute(
        "onmouseleave",
        "this.style.backgroundColor = '#22c55e'"
      );
      begginSessionButton.setAttribute(
        "onclick",
        `handleFaqButtonClick('something_else')`
      );
      begginSessionButton.setAttribute("id", `begin-session-button`);
      begginSessionButton.innerText = "Begin session";
      buttonsWrapper.appendChild(begginSessionButton);
    }

    
    // faqButtonsGenerator("something_else", "Begin session", `width: fit-content; padding: 4px 8px; font-size: 12px; border: 1px solid lightgray; border-radius: 4px; min-width: fit-content; background: #22c55e;`);

    if (["avatar_bot" ,'deep_dive'].includes(botType)) {
      endSessionButton = document.createElement("button");
      endSessionButton.setAttribute(
        "style",
        `width: fit-content; padding: 4px 8px; font-size: 12px; border: none; border-radius: 4px; min-width: fit-content; background : #9ca3af; color: black;`
      );
      endSessionButton.style.backgroundColor = "#d3d3d3";
      endSessionButton.style.color = "#a0a0a0";
      endSessionButton.setAttribute("id", "end-session-btn")
      if(botScenarioCase === "icons_by_ai"){
        endSessionButton.innerText = "End session";
      } else {
        endSessionButton.innerText = "End and Email Summary";
      }
      endSessionButton.style.cursor = "not-allowed";
      endSessionButton.disabled = true;
      buttonsWrapper.appendChild(endSessionButton);
    }
    console.log("buttons : ", buttons);


    if (!["user_bot",'deep_dive'].includes(botType)) {
       //canned button one
      const cannedButtonOne = document.createElement("button");
      cannedButtonOne.setAttribute(
        "style",
        `width: fit-content; padding: 4px 8px; font-size: 12px; border: 1px dashed lightgray; border-radius: 4px; min-width: fit-content; background-color: white; color : #374151;`
      );

      cannedButtonOne.setAttribute(
        "onmouseover",
        "this.style.backgroundColor = '#f9fafb'; this.style.cursor = 'not-allowed'"
      );
      cannedButtonOne.setAttribute(
        "onmouseleave",
        "this.style.backgroundColor = 'white'"
      );
      
      cannedButtonOne.addEventListener(
        "click",
        () => {
          sendMessage("Not exactly...")
        }
      );
      cannedButtonOne.setAttribute(
        "disabled",
        true
      )

      cannedButtonOne.setAttribute("id", `canned-btn-1`);
      cannedButtonOne.innerText = "Not exactly...";
      buttonsWrapper.appendChild(cannedButtonOne);

      //canned button two

      const cannedButtonTwo = document.createElement("button");
      cannedButtonTwo.setAttribute(
        "style",
        `width: fit-content; padding: 4px 8px; font-size: 12px; border: 1px dashed lightgray; border-radius: 4px; min-width: fit-content; background-color: white; color : #374151;`
      );

      cannedButtonTwo.setAttribute(
        "onmouseover",
        "this.style.backgroundColor = '#f9fafb', this.style.cursor = 'not-allowed' "
      );
      cannedButtonTwo.setAttribute(
        "onmouseleave",
        "this.style.backgroundColor = 'white'"
      );

      cannedButtonTwo.addEventListener(
        "click",
        () => {
          sendMessage("Yes I agree...")
        }
      );

      cannedButtonTwo.setAttribute(
        "disabled",
        true
      )
      cannedButtonTwo.setAttribute("id", `canned-btn-2`);
      cannedButtonTwo.innerText = "Yes I agree..";
      buttonsWrapper.appendChild(cannedButtonTwo);
    }

    faqHtmlData = `<div id="option-button-container" >
                      ${buttons}
                      </div>`;
    // sending welcome msg
    appendMessage2(`<p>${botWelcomeMessage}</p>`);
    // const
    const faqButtonsWrapper = document.getElementById("starting-faq-buttons");

    if (botType != "feedback_bot") {
      fitmentAnalysisQuestions = botDetails.data.fitment_qna;
      fitmentAnalysisOptions = botDetails.data.fitment_options;
      botInitialQuestions = botDetails.data.initial_qna;
      isFitmentAllowed = botDetails.data.is_fitment_analysis;
      isStrictFitment = botDetails.data.is_strict_fitment;
      isBotAudioResponse = botDetails.data.is_audio_response;
      CoachingForFitment = botDetails.data.coaching_for_fitment;
      faqButtonsWrapper.style.display = "block";
      faqButtonsWrapper.append(buttonsWrapper);
      if (botType === 'deep_dive'){
        botInitialQuestions = {
          "1": "Please let us know more about your context for this survey such as role, impact and whatever else you may feel comfortable with."
        }
      }
      // appendMessage2(faqHtmlData);
    } else {
      feedbackBotInitialFlow("initial");
      feedbackBotQuestions = botDetails.data.feedback_qna;
      initialfeedbackBotQuestions = botDetails.data.feedback_qna;
    }

    //   appendMessage2('jiks')
    //   const faqs = botDetails.faq;
    console.log("id", userId2, participantId2);
    console.log("id from web app", window.userIdFromWebApp);
    if (!isBotConversationPopulated && !["feedback_bot",'deep_dive'].includes(botType)) {
      populateBotConversation(window.userIdFromWebApp);
    }
    return botDetails;
  } catch (error) {
    console.error(`Error in getBotDetails: ${error}`);
  }
};

const handleFitmentAnalysis = async () => {
  console.log(
    fitmentAnalysisIndex,
    Object.keys(fitmentAnalysisQuestions).length
  );

  /* gShadowRoot2 = document.getElementById("chat-element2").shadowRoot;
    const responseValue = gShadowRoot2
      .querySelector('input[name="fitment_option"]:checked')
      .getAttribute("value");

    let fitmentQueIndex = parseInt(
      gShadowRoot2.getElementById("question-fitment").getAttribute("value")
    );
    fitmentAnalysisQnA[fitmentQueIndex] = {
      coach: fitmentAnalysisQuestions[fitmentQueIndex],
      cochee: responseValue,
    }; */

  // store all the responses in fitmentAnalysisQnA
  for (let i = 1; i <= Object.keys(fitmentAnalysisQuestions).length; i++) {
    const responseValue = gShadowRoot2
      .querySelector(`input[name="fitment_option_${i}"]:checked`)
      .getAttribute("value");

    fitmentAnalysisQnA[i] = {
      coach: fitmentAnalysisQuestions[i],
      cochee: responseValue,
    };
  }

  console.log("fitmentAnalysisQnA Submission : ", fitmentAnalysisQnA);

  fitmentAnalysisInProgress = false;
  fitmentAnalysisIndex = 0;
  // console.log("fitmentAnalysisQnA : ", fitmentAnalysisQnA);
  gShadowRoot2.getElementById(
    `fitment-container-${fitmentContainerId}`
  ).innerHTML = "<b>Please Wait...</b>";

  // console.log(userId2, participantId2);
  try {
    const queryparam = new URLSearchParams({
      method: "post",
      qna: JSON.stringify(fitmentAnalysisQnA),
      qna_type: "fitment",
      user_id: participantId2,
    });

    const resp = await fetch(
      `${baseURL2}/accounts/get-user-feedback-data/?${queryparam}`,
      {
        method: "GET",
        headers: {
          Authorization: `Basic ${createBasicAuthToken2(key2, secret2)}`,
          "Content-Type": "application/json",
        },
      }
    );

    const respJsn = await resp.json();
    console.log("saving fitment", respJsn);

    const response = await fetch(
      `${baseURL2}/test-attempt-sessions/get-fitness-analysis-score/`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${createBasicAuthToken2(key2, secret2)}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          participant_id: participantId2,
          bot_id: botId,
        }),
      }
    );

    const data = await response.json();
    console.log("Fitness Analysis Score => ", data);
    // const msg = gShadowRoot2.getElementById("fitment-analysis");
    const msg = gShadowRoot2.getElementById(
      `fitment-container-${fitmentContainerId}`
    );
    // button.parentNode.removeChild(button)
    const que_msg = document.createElement("div");
    let score_result_statement;
    if (data.score === 1 || data.score === 0) {
      score_result_statement =
        "The analysis indicates some challenges in coaching dynamics. Consider discussing and addressing these concerns openly with your coach. While there are areas for improvement, continued collaboration may lead to positive adjustments and a more aligned coaching relationship.";
    } else if (data.score === 2) {
      score_result_statement =
        "The analysis suggests a moderately positive fit in coaching dynamics. Identify specific areas for improvement and work together to enhance the coaching experience. Your joint efforts can lead to a stronger, more effective coaching partnership over time.";
    } else if (data.score === 3) {
      score_result_statement =
        "The analysis reflects a strong alignment laying a solid foundation for success. Nurture open communication and collaboration to sustain excellence. The optimal coaching dynamic provides a supportive environment for continued growth and achievement.";
    }

    que_msg.innerHTML = `<div style="margin: 0; padding: 0;"><b>Result:</b>   <p>${score_result_statement}</p> </div>`; // You can customize the message here
    // Replace the button with the "Thank you" message
    // msg.parentNode.replaceChild(que_msg, msg);
    // replace all the questions with the result
    msg.innerHTML = que_msg.innerHTML;

    // setTimeout(() => {
    //   appendMessage2(faqHtmlData);
    // }, 200);
  } catch (err) {
    console.log(err);
    appendMessage2(
      `<b style='font-size: 14px;color: #991b1b;'>Error while calculating Fitment score</b>`
    );
  }
  fitmentContainerId += 1;
  return;

  // fitmentAnalysisQuestions = fitment_analysis[type]
};

function handleIdpsRelatedQuestions(initialQue) {
  const questions = Object.entries(initialQue);

  // Filter out questions containing "idp" or "individual development plan"
  const filteredQuestions = questions.filter(([key, question]) => {
    if (typeof question === 'string') {
      return !(question.toLowerCase().includes('idp') || question.toLowerCase().includes('individual development plan'));
    } else if (question.hasOwnProperty('question')) {
      const que = question['question'];
      return !(que.toLowerCase().includes('idp') || que.toLowerCase().includes('individual development plan'));
    }
    return true; // Keep non-string values (like options object)
  });

  // Convert the filtered questions into an object
  const filteredObj = {};
  filteredQuestions.forEach(([key, question]) => {
    filteredObj[key] = question;
  });
  return filteredObj;
}


function getIntakeReadyBotInitialQuestions(initialQuestions) {
  if (isIntakeClicked) {
    return initialQuestions;
  }
  isIntakeClicked = true;
  data = initialQuestions;
  const firstQuestion =
    "Thank you for considering a virtual session. Please let me know more about you as a person that you think might be relevant to our session today.";
  console.log(data);
  // replace first question with new question
  data[1] = firstQuestion;

  const lastQuestion = {
    options: ["Yes", "No"],
    question:
      "Is this discussion related to your goal in a way to consider your IDP (individual development plan)? ",
  };

  // shift all questions by 1 index
  // for(let i = 4; i >= 2; i--) {
  //     data[i+1] = data[i]
  //     }

  // insert after first question and before second question
  data[Object.keys(data).length + 1] = lastQuestion;
  // data[2] = lastQuestion
  // data[6] = "Thank you for completing the intake"
  console.log(data);
  return data;
}

function sendMessage(item) {
  if (botInitialQuestionsIndex == 5) {
    if (item === "Yes") {
      isIDPDiscussionOpted = true;
    } else {
      isIDPDiscussionOpted = false;
    }
  }

  gShadowRoot2.getElementById("text-input").focus();
  setTimeout(() => {
    gShadowRoot2.getElementById("text-input").textContent = item;
    setTimeout(() => {
      gShadowRoot2.querySelectorAll(".input-button")[1].click();
    }, 100);
  }, 100);
}

function handleRadioTypeInitialQuestion(questionOptions, question_text) {
  let optioncont = "";
  questionOptions.forEach((item, index) => {
    optioncont += `<button  onclick="sendMessage('${item}')" style="display: inline-block; margin-right: 5px;">${item}</button>   `;
  });
  formRadio = `
            <div id='question-initial' style="font-size: 16px; margin-bottom: 20px; color: #333;" value="special_radio"><b>Q. </b>${question_text}</div>
            <div id='intial-options' class="deep-chat-temporary-message">${optioncont} </div>
           `;

  return formRadio;
}

async function SendingFirstInitialQue() {
  // disabling button
  disableOrEnableButtons("initial_question_proceed");

  //sending first question
  isAskingInitialQuestions = true;
  // if (botType === 'avatar_bot'){
  // botInitialQuestions = getIntakeReadyBotInitialQuestions(botInitialQuestions)
  // }
  console.log(botInitialQuestions,'botInitialQuestions')

  isIdp = await getIdps(userId2);
  console.log('isIdp',isIdp)
  if (!isIdp){
  botInitialQuestions = handleIdpsRelatedQuestions(botInitialQuestions)
  }
  console.log(botInitialQuestions,'botInitialQuestions')
  const question = botInitialQuestions[botInitialQuestionsIndex];
  if (typeof question === "string") {
    appendMessage2(botInitialQuestions[botInitialQuestionsIndex]);
  } else {
    const radio_cont = handleRadioTypeInitialQuestion(
      question["options"],
      question["question"]
    );

    appendMessage2(radio_cont);
  }
}

async function handleprecheck(choice){
  if (choice === "Yes") {
    if (intakeButton) {
      // enabling Intake button
      intakeButton.setAttribute(
        "onmouseover",
        "this.style.backgroundColor = '#f87171'"
      );
      intakeButton.setAttribute(
        "onmouseleave",
        "this.style.backgroundColor = '#dc2626'"
      );
      intakeButton.style.backgroundColor = "#dc2626";
      intakeButton.style.color = "white";
      intakeButton.disabled = false;
    }

    disableOrEnableButtons("precheck-proceed-options");
    // const conversationProceedOptions = shadowRoot2.getElementById(
    //   "conversation-proceed-options"
    // );
    // const conversationProceedOptionsParent =
    //   conversationProceedOptions.parentElement.parentElement.parentElement;
    // conversationProceedOptionsParent.remove();
    appendMessage2(
      addStickerToMessage(
        "System",
        `You must complete the ${intakebuttonText} before beginning the session`,
        '#22c55e'
      )
    );
    return;
  }

  if (choice === "No") {
    conversation_id2 = previousBotConversationId.split(":")[0];
    sessionId2 = previousBotConversationId.split(":")[1];
    coachMessage = previousBotConversationId.split(":")[2];
    isBotInitialized = true;
    isSessionActiveStt = true;

    disableOrEnableButtons("precheck-proceed-options");

    // const precheckProceed = shadowRoot2.getElementById(
    //   "precheck-proceed-options"
    // );
    // const precheckProceedOptionsParent =
    //   precheckProceed.parentElement.parentElement.parentElement;
    // precheckProceedOptionsParent.remove();
  }

  botInitialQuestionsIndex = 1;
  // optedBeginSession = true;
  if (botType === "avatar_bot") {
    await getFitmentScore(userId2);
    console.log(isBeginSessionProceed);

    if (!isBeginSessionProceed && isFitmentAllowed && isStrictFitment && globalBotDetails.data.scenario_case != 'icons_by_ai' && !['coach', 'mentor'].includes(UserProfileInfo.profile_type)) {
      appendMessage2(
        addStickerToMessage(
          "Note",
          "Your Match Score is low or not calculated. Please proceed with caution",
          "#22c55e"
        )
      );
    }

    appendMessage2(
      addStickerToMessage(
        "Welcome",
        "Very good day! Looks like you are all set to start your session. Let me know what would you like to discuss today? ",
        "#22c55e"
      )
    );
  }
  console.log(botType);
  if (choice === "No") {
    // disableOrEnableButtons("conversation-proceed");
    // newConversationButton.setAttribute("disabled", "true")
    // newConversationButton.setAttribute("onmouseover", "this.style.cursor = 'not-allowed'");
    appendMessage2(
      `<b>Please scroll above to view the conversation and proceed accordingly.</b>`
    );
  }
  console.log(botType);
  if (botType === "subject_matter_bot") {
    appendMessage2(
      `Welcome! How can I help today? I am an expert on ${globalBotDetails.data.bot_details.subject} and I can only have a conversation in this domain. There will be errors in my conversation if you ask me unrelated questions or give very short responses.`
    );
    appendMessage2(
      addStickerToMessage(
        "Welcome",
        "Very good day! Looks like you are all set to start your session.Let me know what would you like to discuss today? ",
        "#22c55e"
      )
    );

    return;
  }

  if (botType === "helper_bot" || botType === "coachbots") {
    appendMessage2(
      `Welcome! How can I help today? I am an expert on ${globalBotDetails.data.bot_details.subject} and I can only have a conversation in this domain. There will be errors in my conversation if you ask me unrelated questions or give very short responses.`
    );
    appendMessage2(
      addStickerToMessage(
        "Welcome",
        "Very good day! Looks like you are all set to start your session.Let me know what would you like to discuss today? ",
        "#22c55e"
      )
    );
  }

  // isAskingInitialQuestions = true;

  // const question = botInitialQuestions[botInitialQuestionsIndex];
  // if (typeof question === "string") {
  //   appendMessage2(botInitialQuestions[botInitialQuestionsIndex]);
  // } else {
  //   const radio_cont = handleRadioTypeInitialQuestion(
  //     question["options"],
  //     question["question"]
  //   );
  //   appendMessage2(radio_cont);
  // }
  console.log("Na-2:", optedBeginSession);

}
async function handlePreviousConversation(choice) {
  let coachMessage = "";
  if (choice === "previous") {
    conversation_id2 = previousBotConversationId.split(":")[0];
    sessionId2 = previousBotConversationId.split(":")[1];
    coachMessage = previousBotConversationId.split(":")[2];
    isBotInitialized = true;
    isSessionActiveStt = true;
  }

  const shadowRoot2 = document.getElementById("chat-element2").shadowRoot;
  const newConversationButton = shadowRoot2.getElementById("new-conversation");
  if (choice === "new") {
    disableOrEnableButtons("conversation-proceed");
    // if( !isIntakeCompleted ){
    //   appendMessage2(addStickerToMessage("System","You can only begin session after intake is complete"));
    //   return;
    // }

    // const previousButton = shadowRoot2.getElementById("previous-conversation");
    // previousButton.disabled = true;
    // previousButton.setAttribute("onmouseover", "this.style.cursor = 'not-allowed'");

    const conversationProceedOptions = `<div id="conversation-proceed-options" >
                    <b>New sessions will cancel out any existing intakes and you have to do the ${intakebuttonText} again.. Do you want to proceed?</b> <br>
                        <button onmouseover="this.style.cursor ='pointer'" style="margin-top:5px; width:fit-content; padding:6px 12px; border: 1px solid lightgray; border-radius: 4px;" onclick="handlePreviousConversation('Yes')">Yes</button>
                        <button onmouseover="this.style.cursor ='pointer'" style="margin-top:5px; width:fit-content; padding:6px 12px; border: 1px solid lightgray; border-radius: 4px;" onclick="handlePreviousConversation('No')">No</button>
                    </div>`;
    appendMessage2(conversationProceedOptions);
    return;
  }

  if (choice === "Yes") {
    if (intakeButton) {
      // enabling Intake button
      intakeButton.setAttribute(
        "onmouseover",
        "this.style.backgroundColor = '#f87171'"
      );
      intakeButton.setAttribute(
        "onmouseleave",
        "this.style.backgroundColor = '#dc2626'"
      );
      intakeButton.style.backgroundColor = "#dc2626";
      intakeButton.style.color = "white";
      intakeButton.disabled = false;
    }

    disableOrEnableButtons("conversation-proceed-options");
    const conversationProceedOptions = shadowRoot2.getElementById(
      "conversation-proceed-options"
    );
    const conversationProceedOptionsParent =
      conversationProceedOptions.parentElement.parentElement.parentElement;
    conversationProceedOptionsParent.remove();
    appendMessage2(
      addStickerToMessage(
        "System",
        `You must complete the ${intakebuttonText} before beginning the session`,
        '#22c55e'
      )
    );
    return;
  }

  if (choice === "No") {
    disableOrEnableButtons("conversation-proceed", (is_disable = false));

    const conversationProceedOptions = shadowRoot2.getElementById(
      "conversation-proceed-options"
    );
    const conversationProceedOptionsParent =
      conversationProceedOptions.parentElement.parentElement.parentElement;
    conversationProceedOptionsParent.remove();
    return;
  }

  botInitialQuestionsIndex = 1;
  // optedBeginSession = true;
  if (botType === "avatar_bot") {
    await getFitmentScore(userId2);
    console.log(isBeginSessionProceed);

    if (!isBeginSessionProceed && isFitmentAllowed && isStrictFitment && globalBotDetails.data.scenario_case != 'icons_by_ai' && !['coach', 'mentor'].includes(UserProfileInfo.profile_type)) {
      appendMessage2(
        addStickerToMessage(
          "Note",
          "Your Match Score is low or not calculated. Please proceed with caution",
          "#22c55e"
        )
      );
    }

    appendMessage2(
      addStickerToMessage(
        "Welcome",
        "Very good day! Looks like you are all set to start your session. Let me know what would you like to discuss today? ",
        "#22c55e"
      )
    );
  }
  console.log(botType);
  if (choice === "previous") {
    disableOrEnableButtons("conversation-proceed");
    // newConversationButton.setAttribute("disabled", "true")
    // newConversationButton.setAttribute("onmouseover", "this.style.cursor = 'not-allowed'");
    appendMessage2(
      `<b>Please scroll above to view the conversation and proceed accordingly.</b>`
    );
  }
  console.log(botType);
  if (botType === "subject_matter_bot") {
    appendMessage2(
      `Welcome! How can I help today? I am an expert on ${globalBotDetails.data.bot_details.subject} and I can only have a conversation in this domain. There will be errors in my conversation if you ask me unrelated questions or give very short responses.`
    );
    appendMessage2(
      addStickerToMessage(
        "Welcome",
        "Very good day! Looks like you are all set to start your session.Let me know what would you like to discuss today? ",
        "#22c55e"
      )
    );

    return;
  }

  if (botType === "helper_bot" || botType === "coachbots") {
    appendMessage2(
      `Welcome! How can I help today? I am an expert on ${globalBotDetails.data.bot_details.subject} and I can only have a conversation in this domain. There will be errors in my conversation if you ask me unrelated questions or give very short responses.`
    );
    appendMessage2(
      addStickerToMessage(
        "Welcome",
        "Very good day! Looks like you are all set to start your session.Let me know what would you like to discuss today? ",
        "#22c55e"
      )
    );
  }

  // isAskingInitialQuestions = true;

  // const question = botInitialQuestions[botInitialQuestionsIndex];
  // if (typeof question === "string") {
  //   appendMessage2(botInitialQuestions[botInitialQuestionsIndex]);
  // } else {
  //   const radio_cont = handleRadioTypeInitialQuestion(
  //     question["options"],
  //     question["question"]
  //   );
  //   appendMessage2(radio_cont);
  // }
  console.log("Na-2:", optedBeginSession);
}

async function handleFaqButtonClick(question) {
  optedBeginSession = false;
  console.log("option selected ==> ", question);
  if (question == "fitness_analysis") {
    if (fitmentAnalysisInProgress) {
      return;
    }
    fitmentAnalysisInProgress = true;
    saveBotEngagement(botId, userId2, "num_of_clicked_button");
    console.log(
      "profile_type",
      globalBotDetails.data.profile_details.profile_type
    );

    await getUserProfile(userId2);

    if (['icons_by_ai'].includes(globalBotDetails.data.profile_details.profile_type) || ["coach", "mentor"].includes(UserProfileInfo.profile_type)) {
      appendMessage2(
        addStickerToMessage(
          "Match Score",
          "In certain cases, the 'Match Scores' caluclation may fail. For Icons by AI / external coaches and mentors no Match Scores available. For internal coaches and mentors, we can calculate it based on the options selected. Scores are not generated/valid, in case you are interacting with the Coachbot as a coach/mentor.",
          "#fb923c"
        )
      );
      fitmentAnalysisInProgress = false;
      return;
    }

    if (quickMatchMessage){
      appendMessage2(
        `<div id='fitment-container-${fitmentContainerId}'>${addStickerToMessage(
          "Match Score",
          quickMatchMessage,
          "#fb923c"
        )}</div>`
      );
      fitmentAnalysisInProgress = false;
      fitmentContainerId += 1;
      return
    }
    appendMessage2(
      `<div id='fitment-container-${fitmentContainerId}'>${addStickerToMessage(
        "Match Score",
        "Please Wait...",
        "#fb923c"
      )}</div>`
    );

    const response = await fetch(
      `${baseURL2}/test-attempt-sessions/get-fitness-analysis-score/`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${createBasicAuthToken2(key2, secret2)}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          participant_id: participantId2,
          bot_id: botId,
        }),
      }
    );

    const data = await response.json();
    console.log("Fitness Analysis Score => ", data, Object.keys(data).length);

    if (Object.keys(data).length > 0) {
      let score_result_statement;
      if (data.score === 1 || data.score === 0) {
        score_result_statement =
          "The analysis indicates some challenges in coaching dynamics. Consider discussing and addressing these concerns openly with your coach. While there are areas for improvement, continued collaboration may lead to positive adjustments and a more aligned coaching relationship.";
      } else if (data.score === 2) {
        score_result_statement =
          "The analysis suggests a moderately positive fit in coaching dynamics. Identify specific areas for improvement and work together to enhance the coaching experience. Your joint efforts can lead to a stronger, more effective coaching partnership over time.";
      } else if (data.score === 3) {
        score_result_statement =
          "The analysis reflects a strong alignment laying a solid foundation for success. Nurture open communication and collaboration to sustain excellence. The optimal coaching dynamic provides a supportive environment for continued growth and achievement.";
      }

      que_msg = `<div style="margin: 0; padding: 0;"><b>Result:</b>   <p>${score_result_statement}</p> </div>`; // You can customize the message here
      // appendMessage2()
      gShadowRoot2.getElementById(
        `fitment-container-${fitmentContainerId}`
      ).innerHTML = addStickerToMessage("Match Score", que_msg,"#fb923c");
      fitmentAnalysisInProgress = false;
      fitmentContainerId += 1;
      quickMatchMessage = que_msg

      return;
    }

    console.log("flow reaching here");
    // console.log("question clicked : ",question, globalBotDetails.data.faqs[question])
    // console.log("fitness analysis clicked :",fitment_analysis[])
    // let buttons = '';
    // buttons += `<button style="margin-top:5px; width:100%; padding:6px 4px; border: 1px solid lightgray; border-radius: 4px;" onclick="handleFitmentAnalysis('coaching_intake')">Coachig Intake</button>`
    // buttons += `<button style="margin-top:5px; width:100%; padding:6px 4px; border: 1px solid lightgray; border-radius: 4px;" onclick="handleFitmentAnalysis('mentoring_intake')">Mentoring Intake</button>`
    // appendMessage2(buttons);
    // handleFitmentAnalysis()
    fitmentAnalysisInProgress = true;
    fitmentAnalysisIndex = 1;
    console.log(fitmentAnalysisQuestions, fitmentAnalysisIndex);
    let questiontext = fitmentAnalysisQuestions[fitmentAnalysisIndex];
    let questionoptins = fitmentAnalysisOptions[fitmentAnalysisIndex];
    let optioncont = "";

    // console.log("##### botinitialquestions ===> ", botInitialQuestions)
    console.log("##### questionoptins ===> ", questionoptins);

    /* botInitialQuestions = getIntakeReadyBotInitialQuestions(botInitialQuestions) */

    // start of mess up

    let formRadios = "";

    // render all the questions and options of fitment analysis in a single form and then submit it at once
    for (let i = 1; i <= Object.keys(fitmentAnalysisQuestions).length; i++) {
      const questiontext = fitmentAnalysisQuestions[i];
      const questionoptins = fitmentAnalysisOptions[i];
      let optioncont = "";
      questionoptins.forEach((item, index) => {
        optioncont += `<div style="display: flex; flex-direction: row; align-items: flex-start;">
        <input type="radio" id="option${index}" name="fitment_option_${i}" value="${item}" style="margin-right: 5px;">
        <label for="option${index}" style="font-size: 14px; margin-bottom: 10px; display: block;">${item}</label>
      </div>`;
      });

      formRadios += `
                  <div id='fitment-analysis-${i}' style="box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); padding: 20px; max-width: 100%; width: 100%; box-sizing: border-box;">
                  <div id='question-fitment' style="font-size: 16px; margin-bottom: 20px; color: #333;" value="${i}"><b>Q. </b>${questiontext}</div>
                    <div style="display: flex; flex-direction: row; justify-contents: space-around; gap: 8px; flex-wrap: wrap;">
                      ${optioncont}
                    </div>
                    ${
                      i === Object.keys(fitmentAnalysisQuestions).length
                        ? '<button id="submit-btn" onclick="handleFitmentAnalysis()" style="margin-top: 15px; padding: 10px 15px; width: 100%; border: 1px solid #1984ff; border-radius: 5px; color: white; background-color: #1984ff; cursor: pointer; font-size: 16px;">Submit</button>'
                        : ""
                    }
                  </div>`;
    }

    msg = `
    <div style="display: flex; flex-direction: column;">
      <div style="font-size : 12px; font-weight: bold; background-color : #fb923c;color: white; padding: 4px; border-radius:4px; width: fit-content;">${"Match Score"}</div>
      <div id="fitment-container-${fitmentContainerId}" style="margin-top : 8px; padding-top: 0px;">${formRadios}</div>
    </div>
  `;
    gShadowRoot2.getElementById(
      `fitment-container-${fitmentContainerId}`
    ).innerHTML = msg;
    // appendMessage2(msg)

    // end of mess up

    /* questionoptins.forEach((item, index) => {
      optioncont += `<div style="display: flex; flex-direction: row; align-items: flex-start;">
      <input type="radio" id="option${index}" name="fitment_option" value="${item}" style="margin-right: 5px;">
      <label for="option${index}" style="font-size: 14px; margin-bottom: 10px; display: block;">${item}</label>
    </div>`;
    });
    formRadio = `
              <div id='fitment-analysis' style="box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); padding: 20px; max-width: 100%; width: 100%; box-sizing: border-box;">
              <div id='question-fitment' style="font-size: 16px; margin-bottom: 20px; color: #333;" value="${fitmentAnalysisIndex}"><b>Q. </b>${questiontext}</div>
                <div style="display: flex; flex-direction: row; justify-contents: space-around; gap: 8px; flex-wrap: wrap;">
                  ${optioncont}
                </div>
                <button id="submit-btn" onclick="handleFitmentAnalysis()" style="margin-top: 15px; padding: 10px 15px; width: 100%; border: 1px solid #1984ff; border-radius: 5px; color: white; background-color: #1984ff; cursor: pointer; font-size: 16px;">Submit</button>
              </div>`;

              // formRadio =`
              //   <div id='fitment-analysis' style="padding: 20px; max-width: 100%; width: 100%; box-sizing: border-box;">
              //     <div id='question-fitment' style="font-size: 16px; margin-bottom: 20px; color: #333;" value="${fitmentAnalysisIndex}">
              //       <b>Q.</b><p>${questiontext}</p>
              //       <div>
                      
              //       </div>
              //     </div>
              //   </div>
              //   `

              appendMessage2(`
                <div style="display: flex; flex-direction: column;">
                  <div style="font-size : 12px; font-weight: bold; background-color : #f97316; color: white; padding: 4px; border-radius:4px; width: fit-content;">${"Match Score"}</div>
                  <div style="margin-top : 8px; padding-top: 0px;">${formRadio}</div>
                </div>
              `) */
    // appendMessage2(formRadio);
  } else {
    // something_else => begin_session
    if (question == "something_else") {
      // clear the sessionqnadata
      sessionQnAdata = [];

      // appendMessage2('Please ask your question in chat box')
      console.log('scenario case',globalBotDetails.data.scenario_case)
      if (optedBeginSession) {
        console.log("===> yes optedBeginSession");
        return;
      }
      console.log(window.user,'is_logged_in')
      if (botType === 'deep_dive') {
        const today = new Date();
        const botExpiresAt = new Date(globalBotDetails.data.bot_expires_at);

        today.setHours(0, 0, 0, 0);
        botExpiresAt.setHours(0, 0, 0, 0);

        console.log('expires_at: ', today,botExpiresAt)
        if (today > botExpiresAt) {
            appendMessage2(
              addStickerToMessage(
                "Begin Session",
                `<b><p>This bot has been expired.</p></b>`,
                '#22c55e'
              )
            );
            return
        }
        
        if (!window.user){
          appendMessage2(
            addStickerToMessage(
              "Begin Session",
              `<b><p>Please enter bot access code.</p></b>`,
              '#22c55e'
            )
          );
  
          askDeepDiveAccessCode = true;
        }

    }
      saveBotEngagement(botId, userId2, "num_of_clicked_button");

      optedBeginSession = true;

      const begginSessionButton = document.getElementById(
        "begin-session-button"
      );
      if (begginSessionButton){
        console.log("beggin-session-button",begginSessionButton)
      begginSessionButton.disabled = true;
      begginSessionButton.removeAttribute("onmouseover");
      begginSessionButton.removeAttribute("onmouseleave");
      begginSessionButton.style.background = "#d3d3d3";
      begginSessionButton.style.cursor = "not-allowed";
      begginSessionButton.style.color = "#a0a0a0";

      }
      const quickmatch = document.getElementById(
        "quick-match-button"
      );
      if (quickmatch && botType == 'avatar_bot'){
        
        quickmatch.disabled = true;
        quickmatch.style.cursor = "not-allowed";
        quickmatch.removeAttribute("onmouseover");
        quickmatch.removeAttribute("onmouseleave");
        quickmatch.style.background = "#d3d3d3";
        quickmatch.style.color = "#a0a0a0";
      }

      const cannedMessageOne = document.getElementById("canned-btn-1")
      if (cannedMessageOne){
        cannedMessageOne.disabled = false
        // cannedMessageOne.style.cursor = "pointer"
        cannedMessageOne.setAttribute(
          "onmouseover",
          "this.style.backgroundColor = '#f9fafb'; this.style.cursor = 'pointer'"
        );

        const cannedMessageTwo = document.getElementById("canned-btn-2")
        cannedMessageTwo.disabled = false
        // cannedMessageTwo.style.cursor = "pointer"
        cannedMessageTwo.setAttribute(
          "onmouseover",
          "this.style.backgroundColor = '#f9fafb'; this.style.cursor = 'pointer'"
        );
      }
      // ****** Check connection logic : start

      // const connectionresp = await fetch(
      //   `${baseURL2}/accounts/user-bot-connection-status/?user_id=${userId2}&coach_user_id=${globalBotDetails.data.user_id}`,
      //   {
      //     method: "GET",
      //     headers: {
      //       Authorization: `Basic ${createBasicAuthToken2(key2, secret2)}`,
      //     },
      //   }
      // );

      // // Continue with your code after the response is fetched
      // const connectionData = await connectionresp.json();
      // console.log(
      //   "user bot connection status : ",
      //   connectionData.connected,
      //   connectionData.connected == false
      // );
      // if (connectionData.connected == false) {
      //   appendMessage2(
      //     addStickerToMessage(
      //       "System",
      //       "Your connection request must be accepted before you can start the session."
      //     )
      //   );
      //   return;
      // }

      // ****** Check connection logic : end

      // *** checking profile type: ==============================================================

      if (!['deep_dive'].includes(botType)){
        await getUserProfile(userId2);
        if (UserProfileInfo) {
          console.log("======profileType: ", UserProfileInfo.profile_type);
          if (["coach", "mentor"].includes(UserProfileInfo.profile_type)) {
            appendMessage2(
              addStickerToMessage(
                "Begin Session",
                `<b><p>Interactions between coaches & mentors are not considered valid and are not optimized. For transparency, the interactions are not blocked.</p></b>`,
                '#22c55e'
              )
            );
          }
        }
      }

      // *** checking profile_type logic ends here==================================================

      // let intakeSummery;
      // if (["avatar_bot", "helper_bot", "coachbots"].includes(botType)) {
      //   console.log("===> yes fetching intake summary");
      //   const queryparam = new URLSearchParams({
      //     method: "get",
      //     bot_id: botId,
      //     is_positive: "False",
      //     qna_type: "initial_qna",
      //     user_id: userId2,
      //   });
      //   const resp = await fetch(
      //     `${baseURL2}/accounts/get-user-feedback-data/?${queryparam}`,
      //     {
      //       method: "GET",
      //       headers: {
      //         Authorization: `Basic ${createBasicAuthToken2(key2, secret2)}`,
      //         "Content-Type": "application/json",
      //       },
      //     }
      //   );
      //   const respJson = await resp.json();
      //   console.log(" response_initial_qna : ", respJson);
      //   intakeSummery = respJson.intake_summary;

      //   // if intake is done in current session then add it to sessionqnadata
      //   if ( isIntakeCompleted && intakeSummery){
      //     // add to start of sessionqnadata
      //     sessionQnAdata.unshift({
      //       user: "last pre-check",
      //       coach: intakeSummery,
      //     });
      //   }

      //   IntakeUid = respJson.intake_id;
      //   if (!intakeSummery) {
      //     // const begginSessionMessage = `<div style="display: flex; flex-direction: column; margin: 0; padding: 0;">
      //     // <div style="font-size : 12px; font-weight: bold; background-color : #22c55e;color: white; padding: 4px; border-radius:4px; width: fit-content;">Begin Session</div>
      //     // <div style="margin-top : 8px; padding-top: 0px;">You can only begin session after intake is complete</div>`;
      //     // appendMessage2(begginSessionMessage);
      //     appendMessage2(addStickerToMessage("Begin Session",`You can only begin session after ${intakebuttonText} is complete`,'#22c55e'));
      //     optedBeginSession = false;
      //     if (botType != 'avatar_bot'){
      //       const begginSessionButton = document.getElementById("begin-session-button");
      //       begginSessionButton.disabled = false;
      //       begginSessionButton.style.cursor = "pointer";
      //     }
      //     return;
      //   }
      // }

      // console.log(
      //   "===> isIntakeSummaryDisplayed",
      //   isIntakeSummaryDisplayed,
      //   botType,
      //   botType === "avatar_bot"
      // );
      if (botType === 'deep_dive' && window.user){
        // asking if want to anonymous or not

        uniqueSesssionContainerId = generateRandomAlphanumeric(6);
        const optionData = `<div id="anonymous-${uniqueSesssionContainerId}">
          <b>Want to continue as Anonymous?</b>
          </br> <div>
              <button onmouseover="this.style.cursor ='pointer'" style="margin-top:5px; width:fit-content; padding:6px 12px; border: 1px solid lightgray; border-radius: 4px;" onclick="getUserOrAnonymousDetailsDeepDive('Yes')">Yes</button>
              <button onmouseover="this.style.cursor ='pointer'" style="margin-top:5px; width:fit-content; padding:6px 12px; border: 1px solid lightgray; border-radius: 4px;" onclick="getUserOrAnonymousDetailsDeepDive('No')">No</button>
              </div>
          </div>`;       
  
        setTimeout(() => {
          appendMessage2(
            addStickerToMessage(
              "Begin Session",
              optionData,
              '#22c55e'
            )
          );
          isSomeActivityActive = true;
        }, 100);
      }

      if (
        ["avatar_bot", "helper_bot", "coachbots"].includes(botType) &&
        !['role_bot','skill_bot','skill_guide'].includes(globalBotDetails.data.scenario_case)
      ) {
        // const begginSessionMessage = `<div  style="display: flex; flex-direction: column; margin: 0; padding: 0;">
        // <div style="font-size : 12px; font-weight: bold; background-color : #22c55e;color: white; padding: 4px; border-radius:4px; width: fit-content;">Begin Session</div>
        // <div style="margin-top : 8px; padding-top: 0px;">Welcome to your session. Here is my understanding of the situation: \n ${intakeSummery} \n Let me know if I missed anything?</div>`;
        // appendMessage2(begginSessionMessage);

        // appendMessage2(addStickerToMessage('Begin Session',`
        // <p>
        // Welcome to your session. Here is my understanding of the situation: <br> ${intakeSummery} ,<br> Let me know if I missed anything? <br><br> <b>Please update your ${intakebuttonText} questions if you believe this is not the right session context.</b>
        // <p>`,'#22c55e'))
        appendMessage2(
          addStickerToMessage(
            'Begin Session',
            `Hello, welcome to the session! I know it's the same old boring message you see every time, but if you engage meaningfully, we can deep dive into any issue together. Please let me know in detail what you want to accomplish with this session and what your goals are.`,
            '#22c55e'
          )
        )

        // isIntakeSummaryDisplayed = true;
        // return;
      }

      optedBeginSession = true;
      await getUserBotConversation(userId2);
      console.log(previousBotConversationId, "out");

      // if (
      //   previousBotConversationId != "" &&
      //   botType === "avatar_bot"
      // ) {
      //   console.log(previousBotConversationId, "in");

      //   const div = `<div id="precheck-proceed-options" >
      //   <b>Do you want to do a new pre-check again or continue?</b> <br>
      //       <button id='new-precheck'  onmouseover="this.style.cursor ='pointer'" style="margin-top:5px; width: fit-content; padding:6px 12px; border: 1px solid lightgray; border-radius: 4px;" onclick="handleprecheck('Yes')">Yes</button>
      //       <button id='previous-precheck' onmouseover="this.style.cursor ='pointer'" style="margin-top:5px; width: fit-content; padding:6px 12px; border: 1px solid lightgray; border-radius: 4px;" onclick="handleprecheck('No')">No</button>

      //   </div>`;

      //   if (botType === "avatar_bot") {
      //     appendMessage2(div);
      //   }
      //   return;
      // } else if (
      //   previousBotConversationId != "" &&
      //   ["subject_matter_bot", "helper_bot", "coachbots"].includes(botType)
      // ) {
      //   // in helperbot and suject matter bot we are not creating another session
      //   conversation_id2 = previousBotConversationId.split(":")[0];
      //   sessionId2 = previousBotConversationId.split(":")[1];
      //   coachMessage = previousBotConversationId.split(":")[2];
      //   isBotInitialized = true;
      //   isSessionActiveStt = true;
      // }

      console.log('checking before creating session:',
      isBotInitialized,
      isSessionActiveStt,
      botType
      )

      // because we are creating session on every in avatar and deepdive
      if (
          previousBotConversationId != "" &&
          !['avatar_bot','deep_dive'].includes(botType)  
          ) {
          conversation_id2 = previousBotConversationId.split(":")[0];
          sessionId2 = previousBotConversationId.split(":")[1];
          coachMessage = previousBotConversationId.split(":")[2];
          isBotInitialized = true;
          isSessionActiveStt = true;
        }

      botInitialQuestionsIndex = 1;

      // removing from avatar bot
      // if (botType === "avatar_bot") {
      //   await getFitmentScore(userId2);
      //   console.log(isBeginSessionProceed);

      //   if (!isBeginSessionProceed && isFitmentAllowed && isStrictFitment && globalBotDetails.data.scenario_case != 'icons_by_ai' && !['coach', 'mentor'].includes(UserProfileInfo.profile_type)) {
      //     appendMessage2(
      //       addStickerToMessage(
      //         "Note",
      //         "Your Match Score is low or not calculated. Please proceed with caution",
      //         '#22c55e'
      //       )
      //     );
      //   }
      // }
      console.log(botType);
      console.log(document.getElementById("bot-footer"));
      if (botType === "subject_matter_bot") {
        appendMessage2(
          `Welcome! How can I help today? I am an expert on ${globalBotDetails.data.bot_details.subject} and I can only have a conversation in this domain. There will be errors in my conversation if you ask me unrelated questions or give very short responses.`
        );
        // appendMessage2(
        //   addStickerToMessage(
        //     "Welcome",
        //     "Very good day! Looks like you are all set to start your session.Let me know what would you like to discuss today? "
        //   )
        // );
        return;
      }
      if (botType === "helper_bot" || botType === "coachbots") {
        if (['role_bot','skill_bot','skill_guide'].includes(globalBotDetails.data.scenario_case)){
          appendMessage2(
            addStickerToMessage(
              "Begin Session",
              `Welcome! How can I help today? I am an expert on ${globalBotDetails.data.bot_details.subject} and I can only have a conversation in this domain. There will be errors in my conversation if you ask me unrelated questions or give very short responses.`,
              '#22c55e'
            )
          );
        } else{
          appendMessage2(
            `Welcome! How can I help today? I am an expert on ${globalBotDetails.data.bot_details.subject} and I can only have a conversation in this domain. There will be errors in my conversation if you ask me unrelated questions or give very short responses.`
          );
        }
        // appendMessage2(
        //   addStickerToMessage(
        //     "Welcome",
        //     "Very good day! Looks like you are all set to start your session.Let me know what would you like to discuss today? "
        //   )
        // );
      }

      // if (botType === "avatar_bot") {
      //   appendMessage2(
      //     addStickerToMessage(
      //       "Welcome",
      //       "Very good day! Looks like you are all set to start your session.Let me know what would you like to discuss today? "
      //     )
      //   );
      // }

      // isAskingInitialQuestions = true;

      // const question = botInitialQuestions[botInitialQuestionsIndex];
      // if (typeof question === "string") {
      //   appendMessage2(botInitialQuestions[botInitialQuestionsIndex]);
      // } else {
      //   const radio_cont = handleRadioTypeInitialQuestion(
      //     question["options"],
      //     question["question"]
      //   );

      //   appendMessage2(radio_cont);
      // }
      return;
    }

    //********************** intake flow start */

    if (question == "intake") {
      isIntakeInProgress = true;
      // appendMessage2('Please ask your question in chat box')
      if (isAskingInitialQuestions) {
        return;
      }
      saveBotEngagement(botId, userId2, "num_of_clicked_button");

      botInitialQuestionsIndex = 1;
      // optedBeginSession = true;
      const divCont = `<div id="initial_question_proceed" >
      <b>Thank you for considering a virtual session. Please answer the following questions that appear for ${intakebuttonText}. Click "OK" to start</b>
        <button onmouseover="this.style.cursor ='pointer'" style="margin-top:5px; width:fit-content; padding:6px 12px; border: 1px solid lightgray; border-radius: 4px;" onclick="SendingFirstInitialQue()">OK</button>
      </div>`;

      appendMessage2(addStickerToMessage(intakebuttonText, divCont,'#dc2626'));
      return;
    }

    //********************** intake flow end */

    if (question == "recommendations") {
      if (botType === "avatar_bot") {
        appendMessage2(
          "Please provide a context for recommendations in the chatbox"
        );
      } else {
        const resp = await fetch(
          `${baseURL2}/tests/get-tests-by-bot/?bot_id=${botId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Basic ${createBasicAuthToken2(key2, secret2)}`,
              "Content-Type": "application/json",
            },
          }
        );
        let buttons = "";
        const respjson = await resp.json();
        console.log(respjson, "bot_test_data");

        if (Object.keys(respjson).length > 0) {
          respjson.forEach((element) => {
            buttons += `<button onmouseover="this.style.cursor ='pointer'" style="margin-top:5px; width:100%; padding:6px 4px;  border: 1px solid lightgray; border-radius: 4px;" onclick="handleSurpriseMeButtonClick2('${
              element.test_code
            }','${element.title.replaceAll("'", "")}')">${
              element.title
            }</button>`;
          });
          appendMessage2(
            `<b >Here are some recommendations for you : </b> <br> ${buttons}`
          );

          appendMessage2(
            "If you want to try other scenarios please provide a context for recommendations in the chatbox"
          );
        } else {
          appendMessage2(
            "Please provide a context for recommendations in the chatbox"
          );
        }
      }
      recommendationClicked = true;
      return;
    }
    if (question === "know_your_coach") {
      let KnowYourCoachMessage = "";
      for (const key in globalBotDetails.data.faqs) {
        if (globalBotDetails.data.faqs.hasOwnProperty(key)) {
          const template = `
          <div style="display: flex; flex-direction: column;">
            <div style="font-size : 12px; font-weight: bold; background-color : #e5e7eb;color: black; padding: 4px; border-radius:4px; width: fit-content;">${key}</div>
            <p style="margin-top : 8px; padding-top: 0px;">${globalBotDetails.data.faqs[key]}</p>
          </div>
        `;
          KnowYourCoachMessage += template;
        }
      }
      console.log(KnowYourCoachMessage);
      appendMessage2(`${KnowYourCoachMessage}`);
    }
    // console.log(globalBotDetails.data.faqs[question])
    // appendMessage2(`
    // <div style="display: flex; flex-direction: column;">
    //   <div style="font-size : 12px; font-weight: bold; background-color : #3b82f6;color: white; padding: 4px; border-radius:4px; width: fit-content;">${question}</div>
    //   <p style="margin-top : 8px; padding-top: 0px;">${globalBotDetails.data.faqs[question]}</p>
    // </div>
    // `)
    // appendMessage2(globalBotDetails.data.faqs[question]);
    // appendMessage2(faqHtmlData)
  }
}

function sendBotTranscript2() {
  const shadowRoot2 = document.getElementById("chat-element2").shadowRoot;

  let userEmail = "";
  let userName = ""
  if (!window.user) {
    // userEmail = shadowRoot2.getElementById("input-email2").value;
    userEmail = emailNameformJsonstt["email"];
    userName = emailNameformJsonstt["name"];
  } else {
    userEmail = window.user.email;
  }
  if(isAnonymous && botType === 'deep_dive'){
    userName = "Anonymous User";
  }
  console.log("User email : ", userEmail);

  queryParams2 = new URLSearchParams({
    participant_id: participantId2,
    email: userEmail,
    name: userName
  });

  // fetch(
  //   `${baseURL2}/test-attempt-sessions/set-name-and-email/?${queryParams2}`,
  //   {
  //     method: "POST",
  //     headers: {
  //       Authorization: `Basic ${createBasicAuthToken2(key2, secret2)}`,
  //       "Content-Type": "application/json",
  //     },
  //   }
  // )
  //   .then((response) => response.json())
  //   .then((data) => {
  //     credsUpdated2 = data.status;
  //     console.log("name email updated, sending email");

      const queryParamsEmail2 = new URLSearchParams({
        submitted_email: userEmail,
        submitted_name: userName,
        test_attempt_session_id: sessionId2,
      });

      fetch(
        `${baseURL2}/test-attempt-sessions/send-bot-transcript-email/?${queryParamsEmail2}`,
        {
          method: "POST",
          headers: {
            Authorization: `Basic ${createBasicAuthToken2(key2, secret2)}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ session_qna_data: sessionQnAdata }),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("Dynamic mcq response : ", data);

          // appendMessage2(faqHtmlData)

          // console.log(data.options_data)
          // questionText2 = data.options_data.next_situation;
          // newOption1NameStt = data.options_data.option_a;
          // newOption2NameStt = data.options_data.option_b;
          // newOption1TextStt = data.options_data.option_a;
          // newOption2TextStt = data.options_data.option_b;
          // // qUid = data.options_data.next_situation;
          // qUid = globalQuestionDataStt.results[0].questions[mcqQustionIndexStt].uid;
        });
    // });

  return;
}

function handleEndConversation(isInActive) {
  console.log("end conversation clicked");
  if(isInActive === true){
    appendMessage2("<b>Due to inactivity, your session has ended. Please refresh the page to restart again anytime</b>");
  } else  {
    if (botType === 'deep_dive'){
      appendMessage2("<b>Thank you for taking the time to check in on the important topic. You may receive a response transcript for your records only.</b>")
    }
    else{
      appendMessage2("<b>Your session has ended. Please refresh the page to restart again anytime</b>");
    }
  }

  isSessionActiveStt = false;
  isBotInitialized = false;
  optedBeginSession = false;

  const begginSessionButton = document.getElementById("begin-session-button");
  if (begginSessionButton){
    begginSessionButton.setAttribute(
      "onmouseover",
      "this.style.backgroundColor = '#4ade80'"
    );
    begginSessionButton.setAttribute(
      "onmouseleave",
      "this.style.backgroundColor = '#22c55e'"
    );
    begginSessionButton.setAttribute(
      "onclick",
      `handleFaqButtonClick('something_else')`
    );
    begginSessionButton.disabled = false;
    begginSessionButton.style.cursor = "pointer";
    begginSessionButton.style.color = 'white';
    begginSessionButton.style.backgroundColor = "#22c55e";
  }

  
  const quickmatch = document.getElementById(
        "quick-match-button"
      );
  if (quickmatch){
    quickmatch.setAttribute(
      "onmouseover",
      "this.style.backgroundColor = '#fb923c'"
    );
    quickmatch.setAttribute(
      "onmouseleave",
      "this.style.backgroundColor = '#f97316'"
    );
    quickmatch.setAttribute(
      "onclick",
      `handleFaqButtonClick('fitness_analysis')`
    );
  quickmatch.style.backgroundColor = '#f97316';
  quickmatch.style.color = 'white';
  quickmatch.disabled = false;
  quickmatch.style.cursor = "pointer";
  }

  const cannedMessageOne = document.getElementById("canned-btn-1")

  if (cannedMessageOne){
    cannedMessageOne.disabled = true
        // cannedMessageOne.style.cursor = "pointer"
        cannedMessageOne.setAttribute(
          "onmouseover",
          "this.style.backgroundColor = '#f9fafb'; this.style.cursor = 'not-allowed'"
        );

        const cannedMessageTwo = document.getElementById("canned-btn-2")
        cannedMessageTwo.disabled = true
        // cannedMessageTwo.style.cursor = "pointer"
        cannedMessageTwo.setAttribute(
          "onmouseover",
          "this.style.backgroundColor = '#f9fafb'; this.style.cursor = 'not-allowed'"
        );
    }


  if (endSessionButton && !endSessionButton.disabled) {
    endSessionButton.removeAttribute("onmouseover");
    endSessionButton.removeAttribute("onmouseleave");
    endSessionButton.style.backgroundColor = "#d3d3d3"; // to set gray color
    endSessionButton.style.color = "#a0a0a0";
    endSessionButton.style.cursor = "not-allowed";
    endSessionButton.disabled = true;
  }

  let emailForm;
  if (window.innerWidth > 768) {
    emailForm = `<div id="bot-transcript-email" style="min-width: 730px;">
    <b>Please Enter your email</b>
    <div
      id="input-form2"
      style="
      display: flex;
      flex-direction: row;
      min-width: 100%;
      gap: 1rem;
      align-items: center;
    "
    >
      <div style="display: flex; flex-direction: column; width: 45%;">
        <label for="email" style="margin: 12px 0 4px 0">Email</label>
        <input
          id="input-email2"
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
        id="submit-btn2"
        onclick="sendBotTranscript2()"
      >
        Submit
      </button>
    </div>
  </div>`;
  } else {
    emailForm = `<div id="bot-transcript-email" style="min-width: 200px;">
  <b>Please Enter your email</b>
  <div
    id="input-form2"
    style="
    display: flex;
    flex-direction: column;
    min-width: 100%;
    gap: 8px;
    align-items: flex-start;
    justify-content: flex-start;
  "
  >
    <div style="display: flex; flex-direction: column; width: 100%;">
      <label for="email" style="margin: 12px 0 4px 0">Email</label>
      <input
        id="input-email2"
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
      id="submit-btn2"
      onclick="sendBotTranscript2()"
    >
      Submit
    </button>
  </div>
</div>`;
  }
  if (!window.user) {
    // appendMessage2(emailForm);
    if(botType === "deep_dive"){
      // const optionData = `<div id="anonymous-${uniqueSesssionContainerId}">
      //   <b>Want to continue as Anonymous?</b>
      //   </br> <div>
      //       <button onmouseover="this.style.cursor ='pointer'" style="margin-top:5px; width:fit-content; padding:6px 12px; border: 1px solid lightgray; border-radius: 4px;" onclick="getUserOrAnonymousDetailsDeepDive('Yes')">Yes</button>
      //       <button onmouseover="this.style.cursor ='pointer'" style="margin-top:5px; width:fit-content; padding:6px 12px; border: 1px solid lightgray; border-radius: 4px;" onclick="getUserOrAnonymousDetailsDeepDive('No')">No</button>
      //       </div>
      //   </div>`;

      // adding initial question to bot transcript
      const botData = Object.entries(botInitialQuestionsQnA).reverse();
      botData.forEach(element => {
        sessionQnAdata.unshift(
          {
            "coach" : element[0],
            "user": element[1]
          }
        )
      });

      sessionQnAdata.push({
        'coach': "Thank you for taking the time to check in on the important topic. You may receive a response transcript for your records only.",
        'user': ""
      })

      console.log('deepdiveBottranscriptData', botData, sessionQnAdata)
      sendBotTranscript2();
      // appendMessage2(optionData);

    } else {
      isEmailFormstt = true;
      formFieldsstt = ["name", "email"];
      appendMessage2(`<b>Please enter your ${formFieldsstt[0]}</b>`);
    }
  } else {
    // if(botScenarioCase !== "icons_by_ai"){ //no email trigger for icons_by_ai :- row 707
    if ( botType === 'deep_dive'){
      const botData = Object.entries(botInitialQuestionsQnA).reverse();
      botData.forEach(element => {
        sessionQnAdata.unshift(
          {
            "coach" : element[0],
            "user": element[1]
          }
        )
      });

      sessionQnAdata.push({
        'coach': "Thank you for taking the time to check in on the important topic. You may receive a response transcript for your records only.",
        'user': ""
      })

      console.log('deepdiveBottranscriptData', botData, sessionQnAdata)
    }
      sendBotTranscript2();
    // }
  }
}

function getCredentialsForm2() {
  let credentialsForm2;

  if (window.innerWidth > 868) {
    console.log("using des Form");
    credentialsForm2 = `
      <div style="min-width: 730px;">
      <b>For obtaining your report, please submit the following details.</b>
      <div
        id="input-form2"
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
            id="input-name2"
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
            id="input-email2"
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
          id="submit-btn2"
          onclick="submitEmailAndName2()"
        >
          Submit
        </button>
      </div>
    </div>`;
  } else {
    console.log("NOT using des Form");
    credentialsForm2 = `
      <div>
      <b>For obtaining your report, please submit the following details.</b>
      <div
        id="input-form2"
        style="
        display: flex;
        flex-direction: column;
        min-width: 100%;
        gap: 1rem;
        align-items: flex-start;
      "
      >
        <div style="display: flex; flex-direction: column; width: 100%;">
          <label for="name" style="margin: 12px 0 4px 0">Name</label>
          <input
            type="text"
            id="input-name2"
            style="
              padding: 8px;
              margin-bottom: 4px;
              border-radius: 4px;
              border: 1px solid rgb(188, 188, 188);
            "
          />
        </div>
        <div style="display: flex; flex-direction: column; width: 100%;">
          <label for="email" style="margin: 12px 0 4px 0">Email</label>
          <input
            id="input-email2"
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
          id="submit-btn2"
          onclick="submitEmailAndName2()"
        >
          Submit
        </button>
      </div>
    </div>`;
  }
  return credentialsForm2;
}

//* generate a component for coaching question
function getCoachingQuestionData2(questionText) {
  let randomId2 = Math.floor(Math.random() * 1000000);
  randomId2 = `coaching-question-${randomId2}`;
  let parts = questionText.split(":");
  questionText = parts.length > 1 ? parts[1].trim() : questionText;
  return `
            ${questionText}
            <div id="${randomId2}">
              <button style="margin-top:5px; color:white; width:45%; padding:6px 4px; border: 1px solid lightgray; border-radius: 4px; background:green;" onclick="handleContinueCoachingClick2('${randomId2}')">Continue</button>
              <button style="margin-top:5px; width:45%; padding:6px 4px; border: 1px solid lightgray; border-radius: 4px; background:red;" onclick="handleEndCoachingClick2('${randomId2}')">End Session</button>
            </div>`;
}

const handleContinueCoachingClick2 = async (randomId) => {
  console.log("continue coaching button clicked", randomId);
  gShadowRoot2 = document.getElementById("chat-element2").shadowRoot;
  const target = gShadowRoot2.getElementById(randomId);
  target.innerHTML = "";
};

//* handle end coaching button click
const handleEndCoachingClick2 = async (randomId) => {
  console.log("end coaching button clicked");

  const response = await fetch(`${baseURL2}/frontend-auth/get-report-url/`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${createBasicAuthToken2(key2, secret2)}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id: participantId2,
      report_type: "coachingSessionReport",
      test_attempt_session_id: sessionId2,
    }),
  });
  const responseData = await response.json();
  globalReportUrl2 = responseData.url;
  console.log("Response from Coaching Report : ", globalReportUrl2);

  gShadowRoot2 = document.getElementById("chat-element2").shadowRoot;
  const target = gShadowRoot2.getElementById(randomId);
  target.innerHTML = "";

  if (window.user) {
    // append custom message to chat
    appendMessage2(
      `<p><b>It's showtime ✨, here is your detailed <a target="_blank" style="color: #3b82f6;text-decoration:none;" href="${globalReportUrl2}">feedback report</a>. The feedback is also emailed to you and will be available to you for 60 days.</b></p>`
    );
    //   gShadowRoot.getElementById(
    //     `mcq-option-${mcqFormId}`
    //   ).innerHTML = `<p>It's showtime ✨, here is your detailed <a target="_blank" style="color: #3b82f6;text-decoration:none;" href="${globalReportUrl}">feedback report</a>. The feedback is also emailed to you and will be available to you for 60 days.</p>`;
    //   appendMessage(message);

    //* send message to start new session
    appendMessage2(
      "<b>Please enter another access code to start a new interaction.</b>"
    );
    submitEmailAndName2();
  } else {
    // appendMessage2(getCredentialsForm2());
    isEmailFormstt = true;
    formFieldsstt = ["name", "email"];
    appendMessage2(`<b>Please enter your ${formFieldsstt[0]}</b>`);
  }
};

function createMessageNodeUser2(message) {
  const messageNode = document.createElement("div");
  messageNode.classList.add("inner-message-container");

  const messageBubble = document.createElement("div");
  messageBubble.classList.add("message-bubble", "user-message-text");
  messageBubble.style.maxWidth = "80%";
  messageBubble.style.marginTop = "4px";
  messageBubble.style.borderRadius = "4px";
  messageBubble.style.padding = "4";
  messageBubble.style.backgroundColor = "#2DC092";
  messageBubble.style.color = "white";

  const messageText = document.createElement("p");
  messageText.innerHTML = message;

  messageBubble.appendChild(messageText);
  messageNode.appendChild(messageBubble);

  return messageNode;
}

function appendMessageForUser2(message2) {
  gShadowRoot2 = document.getElementById("chat-element2").shadowRoot;
  const messageNode = createMessageNodeUser2(message2);
  gShadowRoot2.getElementById("messages").appendChild(messageNode);
  gShadowRoot2.getElementById("messages").scrollBy(0, 500);
}

function createMessageNode2(message) {
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

function LoadingMessageWithText(message){
  const shadowRoot = document.getElementById("chat-element2").shadowRoot;
   //loading message 
   const loadingElement = shadowRoot.querySelector(".loading-message-text")
  //  const dotsFlashingElement = shadowRoot.querySelector(".dots-flashing")
  //  dotsFlashingElement.style.color = "#1f2937"
   loadingElement.style.display = "flex"
   loadingElement.style.flexDirection = "row"
   loadingElement.style.alignItems = "center"
   const messageElement = document.createElement("span")
   messageElement.innerHTML = `<span style="color : #4b5563; font-size: ${window.innerWidth < 768 ? "12px" : "14px"}; min-width: 4rem; margin-left: 2rem;">${message}</span>`
   messageElement.setAttribute("id", "loading-message")
   
   loadingElement.style.width = "fit-content"
   loadingElement.appendChild(messageElement)
   shadowRoot.getElementById("messages").scrollBy(0, 500);
}

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

function disableOrEnableButtons(id, is_disable = true) {
  // Get the div container
  const shadowRoot2 = document.getElementById("chat-element2").shadowRoot;
  const container = shadowRoot2.getElementById(id);

  // Get all buttons inside the container
  var buttons = container.getElementsByTagName("button");

  // Disable each button
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].disabled = is_disable;
  }
}

function addStickerToMessage(sticker, msg, color='#3b82f6') {
  
  const divWithLabel = `<div style="display: flex; flex-direction: column; margin: 0; padding: 0;">
  <div style="font-size : 12px; font-weight: bold; background-color : ${color};color: white; padding: 4px; border-radius:4px; width: fit-content;">${sticker}</div>
  <div style="margin-top : 8px; padding-top: 0px;">${msg}</div>
  </div>`;
  return divWithLabel;
}

function appendMessage2(message2) {
  gShadowRoot2 = document.getElementById("chat-element2").shadowRoot;
  const messageNode = createMessageNode2(message2);
  gShadowRoot2.getElementById("messages").appendChild(messageNode);
  gShadowRoot2.getElementById("messages").scrollBy(0, 500);
}

function deleteAndReplaceContainerStt(id, new_cont) {
  const gshadowRoot = document.getElementById("chat-element2").shadowRoot;
  const msg = gshadowRoot.getElementById(`${id}`);
  // button.parentNode.removeChild(button)
  const que_msg = document.createElement("div");
  que_msg.innerHTML = `${new_cont}`; // You can customize the message here
  // Replace the button with the "Thank you" message
  msg.parentNode.replaceChild(que_msg, msg);
}

//image hover handlers - start
function showTooltipStt(content, event, tooltipIdStt, imageMapNameStt) {
  // console.log(tooltipIdStt)
  const shadowRootStt = document.getElementById("chat-element2").shadowRoot;
  const tooltipStt = shadowRootStt.getElementById(tooltipIdStt);
  tooltipStt.innerHTML = content;
  updateTooltipPositionStt(event, imageMapNameStt, tooltipIdStt);
  tooltipStt.style.display = "block";
}

function updateTooltipPositionStt(event, imageMapNameStt, tooltipIdStt) {
  // console.log('update',tooltipIdStt)

  const shadowRootStt = document.getElementById("chat-element2").shadowRoot;
  const tooltipStt = shadowRootStt.getElementById(tooltipIdStt);

  const mouseX = event.clientX + window.pageXOffset;
  const mouseY = event.clientY + window.pageYOffset;

  if (window.innerWidth > 760) {
    tooltipStt.style.left = event.clientX - 120 + "px"; // mouseX - 120 + "px" //event.clientX //  // + xOffset - 120 + "px";
    tooltipStt.style.top = event.clientY - 80 + "px"; //mouseY - 80 + "px" //event.clientY // //+ yOffset - 170 + "px";
  } else {
    tooltipStt.style.left = event.clientX - 90 + "px";
    tooltipStt.style.top = event.clientY - 180 + "px";
  }
}

function hideTooltipStt(tooltipIdStt) {
  // console.log('hide',tooltipIdStt)

  const shadowRootStt = document.getElementById("chat-element2").shadowRoot;
  const tooltipStt = shadowRootStt.getElementById(tooltipIdStt);
  // console.log(tooltipStt)
  tooltipStt.style.display = "none";
}
//image hover handlers - end

const setHoverPointsStt = (
  coordsStt,
  imageIdStt,
  imageMapNameStt,
  tooltipIdStt
) => {
  //hover configs
  const shadowRootForImageStt =
    document.getElementById("chat-element2").shadowRoot;
  const descriptionMediaImageStt =
    shadowRootForImageStt.getElementById(imageIdStt);

  // -map element
  const mapElementStt = document.createElement("map");
  mapElementStt.setAttribute("name", imageMapNameStt);
  shadowRootForImageStt.appendChild(mapElementStt);

  // -overlay element
  const overlayElementStt = document.createElement("div");
  overlayElementStt.setAttribute("class", "image-overlayStt");
  shadowRootForImageStt.appendChild(overlayElementStt);

  // -tooltip
  const tooltipELementStt = document.createElement("div");
  tooltipELementStt.setAttribute("id", tooltipIdStt);
  tooltipELementStt.setAttribute("class", "custom-tooltipStt");
  tooltipELementStt.style.position = "absolute";
  tooltipELementStt.style.backgroundColor = "#333";
  tooltipELementStt.style.color = "#fff";
  tooltipELementStt.style.padding = "5px";
  tooltipELementStt.style.borderRadius = "5px";
  tooltipELementStt.style.display = "none";
  shadowRootForImageStt.appendChild(tooltipELementStt);

  coordsStt.map((item) => {
    console.log(item);
    let coord;
    if (window.innerWidth < 768) {
      coord = item.coord.split("|")[1].replace(/\./g, ",").split(",");
    } else {
      coord = item.coord.split("|")[0].replace(/\./g, ",").split(",");
    }

    const areaElementStt = document.createElement("area");
    areaElementStt.setAttribute("coords", coord);
    areaElementStt.setAttribute("shape", "rect");
    // areaElementStt.setAttribute("title", item.title);

    // console.log(areaElementStt.addEventListener())

    mapElementStt.appendChild(areaElementStt);

    areaElementStt.addEventListener("mouseover", (event) => {
      showTooltipStt(item.title, event, tooltipIdStt, imageMapNameStt);
    });

    areaElementStt.addEventListener("mousemove", (event) => {
      updateTooltipPositionStt(event, imageMapNameStt, tooltipIdStt);
    });

    areaElementStt.addEventListener("mouseout", () => {
      hideTooltipStt(tooltipIdStt);
    });
  });
};

// to reset all variables
const resetAllVariablesStt = async () => {
  //* reset all variables : start

  isAttemptingRecommendation = false;
  responsesDone2 = false;
  questionIndex2 = 0;

  userResponses2 = [];
  DuplicateResponseCount2 = 0;
  console.log("resetingvariables");
  questionText2 = "";
  reportType2 = "interactionSessionReport";
  questionId2 = null;
  userResponse2 = "";

  testId2 = null;
  resQuestionNumber2 = null;
  questionLength2 = null;
  questionData2 = null;

  is_free2 = true;
  // responseProcessedQuestion = 0;
  senarioDescription2 = "";
  senarioCase2 = "";
  senarioTitle2 = "";
  senarioMediaDescription2;
  questionMediaLinkStt = null;
  userName2 = "";
  userEmail2 = "";
  reportUrl2 = null;
  testCodeList2 = [];
  isRepeatStatus2 = false;
  testPrevilage2 = "";

  //global variables
  sessionId2 = "";
  testCode2 = null;
  codeAvailabilityUserChoice2 = false;
  optedNo2 = false;
  globalReportUrl2 = null;

  //* reset all variables : end
  codeAvailabilityUserChoice2 = true;
  mcqQustionIndexStt = 0;
  mcqFormIdStt;
  globalQuestionDataStt;
  globalQuestionLengthStt;
  testType2 = "";
  isHindiStt = false;
  testUIInfoStt;
  isProceedStt = "";
  isSessionActiveStt = false;
  recommendationsStt = "";
  isTestSignedInStt;
  clientNameStt = "";
  isTranscriptOnlyStt = false;
  allowRecommendationTestCode = false;
  recommendationClicked = false;

  console.log("resetting variables completed");
};

function increaseActionPointStt(user_id, field_name) {
  fetch(
    `${baseURL2}/test-attempt-sessions/get-or-save-action-point/?mode=save&user_id=${user_id}&for=${field_name}`,
    {
      method: "GET",
      headers: {
        Authorization: `Basic ${createBasicAuthToken2(key2, secret2)}`,
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(`increased.`, data);
    })
    .catch((err) => console.log("increaseActionPointStt Error", err));
}
async function getFitmentScore(user_id) {
  try {
    console.log(`user_id : ${user_id}, bot_id: ${botId}`);
    const resp = await fetch(
      `${baseURL2}/test-attempt-sessions/get-fitment-analysis-by-user/?user_id=${user_id}&bot_id=${botId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Basic ${createBasicAuthToken2(key2, secret2)}`,
          "Content-Type": "application/json",
        },
      }
    );
    const jsonresp = await resp.json();
    console.log(`fitment_score_data`, jsonresp);
    previousFitmentJson = jsonresp;
    isBeginSessionProceed = jsonresp["proceed"];
  } catch (err) {
    console.log("getFitmentScore Error", err);
  }
}

function findRelatedItemsStt(data, targetCode) {
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
    resultDiv += `<strong>Title:</strong> ${item.title} <br><strong>Code:</strong> ${item.code} <br>`;
  });

  return matchingItems.length > 0 && targetTitle
    ? `<div>${resultDiv}</div>`
    : null;
}

const handleProceedClickStt = async (choice) => {
  if (choice == "Yes") {
    isProceedStt = "true";
    const gshadowRoot = document.getElementById("chat-element2").shadowRoot;
    const msg = gshadowRoot.getElementById("proceed-option2");
    // button.parentNode.removeChild(button)
    const que_msg = document.createElement("div");
    que_msg.innerHTML = "Please Wait..."; // You can customize the message here
    // Replace the button with the "Thank you" message
    msg.parentNode.replaceChild(que_msg, msg);

    //disable Copy Paste
    const textInputElement = gshadowRoot.getElementById("text-input")
    // textInputElement.setAttribute("onpaste", "alert('Pasting text is not allowed for answering the questions asked in the simulation.'); return false;")

    if (
      questionMediaLinkStt &&
      testType2 != "mcq" &&
      testType2 != "dynamic_mcq"
    ) {
      console.log(questionMediaLinkStt);
      let embeddingUrl = "";

      if (questionMediaLinkStt.length > 0) {
        if (questionMediaLinkStt.includes("youtube.com")) {
          const videoId = questionMediaLinkStt.split("v=")[1];
          embeddingUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        } else if (questionMediaLinkStt.includes("vimeo.com")) {
          const videoId = questionMediaLinkStt.split("/").pop();
          embeddingUrl = `https://player.vimeo.com/video/${videoId}?autoplay=1&loop=1`;
        } else if (questionMediaLinkStt.includes("twitter.com")) {
          embeddingUrl = `https://twitframe.com/show?url=${questionMediaLinkStt}`;
        }

        if (embeddingUrl) {
          appendMessage2(`▪ Media <br>  <iframe
                            allow="autoplay; encrypted-media; fullscreen;"
                            style="width: 100%; border-radius: 8px; min-height: 50vh; min-width: 50vw;"
                            src=${embeddingUrl}
                            frameborder="0"
                            allowfullscreen
                          >
                    `);
        }

        const urlList = questionMediaLinkStt.split(",");
        console.log("list", urlList);
        if (urlList.length > 1) {
          urlList.forEach((element) => {
            element = element.trim();
            if (element.includes("docs.google.com")) {
              let url =
                element.split("edit?")[0] +
                "embed?start=true&loop=true&delayms=3000";
              console.log(url);
              appendMessage2(`<iframe src=${url}
                                frameborder="0" 
                                style="width: 100%; border-radius: 8px; min-height: 50vh; min-width: 50vw;"
                                allowfullscreen="true" 
                                mozallowfullscreen="true" 
                                webkitallowfullscreen="true"
                                ></iframe>`);
            } else {
              console.log(element);

              appendMessage2(`<div ><audio style="${
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
          if (questionMediaLinkStt.includes("docs.google.com")) {
            let url =
              questionMediaLinkStt.split("edit?")[0] +
              "embed?start=true&loop=true&delayms=3000";
            console.log(url);
            appendMessage2(`<iframe src=${url}
                              frameborder="0" 
                              style="width: 100%; border-radius: 8px; min-height: 50vh; min-width: 50vw;" 
                              allowfullscreen="true" 
                              mozallowfullscreen="true" 
                              webkitallowfullscreen="true"
                              ></iframe>`);
          } else if (questionMediaLinkStt.includes("guidejar.com")) {
            const guidejarId = questionMediaLinkStt.split("/").pop();
            appendMessage2(`
              <div style="width:640px">
              <div style="position:relative;height:0;width:100%;overflow:hidden;box-sizing:border-box;padding-bottom:calc(100% - 0px)">
              <iframe src="https://www.guidejar.com/embed/${guidejarId}?type=1&controls=off" width="100%" height="100%" style="position:absolute;inset:0" allowfullscreen frameborder="0"></iframe
              ></div></div>
              `);
          }
        }
      }

      if (initialQuestionTextStt) {
        const linkPattern = /(http[s]?:\/\/[^\s]+)/;
        const is_link = linkPattern.test(initialQuestionTextStt);
        if (!is_link) {
          let strList = initialQuestionTextStt.replaceAll("*", "");

          strList = strList.split(":", 2);
          let responderName;
          if (strList.length > 1) {
            initialQuestionTextStt = strList[1];
            responderName = strList[0];
          }
          if (isImmersiveStt) {
            console.log(initialQuestionTextStt);
            let queText = initialQuestionTextStt;
            const queDiv = `<p>${queText}</p><br>`;
            const urltts = `${baseURL2}/test-responses/get-text-to-speech/?text=${initialQuestionTextStt}`;
            const response = await fetch(urltts, {
              method: "GET",
              headers: {
                Authorization: `Basic ${createBasicAuthToken2(key2, secret2)}`,
              },
            });

            const blob = await response.blob();
            console.log("respnse", blob);

            const objectUrl = URL.createObjectURL(blob);

            console.log(objectUrl, "url");

            initialQuestionTextStt =
              queDiv +
              `<div ><audio style="${
                window.innerWidth < 600
                  ? "width: 200px; max-width: 200px !important;"
                  : " min-width: 50vw !important;"
              }" controls autoplay>
              <source src=${objectUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
              </audio></div>`;

            console.log(initialQuestionTextStt);
          }
          console.log("last", initialQuestionTextStt);
          if (responderName) {
            initialQuestionTextStt =
              `<b>${responderName}:</b><br>` + `${initialQuestionTextStt}`;
          }

          appendMessage2(initialQuestionTextStt);
        }
      }
    } else {
      if (
        !questionMediaLinkStt &&
        testType2 != "orchestrated_conversation" &&
        testType2 != "mcq" &&
        testType2 != "dynamic_mcq" &&
        senarioCase2 != "process_training"
      ) {
        let responderName;

        if (testType2 === "dynamic_discussion_thread") {
          if (initialQuestionTextStt.includes(":")) {
            initialQuestionTextStt = initialQuestionTextStt.replace(
              /<\/?p>/g,
              ""
            );
            const strList = initialQuestionTextStt.split(":", 2);
            responderName = `<b>${strList[0]}:</b><br>`;
            initialQuestionTextStt = strList[1];
          } else {
            responderName = `<b>System:</b><br>`;
          }
        } else {
          let strLIst = initialQuestionTextStt
            .replaceAll("*", "")
            .split(":", 2);
          if (strLIst.length > 1) {
            initialQuestionTextStt = strLIst[1];
            responderName = `<b>${strLIst[0]}:</b><br>`;
          }
        }
        if (isImmersiveStt) {
          const queText = initialQuestionTextStt;
          const queDiv = `<p>${queText}</p><br>`;
          console.log("dyna", initialQuestionTextStt);
          const url = `${baseURL2}/test-responses/get-text-to-speech/?text=${initialQuestionTextStt}`;
          const response = await fetch(url, {
            method: "GET",
            headers: {
              Authorization: `Basic ${createBasicAuthToken2(key2, secret2)}`,
            },
          });

          const blob = await response.blob();
          console.log("respnse", blob);

          const objectUrl = URL.createObjectURL(blob);

          console.log(objectUrl, "url");
          initialQuestionTextStt =
            queDiv +
            `<div ><audio style="${
              window.innerWidth < 600
                ? "width: 200px; max-width: 200px !important;"
                : " min-width: 50vw !important;"
            }" controls autoplay>
            <source src=${objectUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
            </audio></div>`;
        }

        if (responderName) {
          initialQuestionTextStt = responderName + initialQuestionTextStt;
        }

        appendMessage2(initialQuestionTextStt);
      } else if (testType2 === "orchestrated_conversation") {
        const regex = /<p>(.*?)<\/p>/g;

        // Extracting text between <p> and </p> tags
        const matches = Array.from(
          initialQuestionTextStt.matchAll(regex),
          (match) => match[1].trim()
        );

        console.log("matches", matches);
        // Separating each extracted text by ":"
        const separatedText = matches.map((match) => match.split(":", 2));
        console.log("speratedTExt", separatedText);

        // Displaying the separated text
        if (isImmersiveStt) {
          const audioPromises = separatedText.map(async (entry) => {
            const responderName = `<b>${entry[0]}:</b><br>`;
            console.log(entry);
            let queText = entry[1];
            const queDiv = `<p>${queText}</p><br>`;
            const url = `${baseURL2}/test-responses/get-text-to-speech/?text=${entry[1]}`;

            const response = await fetch(url, {
              method: "GET",
              headers: {
                Authorization: `Basic ${createBasicAuthToken2(key2, secret2)}`,
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
            appendMessage2(content);
          });
        } else {
          separatedText.forEach((entry) => {
            const container = `<b>${entry[0]}:</b><br>` + `<p>${entry[1]}</P`;
            appendMessage2(container);
          });
        }
      } else if (
        mediaPropsStt &&
        Object.keys(mediaPropsStt).includes(`que_image ${initialIndexStt}`)
      ) {
        const questionpropName = `que_image ${initialIndexStt}`;

        const url = Object.keys(mediaPropsStt[questionpropName])[0];
        let narration;
        let coords = [];
        const coordAndTitleNarrationList = mediaPropsStt[questionpropName][url];

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
        const imageUrlStt = testImage.image;
        const coordsStt = testImage.coords;
        const narrationStt = testImage.narration;

        const urltts = `${baseURL2}/test-responses/get-text-to-speech/?text=${narrationStt}`;
        const response = await fetch(urltts, {
          method: "GET",
          headers: {
            Authorization: `Basic ${createBasicAuthToken2(key2, secret2)}`,
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
        }"" controls autoplay>
          <source src=${objectUrl} type="audio/mpeg" />
          Your browser does not support the audio element.
          </audio></div>`;
        const imageIdStt = `mediaImageStt${initialIndexStt}`;
        const imageMapNameStt = `image-mapStt${initialIndexStt}`;
        const imageTooltipIdStt = `tooltip-stt${initialIndexStt}`;

        appendMessage2(`▪  ${ttsNarration}<br><br>
                          ▪ <img src=${imageUrlStt} ${
          window.innerWidth < 768 ? "width='200'" : "width='400'"
        } usemap="#${imageMapNameStt}" id=${imageIdStt} style="border-radius: 8px; margin-top: 4px;" /> <br><br>
                          ▪ Question : <br> ${initialQuestionTextStt}`);
        setHoverPointsStt(
          coordsStt,
          imageIdStt,
          imageMapNameStt,
          imageTooltipIdStt
        );
        console.log("IMAGE MAPPED WITH COORDS");

        // questionText2 = questionText2 + imageDiv
      } else {
        if (testType2 != "mcq" && testType2 != "dynamic_mcq") {
          let strList = initialQuestionTextStt.replaceAll("*", "");
          strList = strList.split(":", 2);
          if (strList.length > 1) {
            initialQuestionTextStt = strList[1];
            initialQuestionTextStt =
              `<b>${strList[0]}:</b><br>` + `<p>${initialQuestionTextStt}</p>`;
          }
        }
        appendMessage2(initialQuestionTextStt);
      }
    }
  } else {
    resetAllVariablesStt();
    const gshadowRoot = document.getElementById("chat-element2").shadowRoot;
    const msg = gshadowRoot.getElementById("proceed-option2");
    // button.parentNode.removeChild(button)
    const que_msg = document.createElement("div");
    que_msg.innerHTML = "Please Wait..."; // You can customize the message here
    // Replace the button with the "Thank you" message
    msg.parentNode.replaceChild(que_msg, msg);
    appendMessage2("<b>Your session is terminated. You can restart again!</b>");

    //enable Copy Paste
    const textInputElement = gshadowRoot.getElementById("text-input")
    textInputElement.removeAttribute("onpaste")
  }
};

//* handle MCQ type test : start
async function setMcqVariablesStt() {
  gShadowRoot2 = document.getElementById("chat-element2").shadowRoot;
  const responseValueStt = gShadowRoot2.querySelector(
    'input[name="mcq_option_stt"]:checked'
  );

  console.log("Response value", responseValueStt);
  const sessionQuestionIdStt = gShadowRoot2
    .getElementById("question-stt")
    .getAttribute("value");
  const question_id = sessionQuestionIdStt.split(":")[0];
  const test_attempt_session_id = sessionQuestionIdStt.split(":")[1];

  const optionsNameStt = gShadowRoot2.querySelectorAll(
    '[name="mcq_option_stt"]'
  );

  const responseTextStt = responseValueStt.value;
  const responseOptionStt = responseValueStt.id;

  console.log("question_id", question_id, "session", test_attempt_session_id);
  console.log(mcqQustionIndexStt, globalQuestionLengthStt);
  mcqQustionIndexStt++;

  let qUid;
  let newOption1NameStt;
  let newOption2NameStt;
  let newOption1TextStt;
  let newOption2TextStt;

  if (mcqQustionIndexStt != globalQuestionLengthStt) {
    if (testType2 === "dynamic_mcq") {
      gShadowRoot2.getElementById(`mcq-option-stt-${mcqFormIdStt}`).innerHTML =
        "Processing ...";
      console.log(questionText2, "q");
      queryParams2 = new URLSearchParams({
        description: senarioDescription2,
        situation:
          mcqQustionIndexStt == 1
            ? globalQuestionDataStt.results[0].questions[mcqQustionIndexStt - 1]
                .question
            : questionText2,
        option_a: optionsNameStt[0].defaultValue,
        option_b: optionsNameStt[0].defaultValue,
        option_selected: responseTextStt,
        test_attempt_session_id: test_attempt_session_id,
      });

      await fetch(
        `${baseURL2}/test-attempt-sessions/get_next_mcq_question_options/?${queryParams2}`,
        {
          method: "GET",
          headers: {
            Authorization: `Basic ${createBasicAuthToken2(key2, secret2)}`,
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("Dynamic mcq response : ", data);
          console.log(data.options_data);
          questionText2 = data.options_data.next_situation;
          newOption1NameStt = data.options_data.option_a;
          newOption2NameStt = data.options_data.option_b;
          newOption1TextStt = data.options_data.option_a;
          newOption2TextStt = data.options_data.option_b;
          // qUid = data.options_data.next_situation;
          qUid =
            globalQuestionDataStt.results[0].questions[mcqQustionIndexStt].uid;
        });
    } else {
      // updating question
      console.log("currentquestionidex", mcqQustionIndexStt);
      console.log(`Story ${responseOptionStt}`);

      const matchingQuestionsStt =
        globalQuestionDataStt.results[0].questions.filter(
          (question) => question.mcq_path === `Story ${responseOptionStt}`
        );

      qUid = matchingQuestionsStt.map((question) => question.uid)[0];
      const mcqOptionsStt = matchingQuestionsStt.map(
        (question) => question.mcq_options
      )[0];
      const optionName = Object.keys(mcqOptionsStt);
      questionText2 = matchingQuestionsStt.map(
        (question) => question.question
      )[0];

      const questionMedia = matchingQuestionsStt.map(
        (question) => question.media_link
      )[0];

      let queImageData;
      if (
        mediaPropsStt &&
        mediaPropsStt[`question_image ${responseOptionStt}`]
      ) {
        queImageData = [
          mediaPropsStt[`question_image ${responseOptionStt}`],
          mediaPropsStt[`question_image_mobile ${responseOptionStt}`],
        ];
      }

      newOption1NameStt = optionName[0];
      newOption2NameStt = optionName[1];
      newOption1TextStt = mcqOptionsStt[newOption1NameStt]["opt"];
      newOption2TextStt = mcqOptionsStt[newOption2NameStt]["opt"];

      console.log(
        newOption1NameStt,
        newOption2NameStt,
        newOption1TextStt,
        newOption2TextStt
      );
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
            questionText2 = `▪ Media <br>  <iframe
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
                questionText2 =
                  questionText2 +
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
                questionText2 =
                  questionText2 +
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
              if (isImmersiveStt) {
                questionText2 = questionText2.replaceAll(":", "");
                console.log("first", questionText2);

                const urltts = `${baseURL2}/test-responses/get-text-to-speech/?text=${questionText2}`;
                const response = await fetch(urltts, {
                  method: "GET",
                  headers: {
                    Authorization: `Basic ${createBasicAuthToken2(
                      key2,
                      secret2
                    )}`,
                  },
                });

                const blob = await response.blob();
                console.log("respnse", blob);

                const objectUrl = URL.createObjectURL(blob);

                console.log(objectUrl, "url");
                questionText2 = `<div ><audio style="${
                  window.innerWidth < 600
                    ? "width: 200px; max-width: 200px !important;"
                    : " min-width: 50vw !important;"
                }" controls autoplay>
              <source src=${objectUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
              </audio></div>`;
                console.log(questionText2);
              }
              questionText2 =
                questionText2 +
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

      if (isImmersiveStt && !questionMedia) {
        questionText2 = questionText2.replaceAll(":", "");
        console.log("first", questionText2);

        const urltts = `${baseURL2}/test-responses/get-text-to-speech/?text=${questionText2}`;
        const response = await fetch(urltts, {
          method: "GET",
          headers: {
            Authorization: `Basic ${createBasicAuthToken2(key2, secret2)}`,
          },
        });

        const blob = await response.blob();
        console.log("respnse", blob);

        const objectUrl = URL.createObjectURL(blob);

        console.log(objectUrl, "url");
        questionText2 = `<div ><audio style="${
          window.innerWidth < 600
            ? "width: 200px; max-width: 200px !important;"
            : " min-width: 50vw !important;"
        }" controls autoplay>
        <source src=${objectUrl} type="audio/mpeg" />
        Your browser does not support the audio element.
        </audio></div>`;
        console.log(questionText2);
      }
    }

    console.log("newquestionid", qUid, "session", test_attempt_session_id);

    formRadioStt = `
                  <div id='question-stt' style="font-size: 16px; margin-bottom: 20px; color: #333;" value="${qUid}:${test_attempt_session_id}"><b>Q. </b>${questionText2}</div>
                  <div style="display: flex; flex-direction: row; justify-contents: space-around; gap: 8px; flex-wrap: wrap;">
                    <div style="display: flex; flex-direction: row; align-items: flex-start;">
                      <input type="radio" id="${newOption1NameStt}" name="mcq_option_stt" value="${newOption1TextStt}" style="margin-right: 5px;">
                      <label for="${newOption1NameStt}" style="font-size: 14px; margin-bottom: 10px; display: block;">${newOption1TextStt}</label>
                    </div>
                 
                    <div style="display: flex; flex-direction: row; align-items: flex-start;">
                      <input type="radio" id="${newOption2NameStt}" name="mcq_option_stt" value="${newOption2TextStt}" style="margin-right: 5px;">
                      <label for="${newOption2NameStt}" style="font-size: 14px; margin-bottom: 10px; display: block;">${newOption2TextStt}</label>
                    </div>
                   </div>
                  <button id="submit-btn" onclick="setMcqVariablesStt()" style="margin-top: 15px; padding: 10px 15px; width: 100%; border: 1px solid #1984ff; border-radius: 5px; color: white; background-color: #1984ff; cursor: pointer; font-size: 16px;">Submit</button>
                `;

    gShadowRoot2.getElementById(`mcq-option-stt-${mcqFormIdStt}`).innerHTML =
      formRadioStt;

    // // submitting response
    const testResponse = await fetch(`${baseURL2}/test-responses/`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${createBasicAuthToken2(key, secret)}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        test_attempt_session_id: test_attempt_session_id,
        question_id: question_id,
        response_text: responseTextStt,
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

    // let credentialsForm2 = `
    //   <b>For obtaining your report, please submit the following details.</b>
    //   <div id="input-form2">
    //   <div style="display: flex; flex-direction: column">
    //       <label for="name" style="margin: 4px 0">Name  </label>
    //       <input
    //       type="text"
    //       id="input-name2"
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
    //       id="input-email2"
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
    //       id="submit-btn2"
    //       onclick="submitEmailAndName2()"
    //       >
    //       Submit
    //       </button>
    //   </div>
    // </div>`;

    let credentialsForm2 = getCredentialsForm2();

    console.log("user logged in, so sending email");
    gShadowRoot2.getElementById(
      `mcq-option-stt-${mcqFormIdStt}`
    ).innerHTML = `<b>That's it! Thank you for participating in the interaction. Your interaction report is being processed.</b>`;

    // // submitting response
    const testResponse = await fetch(`${baseURL2}/test-responses/`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${createBasicAuthToken2(key, secret)}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        test_attempt_session_id: test_attempt_session_id,
        question_id: question_id,
        response_text: responseTextStt,
        response_file: "",
        user_attributes: {
          tag: "deepchat_profile",
          attributes: {
            username: "web_user",
            email: window.user ? window.user.email : getAnonymousEmail(),
          },
        },
      }),
    });

    const testResponseData = await testResponse.json();
    console.log("last", testResponseData);
    const res = await fetch(
      `${baseURL2}/test-attempt-sessions/check-session-data-exist/?session_id=${test_attempt_session_id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Basic ${createBasicAuthToken2(key2, secret2)}`,
          "Content-Type": "application/json",
        },
      }
    );

    const isCheck = await res.json();
    console.log(isCheck);

    if (!isCheck.check) {
      console.log("failed to save session data", isCheck);
      if (testType2 === "mcq" || testType2 === "dynamic_mcq") {
        const shadowRoot = document.getElementById("chat-element2").shadowRoot;
        const button = shadowRoot.getElementById(
          `mcq-option-stt-${mcqFormIdStt}`
        );
        // button.parentNode.removeChild(button)
        const thankYouMessage = document.createElement("div");
        thankYouMessage.innerHTML = "<b>Thank you!</b>"; // You can customize the message here

        // Replace the button with the "Thank you" message
        button.parentNode.replaceChild(thankYouMessage, button);
      }
      if (isProceedStt === "false") {
        const gshadowRoot = document.getElementById("chat-element2").shadowRoot;
        const msg = gshadowRoot.getElementById("proceed-option2");
        // button.parentNode.removeChild(button)
        const que_msg = document.createElement("div");
        que_msg.innerHTML = "Thank You"; // You can customize the message here
        // Replace the button with the "Thank you" message
        msg.parentNode.replaceChild(que_msg, msg);
      }

      resetAllVariablesStt();

      appendMessage2(
        "<p style='font-size: 14px;color: #991b1b;'><b>Unfortunately due to technical reasons, your earlier response could not be processed. The session will be terminated. Please try again using the interaction code.</b>.</p>"
      );

      return;
    }

    if (!window.user) {
      console.log("user not logged in, so asking for credentials");
      // gShadowRoot2.getElementById(`mcq-option-stt-${mcqFormIdStt}`).innerHTML =
      //   credentialsForm2;
      isEmailFormstt = true;
      formFieldsstt = ["name", "email"];
      appendMessage2(`<b>Please enter your ${formFieldsstt[0]}</b>`);
    }

    await fetch(`${baseURL2}/frontend-auth/get-report-url/`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${createBasicAuthToken2(key2, secret2)}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: participantId2,
        report_type: "decisionAnalysisReport",
        session_id: test_attempt_session_id,
        interaction_id: globalQuestionDataStt.results[0].uid,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        reportUrl2 = data.url;
        globalReportUrl2 = data.url;
        console.log("Report Url : ", reportUrl2, globalReportUrl2);
        responsesDone2 = true;
        questionIndex2 = 0;
        mcqFormIdStt++;

        if (window.user) {
          // append custom message to chat
          const message2 = `<b>It's showtime ✨, here is your detailed <a target="_blank" style="color: #3b82f6;text-decoration:none;" href="${globalReportUrl2}">feedback report</a>. The feedback is also emailed to you and will be available to you for 60 days.</b>`;
          appendMessage2(message2);

          //* send message to start new session
          appendMessage2(
            "<b>Please enter another access code to start a new interaction.</b>"
          );
          submitEmailAndName2();
        }
      });

    // const urlObject = new URL(reportUrl2);
    // const baseurl = `${urlObject.protocol}//${urlObject.host}`;

    // const resp = await fetch(baseurl)
    // if (!resp.ok){
    //   appendMessage2(
    //     "<p style='font-size: 14px;color: #991b1b;'><b>Our report server is currently down. Please try again.</b>.</p>"
    //   )
    // }
  }
}

//* handle MCQ type test : end

let queryParams2;

async function proceedFormFlowStt(msg) {
  if (formFieldsstt.length > 0) {
    isEmailFormstt = true;
    const filedname = formFieldsstt[0];
    formFieldsstt = formFieldsstt.slice(1);
    emailNameformJsonstt[filedname] = msg;
  }
}
function sendEmail2(session_id, reportUrl) {
  // responsesDone = false;
  console.log("sending email");
  const queryParams22 = new URLSearchParams({
    test_attempt_session_id: session_id,
    report_url: reportUrl,
    is_whatsapp: false,
  });

  fetch(
    `${baseURL2}/test-attempt-sessions/send-report-email/?${queryParams22}`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${createBasicAuthToken2(key2, secret2)}`,
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      emailSent2 = data.status;
      console.log("email sent");
      // resetAllVariablesStt();
    })
    .catch((err) => console.log(err));
}

async function submitEmailAndName2() {
  const shadowRoot2 = document.getElementById("chat-element2").shadowRoot;

  if (!window.user) {
    // const inputNameVal2 = shadowRoot2.getElementById("input-name2").value;
    // const inputEmailVal2 = shadowRoot2.getElementById("input-email2").value;
    // inputName2 = inputNameVal2;
    // inputEmail2 = inputEmailVal2;
    inputEmail2 = emailNameformJsonstt["email"];
    inputName2 = emailNameformJsonstt["name"];

    queryParams2 = new URLSearchParams({
      participant_id: participantId2,
      email: inputEmail2,
      name: inputName2,
    });
  } else {
    queryParams2 = new URLSearchParams({
      participant_id: participantId2,
      email: window.user.email,
      name: window.user.given_name ,
    });
  }
  // await fetch(
  //   `${baseURL2}/test-attempt-sessions/set-name-and-email/?${queryParams2}`,
  //   {
  //     method: "POST",
  //     headers: {
  //       Authorization: `Basic ${createBasicAuthToken2(key2, secret2)}`,
  //       "Content-Type": "application/json",
  //     },
  //   }
  // )
  //   .then((response) => response.json())
  //   .then((data) => {
  //     credsUpdated2 = data.status;
  //     console.log("name email updated, sending email");
      sendEmail2(sessionId2, globalReportUrl2);
      const page_name = questionData2.results[0].page_name
      const test_code = testCode2 
      resetAllVariablesStt();

      if ( page_name!== 'explore'){
        increaseActionPointStt(userId2, "interaction_attempted");
      }
      // append custom message to chat
      const message2 = `<b>It's showtime ✨, here is your detailed <a target="_blank" style="color: #3b82f6;text-decoration:none;" href="${globalReportUrl2}">feedback report</a>. The feedback is also emailed to you and will be available to you for 60 days.</b>`;

      //* send message to start new session
      // if (!user2) {
      //   appendMessage2(message2);
      //   appendMessage2(
      //     "<b>Please enter another access code to start a new interaction.</b>"
      //   );
      // } else {
      //   globalSignals.onResponse({
      //     html: "<b>Please enter another access code to start a new interaction.</b>",
      //   });
      // }
      const recommDiv = findRelatedItemsStt(recommendationsDataStt, test_code);
      if (recommDiv) {
        appendMessage2(recommDiv);
      }

    // })
    // .catch((err) => {
    //   console.log(err);
    // });
  //   const queryParams22 = new URLSearchParams({
  //     test_attempt_session_id: sessionId2,
  //     report_url: globalReportUrl2,
  //     is_whatsapp: false,
  //   });
  //   await fetch(
  //     `${baseURL2}/test-attempt-sessions/send-report-email/?${queryParams22}`,
  //     {
  //       method: "POST",
  //       headers: {
  //         Authorization: `Basic ${createBasicAuthToken2(key2, secret2)}`,
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   )
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data.status)
  //       emailSent2 = data.status;
  //       console.log(emailSent2)
  //     })
  //     .catch((err) => console.log(err));
}

function handleSurpriseMeButtonClick2(
  recommendation_code,
  recommendation_title
) {
  const challenges2 = [
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
  console.log(
    "surprise me! button clicked",
    "recommendation code : ",
    recommendation_code,
    "recommendation title : ",
    recommendation_title
  );

  let tempTestTitle = "";

  if (
    recommendation_code == undefined ||
    recommendation_code == null ||
    recommendation_code == ""
  ) {
    const randomIndex2 = Math.floor(Math.random() * challenges2.length);
    const randomChallenge2 = challenges2[randomIndex2];

    //   console.log(randomChallenge);
    //   testCode = randomChallenge.test_code;
    //   codeAvailabilityUserChoice = true;
    console.log("random challenge :==>", randomChallenge2);
    testCode2 = randomChallenge2.trim();

    gShadowRoot2 = document.getElementById("chat-element2").shadowRoot;
    optedNo2 = true;
    userAcessAvailability2 = true;
    // gShadowRoot2.getElementById("surprise-button").disabled = true;

    // // removing button
    // const msg = gShadowRoot2.getElementById("surprise-button");
    // // button.parentNode.removeChild(button)
    // const que_msg = document.createElement("div");
    // que_msg.innerHTML = "Please Wait..."; // You can customize the message here
    // // Replace the button with the "Thank you" message
    // msg.parentNode.replaceChild(que_msg, msg);
    tempTestTitle = sampleTestCodesStt[randomChallenge2];
  } else {
    console.log("handling recommendation in surprise me");
    testCode2 = recommendation_code;
    tempTestTitle = recommendation_title;
    allowRecommendationTestCode = true;
    testCodeAvailability2 = true;
    codeAvailabilityUserChoice2 = "No";
    optedNo2 = true;
    userAcessAvailability2 = true;
    recommendationClicked = false;
    isAttemptingRecommendation = true;
  }

  gShadowRoot2.getElementById("text-input").focus();
  setTimeout(() => {
    gShadowRoot2.getElementById("text-input").textContent = tempTestTitle;
    setTimeout(() => {
      gShadowRoot2.querySelectorAll(".input-button")[1].click();
    }, 100);
  }, 100);
}

const optionDetail2 = [
  {
    "Integrating a New Team Member": {
      area: "Building Credibility as the New Team Member",
      information:
        "Upon joining the team, the new member conscientiously familiarized themselves with the organization's mission, values, and current projects. They proactively sought opportunities to engage with team members, attending both formal meetings and informal gatherings. Demonstrating a keen understanding of their role, the new member consistently met deadlines and exceeded expectations. Their meticulous approach to tasks and open communication style fostered positive relationships within the team. By actively seeking feedback, the new member showcased a commitment to continuous improvement, solidifying their credibility as a valued team contributor.",
    },
  },
  {
    "Effective Customer Service Management": {
      area: "Handling Impatient Customer Interactions",
      information:
        "During a product launch, a customer voiced impatience about delayed delivery. Responding promptly, the service representative acknowledged the concern empathetically, providing a detailed explanation of the situation and steps being taken for resolution. They assured the customer of their commitment to resolving the issue promptly, offering a personalized discount for the inconvenience. The representative's proactive communication and solution-oriented approach not only pacified the customer but also reinforced the company's dedication to customer satisfaction, effectively diffusing a potentially tense situation.",
    },
  },
  {
    "Cultivating Growth Through Feedback": {
      area: "Personal Growth Through Feedback",
      information:
        "Engaged in a continuous cycle of personal development, the individual proactively sought feedback from peers and supervisors. Embracing constructive criticism, they identified areas for improvement and implemented targeted strategies for growth. Their commitment to self-reflection, coupled with a receptive attitude, propelled them to refine their skills effectively. This dedication to harnessing feedback as a catalyst for personal and professional advancement underscored their commitment to ongoing personal growth within the organizational context.",
    },
  },
  {
    "Cultivating Team Impartiality": {
      area: "Managing Favoritism and Bias",
      information:
        "The team leader, recognizing the importance of impartiality, consistently employed transparent decision-making processes. In project assignments, they carefully considered individual strengths, ensuring a fair distribution of opportunities. Regularly monitoring interactions, the leader actively discouraged favoritism and biased behavior within the team. Recognizing the potential impact on morale, they implemented inclusive practices, fostering an environment where each team member felt valued. By promoting meritocracy and addressing biases head-on, the leader contributed to a harmonious and equitable work atmosphere, reinforcing the team's commitment to professionalism and fairness.",
    },
  },
  {
    "Managing Meeting Momentum": {
      area: "Assertively Handling Interruptions",
      information:
        "During a crucial team meeting, the project lead faced multiple interruptions from team members eager to share their perspectives. With assertiveness, the project lead implemented a structured approach, acknowledging each interruption, expressing appreciation for input, and then redirecting focus to the agenda. This tactful handling of interruptions not only maintained the meeting's momentum but also ensured that all voices were heard without compromising the meeting's objectives. The project lead's ability to navigate interruptions with poise contributed to a more effective and collaborative team environment.",
    },
  },
];

function generateOptionButtons2() {
  // Get the container element
  var container = document.getElementById("option-button-container");

  // Iterate through the data array to create buttons dynamically
  optionDetail2.forEach(function (item) {
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
      "handleOptionButtonClick2('" + buttonText + "')"
    );

    // Append the button to the container
    container.appendChild(button);
  });
}

const handleAttemptScenaiosSTT = async (title, test_code) =>{
  console.log('Attempting Scenaios', test_code, title)

  testCode2 = test_code;
  userAcessAvailability2 = true;
  optedNo2 = true;

  gShadowRoot2 = document.getElementById("chat-element2").shadowRoot;
  gShadowRoot2.getElementById("text-input").focus();
  setTimeout(() => {
    gShadowRoot2.getElementById("text-input").textContent = test_code;
    setTimeout(() => {
      gShadowRoot2.querySelectorAll(".input-button")[1].click();
    }, 100);
  }, 100);
}

//* Function to handle button click for no-code flow : start
async function handleOptionButtonClick2(labelText) {
  console.log("button clicked in stt", labelText);
  const gShadowRoot2 = document.getElementById("chat-element2").shadowRoot;
  const button = gShadowRoot2.getElementById("create-new-scenario");
  button.disabled = true;


  if (gShadowRoot2.querySelectorAll('#create-scenario-section').length > 0){
    console.log('already existed')
    return
  }

  
  optedNo = true;
  // var currentURL = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ":" + window.location.port : "") + window.location.pathname + window.location.search + window.location.hash;
  var currentURL = "https://playground.coachbots.com/content-library"
  console.log('currenturl',currentURL);
  
  const generationLoader = `<div id="scenario-generation-loader" styte="font-size: 12px; color: lightgray; padding: 10px 0;">Please wait, we are generating your scenarios...</div>`
  appendMessage2(generationLoader)

  const allMessages = gShadowRoot2.getElementById("messages").childNodes;
  // gShadowRoot2 = document.getElementById("chat-element2").shadowRoot;
  // gShadowRoot2.getElementById("text-input").focus();
  // setTimeout(() => {
  //   gShadowRoot2.getElementById("text-input").textContent = labelText;
  //   setTimeout(() => {
  //     console.log(gShadowRoot2.querySelectorAll(".input-button"));
  //     gShadowRoot2.querySelectorAll(".input-button")[1].click();
  //   }, 100);
  // }, 100);

  const url = new URL(
    `${baseURL2}/tests/get_or_create_test_scenarios_by_site/`
  );
  const params = new URLSearchParams();
  params.set("mode", "A");
  params.set(
    "url",
    currentURL
  );
  params.set("access_token", `Basic ${createBasicAuthToken2(key2, secret2)}`);
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
      challenges.forEach(element => {
        if (element.title){
          scenarios.push(element)
        }
        
      });

      console.log('sucessfully crated scenarios: ', scenarios)
      if (scenarios.length == 0){
        appendMessage2("<p style='font-size: 12px;color: #991b1b;'>Scenario generation failed because of failure of page extraction</p>")
        return
      }
      let divCont = '';
      scenarios.forEach((element, i) => {
        divCont += `
        <p style="font-size: 16px; color: #333; margin: 0; ${i === 1 && "margin-top : 10px"}">${element.title}</p>
        <div>
          <button 
            onmouseover="this.style.cursor ='pointer'" 
            style="
              margin-top: 8px;
              padding: 6px 10px;
              border: none;
              border-radius: 4px;
              background-color: #007BFF;
              color: white;
              font-size: 12px;
              font-weight: 600;
              transition: background-color 0.3s ease;
            " 
            onmouseout="this.style.backgroundColor = '#007BFF'"
            onmouseover="this.style.backgroundColor = '#0056b3'"
            onclick="handleAttemptScenaiosSTT('${element.title}', '${element.test_code}')">
            Attempt
          </button>
        </div>
        `
      }); 

      appendMessage2(`
      <div id='create-scenario-section' style="padding: 15px 8px; max-width: 300px;">
      ${divCont}
      </div>
      `);
    })
    .catch((err) => console.log(err));
}

let chatInputFontSize = "14px";
if(window.innerWidth < 768) {
  chatInputFontSize = "12px"
}

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

// Call the function to load and use the external module2
loadExternalModule().then(() => {
  deepChatPocElement2 = document.getElementsByClassName("coachbots-coachscribe")?.[0];
  deepChatPocElement2.innerHTML = `
  <div class="chat-wrapper2">
    <div
      onclick="closeFromTop2()"
      id="backdrop"
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
      onclick="openChatContainer2()"
      class="chat-icon-container2"
      id="chat-icon2"
      style="
        height: 4.5rem;
        width: 4.5rem;
        background-color: white;
        box-shadow: 0px 0px 10px rgb(125, 125, 125);
        border-radius:40%;
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        right: 2rem;
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
        class="chat-icon2"
        style="height: 100%; width: 100%; border-radius:40%;"
        src="https://cdn.statically.io/gh/falahh6/coachbots/main/coachbot-logo-bot.png"
        alt="chat-bot-image"
      />
    </button>
  </div>
  
  <div
    class="chat-container2 " 
    id="chat-container2"
    style="
      position: fixed;
      scale: 0;
      bottom: 15vh;
      width: 80vw;
      right: 6rem; 
      transition: 0.4s ease-in-out; 
      transform-origin: right bottom;
      padding-bottom: 0.8rem;
      border-radius: 1rem 1rem 0rem 1rem;
      box-shadow: 0px 0px 10px rgb(196, 196, 196);
      background-color: white;
      z-index: 999 !important;
      hight: 75vh;
    "
  >
    <div 
    style="
      display: flex;
      justify-content: center;
      align-items: center;
      height: fit-content;
      background-color: #f3f4f6;
      border-radius: 1rem 1rem 0 0;
      margin-bottom: 0.4rem;
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
   
    <div 
      id="close-top2" 
      onmouseover="this.style.cursor ='pointer'"
      onclick="closeFromTop2()"
      style="
        width : 50px;
        position: absolute;
        left : 1rem;
      "
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" stroke="10" height="24" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
      </svg>
    </div>
    
    </div>
    <deep-chat
      id="chat-element2"
      style="position: relative; top : 0; bottom: 0; left: 0 ; right: 0; width: 10%; height: 70vh; border: none;"
      messageStyles='{
        "default": {
          "shared": {"bubble": {"maxWidth": "80%", "marginTop": "4px", "borderRadius" : "4px", "padding" : "10px 8px", "fontWeight" : "normal"}},
          "ai" : {"bubble": {"backgroundColor": "#f3f4f6"}},
          "user" : {"bubble": {"backgroundColor": "#2DC092"}}
        },
        "loading": {
          "bubble": {"fontSize": "20px", "color": "white", "width" : "2rem", "paddingLeft": "2rem"}
        }
      }'
      inputAreaStyle='{"paddingTop": "2rem"}'
      displayLoadingBubble = "true";
      demo="true"
      style="border: none"
      textInput='{
        "styles": {
          "text": {"color": "black", "fontSize" : ${JSON.stringify(chatInputFontSize)}},
          "container": {"padding":"4px", "backgroundColor": "white", "border" : "1px solid #9ca3af", "zIndex" : "1"},
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
      speechToText='{"webSpeech": true,
        "commands": {"resume": "resume", "submit" : "submit", "settings": {"commandMode": "hello"}},

        "button": {
          "position" : "outside-left",
          "default": {
            "container": {
              "default" : {"padding" : "4px"},
              "hover": {"backgroundColor": "#7fbded69", "padding" : "4px"},
              "click": {"backgroundColor": "#4babf669", "padding" : "4px"}
            },
             "svg": {
              "styles": {
                "default": {
                  "filter":
                    "brightness(0) saturate(100%) invert(53%) sepia(0%) saturate(826%) hue-rotate(52deg) brightness(95%) contrast(93%)"
                }
              },
                "content" : ${JSON.stringify(
                  '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-mic-mute" viewBox="0 0 16 16"><path d="M13 8c0 .564-.094 1.107-.266 1.613l-.814-.814A4.02 4.02 0 0 0 12 8V7a.5.5 0 0 1 1 0zm-5 4c.818 0 1.578-.245 2.212-.667l.718.719a4.973 4.973 0 0 1-2.43.923V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 1 0v1a4 4 0 0 0 4 4m3-9v4.879l-1-1V3a2 2 0 0 0-3.997-.118l-.845-.845A3.001 3.001 0 0 1 11 3"/><path d="m9.486 10.607-.748-.748A2 2 0 0 1 6 8v-.878l-1-1V8a3 3 0 0 0 4.486 2.607m-7.84-9.253 12 12 .708-.708-12-12-.708.708z"/></svg>'
                )}
          }
          },
          "active": {
            "container": {
              "default" : {"padding" : "4px"},
              "hover": {"backgroundColor": "#fee2e2", "padding" : "4px" },
              "click": {"backgroundColor": "#ecb85c70"}
            },
            "svg": {
              "styles": {
                "default": {
                  "filter":
                    "brightness(0) saturate(100%) invert(17%) sepia(98%) saturate(7277%) hue-rotate(359deg) brightness(99%) contrast(112%)"
                }
              },
               "content" : ${JSON.stringify(
                 '<svg viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg"><g fill="#232629"><path d="m3 9v2c0 2.419003 1.7176959 4.43717 4 4.900391v2.099609h-2v1h6v-1h-2v-2.099609c2.282304-.463221 4-2.481388 4-4.900391v-2h-1v2c0 2.209139-1.790861 4-4 4s-4-1.790861-4-4v-2zm5-6c-1.656854 0-3 1.343146-3 3v5c0 1.656854 1.343146 3 3 3s3-1.343146 3-3v-5c0-1.656854-1.343146-3-3-3z"/><path d="m14.279297 3.828125-.451172.892578.447266.226563c1.111155.560919 2.066402 1.437981 2.71875 2.498046.652348 1.060066 1.005859 2.30998 1.005859 3.554688s-.353511 2.494622-1.005859 3.554688c-.652348 1.060065-1.607595 1.937127-2.71875 2.498046l-.447266.226563.451172.892578.445312-.224609c1.279348-.645825 2.370002-1.648617 3.121094-2.869141s1.154297-2.64501 1.154297-4.078125-.403205-2.857601-1.154297-4.078125-1.841746-2.223316-3.121094-2.869141z"/><path d="m13.21875 6.550781-.4375.898438c.659004.321264 1.230576.835327 1.619141 1.457031.388564.621704.599609 1.360608.599609 2.09375s-.211045 1.472047-.599609 2.09375c-.388565.621703-.960137 1.135767-1.619141 1.457031l.4375.898438c.830592-.404914 1.53956-1.042593 2.029297-1.826172s.751953-1.699013.751953-2.623047-.262216-1.839468-.751953-2.623047-1.198705-1.421258-2.029297-1.826172z"/></g></svg>'
               )}
          }
        }
      }}'
      errorMessages='{
        "overrides": {
          "default": "System Error. But please continue and/or retry."
        }
      }'
      >

    </deep-chat>
    <div 
      id="starting-faq-buttons"
      style=" 
        position: absolute; 
        left : ${window.innerWidth < 768 ? "1rem" : "6rem"}; 
        bottom : ${window.innerWidth < 768 ? "13vh" : "5.5rem"}; 
        width : 80%; 
        overflow: scroll;
        scrollbar-width : none;
        height : 36px; 
        display : flex;
        flex-direction : row;
        gap : 4px;
        background-color : white; 
        padding : 2px;
        padding-top : ${window.innerWidth < 768 ? "4px" : "2px"}; 
        border-radius : 4px;
        display: none;
      ">
    </div>
    <p id="bot-footer" style="font-size: ${
      window.innerWidth < 768 ? "10px" : "12px"
    }; width: 100%; text-align: center; padding: 0 10%; height:25px;"> Usage direction for Coachbots. Follow the instructions for optimum performance. 
      <span id="read-more-button" onmouseover="this.style.cursor ='pointer'">
        <button style="border: 1px solid darkgrey; padding: 1px 4px; border-radius: 4px; font-weight: 600; color: #3b82f6"> 
          Read here
        </button>
      </span> 
      <div id="instructions-pane" style="position : absolute; left : 0px; bottom: 0px; right : 0px; width: 95%; border-radius: 10px; background-color: #eff6ff; margin: 20px; margin-left:  ${window.innerWidth < 768 ? "5px" : "25px" }; margin-bottom: 15px; z-index: 999; padding: 10px; display: none; justify-content: space-between; align-items: start;  border: 1px solid lightgray;">
        <div style="font-size: 12px;">
          <ul>
            <li>1 . For Coaches/mentors in the Directory, Click on "End Session" to keep a record of sessions. Your coach/mentor is informed and a transcript is shared after the same. For Icons by AI, it will just keep the record of the conversation. </li>
            <li>2 .  For any type of avatar or simulation bots, Unrelated questions, answers, or comments and very fast responses may cause system errors. The usage is meant to mimic how it works in the real world.  </li>
            <li>3 . Keep responses within 10 to 400 words for optimum results. You can either type or speak out your responses. If it's a simulation/roleplay, the "Coach Talk", NLP will also provide you speech analysis in reports.</li>
            <li>4 . Guide bots are based on specific framework-based responses while user-generated bots are representations of the user's knowledge base on any topic. </li>
            <li>5 . Simulations and roleplays are meant to practice how real-life scenarios play out. You can check the Explore page to review the scenarios covered. Both CoachTalk and Coachscribe can be used to handle them.</li>
            <li>6 . In rare cases, there may be delays in responses and reports because of system availability issues.</li>
            <li>7 . For AI frames/avatars, the model is a point of view of the coach on a particular topic, for best results stick to the area highlighted in the coach/mentor's page.</li>
            <li>8 . Cochbot sessions should be assumed to have no prior memory, always restate your context for the current session.</li>
            <li>9 . For user-created knowledge bots, always ask the questions related to skill area defined, for best results.</li>
          </ul>
        </div>
        <span id="close-intructions-pane" onmouseover="this.style.cursor ='pointer'" style="padding : 2px; border-radius: 50%; background-color: white;">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
          </svg>
        </span>
      </div> 
    </p> 
  </div>
  `;

  const readMoreButton = document.getElementById('read-more-button')
  const instructionsPane = document.getElementById('instructions-pane')
  const closeInstructionsPane = document.getElementById('close-intructions-pane')

  readMoreButton.addEventListener("click", () => {
    instructionsPane.style.display = "flex"
  })

  closeInstructionsPane.addEventListener("click", () => {
    instructionsPane.style.display = "none"
  })

  const chatContainer2 = document.getElementById("chat-container2");
  const chatElementRef2 = document.getElementById("chat-element2");
  const chatIconContainer2 = document.getElementById("chat-icon2");
  const chatbotHeading2 = document.getElementById("chatbot-heading2");
  const closeFromTopp2 = document.getElementById("close-top2");
  botId = document.querySelector(".coachbots-coachscribe").dataset.botId;
  sttWidgetClientId = document.querySelector(".coachbots-coachscribe").dataset.clientId;
  console.log("stt widget ClientID :",sttWidgetClientId)
  // botId = 'stress-management-0032'
  const _ = getBotDetails2(botId);

  //   appendMessage2(`<div id="option-button-container" >
  //                     <button style="margin-top:5px; width:100%; padding:6px 4px; border: 1px solid lightgray; border-radius: 4px;" onclick="handleOptionButtonClick('Integrating a New Team Member')">Integrating a New Team Member</button>

  //                     <button style="margin-top:5px; width:100%; padding:6px 4px; border: 1px solid lightgray; border-radius: 4px;"  onclick="handleOptionButtonClick('Effective Customer Service Management')">Effective Customer Service Management</button>

  //                     <button style="margin-top:5px; width:100%; padding:6px 4px; border: 1px solid lightgray; border-radius: 4px;"  onclick="handleOptionButtonClick('Cultivating Growth Through Feedback')">Cultivating Growth Through Feedback</button>

  //                     <button style="margin-top:5px; width:100%; padding:6px 4px; border: 1px solid lightgray; border-radius: 4px;"  onclick="handleOptionButtonClick('Cultivating Team Impartiality')">Cultivating Team Impartiality</button>

  //                     <button style="margin:5px 0; width:100%; padding:6px 4px; border: 1px solid lightgray; border-radius: 4px;"  onclick="handleOptionButtonClick('Managing Meeting Momentum')">Managing Meeting Momentum</button>
  //                 </div>`)

  //responsive styles for phones
  // if (window.innerWidth < 600) {
  //   chatContainer2.style.width = "80vw";
  //   chatContainer2.style.right = "10vw";
  //   chatContainer2.style.height = "78vh";
  //   chatContainer2.style.bottom = "12vh";
  //   chatElementRef2.style.height = "65vh";
  //   chatElementRef2.style.width = "80vw";
  //   chatIconContainer2.style.position = "fixed";
  //   chatIconContainer2.style.width = "3rem";
  //   chatIconContainer2.style.height = "3rem";
  //   chatContainer2.style.position = "fixed";
  //   closeFromTopp2.style.width = "30px";
  //   closeFromTopp2.style.left = "0.3rem";
  //   closeFromTopp2.style.top = "0.2rem";
  // }

  if (window.innerWidth < 600) {
    chatContainer2.style.borderRadius = "0"
    chatContainer2.style.width = "100vw";
    chatContainer2.style.right = "0";
    chatContainer2.style.top = "0";
    chatContainer2.style.height = "100vh";
    chatContainer2.style.bottom = "0";
    chatElementRef2.style.height = "87vh";
    chatElementRef2.style.fontSize = "12px";
    chatElementRef2.style.width = "100vw";
    chatIconContainer2.style.position = "fixed";
    chatIconContainer2.style.width = "3rem";
    chatIconContainer2.style.height = "3rem";
    chatContainer2.style.position = "fixed";
    closeFromTopp2.style.width = "30px";
    closeFromTopp2.style.left = "0.3rem";
    closeFromTopp2.style.top = "1rem";
  }

  let credentialsForm2;
  if (window.innerWidth > 868) {
    console.log("using des Form");
    credentialsForm2 = `
      <div style="min-width: 730px;">
      <b>For obtaining your report, please submit the following details.</b>
      <div
        id="input-form2"
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
            id="input-name2"
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
            id="input-email2"
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
          id="submit-btn2"
          onclick="submitEmailAndName2()"
        >
          Submit
        </button>
      </div>
    </div>`;
  } else {
    credentialsForm2 = `
      <div>
      <b>For obtaining your report, please submit the following details.</b>
      <div
        id="input-form2"
        style="
        display: flex;
        flex-direction: column;
        min-width: 100%;
        gap: 1rem;
        align-items: flex-start;
      "
      >
        <div style="display: flex; flex-direction: column; width: 100%;">
          <label for="name" style="margin: 12px 0 4px 0">Name</label>
          <input
            type="text"
            id="input-name2"
            style="
              padding: 8px;
              margin-bottom: 4px;
              border-radius: 4px;
              border: 1px solid rgb(188, 188, 188);
            "
          />
        </div>
        <div style="display: flex; flex-direction: column; width: 100%;">
          <label for="email" style="margin: 12px 0 4px 0">Email</label>
          <input
            id="input-email2"
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
          id="submit-btn2"
          onclick="submitEmailAndName2()"
        >
          Submit
        </button>
      </div>
    </div>`;
  }
  // if botid is null or notdefined show other message

  if (botId == undefined) {
    chatElementRef2.initialMessages = [
      {
        html: `<p>Welcome to Coachbots. Do you have access code for your simulation?</p>`,
        role: "ai",
      },
    ];
    chatElementRef2.initialMessages.push({
      html: `<div class="deep-chat-temporary-message"><button class="deep-chat-button deep-chat-suggestion-button" style="border: 1px solid green">Yes</button>
          <button class="deep-chat-button deep-chat-suggestion-button" style="border: 1px solid #d80000">No</button> </div>`,
      role: "user",
    });
  } else {
    // faqs = Object.keys(globalBotDetails.data.faqs)
    // console.log("Bot details",Object.keys(globalBotDetails.data.faqs))
    // let buttons = ''
    // faqs.forEach(title => {
    //     buttons += `<button style="margin-top:5px; width:100%; padding:6px 4px; border: 1px solid lightgray; border-radius: 4px;" onclick="handleFaqButtonClick('${title}')">${title}</button>`
    // })
    // console.log("buttons : ",buttons)
    // let htmlData = `<div id="option-button-container" >
    //                 ${buttons}
    //                 </div>`
    // chatElementRef2.initialMessages.push(
    //   {
    //     html:htmlData,
    //     role: "user",
    //   }
    // );
  }

  chatElementRef2.htmlClassUtilities = {
    ["deep-chat-temporary-message"]: {
      styles: {
        default: {},
      },
    },
    ["button2"]: {
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

  // to check word limit (limit set to 0, row 669)
  function isValidMessageStt(text, limit = 0, is_greater = false) {
    const words = text.split(" ");
    let uppercaseArray = words.map((element) => element.toUpperCase());
    if (
      uppercaseArray.includes("SKIP") &&
      (isTranscriptOnlyStt || testType2 === "coaching")
    ) {
      return true;
    }
    if(is_greater){
      if (words.length > limit) {
        return false;
      } else {
        return true;
      }
    } else {
      if (words.length < limit) {
        return false;
      } else {
        return true;
      }
    }
  }

  // to cancel all active test for a user
  const cancelTestStt = async (user_id) => {
    const url = `${baseURL2}/test-attempt-sessions/cancel-test-sessions/?user_id=${user_id}`;

    try {
      if (user_id) {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Basic ${createBasicAuthToken2(key2, secret2)}`,
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
  const getSessionStatusStt = async (session_id) => {
    const url = `${baseURL2}/test-attempt-sessions/get-session-status/?session_id=${session_id}`;

    try {
      if (session_id) {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Basic ${createBasicAuthToken2(key2, secret2)}`,
          },
        });

        const responseJson = await response.json();
        console.log(responseJson);

        sessionStatusStt = responseJson["status"];
        isSessionExpiredStt = responseJson["is_expired"];
      } else {
        sessionStatusStt = "inactive";
        isSessionExpiredStt = false;
      }
    } catch (error) {
      console.error(`Error in getSessionStatus: ${error}`);
    }
  };

  const getAttemptedTestList2 = async (userId) => {
    const url = `${baseURL2}/test-attempt-sessions/get-attempted-test-list/?user_id=${userId}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Basic ${createBasicAuthToken2(key2, secret2)}`,
        },
      });

      const responseJson = await response.json();
      console.log(responseJson);

      testCodeList2 = responseJson["data"]["codes"];
      console.log(testCodeList2);
    } catch (error) {
      console.error(`Error in getAttemptedTestList: ${error}`);
    }
  };

  const getIsRepeatStatus2 = async (participantId) => {
    const url = `${baseURL2}/accounts/get_is_repeat_status/?participant_id=${participantId}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Basic ${createBasicAuthToken2(key2, secret2)}`,
        },
      });

      isRepeatStatus2 = await response.json();
      console.log(isRepeatStatus2);
    } catch (error) {
      console.error(`Error in getIsRepeatStatus: ${error}`);
    }
  };

  const getTestPrevilage2 = async (participantId) => {
    const url = `${baseURL2}/tests/get-test-previlage-user/?user_id=${participantId}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Basic ${createBasicAuthToken2(key2, secret2)}`,
        },
      });

      testPrevilage2 = await response.json();
      console.log(testPrevilage2);
    } catch (error) {
      console.error(`Error in getTestPrevilage: ${error}`);
    }
  };

  const getTestCodesByRule2 = async (rule) => {
    const url = `${baseURL2}/accounts/get-test-codes-for-web/`;

    // const url = `${baseURL}/tests/get-test-previlage-user/?user_id=${participantId}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Basic ${createBasicAuthToken2(key2, secret2)}`,
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
      console.error(`Error in getTestPrevilage: ${error}`);
    }
  };

  const getClientInformationStt = async (use_case, user_id = null) => {
    const url = `${baseURL2}/accounts/get-client-information/?for=${use_case}`;
    // use case can ====> my_lib or (user_info, user_id)
    if (user_id && use_case === "user_info") {
      url += `&user_id=${user_id}`;
    }
    // const url = `${baseURL}/tests/get-test-previlage-user/?user_id=${participantId}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Basic ${createBasicAuthToken2(key2, secret2)}`,
        },
      });

      const resp_json = await response.json();
      console.log(resp_json);

      return resp_json["data"][`${use_case}`];
    } catch (error) {
      console.error(`Error in getClientInformationStt: ${error}`);
    }
  };

  const SessionCheckStt = async (session_id) => {
    const url = `${baseURL2}/test-attempt-sessions/check-session-data-exist/?session_id=${session_id}`;

    // const url = `${baseURL}/tests/get-test-previlage-user/?user_id=${participantId}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Basic ${createBasicAuthToken2(key2, secret2)}`,
        },
      });

      const resp_json = await response.json();
      console.log(resp_json);
      return resp_json.check;
    } catch (error) {
      console.error(`Error in SessionCheckStt: ${error}`);
    }
  };

  const TTSContainerSTT = async (text) => {
    const queDiv = `<p>${text}</p><br>`;
    const url = `${baseURL2}/test-responses/get-text-to-speech/?text=${text}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Basic ${createBasicAuthToken2(key2, secret2)}`,
      },
    });

    const blob = await response.blob();
    console.log("respnse", blob);

    const objectUrl = URL.createObjectURL(blob);

    console.log(objectUrl, "url");
    const audioCont =
      queDiv +
      `<div ><audio style="${
        window.innerWidth < 600
          ? "width: 200px; max-width: 200px !important;"
          : " min-width: 50vw !important;"
      }" controls autoplay>
      <source src=${objectUrl} type="audio/mpeg" />
      Your browser does not support the audio element.
      </audio></div>`;

    return audioCont;
  };

  const anthropicAiResponse = (
    userInputMessage,
    signals,
    conversationId,
    latestMessage
  ) => {
    console.log('anthropic', userInputMessage)
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

    messageBubble.appendChild(messageText);
    messageNode.appendChild(messageBubble);

    gShadowRoot2 = document.getElementById("chat-element2").shadowRoot;
    gShadowRoot2.getElementById("messages").appendChild(messageNode);
    gShadowRoot2.getElementById("messages").scrollBy(0, 500);

    const shadowRoot = document.getElementById("chat-element2").shadowRoot;
    const allMessages = shadowRoot.getElementById("messages").childNodes;

    fetch("/api/anthropic", {
      method: "POST",
      body: JSON.stringify({
        userInput: userInputMessage,
      }),
    }).then(async (response) => {
      const reader = response.body.getReader();
      const textDecoder = new TextDecoder("utf-8");

      signals.onResponse({
        html: "...",
      });

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          allMessages.forEach((indvMessage) => {
            console.log(indvMessage.innerText);

            if (
              indvMessage.innerText === "." ||
              indvMessage.innerText === "..."
            ) {
              indvMessage.remove();
            }
          });

          // add user question and bot answer to the session
          sessionQnAdata.push({
            user: latestMessage,
            coach: messageText.innerText,
          });
          console.log("sessionQnAdata :", sessionQnAdata, 'conversationId :', conversationId);

          fetch(`${baseURL2}/coaching-conversations/save-ai-response/`, {
            method: "POST",
            headers: {
              Authorization: `Basic ${createBasicAuthToken2(key2, secret2)}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ai_response: messageText.innerText,
              conversation_id: conversationId,
            }),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
            })
            .catch((err) => {
              console.error(err);
              fetch(`${baseURL2}/coaching-conversations/save-ai-response/`, {
                method: "POST",
                headers: {
                  Authorization: `Basic ${createBasicAuthToken2(
                    key2,
                    secret2
                  )}`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  ai_response: messageText.innerText,
                  conversation_id: conversationId,
                }),
              })
                .then((response) => response.json())
                .then((data) => {
                  console.log(data);
                });
            });
          return;
        }
        const decodedText = textDecoder.decode(value);

        messageText.innerText += decodedText;
        shadowRoot.getElementById("messages").scrollBy(0, 500);
      }
    });
  };

  function processString(inputString) {
    // Define regular expressions for patterns to remove
    const pattern1 = /0:"\s*/g;  // Matches "0:" with optional whitespace
    const pattern2 = /"\s*/g;    // Matches " with optional whitespace
    const pattern3 = /\n\n/g;    // Matches two consecutive newline characters
  
    // Remove patterns from the input string
    const processedString = inputString
      .replace(pattern1, '')    // Remove pattern1
      .replace(pattern2, '')    // Remove pattern2
      .replace(pattern3, '');   // Remove pattern3
  
    return processedString;
  }

  function endsWithLowerCaseLetter(str) {
    const pattern = /[a-z]$/;
    return pattern.test(str);
  }

  const ChatGeminiAiResponse = (
    userInputMessage,
    signals,
    conversationId,
    prompt
  ) => {

    console.log('prompt',prompt)
    console.log(conversationId, 'con')
    console.log(userInputMessage,'msg')
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

    messageBubble.appendChild(messageText);
    messageNode.appendChild(messageBubble);

    gShadowRoot2 = document.getElementById("chat-element2").shadowRoot;
    gShadowRoot2.getElementById("messages").appendChild(messageNode);
    gShadowRoot2.getElementById("messages").scrollBy(0, 500);

    const shadowRoot = document.getElementById("chat-element2").shadowRoot;
    const allMessages = shadowRoot.getElementById("messages").childNodes;

    let previousHistory = []
    if (sessionQnAdata.length > 0){
      sessionQnAdata.forEach(element => {
        previousHistory.push(
          {
            "user": element.user,
            "model": element.coach
          }
        )
      });
      
    }

    console.log('Previous History: ', previousHistory)

    fetch("https://next-js-gemini-frontend.vercel.app/api/chat-gemini", {
      method: "POST",
      body: JSON.stringify({
        prompt: prompt,
        response: userInputMessage,
        previousHistory: JSON.stringify(previousHistory),
      }),
    }).then(async (response) => {
      console.log(response);
      //@ts-ignore
      const reader = response.body.getReader();
      const textDecoder = new TextDecoder("utf-8");

      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          allMessages.forEach((indvMessage) => {
            if (
              indvMessage.innerText === "." ||
              indvMessage.innerText === "..." ||
              indvMessage.innerText === " "
            ) {
              indvMessage.remove();
            }
          });
          
          // if (messageText.innerText === "") {
          //   messageText.innerText +=
          //     "... Excuse me, I just lost my thought. If you havent got what you wanted, please ask me again.";
          // } else if (endsWithLowerCaseLetter(messageText.innerText)) {
          //   messageText.innerText +=
          //     " \n\n... Excuse me, I just lost my thought. If you havent got what you wanted, please ask me again.";
          // }
          // add user question and bot answer to the session
          sessionQnAdata.push({
            user: userInputMessage,
            coach: messageText.innerText,
          });
          console.log(
            "sessionQnAdata :",
            sessionQnAdata,
            "conversationId :",
            conversationId
          );

          fetch(`${baseURL2}/coaching-conversations/save-ai-response/`, {
            method: "POST",
            headers: {
              Authorization: `Basic ${createBasicAuthToken2(key2, secret2)}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ai_response: messageText.innerText,
              conversation_id: conversationId,
            }),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
            })
            .catch((err) => {
              console.error(err);
              fetch(`${baseURL2}/coaching-conversations/save-ai-response/`, {
                method: "POST",
                headers: {
                  Authorization: `Basic ${createBasicAuthToken2(
                    key2,
                    secret2
                  )}`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  ai_response: messageText.innerText,
                  conversation_id: conversationId,
                }),
              })
                .then((response) => response.json())
                .then((data) => {
                  console.log(data);
                });
            });

          shadowRoot.getElementById("messages").scrollBy(0, 500);
          endSessionButton.setAttribute(
            "onmouseover",
            "this.style.backgroundColor = '#e5e7eb'"
          );
          endSessionButton.setAttribute(
            "onmouseleave",
            "this.style.backgroundColor = '#9ca3af'"
          );
          endSessionButton.style.backgroundColor = "#9ca3af";
          endSessionButton.style.color = "white";
          endSessionButton.style.cursor = "pointer";
          endSessionButton.setAttribute("onclick", `handleEndConversation()`);
          endSessionButton.disabled = false;
          return;
        }

        const decodedText = textDecoder.decode(value, { stream: !done });
        console.log(decodedText);
        messageText.innerHTML += decodedText;
        signals.onResponse({
          html: ".",
        });
        shadowRoot.getElementById("messages").scrollBy(0, 500);
      }
    });
  };  

  const audioCanvasUI = (audio, canvas) => {
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

    audio.onload = function () {
      console.log("loaded");
    };

    audio.onplay = function () {
      audioCtx.resume().then(() => {
        draw();
      });
    };
  };

  async function audioSourceOpen(
    inputText,
    messageBubble,
    index,
    randomTextForId
  ) {
    const audioElement = document.createElement("audio");
    audioElement.setAttribute(
      "id",
      `audio-player-stream-${index}-${randomTextForId}`
    );
    audioElement.autoplay = true;
    const canvasElement = document.createElement("canvas");
    canvasElement.setAttribute("id", `canvas-${index}-${randomTextForId}`);
    canvasElement.width = 100;
    canvasElement.height = 40;

    audioCanvasUI(audioElement, canvasElement);

    const mediaSource = new MediaSource();
    audioElement.src = URL.createObjectURL(mediaSource);

    const audioSourceElement = document.createElement("source");
    audioElement.appendChild(audioSourceElement);

    messageBubble.appendChild(audioElement);
    messageBubble.appendChild(canvasElement);

    mediaSource.addEventListener("sourceopen", async () => {
      const sourceBuffer = mediaSource.addSourceBuffer("audio/mpeg");

      const response = await fetch("https://api.openai.com/v1/audio/speech", {
        method: "POST",
        headers: {
          Authorization:
            "Bearer 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",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: inputText,
          model: "tts-1",
          response_format: "mp3",
          voice: "echo",
        }),
      });

      const reader = response.body.getReader();

      if (index === 0) {
        reader.read().then(function process({ done, value }) {
          if (done) {
            if (mediaSource.readyState === "open") mediaSource.endOfStream();
            return;
          }
          sourceBuffer.appendBuffer(value);

          sourceBuffer.addEventListener("updateend", () => {
            if (!sourceBuffer.updating && mediaSource.readyState === "open") {
              reader.read().then(process);
            }
          });
        });
      } else {
        const shadowRootAud =
          document.getElementById("chat-element2").shadowRoot;
        const previousPlayer = shadowRootAud.getElementById(
          `audio-player-stream-${index - 1}-${randomTextForId}`
        );
        if (previousPlayer) {
          previousPlayer.addEventListener("ended", () => {
            console.log("PLAYER HAS ENDED");
            reader.read().then(function process({ done, value }) {
              if (done) {
                if (mediaSource.readyState === "open")
                  mediaSource.endOfStream();
                return;
              }
              sourceBuffer.appendBuffer(value);

              sourceBuffer.addEventListener("updateend", () => {
                if (
                  !sourceBuffer.updating &&
                  mediaSource.readyState === "open"
                ) {
                  reader.read().then(process);
                }
              });
            });
          });
        }
      }
    });
  }

  const GeminiAiResponse = (
    userInputMessage,
    signals,
    conversationId,
    latestMessage,
    streamWithAudio
  ) => {
    userInputMessage =
      userInputMessage + `\n input: ${latestMessage}\n output: `;
    console.log("prompt", userInputMessage);
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

    messageBubble.appendChild(messageText);
    messageNode.appendChild(messageBubble);

    gShadowRoot2 = document.getElementById("chat-element2").shadowRoot;
    gShadowRoot2.getElementById("messages").appendChild(messageNode);
    gShadowRoot2.getElementById("messages").scrollBy(0, 500);

    const shadowRoot = document.getElementById("chat-element2").shadowRoot;
    const allMessages = shadowRoot.getElementById("messages").childNodes;
    const randomIdForAudioElement = generateRandomAlphanumeric(10);

    fetch("https://next-js-gemini-frontend.vercel.app/api/gemini-stream", {
      method: "POST",
      body: JSON.stringify({
        prompt: userInputMessage,
      }),
    })
      .then(async (response) => {
        const reader = response.body.getReader();
        const decoder = new TextDecoder("utf-8");

        let index = 0;
        while (true) {
          const { done, value } = await reader?.read();
          if (done) {
            allMessages.forEach((indvMessage) => {
              if (
                indvMessage.innerText === "." ||
                indvMessage.innerText === "..." ||
                indvMessage.innerText === " "
              ) {
                indvMessage.remove();
              }
            });
            if (messageText.innerText === "") {
              messageText.innerText +=
                "... Excuse me, I just lost my thought. If you havent got what you wanted, please ask me again.";
              if (streamWithAudio) {
                audioSourceOpen(
                  "... Excuse me, I just lost my thought. If you havent got what you wanted, please ask me again.",
                  messageBubble,
                  index,
                  randomTextForId
                );
              }
            } else if (endsWithLowerCaseLetter(messageText.innerText)) {
              messageText.innerText +=
                " \n\n... Excuse me, I just lost my thought. If you havent got what you wanted, please ask me again.";
              if (streamWithAudio) {
                audioSourceOpen(
                  "... Excuse me, I just lost my thought. If you havent got what you wanted, please ask me again.",
                  messageBubble,
                  index,
                  randomTextForId
                );
              }
            }
            console.log("Stream complete");
            console.log("STREAMED MESSAGE -> ", messageText.innerText);
            finished = true;

            // add user question and bot answer to the session
            sessionQnAdata.push({
              user: latestMessage,
              coach: messageText.innerText,
            });
            console.log(
              "sessionQnAdata :",
              sessionQnAdata,
              "conversationId :",
              conversationId
            );

            fetch(`${baseURL2}/coaching-conversations/save-ai-response/`, {
              method: "POST",
              headers: {
                Authorization: `Basic ${createBasicAuthToken2(key2, secret2)}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                ai_response: messageText.innerText,
                conversation_id: conversationId,
              }),
            })
              .then((response) => response.json())
              .then((data) => {
                console.log(data);
              })
              .catch((err) => {
                console.error(err);
                fetch(`${baseURL2}/coaching-conversations/save-ai-response/`, {
                  method: "POST",
                  headers: {
                    Authorization: `Basic ${createBasicAuthToken2(
                      key2,
                      secret2
                    )}`,
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    ai_response: messageText.innerText,
                    conversation_id: conversationId,
                  }),
                })
                  .then((response) => response.json())
                  .then((data) => {
                    console.log(data);
                  });
              });
            shadowRoot.getElementById("messages").scrollBy(0, 500);
            endSessionButton.setAttribute(
              "onmouseover",
              "this.style.backgroundColor = '#e5e7eb'"
            );
            endSessionButton.setAttribute(
              "onmouseleave",
              "this.style.backgroundColor = '#9ca3af'"
            );
            endSessionButton.style.backgroundColor = "#9ca3af";
            endSessionButton.style.color = "white";
            endSessionButton.style.cursor = "pointer";
            endSessionButton.setAttribute("onclick", `handleEndConversation()`);
            endSessionButton.disabled = false;
            console.log(endSessionButton);
            return Promise.resolve();
          }

          const decodedText = decoder.decode(value, { stream: !done });
          console.log(decodedText);
          if (streamWithAudio) {
            audioSourceOpen(
              decodedText,
              messageBubble,
              index,
              randomIdForAudioElement
            );
          }
          messageText.innerHTML += decodedText;
          signals.onResponse({
            html: ".",
          });
          shadowRoot.getElementById("messages").scrollBy(0, 500);
          index++;
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const OpenAiResponse = (
    userInputMessage,
    signals,
    conversationId,
    latestMessage
  ) => {
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

    messageBubble.appendChild(messageText);
    messageNode.appendChild(messageBubble);

    gShadowRoot2 = document.getElementById("chat-element2").shadowRoot;
    gShadowRoot2.getElementById("messages").appendChild(messageNode);
    gShadowRoot2.getElementById("messages").scrollBy(0, 500);

    const shadowRoot = document.getElementById("chat-element2").shadowRoot;
    const allMessages = shadowRoot.getElementById("messages").childNodes;
    sessionQnAdata.push({ user: latestMessage, coach: messageText.innerText });
    console.log("sessionQnAdata :", sessionQnAdata);

    fetch("/api/openai", {
      method: "POST",
      body: JSON.stringify({
        userInput: userInputMessage,
      }),
    }).then(async (response) => {
      const reader = response.body.getReader();
      const textDecoder = new TextDecoder("utf-8");

      signals.onResponse({
        html: "...",
      });

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          allMessages.forEach((indvMessage) => {
            console.log(indvMessage.innerText);

            if (
              indvMessage.innerText === "." ||
              indvMessage.innerText === "..."
            ) {
              indvMessage.remove();
            }
          });

          fetch(`${baseURL2}/coaching-conversations/save-ai-response/`, {
            method: "POST",
            headers: {
              Authorization: `Basic ${createBasicAuthToken2(key2, secret2)}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ai_response: messageText.innerText,
              conversation_id: conversationId,
            }),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
            })
            .catch((err) => {
              console.error("Error occured : ", err);

              fetch(`${baseURL2}/coaching-conversations/save-ai-response/`, {
                method: "POST",
                headers: {
                  Authorization: `Basic ${createBasicAuthToken2(
                    key2,
                    secret2
                  )}`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  ai_response: messageText.innerText,
                  conversation_id: conversationId,
                }),
              });
            });

          return;
        }
        const decodedText = textDecoder.decode(value);

        messageText.innerText += decodedText;
        shadowRoot.getElementById("messages").scrollBy(0, 500);
      }
    });
  };

  //No condition STT pending
  chatElementRef2.request = {
    handler: async (body, signals) => {
      try {
        if (body instanceof FormData) {
        } else {
          //
          // let latestMessages = body.messages[body.messages.length - 1].text;
          // GeminiAiResponse(latestMessages, signals,"",latestMessages, false)
          // return;
          // TEXT RESPONSES
          //change mic state active to default on send
          var chatElement = document.getElementById("chat-element2");
          //   const coachId = document.querySelector('.coachbots-coachscribe').dataset.botId;
          console.log("Bot ID: ", botId);
          if(botId){
            LoadingMessageWithText("Response loading...")
          }
          if (chatElement) {
            var shadowRootMic = chatElement.shadowRoot;
            if (shadowRootMic) {
              var microphoneButton =
                shadowRootMic.querySelector("#microphone-button");
              if (
                microphoneButton
                  .querySelector("svg")
                  .classList.contains("active-microphone-icon")
              ) {
                const clickEvent = new Event("click");
                microphoneButton.dispatchEvent(clickEvent);
              }
            }
          }
          globalSignals = signals;
          if (fitmentAnalysisInProgress) {
            console.log("NA-1", fitmentAnalysisInProgress);
            signals.onResponse({
              html: "<p style='font-size: 14px;color: #991b1b;'>Not allowed! choose option to continue. </p>",
            });
            return;
          }

          if (isSomeActivityActive && botType === 'deep_dive') {
            signals.onResponse({
              html: "<p style='font-size: 14px;color: #991b1b;'>Not allowed! choose option to continue. </p>",
            });
            return;
          }
          // to check session active or not
          // get latest message
          let latestMessage = body.messages[body.messages.length - 1].text;

          //slicing 400 words from user responses > 400 words
          if(latestMessage.split(" ").length >= 400){
            latestMessage = latestMessage.split(" ").slice(0, 400).join(" ")

            console.log("SLICED \n", latestMessage)
          } 

          // handling deepdive intial question
          if (botType==='deep_dive' && askInitialQuestionDeepDive){
            botInitialQuestionsQnA[botInitialQuestions[`${deepDiveInitialQueIndex}`]] = latestMessage
            deepDiveInitialQueIndex += 1
            console.log("botqna: ", botInitialQuestionsQnA,Object.keys(botInitialQuestions).length,deepDiveInitialQueIndex)

            if (Object.keys(botInitialQuestions).length < deepDiveInitialQueIndex ){
              console.log('ending initial question session')
              askInitialQuestionDeepDive = false;
              latestMessage = 'START'
            }
            else{
              signals.onResponse({
                html: botInitialQuestions[`${deepDiveInitialQueIndex}`]
              })
              return
            }

          }
          console.log("askDeepDiveAccessCode", askDeepDiveAccessCode)
          if(askDeepDiveAccessCode){
              console.log("askDeepDiveAccessCode", askDeepDiveAccessCode)
              if(latestMessage !== globalBotDetails.data.access_code){
                signals.onResponse({
                  html: "<p style='font-size: 14px;color: #991b1b;'> Please enter a valid access code </p>",
                });
                return
              }
              askDeepDiveAccessCode = false;

              // asking if want to anonymous or not

              uniqueSesssionContainerId = generateRandomAlphanumeric(6);
                const optionData = `<div id="anonymous-${uniqueSesssionContainerId}">
                  <b>Want to continue as Anonymous?</b>
                  </br> <div>
                      <button onmouseover="this.style.cursor ='pointer'" style="margin-top:5px; width:fit-content; padding:6px 12px; border: 1px solid lightgray; border-radius: 4px;" onclick="getUserOrAnonymousDetailsDeepDive('Yes')">Yes</button>
                      <button onmouseover="this.style.cursor ='pointer'" style="margin-top:5px; width:fit-content; padding:6px 12px; border: 1px solid lightgray; border-radius: 4px;" onclick="getUserOrAnonymousDetailsDeepDive('No')">No</button>
                      </div>
                  </div>`;       
          
                setTimeout(() => {
                  signals.onResponse({
                    html: optionData
                  })
                  isSomeActivityActive = true;
                }, 100);

              return
          }

          if (isEmailFormstt) {
            await proceedFormFlowStt(latestMessage);
            if (formFieldsstt.length > 0) {
              signals.onResponse({
                html: `<b>Please enter your ${formFieldsstt[0]}<b>`,
              });
            } else {
              isEmailFormstt = false;
              if (botId != undefined && botType === "deep_dive") {
                const userEmail = emailNameformJsonstt["email"];
                if(! isEmail(userEmail)){
                  console.log("email not valid 1")
                  formFieldsstt.push("email")
                  isEmailFormstt = true;
                  signals.onResponse({
                    html: "<p style='font-size: 14px;color: #991b1b;'> please enter a valid email </p>",
                  });
                  return;
                }

                console.log("isAnonymous", isAnonymous)
                // sendBotTranscript2();
                if (botType === 'deep_dive') {
                  askInitialQuestionDeepDive=true;
                  deepDiveInitialQueIndex = 1;

                  signals.onResponse({
                    // html: "<b>Your session has ended. Please refresh the page to restart again anytime</b>"
                    html: `${botInitialQuestions[`${deepDiveInitialQueIndex}`]}`
                  });
                  return
                } else {
                signals.onResponse({ html: faqHtmlData });
                }
              } else if (botId != undefined && botType === "feedback_bot") {
                console.log("before thumbs up ==>", FeedbackUserEmail,emailNameformJsonstt)
                FeedbackUserEmail = emailNameformJsonstt["email"];
                feedbackUserName = emailNameformJsonstt["name"];

                if(! isEmail(FeedbackUserEmail)){
                  console.log("email not valid 2")

                  formFieldsstt.push("email")
                  isEmailFormstt = true;
                  signals.onResponse({
                    html: "<p style='font-size: 14px;color: #991b1b;'> please enter a valid email </p>",
                  });
                  return;
                }
                const thumbsupdiv = await feedbackBotInitialFlow("save_email");
                signals.onResponse({
                  html: thumbsupdiv,
                });
              } else {
                const message = `<b>It's showtime ✨, here is your detailed <a target="_blank" style="color: #3b82f6;text-decoration:none;" href="${globalReportUrl2}">feedback report</a>. The feedback is also emailed to you and will be available to you for 60 days.</b>`;
                appendMessage2(message);
                // //* send message to start new session
                signals.onResponse({
                  html: "<b>Please enter another access code to start a new interaction.</b>",
                });
                submitEmailAndName2();
              }
            }
            return;
          }
          if (botType === "feedback_bot" && isFeedbackConvInProcess) {
            if (!isValidMessageStt(latestMessage)) {
              signals.onResponse({
                html: `<p style='font-size: 14px;color: #991b1b;'><b>Response does not meet minimum length criterion.</b></p>`,
              });
              return;
            }
            if (!isValidMessageStt(latestMessage, 400,true)) {
              signals.onResponse({
                html: `<p style='font-size: 14px;color: #991b1b;'><b>Your input is too large. Please respond within 300 words maximum</b></p>`,
              });
              return;
            }
            feedbackBotQnA[feedbackBotQuestions[feedbackBotIndex]] =
              latestMessage;
            const que_length = Object.keys(feedbackBotQuestions).length;
            feedbackBotIndex += 1;
            const is_last = que_length + 1 === feedbackBotIndex;
            if (is_last) {
              isFeedbackConvInProcess = false;
              isFeedbackConvEnd = true;
              signals.onResponse({
                html: `
                <div id='submit_feedback-${uniqueSesssionContainerId}'>
                <button style="margin-top:5px;  width:fit-content; padding:6px 12px; border: 1px solid lightgray; border-radius: 4px;"  onmouseover="this.style.cursor ='pointer'" onclick="handleFeedbackSubmit()">Submit</button>
                </div>
                `,
              });
            } else {
              signals.onResponse({
                html: feedbackBotQuestions[feedbackBotIndex],
              });
              // setTimeout(() => {
              //   appendMessage2(
              //     `<button style="margin-top:5px;  width:fit-content; padding:6px 12px; border-radius: 8px; " onclick="handleEndFeedback()">End</button>`
              //   );
              // }, 200);
            }
            return;
          } else if (botType === "feedback_bot" && !isFeedbackConvInProcess) {
            console.log("NA-fb")
            signals.onResponse({
              html: "<p style='font-size: 14px;color: #991b1b;'>Not allowed! choose option to continue. </p>",
            });
            return;
          }
          if (botId != undefined && allowRecommendationTestCode == false) {
            if (fitmentAnalysisInProgress == true) {
              fitmentAnalysisQnA[fitmentAnalysisIndex] = {
                coach: fitmentAnalysisQuestions[fitmentAnalysisIndex],
                cochee: latestMessage,
              };
              fitmentAnalysisIndex += 1;
              console.log(
                "fitmentAnalysisIndex : ",
                fitmentAnalysisIndex,
                Object.keys(fitmentAnalysisQuestions).length
              );
              if (
                fitmentAnalysisIndex <=
                Object.keys(fitmentAnalysisQuestions).length
              ) {
                console.log("Answer : ", latestMessage);
                console.log(
                  "fitment question : ",
                  fitmentAnalysisQuestions[fitmentAnalysisIndex]
                );
                signals.onResponse({
                  html: fitmentAnalysisQuestions[fitmentAnalysisIndex],
                });
                return;
              } else {
                fitmentAnalysisInProgress = false;
                fitmentAnalysisIndex = 0;
                console.log("fitmentAnalysisQnA : ", fitmentAnalysisQnA);
                try {
                  const response = await fetch(
                    `${baseURL2}/test-attempt-sessions/get-fitness-analysis-score/`,
                    {
                      method: "POST",
                      headers: {
                        Authorization: `Basic ${createBasicAuthToken2(
                          key2,
                          secret2
                        )}`,
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        participant_id: participantId2,
                        bot_id: botId,
                        is_signature_bot: true,
                        user_id: userId2,
                        fitness_analysis_data:
                          JSON.stringify(fitmentAnalysisQnA),
                      }),
                    }
                  );
                  const data = await response.json();
                  console.log("Fitness Analysis Score => ", data);
                  score = ' {"Fitment score":"3"}';
                  signals.onResponse({
                    html: `<b >Fitment score is : ${data.data["Fitment score"]} </b>`,
                  });
                  setTimeout(() => {
                    appendMessage2(faqHtmlData);
                  }, 200);
                } catch (err) {
                  signals.onResponse({
                    html: `<b style='font-size: 14px;color: #991b1b;'>Error while calculating Fitment score</b>`,
                  });
                }
                return;
              }
            }
            if (recommendationClicked == true) {
              // show warning if user message is less than 5 words
              if (isValidMessageStt(latestMessage)) {
                signals.onResponse({
                  html: "<p style='font-size: 14px;color: #991b1b;'>Please provide atleast more than 15 words.</p>",
                });
                return;
              }
              appendMessage2(
                "Please wait while we are getting some recommendations for you..."
              );
              // if isBotRecommendationFetched is not true after 1 minute, then show error message
              setTimeout(() => {
                if (!isBotRecommendationFetched) {
                  recommendationClicked = false;
                  signals.onResponse({
                    html: "<p style='font-size: 14px;color: #991b1b;'>Failed to fetch scenarios. we have got your request, scenario will be created and will be available in 'Requested Scenario' in 'My Library'. You can retry after some time</p>",
                  });
                  return;
                }
              }, 90000);
              try {
                const response = await fetch(
                  `${baseURL2}/tests/get-recommendetion-tests/?context=${latestMessage}&creator_user_id=${userId2}&test_type=test`,
                  {
                    method: "GET",
                    headers: {
                      Authorization: `Basic ${createBasicAuthToken2(
                        key2,
                        secret2
                      )}`,
                    },
                  }
                );
                const recommendation_tests_data = await response.json();
                console.log(
                  "recommendation_tests_data : ",
                  recommendation_tests_data
                );
                if (recommendation_tests_data.success === true) {
                  isBotRecommendationFetched = true;
                }
                const fetched_test_code = Object.keys(
                  recommendation_tests_data.matching_tests
                )[0];
                const fetched_test =
                  recommendation_tests_data.matching_tests[fetched_test_code];
                const created_test_code = Object.keys(
                  recommendation_tests_data.created_scenario
                )[0];
                const created_test =
                  recommendation_tests_data.created_scenario[created_test_code];
                console.log(
                  "fetched_test : ",
                  fetched_test,
                  recommendation_tests_data.matching_tests,
                  "created_test : ",
                  created_test
                );
                signals.onResponse({
                  html: `<b >Here are some recommendations for you : </b> <br>
                    <button style="margin-top:5px; width:fit-content; padding:6px 12px; border: 1px solid lightgray; border-radius: 4px;" onclick="handleSurpriseMeButtonClick2('${created_test_code}','${created_test}')">${created_test}      (experimental)</button>
                    `,
                });
                console.log(
                  "recommendation_tests_data : ",
                  recommendation_tests_data.matching_tests
                );
                recommendationClicked = false;
              } catch (error) {
                console.error(`Error in get recommendation tests: ${error}`);
              }
              return;
            }
            console.log("Yes OMG control is reaching here");
            console.log(
              "isAskingInitialQuestions : ",
              isAskingInitialQuestions,
              "fitmentAnalysisInProgress : ",
              fitmentAnalysisInProgress,
              "isSessionActiveStt : ",
              isSessionActiveStt,
              "isAttemptingRecommendation : ",
              isAttemptingRecommendation,
              "optedBeginSession : ",
              optedBeginSession
            );
            if (
              isAskingInitialQuestions == false &&
              fitmentAnalysisInProgress == false &&
              isSessionActiveStt == false &&
              isAttemptingRecommendation == false &&
              optedBeginSession == false &&
              botType !== "user_bot"
            ) {
              console.log("NA-1");
              signals.onResponse({
                html: "<p style='font-size: 14px;color: #991b1b;'>Not allowed! choose option to continue. </p>",
              });
              return;
            }

            
            if (isAskingInitialQuestions == true) {
              // botInitialQuestionsQnA[botInitialQuestions[botInitialQuestionsIndex]] = latestMessage
              // const tempQna = `Question: ${botInitialQuestions[botInitialQuestionsIndex]}  Answer: ${latestMessage}`
              if (
                typeof botInitialQuestions[botInitialQuestionsIndex] != "string"
              ) {
                const options =
                  botInitialQuestions[botInitialQuestionsIndex]["options"];
                if (!options.includes(latestMessage)) {
                  signals.onResponse({
                    html: "<p style='font-size: 14px;color: #991b1b;'>Not allowed! choose option to continue. </p>",
                  });
                  return;
                }
                console.log('options',!options.includes(latestMessage,options))

                if(!isValidMessageStt(latestMessage) && !options.includes(latestMessage)){
                  signals.onResponse({
                    html: "<p style='font-size: 14px;color: #991b1b;'><b>Response does not meet minimum length criterion.</b></p>",
                  });
                  return;
                }
                const shadowRoot =
                  document.getElementById("chat-element2").shadowRoot;
                const initialOptionDiv =
                  shadowRoot.getElementById("intial-options");
                console.log(initialOptionDiv);
                const buttons = initialOptionDiv.querySelectorAll("button");
                buttons.forEach((button) => {
                  button.disabled = true;
                });
              } else {
                if(!isValidMessageStt(latestMessage)){
                  signals.onResponse({
                    html: "<p style='font-size: 14px;color: #991b1b;'><b>Response does not meet minimum length criterion.</b></p>",
                  });
                  return;
                }
              }
              if (
                typeof botInitialQuestions[botInitialQuestionsIndex] != "string"
              ) {
                const question =
                  botInitialQuestions[botInitialQuestionsIndex]["question"];
                botInitialQuestionsQnA[question] = latestMessage;
              } else {
                botInitialQuestionsQnA[
                  botInitialQuestions[botInitialQuestionsIndex]
                ] = latestMessage;
              }
              botInitialQuestionsIndex++;
              if (
                botInitialQuestionsIndex >
                Object.keys(botInitialQuestions).length
              ) {
                // isAskingInitialQuestions = false;
                // botInitialQuestionsIndex = 0;
                console.log(
                  "all botInitialQuestions submitted : ",
                  botInitialQuestionsQnA
                );
                LoadingMessageWithText("Initializing session...")
                if (isIntakeInProgress) {
                  isIntakeCompleted = true;
                  isIntakeInProgress = false;
                  isAskingInitialQuestions = false;
                  //********** submit intake to backend: start */
                  const queryparam = new URLSearchParams({
                    method: "post",
                    qna: JSON.stringify(botInitialQuestionsQnA),
                    bot_id: botId,
                    is_positive: "False",
                    qna_type: "initial_qna",
                    user_id: userId2,
                  });
                  const resp = await fetch(
                    `${baseURL2}/accounts/get-user-feedback-data/?${queryparam}`,
                    {
                      method: "GET",
                      headers: {
                        Authorization: `Basic ${createBasicAuthToken2(
                          key2,
                          secret2
                        )}`,
                        "Content-Type": "application/json",
                      },
                    }
                  )
                    .then((response) => response.json())
                    .then((data) => {
                      console.log("Precheck Submission response : ", data);
                    });
                  //********** submit intake to backend: end */
                  signals.onResponse({
                    text: `Thank you for completing the ${intakebuttonText}. You can now proceed to start your session.`,
                  });
                  // ****** enabling begin session button
                  if (botType === "avatar_bot") {
                    const begginSessionButton = document.getElementById("begin-session-button");
                    begginSessionButton.setAttribute(
                      "onmouseover",
                      "this.style.backgroundColor = '#4ade80'"
                    );
                    begginSessionButton.setAttribute(
                      "onmouseleave",
                      "this.style.backgroundColor = '#22c55e'"
                    );
                    begginSessionButton.setAttribute(
                      "onclick",
                      `handleFaqButtonClick('something_else')`
                    );
                    begginSessionButton.disabled = false;
                    begginSessionButton.style.cursor = "pointer";
                    begginSessionButton.style.color = 'white';
                    begginSessionButton.style.backgroundColor = "#22c55e";
                  } else{
                    
                      appendMessage2(`<b>Please scroll above to view the conversation and proceed accordingly.</b>`)
                    
                  }

                  // ***** disabling intake button
                  // if (intakeButton && botType === "avatar_bot") {
                  //   intakeButton.disabled = true;
                  //   intakeButton.style.backgroundColor = "#d3d3d3";
                  //   intakeButton.style.color = "#a0a0a0";
                  //   intakeButton.removeAttribute("onmouseover");
                  //   intakeButton.removeAttribute("onmouseleave");
                  // }
                  isIntakeSummaryDisplayed = false
                  return;
                }
                // signals.onResponse({text: "Thank you for your response."})
              } else {
                const question = botInitialQuestions[botInitialQuestionsIndex];
                if (typeof question === "string") {
                  // appendMessage2(botInitialQuestions[botInitialQuestionsIndex]);
                  signals.onResponse({
                    text: question,
                  });
                } else {
                  const radioCont = handleRadioTypeInitialQuestion(
                    question["options"],
                    question["question"]
                  );
                  signals.onResponse({
                    html: radioCont,
                  });
                }
                return;
              }
            }
            // here checking word limits for signature bot responses
            if (!isValidMessageStt(latestMessage)) {
              signals.onResponse({
                html: `<p style='font-size: 14px;color: #991b1b;'><b>Response does not meet minimum length criterion.</b></p>`,
              });
              return;
            }
            if (!isValidMessageStt(latestMessage, 300,true)) {
              signals.onResponse({
                html: `<p style='font-size: 14px;color: #991b1b;'><b>Your input is too large. Please respond within 300 words maximum</b></p>`,
              });
              return;
            }
            if (isSessionActiveStt == false && isBotInitialized == false) {
              console.log("intakeUid", IntakeUid);
              try {
                const response = await fetch(
                  `${baseURL2}/test-attempt-sessions/`,
                  {
                    method: "POST",
                    headers: {
                      Authorization: `Basic ${createBasicAuthToken2(
                        key2,
                        secret2
                      )}`,
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      participant_id: participantId2,
                      ordering: "-id",
                      test_id: botId,
                      is_signature_bot: true,
                      is_idp_discussion_opted: isIDPDiscussionOpted,
                    }),
                  }
                );
                const data = await response.json();
                sessionId2 = data.uid;
                isSessionActiveStt = true;
                console.log("Session Created => ", sessionId2);
                if (isBotInitialized == false) {
                  // initialize coaching conversation
                  try {
                    const response = await fetch(
                      `${baseURL2}/coaching-conversations/initialize/`,
                      {
                        method: "POST",
                        headers: {
                          Authorization: `Basic ${createBasicAuthToken2(
                            key2,
                            secret2
                          )}`,
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          test_attempt_session_id: sessionId2,
                          is_signature_bot: true,
                        }),
                      }
                    );
                    const data = await response.json();
                    console.log("Coaching Conversation Created => ", data);
                    conversation_id2 = data.uid;
                    questionLength2 = 999;
                    console.log("conversation_id", conversation_id2);
                    isBotInitialized = true;
                    if (
                      isAskingInitialQuestions == true &&
                      botInitialQuestionsIndex != 0
                    ) {
                      isAskingInitialQuestions = false;
                      botInitialQuestionsIndex = 0;
                      if (isBotAudioResponse) {
                        const audioDiv = await TTSContainerSTT(
                          data.coach_message_text
                        );
                        signals.onResponse({ html: audioDiv });
                      } else {
                        signals.onResponse({ html: data.coach_message_text });
                      }
                      return;
                    }
                  } catch (err) {
                    console.log("Error while creating session : ", err);
                    isSessionActiveStt = false;
                  }
                }
              } catch (err) {
                console.log(err);
                isSessionActiveStt = false;
              }
            }
            if (isBotInitialized == true) {
              //append addnl statement if user-message has <= 10 words
              // if(botType === "user_bot"){
              //   if(latestMessage.split(" ").length <= 10){
              //     latestMessage += " Always respond in less than 50 tokens. Note: Never mention token count."
              //   } 
              // }
              const endSessionButton = document.getElementById("end-session-btn")
              if(endSessionButton){
                endSessionButton.style.cursor = "not-allowed"
                endSessionButton.removeAttribute("onclick", `handleEndConversation()`)
                endSessionButton.disabled = true;
                console.log(endSessionButton)
              }
              
              console.log("LATEST MESSAGE ===> ", latestMessage)
              const response = await fetch(
                `${baseURL2}/coaching-conversations/${conversation_id2}/reply/`,
                {
                  method: "POST",
                  headers: {
                    Authorization: `Basic ${createBasicAuthToken2(
                      key2,
                      secret2
                    )}`,
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    participant_message_text: latestMessage,
                    participant_message_url: "",
                    is_signature_bot: true,
                    is_prompt_only: true,
                  }),
                }
              );
              const responseData = await response.json();
              console.log(
                "Response from Coaching submit response : ",
                responseData
              );
              console.log(responseData.coach_message_metadata.prompt);

              conversation_id2 = responseData["uid"];

              let allowAudioInteraction = false;
              console.log("clientAllowAudioInteraction2" , clientAllowAudioInteraction2)
              console.log("userAllowAudioInteraction2" , userAllowAudioInteraction2)
              console.log("prioritiseUserAllowInteraction2" , prioritiseUserAllowInteraction2)
              if(prioritiseUserAllowInteraction2){
                allowAudioInteraction = userAllowAudioInteraction2
              } else {
                allowAudioInteraction = clientAllowAudioInteraction2
              }
              console.log("allowAudioInteraction => ", allowAudioInteraction)
              //streaming responses
              if (botType === 'deep_dive'){
                console.log('chatGemini#####################')

                ChatGeminiAiResponse(
                  latestMessage,
                  signals,
                  conversation_id2,
                  responseData.coach_message_metadata.prompt
                )

              } else if (botType === 'user_bot'){
                console.log('anthropic#####################')
                anthropicAiResponse(
                  responseData.coach_message_metadata.prompt,
                  signals,
                  conversation_id2,
                  latestMessage
                );
              } else {
                GeminiAiResponse(
                  responseData.coach_message_metadata.prompt,
                  signals,
                  conversation_id2,
                  latestMessage,
                  allowAudioInteraction
                );
              }

              // conversation_id2 = responseData["uid"];
              let coachResponse = responseData["coach_message_text"];
              if (coachResponse.split(":").length > 1) {
                coachResponse = coachResponse
                  .split(":")
                  .slice(1)
                  .join(":")
                  .trim();
              }
              if(!isBotInitialized){
                if (isBotAudioResponse) {
                  const audioDiv = await TTSContainerSTT(coachResponse);
                  signals.onResponse({ html: audioDiv });
                } else {
                  console.log("from here?")
                  signals.onResponse({
                    html: coachResponse,
                  });
                }
              }
              setTimeout(() => {
                if (["avatar_bot","deep_dive"].includes(botType)) {
                  console.log("endSessionButton:", endSessionButton.disabled);
                  // if (endSessionButton && endSessionButton.disabled) {
                  //   endSessionButton.setAttribute(
                  //     "onmouseover",
                  //     "this.style.backgroundColor = '#e5e7eb'"
                  //   );
                  //   endSessionButton.setAttribute(
                  //     "onmouseleave",
                  //     "this.style.backgroundColor = '#9ca3af'"
                  //   );
                  //   endSessionButton.style.backgroundColor = "#9ca3af";
                  //   endSessionButton.style.color = "white";
                  //   endSessionButton.setAttribute(
                  //     "onclick",
                  //     `handleEndConversation()`
                  //   );
                  //   endSessionButton.disabled = false;
                  // }
                }
                // if ( botType === "avatar_bot" )
                // appendMessage2(
                //   `<button style="width: fit-content; padding: 6px 12px; border-radius: 4px; border: none; background: #ff7272; color: white;font-weight : 700;" onclick="handleEndConversation()">End Session</button>`
                // );
              }, 200);
            }
          }
          console.log(botId);
          if (botId != undefined && allowRecommendationTestCode == false) {
            // wait infinitely for bot to initialize
            console.log("returning from here (bot logic)");
            return;
          }
          if (
            isProceedStt === "false" &&
            latestMessage.toUpperCase() != "STOP"
          ) {
            signals.onResponse({
              html: "<p style='font-size: 14px;color: #991b1b;'>Not allowed! choose option to continue. </p>",
            });
            return;
          }
          if (
            (testType2 === "mcq" || testType2 === "dynamic_mcq") &&
            latestMessage.toUpperCase() != "STOP"
          ) {
            signals.onResponse({
              html: "<p style='font-size: 14px;color: #991b1b;'>Not allowed! choose option to continue. </p>",
            });
            return;
          }
          console.log("Latest Message ===> ", latestMessage);
          if (isTestCode(latestMessage)) {
            //* check if a session is already running
            console.log("responsesDone2", responsesDone2, questionIndex2);
            if (responsesDone2 === false && questionIndex2 > 0) {
              signals.onResponse({
                html: "<b>You are already in a session. Please complete the current session or  type 'STOP' to end the session.</b>",
              });
              return;
            }
            await cancelTestStt(participantId2); // cancelling session
            //* reset all variables : start
            resetAllVariablesStt(); // reseting session
          }
          const userAcessAvailability2 = latestMessage //body.messages[0].text;
          if (userAcessAvailability2 === "Yes" && !isSessionActiveStt) {
            signals.onResponse({
              html: "<b>Please enter the access code to get started.</b>",
            });
            return;
          } else if (userAcessAvailability2 === "No" && !isSessionActiveStt) {
            optedNo2 = true;
            signals.onResponse({
              html: `<div id="option-button-container" >
                      <button id="surprise-button" style="margin-top:5px;  width:fit-content; padding:6px 12px; border: 1px solid lightgray; border-radius: 4px;" onmouseover="this.style.cursor ='pointer'" onclick="handleSurpriseMeButtonClick2()">Initiate a surprise Interaction</button>
                      <button id="create-new-scenario" style="margin-top:5px; width:fit-content; padding:6px 12px; border: 1px solid lightgray; border-radius: 4px;" onmouseover="this.style.cursor ='pointer'"  onclick="handleOptionButtonClick2()">Create Scenario</button>
                      </div>
                      `,
            });
            // signals.onResponse({
            //   text: "No problem , here are a few samples you can try out (Experimental):",
            //   html: `
            //                   <div id="option-button-container" >
            //                   <button style="margin-top:5px; width:100%; padding:6px 4px; border: 1px solid lightgray; border-radius: 4px;" onclick="handleOptionButtonClick2('Integrating a New Team Member')">Integrating a New Team Member</button>
            //                   <button style="margin-top:5px; width:100%; padding:6px 4px; border: 1px solid lightgray; border-radius: 4px;"  onclick="handleOptionButtonClick2('Effective Customer Service Management')">Effective Customer Service Management</button>
            //                   <button style="margin-top:5px; width:100%; padding:6px 4px; border: 1px solid lightgray; border-radius: 4px;"  onclick="handleOptionButtonClick2('Cultivating Growth Through Feedback')">Cultivating Growth Through Feedback</button>
            //                   <button style="margin-top:5px; width:100%; padding:6px 4px; border: 1px solid lightgray; border-radius: 4px;"  onclick="handleOptionButtonClick2('Cultivating Team Impartiality')">Cultivating Team Impartiality</button>
            //                   <button style="margin:5px 0; width:100%; padding:6px 4px; border: 1px solid lightgray; border-radius: 4px;"  onclick="handleOptionButtonClick2('Managing Meeting Momentum')">Managing Meeting Momentum</button>
            //               </div>
            //                           `,
            // });
            return;
          }
          if (body.messages[0].text.toUpperCase() === "STOP") {
            await cancelTestStt(participantId2); // cancelling session
            if (testType2 === "mcq" || testType2 === "dynamic_mcq") {
              const shadowRoot =
                document.getElementById("chat-element2").shadowRoot;
              const button = shadowRoot.getElementById(
                `mcq-option-stt-${mcqFormIdStt}`
              );
              // button.parentNode.removeChild(button)
              const thankYouMessage = document.createElement("div");
              thankYouMessage.innerHTML = "<b>Thank you!</b>"; // You can customize the message here
              // Replace the button with the "Thank you" message
              button.parentNode.replaceChild(thankYouMessage, button);
            }
            if (isProceedStt === "false") {
              const gshadowRoot =
                document.getElementById("chat-element2").shadowRoot;
              const msg = gshadowRoot.getElementById("proceed-option2");
              // button.parentNode.removeChild(button)
              const que_msg = document.createElement("div");
              que_msg.innerHTML = "Thank You"; // You can customize the message here
              // Replace the button with the "Thank you" message
              msg.parentNode.replaceChild(que_msg, msg);
            }
            // resetAllVariablesStt(); //reseting variables
            // signals.onResponse({
            //   html: "<b>Your session is terminated. You can restart again!</b>",
            // });
            resetAllVariablesStt().then(() => {
              console.log("Your session is terminated. You can restart again!");
              signals.onResponse({
                html: "<b>Your session is terminated. You can restart again!</b>",
              });

                 //Enable Copy Paste
                 var chatElementRef2 = document.getElementById("chat-element2");
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
            await getSessionStatusStt(sessionId2);
            // getting text which is from option-button-container
            const shadowRoot =
              document.getElementById("chat-element2").shadowRoot;
            const option_buttons = shadowRoot.querySelectorAll(
              "#option-button-container button"
            );
            const buttonTextArray = [];
            option_buttons.forEach((button) => {
              const buttonText = button.textContent.trim();
              buttonTextArray.push(buttonText);
            });
            // adding sample test code title
            const sampleTestCodesValues = Object.values(sampleTestCodesStt);
            sampleTestCodesValues.forEach((value) => {
              buttonTextArray.push(value.trim());
            });

            const opiton_scenarios = shadowRoot.querySelectorAll("#create-scenario-section b")
            opiton_scenarios.forEach((b) =>{
              const buttonText = b.textContent.trim();
              buttonTextArray.push(buttonText);
            })

            if ( buttonTextArray.includes(latestMessage)){
              if (responsesDone2 === false && questionIndex2 > 0) {
                signals.onResponse({
                  html: "<b>You are already in a session. Please complete the current session or  type 'STOP' to end the session.</b>",
                });
                return;
              }
            }
            //end
            console.log(
              "isAttemptingRecommendation : ",
              isAttemptingRecommendation,
              "isValidMessageStt(latestMessage) : ",
              isValidMessageStt(latestMessage),
              "isProceedstt",
              isProceedStt
            );
            if (isAttemptingRecommendation == true && isProceedStt == "true") {
              if (isValidMessageStt(latestMessage) == false) {
                signals.onResponse({
                  html: "<p style='font-size: 14px;color: #991b1b;'><b>Response does not meet minimum length criterion.</b></p>",
                });
                return;
              }
              if (isDuplicateResponse(latestMessage)) {
                DuplicateResponseCount2 += 1;
                if (DuplicateResponseCount2 > 1) {
                  resetAllVariablesStt().then(() => {
                    signals.onResponse({
                      html: "<p style='font-size: 14px;color: #991b1b;'><b> Your session has terminated because of multiple duplicate responses. please try again with unique responses </b></p>",
                    });
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
            if (
              !buttonTextArray.includes(latestMessage) &&
              allowRecommendationTestCode == false
            ) {
              if (testType2 === "mcq" || testType2 === "dynamic_mcq") {
                signals.onResponse({
                  html: "<p style='font-size: 14px;color: #991b1b;'><b>Not allowed! choose option to continue. </b></p>",
                });
                return;
              }
              if (sessionStatusStt != "in_progress") {
                signals.onResponse({
                  html: "<b>To Start Your Session Please Enter Interaction Code..</b>",
                });
                return;
              } else if (
                sessionStatusStt === "in_progress" &&
                isSessionExpiredStt
              ) {
                // checking sessionexpiry
                await cancelTestStt(participantId2);
                resetAllVariablesStt();
                signals.onResponse({
                  html: "<p style='font-size: 14px;color: #991b1b;'>Your Session is expired. Please restart again.</p>",
                });
                return;
              }
              //************* check if user message is atleast 10 words */
              if (!isValidMessageStt(latestMessage)) {
                signals.onResponse({
                  html: "<p style='font-size: 14px;color: #991b1b;'><b>Response does not meet minimum length criterion.</b></p>",
                });
                return;
              }
              if (isDuplicateResponse(latestMessage)) {
                DuplicateResponseCount2 += 1;
                if (DuplicateResponseCount2 > 1) {
                  resetAllVariablesStt();
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
          let isTestcodeValid2;
          const validTestCodes2 = [
            "QU7G2X3",
            "QPN48NO",
            "QLW2EVP",
            "Q16EWL2",
            "QWLHI90",
            "Q2GGMFP",
            "QJ3RTFF",
            "QBEWUOM",
          ];
          console.log(
            "questionIndex2",
            questionIndex2,
            "userAcessAvailability2",
            userAcessAvailability2
          );
          if (questionIndex2 === 0 && userAcessAvailability2.length !== 0) {
            if (optedNo2 === false) {
              testCode2 =  latestMessage // body.messages[0].text;
              LoadingMessageWithText("Please wait while we are processing ...")
              // appendMessage2("Please wait while we are processing ...");
            } else {
              LoadingMessageWithText("Please wait while we are processing ...")
              // appendMessage2("Please wait while we are processing ...");
              // //wait while test code is being processed
              // while (!codeAvailabilityUserChoice2) {
              //   await new Promise((resolve) => setTimeout(resolve, 500));
              // }
            }
            codeAvailabilityUserChoice2 = true;
          }
          if (questionIndex2 > 0 && !responsesDone2) {
            userResponse2 = latestMessage // body.messages[0].text;
          }
          if (
            !responsesDone2 &&
            userName2.length === 0 &&
            userEmail2.length === 0 &&
            codeAvailabilityUserChoice2
          ) {
            console.log('test code: ', testCode2)
            try {
              if (questionIndex2 === 0) {
                const response = await fetch(
                  `${baseURL2}/tests/?test_code=${testCode2}`,
                  {
                    method: "GET",
                    headers: {
                      Authorization: `Basic ${createBasicAuthToken2(
                        key2,
                        secret2
                      )}`,
                    },
                  }
                );
                questionData2 = await response.json();
                if (questionData2.results.length === 0) {
                  signals.onResponse({
                    html: "<p style='font-size: 14px;color: #991b1b;'><b>Code is Invalid. Please enter a valid code.</b></p>",
                  });
                  return;
                }
                console.log("test-data = >", questionData2);
                questionLength2 = questionData2.results[0].questions.length;
                testId2 = questionData2.results[0].uid;
                interactionMode2 = questionData2.results[0].interaction_mode;
                is_free2 = questionData2.results[0].is_free;
                senarioDescription2 = questionData2.results[0].description;
                senarioTitle2 = questionData2.results[0].title;
                senarioCase2 = questionData2.results[0].scenario_case;
                senarioMediaDescription2 =
                  questionData2.results[0].description_media;
                testUIInfoStt = questionData2.results[0].ui_information;
                console.log(senarioMediaDescription2);
                testType2 = questionData2.results[0].test_type;
                orch_details2 =
                  questionData2.results[0].orchestrated_conversation_details;
                clientNameStt = questionData2.results[0].client_name;
                isTestSignedInStt = questionData2.results[0].is_logged_in;
                isImmersiveStt = questionData2.results[0].is_immersive;
                mediaPropsStt = questionData2.results[0].media_props;
                console.log(mediaPropsStt, "props");
                isTranscriptOnlyStt =
                  questionData2.results[0].is_transcript_only;
                if (testUIInfoStt) {
                  if (Object.keys(testUIInfoStt).length > 0) {
                    signals.onResponse({
                      html: "<p style='font-size: 14px;color: #991b1b;'>Alert! Please use other bot <b>CoachTalk</b> for this interaction.</p>",
                    });
                    return;
                  }
                }
                if (testType2 === "mcq") {
                  globalQuestionLengthStt = Math.log2(questionLength2 + 1);
                  globalQuestionDataStt = questionData2;
                }
                if (testType2 === "dynamic_mcq") {
                  globalQuestionLengthStt = questionLength2;
                  globalQuestionDataStt = questionData2;
                }
                //signed user rules
                if (user2) {
                  // const signedUserTestCode = await getTestCodesByRule('signed_user')
                  // if (!signedUserTestCode.includes(testCode) ){
                  //   signals.onResponse({
                  //     text: 'not allowed'
                  //   })
                  // const companyName = user2.email.split("@")[1].split(".")[0];
                  // const companyTestCode = await getTestCodesByRule2(
                  //   companyName
                  // );
                  // console.log(companyName);
                  // if (companyTestCode.length > 0) {
                  //   if (!companyTestCode.includes(testCode2)) {
                  //     signals.onResponse({
                  //       html: "<b>You are not allowed to attempt this interaction. Please check if you are logged in with the correct account and if your access code is correct. Contact the administrator if you face problems, via the help widget.</b>",
                  //     });
                  //     return;
                  //   }
                  const group_list = ["Demo", "free", "Free"];
                  // const my_lib = await getTestCodesByRule2("my_lib");
                  console.log('sttWidgetClientId : ', sttWidgetClientId)
                  if (sttWidgetClientId != null){
                    group_list.push(sttWidgetClientId)
                  } else{
                    const my_lib = await getClientInformationStt("my_lib");
                    for (const item of my_lib) {
                      if (item.emails.includes(user2.email)) {
                        group_list.push(item.group);
                      }
                    }
                  }
                  if (!group_list.includes(clientNameStt)) {
                    // clientName Demo means Free type test
                    signals.onResponse({
                      html: "<b>You are not allowed to attempt this interaction. Please check if you are logged in with the correct account and if your access code is correct. Contact the administrator if you face problems, via the help widget.</b>",
                    });
                    return;
                  }
                } else {
                  // const unSignedUserTestCode = await getTestCodesByRule2(
                  //   "unsigned_user"
                  // );
                  // if (unSignedUserTestCode.length > 0) {
                  //   if (!unSignedUserTestCode.includes(testCode2)) {
                  //     signals.onResponse({
                  //       html: "<b>You are not allowed to attempt this interaction. Please check if you are logged in with the correct account and if your access code is correct. Contact the administrator if you face problems, via the help widget.</b>",
                  //     });
                  //   }
                  // }
                  if (isTestSignedInStt) {
                    signals.onResponse({
                      html: "<b>You are not allowed to attempt this interaction. Please check if you are logged in with the correct account and if your access code is correct. Contact the administrator if you face problems, via the help widget.</b>",
                    });
                    return;
                  }
                  const group_list = ["Demo", "free", "Free"];
                  console.log('sttWidgetClientId',sttWidgetClientId)
                  if (sttWidgetClientId != null){
                    group_list.push(sttWidgetClientId)
                  }
                  if (!group_list.includes(clientNameStt)) {
                    signals.onResponse({
                      html: "<b>You are not allowed to attempt this interaction. Please check if you are logged in with the correct account and if your access code is correct. Contact the administrator if you face problems, via the help widget.</b>",
                    });
                    return;
                  }
                }
                // restriction check like monthly test allowed start
                // await getAttemptedTestList2(participantId2);
                await getIsRepeatStatus2(participantId2);
                await getTestPrevilage2(participantId2);
                if (isRepeatStatus2["monthly_remaining_tests"] < 1) {
                  signals.onResponse({
                    html: "<b>You have reached your monthly limit. Please contact your coach/administrator to get more simulations.</b>",
                  });
                  return;
                }
                // Test privilege
                if (
                  testPrevilage2 &&
                  testPrevilage2.active &&
                  !testPrevilage2.data.includes(testCode2)
                ) {
                  signals.onResponse({
                    html: "<b>You are not allowed to attempt this interaction. Please check if you are logged in with the correct account and if your access code is correct. Contact the administrator if you face problems, via the help widget.</b>",
                  });
                  return;
                }
                // User cannot attempt the test more than once if it is active
                console.log(userRole2);
                if (userRole2 && userRole2 !== "admin") {
                  if (!isRepeatStatus2.is_repeat) {
                    await getAttemptedTestList2(participantId2);
                    if (testCodeList2.includes(testCode2)) {
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
                    `${baseURL2}/test-attempt-sessions/`,
                    {
                      method: "POST",
                      headers: {
                        Authorization: `Basic ${createBasicAuthToken2(
                          key2,
                          secret2
                        )}`,
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        participant_id: participantId2,
                        ordering: "-id",
                        test_id: testId2,
                      }),
                    }
                  );
                  const data = await response.json();
                  sessionId2 = data.uid;
                  isSessionActiveStt = true;
                  console.log("Session Created => ", sessionId2);
                  // initialize coaching conversation if test is coaching type
                  try {
                    if (testType2 === "coaching") {
                      const response = await fetch(
                        `${baseURL2}/coaching-conversations/initialize/`,
                        {
                          method: "POST",
                          headers: {
                            Authorization: `Basic ${createBasicAuthToken2(
                              key2,
                              secret2
                            )}`,
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({
                            test_attempt_session_id: sessionId2,
                          }),
                        }
                      );
                      const data = await response.json();
                      console.log("Coaching Conversation Created => ", data);
                      conversation_id2 = data.uid;
                      questionLength2 = 999;
                      console.log("conversation_id", conversation_id2);
                    }
                  } catch (err) {
                    console.log("Error while creating session : ", err);
                    isSessionActiveStt = false;
                  }
                } catch (err) {
                  console.log(err);
                  isSessionActiveStt = false;
                }
              }
              if (questionIndex2 <= questionLength2) {
                if (questionIndex2 < questionLength2) {
                  if (
                    testType2 === "dynamic_discussion_thread" ||
                    testType2 === "orchestrated_conversation"
                  ) {
                    if (questionIndex2 === 0) {
                      let initial_msg2 = orch_details2["initial_messages"];
                      let start_with_user2 =
                        orch_details2["start_with_user"] ?? "none";
                      if (start_with_user2 != "none") {
                        if (start_with_user2 === "manager-team") {
                          questionText2 =
                            "Start the discussion as a manager to support the team member.";
                        } else if (start_with_user2 === "team-manager") {
                          questionText2 =
                            "Start the discussion as a team member and engage with your manager.";
                        } else if (start_with_user2 === "sales-customer") {
                          questionText2 =
                            "Start the discussion as a sales and service manager to interact with the customer.";
                        } else if (start_with_user2 === "customer-sales") {
                          questionText2 =
                            "Start the discussion as a customer to interact with the sales & service manager.";
                        } else {
                          questionText2 =
                            "Start the discussion by commenting your thoughts on this.";
                        }
                      } else {
                        let resultString2 = "";
                        for (let i = 0; i < initial_msg2.length; i++) {
                          resultString2 += "<p>" + initial_msg2[i] + "</p>";
                          if (i < initial_msg2.length - 1) {
                            resultString2 += "<br>";
                          }
                        }
                        questionText2 = resultString2;
                      }
                    }
                  } else {
                    if (testType2 === "mcq" || testType2 === "dynamic_mcq") {
                      questionText2 =
                        questionData2.results[0].questions[questionIndex2]
                          .question;
                      questionMediaLinkStt =
                        questionData2.results[0].questions[questionIndex2]
                          .media_link;
                      questionId2 =
                        questionData2.results[0].questions[questionIndex2].uid;
                      const mcqOptionsStt =
                        questionData2.results[0].questions[questionIndex2]
                          .mcq_options;
                      const optionNameStt = Object.keys(mcqOptionsStt);
                      console.log(mcqOptionsStt, optionNameStt, questionData2);
                      const option1Name = optionNameStt[0];
                      const option2Name = optionNameStt[1];
                      const option1Text = mcqOptionsStt[option1Name]["opt"];
                      const option2Text = mcqOptionsStt[option2Name]["opt"];
                      if (questionMediaLinkStt) {
                        let embeddingUrl = "";
                        if (questionMediaLinkStt.length > 0) {
                          if (questionMediaLinkStt.includes("youtube.com")) {
                            const videoId = questionMediaLinkStt.split("v=")[1];
                            embeddingUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
                          } else if (
                            questionMediaLinkStt.includes("vimeo.com")
                          ) {
                            const videoId = questionMediaLinkStt
                              .split("/")
                              .pop();
                            embeddingUrl = `https://player.vimeo.com/video/${videoId}?autoplay=1&loop=1`;
                          } else if (
                            questionMediaLinkStt.includes("twitter.com")
                          ) {
                            embeddingUrl = `https://twitframe.com/show?url=${questionMediaLinkStt}`;
                          }
                          if (embeddingUrl) {
                            questionText2 = `▪ Media <br>  <iframe
                                          allow="autoplay; encrypted-media; fullscreen;"
                                          style="width: 100%; border-radius: 8px; min-height: 50vh; min-width: 50vw;"
                                          src=${embeddingUrl}
                                          frameborder="0"
                                          allowfullscreen
                                        >
                          `;
                          }
                          const urlList = questionMediaLinkStt.split(",");
                          console.log("list", urlList);
                          if (urlList.length > 1) {
                            urlList.forEach((element) => {
                              element = element.trim();
                              if (element.includes("docs.google.com")) {
                                let url =
                                  element.split("edit?")[0] +
                                  "embed?start=true&loop=true&delayms=3000";
                                console.log(url);
                                questionText2 =
                                  questionText2 +
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
                                questionText2 =
                                  questionText2 +
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
                            if (
                              questionMediaLinkStt.includes("docs.google.com")
                            ) {
                              let url =
                                questionMediaLinkStt.split("edit?")[0] +
                                "embed?start=true&loop=true&delayms=3000";
                              console.log(url);
                              questionText2 = questionText2.replaceAll(":", "");
                              if (isImmersiveStt) {
                                console.log(questionText2);
                                const urltts = `${baseURL2}/test-responses/get-text-to-speech/?text=${questionText2}`;
                                const response = await fetch(urltts, {
                                  method: "GET",
                                  headers: {
                                    Authorization: `Basic ${createBasicAuthToken2(
                                      key2,
                                      secret2
                                    )}`,
                                  },
                                });
                                const blob = await response.blob();
                                console.log("respnse", blob);
                                const objectUrl = URL.createObjectURL(blob);
                                console.log(objectUrl, "url");
                                questionText2 = `<div ><audio style="${
                                  window.innerWidth < 600
                                    ? "width: 200px; max-width: 200px !important;"
                                    : " min-width: 50vw !important;"
                                }" controls autoplay>
                                <source src=${objectUrl} type="audio/mpeg" />
                                Your browser does not support the audio element.
                                </audio></div>`;
                                console.log(questionText2);
                              }
                              console.log("last", questionText2);
                              questionText2 =
                                questionText2 +
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
                      if (isImmersiveStt && !questionMediaLinkStt) {
                        questionText2 = questionText2.replaceAll(":", "");
                        console.log("first", questionText2);
                        const urltts = `${baseURL2}/test-responses/get-text-to-speech/?text=${questionText2}`;
                        const response = await fetch(urltts, {
                          method: "GET",
                          headers: {
                            Authorization: `Basic ${createBasicAuthToken2(
                              key2,
                              secret2
                            )}`,
                          },
                        });
                        const blob = await response.blob();
                        console.log("respnse", blob);
                        const objectUrl = URL.createObjectURL(blob);
                        console.log(objectUrl, "url");
                        questionText2 = `<div ><audio style="${
                          window.innerWidth < 600
                            ? "width: 200px; max-width: 200px !important;"
                            : " min-width: 50vw !important;"
                        }" controls autoplay>
                          <source src=${objectUrl} type="audio/mpeg" />
                          Your browser does not support the audio element.
                          </audio></div>`;
                        console.log(questionText2);
                      }
                      console.log("last", questionText2);
                      formRadio = `
                      <div id='mcq-option-stt-${mcqFormIdStt}' style="box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); padding: 20px; max-width: 100%; width: 100%; box-sizing: border-box;">
                        <div id='question-stt' style="font-size: 16px; margin-bottom: 20px; color: #333;" value="${questionId2}:${sessionId2}"><b>Q. </b>${questionText2}</div>
                        <div style="display: flex; flex-direction: row; justify-contents: space-around; gap: 8px; flex-wrap: wrap;">
                          <div style="display: flex; flex-direction: row; align-items: flex-start;">
                            <input type="radio" id="${option1Name}" name="mcq_option_stt" value="${option1Text}" style="margin-right: 5px;">
                            <label for="${option1Name}" style="font-size: 14px; margin-bottom: 10px; display: block;">${option1Text}</label>
                          </div>
                          <div style="display: flex; flex-direction: row; align-items: flex-start;">
                            <input type="radio" id="${option2Name}" name="mcq_option_stt" value="${option2Text}" style="margin-right: 5px;">
                            <label for="${option2Name}" style="font-size: 14px; margin-bottom: 10px; display: block;">${option2Text}</label>
                          </div>
                        </div>
                        <button id="submit-btn" onclick="setMcqVariablesStt()" style="margin-top: 15px; padding: 10px 15px; width: 100%; border: 1px solid #1984ff; border-radius: 5px; color: white; background-color: #1984ff; cursor: pointer; font-size: 16px;">Submit</button>
                      </div>`;
                      questionText2 = formRadio;
                    } else {
                      if (testType2 != "coaching" || questionIndex2 == 0) {
                        questionText2 =
                          questionData2.results[0].questions[questionIndex2]
                            .question;
                        questionMediaLinkStt =
                          questionData2.results[0].questions[questionIndex2]
                            .media_link;
                      }
                    }
                  }
                  console.log(questionText2);
                  if (questionIndex2 === 0) {
                    initialQuestionTextStt = questionText2;
                    initialIndexStt = questionIndex2 + 1;
                    isProceedStt = "false";
                    questionText2 = `
                    <div id="proceed-option2" >
                    <b>Proceed ?</b>
                        <button style="margin-top:5px;  width:fit-content; padding:6px 12px; border: 1px solid lightgray; border-radius: 4px;"  onmouseover="this.style.cursor ='pointer'" onclick="handleProceedClickStt('Yes')">Yes</button>
                        <button style="margin-top:5px;  width:fit-content; padding:6px 12px; border: 1px solid lightgray; border-radius: 4px;" onmouseover="this.style.cursor ='pointer'"  onclick="handleProceedClickStt('No')">No</button>
                    </div>`;
                    console.log(senarioMediaDescription2, "mediadesc");
                    if (senarioMediaDescription2) {
                      let embeddingUrl2 = "";
                      if (senarioMediaDescription2.length > 0) {
                        console.log(senarioMediaDescription2);
                        if (senarioMediaDescription2.includes("youtube.com")) {
                          const videoId =
                            senarioMediaDescription2.split("v=")[1];
                          embeddingUrl2 = `https://www.youtube.com/embed/${videoId}`;
                          appendMessage2(
                            `▪ Title : ${senarioTitle2} <br><br>
                               ▪ Description : ${senarioDescription2} <br><br>
                               ▪ Instructions : Response should be at least 15 words. <br><br>
                               ▪ Media  <iframe
                                          style="width: 100%; border-radius: 8px; min-height: 50vh;"
                                          src=${embeddingUrl2}
                                          frameborder="0"
                                          allowfullscreen
                                        >
                              `
                          );
                        } else if (
                          senarioMediaDescription2.includes("vimeo.com")
                        ) {
                          const videoId = senarioMediaDescription2
                            .split("/")
                            .pop();
                          embeddingUrl2 = `https://player.vimeo.com/video/${videoId}`;
                          appendMessage2(
                            `▪ Title : ${senarioTitle2} <br><br>
                               ▪ Description : ${senarioDescription2} <br><br>
                               ▪ Instructions : Response should be at least 15 words. <br><br>
                               ▪ Media  <iframe
                                          style="width: 100%; border-radius: 8px; min-height: 50vh;"
                                          src=${embeddingUrl2}
                                          frameborder="0"
                                          allowfullscreen
                                        >
                              `
                          );
                        } else if (
                          senarioMediaDescription2.includes("twitter.com")
                        ) {
                          // console.log(tweetId);
                          embeddingUrl2 = `https://twitframe.com/show?url=${senarioMediaDescription2}`;
                          appendMessage2(
                            `▪ Title : ${senarioTitle2} <br><br>
                                 ▪ Description : ${senarioDescription2} <br><br>
                                 ▪ Instructions : Response should be at least 15 words. <br><br>
                                 ▪ Media  <iframe
                                            allow="autoplay; encrypted-media; fullscreen;
                                            style="width: 100%; border-radius: 8px; min-height: 50vh;"
                                            src=${embeddingUrl2}
                                            frameborder="0"
                                            allowfullscreen
                                          >
                                `
                          );
                        } else {
                          const urlList = senarioMediaDescription2.split(",");
                          console.log("list", urlList);
                          if (urlList.length > 1) {
                            appendMessage2(`▪ Title : ${senarioTitle2} <br><br>
                                ▪ Description : ${senarioDescription2} <br><br>
                                ▪ Instructions : Response should be at least 15 words. <br><br>`);
                            urlList.forEach((element) => {
                              element = element.trim();
                              if (element.includes("docs.google.com")) {
                                let url =
                                  element.split("edit?")[0] +
                                  "embed?start=true&loop=true&delayms=3000";
                                console.log(url);
                                appendMessage2(`<iframe src=${url}
                                                frameborder="0"
                                                style="width: 100%; border-radius: 8px; min-height: 50vh; min-width: 50vw;"
                                                allowfullscreen="true"
                                                mozallowfullscreen="true"
                                                webkitallowfullscreen="true"
                                                ></iframe>`);
                              } else {
                                console.log(element);
                                appendMessage2(
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
                              senarioMediaDescription2.includes(
                                "docs.google.com"
                              )
                            ) {
                              let url =
                                senarioMediaDescription2.split("edit?")[0] +
                                "embed?start=true&loop=true&delayms=3000";
                              console.log(url);
                              appendMessage2(
                                `▪ Title : ${senarioTitle2} <br><br>
                              ▪ Description : ${senarioDescription2} <br><br>
                              ▪ Instructions : Response should be at least 15 words. <br><br>
                              `
                              );
                              appendMessage2(`<iframe src=${url}
                                              frameborder="0"
                                              style="width: 100%; border-radius: 8px; min-height: 50vh; min-width: 50vw;"
                                              allowfullscreen="true"
                                              mozallowfullscreen="true"
                                              webkitallowfullscreen="true"
                                              ></iframe>`);
                            } else if (
                              senarioMediaDescription2.includes("guidejar.com")
                            ) {
                              const guidejarId = senarioMediaDescription2
                                .split("/")
                                .pop();
                              appendMessage2(
                                `▪ Title : ${senarioTitle2} <br><br>
                              ▪ Description : ${senarioDescription2} <br><br>
                              ▪ Instructions : Response should be at least 15 words. <br><br>
                              `
                              );
                              appendMessage2(`
                              <div style="width:640px">
                              <div style="position:relative;height:0;width:100%;overflow:hidden;box-sizing:border-box;padding-bottom:calc(100% - 0px)">
                              <iframe src="https://www.guidejar.com/embed/${guidejarId}?type=1&controls=off" width="100%" height="100%" style="position:absolute;inset:0" allowfullscreen frameborder="0"></iframe
                              ></div></div>
                              `);
                            } else {
                              appendMessage2(
                                `▪ Title : ${senarioTitle2} <br><br>
                                    ▪ Description : ${senarioDescription2} <br><br>
                                    ▪ Instructions : Response should be at least 15 words. <br><br>
                                    ▪ Media : <a href="${senarioMediaDescription2}" target="_blank">Click here to read the article.</a>
                                    `
                              );
                            }
                          }
                        }
                        // if (!senarioMediaDescription2.includes("twitter.com")) {
                        //    appendMessage2(
                        //      `▪ Title : ${senarioTitle2} <br><br>
                        //        ▪ Description : ${senarioDescription2} <br><br>
                        //        ▪ Instructions : Response should be at least 15 words. <br><br>
                        //        ▪ Media  <iframe
                        //                   style="width: 100%; border-radius: 8px; min-height: 50vh;"
                        //                   src=${embeddingUrl2}
                        //                   frameborder="0"
                        //                   allowfullscreen
                        //                 >
                        //       `
                        //    );
                        // }
                      } else {
                        appendMessage2(
                          `▪ Title : ${senarioTitle2} <br><br>
                             ▪ Description : ${senarioDescription2} <br><br>
                             ▪ Instructions : Response should be at least 15 words.`
                        );
                      }
                      // proceed buttion will show
                      signals.onResponse({
                        html: questionText2,
                      });
                    } else if (
                      mediaPropsStt &&
                      Object.keys(mediaPropsStt).includes("test_image")
                    ) {
                      console.log("Media props here", mediaPropsStt);
                      console.log("SHOW MEDIA PROPS here", mediaPropsStt);
                      // const [imageUrlStt, coords] = Object.entries(
                      //   mediaPropsStt.test_image
                      // )[0];
                      const url = Object.keys(mediaPropsStt["test_image"])[0];
                      let narration;
                      let coords = [];
                      const coordAndTitleNarrationList =
                        mediaPropsStt["test_image"][url];
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
                      const imageUrlStt = testImage.image;
                      const coordsStt = [
                        {
                          coord: "109.70.257.89|55.34.131.43",
                          title: "Hand Wheel",
                        },
                        { coord: "170.112.197.194|85.56.99.80", title: "Stem" },
                        {
                          coord: "128.208.246.242 | 63.97.125.125",
                          title: "Gear Unit",
                        },
                      ];
                      const narrationStt = testImage.narration;
                      const ttsNarration = await TTSContainerSTT(narrationStt);
                      const imageIdStt = "mediaImageStt";
                      const imageMapNameStt = "image-mapStt";
                      const imageTooltipIdStt = "tooltip-stt";
                      appendMessage2(
                        `▪ Title : ${senarioTitle2} <br><br>
                             ▪ Description : ${senarioDescription2} <br><br>
                             ▪ Instructions : Response should be at least 15 words. <br><br>
                             ▪ <img src=${imageUrlStt} ${
                          window.innerWidth < 768
                            ? "width='200'"
                            : "width='400'"
                        } usemap="#${imageMapNameStt}" id=${imageIdStt} style="border-radius: 8px; margin-top: 4px;" /> <br><br>
                             ▪ ${ttsNarration}`
                      );
                      signals.onResponse({
                        html: questionText2,
                      });
                      // pass - coords, imagemap-name,
                      setHoverPointsStt(
                        coordsStt,
                        imageIdStt,
                        imageMapNameStt,
                        imageTooltipIdStt
                      );
                      console.log("IMAGE MAPPED WITH COORDS");
                    } else {
                      // proceed buttion will show
                      signals.onResponse({
                        html: questionText2,
                        text: ` ▪ Title : ${senarioTitle2} \n\n  ▪ Description : ${senarioDescription2} \n\n ▪ Instructions : Response should be at least 15 words.`,
                      });
                    }
                  } else {
                    if (
                      testType2 != "orchestrated_conversation" &&
                      testType2 != "dynamic_discussion_thread" &&
                      testType2 != "coaching"
                    ) {
                      let responderName;
                      let strList = questionText2
                        .replaceAll("*", "")
                        .split(":");
                      if (strList.length > 1) {
                        questionText2 = strList[1];
                        responderName = `<b>${strList[0]}:</b><br>`;
                      }
                      if (isImmersiveStt) {
                        questionText2 = await TTSContainerSTT(questionText2);
                      }
                      if (responderName) {
                        questionText2 = responderName + questionText2;
                      }
                      if (questionMediaLinkStt) {
                        console.log(questionText2);
                        let embeddingUrl = "";
                        if (questionMediaLinkStt.length > 0) {
                          if (questionMediaLinkStt.includes("youtube.com")) {
                            const videoId = questionMediaLinkStt.split("v=")[1];
                            embeddingUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
                          } else if (
                            questionMediaLinkStt.includes("vimeo.com")
                          ) {
                            const videoId = questionMediaLinkStt
                              .split("/")
                              .pop();
                            embeddingUrl = `https://player.vimeo.com/video/${videoId}?autoplay=1&loop=1`;
                          } else if (
                            questionMediaLinkStt.includes("twitter.com")
                          ) {
                            embeddingUrl = `https://twitframe.com/show?url=${questionMediaLinkStt}`;
                          }
                          if (embeddingUrl) {
                            questionText2 = `▪ Media <br>  <iframe
                                          allow="autoplay; encrypted-media; fullscreen;"
                                          style="width: 100%; border-radius: 8px; min-height: 50vh; min-width: 50vw;"
                                          src=${embeddingUrl}
                                          frameborder="0"
                                          allowfullscreen
                                        >
                          `;
                          }
                          const urlList = questionMediaLinkStt.split(",");
                          console.log("list", urlList);
                          if (urlList.length > 1) {
                            urlList.forEach((element) => {
                              element = element.trim();
                              if (element.includes("docs.google.com")) {
                                let url =
                                  element.split("edit?")[0] +
                                  "embed?start=true&loop=true&delayms=3000";
                                console.log(url);
                                appendMessage2(`<iframe src=${url}
                                                frameborder="0"
                                                style="width: 100%; border-radius: 8px; min-height: 50vh; min-width: 50vw;"
                                                allowfullscreen="true"
                                                mozallowfullscreen="true"
                                                webkitallowfullscreen="true"
                                                ></iframe>`);
                              } else {
                                console.log(element);
                                appendMessage2(`<div ><audio style="${
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
                            if (
                              questionMediaLinkStt.includes("docs.google.com")
                            ) {
                              let url =
                                questionMediaLinkStt.split("edit?")[0] +
                                "embed?start=true&loop=true&delayms=3000";
                              console.log(url);
                              appendMessage2(`<iframe src=${url}
                                              frameborder="0"
                                              style="width: 100%; border-radius: 8px; min-height: 50vh; min-width: 50vw;"
                                              allowfullscreen="true"
                                              mozallowfullscreen="true"
                                              webkitallowfullscreen="true"
                                              ></iframe>`);
                            } else if (
                              questionMediaLinkStt.includes("guidejar.com")
                            ) {
                              const guidejarId = questionMediaLinkStt
                                .split("/")
                                .pop();
                              appendMessage2(`
                              <div style="width:640px">
                              <div style="position:relative;height:0;width:100%;overflow:hidden;box-sizing:border-box;padding-bottom:calc(100% - 0px)">
                              <iframe src="https://www.guidejar.com/embed/${guidejarId}?type=1&controls=off" width="100%" height="100%" style="position:absolute;inset:0" allowfullscreen frameborder="0"></iframe
                              ></div></div>
                              `);
                            }
                          }
                        }
                      }
                      if (questionText2) {
                        console.log(`que_image ${questionIndex2 + 1}`);
                        if (
                          mediaPropsStt &&
                          Object.keys(mediaPropsStt).includes(
                            `que_image ${questionIndex2 + 1}`
                          )
                        ) {
                          const questionpropName = `que_image ${
                            questionIndex2 + 1
                          }`;
                          const url = Object.keys(
                            mediaPropsStt[questionpropName]
                          )[0];
                          let narration;
                          let coords = [];
                          const coordAndTitleNarrationList =
                            mediaPropsStt[questionpropName][url];
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
                          const imageUrlStt = testImage.image;
                          const coordsStt = testImage.coords;
                          const narrationStt = testImage.narration;
                          const ttsNarration = await TTSContainerSTT(
                            narrationStt
                          );
                          const imageIdStt = `mediaImageStt${questionIndex2}`;
                          const imageMapNameStt = `image-mapStt${questionIndex2}`;
                          const imageTooltipIdStt = `tooltip-stt${questionIndex2}`;
                          questionText2 = `▪ ${ttsNarration}<br><br>
                                           <br> <img src=${imageUrlStt} ${
                            window.innerWidth < 768
                              ? "width='200'"
                              : "width='400'"
                          } usemap="#${imageMapNameStt}" id=${imageIdStt} style="border-radius: 8px; margin-top: 4px;" /> <br><br>
                                            ▪ Question : <br> ${questionText2}
                                          `;
                          signals.onResponse({
                            html: questionText2,
                          });
                          setHoverPointsStt(
                            coordsStt,
                            imageIdStt,
                            imageMapNameStt,
                            imageTooltipIdStt
                          );
                          console.log(testImage, "IMAGE MAPPED WITH COORDS ", {
                            questionIndex2,
                          });
                          // questionText2 = questionText2 + imageDiv
                        } else {
                          signals.onResponse({
                            html: questionText2,
                          });
                        }
                      }
                    }
                  }
                }
                if (
                  questionIndex2 === questionLength2 &&
                  userResponse2.length > 0
                ) {
                  const shadowRoot =
                    document.getElementById("chat-element2").shadowRoot;
                    
                  LoadingMessageWithText("Crunching report data")

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
                    user2 ? "" : "<b> Hang tight for next steps</b>"
                  }`;
                  messageBubble.appendChild(messageText);
                  messageNode.appendChild(messageBubble);
                  shadowRoot
                    .getElementById("messages")
                    .appendChild(messageNode);
                  shadowRoot.getElementById("messages").scrollBy(0, 100);
                }
                if (questionIndex2 > 0) {
                  if (testType2 != "coaching" || questionIndex2 == 0) {
                    questionId2 =
                      questionData2.results[0].questions[questionIndex2 - 1]
                        .uid;
                  }
                  questionIndex2++;
                  if (testType2 === "coaching") {
                    const response = await fetch(
                      `${baseURL2}/coaching-conversations/${conversation_id2}/reply/`,
                      {
                        method: "POST",
                        headers: {
                          Authorization: `Basic ${createBasicAuthToken2(
                            key2,
                            secret2
                          )}`,
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          participant_message_text: userResponse2,
                          participant_message_url: "",
                        }),
                      }
                    );
                    const responseData = await response.json();
                    console.log(
                      "Response from Coaching submit response : ",
                      responseData
                    );
                    questionText2 = responseData["coach_message_text"];
                    conversation_id2 = responseData["uid"];
                    console.log("coaching question Text: ", questionText2);
                    let responderName;
                    const strList = questionText2.split(":", 2);
                    if (strList.length > 1) {
                      responderName = `<b>${strList[0]}:</b><br>`;
                      questionText2 = strList[1];
                    }
                    if (isImmersiveStt) {
                      questionText2 = await TTSContainerStt(questionText2);
                    }
                    if (responderName) {
                      questionText2 = responderName + questionText2;
                    }
                    const dataToShow2 = getCoachingQuestionData2(questionText2);
                    signals.onResponse({
                      html: dataToShow2,
                    });
                    console.log(questionData2);
                  } else {
                    const response = await fetch(
                      `${baseURL2}/test-responses/`,
                      {
                        method: "POST",
                        headers: {
                          Authorization: `Basic ${createBasicAuthToken2(
                            key2,
                            secret2
                          )}`,
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          test_attempt_session_id: sessionId2,
                          question_id: questionId2,
                          response_text: userResponse2,
                          response_file: "",
                          user_attributes: {
                            tag: "deepchat_profile",
                            attributes: {
                              username: "web_user",
                              email: user2 ? user2.email : getAnonymousEmail(),
                            },
                          },
                        }),
                      }
                    );
                    const responseData = await response.json();
                    resQuestionNumber2 = responseData.question.question_number;
                  }
                  if (questionIndex2 < questionLength2) {
                    if (
                      testType2 === "dynamic_discussion_thread" ||
                      testType2 === "orchestrated_conversation"
                    ) {
                      questionId2 =
                        questionData2.results[0].questions[questionIndex2 - 1]
                          .uid;
                      questionIndex2++;
                      const questionResponse2 = await fetch(
                        `${baseURL2}/test-responses/`,
                        {
                          method: "POST",
                          headers: {
                            Authorization: `Basic ${createBasicAuthToken2(
                              key2,
                              secret2
                            )}`,
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({
                            test_attempt_session_id: sessionId2,
                            question_id: questionId2,
                            response_text: "",
                            response_file: "",
                            user_attributes: {
                              tag: "deepchat_profile",
                              attributes: {
                                username: "web_user",
                                email: user2
                                  ? user2.email
                                  : getAnonymousEmail(),
                              },
                            },
                          }),
                        }
                      );
                      const qRespnse2 = await questionResponse2.json();
                      questionText2 = qRespnse2["response_text"];
                      // checking if botname is present or not
                      const responder_name2 = qRespnse2.responder_display_name;
                      if (!questionText2.includes(responder_name2)) {
                        questionText2 = responder_name2 + " : " + questionText2;
                      }
                      if (isImmersiveStt) {
                        questionText2 = questionText2.replace(
                          `${responder_name2}`,
                          ""
                        );
                        questionText2 = questionText2.replace(`:`, "");
                        questionText2 = responder_name2 + " : " + questionText2;
                      }
                      resQuestionNumber2 = qRespnse2.question.question_number;
                    }
                  }
                }
                if (resQuestionNumber2 != questionLength2) {
                  if (
                    testType2 === "orchestrated_conversation" ||
                    testType2 === "dynamic_discussion_thread"
                  ) {
                    console.log("ismmersive", isImmersiveStt, questionText2);
                    const stringList = questionText2.split(":", 2);
                    console.log(stringList);
                    let responderName;
                    if (stringList.length > 1) {
                      questionText2 = stringList[1];
                      responderName = `<b>${stringList[0]}:</b><br>`;
                    }
                    if (isImmersiveStt && questionIndex2 != 0) {
                      questionText2 = await TTSContainerSTT(questionText2);
                    }
                    if (responderName) {
                      questionText2 = responderName + questionText2;
                    }
                    signals.onResponse({
                      html: questionText2,
                    });
                  }
                }
                userResponse2 = "";
                if (questionIndex2 === 0) {
                  questionIndex2++;
                }
                if (resQuestionNumber2 === questionLength2) {
                  responsesDone2 = true;
                  const isCheckStt = await SessionCheckStt(sessionId2);
                  if (!isCheckStt) {
                    console.log("failed to populate session data", isCheckStt);
                    if (testType2 === "mcq" || testType2 === "dynamic_mcq") {
                      const shadowRoot =
                        document.getElementById("chat-element2").shadowRoot;
                      const button = shadowRoot.getElementById(
                        `mcq-option-stt-${mcqFormIdStt}`
                      );
                      // button.parentNode.removeChild(button)
                      const thankYouMessage = document.createElement("div");
                      thankYouMessage.innerHTML = "<b>Thank you!</b>"; // You can customize the message here
                      // Replace the button with the "Thank you" message
                      button.parentNode.replaceChild(thankYouMessage, button);
                    }
                    if (isProceedStt === "false") {
                      const gshadowRoot =
                        document.getElementById("chat-element2").shadowRoot;
                      const msg = gshadowRoot.getElementById("proceed-option2");
                      // button.parentNode.removeChild(button)
                      const que_msg = document.createElement("div");
                      que_msg.innerHTML = "Thank You"; // You can customize the message here
                      // Replace the button with the "Thank you" message
                      msg.parentNode.replaceChild(que_msg, msg);
                    }
                    resetAllVariablesStt();
                    signals.onResponse({
                      html: "<p style='font-size: 14px;color: #991b1b;'><b>Unfortunately due to technical reasons, your earlier response could not be processed. The session will be terminated. Please try again using the interaction code.</b>.</p>",
                    });
                    return;
                  }
                  if (!window.user) {
                    isEmailFormstt = true;
                    formFieldsstt = ["name", "email"];
                    signals.onResponse({
                      html: `<b>Please enter your ${formFieldsstt[0]}</b>`,
                    });
                  }
                  let getReportBody2 = {
                    user_id: participantId2,
                    report_type: reportType2,
                    session_id: sessionId2,
                    interaction_id: testId2,
                  };
                  if (is_free2) {
                    reportType2 = "summaryFeedbackReport";
                    getReportBody2 = {
                      user_id: participantId2,
                      report_type: reportType2,
                      session_id: sessionId2,
                      interaction_id: testId2,
                    };
                  } else if (testType2 === "dynamic_discussion_thread") {
                    reportType2 = "dynamicDiscussionReport";
                    getReportBody2 = {
                      user_id: participantId2,
                      report_type: reportType2,
                      test_attempt_session_id: sessionId2,
                      interaction_id: testId2,
                    };
                  } else if (testType2 === "orchestrated_conversation") {
                    reportType2 = "meetingAnalysisReport";
                    getReportBody2 = {
                      user_id: participantId2,
                      report_type: reportType2,
                      test_attempt_session_id: sessionId2,
                    };
                  } else if (senarioCase2 === "process_training") {
                    reportType2 = "processTrainingReport";
                    getReportBody2 = {
                      user_id: participantId2,
                      report_type: reportType2,
                      session_id: sessionId2,
                      interaction_id: testId2,
                    };
                  }
                  console.log(senarioCase2, getReportBody2);
                  const reportResponse = await fetch(
                    `${baseURL2}/frontend-auth/get-report-url/`,
                    {
                      method: "POST",
                      headers: {
                        Authorization: `Basic ${createBasicAuthToken2(
                          key2,
                          secret2
                        )}`,
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify(getReportBody2),
                    }
                  );
                  const reportData2 = await reportResponse.json();
                  reportUrl2 = reportData2.url;
                  globalReportUrl2 = reportData2.url;
                  console.log("Report URL ===> ", reportUrl2);
                  if (reportData2) {
                    responsesDone2 = true;
                  }
                  // const urlObject = new URL(reportUrl2);
                  // const baseurl = `${urlObject.protocol}//${urlObject.host}`;
                  // console.log(baseurl)
                  // const resp = await fetch(baseurl)
                  // console.log(resp)
                  // if (!resp.ok){
                  //   signals.onResponse({
                  //     html: "<p style='font-size: 14px;color: #991b1b;'><b>Unfortunately due to technical reasons, your earlier response could not be processed. The session will be terminated. Please try again using the interaction code.</b>.</p>"
                  //   })
                  // }
                  if (window.user) {
                    // sendEmail();
                    const message = `<b>It's showtime ✨, here is your detailed <a target="_blank" style="color: #3b82f6;text-decoration:none;" href="${globalReportUrl2}">feedback report</a>. The feedback is also emailed to you and will be available to you for 60 days.</b>`;
                    appendMessage2(message);
                    // //* send message to start new session
                    signals.onResponse({
                      html: "<b>Please enter another access code to start a new interaction.</b>",
                    });
                    submitEmailAndName2();


                    //Enable Copy Paste
                    var chatElementRef2 = document.getElementById("chat-element2");
                    var shadowRoot = chatElementRef2.shadowRoot;
                
                    const textInputElement = shadowRoot.getElementById("text-input")
                    textInputElement.removeAttribute("onpaste")
                    return;
                  }
                }
              }
            } catch (err) {
              console.log(err);
              if (testType2 === "mcq" || testType2 === "dynamic_mcq") {
                const shadowRoot =
                  document.getElementById("chat-element2").shadowRoot;
                const button = shadowRoot.getElementById(
                  `mcq-option-stt-${mcqFormIdStt}`
                );
                // button.parentNode.removeChild(button)
                const thankYouMessage = document.createElement("div");
                thankYouMessage.innerHTML = "<b>Thank you!</b>"; // You can customize the message here
                // Replace the button with the "Thank you" message
                button.parentNode.replaceChild(thankYouMessage, button);
              }
              if (isProceedStt === "false") {
                const gshadowRoot =
                  document.getElementById("chat-element2").shadowRoot;
                const msg = gshadowRoot.getElementById("proceed-option2");
                // button.parentNode.removeChild(button)
                const que_msg = document.createElement("div");
                que_msg.innerHTML = "Thank You"; // You can customize the message here
                // Replace the button with the "Thank you" message
                msg.parentNode.replaceChild(que_msg, msg);
              }
              resetAllVariablesStt();
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
        await cancelTestStt(participantId2); // cancelling session
        if (testType2 === "mcq" || testType2 === "dynamic_mcq") {
          const shadowRoot =
            document.getElementById("chat-element2").shadowRoot;
          const button = shadowRoot.getElementById(
            `mcq-option-stt-${mcqFormIdStt}`
          );
          // button.parentNode.removeChild(button)
          const thankYouMessage = document.createElement("div");
          thankYouMessage.innerHTML = "<b>Thank you!</b>"; // You can customize the message here

          // Replace the button with the "Thank you" message
          button.parentNode.replaceChild(thankYouMessage, button);
        }
        if (isProceedStt === "false") {
          const gshadowRoot =
            document.getElementById("chat-element2").shadowRoot;
          const msg = gshadowRoot.getElementById("proceed-option2");
          // button.parentNode.removeChild(button)
          const que_msg = document.createElement("div");
          que_msg.innerHTML = "Thank You"; // You can customize the message here
          // Replace the button with the "Thank you" message
          msg.parentNode.replaceChild(que_msg, msg);
        }

        resetAllVariablesStt();
        signals.onResponse({
          html: "<p style='font-size: 14px;color: #991b1b;'><b>Unfortunately due to technical reasons, your earlier response could not be processed. The session will be terminated. Please try again using the interaction code.</b>.</p>",
        });
      }
    },
  };
});

const openChatContainer2 = () => {
  let chatContainer2 = document.getElementsByClassName("chat-container2")?.[0];
  let chatIcon2 = document.getElementsByClassName("chat-icon2")?.[0];
  let backdrop = document.getElementById("backdrop");
  backdrop.style.display = "block";
  document.body.style.overflowY = "hidden";

  //end session due to inactivity :- row 708
  if (botId && botType !== "user_bot") {
    if (isBotInitialized === true) {
      setTimeout(() => {
        handleEndConversation(true);
        isBotInitialized = false;
      }, 1800000);
    }
  }



  if (chatContainer2.style.scale === "1") {
    chatContainer2.style.scale = 0;
    chatContainer2.style["transform-origin"] = "100% 100%";
    document.body.style.overflowY = "scroll";
    backdrop.style.display = "none";
  } else {
    chatContainer2.style.scale = 1;
    chatContainer2.style["transform-origin"] = "100% 50%";

    //to close other bot
    botId = document.querySelector(".coachbots-coachscribe").dataset.botId;
    // botId = 'stress-management-0032'

    if (!botId) {
      const chatContainer = document.getElementById("chat-container");
      chatContainer.style.scale = 0;
      chatContainer.style["transform-origin"] = "100% 100%";
      const chatIcon = document.getElementsByClassName("chat-icon")?.[0];
      chatIcon.src =
        "https://cdn.statically.io/gh/falahh6/coachbots/main/coachbot-logo-bot.png";

      const backdrop2 = document.getElementById("backdrop2");
      backdrop2.style.display = "none";
    }
  }

  if (
    chatIcon2.src ===
    "https://cdn.statically.io/gh/falahh6/coachbots/main/coachbot-logo-bot.png"
  ) {
    chatIcon2.src =
      "https://cdn.statically.io/gh/falahh6/coachbots/main/close-btn.png";
  } else {
    chatIcon2.src =
      "https://cdn.statically.io/gh/falahh6/coachbots/main/coachbot-logo-bot.png";
  }
};

const closeFromTop2 = () => {
  let chatContainer2 = document.getElementsByClassName("chat-container2")?.[0];
  let chatIcon2 = document.getElementsByClassName("chat-icon2")?.[0];
  document.body.style.overflowY = "scroll";
  let backdrop = document.getElementById("backdrop");
  backdrop.style.display = "none";
  chatContainer2.style.scale = 0;
  chatContainer2.style["transform-origin"] = "100% 100%";
  
  //end session due to inactivity :- row 708
  // setTimeout(() => {
  //   if(isBotInitialized === true){
  //     handleEndConversation(true)
  //     isBotInitialized = false
  //   }
  // }, 900000);

  if (
    chatIcon2.src ===
    "https://cdn.statically.io/gh/falahh6/coachbots/main/coachbot-logo-bot.png"
  ) {
    chatIcon2.src =
      "https://cdn.statically.io/gh/falahh6/coachbots/main/close-btn.png";
  } else {
    chatIcon2.src =
      "https://cdn.statically.io/gh/falahh6/coachbots/main/coachbot-logo-bot.png";
  }
};
