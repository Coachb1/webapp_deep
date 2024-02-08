const key2 = "";
const secret2 = "";

const subdomainStt = window.location.hostname.split(".")[0];
const devUrlStt = "https://coach-api-ovh.coachbots.com/api/v1";
// const devUrlStt = "http://127.0.0.1:8001/api/v1"
// const devUrlStt = "https://coach-api-gcp.coachbots.com/api/v1";
const prodUrlStt = "https://coach-api-prod-ovh.coachbots.com/api/v1";
const baseURL2 = subdomainStt === "platform" ? prodUrlStt : devUrlStt;

// const baseURL2="https://coach-api-ovh.coachbots.com/api/v1" //local

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
let recommendationsStt = '';
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
let faqHtmlData = '';
let fitmentAnalysisInProgress = false;
let fitmentAnalysisIndex = 1;
let fitmentAnalysisQuestions;
let fitmentAnalysisQnA = {}
let feedbackBotIndex = 1;
let feedbackBotQuestions;
let feedbackBotQnA = {};
let isFeedbackConvEnd= false;
let FeedbackUserEmail;
let botId;
let botType;
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
let formFieldsstt = []
let CoachingForFitment;
let previousFitmentJson = {};
let userResponses2 = []
let DuplicateResponseCount2 = 0;
let isAttemptingRecommendation = false;
let optedBeginSession = false;
let botWelcomeMessage="";

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
        "coaching_intake": {
            "1": "Can you share a bit about your background and the specific goals you hope to achieve?",
            "2": "What do you expect to gain from these sessions?",
            "3": "How do you learn best?",
            "4": "What are the three biggest changes you'd like to make in your life within the near future?",
            "5": "How do you prefer to communicate and receive feedback?",
            "6": "Are there any specific values that are important to you, and that you would like your coach to be aware of?",
            "7": "What challenges or obstacles do you anticipate in achieving your goals, and how do you envision the coach supporting you in overcoming them?"
        },
        "mentoring_intake": {
            "1": "What are your career goals and how can I help support you in working towards them?",
            "2": "What strengths do you hope to enhance through this mentorship?",
            "3": "How do you best learn new information or skills?",
            "4": "What challenges are you currently facing that you'd like advice on?",
            "5": "Are there specific milestones or achievements you're aiming for?",
            "6": "How often would you like to meet and what's the best way to communicate between sessions?",
            "7": "What motivated you to seek out a mentorship relationship?"
        }
    }

function createBasicAuthToken2(key2 = "", secret2 = "") {
    const token2 =
      "Yzc3MjFmZGItYTllMC00YTYxLWEzMTYtNDRhODA1N2VkMjY0OjhjNWNlZWZlLTY2Y2QtNDliZi04MTY5LTBhNjMwMmU5NmZlMA==";
      // "MDU2MTUwZWYtYjliYS00NTRlLTkzYTYtMDliZDdjNzFlYjNiOjFkOWMwZGJhLTI0OTAtNDZmYS1hMTNiLTU3Yjg5NDdhNjMwMg==";
    // "MzdkMGVkNzgtOTI5Ni00MWQwLTk1NjgtYjdjZTBhYjA2OTY5Ojk1ZGIxNTNkLWEzZWMtNDM0Zi05YjIwLTc0M2M3M2Q5ZDZkYg=="; //local
  return token2;
}


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

  const getUserOrAnonymousDetails = async(choice)=>{
    console.log(choice)
    const gshadowRoot = document.getElementById("chat-element2").shadowRoot;
    const msg = gshadowRoot.getElementById("anonymous");
    // // button.parentNode.removeChild(button)
    // const que_msg = document.createElement("div");
    // que_msg.innerHTML = "Thank You"; // You can customize the message here
    // // Replace the button with the "Thank you" message
    // msg.parentNode.replaceChild(que_msg, msg);
    const buttons = msg.querySelectorAll('button');

    // Disable each button
    buttons.forEach(button => {
        button.disabled = true;
    });
    if (choice === 'No'){
      if (!window.user){
        let emailForm;
        if(window.innerWidth > 768) {
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
        isEmailFormstt = true
        formFieldsstt = ['email']
        appendMessage2(`<b>Please enter your ${formFieldsstt[0]}</b>`)

      } else{
        FeedbackUserEmail = user.email
        const thumbsupdiv =  await feedbackBotInitialFlow('save_email')
        appendMessage2(thumbsupdiv)
      }
    } else if (choice === "Yes"){
      console.log("hi")
      FeedbackUserEmail = 'Anonymous User'
      const thumbsupdiv = await feedbackBotInitialFlow('save_email')
      appendMessage2(thumbsupdiv)

    }
  }
  const handleEndFeedback = async () =>{
    if (isFeedbackConvEnd){
      return;
    }
    isFeedbackConvEnd = true;
    appendMessage2("<p> That's it Thank you for your feedback.")
    increaseActionPointStt(userId2,"feedback_given")
    const queryparams = new URLSearchParams({
      conversation: JSON.stringify(feedbackBotQnA),
      bot_id: botId,
      type_of_email: "feedback_conv",
      user_email: FeedbackUserEmail
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
          
      })

      const queryparam = new URLSearchParams({
        method: "post",
        qna: JSON.stringify(feedbackBotQnA),
        bot_id: botId,
        is_positive: IsPositiveFeedback ? "True" : "False",
        qna_type: "feedback",
        user_id: userId2
    });

      const resp = await fetch(
        `${baseURL2}/accounts/get-user-feedback-data/?${queryparam}`,
        {
            method: "GET",
            headers: {
            Authorization: `Basic ${createBasicAuthToken2(key2,secret2)}`,
            "Content-Type": "application/json",
            },
        }
        )
        .then((response) => response.json())
        .then((data) => {
            console.log(" response : ", data);
            
        })

    // resetAllVariablesStt()
    appendMessage2("please wait while we are getting some recommendations for you...")

                  
    
    try {
      const params = new URLSearchParams({
        context: JSON.stringify(feedbackBotQnA),
        for : 'feedback_bot'
      })
      const response = await fetch(`${baseURL2}/tests/get-recommendetion-tests/?${params}`, {
        method: "GET",
        headers: {
          Authorization: `Basic ${createBasicAuthToken2(key2, secret2)}`,
        },
      });

      const recommendation_tests_data = await response.json();

      const fetched_test_code = Object.keys(recommendation_tests_data.matching_tests)[0]
      const fetched_test = recommendation_tests_data.matching_tests[fetched_test_code]

      const created_test_code = Object.keys(recommendation_tests_data.created_scenario)[0]
      const created_test = recommendation_tests_data.created_scenario[created_test_code]
      console.log("fetched_test : ", fetched_test, recommendation_tests_data.matching_tests, "created_test : ", created_test)

      appendMessage2(
          `<b >Here are some recommendations for you : </b> <br>
          <button style="margin-top:5px; width:100%; padding:6px 4px; border: 1px solid lightgray; border-radius: 4px;" onclick="handleSurpriseMeButtonClick2('${fetched_test_code}','${fetched_test}')">${fetched_test}</button>
          <button style="margin-top:5px; width:100%; padding:6px 4px; border: 1px solid lightgray; border-radius: 4px;" onclick="handleSurpriseMeButtonClick2('${created_test_code}','${created_test}')">${created_test}      (experimental)</button>
          `
          );
      console.log("recommendation_tests_data : ", recommendation_tests_data.matching_tests);
      recommendationClicked = false;
      isFeedbackConvEnd = true;
    } catch (error) {
      console.error(`Error in get recommendation tests: ${error}`);
    }




  }

  function renameKey(obj) {
    let newObj = {}
    for (const key in obj) {
      const oldKey = key
      const newKey = parseInt(oldKey) + 1
      newObj[`${newKey}`] = obj[oldKey];
    }
    console.log(newObj)
    return newObj
  }
  

  const feedbackBotQnAFlow = (flow)=>{
    if (flow === 'up'){
      feedbackBotQuestions = renameKey(feedbackBotQuestions)
      feedbackBotQuestions["1"] = "Why are you giving me a thumbs up today?"

      IsPositiveFeedback = true;
      const queryparams = new URLSearchParams({
                conversation: "",
                bot_id: botId,
                type_of_email: "like_or_dislike",
                user_email: FeedbackUserEmail
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
            
        })
          
      console.log("sent email");
      feedbackBotIndex += 1
      appendMessage2(feedbackBotQuestions[feedbackBotIndex])
      setTimeout(() => {
        appendMessage2(`<button style="margin-top:5px; width:100%; padding:6px 4px; border-radius: 8px; " onclick="handleEndFeedback()">End</button>`)
      }, 200);

    } else if (flow === 'down'){
      feedbackBotIndex += 1
      appendMessage2(feedbackBotQuestions[feedbackBotIndex])
      setTimeout(() => {
        appendMessage2(`<button style="margin-top:5px; width:100%; padding:6px 4px; border-radius: 8px; " onclick="handleEndFeedback()">End</button>`)
      }, 200);
    }

    const gshadowRoot = document.getElementById("chat-element2").shadowRoot;
    const msg = gshadowRoot.getElementById("thumbsup-down");
    // button.parentNode.removeChild(button)
    // const que_msg = document.createElement("div");
    // que_msg.innerHTML = "Thank You"; // You can customize the message here
    // // Replace the button with the "Thank you" message
    // msg.parentNode.replaceChild(que_msg, msg);
    const buttons = msg.querySelectorAll('button');

        // Disable each button
        buttons.forEach(button => {
            button.disabled = true;
        });




  }

    const feedbackBotInitialFlow = async (flow)=>{

      if (flow === 'initial'){
        const anonymous_text = `<div id="anonymous" >
        <b>Want to continue as Anonymous?</b>
            <button style="margin-top:5px; width:100%; padding:6px 4px; border: 1px solid lightgray; border-radius: 4px;" onclick="getUserOrAnonymousDetails('Yes')">Yes</button>
            <button style="margin-top:5px; width:100%; padding:6px 4px; border: 1px solid lightgray; border-radius: 4px;" onclick="getUserOrAnonymousDetails('No')">No</button>
        </div>`;
        appendMessage2(anonymous_text)
      } else if (flow === 'save_email'){
        if (!window.user && FeedbackUserEmail != 'Anonymous User'){
        // const shadowRoot2 = document.getElementById("chat-element2").shadowRoot;
        // FeedbackUserEmail = shadowRoot2.getElementById("feedback-email-input2").value;
        FeedbackUserEmail = emailNameformJsonstt['email']

        // const gshadowRoot = document.getElementById("chat-element2").shadowRoot;
        // const msg = gshadowRoot.getElementById("feedback-email-form");
        // button.parentNode.removeChild(button)
        // const que_msg = document.createElement("div");
        // que_msg.innerHTML = "Thank You"; // You can customize the message here
        // // Replace the button with the "Thank you" message
        // msg.parentNode.replaceChild(que_msg, msg);
       
        }
        feedbackBotIndex = 0
        const div_cont = `<div id="thumbsup-down" >
        
        <b>What do you think of our bot?</b>
            <button style="margin-top:5px; width:100%; padding:6px 4px; border: 1px solid lightgray; border-radius: 4px;" onclick="feedbackBotQnAFlow('up')"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-hand-thumbs-up-fill" viewBox="0 0 16 16">
            <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a10 10 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733q.086.18.138.363c.077.27.113.567.113.856s-.036.586-.113.856c-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.2 3.2 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.8 4.8 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z"/>
          </svg>
          </i></button>
            <button style="margin-top:5px; width:100%; padding:6px 4px; border: 1px solid lightgray; border-radius: 4px;" onclick="feedbackBotQnAFlow('down')"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-hand-thumbs-down-fill" viewBox="0 0 16 16">
            <path d="M6.956 14.534c.065.936.952 1.659 1.908 1.42l.261-.065a1.38 1.38 0 0 0 1.012-.965c.22-.816.533-2.512.062-4.51q.205.03.443.051c.713.065 1.669.071 2.516-.211.518-.173.994-.68 1.2-1.272a1.9 1.9 0 0 0-.234-1.734c.058-.118.103-.242.138-.362.077-.27.113-.568.113-.856 0-.29-.036-.586-.113-.857a2 2 0 0 0-.16-.403c.169-.387.107-.82-.003-1.149a3.2 3.2 0 0 0-.488-.9c.054-.153.076-.313.076-.465a1.86 1.86 0 0 0-.253-.912C13.1.757 12.437.28 11.5.28H8c-.605 0-1.07.08-1.466.217a4.8 4.8 0 0 0-.97.485l-.048.029c-.504.308-.999.61-2.068.723C2.682 1.815 2 2.434 2 3.279v4c0 .851.685 1.433 1.357 1.616.849.232 1.574.787 2.132 1.41.56.626.914 1.28 1.039 1.638.199.575.356 1.54.428 2.591"/>
          </svg>
          </button>
        </div>`;
        return (div_cont)
        
      }



    }
    const getBotDetails2 = async (botId) => {

    try {
      const response = await fetch(`${baseURL2}/accounts/get-bot-details/?bot_id=${botId}`, {
        method: "GET",
        headers: {
          Authorization: `Basic ${createBasicAuthToken2(key2, secret2)}`,
        },
      });

      const botDetails = await response.json();
      console.log("Bot Details : ", botDetails);
      console.log("FAQS => ",botDetails.data.faqs)
      globalBotDetails = botDetails;
      botType = botDetails.data.bot_type;

      if (botType !== 'avatar_bot'){
        botWelcomeMessage = botDetails.data.attributes.heading;
      }else{
        botWelcomeMessage = "Welcome to my Coach Avatar. I have curated some FAQs about my practice. Additionally I am trained to answer other questions that you may have. Don't worry I will be personally looking at the conversation offline and if my Avatar gets something wrong, I will correct it. We all are learning after all!"
      }
      console.log(botType)

      let buttons = ''
      if (botDetails.data.faqs){
        let faqs = Object.keys(botDetails.data.faqs)
        if (faqs.length > 0){
          faqs.forEach(title => {
              buttons += `<button style="margin-top:5px; width:100%; padding:6px 4px; border: 1px solid lightgray; border-radius: 4px;" onclick="handleFaqButtonClick('${title}')">${title}</button>`
          })
        }
      }

      buttons += `<button style="margin-top:5px; width:100%; padding:6px 4px; border: 1px solid lightgray; border-radius: 4px;" onclick="handleFaqButtonClick('recommendations')">Recommendations</button>`
      if(botDetails.data.fitment_qna && botDetails.data.is_fitment_analysis && botDetails.data.coaching_for_fitment === "anyone"){
      buttons += `<button style="margin-top:5px; width:100%; padding:6px 4px; border: 1px solid lightgray; border-radius: 4px;" onclick="handleFaqButtonClick('fitness_analysis')">Fitment Analysis</button>`
      }
      buttons += `<button style="margin-top:5px; width:100%; padding:6px 4px; border: 1px solid lightgray; border-radius: 4px;" onclick="handleFaqButtonClick('something_else')">Begin session..</button>`

      console.log("buttons : ",buttons)

      faqHtmlData = `<div id="option-button-container" >
                      ${buttons}
                      </div>`
      // sending welcome msg
      appendMessage2(`<p><b>${botWelcomeMessage}</b></p>`)

      if(botType != 'feedback_bot'){
        fitmentAnalysisQuestions = botDetails.data.fitment_qna
        fitmentAnalysisOptions = botDetails.data.fitment_options
        botInitialQuestions = botDetails.data.initial_qna
        isFitmentAllowed = botDetails.data.is_fitment_analysis;
        isStrictFitment = botDetails.data.is_strict_fitment;
        isBotAudioResponse = botDetails.data.is_audio_response;
        CoachingForFitment = botDetails.data.coaching_for_fitment;
        appendMessage2(faqHtmlData)
      } else{
        feedbackBotInitialFlow('initial')
        feedbackBotQuestions = botDetails.data.feedback_qna;
      }


    //   appendMessage2('jiks')
    //   const faqs = botDetails.faq;
      return botDetails;
    } catch (error) {
      console.error(`Error in getBotDetails: ${error}`);
    }
  };
  

 
const handleFitmentAnalysis = async ()=> {
  console.log(fitmentAnalysisIndex,Object.keys(fitmentAnalysisQuestions).length)
  if( fitmentAnalysisIndex <  Object.keys(fitmentAnalysisQuestions).length ) {
    // console.log("Answer : ",latestMessage)
    // console.log("fitment question : ", fitmentAnalysisQuestions[fitmentAnalysisIndex])
    // signals.onResponse({
    //     html: fitmentAnalysisQuestions[fitmentAnalysisIndex],
    // });
    // console.log("fitmentQuestions : ",fitmentAnalysisQuestions)
    
    gShadowRoot2 = document.getElementById("chat-element2").shadowRoot;
    const responseValue = gShadowRoot2.querySelector(
      'input[name="fitment_option"]:checked'
    ).getAttribute("value");
    console.log(responseValue)

    let fitmentQueIndex = parseInt(gShadowRoot2.getElementById("question-fitment").getAttribute("value"));
    fitmentAnalysisQnA[fitmentQueIndex] = {
      "coach": fitmentAnalysisQuestions[fitmentQueIndex],
      "cochee": responseValue
    }
    fitmentQueIndex = fitmentQueIndex + 1;
    const questiontext = fitmentAnalysisQuestions[fitmentQueIndex]
    const questionoptins = fitmentAnalysisOptions[fitmentQueIndex]
    let optioncont = ''
    questionoptins.forEach((item,index) =>{
      optioncont += `<div style="display: flex; flex-direction: row; align-items: flex-start;">
      <input type="radio" id="option${index}" name="fitment_option" value="${item}" style="margin-right: 5px;">
      <label for="option${index}" style="font-size: 14px; margin-bottom: 10px; display: block;">${item}</label>
    </div>`
    })
    formRadio = `
                <div id='question-fitment' style="font-size: 16px; margin-bottom: 20px; color: #333;" value="${fitmentQueIndex}"><b>Q. </b>${questiontext}</div>
                <div style="display: flex; flex-direction: row; justify-contents: space-around; gap: 8px; flex-wrap: wrap;">
                  ${optioncont}
                </div>
                <button id="submit-btn" onclick="handleFitmentAnalysis()" style="margin-top: 15px; padding: 10px 15px; width: 100%; border: 1px solid #1984ff; border-radius: 5px; color: white; background-color: #1984ff; cursor: pointer; font-size: 16px;">Submit</button>
              `;
    // appendMessage2(formRadio)
    gShadowRoot2.getElementById(`fitment-analysis`).innerHTML =
      formRadio;
    fitmentAnalysisIndex = fitmentQueIndex;
    return;
  } else {
    gShadowRoot2 = document.getElementById("chat-element2").shadowRoot;
    const responseValue = gShadowRoot2.querySelector(
      'input[name="fitment_option"]:checked'
    ).getAttribute("value");

    let fitmentQueIndex = parseInt(gShadowRoot2.getElementById("question-fitment").getAttribute("value"));
    fitmentAnalysisQnA[fitmentQueIndex] = {
      "coach": fitmentAnalysisQuestions[fitmentQueIndex],
      "cochee": responseValue
    }

    fitmentAnalysisInProgress = false;
    fitmentAnalysisIndex = 0;
    console.log("fitmentAnalysisQnA : ", fitmentAnalysisQnA)
    gShadowRoot2.getElementById(`fitment-analysis`).innerHTML = "<b>Please Wait...</b>"
    
    
    console.log(userId2,participantId2)
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
              fitness_analysis_data: JSON.stringify(fitmentAnalysisQnA),
            }),
          }
        );

        const data = await response.json();
        console.log("Fitness Analysis Score => ", data); 
        const msg = gShadowRoot2.getElementById('fitment-analysis')
        // button.parentNode.removeChild(button)
        const que_msg = document.createElement("div");
        que_msg.innerHTML = `<b>Fitness Analysis Result:</b>   <p>${data.score}</p>`; // You can customize the message here
        // Replace the button with the "Thank you" message
        msg.parentNode.replaceChild(que_msg, msg);
        

        // setTimeout(() => {
        //   appendMessage2(faqHtmlData);
        // }, 200);
         
        } catch (err) {
            appendMessage2(`<b style='font-size: 14px;color: #991b1b;'>Error while calculating Fitment score</b>`,
            )
        }
   
    
    return;
}
    // fitmentAnalysisQuestions = fitment_analysis[type]
    
    

}

