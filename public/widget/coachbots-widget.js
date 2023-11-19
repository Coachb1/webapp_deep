const key = "";
const secret = "";
const baseURL = "https://coach-api-gcp.coachbots.com/api/v1";
// const baseURL = 'http://127.0.0.1:8001/api/v1'

let sessionId = "";
let userId = "";
let participantId;
let testCode;
let ipAddress;
let optedNo = false;
let codeAvailabilityUserChoice = false;

//audio configs
let display_name;
let content_type;
let audioFile;
let audioFileSrc = "";

let inputName = "";
let inputEmail = "";
let globalReportUrl = "";
let gShadowRoot;

function createBasicAuthToken(key = "", secret = "") {
    const token =
        "Yzc3MjFmZGItYTllMC00YTYxLWEzMTYtNDRhODA1N2VkMjY0OjhjNWNlZWZlLTY2Y2QtNDliZi04MTY5LTBhNjMwMmU5NmZlMA==";
    // const token =
    //     "MzdkMGVkNzgtOTI5Ni00MWQwLTk1NjgtYjdjZTBhYjA2OTY5Ojk1ZGIxNTNkLWEzZWMtNDM0Zi05YjIwLTc0M2M3M2Q5ZDZkYg=="; // local
    return token;
}

function createMessageNode(message) {
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

function appendMessage(message) {
    gShadowRoot = document.getElementById("chat-element").shadowRoot;
    const messageNode = createMessageNode(message);
    gShadowRoot.getElementById("messages").appendChild(messageNode);
    gShadowRoot.getElementById("messages").scrollBy(0, 100);
}

async function submitEmailAndName() {
    gShadowRoot = document.getElementById("chat-element").shadowRoot;
    const inputNameVal = gShadowRoot.getElementById("input-name").value;
    const inputEmailVal = gShadowRoot.getElementById("input-email").value;

    inputName = inputNameVal;
    inputEmail = inputEmailVal;

    const queryParams = new URLSearchParams({
        participant_id: participantId,
        email: inputEmail,
        name: inputName,
    });
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
            credsUpdated = data.status;

            // append custom message to chat
            const message = `It's showtime ✨, here is your detailed <a target="_blank" style="color: #3b82f6;text-decoration:none;" href="${globalReportUrl}">feedback report</a>. The feedback is also emailed to you and will be available to you for 60 days.`;
            appendMessage(message);

            // const messageNode = createMessageNode(
            //     `It's showtime ✨, here is your detailed <a target="_blank" style="color: #3b82f6;text-decoration:none;" href="${globalReportUrl}">feedback report</a>. The feedback is also emailed to you and will be available to you for 60 days.`
            // );

            // gShadowRoot.getElementById("messages").appendChild(messageNode);
            // gShadowRoot.getElementById("messages").scrollBy(0, 100);
        })
        .catch((err) => {
            console.log(err);
        });
    const queryParams2 = new URLSearchParams({
        test_attempt_session_id: sessionId,
        report_url: globalReportUrl,
        is_whatsapp: false,
    });

    await fetch(
        `${baseURL}/test-attempt-sessions/send-report-email/?${queryParams2}`,
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
            emailSent = data.status;
        })
        .catch((err) => console.log(err));
}

