const key2 = "";
const secret2 = "";
const baseURL2 = "https://coach-api-gcp.coachbots.com/api/v1";

let sessionId2 = "";
let userId2 = "";
let userRole2;
let participantId2;
let testCode2;
let ipAddress2;
let user2;
let codeAvailabilityUserChoice2 = false;
let optedNo2 = false;

let gShadowRoot2;
let globalReportUrl2 = "";

//audio configs
let display_name2;
let content_type2;

let inputName2 = "";
let inputEmail2 = "";

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
  const messageNode = createMessageNode(message2);
  gShadowRoot2.getElementById("messages").appendChild(messageNode);
  gShadowRoot2.getElementById("messages").scrollBy(0, 100);
}

let queryParams2;
async function submitEmailAndName2() {
  const shadowRoot2 = document.getElementById("chat-element2").shadowRoot;

  if (!user2) {
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
      email: user2.email,
      name: user2.given_name,
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
      // append custom message to chat
      const message2 = `It's showtime ✨, here is your detailed <a target="_blank" style="color: #3b82f6;text-decoration:none;" href="${globalReportUrl2}">feedback report</a>. The feedback is also emailed to you and will be available to you for 60 days.`;
  
      appendMessage2(message2);
    })
    .catch((err) => {
      console.log(err);
    });
  const queryParams22 = new URLSearchParams({
    test_attempt_session_id: sessionId2,
    report_url: globalReportUrl2,
    is_whatsapp: false,
  });
  await fetch(
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
    })
    .catch((err) => console.log(err));
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

async function handleOptionButtonClick2(labelText, area, information) {
  console.log("button clicked in stt", labelText, area, information);
  optedNo = true;

  gShadowRoot2 = document.getElementById("chat-element").shadowRoot;
  gShadowRoot2.getElementById("text-input").focus();
  gShadowRoot2.getElementById("text-input").textContent = labelText;
  gShadowRoot2.querySelector(".input-button").click();

  const url = new URL(
    `${baseURL2}/tests/get_or_create_test_scenarios_by_site/`
  );
  const params = new URLSearchParams();
  params.set("mode", "A");
  params.set("area", area);
  params.set("information", information);
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
      "https://unpkg.com/deep-chat@1.4.0/dist/deepChat.bundle.js"
    );
  } catch (error) {
    console.error("Error loading external module:", error);
  }
}