async function handleFaqButtonClick(question) {
  
  optedBeginSession = false;
  if( question == 'fitness_analysis') {
    // console.log("question clicked : ",question, globalBotDetails.data.faqs[question])
    // console.log("fitness analysis clicked :",fitment_analysis[])
    // let buttons = '';
    // buttons += `<button style="margin-top:5px; width:100%; padding:6px 4px; border: 1px solid lightgray; border-radius: 4px;" onclick="handleFitmentAnalysis('coaching_intake')">Coachig Intake</button>`
    // buttons += `<button style="margin-top:5px; width:100%; padding:6px 4px; border: 1px solid lightgray; border-radius: 4px;" onclick="handleFitmentAnalysis('mentoring_intake')">Mentoring Intake</button>`
    // appendMessage2(buttons);
    // handleFitmentAnalysis()
    fitmentAnalysisInProgress = true;
    fitmentAnalysisIndex = 1;
    console.log(fitmentAnalysisQuestions,fitmentAnalysisIndex)
    const questiontext = fitmentAnalysisQuestions[fitmentAnalysisIndex]
    const questionoptins = fitmentAnalysisOptions[fitmentAnalysisIndex]
    let optioncont = ''
    questionoptins.forEach((item,index) =>{
      optioncont += `<div style="display: flex; flex-direction: row; align-items: flex-start;">
      <input type="radio" id="option${index}" name="fitment_option" value="${item}" style="margin-right: 5px;">
      <label for="option${index}" style="font-size: 14px; margin-bottom: 10px; display: block;">${item}</label>
    </div>`
    })
    formRadio = `
              <div id='fitment-analysis' style="box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); padding: 20px; max-width: 100%; width: 100%; box-sizing: border-box;">
              <div id='question-fitment' style="font-size: 16px; margin-bottom: 20px; color: #333;" value="${fitmentAnalysisIndex}"><b>Q. </b>${questiontext}</div>
                <div style="display: flex; flex-direction: row; justify-contents: space-around; gap: 8px; flex-wrap: wrap;">
                  ${optioncont}
                </div>
                <button id="submit-btn" onclick="handleFitmentAnalysis()" style="margin-top: 15px; padding: 10px 15px; width: 100%; border: 1px solid #1984ff; border-radius: 5px; color: white; background-color: #1984ff; cursor: pointer; font-size: 16px;">Submit</button>
              </div>`;

    appendMessage2(formRadio)
    

  } else {
    if( question == 'something_else') {
        // appendMessage2('Please ask your question in chat box')
        if(isAskingInitialQuestions){
          return;
        }
        botInitialQuestionsIndex=1;
        optedBeginSession = true;
        if (botType === 'avatar_bot'){
          await getFitmentScore(userId2)
          console.log(isBeginSessionProceed)
          
          if (!isBeginSessionProceed && isFitmentAllowed && isStrictFitment && CoachingForFitment === 'anyone'){
            appendMessage2("Your fitment score is low or has not been attempted. Please proceed with this in mind.")
            }
        }
        console.log(botType)
        if(botType === "subject_matter_bot"){
          appendMessage2("Please provide context to start conversaton.")
          return;
        }

        isAskingInitialQuestions = true;
        appendMessage2(botInitialQuestions[botInitialQuestionsIndex]);
        return;
    }
    if( question == 'recommendations') {
      if (botType === 'avatar_bot'){
        appendMessage2('Please provide a context for recommendations in the chatbox')

      } else{
        const resp = await fetch(`${baseURL2}/tests/get-tests-by-bot/?bot_id=${botId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Basic ${createBasicAuthToken2(key2, secret2)}`,
            "Content-Type": "application/json",
          },
        })
        let buttons = ""
        const respjson = await resp.json()
        console.log(respjson,"bot_test_data")
        
        if (Object.keys(respjson).length > 0){
          respjson.forEach(element => {
            buttons += `<button style="margin-top:5px; width:100%; padding:6px 4px; border: 1px solid lightgray; border-radius: 4px;" onclick="handleSurpriseMeButtonClick2('${element.test_code}','${element.title.replaceAll("'","")}')">${element.title}</button>`
          });
          appendMessage2(`<b >Here are some recommendations for you : </b> <br> ${buttons}`)

          appendMessage2('If you want to try other scenarios please provide a context for recommendations in the chatbox')
        } else{
          appendMessage2('Please provide a context for recommendations in the chatbox')

        }
      }
        recommendationClicked = true;
        return;
    }
    appendMessage2(globalBotDetails.data.faqs[question])
    // appendMessage2(faqHtmlData)
  }
  
}