const optionDetail = [
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

async function handleOptionButtonClick(labelText, area, information) {
    console.log("button clicked", labelText, area, information);
    optedNo = true;

    gShadowRoot = document.getElementById("chat-element").shadowRoot;
    gShadowRoot.getElementById("text-input").focus();
    gShadowRoot.getElementById("text-input").textContent = labelText;
    gShadowRoot.querySelector(".input-button").click();

    const url = new URL(
        `${baseURL}/tests/get_or_create_test_scenarios_by_site/`
    );
    const params = new URLSearchParams();
    params.set("mode", "A");
    params.set("area", area);
    params.set("information", information);
    params.set(
        "url",
        "https://www.tutorialspoint.com/learn-python-full-course-for-beginners-from-basics-to-advance-urdu-hindi/index.asp?gclid=Cj0KCQjwtJKqBhCaARIsAN_yS_m76CYKUpB-cgwWY07Db3Z_l9UC1jE9a4h0Fg9AMOQ4BcvyHD6hVu0aAurTEALw_wcB"
    );
    params.set("access_token", `Basic ${createBasicAuthToken(key, secret)}`);
    url.search = params;

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
            const challenges = data;
            const randomIndex = Math.floor(Math.random() * challenges.length);
            const randomChallenge = challenges[randomIndex];

            console.log(randomChallenge);
            testCode = randomChallenge.test_code;
            codeAvailabilityUserChoice = true;

            // gShadowRoot = document.getElementById("chat-element").shadowRoot;
            // gShadowRoot.getElementById("text-input").focus();
            // gShadowRoot.getElementById("text-input").textContent = labelText;
            // gShadowRoot.querySelector(".input-button").click();
        })
        .catch((err) => console.log(err));

    // const challenges = [
    //     { title: "Take initiative", test_code: "QBEWUOM" },
    //     { title: "Mentor others", test_code: "Q2GGMFP" },
    //     { title: "Learn new skills", test_code: "QWLHI90" },
    //     { title: "Production Issues", test_code: "Q16EWL2" },
    //     { title: "Project timeline", test_code: "QLW2EVP" },
    // ];
    // const randomIndex = Math.floor(Math.random() * challenges.length);
    // const randomChallenge = challenges[randomIndex];

    // console.log(randomChallenge);
    // testCode = randomChallenge.test_code;

    // gShadowRoot = document.getElementById("chat-element").shadowRoot;
    // gShadowRoot.getElementById("text-input").focus();
    // gShadowRoot.getElementById("text-input").textContent = labelText;
    // gShadowRoot.querySelector(".input-button").click();
}

async function loadExternalModule() {
    try {
        const { DeepChat } = await import(
            // "https://unpkg.com/deep-chat@1.4.0/dist/deepChat.bundle.js"
            "https://storage.googleapis.com/aadil-devops-practice/deepchat-bundle.js"
        );
    } catch (error) {
        console.error("Error loading external module:", error);
    }
}