// Call the function to load and use the external module2
loadExternalModule().then(() => {
  let deepChatPocElement2 =
    document.getElementsByClassName("deep-chat-poc2")?.[0];
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
        src="https://cdn.statically.io/gh/falahh6/coachbots/main/coachbots-logo-bot.png"
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
      width: 400px;
      left: 6rem; 
      transition: 0.4s ease-in-out; 
      transform-origin: left bottom;
      padding-bottom: 0.8rem;
      border-radius: 1rem 1rem 1rem 0rem;
      box-shadow: 0px 0px 10px rgb(196, 196, 196);
      background-color: white;
      z-index: 999;
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
    <h3 style="
      font-size: 16px;
      font-weight: 500;
      line-height: 16px;
      margin-left: 8px;
    ">Welcome to the Coachbots simulator.</h1>
    </div>
    <deep-chat
      id="chat-element2"
      style="height:450px; width: 400px; border:none;"
      messageStyles='{
        "default": {
          "shared": {"bubble": {"maxWidth": "80%", "marginTop": "4px"}}
        }
      }'
      displayLoadingBubble = "false";
      demo="true"
      style="border: none"
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

  //responsive styles for phones
  if (window.innerWidth < 600) {
    chatContainer2.style.width = "80vw";
    chatContainer2.style.left = "3rem";
    chatContainer2.style.height = "60vh";
    chatElementRef2.style.height = "52vh";
    chatElementRef2.style.width = "80vw";
    chatIconContainer2.style.position = "fixed";
    chatIconContainer2.style.width = "3rem";
    chatIconContainer2.style.height = "3rem";
    chatContainer2.style.position = "fixed";
  }

  let questionText2 = "";
  let reportType2 = "interactionSessionReport";
  let questionIndex2 = 0;
  let questionId2;
  let userResponse2;
  let reportUrl2 = "";

  let testId2;
  let resQuestionNumber2;
  let questionLength2;
  let questionData2;
  let senarioDescription2;
  let senarioTitle2;
  let responsesDone2 = false;
  let userName2 = "";
  let userEmail2 = "";
  let is_free2;
  let testCodeList2;
  let isRepeatStatus2;
  let testPrevilage2;


  const credentialsForm2 = `<div id="input-form2">
  <div style="display: flex; flex-direction: column">
      <label for="name" style="margin: 4px 0">Name  </label>
      <input  
      type="text"
      id="input-name2"
      style="
          padding: 8px;
          margin-bottom:4px;
          border-radius: 4px;
          border: 1px solid rgb(188, 188, 188);
      "
      />
  </div>
  <div style="display: flex; flex-direction: column; margin-top: 8px">
      <label for="email" style="margin: 4px 0">Email </label>
      <input
      type="email"
      id="input-email2"
      style="
      padding: 8px;
      margin-bottom:4px;
      border-radius: 4px;
      border: 1px solid rgb(188, 188, 188);
      "
      />
      <button
      style="
          margin-top: 8px;
          padding: 8px 12px;
          width: fit-content;
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

  chatElementRef2.initialMessages = [
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
  
      testCodeList2 = responseJson['data']['codes'];
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

  const getTestCodesByRule2 = async (rule) =>{
    const url = `${baseURL2}/accounts/get-test-codes-for-web/`
  
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
        return resp_json['data'][rule].split(',')
      }catch (error) {
        return []
      }
  
    } catch (error) {
      console.error(`Error in getTestPrevilage: ${error}`);
    }
  };
  
  

  //No condition STT pending
  chatElementRef2.request = {
    handler: async (body, signals) => {
      try {
        if (body instanceof FormData) {
        } else {
          // TEXT RESPONSES
          const userAcessAvailability2 = body.messages[0].text;
          if (userAcessAvailability2 === "Yes") {
            signals.onResponse({
              text: "Please enter the access code to get started.",
            });
          } else if (userAcessAvailability2 === "No") {
            optedNo2 = true;
            signals.onResponse({
              text: "No problem , here are a few samples you can try out (Experimental):",
              html: `
                              <div id="option-button-container" >
                              <button style="margin-top:5px; width:100%; padding:6px 4px; border: 1px solid lightgray; border-radius: 4px;" onclick="handleOptionButtonClick2('Integrating a New Team Member')">Integrating a New Team Member</button>
                      
                      
                              <button style="margin-top:5px; width:100%; padding:6px 4px; border: 1px solid lightgray; border-radius: 4px;"  onclick="handleOptionButtonClick2('Effective Customer Service Management')">Effective Customer Service Management</button>
                      
                      
                              <button style="margin-top:5px; width:100%; padding:6px 4px; border: 1px solid lightgray; border-radius: 4px;"  onclick="handleOptionButtonClick2('Cultivating Growth Through Feedback')">Cultivating Growth Through Feedback</button>
                      
                      
                              <button style="margin-top:5px; width:100%; padding:6px 4px; border: 1px solid lightgray; border-radius: 4px;"  onclick="handleOptionButtonClick2('Cultivating Team Impartiality')">Cultivating Team Impartiality</button>
                      
                      
                              <button style="margin:5px 0; width:100%; padding:6px 4px; border: 1px solid lightgray; border-radius: 4px;"  onclick="handleOptionButtonClick2('Managing Meeting Momentum')">Managing Meeting Momentum</button>
                          </div>
                                      `,
            });
            return;
          }

          if (
            body.messages[0].text === "STOP" ||
            body.messages[0].text === "stop"
          ) {
            signals.onResponse({
              text: "Your session is terminated. The page will refresh. And then you can restart again!",
            });
            setTimeout(() => {
              window.location.reload();
            }, 2000);
            return;
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
            } else {
              appendMessage2("Please wait while we are processing ...");
              //wait while test code is being processed
              while (!codeAvailabilityUserChoice2) {
                await new Promise((resolve) => setTimeout(resolve, 500));
              }
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
              questionLength2 = questionData2.results[0].questions.length;
              testId2 = questionData2.results[0].uid;
              interactionMode2 = questionData2.results[0].interaction_mode;
              is_free2 = questionData2.results[0].is_free;
              senarioDescription2 = questionData2.results[0].description;
              senarioTitle2 = questionData2.results[0].title;

              testType2 = questionData2.results[0].test_type;
              orch_details2 =
                questionData2.results[0].orchestrated_conversation_details;
              if (questionIndex2 === 0) {
                //signed user rules

                if (user2){
                  // const signedUserTestCode = await getTestCodesByRule('signed_user')
                  // if (!signedUserTestCode.includes(testCode) ){
                  //   signals.onResponse({
                  //     text: 'not allowed'
                  //   })
                  const companyName = user2.email.split('@')[1].split('.')[0]
                  const companyTestCode = await getTestCodesByRule2(companyName)
                  console.log(companyName)
                  if (companyTestCode.length > 0){
                    if (!companyTestCode.includes(testCode2)){
                      signals.onResponse({
                        text: 'You are not allowed to attempt this test.'
                      })
                    }
                  }

                  }else{

                  const unSignedUserTestCode = await getTestCodesByRule2('unsigned_user')
                  if (unSignedUserTestCode.length > 0){
                    if (!unSignedUserTestCode.includes(testCode2) ){
                      signals.onResponse({
                        text: 'You are not allowed to attempt this test.'
                      })
                    }
                  }
                }


                // restriction check like monthly test allowed start
                await getAttemptedTestList2(participantId2)
                await getIsRepeatStatus2(participantId2)
                await getTestPrevilage2(participantId2)

                if (isRepeatStatus2['monthly_remaining_tests'] < 1) {
                  signals.onResponse({
                    text: "You have reached your monthly limit. Please contact your coach/administrator to get more simulations."
                  })
                  return;
                }
                
                // Test privilege
                if (testPrevilage2 && testPrevilage2.active && !testPrevilage2.data.includes(testCode2)) {
                  signals.onResponse({
                    text: "You are not allowed to attempt this test."
                  })
                  return;
                }
                
                // User cannot attempt the test more than once if it is active
                console.log(userRole2)
                if (userRole2 && userRole2 !== "admin") {
                  if (!isRepeatStatus2.is_repeat && testCodeList2.includes(testCode2)) {
                    signals.onResponse({
                      text: "You are not allowed to attempt this interaction again."
                    })
                    return;
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
                } catch (err) {
                  console.log(err);
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
                    questionText2 =
                      questionData2.results[0].questions[questionIndex2]
                        .question;
                  }
                  console.log(questionText2);
                  if (questionIndex2 === 0) {
                    signals.onResponse({
                      html: questionText2,
                      text: ` ▪ Title : ${senarioTitle2} \n\n  ▪ Description : ${senarioDescription2} \n\n ▪ Instructions : Audio/Video Messages should be atleast 15 secs long.`,
                    });
                  } else {
                    if (testType2 != 'orchestrated_conversation' && testType2 != 'dynamic_discussion_thread' ){
                      signals.onResponse({
                        text: questionText2,
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
                  messageText.innerHTML = `That's it! Thank you for participating in the  interaction. ${
                    user2 ? "" : " Hang tight for next steps"
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
                          email: user2 ? user2.email : "test@test.com",
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
                                email: user2 ? user2.email : "test@test.com",
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
                  if (testType2 === "orchestrated_conversation" || testType2 ==='dynamic_discussion_thread') {
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

                  if (!user2) {
                    signals.onResponse({
                      text: "For obtaining your report, please submit the following details.",
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

                  const reportData = await reportResponse.json();
                  reportUrl2 = reportData.url;
                  globalReportUrl2 = reportUrl2;
                  if (reportData) {
                    responsesDone2 = true;
                  }

                  if (user2) {
                    submitEmailAndName2();
                  }
                }
              }
            } catch (err) {
              console.log(err)
              if (!isTestcodeValid2 && body.messages[0].text !== "STOP") {
                signals.onResponse({
                  html: "<p style='font-size: 14px;color: #991b1b;'>Code is Invalid. Please enter a valid code.</p>",
                });
              } else if (body.messages[0].text !== "STOP") {
                signals.onResponse({
                  html: "<p style='font-size: 14px;color: #991b1b;'>Error Processing your response.</p>",
                });
              }
            }
          }
        }
      } catch (e) {
        console.log(e)
        signals.onResponse({
          error:
            "Your response could not be processed due to technical reasons, please refresh the page and try again. ",
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

  // 2 - account creation
  fetch(`${baseURL2}/accounts/`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basicAuthToken2}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_context: {
        name: user2 ? user2.given_name : "newUser-1",
        role: "member",
        user_attributes: {
          tag: "deepchat_profile",
          attributes: {
            username: "web_user",
            email: user2 ? user2.email : "test@test.com",
          },
        },
      },
      identity_context: {
        identity_type: "deepchat_unique_id",
        value: `user_name=${user2 ? user2.given_name : ipAddress}`,
      },
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      participantId2 = data.uid;
      userId2 = data.uid;
      userRole2 = data.role;
      console.log(data);
    })
    .catch((err) => console.log(err));

  if (chatContainer2.style.scale === "1") {
    chatContainer2.style.scale = 0;
    chatContainer2.style["transform-origin"] = "0% 100%";
  } else {
    chatContainer2.style.scale = 1;
    chatContainer2.style["transform-origin"] = "100% 0%";
  }

  if (
    chatIcon2.src ===
    "https://cdn.statically.io/gh/falahh6/coachbots/main/coachbots-logo-bot.png"
  ) {
    chatIcon2.src =
      "https://cdn.statically.io/gh/falahh6/coachbots/main/close-btn.png";
  } else {
    chatIcon2.src =
      "https://cdn.statically.io/gh/falahh6/coachbots/main/coachbots-logo-bot.png";
  }
};