function sendBotTranscript2() {
  const shadowRoot2 = document.getElementById("chat-element2").shadowRoot;

  let userEmail = "";
  if (!window.user) {
    // userEmail = shadowRoot2.getElementById("input-email2").value;
    userEmail = emailNameformJsonstt['email']
  } else {
    userEmail = window.user.email;
  }
    console.log("User email : ", userEmail);

   
    queryParams2 = new URLSearchParams({
      participant_id: participantId2,
      email: userEmail,
    });
  
  fetch(
    `${baseURL2}/test-attempt-sessions/set-name-and-email/?${queryParams2}`,
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
      credsUpdated2 = data.status;
      console.log("name email updated, sending email");

      const queryParamsEmail2 = new URLSearchParams({
        submitted_email: userEmail,
        test_attempt_session_id: sessionId2,
    });

    fetch(
      `${baseURL2}/test-attempt-sessions/send-bot-transcript-email/?${queryParamsEmail2}`,
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
          
          // appendMessage2(faqHtmlData)
          
          // console.log(data.options_data)
          // questionText2 = data.options_data.next_situation;
          // newOption1NameStt = data.options_data.option_a;
          // newOption2NameStt = data.options_data.option_b;
          // newOption1TextStt = data.options_data.option_a;
          // newOption2TextStt = data.options_data.option_b;
          // // qUid = data.options_data.next_situation;
          // qUid = globalQuestionDataStt.results[0].questions[mcqQustionIndexStt].uid;
      })

    })

  return;
}