// Call the function to load and use the external module
loadExternalModule().then(() => {
    let deepChatPocElement =
        document.getElementsByClassName("deep-chat-poc")?.[0];
    deepChatPocElement.innerHTML = `
  <div class="chat-wrapper">
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
        border-radius: 50%;
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
        class="chat-icon"
        style="height: 100%; width: 100%; border-radius:50%;"
        src="https://cdn.statically.io/gh/falahh6/coachbots/main/coachbots-logo-bot.png"
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
      bottom: 6rem;
      width: 400px;
      right: 6rem;
      transition: 0.4s ease-in-out;
      transform-origin: 100% 100%;
      padding-bottom: 0.8rem;
      border-radius: 1rem 1rem 0rem 1rem;
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
      id="chat-element"
      style="height:450px; width: 400px; border:none;"
      microphone='true'
      messageStyles='{
        "default": {
          "shared": {"bubble": {"maxWidth": "80%", "marginTop": "4px" }}
        }
      }'
      demo="true"
      style="border: none"
      displayLoadingBubble="false"
      >
    </deep-chat>
  </div>
  `;
    const chatContainer = document.getElementById("chat-container");
    const chatElementRef = document.getElementById("chat-element");
    const chatIcon = document.getElementById("chat-icon");

    //responsive styles for phones
    if (window.innerWidth < 600) {
        chatContainer.style.width = "80vw";
        chatContainer.style.right = "3rem";
        chatContainer.style.height = "60vh";
        chatElementRef.style.height = "52vh";
        chatElementRef.style.width = "80vw";
        chatIcon.style.width = "3rem";
        chatIcon.style.height = "3rem";
        chatIcon.style.position = "fixed";
        chatContainer.style.position = "fixed";
    }

    let question = [];
    let questionIndex = 0;
    let questionId;
    let userResponse;
    let reportUrl = "";
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
    let responsesDone = false;
    let userName = "";
    let userEmail = "";
    let credsUpdated;

    const credentialsForm = `<div id="input-form">
  <div style="display: flex; flex-direction: column">
      <label for="name" style="margin: 4px 0">Name  </label>
      <input  
      type="text"
      id="input-name"
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
      id="input-email"
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
      id="submit-btn"
      onclick="submitEmailAndName()"
      >
      Submit
      </button>
  </div>
  </div>`;

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

    // set email and name
    const setNameEmail = async (inputEmail, inputName) => {
        const queryParams = new URLSearchParams({
            participant_id: participantId,
            email: inputEmail,
            name: inputName,
        });
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
                credsUpdated = data.status;
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // send email
    const sendEmail = async () => {
        const queryParams2 = new URLSearchParams({
            test_attempt_session_id: sessionId,
            report_url: reportUrl,
            is_whatsapp: false,
        });

        await fetch(
            `${baseURL}/test-attempt-sessions/send-report-email/?${queryParams2}`,
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
                emailSent = data.status;
            })
            .catch((err) => console.log(err));
    };

    const testResponseHandler = async (formdata, questionObj) => {
        const shadowRoot = document.getElementById("chat-element").shadowRoot;
        const players = shadowRoot.querySelectorAll(".audio-player");
        const targetPlayer = players[players.length - 1];
        targetPlayer.src = audioFileSrc;

        const uploadDocResponse = await fetch(`${baseURL}/documents/upload/`, {
            method: "POST",
            headers: {
                Authorization: `Basic ${createBasicAuthToken(key, secret)}`,
            },
            body: formdata,
        });

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
                        username: "web_user_" + ipAddress,
                        email: "test@test.com",
                    },
                },
            }),
        });

        const testResponseData = await testResponse.json();
        resQuestionNumber = testResponseData.question.question_number;

        return resQuestionNumber;
    };

    chatElementRef.request = {
        handler: async (body, signals) => {
            try {
                if (body instanceof FormData) {
                    //AUDIO RESPONSES
                    // let file = body.get("files");
                    let file = audioFile;

                    if (file.name.length === 0 || file.size === "") {
                        signals.onResponse({
                            html: "<p style='font-size: 14px;color: #991b1b;'>Your audio could not be processed. Please submit again.</p>",
                        });
                        return;
                    }

                    const formdata = new FormData();
                    formdata.append("owner_type", "user");
                    formdata.append("owner_id", userId);
                    formdata.append("display_name", file.name);
                    formdata.append("doc_type", "AUDIO_ANSWER");
                    formdata.append("file", file, file.name);
                    formdata.append("actions_pipeline[0]action", "transcribe");
                    formdata.append("actions_pipeline[0]context", "null");

                    if (questionIndex < questionLength) {
                        question.push(
                            questionData.results[0].questions[questionIndex]
                                .question
                        );

                        signals.onResponse({
                            text: question[questionIndex],
                        });
                    }

                    if (questionIndex === questionLength) {
                        const shadowRoot =
                            document.getElementById("chat-element").shadowRoot;
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
                        messageText.innerHTML = `That's it! Thank you for participating in the  interaction. Hang tight for next steps`;
                        messageBubble.appendChild(messageText);
                        messageNode.appendChild(messageBubble);
                        shadowRoot
                            .getElementById("messages")
                            .appendChild(messageNode);
                        shadowRoot.getElementById("messages").scrollBy(0, 100);
                    }

                    file = "";
                    if (questionIndex <= questionLength) {
                        questionIndex++;

                        try {
                            questionId =
                                questionData.results[0].questions[
                                    questionIndex - 2
                                ].uid;

                            const questionObj =
                                questionData.results[0].questions[
                                    questionIndex - 2
                                ];

                            // const resQuestionNumber =
                            await testResponseHandler(formdata, questionObj);

                            responseProcessedQuestion++;
                            responsesDone =
                                responseProcessedQuestion === questionLength;

                            signals.onResponse({
                                text: "Thank you for participating. For obtaining your report, please submit the following details.",
                                html: credentialsForm,
                            });

                            if (responseProcessedQuestion === questionLength) {
                                await fetch(
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
                                        body: JSON.stringify({
                                            user_id: participantId,
                                            report_type: is_free
                                                ? "summaryFeedbackReport"
                                                : "interactionSessionReport",
                                            session_id: sessionId,
                                            interaction_id: testId,
                                        }),
                                    }
                                )
                                    .then((response) => response.json())
                                    .then((data) => {
                                        reportUrl = data.url;
                                        globalReportUrl = reportUrl;
                                    });
                            }
                        } catch (error) {
                            console.log(error);
                            if (error) {
                                signals.onResponse({
                                    text: "<p style='font-size: 14px;color: #991b1b;'>There might be some error from our end. Please wait and try again later.</p>",
                                });
                            }
                        }
                    }
                } else {
                    // TEXT RESPONSES
                    const userAcessAvailability = body.messages[0].text;
                    if (userAcessAvailability === "Yes") {
                        signals.onResponse({
                            text: "Please enter the access code to get started.",
                        });
                    } else if (userAcessAvailability === "No") {
                        optedNo = true;
                        signals.onResponse({
                            text: "No problem , here are a few samples you can try out (Experimental):",
                            html: `
                            <div id="option-button-container" >
                            <button style="margin-top:5px" onclick="handleOptionButtonClick('Integrating a New Team Member')">Integrating a New Team Member</button>
                    
                    
                            <button style="margin-top:5px" onclick="handleOptionButtonClick('Effective Customer Service Management')">Effective Customer Service Management</button>
                    
                    
                            <button style="margin-top:5px" onclick="handleOptionButtonClick('Cultivating Growth Through Feedback')">Cultivating Growth Through Feedback</button>
                    
                    
                            <button style="margin-top:5px" onclick="handleOptionButtonClick('Cultivating Team Impartiality')">Cultivating Team Impartiality</button>
                    
                    
                            <button style="margin-top:5px" onclick="handleOptionButtonClick('Managing Meeting Momentum')">Managing Meeting Momentum</button>
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

                    let isTestcodeValid = true;
                    // const validTestCodes = [
                    //     "QU7G2X3",
                    //     "QPN48NO",
                    //     "QLW2EVP",
                    //     "Q16EWL2",
                    //     "QWLHI90",
                    //     "Q2GGMFP",
                    //     "QJ3RTFF",
                    //     "QBEWUOM",
                    // ];
                    if (
                        questionIndex === 0 &&
                        userAcessAvailability.length !== 0
                    ) {
                        if (optedNo === false) {
                            testCode = body.messages[0].text;
                        } else {
                            appendMessage(
                                "Please wait while we are processing ..."
                            );
                            //wait while test code is being processed
                            while (!codeAvailabilityUserChoice) {
                                await new Promise((resolve) =>
                                    setTimeout(resolve, 500)
                                );
                            }
                        }

                        codeAvailabilityUserChoice = true;

                        // isTestcodeValid = validTestCodes.find(
                        //     (code) => code === testCode
                        // );
                    }

                    if (questionIndex > 0 && !responsesDone) {
                        userResponse = body.messages[0].text;
                    }

                    if (
                        !responsesDone &&
                        userName.length === 0 &&
                        userEmail.length === 0 &&
                        codeAvailabilityUserChoice
                    ) {
                        try {
                            console.log("Test Code ==========>", testCode);
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
                            console.log(
                                "Question Data ==========>",
                                questionData
                            );
                            if (questionData.results.length === 0) {
                                isTestcodeValid = false;
                                signals.onResponse({
                                    html: "<p style='font-size: 14px;color: #991b1b;'>Code is Invalid. Please enter a valid code.</p>",
                                });
                            }
                            questionLength =
                                questionData.results[0].questions.length;
                            testId = questionData.results[0].uid;
                            interactionMode =
                                questionData.results[0].interaction_mode;
                            is_free = questionData.results[0].is_free;
                            senarioDescription =
                                questionData.results[0].description;
                            senarioTitle = questionData.results[0].title;

                            if (questionIndex === 0) {
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
                                                "Content-Type":
                                                    "application/json",
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
                                } catch (err) {
                                    console.log(err);
                                }
                            }

                            if (questionIndex <= questionLength) {
                                if (questionIndex < questionLength) {
                                    question.push(
                                        questionData.results[0].questions[
                                            questionIndex
                                        ].question
                                    );

                                    if (questionIndex === 0) {
                                        signals.onResponse({
                                            html: question[questionIndex],
                                            text: ` ▪ Title : ${senarioTitle} \n\n  ▪ Description : ${senarioDescription} \n\n ▪ Instructions : Audio/Video Messages should be atleast 15 secs long.`,
                                        });
                                    } else {
                                        signals.onResponse({
                                            text: question[questionIndex],
                                        });
                                    }
                                }
                                console.log(questionIndex === questionLength);
                                if (
                                    questionIndex === questionLength &&
                                    userResponse.length > 0
                                ) {
                                    const shadowRoot =
                                        document.getElementById(
                                            "chat-element"
                                        ).shadowRoot;
                                    const messageNode =
                                        document.createElement("div");
                                    messageNode.classList.add(
                                        "inner-message-container"
                                    );
                                    const messageBubble =
                                        document.createElement("div");
                                    messageBubble.classList.add(
                                        "message-bubble",
                                        "ai-message-text"
                                    );
                                    messageBubble.style.maxWidth = "80%";
                                    messageBubble.style.marginTop = "4px";
                                    const messageText =
                                        document.createElement("p");
                                    messageText.innerHTML = `That's it! Thank you for participating in the  interaction. Hang tight for next steps`;
                                    messageBubble.appendChild(messageText);
                                    messageNode.appendChild(messageBubble);
                                    shadowRoot
                                        .getElementById("messages")
                                        .appendChild(messageNode);
                                    shadowRoot
                                        .getElementById("messages")
                                        .scrollBy(0, 100);
                                }

                                if (questionIndex > 0) {
                                    questionId =
                                        questionData.results[0].questions[
                                            questionIndex - 1
                                        ].uid;

                                    questionIndex++;

                                    const response = await fetch(
                                        `${baseURL}/test-responses/`,
                                        {
                                            method: "POST",
                                            headers: {
                                                Authorization: `Basic ${createBasicAuthToken(
                                                    key,
                                                    secret
                                                )}`,
                                                "Content-Type":
                                                    "application/json",
                                            },
                                            body: JSON.stringify({
                                                test_attempt_session_id:
                                                    sessionId,
                                                question_id: questionId,
                                                response_text: userResponse,
                                                response_file: "",
                                                user_attributes: {
                                                    tag: "deepchat_profile",
                                                    attributes: {
                                                        username: "falah",
                                                        email: "test@test.com",
                                                    },
                                                },
                                            }),
                                        }
                                    );
                                    const responseData = await response.json();
                                    resQuestionNumber =
                                        responseData.question.question_number;
                                }

                                userResponse = "";

                                if (questionIndex === 0) {
                                    questionIndex++;
                                }

                                if (resQuestionNumber === questionLength) {
                                    responsesDone = true;

                                    signals.onResponse({
                                        text: "For obtaining your report, please submit the following details.",
                                        html: credentialsForm,
                                    });

                                    const reportResponse = await fetch(
                                        `${baseURL}/frontend-auth/get-report-url/`,
                                        {
                                            method: "POST",
                                            headers: {
                                                Authorization: `Basic ${createBasicAuthToken(
                                                    key,
                                                    secret
                                                )}`,
                                                "Content-Type":
                                                    "application/json",
                                            },
                                            body: JSON.stringify({
                                                user_id: participantId, //need to change this
                                                report_type:
                                                    "interactionSessionReport",
                                                session_id: sessionId,
                                                interaction_id: testId,
                                            }),
                                        }
                                    );

                                    const reportData =
                                        await reportResponse.json();
                                    reportUrl = reportData.url;
                                    globalReportUrl = reportUrl;
                                }
                            }
                        } catch (err) {
                            if (
                                !isTestcodeValid &&
                                body.messages[0].text !== "STOP"
                            ) {
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
                console.log("!!!!!!!!!!!1Error Occured", e);
                signals.onResponse({
                    error: "Your response could not be processed due to technical reasons, please refresh the page and try again. ",
                });
            }
        },
    };
});

