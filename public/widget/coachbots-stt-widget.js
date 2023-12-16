const key2 = "";
const secret2 = "";

const subdomainStt = window.location.hostname.split(".")[0];
const devUrlStt = "https://coach-api-ovh.coachbots.com/api/v1";
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
      code: "Q60LLMU",
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
      code: "Q8LUY93",
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

function createBasicAuthToken2(key2 = "", secret2 = "") {
  const token2 =
    "Yzc3MjFmZGItYTllMC00YTYxLWEzMTYtNDRhODA1N2VkMjY0OjhjNWNlZWZlLTY2Y2QtNDliZi04MTY5LTBhNjMwMmU5NmZlMA==";
  return token2;
}
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
  gShadowRoot2.getElementById("messages").scrollBy(0, 100);
}

  // to reset all variables
  const resetAllVariablesStt = () => {
    //* reset all variables : start
    questionText2 = "";
    reportType2 = "interactionSessionReport";
    questionIndex2 = 0;
    questionId2 = null;
    userResponse2 = "";

    testId2 = null;
    resQuestionNumber2 = null;
    questionLength2 = null;
    questionData2 = null;

    is_free2 = true;
    // responseProcessedQuestion = 0;
    senarioDescription2 = "";
    senarioTitle2 = "";
    senarioMediaDescription2;
    responsesDone2 = false;
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
    testType2 = '';
    isHindiStt = false;
    testUIInfoStt;
    isProceedStt = '';
    isSessionActiveStt = false;
    recommendationsStt="";
    isTestSignedInStt;
    clientNameStt = "";

  };

  function findRelatedItemsStt(data, targetCode) {
    let matchingItems = [];
    let targetTitle = '';

    for (const sublist of data) {
        for (const item of sublist) {
            if (item.code === targetCode) {
                targetTitle = item.title;
            }else{
            matchingItems.push(item);
            }
        }

        if (matchingItems.length > 0 && targetTitle) {
            break;
        } else {
            matchingItems = [];
        }
    }
    console.log('mat',matchingItems,targetTitle,targetCode,data)
    let resultDiv = "<b>System Recommendation: If you like this scenario you can try:<b> <br>"
    matchingItems.forEach((item)=>{
      resultDiv += `<strong>Title:</strong> ${item.title} <br><strong>Code:</strong> ${item.code} <br>`;
    })

    return matchingItems.length > 0 && targetTitle ? `<div>${resultDiv}</div>` : null;
  }

  const handleProceedClickStt = (choice) => {

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
      const linkPattern = /(http[s]?:\/\/[^\s]+)/;
      const is_link = linkPattern.test(initialQuestionTextStt);

      if (is_link) {
        console.log(initialQuestionTextStt);
        let embeddingUrl = "";
        if (initialQuestionTextStt.length > 0) {
          if (initialQuestionTextStt.includes("youtube.com")) {
            const videoId = initialQuestionTextStt.split("v=")[1];
            embeddingUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
          } else if (initialQuestionTextStt.includes("vimeo.com")) {
            const videoId = initialQuestionTextStt.split("/").pop();
            embeddingUrl = `https://player.vimeo.com/video/${videoId}?autoplay=1&loop=1`;
          } else if (initialQuestionTextStt.includes("twitter.com")) {
            embeddingUrl = `https://twitframe.com/show?url=${initialQuestionTextStt}`;
          }

          initialQuestionTextStt = initialQuestionTextStt.replace(
            /(http[s]?:\/\/[^\s]+)/g,
            ""
          );

          initialQuestionTextStt = `▪ Media <br>  <iframe
                          allow="autoplay; encrypted-media; fullscreen;"
                          style="width: 100%; border-radius: 8px; min-height: 50vh; min-width: 50vw;"
                          src=${embeddingUrl}
                          frameborder="0"
                          allowfullscreen
                        >
        `;
        }
      }
      appendMessage2(initialQuestionTextStt)
    }else {
      resetAllVariablesStt();
      const gshadowRoot =
                document.getElementById("chat-element2").shadowRoot;
      const msg = gshadowRoot.getElementById('proceed-option2')
      // button.parentNode.removeChild(button)
      const que_msg = document.createElement("div");
      que_msg.innerHTML = "Please Wait..."; // You can customize the message here
      // Replace the button with the "Thank you" message
      msg.parentNode.replaceChild(que_msg, msg);
      appendMessage2(
        "<b>Your session is terminated. You can restart again!</b>"
      );
      
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

  if (mcqQustionIndexStt != globalQuestionLengthStt) {
    // updating question
    console.log("currentquestionidex", mcqQustionIndexStt);
    console.log(`Story ${responseOptionStt}`);

    const matchingQuestionsStt =
      globalQuestionDataStt.results[0].questions.filter(
        (question) => question.mcq_path === `Story ${responseOptionStt}`
      );

    const qUid = matchingQuestionsStt.map((question) => question.uid)[0];
    const mcqOptionsStt = matchingQuestionsStt.map(
      (question) => question.mcq_options
    )[0];
    const optionName = Object.keys(mcqOptionsStt);
    const questionText = matchingQuestionsStt.map(
      (question) => question.question
    )[0];

    const newOption1NameStt = optionName[0];
    const newOption2NameStt = optionName[1];
    const newOption1TextStt = mcqOptionsStt[newOption1NameStt]["opt"];
    const newOption2TextStt = mcqOptionsStt[newOption2NameStt]["opt"];

    console.log(
      newOption1NameStt,
      newOption2NameStt,
      newOption1TextStt,
      newOption2TextStt
    );

    console.log("newquestionid", qUid, "session", test_attempt_session_id);

    formRadioStt = `
                  <div id='question-stt' style="font-size: 16px; margin-bottom: 20px; color: #333;" value="${qUid}:${test_attempt_session_id}"><b>Q. </b>${questionText}</div>
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
    const testResponse = await fetch(`${baseURL}/test-responses/`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${createBasicAuthToken(key, secret)}`,
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
            margin-bottom: -1rem;
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

     
    console.log("user logged in, so sending email");
    gShadowRoot2.getElementById(
      `mcq-option-stt-${mcqFormIdStt}`
    ).innerHTML = `<b>That's it! Thank you for participating in the  interaction.</b>`;
    
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
    const res = await fetch(`${baseURL2}/test-attempt-sessions/check-session-data-exist/?session_id=${test_attempt_session_id}`, {
      method: "GET",
      headers: {
        Authorization: `Basic ${createBasicAuthToken2(key2, secret2)}`,
        "Content-Type": "application/json",
      },
    });

    const isCheck = await res.json()
    console.log(isCheck)

    if (!isCheck.check){
      console.log('failed to save session data', isCheck)
      if (testType2 === "mcq") {
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
      
      appendMessage2("<p style='font-size: 14px;color: #991b1b;'><b>Unfortunately due to technical reasons, your earlier response could not be processed. The session will be terminated. Please try again.</b>.</p>")
      
      return;
    }

    if (!window.user) {
      console.log("user not logged in, so asking for credentials");
      gShadowRoot2.getElementById(`mcq-option-stt-${mcqFormIdStt}`).innerHTML =
        credentialsForm2;
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

function sendEmail2() {
  // responsesDone = false;
  console.log("sending email");
  const queryParams22 = new URLSearchParams({
    test_attempt_session_id: sessionId2,
    report_url: globalReportUrl2,
    is_whatsapp: false,
  });

  fetch(
    `${baseURL2}/test-attempt-sessions/send-report-email/?${queryParams22}`,
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
      emailSent2 = data.status;
      console.log("email sent");
    })
    .catch((err) => console.log(err));
}

async function submitEmailAndName2() {
  const shadowRoot2 = document.getElementById("chat-element2").shadowRoot;

  if (!window.user) {
    const inputNameVal2 = shadowRoot2.getElementById("input-name2").value;
    const inputEmailVal2 = shadowRoot2.getElementById("input-email2").value;
    inputName2 = inputNameVal2;
    inputEmail2 = inputEmailVal2;

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
      sendEmail2();
      // append custom message to chat
      const message2 = `<b>It's showtime ✨, here is your detailed <a target="_blank" style="color: #3b82f6;text-decoration:none;" href="${globalReportUrl2}">feedback report</a>. The feedback is also emailed to you and will be available to you for 60 days.</b>`;

      //* send message to start new session
      if (!user2) {
        appendMessage2(message2);
        appendMessage2(
          "<b>Please enter another access code to start a new interaction.</b>"
        );
      } else {
        globalSignals.onResponse({
          html: "<b>Please enter another access code to start a new interaction.</b>",
        });
      }
      const recommDiv =findRelatedItemsStt(recommendationsDataStt,testCode2)
      if (recommDiv){
        appendMessage2(recommDiv)
      }
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

function handleSurpriseMeButtonClick2() {
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
  console.log("surprise me! button clicked");

  const randomIndex2 = Math.floor(Math.random() * challenges2.length);
  const randomChallenge2 = challenges2[randomIndex2];

  //   console.log(randomChallenge);
  //   testCode = randomChallenge.test_code;
  //   codeAvailabilityUserChoice = true;
  console.log("random challenge :==>", randomChallenge2);
  testCode2 = randomChallenge2.trim()

  gShadowRoot2 = document.getElementById("chat-element2").shadowRoot;
  // gShadowRoot2.getElementById("surprise-button").disabled = true;

  // removing button 
  const msg = gShadowRoot2.getElementById('surprise-button')
  // button.parentNode.removeChild(button)
  const que_msg = document.createElement("div");
  que_msg.innerHTML = "Please Wait..."; // You can customize the message here
  // Replace the button with the "Thank you" message
  msg.parentNode.replaceChild(que_msg, msg);

  gShadowRoot2.getElementById("text-input").focus();
  setTimeout(() => {
    gShadowRoot2.getElementById("text-input").textContent = sampleTestCodesStt[randomChallenge2];
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
        class="chat-icon2"
        style="height: 100%; width: 100%; border-radius:40%;"
        src="https://cdn.statically.io/gh/falahh6/coachbots/main/coachbot-logo-bot.png"
        alt="chat-bot-image"
      />
    </button>
  </div>
  
  <div
    class="chat-container2" 
    id="chat-container2"
    style="
      position: fixed;
      scale: 0;
      bottom: 6rem;
      width: 80vw;
      left: 6rem; 
      transition: 0.4s ease-in-out; 
      transform-origin: left bottom;
      padding-bottom: 0.8rem;
      border-radius: 1rem 1rem 1rem 0rem;
      box-shadow: 0px 0px 10px rgb(196, 196, 196);
      background-color: white;
      z-index: 999;
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
      right : 1rem;
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
      displayLoadingBubble = "false";
      demo="true"
      style="border: none"
      textInput='{
        "placeholder": {"text": "Welcome, Please follow provided instructions."}
      }'
      speechToText='{
        "webSpeech": true,
        "commands": {"resume": "resume", "submit" : "submit", "settings": {"commandMode": "hello"}},
        "button": {"position": "outside-left"}
      }'
      >
    </deep-chat>
  </div>
  `;

  const chatContainer2 = document.getElementById("chat-container2");
  const chatElementRef2 = document.getElementById("chat-element2");
  const chatIconContainer2 = document.getElementById("chat-icon2");
  const chatbotHeading2 = document.getElementById("chatbot-heading2");
  const closeFromTopp2 = document.getElementById("close-top2");

  //responsive styles for phones
  if (window.innerWidth < 600) {
    chatContainer2.style.width = "80vw";
    chatContainer2.style.left = "3rem";
    chatContainer2.style.height = "70vh";
    chatElementRef2.style.height = "500px";
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
            margin-bottom: -1rem;
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

  chatElementRef2.initialMessages = [
    {
      html: `<p><b>Welcome to Coachbots. Do you have access code for your simulation? (Hint : Try samples on the page!)</b>
      </p>`,
      role: "ai",
    },
    {
      html: `<div class="deep-chat-temporary-message"><button class="deep-chat-button deep-chat-suggestion-button" style="border: 1px solid green">Yes</button>
        <button class="deep-chat-button deep-chat-suggestion-button" style="border: 1px solid #d80000">No</button> </div>`,
      role: "user",
    },
  ];

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
        if (rule === 'my_lib'){
          return resp_json["data"][rule]
        }else {
          return resp_json["data"][rule].split(",");
        }
      } catch (error) {
        return [];
      }
    } catch (error) {
      console.error(`Error in getTestPrevilage: ${error}`);
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
      return resp_json.check
      
      
    } catch (error) {
      console.error(`Error in SessionCheckStt: ${error}`);
    }
  };

  //No condition STT pending
  chatElementRef2.request = {
    handler: async (body, signals) => {
      try {
        if (body instanceof FormData) {
        } else {
          // TEXT RESPONSES
          globalSignals = signals;
          // to check session active or not
          
          // get latest message
          const latestMessage = body.messages[body.messages.length - 1].text;
          if (isProceedStt === 'false' && latestMessage.toUpperCase() != 'STOP' ){

            signals.onResponse({
            html:"<p style='font-size: 14px;color: #991b1b;'>Not allowed! choose option to continue. </p>"})
            return;
          }

          if (testType === 'mcq' && latestMessage.toUpperCase() != 'STOP'){
            signals.onResponse({
              html : "<p style='font-size: 14px;color: #991b1b;'>Not allowed! choose option to continue. </p>"
            })
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

          if (
            body.messages[0].text.toUpperCase() === "STOP" 
          ) {
            await cancelTestStt(participantId2); // cancelling session
            if (testType2 === "mcq") {
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
            if (isProceedStt === 'false'){
              const gshadowRoot =
                document.getElementById("chat-element2").shadowRoot;
                const msg = gshadowRoot.getElementById('proceed-option2')
                // button.parentNode.removeChild(button)
                const que_msg = document.createElement("div");
                que_msg.innerHTML = "Thank You"; // You can customize the message here
                // Replace the button with the "Thank you" message
                msg.parentNode.replaceChild(que_msg, msg);
            }

            resetAllVariablesStt(); //reseting variables
            signals.onResponse({
              html: "<b>Your session is terminated. You can restart again!</b>",
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
            const sampleTestCodesValues = Object.values(sampleTestCodesStt)
            sampleTestCodesValues.forEach((value) => {
              buttonTextArray.push(value.trim())

            });
            //end

            if (!buttonTextArray.includes(latestMessage)) {
              if (testType2 === "mcq") {
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
                if ((questionData2.results).length === 0){
                  signals.onResponse({
                    html: "<p style='font-size: 14px;color: #991b1b;'><b>Code is Invalid. Please enter a valid code.</b></p>",
                  });
                  return;
                }
                questionLength2 = questionData2.results[0].questions.length;
                testId2 = questionData2.results[0].uid;
                interactionMode2 = questionData2.results[0].interaction_mode;
                is_free2 = questionData2.results[0].is_free;
                senarioDescription2 = questionData2.results[0].description;
                senarioTitle2 = questionData2.results[0].title;
                senarioMediaDescription2 =
                  questionData2.results[0].description_media;
                testUIInfoStt = questionData2.results[0].ui_information;
                console.log(senarioMediaDescription2);
  
                testType2 = questionData2.results[0].test_type;
                orch_details2 =
                  questionData2.results[0].orchestrated_conversation_details;
                clientNameStt = questionData2.results[0].client_name;
                isTestSignedInStt = questionData2.results[0].is_logged_in;
  
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

                  const group_list = ['Demo','free','Free']
                  const my_lib = await getTestCodesByRule2('my_lib');
                  for (const item of my_lib) {
                    if (item.emails.includes(user2.email)) {
                        group_list.push(item.group);
                    }
                  }

                  if (!group_list.includes(clientNameStt)){  // clientName Demo means Free type test
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

                  if (isTestSignedInStt){
                    signals.onResponse({
                      html: "<b>You are not allowed to attempt this interaction. Please check if you are logged in with the correct account and if your access code is correct. Contact the administrator if you face problems, via the help widget.</b>",
                    });
                    return;
                  }
                  const group_list = ['Demo','free','Free']
                  if (!group_list.includes(clientNameStt)){
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
                    if (testType2 === "mcq") {
                      questionText2 =
                        questionData2.results[0].questions[questionIndex2]
                          .question;
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
                      questionText2 =
                        questionData2.results[0].questions[questionIndex2]
                          .question;
                    }
                  }
                  console.log(questionText2);
                  if (questionIndex2 === 0) {
                    initialQuestionTextStt = questionText2
                    isProceedStt = 'false'
                    questionText2 = `
                    <div id="proceed-option2" >
                    <b>Proceed ?</b>
                        <button style="margin-top:5px; width:100%; padding:6px 4px; border: 1px solid lightgray; border-radius: 4px;" onclick="handleProceedClickStt('Yes')">Yes</button>
                        <button style="margin-top:5px; width:100%; padding:6px 4px; border: 1px solid lightgray; border-radius: 4px;" onclick="handleProceedClickStt('No')">No</button>
                    </div>`
                    if (senarioMediaDescription2 !== null) {
                      let embeddingUrl2 = "";
                      if (senarioMediaDescription2.length > 0) {
                        if (senarioMediaDescription2.includes("youtube.com")) {
                          const videoId =
                            senarioMediaDescription2.split("v=")[1];
                          embeddingUrl2 = `https://www.youtube.com/embed/${videoId}`;
                        } else if (
                          senarioMediaDescription2.includes("vimeo.com")
                        ) {
                          const videoId = senarioMediaDescription2
                            .split("/")
                            .pop();
                          embeddingUrl2 = `https://player.vimeo.com/video/${videoId}`;
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
                        }
                        if (!senarioMediaDescription2.includes("twitter.com")) {
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
                        }
                      } else {
                        appendMessage2(
                          `▪ Title : ${senarioTitle2} <br><br>
                             ▪ Description : ${senarioDescription2} <br><br>
                             ▪ Instructions : Response should be at least 15 words.`
                        );
                      }
                      const linkPattern = /(http[s]?:\/\/[^\s]+)/;
                      const is_link = linkPattern.test(questionText2);

                      if (is_link) {
                        console.log(questionText2);
                        let embeddingUrl = "";
                        if (questionText2.length > 0) {
                          if (questionText2.includes("youtube.com")) {
                            const videoId = questionText2.split("v=")[1];
                            embeddingUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
                          } else if (questionText2.includes("vimeo.com")) {
                            const videoId = questionText2.split("/").pop();
                            embeddingUrl = `https://player.vimeo.com/video/${videoId}?autoplay=1&loop=1`;
                          } else if (questionText2.includes("twitter.com")) {
                            embeddingUrl = `https://twitframe.com/show?url=${questionText2}`;
                          }

                          questionText2 = questionText2.replace(
                            /(http[s]?:\/\/[^\s]+)/g,
                            ""
                          );

                          questionText2 = `▪ Media <br>  <iframe
                                          allow="autoplay; encrypted-media; fullscreen;"
                                          style="width: 100%; border-radius: 8px; min-height: 50vh; min-width: 50vw;"
                                          src=${embeddingUrl}
                                          frameborder="0"
                                          allowfullscreen
                                        >
                        `;
                        }
                      }
                      signals.onResponse({
                        html: questionText2,
                      });
                    } else {
                      const linkPattern = /(http[s]?:\/\/[^\s]+)/;
                      const is_link = linkPattern.test(questionText2);

                      if (is_link) {
                        console.log(questionText2);
                        let embeddingUrl = "";
                        if (questionText2.length > 0) {
                          if (questionText2.includes("youtube.com")) {
                            const videoId = questionText2.split("v=")[1];
                            embeddingUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
                          } else if (questionText2.includes("vimeo.com")) {
                            const videoId = questionText2.split("/").pop();
                            embeddingUrl = `https://player.vimeo.com/video/${videoId}?autoplay=1&loop=1`;
                          } else if (questionText2.includes("twitter.com")) {
                            embeddingUrl = `https://twitframe.com/show?url=${questionText2}`;
                          }

                          questionText2 = questionText2.replace(
                            /(http[s]?:\/\/[^\s]+)/g,
                            ""
                          );

                          questionText2 = `▪ Media <br>  <iframe
                                          allow="autoplay; encrypted-media; fullscreen;"
                                          style="width: 100%; border-radius: 8px; min-height: 50vh; min-width: 50vw;"
                                          src=${embeddingUrl}
                                          frameborder="0"
                                          allowfullscreen
                                        >
                        `;
                        }
                      }
                      signals.onResponse({
                        html: questionText2,
                        text: ` ▪ Title : ${senarioTitle2} \n\n  ▪ Description : ${senarioDescription2} \n\n ▪ Instructions : Response should be at least 15 words.`,
                      });
                    }
                  } else {
                    if (
                      testType2 != "orchestrated_conversation" &&
                      testType2 != "dynamic_discussion_thread"
                    ) {
                      const linkPattern = /(http[s]?:\/\/[^\s]+)/;
                      const is_link = linkPattern.test(questionText2);

                      if (is_link) {
                        console.log(questionText2);
                        let embeddingUrl = "";
                        if (questionText2.length > 0) {
                          if (questionText2.includes("youtube.com")) {
                            const videoId = questionText2.split("v=")[1];
                            embeddingUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
                          } else if (questionText2.includes("vimeo.com")) {
                            const videoId = questionText2.split("/").pop();
                            embeddingUrl = `https://player.vimeo.com/video/${videoId}?autoplay=1&loop=1`;
                          } else if (questionText2.includes("twitter.com")) {
                            embeddingUrl = `https://twitframe.com/show?url=${questionText2}`;
                          }

                          questionText2 = questionText2.replace(
                            /(http[s]?:\/\/[^\s]+)/g,
                            ""
                          );

                          questionText2 = `▪ Media <br>  <iframe
                                          allow="autoplay; encrypted-media; fullscreen;"
                                          style="width: 100%; border-radius: 8px; min-height: 50vh; min-width: 50vw;"
                                          src=${embeddingUrl}
                                          frameborder="0"
                                          allowfullscreen
                                        >
                        `;
                        }
                      }
                      signals.onResponse({
                        html: questionText2,
                      });
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
                  questionId2 =
                    questionData2.results[0].questions[questionIndex2 - 1].uid;

                  questionIndex2++;

                  const response = await fetch(`${baseURL2}/test-responses/`, {
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
                  });
                  const responseData = await response.json();
                  resQuestionNumber2 = responseData.question.question_number;

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

                      resQuestionNumber2 = qRespnse2.question.question_number;
                    }
                  }
                }

                if (resQuestionNumber2 != questionLength2) {
                  if (
                    testType2 === "orchestrated_conversation" ||
                    testType2 === "dynamic_discussion_thread"
                  ) {
                    signals.onResponse({
                      text: questionText2,
                    });
                  }
                }

                userResponse2 = "";

                if (questionIndex2 === 0) {
                  questionIndex2++;
                }
                if (resQuestionNumber2 === questionLength2) {
                  responsesDone2 = true;

                  const isCheckStt = await SessionCheckStt(sessionId2)
                  if (!isCheckStt){
                    console.log('failed to populate session data', isCheckStt)
                    if (testType2 === "mcq") {
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
                    signals.onResponse({
                      html: credentialsForm2,
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
                  }

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
              if (testType2 === "mcq") {
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
        if (testType2 === "mcq") {
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
    chatContainer2.style["transform-origin"] = "0% 100%";
  } else {
    chatContainer2.style.scale = 1;
    chatContainer2.style["transform-origin"] = "100% 0%";

    //to close other bot
    const chatContainer = document.getElementById("chat-container");
    chatContainer.style.scale = 0;
    chatContainer.style["transform-origin"] = "100% 100%";
    const chatIcon = document.getElementsByClassName("chat-icon")?.[0];
    chatIcon.src =
      "https://cdn.statically.io/gh/falahh6/coachbots/main/coachbot-logo-bot.png";
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
  chatContainer2.style["transform-origin"] = "0% 100%";

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