function handleEndConversation() {
  console.log("end conversation clicked");
  appendMessage2(
    "<b>Thanks for interacting with me. Have a great day!</b>"
  );

  isSessionActiveStt = false;
  optedBeginSession = false;

  let emailForm;
  if(window.innerWidth > 768) {
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
  if( ! window.user){
  // appendMessage2(emailForm);
  isEmailFormstt = true
  formFieldsstt = ['email']
  appendMessage2(`<b>Please enter your ${formFieldsstt[0]}</b>`)
  }
  else {
    sendBotTranscript2()
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
  let parts = questionText.split(':');
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
    isEmailFormstt = true
    formFieldsstt = ['name', 'email']
    appendMessage2(`<b>Please enter your ${formFieldsstt[0]}</b>`)
  }
};

function createMessageNode2(message) {
  const messageNode = document.createElement("div");
  messageNode.classList.add("inner-message-container");

  const messageBubble = document.createElement("div");
  messageBubble.classList.add("message-bubble", "ai-message-text");
  messageBubble.style.maxWidth = "80%";
  messageBubble.style.marginTop = "4px";
  const messageText = document.createElement("p");
  messageText.innerHTML = message;

  messageBubble.appendChild(messageText);
  messageNode.appendChild(messageBubble);

  return messageNode;
}

function appendMessage2(message2) {
  gShadowRoot2 = document.getElementById("chat-element2").shadowRoot;
  const messageNode = createMessageNode2(message2);
  gShadowRoot2.getElementById("messages").appendChild(messageNode);
  gShadowRoot2.getElementById("messages").scrollBy(0, 500);
}

function deleteAndReplaceContainerStt(old,new_cont){
  const gshadowRoot =
            document.getElementById("chat-element2").shadowRoot;
  const msg = gshadowRoot.getElementById(`${old}`)
  // button.parentNode.removeChild(button)
  const que_msg = document.createElement("div");
  que_msg.innerHTML = `${new_cont}`; // You can customize the message here
  // Replace the button with the "Thank you" message
  msg.parentNode.replaceChild(que_msg, msg);
}

//image hover handlers - start
function showTooltipStt(content, event, tooltipIdStt,imageMapNameStt) {
  // console.log(tooltipIdStt)
  const shadowRootStt =
  document.getElementById("chat-element2").shadowRoot;
  const tooltipStt =
    shadowRootStt.getElementById(tooltipIdStt);
  tooltipStt.innerHTML = content;
  updateTooltipPositionStt(event, imageMapNameStt, tooltipIdStt);
  tooltipStt.style.display = "block";
  }

function updateTooltipPositionStt(event, imageMapNameStt, tooltipIdStt) {
  // console.log('update',tooltipIdStt)

  const shadowRootStt =
    document.getElementById("chat-element2").shadowRoot;
  const tooltipStt =
    shadowRootStt.getElementById(tooltipIdStt);

  const mouseX = event.clientX + window.pageXOffset;
  const mouseY = event.clientY + window.pageYOffset;

  if (window.innerWidth > 760) {
    tooltipStt.style.left = event.clientX - 120 + "px" // mouseX - 120 + "px" //event.clientX //  // + xOffset - 120 + "px";
    tooltipStt.style.top = event.clientY - 80  + "px" //mouseY - 80 + "px" //event.clientY // //+ yOffset - 170 + "px";
  } else {
    tooltipStt.style.left = event.clientX - 90 + "px" 
    tooltipStt.style.top = event.clientY - 180  + "px" 
  }
}

function hideTooltipStt(tooltipIdStt) {
  // console.log('hide',tooltipIdStt)

  const shadowRootStt =
  document.getElementById("chat-element2").shadowRoot;
const tooltipStt =
  shadowRootStt.getElementById(tooltipIdStt);
  // console.log(tooltipStt)
  tooltipStt.style.display = "none";
}
//image hover handlers - end

const setHoverPointsStt = (coordsStt, imageIdStt, imageMapNameStt, tooltipIdStt) => {
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
overlayElementStt.setAttribute(
  "class",
  "image-overlayStt"
);
shadowRootForImageStt.appendChild(overlayElementStt);

// -tooltip
const tooltipELementStt = document.createElement("div");
tooltipELementStt.setAttribute("id", tooltipIdStt);
tooltipELementStt.setAttribute(
  "class",
  "custom-tooltipStt"
);
tooltipELementStt.style.position = "absolute";
tooltipELementStt.style.backgroundColor = "#333";
tooltipELementStt.style.color = "#fff";
tooltipELementStt.style.padding = "5px";
tooltipELementStt.style.borderRadius = "5px";
tooltipELementStt.style.display = "none";
shadowRootForImageStt.appendChild(tooltipELementStt);


coordsStt.map((item) => {
  console.log(item)
  let coord;
  if(window.innerWidth < 768){
    coord = item.coord
    .split("|")[1].replace(/\./g, ',').split(",");
  } else {
    coord = item.coord.split("|")[0].replace(/\./g, ',').split(",")
  }

  const areaElementStt = document.createElement("area");
  areaElementStt.setAttribute("coords", coord);
  areaElementStt.setAttribute("shape", "rect");
  // areaElementStt.setAttribute("title", item.title);

  // console.log(areaElementStt.addEventListener())

  mapElementStt.appendChild(areaElementStt);

  areaElementStt.addEventListener(
    "mouseover",
    (event) => {
      showTooltipStt(item.title, event, tooltipIdStt,imageMapNameStt);
    }
  );

  areaElementStt.addEventListener(
    "mousemove",
    (event) => {
      updateTooltipPositionStt(event, imageMapNameStt, tooltipIdStt);
    }
  );

  areaElementStt.addEventListener("mouseout", () => {
    hideTooltipStt(tooltipIdStt);
  });
});
}

// to reset all variables
const resetAllVariablesStt = async () => {
  //* reset all variables : start

  isAttemptingRecommendation = false;
  responsesDone2 = false;
  questionIndex2 = 0;

  userResponses2 = [];
  DuplicateResponseCount2 = 0;
  console.log("resetingvariables")
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

  console.log("resetting variables completed")
};

function  increaseActionPointStt(user_id,field_name){

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
      console.log(`increased.`,data);
    })
    .catch((err) => console.log("increaseActionPointStt Error",err));
  
 

}
async function  getFitmentScore(user_id){
  try{
    console.log(`user_id : ${user_id}, bot_id: ${botId}`)
    const resp = await fetch(
      `${baseURL2}/test-attempt-sessions/get-fitment-analysis-by-user/?user_id=${user_id}&bot_id=${botId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Basic ${createBasicAuthToken2(key2, secret2)}`,
          "Content-Type": "application/json",
        },
      }
    )
    const jsonresp =  await resp.json()
    console.log(`fitment_score_data`,jsonresp);
    previousFitmentJson = jsonresp;
    isBeginSessionProceed = jsonresp['proceed']

  } catch(err){console.log("getFitmentScore Error",err)}
  
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
  if (choice == 'Yes'){
      isProceedStt = 'true'
      const gshadowRoot =
                document.getElementById("chat-element2").shadowRoot;
      const msg = gshadowRoot.getElementById('proceed-option2')
      // button.parentNode.removeChild(button)
      const que_msg = document.createElement("div");
      que_msg.innerHTML = "Please Wait..."; // You can customize the message here
      // Replace the button with the "Thank you" message
      msg.parentNode.replaceChild(que_msg, msg);
            
      if (questionMediaLinkStt && (testType2 != 'mcq' &&  testType2 != 'dynamic_mcq')) {
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
          
          if (embeddingUrl){
              appendMessage2(`▪ Media <br>  <iframe
                            allow="autoplay; encrypted-media; fullscreen;"
                            style="width: 100%; border-radius: 8px; min-height: 50vh; min-width: 50vw;"
                            src=${embeddingUrl}
                            frameborder="0"
                            allowfullscreen
                          >
                    `)
            }

          const urlList = questionMediaLinkStt.split(',')
          console.log("list",urlList)
          if (urlList.length > 1){
            urlList.forEach(element => {
              element = element.trim()
              if (element.includes('docs.google.com')){
                let url = element.split('edit?')[0] + 'embed?start=true&loop=true&delayms=3000'
                console.log(url)
                appendMessage2(`<iframe src=${url}
                                frameborder="0" 
                                style="width: 100%; border-radius: 8px; min-height: 50vh; min-width: 50vw;"
                                allowfullscreen="true" 
                                mozallowfullscreen="true" 
                                webkitallowfullscreen="true"
                                ></iframe>`)
              }
              else{
                console.log(element)
                
                appendMessage2(`<div ><audio style="${window.innerWidth < 600 ? "width: 200px; max-width: 200px !important;" : " min-width: 50vw !important;"}" controls autoplay>
                <source src=${element} type="audio/mpeg" />
                Your browser does not support the audio element.
                </audio></div>`)
              }
            });
          }else {
            if (questionMediaLinkStt.includes('docs.google.com')){
              let url = questionMediaLinkStt.split('edit?')[0] + 'embed?start=true&loop=true&delayms=3000'
              console.log(url)
              appendMessage2(`<iframe src=${url}
                              frameborder="0" 
                              style="width: 100%; border-radius: 8px; min-height: 50vh; min-width: 50vw;" 
                              allowfullscreen="true" 
                              mozallowfullscreen="true" 
                              webkitallowfullscreen="true"
                              ></iframe>`)
            }else if (questionMediaLinkStt.includes('guidejar.com')){
              const guidejarId = questionMediaLinkStt.split('/').pop()
              appendMessage2(`
              <div style="width:640px">
              <div style="position:relative;height:0;width:100%;overflow:hidden;box-sizing:border-box;padding-bottom:calc(100% - 0px)">
              <iframe src="https://www.guidejar.com/embed/${guidejarId}?type=1&controls=off" width="100%" height="100%" style="position:absolute;inset:0" allowfullscreen frameborder="0"></iframe
              ></div></div>
              `)
            }
          }
        }
        
        if (initialQuestionTextStt){
          const linkPattern = /(http[s]?:\/\/[^\s]+)/;
          const is_link = linkPattern.test(initialQuestionTextStt);
          if (!is_link){
            let strList = initialQuestionTextStt.replaceAll("*","")
        
            strList = strList.split(":",2)
            let responderName;
            if (strList.length >1){
              initialQuestionTextStt = strList[1]
              responderName = strList[0]
            }
            if(isImmersiveStt){
              console.log(initialQuestionTextStt)
              let queText = initialQuestionTextStt
              const queDiv = `<p>${queText}</p><br>`
              const urltts = `${baseURL2}/test-responses/get-text-to-speech/?text=${initialQuestionTextStt}`
              const response = await fetch(urltts, {
                method: "GET",
                headers: {
                  Authorization: `Basic ${createBasicAuthToken2(key2, secret2)}`,
                },
              });
        
              const blob = await response.blob();
              console.log('respnse', blob);
        
              const objectUrl = URL.createObjectURL(blob);
              
              console.log(objectUrl,'url')

                initialQuestionTextStt = queDiv + `<div ><audio style="${window.innerWidth < 600 ? "width: 200px; max-width: 200px !important;" : " min-width: 50vw !important;"}" controls autoplay>
              <source src=${objectUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
              </audio></div>`
              
              console.log(initialQuestionTextStt)

            }
            console.log("last",initialQuestionTextStt)
            if (responderName){
              initialQuestionTextStt = `<b>${responderName}:</b><br>` +`${initialQuestionTextStt}`
              
            }

            appendMessage2(initialQuestionTextStt)
          }
        }
      } else{
        if(!questionMediaLinkStt && testType2 != "orchestrated_conversation" && (testType2 != 'mcq' && testType2 != "dynamic_mcq") && senarioCase2 != "process_training" ){
          let responderName;
          
          if (testType2 === 'dynamic_discussion_thread'){
            if (initialQuestionTextStt.includes(":")){
              initialQuestionTextStt = initialQuestionTextStt.replace(/<\/?p>/g, '');
              const strList = initialQuestionTextStt.split(":",2)
              responderName = `<b>${strList[0]}:</b><br>`
              initialQuestionTextStt = strList[1]
            } else{
              responderName = `<b>System:</b><br>`

            }
          } else{
            let strLIst = initialQuestionTextStt.replaceAll("*","").split(":",2)
            if(strLIst.length>1){
              initialQuestionTextStt = strLIst[1]
              responderName = `<b>${strLIst[0]}:</b><br>`
            }
          }
          if(isImmersiveStt){
            const queText = initialQuestionTextStt
            const queDiv = `<p>${queText}</p><br>`
            console.log('dyna',initialQuestionTextStt)
            const url = `${baseURL2}/test-responses/get-text-to-speech/?text=${initialQuestionTextStt}`
            const response = await fetch(url, {
              method: "GET",
              headers: {
                Authorization: `Basic ${createBasicAuthToken2(key2, secret2)}`,
              },
            });
      
            const blob = await response.blob();
            console.log('respnse', blob);
      
            const objectUrl = URL.createObjectURL(blob);
            
            console.log(objectUrl,'url')
            initialQuestionTextStt = queDiv + `<div ><audio style="${window.innerWidth < 600 ? "width: 200px; max-width: 200px !important;" : " min-width: 50vw !important;"}" controls autoplay>
            <source src=${objectUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
            </audio></div>`
          }

          if (responderName){
            initialQuestionTextStt = responderName + initialQuestionTextStt
          }

          appendMessage2(initialQuestionTextStt)
          
        } else if (testType2 === "orchestrated_conversation"){
          const regex = /<p>(.*?)<\/p>/g;

          // Extracting text between <p> and </p> tags
          const matches = Array.from(initialQuestionTextStt.matchAll(regex), match => match[1].trim());

          console.log('matches',matches)
          // Separating each extracted text by ":"
          const separatedText = matches.map(match => match.split(':',2));
          console.log('speratedTExt',separatedText)

          // Displaying the separated text
          if (isImmersiveStt){
            const audioPromises = separatedText.map(async entry => {

              const responderName = `<b>${entry[0]}:</b><br>`
              console.log(entry)
              let queText = entry[1]
              const queDiv = `<p>${queText}</p><br>`
              const url = `${baseURL2}/test-responses/get-text-to-speech/?text=${entry[1]}`

              const response = await fetch(url, {
              method: "GET",
              headers: {
                Authorization: `Basic ${createBasicAuthToken2(key2, secret2)}`,
              },
              });
      
              const blob = await response.blob();
              console.log('respnse', blob);
        
              const objectUrl = URL.createObjectURL(blob);
              
              console.log(objectUrl,'url')
              let audioCont = queDiv + `<div ><audio style="${window.innerWidth < 600 ? "width: 200px; max-width: 200px !important;" : " min-width: 50vw !important;"}" controls>
              <source src=${objectUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
              </audio></div>`
              if (responderName){
                audioCont = responderName + audioCont
              }

              return audioCont;
              });

            console.log(audioPromises,'audioPromises')

            const audioContents = await Promise.all(audioPromises);

            audioContents.forEach(content => {
                appendMessage2(content);
            });
          } else{
            separatedText.forEach(entry => {
              const container = `<b>${entry[0]}:</b><br>` + `<p>${entry[1]}</P`
              appendMessage2(container)

            })


          }

        }else if(mediaPropsStt && Object.keys(mediaPropsStt).includes(`que_image ${initialIndexStt}`)){
          const questionpropName = `que_image ${initialIndexStt}`

          const url = Object.keys(mediaPropsStt[questionpropName])[0];
          let narration;
          let coords = []
          const coordAndTitleNarrationList = mediaPropsStt[questionpropName][url];

          coordAndTitleNarrationList.forEach(element =>{
            if (typeof element === 'string'){
              narration = element
            } else{
              coords.push(element)
            }
          })

          const testImage = {
            image: url,
            coords: coords,
            narration: narration
          }
          console.log(testImage)
          const imageUrlStt = testImage.image
          const coordsStt = testImage.coords
          const narrationStt = testImage.narration

          const urltts = `${baseURL2}/test-responses/get-text-to-speech/?text=${narrationStt}`
          const response = await fetch(urltts, {
            method: "GET",
            headers: {
              Authorization: `Basic ${createBasicAuthToken2(key2, secret2)}`,
            },
          });
    
          const blob = await response.blob();
          console.log('respnse', blob);
    
          const objectUrl = URL.createObjectURL(blob);
          
          console.log(objectUrl,'url')
          const ttsNarration = `<div ><audio style="${window.innerWidth < 600 ? "width: 200px; max-width: 200px !important;" : " min-width: 50vw !important;"}"" controls autoplay>
          <source src=${objectUrl} type="audio/mpeg" />
          Your browser does not support the audio element.
          </audio></div>`
          const imageIdStt = `mediaImageStt${initialIndexStt}`
          const imageMapNameStt = `image-mapStt${initialIndexStt}`
          const imageTooltipIdStt = `tooltip-stt${initialIndexStt}`

             
          appendMessage2(`▪  ${ttsNarration}<br><br>
                          ▪ <img src=${imageUrlStt} ${window.innerWidth < 768 ? "width='200'" : "width='400'" } usemap="#${imageMapNameStt}" id=${imageIdStt} style="border-radius: 8px; margin-top: 4px;" /> <br><br>
                          ▪ Question : <br> ${initialQuestionTextStt}`)
          setHoverPointsStt(coordsStt, imageIdStt, imageMapNameStt,imageTooltipIdStt)
          console.log("IMAGE MAPPED WITH COORDS")

          // questionText2 = questionText2 + imageDiv 
        }else{

          if (testType2 != 'mcq' && testType2 != "dynamic_mcq"){
            let strList = initialQuestionTextStt.replaceAll("*","")
          strList = strList.split(":",2)
          if (strList.length >1){
            initialQuestionTextStt = strList[1]
            initialQuestionTextStt = `<b>${strList[0]}:</b><br>` +`<p>${initialQuestionTextStt}</p>`
          }}
          appendMessage2(initialQuestionTextStt)
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
    if( testType2 === "dynamic_mcq") {

      gShadowRoot2.getElementById(`mcq-option-stt-${mcqFormIdStt}`).innerHTML = 'Processing ...'
      console.log(questionText2,'q')
        queryParams2 = new URLSearchParams({
            description: senarioDescription2,
            situation: mcqQustionIndexStt == 1 ? globalQuestionDataStt.results[0].questions[mcqQustionIndexStt - 1].question : questionText2,
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
            console.log(data.options_data)
            questionText2 = data.options_data.next_situation;
            newOption1NameStt = data.options_data.option_a;
            newOption2NameStt = data.options_data.option_b;
            newOption1TextStt = data.options_data.option_a;
            newOption2TextStt = data.options_data.option_b;
            // qUid = data.options_data.next_situation;
            qUid = globalQuestionDataStt.results[0].questions[mcqQustionIndexStt].uid;
        })

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
    if (mediaPropsStt && mediaPropsStt[`question_image ${responseOptionStt}`]){
      queImageData = [mediaPropsStt[`question_image ${responseOptionStt}`],mediaPropsStt[`question_image_mobile ${responseOptionStt}`]]
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

        if (embeddingUrl){
        questionText2 = `▪ Media <br>  <iframe
                        allow="autoplay; encrypted-media; fullscreen;"
                        style="width: 100%; border-radius: 8px; min-height: 50vh; min-width: 50vw;"
                        src=${embeddingUrl}
                        frameborder="0"
                        allowfullscreen
                      >
        `;
        }
        const urlList = questionMedia.split(',')
        console.log("list",urlList)
        if (urlList.length > 1){
          urlList.forEach(element => {
            element = element.trim()
            if (element.includes('docs.google.com')){
              let url = element.split('edit?')[0] + 'embed?start=true&loop=true&delayms=3000'
              console.log(url,"googelsheet")
              questionText2 = questionText2 + '\n' +(`<iframe src=${url}
                              frameborder="0" 
                              style="width: 100%; border-radius: 8px; min-height: 50vh; min-width: 50vw;"
                              allowfullscreen="true" 
                              mozallowfullscreen="true" 
                              webkitallowfullscreen="true"
                              ></iframe>`)
            }
            else{
              console.log('audio',element)
              questionText2 = questionText2 + '\n' +(`<div ><audio style="${window.innerWidth < 600 ? "width: 200px; max-width: 200px !important;" : " min-width: 50vw !important;"}" controls autoplay>
              <source src=${element} type="audio/mpeg" />
              Your browser does not support the audio element.
              </audio></div>`)
            }
          });
        }else {
          if (questionMedia.includes('docs.google.com')){
            let url = questionMedia.split('edit?')[0] + 'embed?start=true&loop=true&delayms=3000'
            console.log(url,'google')
            if(isImmersiveStt){
              questionText2 = questionText2.replaceAll(":","")
              console.log('first', questionText2)

              
              const urltts = `${baseURL2}/test-responses/get-text-to-speech/?text=${questionText2}`
              const response = await fetch(urltts, {
                method: "GET",
                headers: {
                  Authorization: `Basic ${createBasicAuthToken2(key2, secret2)}`,
                },
              });
        
              const blob = await response.blob();
              console.log('respnse', blob);
        
              const objectUrl = URL.createObjectURL(blob);
              
              console.log(objectUrl,'url')
              questionText2 = `<div ><audio style="${window.innerWidth < 600 ? "width: 200px; max-width: 200px !important;" : " min-width: 50vw !important;"}" controls autoplay>
              <source src=${objectUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
              </audio></div>`
              console.log(questionText2)

            }
            questionText2 = questionText2 +(`<iframe src=${url}
                            frameborder="0" 
                            style="width: 100%; border-radius: 8px; min-height: 50vh; min-width: 50vw;" 
                            allowfullscreen="true" 
                            mozallowfullscreen="true" 
                            webkitallowfullscreen="true"
                            ></iframe>`)
          }
        }
        }
      }
    
      if(isImmersiveStt && !questionMedia){
        questionText2 = questionText2.replaceAll(":","")
        console.log('first', questionText2)

        
        const urltts = `${baseURL2}/test-responses/get-text-to-speech/?text=${questionText2}`
        const response = await fetch(urltts, {
          method: "GET",
          headers: {
            Authorization: `Basic ${createBasicAuthToken2(key2, secret2)}`,
          },
        });
  
        const blob = await response.blob();
        console.log('respnse', blob);
  
        const objectUrl = URL.createObjectURL(blob);
        
        console.log(objectUrl,'url')
        questionText2 = `<div ><audio style="${window.innerWidth < 600 ? "width: 200px; max-width: 200px !important;" : " min-width: 50vw !important;"}" controls autoplay>
        <source src=${objectUrl} type="audio/mpeg" />
        Your browser does not support the audio element.
        </audio></div>`
        console.log(questionText2)

        
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
    ).innerHTML = `<b>That's it! Thank you for participating in the  interaction.</b>`;

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
      if (testType2 === "mcq" || testType2 === 'dynamic_mcq') {
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
        "<p style='font-size: 14px;color: #991b1b;'><b>Unfortunately due to technical reasons, your earlier response could not be processed. The session will be terminated. Please try again.</b>.</p>"
      );

      return;
    }

    if (!window.user) {
      console.log("user not logged in, so asking for credentials");
      // gShadowRoot2.getElementById(`mcq-option-stt-${mcqFormIdStt}`).innerHTML =
      //   credentialsForm2;
      isEmailFormstt = true
      formFieldsstt = ['name', 'email']
      appendMessage2(`<b>Please enter your ${formFieldsstt[0]}</b>`)
      
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

async function proceedFormFlowStt(msg){
  if (formFieldsstt.length > 0){
    isEmailFormstt = true
    const filedname = formFieldsstt[0]
    formFieldsstt = formFieldsstt.slice(1);
    emailNameformJsonstt[filedname] = msg
    
  }
}
function sendEmail2(session_id,reportUrl) {
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
    inputEmail2 = emailNameformJsonstt['email']
    inputName2 = emailNameformJsonstt['name']

    queryParams2 = new URLSearchParams({
      participant_id: participantId2,
      email: inputEmail2,
      name: inputName2,
    });
  } else {
    queryParams2 = new URLSearchParams({
      participant_id: participantId2,
      email: window.user.email,
      name: window.user.given_name,
    });
  }
  await fetch(
    `${baseURL2}/test-attempt-sessions/set-name-and-email/?${queryParams2}`,
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
      credsUpdated2 = data.status;
      console.log("name email updated, sending email");
      sendEmail2(sessionId2,globalReportUrl2);
      increaseActionPointStt(userId2,'interaction_attempted')
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
      const recommDiv = findRelatedItemsStt(recommendationsDataStt, testCode2);
      if (recommDiv) {
        appendMessage2(recommDiv);
      }

      resetAllVariablesStt();
    })
    .catch((err) => {
      console.log(err);
    });
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

function handleSurpriseMeButtonClick2(recommendation_code, recommendation_title) {
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
  console.log("surprise me! button clicked", "recommendation code : ", recommendation_code, "recommendation title : ", recommendation_title);

  let tempTestTitle = ""

  if( recommendation_code == undefined || recommendation_code == null || recommendation_code == ""){
    const randomIndex2 = Math.floor(Math.random() * challenges2.length);
    const randomChallenge2 = challenges2[randomIndex2];

    //   console.log(randomChallenge);
    //   testCode = randomChallenge.test_code;
    //   codeAvailabilityUserChoice = true;
    console.log("random challenge :==>", randomChallenge2);
    testCode2 = randomChallenge2.trim();

    gShadowRoot2 = document.getElementById("chat-element2").shadowRoot;
    // gShadowRoot2.getElementById("surprise-button").disabled = true;

    // removing button
    const msg = gShadowRoot2.getElementById("surprise-button");
    // button.parentNode.removeChild(button)
    const que_msg = document.createElement("div");
    que_msg.innerHTML = "Please Wait..."; // You can customize the message here
    // Replace the button with the "Thank you" message
    msg.parentNode.replaceChild(que_msg, msg);
    tempTestTitle = sampleTestCodesStt[randomChallenge2]
  } else {
    console.log("handling recommendation in surprise me")
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
    gShadowRoot2.getElementById("text-input").textContent =
      tempTestTitle;
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

//* Function to handle button click for no-code flow : start
async function handleOptionButtonClick2(labelText, area, information) {
  console.log("button clicked in stt", labelText, area, information);
  optedNo = true;

  gShadowRoot2 = document.getElementById("chat-element2").shadowRoot;
  gShadowRoot2.getElementById("text-input").focus();
  setTimeout(() => {
    gShadowRoot2.getElementById("text-input").textContent = labelText;
    setTimeout(() => {
      console.log(gShadowRoot2.querySelectorAll(".input-button"));
      gShadowRoot2.querySelectorAll(".input-button")[1].click();
    }, 100);
  }, 100);

  const url = new URL(
    `${baseURL2}/tests/get_or_create_test_scenarios_by_site/`
  );
  const params = new URLSearchParams();
  params.set("mode", "A");
  params.set("area", area);
  params.set(
    "information",
    JSON.stringify({ data: optionDetail[labelText], title: labelText })
  );
  params.set(
    "url",
    "https://www.tutorialspoint.com/learn-python-full-course-for-beginners-from-basics-to-advance-urdu-hindi/index.asp?gclid=Cj0KCQjwtJKqBhCaARIsAN_yS_m76CYKUpB-cgwWY07Db3Z_l9UC1jE9a4h0Fg9AMOQ4BcvyHD6hVu0aAurTEALw_wcB"
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
      const challenges = data;
      const randomIndex = Math.floor(Math.random() * challenges.length);
      const randomChallenge = challenges[randomIndex];

      console.log(randomChallenge);
      testCode2 = randomChallenge.test_code;
      codeAvailabilityUserChoice2 = true;
    })
    .catch((err) => console.log(err));
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
  deepChatPocElement2 = document.getElementsByClassName("deep-chat-poc2")?.[0];
  deepChatPocElement2.innerHTML = `
  <div class="chat-wrapper2">
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
      hight: 80vh;
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
      margin: 4px;
      margin-bottom: 0.4rem;
    ">
    <h1 style="
      color : white;
      background-color: #2DC092;
      border: 2px solid #2DC092;
      font-size: 1rem;
      font-weight: bold;
      margin-top : 12px;
      margin-left : 4px;
      margin-bottom: 0.5rem;
      width: fit-content;
      padding: 0 8px;
    ">
      C
    </h1>
    <img id="close-top2" 
      onmouseover="this.style.cursor ='pointer'"
      onclick="closeFromTop2()"
      src="https://cdn.statically.io/gh/falahh6/coachbots/main/close-btn.png" 
      style="
      width : 50px;
      position: absolute;
      left : 1rem;
    "/>
    <h3 id="chatbot-heading2" style="
      font-size: 16px;
      font-weight: 500;
      line-height: 16px;
      margin-left: 8px;
    ">Welcome to the Coachbots simulator.</h1>
    </div>
    <deep-chat
      id="chat-element2"
      style="position: relative; top : 0; bottom: 0; left: 0 ; right: 0; width: 10%; height: 70vh; border: none;"
      messageStyles='{
        "default": {
          "shared": {"bubble": {"maxWidth": "80%", "marginTop": "4px"}}
        }
      }'
      displayLoadingBubble = "true";
      demo="true"
      style="border: none"
      textInput='{
        "placeholder": {"text": "Welcome, Please follow provided instructions."}
      }'
      speechToText='{"webSpeech": true,
        "commands": {"resume": "resume", "submit" : "submit", "settings": {"commandMode": "hello"}},

        "button": {
          "position" : "outside-left",
          "default": {
            "container": {
              "hover": {"backgroundColor": "#7fbded69"},
              "click": {"backgroundColor": "#4babf669"}
            },
             "svg": {
              "styles": {
                "default": {
                 "padding-top": "8px",
                  "padding-bottom": "8px",
                  "filter":
                    "brightness(0) saturate(100%) invert(53%) sepia(0%) saturate(826%) hue-rotate(52deg) brightness(95%) contrast(93%)"
                }
              },
                "content" : ${JSON.stringify(
                  '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-mic-mute" viewBox="0 0 16 16"><path d="M13 8c0 .564-.094 1.107-.266 1.613l-.814-.814A4.02 4.02 0 0 0 12 8V7a.5.5 0 0 1 1 0zm-5 4c.818 0 1.578-.245 2.212-.667l.718.719a4.973 4.973 0 0 1-2.43.923V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 1 0v1a4 4 0 0 0 4 4m3-9v4.879l-1-1V3a2 2 0 0 0-3.997-.118l-.845-.845A3.001 3.001 0 0 1 11 3"/><path d="m9.486 10.607-.748-.748A2 2 0 0 1 6 8v-.878l-1-1V8a3 3 0 0 0 4.486 2.607m-7.84-9.253 12 12 .708-.708-12-12-.708.708z"/></svg>'
                )}

          }
          },
          "active": {
            "container": {
              "hover": {"backgroundColor": "#fee2e2"},
              "click": {"backgroundColor": "#ecb85c70"}
            },
            "svg": {
              "styles": {
                "default": {
                  "padding-top": "4px",
                  "padding-bottom": "8px",
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
    <p style="font-size: ${window.innerWidth < 768 ? "8px" : "12px" }; width: 100%; text-align: center; padding: 0 10%; height:20px">Avatar works based on coach provided background. Click on "Done" at end to inform your coach about this session.</p>
  </div>
  `;

  const chatContainer2 = document.getElementById("chat-container2");
  const chatElementRef2 = document.getElementById("chat-element2");
  const chatIconContainer2 = document.getElementById("chat-icon2");
  const chatbotHeading2 = document.getElementById("chatbot-heading2");
  const closeFromTopp2 = document.getElementById("close-top2");
  botId = document.querySelector('.deep-chat-poc2').dataset.botId;
  // botId = 'stress-management-0032'

  const _ =  getBotDetails2(botId);

//   appendMessage2(`<div id="option-button-container" >
//                     <button style="margin-top:5px; width:100%; padding:6px 4px; border: 1px solid lightgray; border-radius: 4px;" onclick="handleOptionButtonClick('Integrating a New Team Member')">Integrating a New Team Member</button>

//                     <button style="margin-top:5px; width:100%; padding:6px 4px; border: 1px solid lightgray; border-radius: 4px;"  onclick="handleOptionButtonClick('Effective Customer Service Management')">Effective Customer Service Management</button>

//                     <button style="margin-top:5px; width:100%; padding:6px 4px; border: 1px solid lightgray; border-radius: 4px;"  onclick="handleOptionButtonClick('Cultivating Growth Through Feedback')">Cultivating Growth Through Feedback</button>

//                     <button style="margin-top:5px; width:100%; padding:6px 4px; border: 1px solid lightgray; border-radius: 4px;"  onclick="handleOptionButtonClick('Cultivating Team Impartiality')">Cultivating Team Impartiality</button>

//                     <button style="margin:5px 0; width:100%; padding:6px 4px; border: 1px solid lightgray; border-radius: 4px;"  onclick="handleOptionButtonClick('Managing Meeting Momentum')">Managing Meeting Momentum</button>
//                 </div>`)

  //responsive styles for phones
  if (window.innerWidth < 600) {
    chatContainer2.style.width = "80vw";
    chatContainer2.style.right = "10vw";
    chatContainer2.style.height = "78vh";
    chatContainer2.style.bottom = "12vh";
    chatElementRef2.style.height = "65vh";
    chatElementRef2.style.width = "80vw";
    chatIconContainer2.style.position = "fixed";
    chatIconContainer2.style.width = "3rem";
    chatIconContainer2.style.height = "3rem";
    chatContainer2.style.position = "fixed";
    chatbotHeading2.style.fontSize = "12px";
    closeFromTopp2.style.width = "30px";
    closeFromTopp2.style.left = "0.3rem";
    closeFromTopp2.style.top = "0.2rem";
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

  if( botId == undefined) {
    chatElementRef2.initialMessages = [
      {
        html: `<p><b>Welcome to Coachbots. Do you have access code for your simulation? (Hint : Try samples on the page!)</b></p>` ,
        role: "ai",
      }
    ];
    chatElementRef2.initialMessages.push(
      {
        html: `<div class="deep-chat-temporary-message"><button class="deep-chat-button deep-chat-suggestion-button" style="border: 1px solid green">Yes</button>
          <button class="deep-chat-button deep-chat-suggestion-button" style="border: 1px solid #d80000">No</button> </div>`,
        role: "user",
      }
    );
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

  // to check word limit
  function isValidMessageStt(text) {
    const words = text.split(" ");
    let uppercaseArray = words.map(element => element.toUpperCase());
    if(uppercaseArray.includes('SKIP')&& (isTranscriptOnlyStt || testType2 === 'coaching')){
      return true;
    }
    if (words.length < 15) {
      return false;
    } else {
      return true;
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

  const getClientInformationStt = async (use_case,user_id=null) => {
    const url = `${baseURL2}/accounts/get-client-information/?for=${use_case}`;
    // use case can ====> my_lib or (user_info, user_id)
    if(user_id && use_case === "user_info"){
      url += `&user_id=${user_id}`
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
      
      return resp_json['data'][`${use_case}`]
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

  const TTSContainerSTT = async (text) =>{
      const queDiv = `<p>${text}</p><br>`
      const url = `${baseURL2}/test-responses/get-text-to-speech/?text=${text}`
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Basic ${createBasicAuthToken2(key2, secret2)}`,
        },
      });

      const blob = await response.blob();
      console.log('respnse', blob);

      const objectUrl = URL.createObjectURL(blob);
      
      console.log(objectUrl,'url')
      const audioCont = queDiv + `<div ><audio style="${window.innerWidth < 600 ? "width: 200px; max-width: 200px !important;" : " min-width: 50vw !important;"}" controls autoplay>
      <source src=${objectUrl} type="audio/mpeg" />
      Your browser does not support the audio element.
      </audio></div>`

      return audioCont
  }

  //No condition STT pending
  chatElementRef2.request = {
    handler: async (body, signals) => {
      try {
        if (body instanceof FormData) {
        } else {
          // TEXT RESPONSES

          //change mic state active to default on send
          var chatElement = document.getElementById("chat-element2");
        //   const coachId = document.querySelector('.deep-chat-poc2').dataset.botId;

          console.log("Bot ID: ",botId);

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

          if (fitmentAnalysisInProgress){
            signals.onResponse({
              html: "<p style='font-size: 14px;color: #991b1b;'>Not allowed! choose option to continue. </p>",
            })
            return;
          }
          // to check session active or not

           // get latest message
          const latestMessage = body.messages[body.messages.length - 1].text;

          if (isEmailFormstt){
            await proceedFormFlowStt(latestMessage)
            if(formFieldsstt.length >0){
              signals.onResponse({
                html: `<b>Please enter your ${formFieldsstt[0]}<b>`
              })
            } else{
              isEmailFormstt = false;
              if (botId != undefined && botType !== "feedback_bot"){
                sendBotTranscript2()
                signals.onResponse({html: faqHtmlData})
              }else if (botId != undefined && botType === "feedback_bot"){
                const thumbsupdiv = await feedbackBotInitialFlow('save_email')
                signals.onResponse({
                  html: thumbsupdiv,
                });
              }else{
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

          if (botType === 'feedback_bot' && !isFeedbackConvEnd){
            feedbackBotQnA[feedbackBotQuestions[feedbackBotIndex]] = latestMessage
            const que_length = Object.keys(feedbackBotQuestions).length

            feedbackBotIndex += 1
            const is_last = que_length + 1  === feedbackBotIndex;
            if (is_last){

              appendMessage2(
                "<b> Thank you for your feedback.</b>"
              )
              const queryparams = new URLSearchParams({
                conversation: JSON.stringify(feedbackBotQnA),
                bot_id: botId,
                type_of_email: "feedback_conv",
                user_email: FeedbackUserEmail
            });

              // sending feedback conversation to bot owner
              const response = await fetch(
                `${baseURL2}/test-attempt-sessions/send-feedback-transcript-email/?${queryparams}`,
                {
                    method: "GET",
                    headers: {
                    Authorization: `Basic ${createBasicAuthToken2(key2,secret2)}`,
                    "Content-Type": "application/json",
                    },
                }
                )
                .then((response) => response.json())
                .then((data) => {
                    console.log("Dynamic mcq response : ", data);
                    
                })

                const queryparam = new URLSearchParams({
                  method: "post",
                  qna: JSON.stringify(feedbackBotQnA),
                  bot_id: botId,
                  is_positive: IsPositiveFeedback ? "True" : "False",
                  qna_type: "feedback",
                  user_id: userId2
              });

                const resp = await fetch(
                  `${baseURL2}/accounts/get-user-feedback-data/?${queryparam}`,
                  {
                      method: "GET",
                      headers: {
                      Authorization: `Basic ${createBasicAuthToken2(key2,secret2)}`,
                      "Content-Type": "application/json",
                      },
                  }
                  )
                  .then((response) => response.json())
                  .then((data) => {
                      console.log("Dynamic mcq response : ", data);
                      
                  })

              
          
              // resetAllVariablesStt()
              appendMessage2("please wait while we are getting some recommendations for you...")

                  
    
              try {
                const params = new URLSearchParams({
                  context: JSON.stringify(feedbackBotQnA),
                  for : 'feedback_bot'
                })
                const response = await fetch(`${baseURL2}/tests/get-recommendetion-tests/?${params}`, {
                  method: "GET",
                  headers: {
                    Authorization: `Basic ${createBasicAuthToken2(key2, secret2)}`,
                  },
                });
          
                const recommendation_tests_data = await response.json();

                const fetched_test_code = Object.keys(recommendation_tests_data.matching_tests)[0]
                const fetched_test = recommendation_tests_data.matching_tests[fetched_test_code]

                const created_test_code = Object.keys(recommendation_tests_data.created_scenario)[0]
                const created_test = recommendation_tests_data.created_scenario[created_test_code]
                console.log("fetched_test : ", fetched_test, recommendation_tests_data.matching_tests, "created_test : ", created_test)

                signals.onResponse({
                    html: `<b >Here are some recommendations for you : </b> <br>
                    <button style="margin-top:5px; width:100%; padding:6px 4px; border: 1px solid lightgray; border-radius: 4px;" onclick="handleSurpriseMeButtonClick2('${fetched_test_code}','${fetched_test}')">${fetched_test}</button>
                    <button style="margin-top:5px; width:100%; padding:6px 4px; border: 1px solid lightgray; border-radius: 4px;" onclick="handleSurpriseMeButtonClick2('${created_test_code}','${created_test}')">${created_test}      (experimental)</button>
                    `,
                    });
                console.log("recommendation_tests_data : ", recommendation_tests_data.matching_tests);
                recommendationClicked = false;
                isFeedbackConvEnd = true;
              } catch (error) {
                console.error(`Error in get recommendation tests: ${error}`);
              }


              return;

            } else{

              signals.onResponse({
                html: feedbackBotQuestions[feedbackBotIndex]
              })
              setTimeout(() => {
                appendMessage2(`<button style="margin-top:5px; width:100%; padding:6px 4px; border-radius: 8px; " onclick="handleEndFeedback()">End</button>`)
              }, 200);
          }
            return;
          }

          if( botId != undefined && allowRecommendationTestCode == false) {
            if( fitmentAnalysisInProgress == true) {
                fitmentAnalysisQnA[fitmentAnalysisIndex] = {
                    "coach": fitmentAnalysisQuestions[fitmentAnalysisIndex],
                    "cochee": latestMessage
                }
                fitmentAnalysisIndex += 1;
                console.log("fitmentAnalysisIndex : ", fitmentAnalysisIndex, Object.keys(fitmentAnalysisQuestions).length)
                if( fitmentAnalysisIndex <=  Object.keys(fitmentAnalysisQuestions).length ) {
                    console.log("Answer : ",latestMessage)
                    console.log("fitment question : ", fitmentAnalysisQuestions[fitmentAnalysisIndex])
                    signals.onResponse({
                        html: fitmentAnalysisQuestions[fitmentAnalysisIndex],
                    });
                    return;
                } else {
                    fitmentAnalysisInProgress = false;
                    fitmentAnalysisIndex = 0;
                    console.log("fitmentAnalysisQnA : ", fitmentAnalysisQnA)

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
                              fitness_analysis_data: JSON.stringify(fitmentAnalysisQnA),
                            }),
                          }
                        );
          
                        const data = await response.json();
                        console.log("Fitness Analysis Score => ", data); 
                        score = ' {"Fitment score":"3"}'
                        signals.onResponse({
                            html: `<b >Fitment score is : ${data.data['Fitment score']} </b>`,
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

            if( recommendationClicked == true) {
              appendMessage2("Please wait while we are getting some recommendations for you...")

                  
    
              try {
                const response = await fetch(`${baseURL2}/tests/get-recommendetion-tests/?context=${latestMessage}`, {
                  method: "GET",
                  headers: {
                    Authorization: `Basic ${createBasicAuthToken2(key2, secret2)}`,
                  },
                });
          
                const recommendation_tests_data = await response.json();

                const fetched_test_code = Object.keys(recommendation_tests_data.matching_tests)[0]
                const fetched_test = recommendation_tests_data.matching_tests[fetched_test_code]

                const created_test_code = Object.keys(recommendation_tests_data.created_scenario)[0]
                const created_test = recommendation_tests_data.created_scenario[created_test_code]
                console.log("fetched_test : ", fetched_test, recommendation_tests_data.matching_tests, "created_test : ", created_test)

                signals.onResponse({
                    html: `<b >Here are some recommendations for you : </b> <br>
                    <button style="margin-top:5px; width:100%; padding:6px 4px; border: 1px solid lightgray; border-radius: 4px;" onclick="handleSurpriseMeButtonClick2('${fetched_test_code}','${fetched_test}')">${fetched_test}</button>
                    <button style="margin-top:5px; width:100%; padding:6px 4px; border: 1px solid lightgray; border-radius: 4px;" onclick="handleSurpriseMeButtonClick2('${created_test_code}','${created_test}')">${created_test}      (experimental)</button>
                    `,
                    });
                console.log("recommendation_tests_data : ", recommendation_tests_data.matching_tests);
                recommendationClicked = false;
              } catch (error) {
                console.error(`Error in get recommendation tests: ${error}`);
              }


              return;
            }

            console.log("Yes OMG control is reaching here") 

            console.log("isAskingInitialQuestions : ", isAskingInitialQuestions,
            "fitmentAnalysisInProgress : ", fitmentAnalysisInProgress, 
            "isSessionActiveStt : ", isSessionActiveStt, 
            "isAttemptingRecommendation : ", isAttemptingRecommendation,
            "optedBeginSession : ", optedBeginSession)
            if (isAskingInitialQuestions == false && fitmentAnalysisInProgress == false && isSessionActiveStt == false && isAttemptingRecommendation == false && optedBeginSession == false) {
              signals.onResponse({
                html: "<p style='font-size: 14px;color: #991b1b;'>Not allowed! choose option to continue. </p>",
              })
              return;
            }
            

            if (isAskingInitialQuestions == true) {
                // botInitialQuestionsQnA[botInitialQuestions[botInitialQuestionsIndex]] = latestMessage
                // const tempQna = `Question: ${botInitialQuestions[botInitialQuestionsIndex]}  Answer: ${latestMessage}`

                botInitialQuestionsQnA[botInitialQuestions[botInitialQuestionsIndex]] = latestMessage;

                botInitialQuestionsIndex ++;
                if( botInitialQuestionsIndex > Object.keys(botInitialQuestions).length ) {
                    // isAskingInitialQuestions = false;
                    // botInitialQuestionsIndex = 0;
                    console.log("all botInitialQuestions submitted : ", botInitialQuestionsQnA)
                    // signals.onResponse({text: "Thank you for your response."})
    
                }
                else {
                    
                    signals.onResponse({text: botInitialQuestions[botInitialQuestionsIndex]})
                    return;
                }
            }
            
            if( isSessionActiveStt == false && isBotInitialized == false) {
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
                  }),
                }
              );

              const data = await response.json();
              sessionId2 = data.uid;
              isSessionActiveStt = true;
              console.log("Session Created => ", sessionId2);
            

              if( isBotInitialized == false ) {
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
                          initial_qna: JSON.stringify(botInitialQuestionsQnA),
                        }),
                      }
                    );

                    const data = await response.json();
                    console.log("Coaching Conversation Created => ", data);
                    conversation_id2 = data.uid;
                    questionLength2 = 999;
                    console.log("conversation_id", conversation_id2);
                    isBotInitialized = true;

                    if( isAskingInitialQuestions == true && botInitialQuestionsIndex != 0) {
                        isAskingInitialQuestions = false;
                        botInitialQuestionsIndex = 0;
                        if (isBotAudioResponse){
                          const audioDiv = await TTSContainerSTT(data.coach_message_text)
                          signals.onResponse({html: audioDiv})

                        } else {
                        signals.onResponse({html: data.coach_message_text})
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
            if( isBotInitialized == true) {
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
                  }),
                }
              );
              const responseData = await response.json();
              console.log(
                "Response from Coaching submit response : ",
                responseData
              );

              conversation_id2 = responseData["uid"];
              let coachResponse =  responseData["coach_message_text"]

              if(coachResponse.split(':').length > 1 ) {
                coachResponse = coachResponse.split(':').slice(1).join(':').trim()
              }

              if (isBotAudioResponse){
                const audioDiv = await TTSContainerSTT(coachResponse)
                signals.onResponse({html: audioDiv})

              } else {
              signals.onResponse({
                html: coachResponse,
              });
              }
              setTimeout(() => {
                appendMessage2(`<button style="margin-top:5px; width:100%; padding:6px 4px; border-radius: 8px; " onclick="handleEndConversation()">End Session</button>`)
              }, 200);
            }

          }
          
          if( botId != undefined && allowRecommendationTestCode == false ) {
            // wait infinitely for bot to initialize
            console.log("returning from here (bot logic)")
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

          if ((testType2 === "mcq" || testType2 === 'dynamic_mcq') && latestMessage.toUpperCase() != "STOP") {
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

          const userAcessAvailability2 = body.messages[0].text;
          if (userAcessAvailability2 === "Yes" && !isSessionActiveStt) {
            signals.onResponse({
              html: "<b>Please enter the access code to get started.</b>",
            });
            return;
          } else if (userAcessAvailability2 === "No" && !isSessionActiveStt) {
            optedNo2 = true;
            signals.onResponse({
              html: `<div id="option-button-container" >
                      <button id="surprise-button" style="margin-top:5px; width:100%; padding:6px 4px; border: 1px solid lightgray; border-radius: 4px;" onclick="handleSurpriseMeButtonClick2()">Initiate a surprise Interaction</button>
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
            if (testType2 === "mcq" || testType2 === 'dynamic_mcq') {
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
              console.log("Your session is terminated. You can restart again!")

              signals.onResponse({
                html: "<b>Your session is terminated. You can restart again!</b>",
              });
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
            //end

            console.log("isAttemptingRecommendation : ", isAttemptingRecommendation, "isValidMessageStt(latestMessage) : ", isValidMessageStt(latestMessage), "isProceedstt", isProceedStt)
            if ( isAttemptingRecommendation == true && isProceedStt == "true") {
              if ( isValidMessageStt(latestMessage) == false){
                signals.onResponse({
                  html: "<p style='font-size: 14px;color: #991b1b;'><b>Response is too short it must be minimum of 15 words.</b></p>",
                });
                return;
              }

              if ( isDuplicateResponse(latestMessage)) {
                DuplicateResponseCount2 += 1;
                if (DuplicateResponseCount2 > 1) {
                  resetAllVariablesStt().then(() => {
                    signals.onResponse({
                    html: "<p style='font-size: 14px;color: #991b1b;'><b> Your session has terminated because of multiple duplicate responses. please try again with unique responses </b></p>",
                  });
                })
                return;
                }

                signals.onResponse({
                  html: "<p style='font-size: 14px;color: #d3a008;'><b>Duplicate Response detected. this may lead to inaccuracies and session termination. please proceed with caution.</b></p>",
                });
                return;
              }
              else {
                userResponses2.push(latestMessage);
              }
            }

            if (!buttonTextArray.includes(latestMessage) && allowRecommendationTestCode == false) {
              if (testType2 === "mcq" || testType2 === 'dynamic_mcq') {
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
                  html: "<p style='font-size: 14px;color: #991b1b;'><b>Response is too short it must be minimum of 15 words.</b></p>",
                });
                return;
              }
              
              if ( isDuplicateResponse(latestMessage)) {
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
              }
              else {
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

          console.log("questionIndex2", questionIndex2, "userAcessAvailability2", userAcessAvailability2);
          if (questionIndex2 === 0 && userAcessAvailability2.length !== 0) {
            if (optedNo2 === false) {
              testCode2 = body.messages[0].text;
              appendMessage2("Please wait while we are processing ...");
            } else {
              appendMessage2("Please wait while we are processing ...");
              // //wait while test code is being processed
              // while (!codeAvailabilityUserChoice2) {
              //   await new Promise((resolve) => setTimeout(resolve, 500));
              // }
            }
            codeAvailabilityUserChoice2 = true;
          }

          if (questionIndex2 > 0 && !responsesDone2) {
            userResponse2 = body.messages[0].text;
          }

          if (
            !responsesDone2 &&
            userName2.length === 0 &&
            userEmail2.length === 0 &&
            codeAvailabilityUserChoice2
          ) {
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
                console.log('test-data = >', questionData2)
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
                console.log(mediaPropsStt,"props")
                isTranscriptOnlyStt = questionData2.results[0].is_transcript_only;
                


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
                  const my_lib = await getClientInformationStt("my_lib");
                  for (const item of my_lib) {
                    if (item.emails.includes(user2.email)) {
                      group_list.push(item.group);
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

                      questionMediaLinkStt =questionData2.results[0].questions[questionIndex2].media_link;

                      
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
                          } else if (questionMediaLinkStt.includes("vimeo.com")) {
                            const videoId = questionMediaLinkStt.split("/").pop();
                            embeddingUrl = `https://player.vimeo.com/video/${videoId}?autoplay=1&loop=1`;
                          } else if (questionMediaLinkStt.includes("twitter.com")) {
                            embeddingUrl = `https://twitframe.com/show?url=${questionMediaLinkStt}`;
                          }
                  
                          if (embeddingUrl){
                          questionText2 = `▪ Media <br>  <iframe
                                          allow="autoplay; encrypted-media; fullscreen;"
                                          style="width: 100%; border-radius: 8px; min-height: 50vh; min-width: 50vw;"
                                          src=${embeddingUrl}
                                          frameborder="0"
                                          allowfullscreen
                                        >
                          `;
                          }
                          const urlList = questionMediaLinkStt.split(',')
                          console.log("list",urlList)
                          if (urlList.length > 1){
                            urlList.forEach(element => {
                              element = element.trim()
                              if (element.includes('docs.google.com')){
                                let url = element.split('edit?')[0] + 'embed?start=true&loop=true&delayms=3000'
                                console.log(url)
                                questionText2 = questionText2 + '\n' +(`<iframe src=${url}
                                                frameborder="0" 
                                                style="width: 100%; border-radius: 8px; min-height: 50vh; min-width: 50vw;"
                                                allowfullscreen="true" 
                                                mozallowfullscreen="true" 
                                                webkitallowfullscreen="true"
                                                ></iframe>`)
                              }
                              else{
                                console.log(element)
                                questionText2 = questionText2 + '\n' +(`<div ><audio style="${window.innerWidth < 600 ? "width: 200px; max-width: 200px !important;" : " min-width: 50vw !important;"}" controls autoplay>
                                <source src=${element} type="audio/mpeg" />
                                Your browser does not support the audio element.
                                </audio></div>`)
                              }
                            });
                          }else {
                            if (questionMediaLinkStt.includes('docs.google.com')){
                              let url = questionMediaLinkStt.split('edit?')[0] + 'embed?start=true&loop=true&delayms=3000'
                              console.log(url)
                              questionText2 = questionText2.replaceAll(":","")
                              if(isImmersiveStt){
                                console.log(questionText2)
                                const urltts = `${baseURL2}/test-responses/get-text-to-speech/?text=${questionText2}`
                                const response = await fetch(urltts, {
                                  method: "GET",
                                  headers: {
                                    Authorization: `Basic ${createBasicAuthToken2(key2, secret2)}`,
                                  },
                                });
                          
                                const blob = await response.blob();
                                console.log('respnse', blob);
                          
                                const objectUrl = URL.createObjectURL(blob);
                                
                                console.log(objectUrl,'url')
                                questionText2 = `<div ><audio style="${window.innerWidth < 600 ? "width: 200px; max-width: 200px !important;" : " min-width: 50vw !important;"}" controls autoplay>
                                <source src=${objectUrl} type="audio/mpeg" />
                                Your browser does not support the audio element.
                                </audio></div>`
                                console.log(questionText2)

                              }
                              console.log("last",questionText2)
                              

                              questionText2 = questionText2 +(`<iframe src=${url}
                                              frameborder="0" 
                                              style="width: 100%; border-radius: 8px; min-height: 50vh; min-width: 50vw;" 
                                              allowfullscreen="true" 
                                              mozallowfullscreen="true" 
                                              webkitallowfullscreen="true"
                                              ></iframe>`)
                            }
                          }
                          }
                        }

                        
                        if(isImmersiveStt && !questionMediaLinkStt){
                          questionText2 = questionText2.replaceAll(":","")
                          console.log('first', questionText2)

                          
                          const urltts = `${baseURL2}/test-responses/get-text-to-speech/?text=${questionText2}`
                          const response = await fetch(urltts, {
                            method: "GET",
                            headers: {
                              Authorization: `Basic ${createBasicAuthToken2(key2, secret2)}`,
                            },
                          });
                    
                          const blob = await response.blob();
                          console.log('respnse', blob);
                    
                          const objectUrl = URL.createObjectURL(blob);
                          
                          console.log(objectUrl,'url')
                          questionText2 = `<div ><audio style="${window.innerWidth < 600 ? "width: 200px; max-width: 200px !important;" : " min-width: 50vw !important;"}" controls autoplay>
                          <source src=${objectUrl} type="audio/mpeg" />
                          Your browser does not support the audio element.
                          </audio></div>`
                          console.log(questionText2)

                          
                        }
                        console.log("last",questionText2)
                      
                  
                      

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
                        questionMediaLinkStt = questionData2.results[0].questions[questionIndex2].media_link;
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
                        <button style="margin-top:5px; width:100%; padding:6px 4px; border: 1px solid lightgray; border-radius: 4px;" onclick="handleProceedClickStt('Yes')">Yes</button>
                        <button style="margin-top:5px; width:100%; padding:6px 4px; border: 1px solid lightgray; border-radius: 4px;" onclick="handleProceedClickStt('No')">No</button>
                    </div>`;
                    console.log(senarioMediaDescription2,'mediadesc')
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
                                  `<div ><audio style="${window.innerWidth < 600 ? "width: 200px; max-width: 200px !important;" : " min-width: 50vw !important;"}" controls autoplay>
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
                            } else if (senarioMediaDescription2.includes('guidejar.com')){
                              const guidejarId = senarioMediaDescription2.split('/').pop()
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
                              `)
                            }
                            else {
                              appendMessage2(
                                `▪ Title : ${senarioTitle2} <br><br>
                                    ▪ Description : ${senarioDescription2} <br><br>
                                    ▪ Instructions : Audio/Video Messages should be atleast 15 secs long. <br><br>
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
                    } else if (mediaPropsStt && Object.keys(mediaPropsStt).includes('test_image')){
                      console.log("Media props here", mediaPropsStt)
                      console.log("SHOW MEDIA PROPS here", mediaPropsStt);
                      // const [imageUrlStt, coords] = Object.entries(
                      //   mediaPropsStt.test_image
                      // )[0];
                      const url = Object.keys(mediaPropsStt["test_image"])[0];
                      let narration;
                      let coords = []
                      const coordAndTitleNarrationList = mediaPropsStt["test_image"][url];

                      coordAndTitleNarrationList.forEach(element =>{
                        if (typeof element === 'string'){
                          narration = element
                        } else{
                          coords.push(element)
                        }
                      })

                      const testImage = {
                        image: url,
                        coords: coords,
                        narration: narration
                      }

                     console.log(testImage)
                     const imageUrlStt = testImage.image
                     const coordsStt = [
                          { coord: "109.70.257.89|55.34.131.43", title: "Hand Wheel" },
                          { coord: "170.112.197.194|85.56.99.80", title: "Stem" },
                          { coord: "128.208.246.242 | 63.97.125.125", title: "Gear Unit" }
                        ]
                     const narrationStt = testImage.narration

                      const ttsNarration = await TTSContainerSTT(narrationStt)
                      const imageIdStt = "mediaImageStt"
                      const imageMapNameStt = "image-mapStt"
                      const imageTooltipIdStt = 'tooltip-stt'

                      appendMessage2(
                        `▪ Title : ${senarioTitle2} <br><br>
                             ▪ Description : ${senarioDescription2} <br><br>
                             ▪ Instructions : Response should be at least 15 words. <br><br>
                             ▪ <img src=${imageUrlStt} ${window.innerWidth < 768 ? "width='200'" : "width='400'" } usemap="#${imageMapNameStt}" id=${imageIdStt} style="border-radius: 8px; margin-top: 4px;" /> <br><br>
                             ▪ ${ttsNarration}` 
                      );
                      signals.onResponse({
                        html: questionText2,
                      });

                      // pass - coords, imagemap-name, 
                      setHoverPointsStt(coordsStt, imageIdStt, imageMapNameStt,imageTooltipIdStt)
                      console.log("IMAGE MAPPED WITH COORDS")
                      
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
                      let strList = questionText2.replaceAll("*","").split(":")
                      if (strList.length > 1){
                        questionText2 = strList[1]
                        responderName = `<b>${strList[0]}:</b><br>`
                        
                      }
                      if(isImmersiveStt){
                        questionText2 = await TTSContainerSTT(questionText2)
                      }

                      if (responderName){
                        questionText2 = responderName + questionText2
                      }
                      if (questionMediaLinkStt) {
                        console.log(questionText2);
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

                          if (embeddingUrl){
                          questionText2 = `▪ Media <br>  <iframe
                                          allow="autoplay; encrypted-media; fullscreen;"
                                          style="width: 100%; border-radius: 8px; min-height: 50vh; min-width: 50vw;"
                                          src=${embeddingUrl}
                                          frameborder="0"
                                          allowfullscreen
                                        >
                          `;
                          }
                          const urlList = questionMediaLinkStt.split(',')
                          console.log("list",urlList)
                          if (urlList.length > 1){
                            urlList.forEach(element => {
                              element = element.trim()
                              if (element.includes('docs.google.com')){
                                let url = element.split('edit?')[0] + 'embed?start=true&loop=true&delayms=3000'
                                console.log(url)
                                appendMessage2(`<iframe src=${url}
                                                frameborder="0" 
                                                style="width: 100%; border-radius: 8px; min-height: 50vh; min-width: 50vw;"
                                                allowfullscreen="true" 
                                                mozallowfullscreen="true" 
                                                webkitallowfullscreen="true"
                                                ></iframe>`)
                              }
                              else{
                                console.log(element)
                                appendMessage2(`<div ><audio style="${window.innerWidth < 600 ? "width: 200px; max-width: 200px !important;" : " min-width: 50vw !important;"}" controls autoplay>
                                <source src=${element} type="audio/mpeg" />
                                Your browser does not support the audio element.
                                </audio></div>`)
                              }
                            });
                          }else {
                            if (questionMediaLinkStt.includes('docs.google.com')){
                              let url = questionMediaLinkStt.split('edit?')[0] + 'embed?start=true&loop=true&delayms=3000'
                              console.log(url)
                              appendMessage2(`<iframe src=${url}
                                              frameborder="0" 
                                              style="width: 100%; border-radius: 8px; min-height: 50vh; min-width: 50vw;" 
                                              allowfullscreen="true" 
                                              mozallowfullscreen="true" 
                                              webkitallowfullscreen="true"
                                              ></iframe>`)
                            } else if (questionMediaLinkStt.includes('guidejar.com')){
                              const guidejarId = questionMediaLinkStt.split('/').pop()
                              appendMessage2(`
                              <div style="width:640px">
                              <div style="position:relative;height:0;width:100%;overflow:hidden;box-sizing:border-box;padding-bottom:calc(100% - 0px)">
                              <iframe src="https://www.guidejar.com/embed/${guidejarId}?type=1&controls=off" width="100%" height="100%" style="position:absolute;inset:0" allowfullscreen frameborder="0"></iframe
                              ></div></div>
                              `)
                            }

                          }
                          }
                        }
                      if (questionText2){

                        
                        console.log(`que_image ${questionIndex2 + 1}`)
                        if(mediaPropsStt && Object.keys(mediaPropsStt).includes(`que_image ${questionIndex2 + 1}`)){
                          const questionpropName = `que_image ${questionIndex2 + 1}`

                          const url = Object.keys(mediaPropsStt[questionpropName])[0];
                          let narration;
                          let coords = []
                          const coordAndTitleNarrationList = mediaPropsStt[questionpropName][url];

                          coordAndTitleNarrationList.forEach(element =>{
                            if (typeof element === 'string'){
                              narration = element
                            } else{
                              coords.push(element)
                            }
                          })

                          const testImage = {
                            image: url,
                            coords: coords,
                            narration: narration
                          }
                          console.log(testImage)
                          const imageUrlStt = testImage.image
                          const coordsStt = testImage.coords
                          const narrationStt = testImage.narration

                          const ttsNarration = await TTSContainerSTT(narrationStt)
                          const imageIdStt = `mediaImageStt${questionIndex2}`
                          const imageMapNameStt = `image-mapStt${questionIndex2}`
                          const imageTooltipIdStt = `tooltip-stt${questionIndex2}`


                             
                          questionText2 = (`▪ ${ttsNarration}<br><br>
                                           <br> <img src=${imageUrlStt} ${window.innerWidth < 768 ? "width='200'" : "width='400'" } usemap="#${imageMapNameStt}" id=${imageIdStt} style="border-radius: 8px; margin-top: 4px;" /> <br><br>
                                            ▪ Question : <br> ${questionText2}
                                          `)

                          signals.onResponse({
                            html: questionText2,
                          });
                          setHoverPointsStt(coordsStt, imageIdStt, imageMapNameStt,imageTooltipIdStt)
                          console.log(testImage, "IMAGE MAPPED WITH COORDS ", {questionIndex2})


                          // questionText2 = questionText2 + imageDiv 
                        }else{
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
                  const messageNode = document.createElement("div");
                  messageNode.classList.add("inner-message-container");
                  const messageBubble = document.createElement("div");
                  messageBubble.classList.add(
                    "message-bubble",
                    "ai-message-text"
                  );
                  messageBubble.style.maxWidth = "80%";
                  messageBubble.style.marginTop = "4px";
                  const messageText = document.createElement("p");
                  messageText.innerHTML = `<b>That's it! Thank you for participating in the  interaction.</b> ${
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
                    const strList = questionText2.split(":",2)
                    if (strList.length > 1){
                      responderName = `<b>${strList[0]}:</b><br>`
                      questionText2 = strList[1]
                    }
                    if(isImmersiveStt){
                      questionText2 = await TTSContainerStt(questionText2)
                    }

                    if (responderName){
                      questionText2 = responderName + questionText2
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

                      if (isImmersiveStt){
                        questionText2 = questionText2.replace(`${responder_name2}`,"")
                        questionText2 = questionText2.replace(`:`,"")
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
                    console.log('ismmersive',isImmersiveStt,questionText2)

                    const stringList = questionText2.split(':', 2)
                    console.log(stringList)
                    let responderName;
                    if(stringList.length > 1){
                      questionText2 = stringList[1]
                      responderName = `<b>${stringList[0]}:</b><br>`
                    }
                    if (isImmersiveStt && questionIndex2 != 0){
                      questionText2 = await TTSContainerSTT(questionText2);
                    }
                    if(responderName){
                      questionText2 = responderName + questionText2
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
                    if (testType2 === "mcq" || testType2 === 'dynamic_mcq') {
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
                      html: "<p style='font-size: 14px;color: #991b1b;'><b>Unfortunately due to technical reasons, your earlier response could not be processed. The session will be terminated. Please try again.</b>.</p>",
                    });
                    return;
                  }

                  if (!window.user) {
                    isEmailFormstt = true
                    formFieldsstt = ['name', 'email']
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
                  console.log(senarioCase2, getReportBody2)

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
                  //     html: "<p style='font-size: 14px;color: #991b1b;'><b>Unfortunately due to technical reasons, your earlier response could not be processed. The session will be terminated. Please try again.</b>.</p>"
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
                    return;
                  }
                }
              }
              
            } catch (err) {
              console.log(err);
              if (testType2 === "mcq" || testType2 === 'dynamic_mcq') {
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
                  html: "<p style='font-size: 14px;color: #991b1b;'><b>Unfortunately due to technical reasons, your earlier response could not be processed. The session will be terminated. Please try again.</b>.</p>",
                });
              }
            }
          }
        }
      } catch (e) {
        console.log(e);
        await cancelTestStt(participantId2); // cancelling session
        if (testType2 === "mcq" || testType2 === 'dynamic_mcq') {
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
          html: "<p style='font-size: 14px;color: #991b1b;'><b>Unfortunately due to technical reasons, your earlier response could not be processed. The session will be terminated. Please try again.</b>.</p>",
        });
      }
    },
  };
});

const openChatContainer2 = () => {
  let chatContainer2 = document.getElementsByClassName("chat-container2")?.[0];
  let chatIcon2 = document.getElementsByClassName("chat-icon2")?.[0];

  user2 = window.user;
  console.log(user2)

  const basicAuthToken2 = createBasicAuthToken2(key2, secret2);

  // Using the ipinfo.io API
  fetch("https://ipinfo.io/106.221.193.225?token=4ba5b2bde0816f")
    .then((response) => response.json())
    .then((data) => {
      ipAddress2 = data.ip;
    })
    .catch((error) => console.error("Error fetching IP address:", error));

  let user_name2;
  let user_email2;

  if (window.user) {
    user_name2 = window.user.given_name;
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
      participantId2 = data.uid;
      userId2 = data.uid;
      userRole2 = data.role;
    })
    .catch((err) => console.log(err));

  if (chatContainer2.style.scale === "1") {
    chatContainer2.style.scale = 0;
    chatContainer2.style["transform-origin"] = "100% 100%";
  } else {
    chatContainer2.style.scale = 1;
    chatContainer2.style["transform-origin"] = "100% 50%";

   //to close other bot
   botId = document.querySelector('.deep-chat-poc2').dataset.botId;
  // botId = 'stress-management-0032'

   if(!botId){
     const chatContainer = document.getElementById("chat-container");
     chatContainer.style.scale = 0;
     chatContainer.style["transform-origin"] = "100% 100%";
     const chatIcon = document.getElementsByClassName("chat-icon")?.[0];
     chatIcon.src =
       "https://cdn.statically.io/gh/falahh6/coachbots/main/coachbot-logo-bot.png";
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

  chatContainer2.style.scale = 0;
  chatContainer2.style["transform-origin"] = "100% 100%";

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