const openChatContainer = () => {
    let chatContainer = document.getElementsByClassName("chat-container")?.[0];
    let chatIcon = document.getElementsByClassName("chat-icon")?.[0];

    const chatE = document.getElementById("chat-element");
    micButton = chatE.shadowRoot.getElementById("microphone-button");
    const sendBtn = chatE.shadowRoot.querySelector(".input-button");

    let mediaRecorder;
    let audioChunks = [];

    async function startRecording() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
            });
            mediaRecorder = new MediaRecorder(stream);

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunks.push(event.data);
                }
            };

            mediaRecorder.onstop = () => {
                let audioBlob = new Blob(audioChunks, { type: "audio/wav" });

                audioFile = new File([audioBlob], "user-audio", {
                    type: audioBlob.type,
                });
                audioChunks.length = 0;

                const fileUrl = window.URL.createObjectURL(audioFile);
                audioFileSrc = fileUrl;
            };

            mediaRecorder.start();
        } catch (error) {
            console.error("Error accessing microphone:", error);
        }
    }
    if (micButton) {
        micButton.addEventListener("click", () => {
            startRecording();
        });
    }

    if (sendBtn) {
        sendBtn.addEventListener("click", () => {
            if (mediaRecorder && mediaRecorder.state !== "inactive") {
                mediaRecorder.stop();
            }
        });
    }

    const basicAuthToken = createBasicAuthToken(key, secret);

    // Using the ipinfo.io API
    fetch("https://ipinfo.io/106.221.193.225?token=4ba5b2bde0816f")
        .then((response) => response.json())
        .then((data) => {
            ipAddress = data.ip;
        })
        .catch((error) => console.error("Error fetching IP address:", error));

    // 2 - account creation
    fetch(`${baseURL}/accounts/`, {
        method: "POST",
        headers: {
            Authorization: `Basic ${basicAuthToken}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            user_context: {
                name: "newUser-1",
                role: "member",
                user_attributes: {
                    tag: "deepchat_profile",
                    attributes: {
                        username: "web_user_" + ipAddress,
                        email: "test@test.com",
                    },
                },
            },
            identity_context: {
                identity_type: "deepchat_unique_id",
                value: `user_${ipAddress}`,
            },
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            participantId = data.uid;
            userId = data.uid;
        })
        .catch((err) => console.log(err));

    if (chatContainer.style.scale === "1") {
        chatContainer.style.scale = 0;
        chatContainer.style["transform-origin"] = "100% 100%";
    } else {
        chatContainer.style.scale = 1;
        chatContainer.style["transform-origin"] = "100% 50%";
    }

    if (
        chatIcon.src ===
        "https://cdn.statically.io/gh/falahh6/coachbots/main/coachbots-logo-bot.png"
    ) {
        chatIcon.src =
            "https://cdn.statically.io/gh/falahh6/coachbots/main/close-btn.png";
    } else {
        chatIcon.src =
            "https://cdn.statically.io/gh/falahh6/coachbots/main/coachbots-logo-bot.png";
    }
};
