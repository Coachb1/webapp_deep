const key2 = "";
const secret2 = "";

const subdomainStt = window.location.hostname.split(".")[0];
const devUrlStt = "https://coach-api-gke-dev.coachbots.com/api/v1";
// const devUrlStt = "http://127.0.0.1:8001/api/v1"
// const devUrlStt = "https://coach-api-gcp.coachbots.com/api/v1";
const prodUrlStt = "https://coach-api-gke-prod.coachbots.com/api/v1";
let baseURL2 = ["platform"].includes(subdomainStt) ? prodUrlStt : devUrlStt;

if (!['playground', 'platform', 'localhost'].includes(subdomainStt)) {
  const scripts = document.getElementsByTagName('script');
  for (let script of scripts) {
    if (script.src.includes('/widget/coachbots-stt-widget-new.js')) {
      try {
        const url = new URL(script.src).origin;
        console.log("url2", url);
        if (url.includes("platform.coachbots.com")) {
          baseURL2 = prodUrlStt;
        } else if (url.includes("playground.coachbots.com")) {
          baseURL2 = devUrlStt;
        }
        console.log("baseURl2", baseURL2);
      } catch (error) {
        console.log("Invalid URL2:", script.src, error);
      }
    }
  }
}

console.log('baseURl2', baseURL2)

const swipeHeader = document.getElementsByClassName("tatsu-header")[0];
if (swipeHeader) {
  console.log("swipeHeader", swipeHeader);
  swipeHeader.style.zIndex = 1;
}

function isChromeSTT() {
  return /Chrome/.test(window.navigator.userAgent) && /Google Inc/.test(window.navigator.vendor);
}
// const baseURL2="https://coach-api-gke-prod.coachbots.com/api/v1" //local

const style = document.createElement("style");
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

    .ist-sc::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 10px;
    }

    .ist-sc::-webkit-scrollbar-thumb {
      background: #9ca3af;
      border-radius: 10px;
    }

    .ist-sc::-webkit-scrollbar-thumb:hover {
      background: #555;
    }

    .ist-sc {
      scrollbar-width: thin;
      scrollbar-color: #888 #f1f1f1;
    }

    #bot-footer span {
      font-size: 12px;
      padding : 4px;
    } 

    #bot-footer span button {
      padding: 1px 4px;
      font: 16px Arial;
    }

    .audio-interaction {
  display: flex;
  align-items: center;
  width: fit-content;
  font-size: 14px;
}

.audio-interaction .label {
  font-size: 20px;
}

.toggle-wrapper {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-left: 5px;
}

.toggle-text {
  font-size: 14px;
  font-weight: bold;
  color: #4b5563; /* gray-600 */
}

/* Switch styling */
.switch {
  position: relative;
  display: inline-block;
  width: 42px;
  height: 22px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 22px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

/* Checked state */
.switch input:checked + .slider {
  background-color: #4ade80; /* green-400 */
}

.switch input:checked + .slider:before {
  transform: translateX(20px);
}

/* Disabled state */
.switch input:disabled + .slider {
  background-color: #e5e7eb; /* gray-200 */
  cursor: not-allowed;
}

    @media screen and (max-width: 426px) {
      #chat-container2 {
        width: 100% !important;
        height: 100vh !important;
        left: 0 !important;
        top: 0 !important;
        bottom: 0 !important;
        border-radius: 0 !important;
        overflow-y: auto;

      }
      // #chat-icon2 img {
      //   height: 20% !important;
      //   width: 100% !important;
      // }

      .chat-icon-container2 {
        width: 90px !important;
        height: 270px !important;
      }

      .chat-icon2 {
        width: 100% !important;
        height: 100% !important;
        object-fit: contain !important;
        display: block;
      }
        
    }

    <style>
  #bot-header-logo-2 {
    display: flex;
    flex-wrap: nowrap !important; 
    justify-content: space-between;
    align-items: center;
    gap: 8px;
    background-color: #f3f4f6;
    border-radius: 1rem 1rem 0 0;
    padding: 2px 2px 0 2px;
  overflow-x: auto !important;
  scrollbar-width: none !important; 
}
#bot-header-logo-2::-webkit-scrollbar {
  display: none !important; 
}
  @media (max-width: 1024px) {
  #bot-header-logo-2 {
    overflow-x: auto;
  }
}
@media (max-width: 768px) {
  #bot-header-logo-2 {
    flex-wrap: wrap;
  }
}
  #chat-history-wrapper,
  #response-style {
    display: flex;
    align-items: center;
  }

  #chatHistoryDropdown,
  #style-selector {
    font-size: 12px;
    padding: 4px;
    border-radius: 4px;
    border: 1px solid #ccc;
    margin-left: 8px;
    cursor: pointer;
    vertical-align: middle;
    min-width: 100px;
  }

  /* Responsive behavior */
  @media (max-width: 768px) {
    #chat-history-wrapper,
    #response-style {
      width: 100%;
      margin-left: 0;
      margin-top: 4px;
    }

    #chatHistoryDropdown,
    #style-selector {
      width: 100%;
      margin-left: 5px;
    }

    #close-top2{
      position: absolute;
      top: 15px;
      left: 0;
    }
  }
</style>




`;
document.head.appendChild(style);

// create a do-follow link and append it to the body
const createLink = (url, text) => {
  const a = document.createElement("a");
  a.href = url;
  a.textContent = text;
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  return a;
};

// attatch the link to the body of the page
document.head.appendChild(createLink("https://www.coachbots.com", "CoachBot"));
let isFlatWidget = window.location.pathname.includes('widget-container');
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
let audioRes;
let wordLimit = 15;
let botWordLimit = 10;

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
let globalSignalsSTT;

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
let responder_name2 = "";

let testId2;
let resQuestionNumber2;
let questionLength2;
let questionData2;
let senarioDescription2;
let senarioTitle2;
let senarioCase2;
let senarioMediaDescription2;
let senarioSnippetURLStt;
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
let questionSnippetLinkStt;
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
let botSelectedLLM;
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
let intakebuttonText = "Pre-Check";
let askDeepDiveAccessCode = false;
let quickMatchMessage;
let isSomeActivityActive = false;
let askInitialQuestionDeepDive = false;
let deepDiveInitialQueIndex;
let responseSavedCount = 0;
let snnipetConfigSTT;
let askAccessBotCodeSTT = false;
let AttemptTestDirectSTT = false;
let emailCandidate2;
let buttonPositionSTT = 'top';
let previousChatHistory = [];

let selectedResponseType = undefined;
let botPreviousConversationHistory = [];
let userQuestionsHistory = [];
let conversationLlmQueue = [];

let allowPastingAtClientLevelStt;
let SubmitButtonOnclickFunction;

let clientBasedBotHeaderText = "";
let clientBasedBotFooterText = "";
let clientBasedReadHereText = "";

let LLMsystemInstructions = "";
let botAvatarImageURL =
  "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8c3ZnIGZpbGw9IiMwMDAwMDAiIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIAoJCXZpZXdCb3g9IjAgMCAzMiAzMiIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+Cgk8cGF0aCBkPSJNMjMsMzAuMzZIOWMtMi40MDQsMC00LjM2LTEuOTU2LTQuMzYtNC4zNlYxNWMwLTIuNDA0LDEuOTU2LTQuMzYsNC4zNi00LjM2aDMuNjU5CgkJYzAuMTY3LTEuNTY2LDEuNDE1LTIuODEzLDIuOTgxLTIuOTgxVjUuMzMzYy0xLjEzMS0wLjE3NC0yLTEuMTU0LTItMi4zMzNjMC0xLjMwMSwxLjA1OS0yLjM2LDIuMzYtMi4zNgoJCWMxLjMwMiwwLDIuMzYsMS4wNTksMi4zNiwyLjM2YzAsMS4xNzktMC44NjksMi4xNTktMiwyLjMzM1Y3LjY2YzEuNTY2LDAuMTY3LDIuODE0LDEuNDE1LDIuOTgxLDIuOTgxSDIzCgkJYzIuNDA0LDAsNC4zNiwxLjk1Niw0LjM2LDQuMzZ2MTFDMjcuMzYsMjguNDA0LDI1LjQwNCwzMC4zNiwyMywzMC4zNnogTTksMTEuMzZjLTIuMDA3LDAtMy42NCwxLjYzMy0zLjY0LDMuNjR2MTEKCQljMCwyLjAwNywxLjYzMywzLjY0LDMuNjQsMy42NGgxNGMyLjAwNywwLDMuNjQtMS42MzMsMy42NC0zLjY0VjE1YzAtMi4wMDctMS42MzMtMy42NC0zLjY0LTMuNjRIOXogTTEzLjM4NCwxMC42NGg1LjIzMQoJCUMxOC40MzksOS4zNTQsMTcuMzM0LDguMzYsMTYsOC4zNkMxNC42NjcsOC4zNiwxMy41NjEsOS4zNTQsMTMuMzg0LDEwLjY0eiBNMTYsMS4zNmMtMC45MDQsMC0xLjY0LDAuNzM2LTEuNjQsMS42NAoJCVMxNS4wOTYsNC42NCwxNiw0LjY0YzAuOTA0LDAsMS42NC0wLjczNiwxLjY0LTEuNjRTMTYuOTA0LDEuMzYsMTYsMS4zNnogTTIwLDI3LjM2aC04Yy0xLjMwMSwwLTIuMzYtMS4wNTktMi4zNi0yLjM2CgkJczEuMDU5LTIuMzYsMi4zNi0yLjM2aDhjMS4zMDIsMCwyLjM2LDEuMDU5LDIuMzYsMi4zNlMyMS4zMDIsMjcuMzYsMjAsMjcuMzZ6IE0xMiwyMy4zNmMtMC45MDQsMC0xLjY0LDAuNzM1LTEuNjQsMS42NAoJCXMwLjczNiwxLjY0LDEuNjQsMS42NGg4YzAuOTA0LDAsMS42NC0wLjczNSwxLjY0LTEuNjRzLTAuNzM1LTEuNjQtMS42NC0xLjY0SDEyeiBNMzEsMjMuODZoLTJjLTAuMTk5LDAtMC4zNi0wLjE2MS0wLjM2LTAuMzZWMTUKCQljMC0wLjE5OSwwLjE2MS0wLjM2LDAuMzYtMC4zNmgyYzAuMTk5LDAsMC4zNiwwLjE2MSwwLjM2LDAuMzZ2OC41QzMxLjM2LDIzLjY5OSwzMS4xOTksMjMuODYsMzEsMjMuODZ6IE0yOS4zNiwyMy4xNGgxLjI3OXYtNy43OAoJCUgyOS4zNlYyMy4xNHogTTMsMjMuODZIMWMtMC4xOTksMC0wLjM2LTAuMTYxLTAuMzYtMC4zNlYxNWMwLTAuMTk5LDAuMTYxLTAuMzYsMC4zNi0wLjM2aDJjMC4xOTksMCwwLjM2LDAuMTYxLDAuMzYsMC4zNnY4LjUKCQlDMy4zNiwyMy42OTksMy4xOTksMjMuODYsMywyMy44NnogTTEuMzYsMjMuMTRoMS4yOHYtNy43OEgxLjM2VjIzLjE0eiBNMjAsMjAuMzZjLTEuMzAyLDAtMi4zNi0xLjA1OS0yLjM2LTIuMzYKCQlzMS4wNTktMi4zNiwyLjM2LTIuMzZzMi4zNiwxLjA1OSwyLjM2LDIuMzZDMjIuMzYsMTkuMzAyLDIxLjMwMiwyMC4zNiwyMCwyMC4zNnogTTIwLDE2LjM2Yy0wLjkwNCwwLTEuNjQsMC43MzYtMS42NCwxLjY0CgkJczAuNzM1LDEuNjQsMS42NCwxLjY0czEuNjQtMC43MzUsMS42NC0xLjY0UzIwLjkwNCwxNi4zNiwyMCwxNi4zNnogTTEyLDIwLjM2Yy0xLjMwMSwwLTIuMzYtMS4wNTktMi4zNi0yLjM2czEuMDU5LTIuMzYsMi4zNi0yLjM2CgkJczIuMzYsMS4wNTksMi4zNiwyLjM2QzE0LjM2LDE5LjMwMiwxMy4zMDEsMjAuMzYsMTIsMjAuMzZ6IE0xMiwxNi4zNmMtMC45MDQsMC0xLjY0LDAuNzM2LTEuNjQsMS42NHMwLjczNiwxLjY0LDEuNjQsMS42NAoJCXMxLjY0LTAuNzM1LDEuNjQtMS42NFMxMi45MDQsMTYuMzYsMTIsMTYuMzZ6Ii8+Cgk8cmVjdCBzdHlsZT0iZmlsbDpub25lOyIgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIi8+Cjwvc3ZnPg==";
let UserAvatarImageURL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPoAAAD6CAMAAAC/MqoPAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAADNQTFRF////9vX18vLy/Pz86enp4+Li2tnZ1tbWzczM+fn57Ozs4N/f09LS0M/P5uXl7+/v3dzcwtncCAAAAAFiS0dEAIgFHUgAAAAJcEhZcwAAAEgAAABIAEbJaz4AAAZNSURBVHja7d3bdtsqEABQYABZSLH9/3+ZpnUsIcF5iOM6PfElNoMHMfPQdq3GmL0GkLhEUqLaUExnOtOZznSmM53pTGc605nOdKYznelMZzrTmV4LXSqllKyJDkob26xWq8Zae/iH0QoWTm9d1xur4WuypQJtTd+5dqn0VjcxzNO5/57mEBvdLo8Oron6aseWOjYOFkVvjQs3DmgyONMuht52EfztP+4hdu0i6LCO808/M8c1lE/fuPGej41uUzgdtoO/75N+2ELJ9I3b3//hPXbiMenm3pR/Jt4USgcLBIp4Bh10gqKVhvLo0klCxeSky96nKcj3siw6pJIL4XsoiQ7apyvMY/V3HHrSRioLopvEhSpTCn2TPEuwKYMOIX0tAxRBf/Hpa+lfSqBv9gi1FPsNfTrMAiVmIE/vJhz61FGnQxRIEYE4vfNYdN8Rp6MlHaHotHTn8ejekaZPAjEmyvQWdZFTtYTpXqCGJ0zvcek9Yfoel76nS0ffv1NMp1ca+pkgyfRCGind4L7OWWc605l+cxjsyhqy9AGbPpClc1/nvl5VX0c/3Alk6RU3+Am7shNZ+h6bvidLr7jBB+zKBrL0irOOudmIUDzTmf5gIP+iEuXtRuTVaEmY/oZLfyNMrzjryPc0gerMTdpVg0tvjJUU6bLPcGOoUv46SLL6Wi8yhLf06C7TUyekI0efRaaYqdFltkeNpPumRPSMDxgBYvSM035FrKAmH72hRW99PrpvSdEHkTEGUvSsK3yKVDkuJ92RohcZaehzzirPpOg+J92Tolfc4Cumx5xVXpGiZ34+ICX6W84qv5GiR5NPbiIpOv6BCoSvSkTX+eiaGP092zINvBOj4x8mSf9FqejvNo/cvpOji19ZbmviL0GPLsYMFzgzCor0+Bv/ePDvSJKOb9dJ5UlnbnEHiHgzv6cdTpJOWuc/u3FEucLDOL75xGtBiefrcwgoC9NDSH/jkH6pAuXmBqPQ9HSUPVdZBH1GGOrMXAQdYxcKZfxAoK+KKBKFLosoEoX+u4giUehz8jlcnAuhp78I46yDYNAd+QLR6K+pr+yvxdBTHyVDubQh0UfSxaHSd0lbvNkVRE87JGOtc+PQd2QLQ6fHhJkKsSh6yg13tO08JPprsgrrXWH0dJd2vH1MLPprot4eXoujpzrdhngiD40ek2y92lggPcnWa8qN1Yz0BFuvZhRl0uOfR0v4Ewuli/Bg4Qr3lArqGdndQ3UPO1EunXYwnelMZzrTmc50pjOd6UxnOtOZznSmM53pTGf6kuj6oedFKV0s3fX6sX1S3bsi6a4PD7+/YAqYeBw6pIB/4qEgOqxdSPbGiim4NRRCbzs3Jj0L4UfXtQXQVRfn5IdA/Bw7RZzurEV6EtdsLeGXkIPuA+K1UoVeA0l62zmN/LqfSSft9KkepmoRuvi3nd5uKNFB9zbbXEANqdr941XO0NJx2v2jdJenpf+/3bvn0ts16ph+sd6hX7dPo2+2cZzE02Ia43bzDHqr+2Evnhz74ZHU30ffbKOeng1/NPV30Ns1gYQnSP2P6e65Pfxc6h02XZqXQCjhJ6kPL6bFo4NrGvAU4UII4SE2P1vQuZkuOxckVfehisF1MjUddN/MZBN+kvq5uf0O/xa66gyNS9ktMWlz44rO1Z8C19i5FPdHzPamXn+F3hryPfxMr78+4F+kq22kO6Rf6fUQt+puuustyWv4rbG3l/duztFB96GYoe1cTBdXMr+nw9qVM6ZfxOvzezff0nXi/ZOndvrR6Zvpm0c3h6nhdb+5iS7tsIim/qXZD9+97/Jf+rpZ5BET1ayv0GUzLhEuhBBjIy/RdVPgndutIRt9nt7p5cKFEEJ3Z+jQFDZL+XnMDXxHB73gxn5s9Kc3d3/pFciFkN/QTSXHJpX5l66gDrkQoP6hL3xsPw39la4qOiV8tH78XeSbue6N9mvWa6J/ybpc1CT1Wnh5Qq9meP8IOKH3ddH7E/ri1iYux/SXDrXR4UiPdck/wUpU+FtPf6/orja6O9KL3l56LOvVxe5Ib2qjN0d6Vbex4ghWlU3bPqI90If66MNng680FNpbJijH6kCvaF3uMzQ3+IrpFerV4Y9dffQdN3im10ivbuImhD3Qq5u4HdZkua8znelMZ/pS4z9CPVKkxowNxgAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxNy0wMy0yN1QxNTo0NToxNSswMDowMN1xSg4AAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTctMDMtMjdUMTU6NDU6MTUrMDA6MDCsLPKyAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAABJRU5ErkJggg==";
let clientuserInformationSTT;

let responderDisplayNameStt;
let IsSingleSelectSTT;
let AccessCodeStt;

let startScenarioRecommendationsStt = false;
let PreviousSessionInfoSTT = {
  "sessionId": null,
  "skills": null
}
let userScenarioRecommendationStt;
let increaseSessionForFirstTestStt = false;
let FeedbackVideoLinkStt;
let FetchTestCodeReportStt = false;
let widegtStatus = 'closed';
let libraryTestoptionsStt = [];
let testCountDown = 0;
let timerInterval = null;

let ws;
let mediaRecorder2;
let audioStreamStt;
let USE_CUSTOM_STT = false;
let finalTranscriptAccumulator = "";
let widgetHeight = `clamp(100px, 85vh, calc(100vh - 83px))`
let widgetWidth = `auto`
let widgetImageLink = `https://res.cloudinary.com/dtbl4jg02/image/upload/v1750673478/o89352vtmiywyobwi2bg.jpg`;

if (window.location.pathname.startsWith('/coach/')) {
  widgetImageLink = `https://res.cloudinary.com/dtbl4jg02/image/upload/v1753852561/uzvcufh7w5ezxs2oyjeg.png`;
}
let InstructinoMediaLinkStt;
let selectedChatId = null;
let onlyCurrentSession = false;
let allowAudioInteraction = false;
let styleMap = {};
let isAskingIntake = false;
let LLMOrder = {
  providers : ['gemini', 'gpt', 'anthropic'],
  models: {
    gemini: ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-2.0-flash-lite-001'],
    gpt: [
      'gpt-4o',
      'gpt-4o-mini',
      'gpt-3.5-turbo'
    ],
    anthropic: [
      'claude-3-5-sonnet-20240620',
      'claude-3-opus-20240229',
      'claude-3-haiku-20240307'
    ]
  }
}
let MindMapLinks;
let AssessmentLinks;

const micSvg = `<svg id="micToggle" class="mic-icon" viewBox="0 0 24 24" style="fill: gray; width: 24px; height: 24px;">
  <path d="M19 11c0 1.93-.78 3.68-2.05 4.95l1.41 1.41C20.03 15.7 21 13.45 21 11h-2zm-4 0c0 .89-.34 1.7-.88 2.31l1.45 1.45C16.44 13.9 17 12.52 17 11h-2zm-2-7v3.17l2 2V4a2 2 0 0 0-2-2h-.17l2 2H13zm-9.19-.19l16.38 16.38-1.41 1.41-2.15-2.15C14.96 20.3 13.05 21 11 21c-4.42 0-8-3.58-8-8h2c0 3.31 2.69 6 6 6 1.31 0 2.52-.43 3.5-1.15l-1.43-1.43A4.978 4.978 0 0 1 11 17c-2.76 0-5-2.24-5-5v-.17L2.81 3.81 4.22 2.4z"/>
</svg>
`
const redMicSvg = `<svg id="micToggleActive" class="mic-icon" viewBox="0 0 24 24" style="fill: red; width: 24px; height: 24px;">
  <path d="M19 11c0 1.93-.78 3.68-2.05 4.95l1.41 1.41C20.03 15.7 21 13.45 21 11h-2zm-4 0c0 .89-.34 1.7-.88 2.31l1.45 1.45C16.44 13.9 17 12.52 17 11h-2zm-2-7v3.17l2 2V4a2 2 0 0 0-2-2h-.17l2 2H13zm-9.19-.19l16.38 16.38-1.41 1.41-2.15-2.15C14.96 20.3 13.05 21 11 21c-4.42 0-8-3.58-8-8h2c0 3.31 2.69 6 6 6 1.31 0 2.52-.43 3.5-1.15l-1.43-1.43A4.978 4.978 0 0 1 11 17c-2.76 0-5-2.24-5-5v-.17L2.81 3.81 4.22 2.4z"/>
</svg>
`
async function handleCustomStt() {
  const customMicButton = document.getElementById("startMicBtn");
  if (!ws || ws.readyState !== WebSocket.OPEN) {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `wss://coachbot-websocket.fly.dev/`;
    console.log('widget.js: starting ws ', wsUrl);

    ws = new WebSocket(wsUrl);
  }

  ws.onopen = async () => {
    console.log("widget.js: WebSocket connection established for STT");
    const gShadowRoot2 = document.getElementById("chat-element2")?.shadowRoot;
    gShadowRoot2?.getElementById("text-input").focus();
    const textBox = gShadowRoot2?.getElementById("text-input");
    finalTranscriptAccumulator = textBox.textContent || "";

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      console.log('widget.js: Microphone access granted.');
      customMicButton.style.background = '#ff0000'; // Change button color to indicate active state

      const audioContext = new (window.AudioContext || window.webkitAudioContext)({
        sampleRate: 16000 // Ensure this matches backend expectations
      });

      const mediaStreamSource = audioContext.createMediaStreamSource(stream);
      const scriptProcessor = audioContext.createScriptProcessor(4096, 1, 1);

      scriptProcessor.onaudioprocess = (event) => {
        if (ws.readyState !== WebSocket.OPEN) {
          console.warn('widget.js: WebSocket closed during audio process.');
          stopAudioCapture();
          return;
        }
        const audioData = event.inputBuffer.getChannelData(0);
        const int16Data = convertFloat32ToInt16(audioData);
        ws.send(int16Data);
      };

      mediaStreamSource.connect(scriptProcessor);
      scriptProcessor.connect(audioContext.destination);
      // Save references for cleanup
      window._sttAudioState = { stream, audioContext, scriptProcessor, mediaStreamSource };

    } catch (err) {
      console.error("widget.js: Microphone access error:", err);
    }
  };

  ws.onmessage = (event) => {
    console.log('widget.js: onmessage', event.data);

    try {
      const data = JSON.parse(event.data);

      if (data.error) {
        console.error('widget.js: Server error received:', data.error);
        ws.close();
        return;
      }
      const transcript = data.transcript || "";
      if (transcript) {
        console.log(`widget.js: Received transcription: "${data.transcript}" (Final: ${data.isFinal})`);

        const gShadowRoot2 = document.getElementById("chat-element2")?.shadowRoot;
        gShadowRoot2?.getElementById("text-input").focus();
        const textBox = gShadowRoot2?.getElementById("text-input");
        console.log('widget.js: input', textBox)
        if (data.isFinal) {
          // If it's a final transcript, add it to our accumulator
          // and ensure there's a space after it if it's not empty.
          finalTranscriptAccumulator += (transcript.trim() + " ");
          // Update the textbox with the accumulated final text
          textBox.textContent = finalTranscriptAccumulator;
        } else {
          // If it's an interim transcript, we show it along with the final part.
          // We trim the interim transcript to avoid extra spaces at the start if it's
          // just a single word.
          textBox.textContent = finalTranscriptAccumulator + transcript.trim();
        }
        // Scroll to the bottom of the textbox if content overflows
        textBox.scrollTop = textBox.scrollHeight;
      }
    } catch (e) {
      console.error('widget.js: Error parsing WebSocket message:', e, event.data);
    }
  };

  ws.onerror = (err) => {
    console.error("widget.js: WebSocket error:", err);
  };

  ws.onclose = () => {
    console.log('widget.js: WebSocket closed');
    stopAudioCapture();
  };

  // Stop if already running
  if (window._sttAudioState) {
    customMicButton.style.background = '#00c080';
    stopAudioCapture();
    ws.close();
  }

  // Helper: convert Float32 to Int16 PCM
  function convertFloat32ToInt16(buffer) {
    const l = buffer.length;
    const int16Buffer = new Int16Array(l);
    for (let i = 0; i < l; i++) {
      const s = Math.max(-1, Math.min(1, buffer[i]));
      int16Buffer[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
    }
    return int16Buffer.buffer;
  }

  // Helper: cleanup all streams and nodes
  function stopAudioCapture() {
    const state = window._sttAudioState;
    if (!state) return;

    state.scriptProcessor.disconnect();
    state.mediaStreamSource.disconnect();
    state.audioContext.close();
    state.stream.getTracks().forEach(track => track.stop());

    delete window._sttAudioState;
    console.log('widget.js: Audio capture stopped.');
  }
}

function createBasicAuthToken2(key2 = "", secret2 = "") {
  const token2 =
    "Yzc3MjFmZGItYTllMC00YTYxLWEzMTYtNDRhODA1N2VkMjY0OjhjNWNlZWZlLTY2Y2QtNDliZi04MTY5LTBhNjMwMmU5NmZlMA==";
  // "MDU2MTUwZWYtYjliYS00NTRlLTkzYTYtMDliZDdjNzFlYjNiOjFkOWMwZGJhLTI0OTAtNDZmYS1hMTNiLTU3Yjg5NDdhNjMwMg==";
  // "MzdkMGVkNzgtOTI5Ni00MWQwLTk1NjgtYjdjZTBhYjA2OTY5Ojk1ZGIxNTNkLWEzZWMtNDM0Zi05YjIwLTc0M2M3M2Q5ZDZkYg=="; //local
  return token2;
}
function displayBrowserWarning() {
  const warningBannerContainer = document.getElementById("warning-banner-stt");
  warningBannerContainer.style.display = 'none'
  if (!isChromeSTT()) {
    const warningBannerContainer = document.getElementById("warning-banner-stt");
    warningBannerContainer.style.display = 'block'
    warningBannerContainer.innerHTML = `<b style="color: red;text-align: center;font-size: 14px;font-size: ${window.innerWidth < 768 ? "10px" : "12px"
      };" >
      Warning: we detected that you are on a non-supported browser. Please switch to Chrome to avoid interruptions.
      </b>`
  }
}

const basicAuthToken2 = createBasicAuthToken2(key2, secret2);

user2 = window.user;
console.log(user2);

let user_name2;
let user_email2;

if (window.user) {
  user_name2 = `${window.user.given_name} ${window.user.family_name ? window.user.family_name : ""
    }`;
  user_email2 = window.user.email;
} else {
  user_name2 = "coachbots_anonyoususer";
  user_email2 = getAnonymousEmail();
}

// Load PapaParse dynamically, then call function
function loadPapaParse() {
  return new Promise((resolve, reject) => {
    if (window.Papa) {
      resolve(window.Papa);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/papaparse@5.4.1/papaparse.min.js';
    script.onload = () => resolve(window.Papa);
    script.onerror = () => reject(new Error('Failed to load PapaParse'));
    document.head.appendChild(script);
  });
}

async function fetchGoogleSheetAsJson(csvUrl) {
  const Papa = await loadPapaParse();

  const response = await fetch(csvUrl);
  const csvText = await response.text();

  const parsed = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: true,
  });

  return parsed.data;
}

function initLogRocketAndIdentifyUser() {
  if (window.LogRocket) {
    window.LogRocket.init("irkulq/coachbots");
    window.LogRocket.identify(user_email2, {
      name: user_name2,
      email: user_email2,
    });
    return true;
  }
  return false;
}

if (!initLogRocketAndIdentifyUser()) {
  let script = document.createElement("script");
  script.src = "https://cdn.lrkt-in.com/LogRocket.min.js";
  script.onload = initLogRocketAndIdentifyUser;
  document.head.appendChild(script);
}

// 2 - account creation
console.log("user_name2", user_name2);
console.log("user_email2", user_email2);

const initialiseUserSTT = async () => {
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
      console.log("START -> ", data);
      participantId2 = data.uid;
      userId2 = data.uid;
      userRole2 = data.role;

      clientAllowAudioInteraction2 = data.client_allow_audio_interactions;
      userAllowAudioInteraction2 = data.user_allow_audio_interactions;
      prioritiseUserAllowInteraction2 = data.prioritize_user_audio_interaction;
      selectedResponseType = data.preferences?.response_style;

      console.log("user_info : ", clientAllowAudioInteraction2, userAllowAudioInteraction2, prioritiseUserAllowInteraction2);

      fetch(
        `${baseURL2}/accounts/get-client-information/?for=user_info&email=${user_email2}`,
        {
          method: "GET",
          headers: {
            Authorization: `Basic ${basicAuthToken2}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log("get-client-information : ", data);

          if (!data.data.user_info[0].msg) {
            clientuserInformationSTT = data.data.user_info[0];

            allowPastingAtClientLevelStt =
              data.data.user_info[0].ui_information.allow_paste_answer;

            clientBasedBotHeaderText =
              data.data.user_info[0].ui_information.header;
            clientBasedBotFooterText =
              data.data.user_info[0].ui_information.bottom_text;
            clientBasedReadHereText =
              data.data.user_info[0].ui_information.read_text;

            const headerText = document.getElementById("header-text");
            const footerText = document.getElementById("footer-text");
            const instructionsPaneList =
              document.getElementById("instructions-list");
            console.log(headerText);
            console.log(footerText);

            if (clientBasedBotHeaderText) {
              headerText.innerText = clientBasedBotHeaderText;
            }

            if (clientBasedBotFooterText) {
              footerText.innerText = clientBasedBotFooterText;
            }

            if (clientBasedReadHereText) {
              const list = clientBasedReadHereText
                .trim()
                .split("\n")
                .map((item) => {
                  return `<li>${item.trim()}</li>`;
                });

              instructionsPaneList.innerHTML = list;
            }
          }
        })
        .catch((err) => {
          console.log(err);
          throw new Error(`Error fetching client Info ${err}`);
        });
    })
    .catch((err) => {
      console.log(err);
      throw new Error(`Error User Info ${err}`);
    });
};

initialiseUserSTT();


const createUserSTT = async (user_name, user_email) => {
  console.log("newusername", user_name);
  user_name2 = user_name;
  user_email2 = user_email;
  console.log("newuser_name2", user_name2);
  console.log("newuser_email2", user_email2);
  const response = await fetch(`${baseURL2}/accounts/`, {
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
    .then(async (data) => {
      console.log("START -> ", data);
      if (!window.user) {
        window.user = {
          given_name: user_name2,
          email: user_email2,
        };
      }
      participantId2 = data.uid;
      userId2 = data.uid;
      userRole2 = data.role;

      clientAllowAudioInteraction2 = data.client_allow_audio_interactions;
      userAllowAudioInteraction2 = data.user_allow_audio_interactions;
      prioritiseUserAllowInteraction2 = data.prioritize_user_audio_interaction;
      selectedResponseType = data.preferences?.response_style;

      const clientResp = await fetch(
        `${baseURL2}/accounts/get-client-information/?for=user_info&email=${user_email2}`,
        {
          method: "GET",
          headers: {
            Authorization: `Basic ${basicAuthToken2}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log("get-client-information : ", data);

          if (!data.data.user_info[0].msg) {
            clientuserInformationSTT = data.data.user_info[0];
            allowPastingAtClientLevelStt =
              data.data.user_info[0].ui_information.allow_paste_answer;

            clientBasedBotHeaderText =
              data.data.user_info[0].ui_information.header;
            clientBasedBotFooterText =
              data.data.user_info[0].ui_information.bottom_text;
            clientBasedReadHereText =
              data.data.user_info[0].ui_information.read_text;

            const headerText = document.getElementById("header-text");
            const footerText = document.getElementById("footer-text");
            const instructionsPaneList =
              document.getElementById("instructions-list");
            console.log(headerText);
            console.log(footerText);

            if (clientBasedBotHeaderText) {
              headerText.innerText = clientBasedBotHeaderText;
            }

            if (clientBasedBotFooterText) {
              footerText.innerText = clientBasedBotFooterText;
            }

            if (clientBasedReadHereText) {
              const list = clientBasedReadHereText
                .trim()
                .split("\n")
                .map((item) => {
                  return `<li>${item.trim()}</li>`;
                });

              instructionsPaneList.innerHTML = list;
            }
          }
        })
        .catch((err) => {
          console.log(err);
          throw new Error(`Error fetching client Info ${err}`);
        });
    })
    .catch((err) => {
      console.log(err);
      throw new Error(`Error User Info: ${err}`);
    });
};

// sample recommendation data
let recommendationsDataStt = [
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

const emojis = [
  "😀",
  "😃",
  "😄",
  "😁",
  "😆",
  "😅",
  "🤣",
  "😂",
  "🙂",
  "🙃",
  "😉",
  "😊",
  "😇",
  "🥰",
  "😍",
  "🤩",
  "😘",
  "😗",
  "☺️",
  "😚",
  "😙",
  "😋",
  "😛",
  "😜",
  "🤪",
  "😝",
  "🤑",
  "🤗",
  "🤭",
  "🤫",
  "🤔",
  "🤐",
  "🤨",
  "😐️",
  "😑",
  "😶",
  "😏",
  "😒",
  "🙄",
  "😬",
  "🤥",
  "😌",
  "😔",
  "😪",
  "😮‍",
  "💨",
  "🤤",
  "😴",
  "😷",
  "🤒",
  "🤕",
  "🤢",
  "🤮",
  "🤧",
  "🥵",
  "🥶",
  "😶‍",
  "🌫️",
  "🥴",
  "😵‍",
  "💫",
  "😵",
  "🤯",
  "🤠",
  "🥳",
  "😎",
  "🤓",
  "🧐",
  "😕",
  "😟",
  "🙁",
  "☹️",
  "😮",
  "😯",
  "😲",
  "😳",
  "🥺",
  "😦",
  "😧",
  "😨",
  "😰",
  "😥",
  "😢",
  "😭",
  "😱",
  "😖",
  "😣",
  "😞",
  "😓",
  "😩",
  "😫",
  "🥱",
  "😤",
  "😡",
  "😠",
  "🤬",
];

// sample TEst codes
const sampleTestCodesStt = {
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

function isTestCode2(text) {
  return text.split(" ").length == 1 && (text[0] == "q" || text[0] == "Q");
}

function isDuplicateResponseStt(text) {
  return userResponses2.includes(text);
}

const capitalizeFirstLetterStt = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

function getAnonymousEmail() {
  const user_name = "coachbots_anonyoususer";
  const user_sid = getOrSetSessionId();
  const user_email = `${user_name}-${user_sid}@gmail.com`;

  return user_email;
}

function isEmailSTT(emailAdress) {
  let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (emailAdress.match(regex)) return true;
  else return false;
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
      formFieldsstt = ["name", "email"];
      console.log(
        "### formFieldsstt : ",
        formFieldsstt,
        "other data: ",
        `<b>Please enter your ${formFieldsstt[0]}</b>`
      );
      const msg = formFieldsstt[0] === "email" ?
        `<b>Please enter your email. (Used for reporting and ranking. Please use same email for accurate tracking).</b>`
        : `<b>Please enter your ${formFieldsstt[0]}</b>`;
      appendMessage2(msg);
    } else {
      // we are asking initial question
      askInitialQuestionDeepDive = true;
      deepDiveInitialQueIndex = 1;
      appendMessage2(botInitialQuestions[`${deepDiveInitialQueIndex}`]);
    }
  } else if (choice === "Yes") {
    // appendMessage2("<p>Please click on <b>Begin Session</b> to continue..</p>")
    // appendMessage2("Please let us know more about your context for this survey such as role , impact  and whatever else you may feel comfortable with.")
    isAnonymous = true;
    if (!window.user) {
      isEmailFormstt = true;
      formFieldsstt = ["email"];
      console.log(
        "### formFieldsstt : ",
        formFieldsstt,
        "other data: ",
        `<b>Please enter your ${formFieldsstt[0]}</b>`
      );
      appendMessage2(
        `<div style='font-size: 14px;'>
           Email is being collected only to share the transcript. It remains anonymous.
         </div>`
      );

      const msg = formFieldsstt[0] === "email" ?
        `<b>Please enter your email. (Used for reporting and ranking. Please use same email for accurate tracking).</b>`
        : `<b>Please enter your ${formFieldsstt[0]}</b>`;

      appendMessage2(msg);
    } else {
      askInitialQuestionDeepDive = true;
      deepDiveInitialQueIndex = 1;
      appendMessage2(botInitialQuestions[`${deepDiveInitialQueIndex}`]);
    }
  }

  isSomeActivityActive = false;
};

const startDeepDiveConv = () => {
  gShadowRoot2.getElementById("text-input").focus();
  setTimeout(() => {
    gShadowRoot2.getElementById("text-input").textContent = "START";
    gShadowRoot2.querySelectorAll(".input-button")[1].click();

    setTimeout(() => {
      var chatElement = document.getElementById("chat-element2");
      const shdwroot = chatElement.shadowRoot;
      const messageContainers = shdwroot.querySelectorAll(
        ".outer-message-container"
      );
      console.log("deepdive-msgcont", messageContainers);
      messageContainers.forEach((container) => {
        console.log("deepdive-cont", container);
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
};

const getUserOrAnonymousDetails = async (choice) => {
  console.log(choice);
  disableOrEnableButtons(`anonymous-${uniqueSesssionContainerId}`);
  if (choice === "No") {
    isAnonymous = false;
    if (!window.user) {
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
      formFieldsstt = ["name", "email"];
      console.log(
        "### formFieldsstt : ",
        formFieldsstt,
        "other data: ",
        `<b>Please enter your ${formFieldsstt[0]}</b>`
      );
      const msg = formFieldsstt[0] === "email" ?
        `<b>Please enter your email. (Used for reporting and ranking. Please use same email for accurate tracking).</b>`
        : `<b>Please enter your ${formFieldsstt[0]}</b>`;
      appendMessage2(msg);
    } else {
      FeedbackUserEmail = user_email2;
      feedbackUserName = user_name2;
      console.log("jiks FeedbackUserEmail", FeedbackUserEmail);
      const thumbsupdiv = await feedbackBotInitialFlow("save_email");
      appendMessage2(thumbsupdiv);
    }
  } else if (choice === "Yes") {
    console.log("hi");
    FeedbackUserEmail = "Anonymous User";
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
  console.log({
    conversation: JSON.stringify(feedbackBotQnA),
    bot_id: botId,
    type_of_email: "feedback_conv",
    user_email: FeedbackUserEmail,
    user_name: feedbackUserName,
    is_positive: IsPositiveFeedback ? "True" : "False",
  });
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
  const body_data = {
    conversation: JSON.stringify(feedbackBotQnA),
    bot_id: botId,
    type_of_email: "feedback_conv",
    user_email: FeedbackUserEmail,
    user_name: feedbackUserName,
    is_positive: IsPositiveFeedback ? "True" : "False",
  };
  const queryparams = new URLSearchParams(body_data);

  console.log("user_email", FeedbackUserEmail, queryparams);

  // sending feedback conversation to bot owner
  try {
    await fetch(
      `${baseURL2}/test-attempt-sessions/send-feedback-transcript-email/`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${createBasicAuthToken2(key2, secret2)}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body_data),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("feedback email sent : ", data);
      });
  } catch (err) {
    console.log(`Failed to send transcript email: ${err}`);
  }

  const feedbackData = {
    method: "post",
    qna: JSON.stringify(feedbackBotQnA),
    bot_id: botId,
    is_positive: IsPositiveFeedback ? "True" : "False",
    qna_type: "feedback",
    user_id: userId2,
    is_anonymous: isAnonymous ? "True" : "False",
  };
  // saving feedback to database
  const queryparam = new URLSearchParams(feedbackData);

  const resp = await fetch(`${baseURL2}/accounts/get-user-feedback-data/`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${createBasicAuthToken2(key2, secret2)}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(feedbackData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Feedback Submit response : ", data);
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

  const feedData = {
    method: "post",
    qna: JSON.stringify(feedbackBotQnA),
    bot_id: botId,
    is_positive: IsPositiveFeedback ? "True" : "False",
    qna_type: "feedback",
    is_anonymous: isAnonymous ? "True" : "False",
    user_id: userId2,
  };
  const queryparam = new URLSearchParams(feedData);

  const resp = await fetch(`${baseURL2}/accounts/get-user-feedback-data/`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${createBasicAuthToken2(key2, secret2)}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(feedData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(" response : ", data);
    })
    .catch((err) => {
      console.log(err);
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
    throw new Error("Error getting recommendation tests");
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
  console.log("isAnonymous =>", isAnonymous, "flow => ", flow);
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
    IsPositiveFeedback = false;
    console.log(
      "### FeedbackbotQuestions before rename => ",
      feedbackBotQuestions
    );
    feedbackBotQuestions = renameKey(initialfeedbackBotQuestions);
    console.log(
      "### FeedbackbotQuestions  after rename => ",
      feedbackBotQuestions
    );
    feedbackBotQuestions["1"] = "Why are you giving me a thumbs down today?";
    console.log(
      "### FeedbackbotQuestions after indexing => ",
      feedbackBotQuestions
    );
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
async function getResponseStyleList() {
  try {
    const res = await fetch(`${baseURL2}/coaching-conversations/get-response-style-list/`, {
      method: "GET",
      headers: {
        Authorization: `Basic ${createBasicAuthToken2(key2, secret2)}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }

    const data = await res.json();
    console.log("responseStyle", data);
    return data; // styleMap equivalent
  } catch (error) {
    console.error("Failed to fetch response style list:", error);
    return null;
  }
}


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
    console.log("PRevious conversations", botConv);
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
    throw new Error("Error in getting bot conversation");
  }
};

function populateChatHistory(chatId) {
  if (optedBeginSession) return;
  
  const results = previousChatHistory.filter(session => session.uid === chatId);
  if (results.length === 0) {
    console.warn("No chat history found for session:", chatId);
    return;
  }

  const sessionData = results[0];
  const conversations = sessionData.conversations;

  if (!Array.isArray(conversations) || conversations.length === 0) {
    console.warn("No conversations in this session:", chatId);
    return;
  }

  console.log('Loading previous chat history:', chatId, conversations);

  // Display chat header
  appendMessage2(`<b>🔄 Loading previous chat:</b> <i>${sessionData.summary?.slice(0, 30) || "No Summary"}...</i>`);

  conversations.forEach((entry, index) => {
    const coachMessage = entry.coach_message_text?.trim();
    const participantMessage = entry.participant_message_text?.trim();

    if (coachMessage && index !== 0) {
      appendMessage2(parseMarkdown(coachMessage));
    }

    if (participantMessage) {
      const cleanedMessage = participantMessage
        .replace(" I am not sure if you are getting my point, let me know and I can explain further.", "")
        .replace(" Always respond in less than 50 tokens. Note: Never mention token count.", "")
        .trim();

      if (cleanedMessage) {
        appendMessageForUser2(parseMarkdown(cleanedMessage));
      }
    }
  });

  // Display chat footer
  appendMessage2(
  `<b>✅ End of chat:</b> <i title="${sessionData.summary || "No Summary"}">
    ${sessionData.summary?.slice(0, 30) || "No Summary"}...
  </i>`
);


  // Disable the selected dropdown option
  // const dropdown = document.getElementById('chatHistoryDropdown');
  // if (dropdown) {
  //   Array.from(dropdown.options).forEach(opt => (opt.disabled = false)); // Reset all first
  //   const selectedOption = Array.from(dropdown.options).find(opt => opt.value === chatId);
  //   if (selectedOption) selectedOption.disabled = true;
  // }
}


async function populateChatHistoryOptions(refresh = false) {
  const chathistorywrapper = document.getElementById('chat-history-wrapper');
  const dropdown = document.getElementById('chatHistoryDropdown');
  if (!dropdown) return;

  // Clear existing options
  dropdown.innerHTML = "";

  // 1. Disabled "Previous Chats" option
  const defaultOption = document.createElement("option");
  defaultOption.textContent = "Session History";
  defaultOption.disabled = true;
  defaultOption.selected = true;
  dropdown.appendChild(defaultOption);

  // 2. "➕ Start New Chat" option
  const newChatOption = document.createElement("option");
  newChatOption.textContent = "➕ Start New Chat";
  newChatOption.value = "new-chat"; // special value
  newChatOption.style.fontWeight = "bold";
  newChatOption.style.color = "#0066cc";
  dropdown.appendChild(newChatOption);

  // 3. Fetch chats if empty or refresh
  if (previousChatHistory.length === 0 || refresh) {
    await getPreviousChats(userId2, botId, refresh);
  }

  // 4. Create optgroups
  if (previousChatHistory.length > 0) {
    const completedOptGroup = document.createElement("optgroup");
    completedOptGroup.label = "Completed Chats";

    const incompleteOptGroup = document.createElement("optgroup");
    incompleteOptGroup.label = "Incomplete Chats";

    previousChatHistory.forEach(chat => {
      const option = document.createElement("option");
      option.value = chat.uid;

      const isIncomplete =
        chat.summary === null ||
        chat.summary === '' ||
        chat.summary.includes('No Summary');

      const truncated = chat.summary && chat.summary.length > 30
        ? chat.summary.slice(0, 30) + "..."
        : chat.summary || `Chat ${chat.uid}`;

      option.textContent = isIncomplete ? `❌ ${truncated}` : truncated;
      option.title = isIncomplete ? "Abandoned chat — needs attention" : chat.summary || `Chat ${chat.uid}`;
      option.style.color = isIncomplete ? "red" : "green";

      if (isIncomplete) {
        incompleteOptGroup.appendChild(option);
      } else {
        completedOptGroup.appendChild(option);
      }
    });

    if (completedOptGroup.children.length > 0) dropdown.appendChild(completedOptGroup);
    if (incompleteOptGroup.children.length > 0) dropdown.appendChild(incompleteOptGroup);
  }

  // 5. Show the dropdown wrapper
  if (chathistorywrapper) {
    chathistorywrapper.style.display = "block";
  }

  // 6. Add listener to handle "Start New Chat"
  dropdown.addEventListener("change", (e) => {
  const selectedValue = e.target.value;
  if (selectedValue === "new-chat") {
    // ✅ Simulate a click on the "Begin session" button
    const beginSessionButton = document.getElementById("begin-session-button");
    if (beginSessionButton) {
      beginSessionButton.click();
    }

    // Optional: Reset dropdown to first item
    dropdown.selectedIndex = 0;
  }
  });
}




async function getPreviousChats(participant_id, bot_id, refresh = false) {
  try {
    const url = `${baseURL2}/coaching-conversations/bot-conversation-data/?for=user-chat-history&user_id=${participant_id}&bot_id=${bot_id}&refresh=${refresh}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Basic ${createBasicAuthToken2(key2, secret2)}`,
      },
    });

    const botConv = await response.json();
    console.log("Previous chats", botConv);
    previousChatHistory = botConv

    return botConv; // optional: if you want to use it elsewhere
  } catch (error) {
    console.error("Failed to fetch previous chats:", error);
    return [];
  }
}


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
    results.forEach((element, index) => {
      const coach_message_text = element["coach_message_text"];
      const participant_message_text = element["participant_message_text"];

      // botPreviousConversationHistory.push(coach_message_text.trim().replace("\n", ""))
      if (coach_message_text && coach_message_text !== "" && index !== 0) {
        appendMessage2(coach_message_text);
      }
      if (participant_message_text && participant_message_text !== "") {
        if (participant_message_text && participant_message_text !== "") {
          appendMessageForUser2(
            participant_message_text
              .replace(
                " I am not sure if you are getting my point, let me know and I can explain further.",
                ""
              )
              .replace(
                " Always respond in less than 50 tokens. Note: Never mention token count.",
                ""
              )
          );
        }
      } else if (participant_message_text && participant_message_text !== "") {
        if (participant_message_text && participant_message_text !== "") {
          appendMessageForUser2(
            participant_message_text
              .replace(
                " I am not sure if you are getting my point, let me know and I can explain further.",
                ""
              )
              .replace(
                " Always respond in less than 50 tokens. Note: Never mention token count.",
                ""
              )
          );
        }
      } else if (participant_message_text && participant_message_text !== "") {
        // If there's no coach message, only append participant message
        appendMessageForUser2(
          participant_message_text
            .replace(
              " I am not sure if you are getting my point, let me know and I can explain further.",
              ""
            )
            .replace(
              " Always respond in less than 50 tokens. Note: Never mention token count.",
              ""
            )
        );
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
    appendMessage2(
      "<b>Previous completed or terminated conversations. New sessions from here on.</b>"
    );
    if (botType === "user_bot") {
      appendMessage2(addStickerToMessage("System", `${botWelcomeMessage}`));
    }
    isBotConversationPopulated = true;
  } else {
    if (botType === "user_bot") {
      // appendMessage2(
      //   addStickerToMessage(
      //     "Welcome",
      //     "Very good day! Looks like you are all set to start your session. Let me know what would you like to discuss today?"
      //   )
      // );
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
    .catch((error) => {
      console.error("got error in bot engagement button clicked", error);
      throw new Error("Error in bot engagement button click");
    });
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
    .catch((error) => {
      console.error("got error in user_profile", error);
      throw new Error("Error getting user profiles");
    });
};

const getIdps = async (user_id) => {
  try {
    const resp = await fetch(
      `${baseURL2}/accounts/get_or_create_idp/?user_id=${user_id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Basic ${createBasicAuthToken2(key2, secret2)}`,
        },
      }
    );
    result = await resp.json();
    if (result.length > 0) {
      return true; // means there is idp so proceed idp related question
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error while fetching idp details", error);
    return false;
  }
};
function showLoader(message = "Loading...") {
  const loader = document.createElement("div");
  loader.id = "bot-loader";

  loader.innerHTML = `
    <style>
      .wave-loader-container {
        position: absolute;
        top: 0; left: 0;
        width: 100%; height: 100%;
        background: rgba(255, 255, 255, 0.9);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        font-family: 'Segoe UI', Arial, sans-serif;
      }

      .wave-text {
        margin-bottom: 20px;
        font-size: 1.25rem;
        font-weight: 500;
        text-align: center;
        color: #1f2937;
        padding: 0 20px;
        line-height: 1.5;
        max-width: 400px;
      }

      .wave {
        display: flex;
        gap: 6px;
      }

      .wave span {
        display: block;
        width: 10px;
        height: 30px;
        background-color:rgb(87, 223, 160);
        animation: waveAnim 1.2s infinite ease-in-out;
        border-radius: 4px;
      }

      .wave span:nth-child(2) {
        animation-delay: 0.2s;
      }

      .wave span:nth-child(3) {
        animation-delay: 0.4s;
      }

      .wave span:nth-child(4) {
        animation-delay: 0.6s;
      }

      .wave span:nth-child(5) {
        animation-delay: 0.8s;
      }

      @keyframes waveAnim {
        0%, 100% {
          transform: scaleY(1);
        }
        50% {
          transform: scaleY(2.2);
        }
      }
    </style>
    <div class="wave-loader-container">
      <div class="wave">
        <span></span><span></span><span></span><span></span><span></span>
      </div>
    </div>
  `;

  const chatElement = document.getElementById("chat-element2");
  if (chatElement?.shadowRoot) {
    chatElement.shadowRoot.append(loader);
  } else {
    console.warn("chat-element2 or its shadowRoot not found");
  }
}


function hideLoader() {
  const chatElement = document.getElementById("chat-element2");
  if (chatElement?.shadowRoot) {
    const loader = chatElement.shadowRoot.getElementById("bot-loader");
    if (loader) loader.remove();
  } else {
    console.warn("chat-element2 or its shadowRoot not found");
  }
}


async function setupBotAndProceed() {
  if (snnipetConfigSTT?.createBotSheetUrl) {
    console.log('botId not found, creating bot sheet');
    showLoader("Creating Bot ....")
    const createBotSheetUrl = snnipetConfigSTT.createBotSheetUrl;

    const createdBotData = await CreateBotbyCSV(createBotSheetUrl);
    console.log('bot', createdBotData, createdBotData[0]?.bot_id);

    if (createdBotData.length > 0 && createdBotData[0]?.bot_id) {
      botId = createdBotData[0].bot_id;
    }
    hideLoader();
  }

  return botId;
}

const getMindmapandAssessment = async (user_id) => {
  try {
    const response = await fetch(`${baseURL2}/accounts/get-mindmap-and-assessments-report/?user_id=${user_id}`, {
      method: "GET",
      headers: {
        Authorization: `Basic ${createBasicAuthToken2(key2, secret2)}`,
      },
    });

    if (!response.ok) {
      console.log("Error fetching mindmaps and assessments");
    }

    const data = await response.json();
    console.log("Mindmaps and Assessments: ", data);
    MindMapLinks = data.mindmaps || [];
    AssessmentLinks = data.assessments || [];
    return data;
  } catch (error) {
    console.error("Error: ", error);
  }
};

// Utility to populate dropdowns
async function populateDropdown(menuId ) {
    if (botId === undefined || botId === null) {
      return;
    }
    const menu = document.getElementById(menuId);
    menu.innerHTML = ""; // clear existing

    if (!MindMapLinks || !AssessmentLinks) {
      await getMindmapandAssessment(userId2);
    }

    let items = [];
    if (menuId === "mindmap-menu") {
      const mindmapBtn = document.getElementById("mindmap-btn");
      items = MindMapLinks || [];
      mindmapBtn.style.display = items.length > 0 ? "block" : "none";
    } else if (menuId === "assessment-menu") {
      const assessmentBtn = document.getElementById("assessment-btn");
      items = AssessmentLinks || [];
      assessmentBtn.style.display = items.length > 0 ? "block" : "none";
    }

    items.forEach(item => {
        const div = document.createElement("div");
        div.className = "dropdown-item";
        div.style.cssText = "display:flex; align-items:center; gap:8px; padding:5px; cursor:pointer; border-radius:4px; transition: background-color 0.2s;";
        div.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                 viewBox="0 0 24 24" fill="none" stroke="blue"
                 stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M15 3h6v6"/>
                <path d="M10 14 21 3"/>
                <path d="M18 13v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
            </svg>
            <span style="color:black;">${item.name}</span>
        `;
        div.addEventListener("click", () => {
            window.open(item.link, "_blank");
        });
        menu.appendChild(div);
    });
}

const getBotDetails2 = async (botId) => {
  try {
    if (snnipetConfigSTT?.createBotSheetUrl != undefined) {
      botId = await setupBotAndProceed();
    }
    const response = await fetch(
      `${baseURL2}/accounts/get-bot-details/?bot_id=${botId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Basic ${createBasicAuthToken2(key2, secret2)}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Error getting bot info");
    }

    //padding-space bottom
    const shadowRootMessagesC =
      document.getElementById("chat-element2").shadowRoot;
    const messagesContainer = shadowRootMessagesC.getElementById("messages");

    if (messagesContainer) {
      messagesContainer.style.paddingBottom = "2rem";
    }

    const botDetails = await response.json();
    console.log("Bot Details : ", botDetails);
    console.log("FAQS => ", botDetails.data.faqs);
    globalBotDetails = botDetails;
    botType = botDetails.data.bot_type;
    botScenarioCase = botDetails.data.scenario_case;
    LLMsystemInstructions = botDetails.data.system_instructions;
    // botSelectedLLM = botDetails.data.selected_llms;
    console.log('LLMOrder',LLMOrder,botDetails.data.llm_order);
    LLMOrder = botDetails.data.llm_order


    if (window.user){
      if( botType == 'user_bot'){
            updateAudioAllowed(false, false)
      } else {
        updateAudioAllowed(true, true)
      }

      populateDropdown("mindmap-menu");
      populateDropdown("assessment-menu");
    }
   


    if (botType === "user_bot") {
      botWelcomeMessage = `Welcome to ${botDetails.data.bot_name}. Please ask me any related query and let's dive in.`;
    } else if (botType === "deep_dive") {
      botWelcomeMessage =
        " Welcome to the Engagement survey. Consider this as a check in to get your detailed point of view around the topic mentioned on this page. The response to the survey can be totally anonymous - so respond frankly and give voice to critical topics important to the team. Click 'Begin Session' to get started and respond in detail.";
    } else if (["avatar_bot", "subject_specific_bot"].includes(botType)) {
      botWelcomeMessage =
        (botType === "avatar_bot" && botScenarioCase === "icons_by_ai")
          ? (isFlatWidget? 
          `I'm your AI CoachBot, designed to help you discover solutions through guided questions. I offer three modes:
            
            • Coach Mode - Explore solutions through ICF-aligned GROW coaching questions
            • Mentor Mode - Get direct business advice and executive strategies
            • Mindset Mode - Examine and reframe unhelpful thought patterns
            • What's on your mind that you'd like to explore today?
          `
          :
                    `Welcome to <b>${botDetails.data.bot_name}</b>. Your personal self-discovery and growth agent is purpose-built with a question-first approach for reflection.`
            )
    : "Welcome to the world of AI coaching copilots. As your personal coaching co-pilot, I can make you 10x smarter. Let's start!"
      const shadowRoot = document.getElementById("chat-element2").shadowRoot;
      console.log(shadowRoot.getElementById("text-input"));

      shadowRoot
        .getElementById("text-input")
        .setAttribute(
          "placeholder",
          `Please follow provided instructions and select "Begin session"`
        );
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
    //   botFooterElement.innerHTML = `<p>AI Copilot works based on the coach-provided background. For optimum results use 15 words or more in response.</p>`;
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

    if (botDetails.data.faqs && !["user_bot", "deep_dive"].includes(botType)) {
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

    



    if (
      botDetails.data.is_fitment_analysis &&
      !["role_bot", "skill_bot", "skill_guide", "icons_by_ai"].includes(
        botDetails.data.scenario_case
      ) &&
      !["user_bot", "deep_dive", "subject_specific_bot"].includes(botType)
    ) {
      // faqButtonsGenerator("fitness_analysis", "Match Score");
      const button = document.createElement("button");
      button.setAttribute(
        "style",
        `width: fit-content; padding: 4px 8px; font-size: 12px; border: 1px solid lightgray; border-radius: 4px; min-width: fit-content; background-color: white; color : #374151;`
      );
      button.setAttribute(
        "onmouseover",
        "this.style.backgroundColor = '#f9fafb';"
      );
      button.setAttribute(
        "onmouseleave",
        "this.style.backgroundColor = 'white'"
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

    if (["avatar_bot", "subject_specific_bot", "deep_dive"].includes(botType)) {
      endSessionButton = document.createElement("button");
      endSessionButton.setAttribute(
        "style",
        `width: fit-content; padding: 4px 8px; font-size: 12px; border: none; border-radius: 4px; min-width: fit-content; background : #9ca3af; color: black;`
      );
      endSessionButton.style.backgroundColor = "#d3d3d3";
      endSessionButton.style.color = "#a0a0a0";
      endSessionButton.style.fontWeight = "600";
      endSessionButton.setAttribute("id", "end-session-btn");
      if (botScenarioCase === "icons_by_ai") {
        endSessionButton.innerText = "End session";
      } else {
        endSessionButton.innerText = "End and Email Summary";
      }
      endSessionButton.style.cursor = "not-allowed";
      endSessionButton.disabled = true;
      buttonsWrapper.appendChild(endSessionButton);
    }
    console.log("buttons : ", buttons);
  if (["avatar_bot"].includes(botType) && botScenarioCase === "icons_by_ai") {

   styleMap = await getResponseStyleList()

  function convertTextToOriginalFormat(displayText) {
    return styleMap[displayText] || displayText;
  }

  function convertTextToCorrectFormat(backendValue) {
    const reverseMap = Object.fromEntries(
      Object.entries(styleMap).map(([k, v]) => [v, k])
    );
    return reverseMap[backendValue] || backendValue;
  }


  // If not valid, default to "icf_aligned_coach"
  const allowedValues = Object.values(styleMap);
  if (!allowedValues.includes(selectedResponseType)) {
    selectedResponseType = "icf_aligned_coach";

    // Send default immediately if needed
    if (participantId2) {
      fetch(`${baseURL2}/coaching-conversations/save-response-style/`, {
        method: "POST",
        headers: {
          Authorization: `Basic ${createBasicAuthToken2(key2, secret2)}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: participantId2,
          response_style: selectedResponseType,
        }),
      }).then((res) => res.json()).then(() => {});
    }
  }


  // Create dropdown
  const select = document.createElement("select");
  select.id = "style-selector";
  select.style.cssText = `
    font-size: 12px;
    padding: 4px;
    border-radius: 4px;
    border: 1px solid #ccc;
    margin-left: 8px;
    cursor: pointer;
    vertical-align: middle;
    min-width: 160px;
  `;

  // Add default option
  // const defaultOption = document.createElement("option");
  // defaultOption.textContent = "Select Style";
  // defaultOption.value = "";
  // defaultOption.disabled = true;
  // if (!selectedResponseType) defaultOption.selected = true;
  // select.appendChild(defaultOption);

  // Add style options with pre-selected logic
  for (const label in styleMap) {
    const value = styleMap[label];
    const option = document.createElement("option");
    option.value = value;
    option.textContent = label;
    if (selectedResponseType === value) {
      option.selected = true;
    }
    select.appendChild(option);
  }

  // Handle selection change
  select.addEventListener("change", () => {
    const selectedValue = select.value;
    if (participantId2) {
      fetch(`${baseURL2}/coaching-conversations/save-response-style/`, {
        method: "POST",
        headers: {
          Authorization: `Basic ${createBasicAuthToken2(key2, secret2)}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: participantId2,
          response_style: selectedValue,
        }),
      }).then((res) => res.json()).then(() => {});
    }
  });

  // Inject into #response-style
  const container = document.getElementById("response-style");
  container.innerHTML = ""; // clear if re-rendering
  container.appendChild(select);
  container.style.display = "block";
}


    // if (!["user_bot",'deep_dive'].includes(botType)) {
    //    //canned button one
    //   const cannedButtonOne = document.createElement("button");
    //   cannedButtonOne.setAttribute(
    //     "style",
    //     `width: fit-content; padding: 4px 8px; font-size: 12px; border: 1px dashed lightgray; border-radius: 4px; min-width: fit-content; background-color: white; color : #374151;`
    //   );

    //   cannedButtonOne.setAttribute(
    //     "onmouseover",
    //     "this.style.backgroundColor = '#f9fafb'; this.style.cursor = 'not-allowed'"
    //   );
    //   cannedButtonOne.setAttribute(
    //     "onmouseleave",
    //     "this.style.backgroundColor = 'white'"
    //   );

    //   cannedButtonOne.addEventListener(
    //     "click",
    //     () => {
    //       sendMessage("Not exactly...")
    //     }
    //   );
    //   cannedButtonOne.setAttribute(
    //     "disabled",
    //     true
    //   )

    //   cannedButtonOne.setAttribute("id", `canned-btn-1`);
    //   cannedButtonOne.innerText = "Not exactly...";
    //   buttonsWrapper.appendChild(cannedButtonOne);

    //   //canned button two

    //   const cannedButtonTwo = document.createElement("button");
    //   cannedButtonTwo.setAttribute(
    //     "style",
    //     `width: fit-content; padding: 4px 8px; font-size: 12px; border: 1px dashed lightgray; border-radius: 4px; min-width: fit-content; background-color: white; color : #374151;`
    //   );

    //   cannedButtonTwo.setAttribute(
    //     "onmouseover",
    //     "this.style.backgroundColor = '#f9fafb', this.style.cursor = 'not-allowed' "
    //   );
    //   cannedButtonTwo.setAttribute(
    //     "onmouseleave",
    //     "this.style.backgroundColor = 'white'"
    //   );

    //   cannedButtonTwo.addEventListener(
    //     "click",
    //     () => {
    //       sendMessage("Yes I agree...")
    //     }
    //   );

    //   cannedButtonTwo.setAttribute(
    //     "disabled",
    //     true
    //   )
    //   cannedButtonTwo.setAttribute("id", `canned-btn-2`);
    //   cannedButtonTwo.innerText = "Yes I agree..";
    //   buttonsWrapper.appendChild(cannedButtonTwo);
    // }

    faqHtmlData = `<div id="option-button-container" >
                      ${buttons}
                      </div>`;
    // sending welcome msg
    if (snnipetConfigSTT?.welcomeMessage !== undefined) {
      botWelcomeMessage = snnipetConfigSTT.welcomeMessage
    }
    if (botType === "user_bot") {
      appendMessage2(addStickerToMessage("System", `${botWelcomeMessage}`));
    } else {
      appendMessage2(`${botWelcomeMessage}`);
    }

    if (!window.user) {
      isEmailFormstt = true;
      formFieldsstt = ["email", "name"];
      console.log(
        "### formFieldsstt : ",
        formFieldsstt,
        "other data: ",
        `Please enter your ${formFieldsstt[0]}`
      );
      appendMessage2('<b>Please enter your email. (Used for reporting and ranking. Please use same email for accurate tracking).</b>')
    }
    // const
    const faqButtonsWrapper = document.getElementById("starting-faq-buttons");
    const faqButtonsWrapper2 = document.getElementById("starting-faq-buttons-headers");

    console.log("faqButtonsWrapper", faqButtonsWrapper);

    if (botType != "feedback_bot") {
      fitmentAnalysisQuestions = botDetails.data.fitment_qna;
      fitmentAnalysisOptions = botDetails.data.fitment_options;
      botInitialQuestions = botDetails.data.initial_qna;
      isFitmentAllowed = botDetails.data.is_fitment_analysis;
      isStrictFitment = botDetails.data.is_strict_fitment;
      isBotAudioResponse = botDetails.data.is_audio_response;
      CoachingForFitment = botDetails.data.coaching_for_fitment;
      const effectiveButtonPosition = snnipetConfigSTT?.buttonPosition ?? buttonPositionSTT;

      if ( effectiveButtonPosition === "top"){
        faqButtonsWrapper2.style.display = "flex";
        faqButtonsWrapper2.append(buttonsWrapper);
      } else {
        faqButtonsWrapper.style.display = "flex";
        faqButtonsWrapper.append(buttonsWrapper);
      }
      if (botType === "deep_dive") {
        botInitialQuestions = {
          1: "Please let us know more about your context for this survey such as role, impact and whatever else you may feel comfortable with.",
        };
      }
      // appendMessage2(faqHtmlData);
    } else {
      feedbackBotInitialFlow("initial");
      feedbackBotQuestions = botDetails.data.feedback_qna;
      initialfeedbackBotQuestions = botDetails.data.feedback_qna;
    }
    if  (!window.user) {
      setBeginSessionEnabled(false);
    }

    //   appendMessage2('jiks')
    //   const faqs = botDetails.faq;
    console.log("id", userId2, participantId2);
    console.log("id from web app", window.userIdFromWebApp);
    // if (
    //   !isBotConversationPopulated &&
    //   !["feedback_bot", "deep_dive", "user_bot"].includes(botType)
    // ) {
    //   populateBotConversation(window.userIdFromWebApp);
    // }
    if(window.user) {
      if (!["feedback_bot", "deep_dive", "user_bot"].includes(botType)) 
        { 
          populateChatHistoryOptions();   
        }
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
  const fitmentData = {
    method: "post",
    qna: JSON.stringify(fitmentAnalysisQnA),
    qna_type: "fitment",
    user_id: participantId2,
  };
  try {
    const queryparam = new URLSearchParams(fitmentData);

    const resp = await fetch(`${baseURL2}/accounts/get-user-feedback-data/`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${createBasicAuthToken2(key2, secret2)}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fitmentData),
    });

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
    if (typeof question === "string") {
      return !(
        question.toLowerCase().includes("idp") ||
        question.toLowerCase().includes("individual development plan")
      );
    } else if (question.hasOwnProperty("question")) {
      const que = question["question"];
      return !(
        que.toLowerCase().includes("idp") ||
        que.toLowerCase().includes("individual development plan")
      );
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

function sendUserMessage(message, shadowRoot) {
  shadowRoot.getElementById("text-input").focus();
  setTimeout(() => {
    shadowRoot.getElementById("text-input").textContent = message;
    setTimeout(() => {
      shadowRoot.querySelectorAll(".input-button")[1].click();
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


async function handleIntakeQues(btn) {
  try {
    const root = document.getElementById("chat-element2").shadowRoot;
    const formData = {
      Name: root.getElementById("intake-name").value.trim(),
      Role: root.getElementById("intake-role").value,
      Department: root.getElementById("intake-department").value,
      Team: root.getElementById("intake-teamSize").value
    };

    console.log("Form Data:", formData);

    const intakeformdata = {
      qna: formData,
      user_id: userId2
    };

    // Send data to backend
    const response = await fetch(
      `${baseURL2}/coaching-conversations/coaching-intake/`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${createBasicAuthToken2(key2, secret2)}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(intakeformdata),
      }
    );

    const data = await response.json();
    console.log("Intake Submission Response:", data);

    // ✅ Replace the form block with submitted data summary
    const formContainer = root.getElementById("quick-intake-form");
    if (formContainer) {
      formContainer.innerHTML = `
        <div style="font-size: 14px; color: #333; line-height: 1.4;">
          <strong>✅ Intake Submitted</strong><br>
        </div>
      `;
    }

    // Trigger begin session if available
    const beginSessionButton = document.getElementById("begin-session-button");
    if (beginSessionButton) {
      beginSessionButton.click();
    }
    isAskingIntake = false;

  } catch (error) {
    console.error("Error submitting intake:", error);
  }
}



async function SendingFirstInitialQue() {
  // disabling button
  disableOrEnableButtons("initial_question_proceed");

  //sending first question
  isAskingInitialQuestions = true;
  // if (botType === 'avatar_bot'){
  // botInitialQuestions = getIntakeReadyBotInitialQuestions(botInitialQuestions)
  // }
  console.log(botInitialQuestions, "botInitialQuestions");

  isIdp = await getIdps(userId2);
  console.log("isIdp", isIdp);
  if (!isIdp) {
    botInitialQuestions = handleIdpsRelatedQuestions(botInitialQuestions);
  }
  console.log(botInitialQuestions, "botInitialQuestions");
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

async function handleprecheck(choice) {
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
        "#22c55e"
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

    if (
      !isBeginSessionProceed &&
      isFitmentAllowed &&
      isStrictFitment &&
      globalBotDetails.data.scenario_case != "icons_by_ai" &&
      !["coach", "mentor"].includes(UserProfileInfo.profile_type)
    ) {
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
        "#22c55e"
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

    if (
      !isBeginSessionProceed &&
      isFitmentAllowed &&
      isStrictFitment &&
      globalBotDetails.data.scenario_case != "icons_by_ai" &&
      !["coach", "mentor"].includes(UserProfileInfo.profile_type)
    ) {
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
  if (!window.user) {
    return;
  }
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

    if (
      ["icons_by_ai"].includes(
        globalBotDetails.data.profile_details.profile_type
      ) ||
      ["coach", "mentor"].includes(UserProfileInfo.profile_type)
    ) {
      appendMessage2(
        addStickerToMessage(
          "Match Score",
          "In certain cases, the 'Match Scores' caluclation may fail. For AI Coaching Agent / external coaches and mentors no Match Scores available. For internal coaches and mentors, we can calculate it based on the options selected. Scores are not generated/valid, in case you are interacting with the Coachbot as a coach/mentor.",
          "#fb923c"
        )
      );
      fitmentAnalysisInProgress = false;
      return;
    }

    if (quickMatchMessage) {
      appendMessage2(
        `<div id='fitment-container-${fitmentContainerId}'>${addStickerToMessage(
          "Match Score",
          quickMatchMessage,
          "#fb923c"
        )}</div>`
      );
      fitmentAnalysisInProgress = false;
      fitmentContainerId += 1;
      return;
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
      ).innerHTML = addStickerToMessage("Match Score", que_msg, "#fb923c");
      fitmentAnalysisInProgress = false;
      fitmentContainerId += 1;
      quickMatchMessage = que_msg;

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
                    ${i === Object.keys(fitmentAnalysisQuestions).length
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
      console.log("scenario case", globalBotDetails.data.scenario_case);
      if (optedBeginSession) {
        console.log("===> yes optedBeginSession");
        return;
      }
      if (botType === 'avatar_bot' && botScenarioCase === 'icons_by_ai' ){

        const response = await fetch(`${baseURL2}/coaching-conversations/coaching-intake/?user_id=${userId2}`,
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
        );
        if (response.ok) {
          const data = await response.json();
          const qna = data.qna || {};
          console.log('intake', data, qna)
          appendMessage2(`
            <div style="
              font-size: 14px;
            ">
              <strong>Here is your intake information:</strong>
              <div><strong>Name:</strong> ${qna["Name"] || "—"}</div>
              <div><strong>Role:</strong> ${qna['Role'] || "—"}</div>
              <div><strong>Department:</strong> ${qna['Department'] || "—"}</div>
              <div><strong>Team:</strong> ${qna['Team'] || "—"}</div>
            </div>
          `);
        } else {
        // Dynamic option arrays
        const roleOptions = [
          "Individual Contributor",
          "Team Lead/Senior IC",
          "Manager (1-2 levels below)",
          "Director/Senior Manager",
          "VP/Head of Department",
          "C-Suite/Founder"
        ];

        const departmentOptions = [
          "Engineering/Product",
          "Sales/Business Development",
          "Marketing",
          "Operations/Finance",
          "HR/People",
          "Customer Success",
          "Other"
        ];

        const teamSizeOptions = [
          "No direct reports",
          "1-3 direct reports",
          "4-10 direct reports",
          "11-25 direct reports",
          "25+ direct reports"
        ];

        // Function to generate options HTML
        function generateOptions(optionsArray, placeholder) {
  return `<option value="" disabled selected>${placeholder}</option>` +
    optionsArray.map(opt => `<option>${opt}</option>`).join("");
}

        // Inject form with inline CSS and dynamic options
        if (isAskingIntake) return;
        appendMessage2(`
  <div id="quick-intake-form" style="
    display: flex; 
    align-items: center; 
    gap: 5px; 
    flex-wrap: wrap; 
    background: #f1f0f0; 
    padding: 8px 10px; 
    border-radius: 12px; 
    font-family: Arial, sans-serif; 
    font-size: 14px; 
    line-height: 1.5;
  ">
    <span style="white-space: nowrap; font-weight: bold;">Please finish quick intake:</span>
    
    <input type="text" id="intake-name" placeholder="Name" required
      style="padding: 4px; border: 1px solid #ccc; border-radius: 4px; font-size: 13px; width: 100px;">

    <select id="intake-role" required
      style="padding: 4px; border: 1px solid #ccc; border-radius: 4px; font-size: 13px; width: 120px;">
      ${generateOptions(roleOptions, "Role")}
    </select>

    <select id="intake-department" required
      style="padding: 4px; border: 1px solid #ccc; border-radius: 4px; font-size: 13px; width: 120px;">
      ${generateOptions(departmentOptions, "Department")}
    </select>

    <select id="intake-teamSize" required
      style="padding: 4px; border: 1px solid #ccc; border-radius: 4px; font-size: 13px; width: 110px;">
      ${generateOptions(teamSizeOptions, "Team Size")}
    </select>

    <button 
      id="quickSubmit" 
      type="button" 
      style="padding: 2px 6px; font-size: 12px; border: none; border-radius: 4px; background: #4CAF50; color: white; cursor: pointer;"
      onclick="handleIntakeQues(
        this
      )"
    >✔</button>
  </div>
`);

         isAskingIntake = true;
         return;
        }
        
      }

      console.log(window.user, "is_logged_in");
      if (botType === "deep_dive") {
        const today = new Date();
        const botExpiresAt = new Date(globalBotDetails.data.bot_expires_at);

        today.setHours(0, 0, 0, 0);
        botExpiresAt.setHours(0, 0, 0, 0);

        console.log("expires_at: ", today, botExpiresAt);
        if (today > botExpiresAt) {
          appendMessage2(
            addStickerToMessage(
              "Begin Session",
              `<b><p>This bot has been expired.</p></b>`,
              "#22c55e"
            )
          );
          return;
        }

        if (!window.user) {
          appendMessage2(
            addStickerToMessage(
              "Begin Session",
              `<b><p>Please enter bot access code.</p></b>`,
              "#22c55e"
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
      if (begginSessionButton) {
        console.log("beggin-session-button", begginSessionButton);
        begginSessionButton.disabled = true;
        begginSessionButton.removeAttribute("onmouseover");
        begginSessionButton.removeAttribute("onmouseleave");
        begginSessionButton.style.background = "#d3d3d3";
        begginSessionButton.style.cursor = "not-allowed";
        begginSessionButton.style.color = "#a0a0a0";
      }
      const quickmatch = document.getElementById("quick-match-button");
      if (quickmatch && botType == "avatar_bot") {
        quickmatch.disabled = true;
        quickmatch.style.cursor = "not-allowed";
        quickmatch.removeAttribute("onmouseover");
        quickmatch.removeAttribute("onmouseleave");
        quickmatch.style.background = "white";
        quickmatch.style.color = "black";
      }

      const cannedMessageOne = document.getElementById("canned-btn-1");
      if (cannedMessageOne) {
        cannedMessageOne.disabled = false;
        // cannedMessageOne.style.cursor = "pointer"
        cannedMessageOne.setAttribute(
          "onmouseover",
          "this.style.backgroundColor = '#f9fafb'; this.style.cursor = 'pointer'"
        );

        const cannedMessageTwo = document.getElementById("canned-btn-2");
        cannedMessageTwo.disabled = false;
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

      if (!["deep_dive"].includes(botType)) {
        await getUserProfile(userId2);
        if (UserProfileInfo) {
          console.log("======profileType: ", UserProfileInfo.profile_type);
          if (["coach", "mentor"].includes(UserProfileInfo.profile_type) && !['icons_by_ai'].includes(botScenarioCase)) {
            appendMessage2(
              addStickerToMessage(
                "Begin Session",
                `<b><p>Interactions between coaches & mentors are not considered valid and are not optimized. For transparency, the interactions are not blocked.</p></b>`,
                "#22c55e"
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
      if (botType === "deep_dive" && window.user) {
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
            addStickerToMessage("Begin Session", optionData, "#22c55e")
          );
          isSomeActivityActive = true;
        }, 100);
      }

      if (
        [
          "avatar_bot",
          "helper_bot",
          "coachbots",
          "subject_specific_bot",
        ].includes(botType) &&
        !["role_bot", "skill_bot", "skill_guide"].includes(
          globalBotDetails.data.scenario_case
        )
      ) {
        // const begginSessionMessage = `<div  style="display: flex; flex-direction: column; margin: 0; padding: 0;">
        // <div style="font-size : 12px; font-weight: bold; background-color : #22c55e;color: white; padding: 4px; border-radius:4px; width: fit-content;">Begin Session</div>
        // <div style="margin-top : 8px; padding-top: 0px;">Welcome to your session. Here is my understanding of the situation: \n ${intakeSummery} \n Let me know if I missed anything?</div>`;
        // appendMessage2(begginSessionMessage);

        // appendMessage2(addStickerToMessage('Begin Session',`
        // <p>
        // Welcome to your session. Here is my understanding of the situation: <br> ${intakeSummery} ,<br> Let me know if I missed anything? <br><br> <b>Please update your ${intakebuttonText} questions if you believe this is not the right session context.</b>
        // <p>`,'#22c55e'))
        const msg = selectedChatId ? `Welcome back! Let's pick up right where we left off. If anything has changed or you'd like to adjust your direction, just let me know. Otherwise, feel free to continue from where we paused—I'm here to help you reach your goals.` 
                     :`Welcome to your session! What's the specific challenge you're facing? Once I understand that, I can provide immediate insights based on your background.`;

        appendMessage2(
          addStickerToMessage(
            "Begin Session",
            msg,
            "#22c55e"
          )
        );

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

      console.log(
        "checking before creating session:",
        isBotInitialized,
        isSessionActiveStt,
        botType
      );

      // because we are creating session on every in avatar and deepdive
      if (
        previousBotConversationId != "" &&
        !["avatar_bot", "deep_dive", "subject_specific_bot"].includes(botType)
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
        if (
          ["role_bot", "skill_bot", "skill_guide"].includes(
            globalBotDetails.data.scenario_case
          )
        ) {
          appendMessage2(
            addStickerToMessage(
              "Begin Session",
              `Welcome! How can I help today? I am an expert on ${globalBotDetails.data.bot_details.subject} and I can only have a conversation in this domain. There will be errors in my conversation if you ask me unrelated questions or give very short responses.`,
              "#22c55e"
            )
          );
        } else {
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

      appendMessage2(addStickerToMessage(intakebuttonText, divCont, "#dc2626"));
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
            buttons += `<button onmouseover="this.style.cursor ='pointer'" style="margin-top:5px; width:100%; padding:6px 4px;  border: 1px solid lightgray; border-radius: 4px;" onclick="handleSurpriseMeButtonClick2('${element.test_code
              }','${element.title.replaceAll("'", "")}')">${element.title
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
  let userName = "";
  if (!window.user) {
    // userEmail = shadowRoot2.getElementById("input-email2").value;
    userEmail = emailNameformJsonstt["email"];
    userName = emailNameformJsonstt["name"];
  } else {
    userEmail = window.user.email;
  }
  if (isAnonymous && botType === "deep_dive") {
    userName = "Anonymous User";
  }
  console.log("User email : ", userEmail);

  queryParams2 = new URLSearchParams({
    participant_id: participantId2,
    email: userEmail,
    name: userName,
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

  const send_email = snnipetConfigSTT.sendTranscriptEmail ?? 'true'

  const queryParamsEmail2 = new URLSearchParams({
    submitted_email: userEmail,
    submitted_name: userName,
    test_attempt_session_id: sessionId2,
    send_email: (send_email === 'true').toString()
  });

  console.log('send transcription email', send_email)

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
      if (!["feedback_bot", "deep_dive", "user_bot"].includes(botType)) populateChatHistoryOptions(true);

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
  if (isInActive === true) {
    appendMessage2(
      "<b>Due to inactivity, your session has ended. Please refresh the page to restart again anytime</b>"
    );
  } else {
    if (botType === "deep_dive") {
      appendMessage2(
        "<b>Thank you for taking the time to check in on the important topic. You may receive a response transcript for your records only.</b>"
      );
    } else {
      appendMessage2(`<b>Your session has completed. Your session summary, if enabled,  will be emailed to you. Now, you can start new session by clicking "Begin session".</b>`)
    }
  }

  isSessionActiveStt = false;
  isBotInitialized = false;
  optedBeginSession = false;

  const begginSessionButton = document.getElementById("begin-session-button");
  if (begginSessionButton) {
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
    begginSessionButton.style.color = "white";
    begginSessionButton.style.backgroundColor = "#22c55e";
  }

  const quickmatch = document.getElementById("quick-match-button");
  if (quickmatch) {
    quickmatch.setAttribute(
      "onmouseover",
      "this.style.backgroundColor = '#f9fafb'"
    );
    quickmatch.setAttribute(
      "onmouseleave",
      "this.style.backgroundColor = 'white'"
    );
    quickmatch.setAttribute(
      "onclick",
      `handleFaqButtonClick('fitness_analysis')`
    );
    quickmatch.style.color = "black";
    quickmatch.disabled = false;
    quickmatch.style.cursor = "pointer";
  }

  const cannedMessageOne = document.getElementById("canned-btn-1");

  if (cannedMessageOne) {
    cannedMessageOne.disabled = true;
    // cannedMessageOne.style.cursor = "pointer"
    cannedMessageOne.setAttribute(
      "onmouseover",
      "this.style.backgroundColor = '#f9fafb'; this.style.cursor = 'not-allowed'"
    );

    const cannedMessageTwo = document.getElementById("canned-btn-2");
    cannedMessageTwo.disabled = true;
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
  if (!window.user) {
    // appendMessage2(emailForm);
    if (botType === "deep_dive") {
      // const optionData = `<div id="anonymous-${uniqueSesssionContainerId}">
      //   <b>Want to continue as Anonymous?</b>
      //   </br> <div>
      //       <button onmouseover="this.style.cursor ='pointer'" style="margin-top:5px; width:fit-content; padding:6px 12px; border: 1px solid lightgray; border-radius: 4px;" onclick="getUserOrAnonymousDetailsDeepDive('Yes')">Yes</button>
      //       <button onmouseover="this.style.cursor ='pointer'" style="margin-top:5px; width:fit-content; padding:6px 12px; border: 1px solid lightgray; border-radius: 4px;" onclick="getUserOrAnonymousDetailsDeepDive('No')">No</button>
      //       </div>
      //   </div>`;

      // adding initial question to bot transcript
      const botData = Object.entries(botInitialQuestionsQnA).reverse();
      botData.forEach((element) => {
        sessionQnAdata.unshift({
          coach: element[0],
          user: element[1],
        });
      });

      sessionQnAdata.push({
        coach:
          "Thank you for taking the time to check in on the important topic. You may receive a response transcript for your records only.",
        user: "",
      });

      console.log("deepdiveBottranscriptData", botData, sessionQnAdata);
      sendBotTranscript2();
      // appendMessage2(optionData);
    } else {
      isEmailFormstt = true;
      formFieldsstt = ["name", "email"];
      const msg = formFieldsstt[0] === "email" ?
        `<b>Please enter your email. (Used for reporting and ranking. Please use same email for accurate tracking).</b>`
        : `<b>Please enter your ${formFieldsstt[0]}</b>`;
      appendMessage2(msg);
    }
  } else {
    // if(botScenarioCase !== "icons_by_ai"){ //no email trigger for icons_by_ai :- row 707
    if (botType === "deep_dive") {
      const botData = Object.entries(botInitialQuestionsQnA).reverse();
      botData.forEach((element) => {
        sessionQnAdata.unshift({
          coach: element[0],
          user: element[1],
        });
      });

      sessionQnAdata.push({
        coach:
          "Thank you for taking the time to check in on the important topic. You may receive a response transcript for your records only.",
        user: "",
      });

      console.log("deepdiveBottranscriptData", botData, sessionQnAdata);
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
    if (!emailCandidate2) {
      appendMessage2(
        "<b>Thank you. The feedback report is sent to your manager and you may hear from them directly.</b>"
      );
    } else {
      appendMessage2(
        `<p><b>It's showtime ✨, here is your detailed <a target="_blank" style="color: #3b82f6;text-decoration:none;" href="${globalReportUrl2}">feedback report</a>. The feedback is also emailed to you and will be available to you for 60 days.</b></p>`
      );
    }

    if (FeedbackVideoLinkStt && FeedbackVideoLinkStt.length > 0) {
      appendMessage2({
        "feedback_media": snippetDivSTT(FeedbackVideoLinkStt)
      })
    }
    //   gShadowRoot.getElementById(
    //     `mcq-option-${mcqFormId}`
    //   ).innerHTML = `<p>It's showtime ✨, here is your detailed <a target="_blank" style="color: #3b82f6;text-decoration:none;" href="${globalReportUrl}">feedback report</a>. The feedback is also emailed to you and will be available to you for 60 days.</p>`;
    //   appendMessage(message);

    //* send message to start new session
    userScenarioRecommendationStt = await getTestRecommendationsStt(questionData2.results[0].uid, null, null, userId2);
    console.log(senarioCase2, clientuserInformationSTT.show_recommendations)
    if (['psychometric', 'game', 'interview'].includes(senarioCase2)
      || !clientuserInformationSTT.show_recommendations
      || userScenarioRecommendationStt.total_recommendation >= 2) {
      appendMessage2("<b>Please enter another interaction code to start a new interaction.</b>")
    } else {

      appendMessage2(`<b>Our skills discovery engine has suggested a new simulation based on observed gaps. Do you want to explore it now? </b><br/><br/>
              <div class="deep-chat-temporary-message" id='related-recommendation2'>
              <button class="deep-chat-button deep-chat-suggestion-button" style="border: 1px solid green">Yes</button>
              <button class="deep-chat-button deep-chat-suggestion-button" style="border: 1px solid #d80000">No</button> </div>
        `)
      startScenarioRecommendationsStt = true
      PreviousSessionInfoSTT['sessionId'] = sessionId2
      PreviousSessionInfoSTT['skills'] = questionData2.results[0].skills_to_evaluate
    }

    submitEmailAndName2();
  } else {
    // appendMessage2(getCredentialsForm2());
    isEmailFormstt = true;
    formFieldsstt = ["name", "email"];
    const msg = formFieldsstt[0] === "email" ?
      `<b>Please enter your email. (Used for reporting and ranking. Please use same email for accurate tracking).</b>`
      : `<b>Please enter your ${formFieldsstt[0]}</b>`;
    appendMessage2(msg);
  }
};

function createMessageNodeUser2(message) {
  const messageNode = document.createElement("div");
  messageNode.classList.add("inner-message-container");

  const avatarNode = document.createElement("div");
  avatarNode.classList.add("avatar-container", "right-item-position");

  const avatarImage = document.createElement("img");
  avatarImage.setAttribute("src", UserAvatarImageURL);
  avatarImage.setAttribute("class", "avatar");

  avatarNode.appendChild(avatarImage);

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
  messageNode.appendChild(avatarNode);

  return messageNode;
}

function appendMessageForUser2(message2) {
  gShadowRoot2 = document.getElementById("chat-element2").shadowRoot;
  const messageNode = createMessageNodeUser2(message2);
  gShadowRoot2.getElementById("messages").appendChild(messageNode);
  gShadowRoot2.getElementById("messages").scrollBy(0, 500);
}

function formatMessage2(message) {
  const getMediaPreviewHTML = (iframe, heading = '▶️ AI Coach Lesson or Additional Context') => `
    <details>
      <summary style="cursor: pointer; font-weight: bold; margin-top: 1em;">${heading}</summary>
      <div style="margin-top: 0.5em;">
        ${iframe}
      </div>
    </details>
  `;
  if (Array.isArray(message)) {
    return message.map((item, index) => {
      if (typeof item === 'string') {
        return `<span>${item}</span>`;
      } else if (item.title && item.description) {
        return `<div><strong>${item.title}:</strong> <span>${item.description}</span></div>`;
      }
      return item;
    }).join("<hr />");
  } else if (typeof message === 'object') {
    const keyToTitleMappings = {
      title: "Title",
      description: "Description",
      instructions: "Instructions",
      instruction_media: "Reference",
      oem: "▶️ AI Coach Lesson or Additional Context (Expand to view or pause)",
      "feedback_media": "▶️ Here is your Feedback Video from coach (Expand to view)"
    };

    return Object.keys(keyToTitleMappings).map(key => {
      let value = message[key];
      if (!value) return null;

      if (['oem', 'feedback_media'].includes(key) && value.includes('iframe')) {

        return `
          <div>
              ${getMediaPreviewHTML(value, keyToTitleMappings[key])}
          </div>`;
      }

      let heading = keyToTitleMappings[key];
      if (key === 'oem'){
        heading = "📰 Additional Context"
      }

      console.log('formatmsg', key, message.instruction_media, message)
      if (key === 'instructions' && message.instruction_media) {
        value = value + ` 
                <a href="${message.instruction_media}" target="_blank"
                  style="display:inline-block; margin-left:8px; background:white; color:#333; padding:2px 6px; border:1px solid green; border-radius:4px; text-decoration:none; font-family:sans-serif; font-size:11px; box-shadow:0 1px 2px rgba(0,0,0,0.06); transition:all 0.2s ease;"
                  onmouseover="this.style.background='#f1f1f1'; this.style.borderColor='#bbb'; this.style.boxShadow='0 2px 4px rgba(0,0,0,0.1)';"
                  onmouseout="this.style.background='white'; this.style.borderColor='green'; this.style.boxShadow='0 1px 2px rgba(0,0,0,0.06)';">
                  Reference
                </a>`;

      }

      if (key != 'instruction_media'){
        return `<div><strong>${heading}:</strong> <span>${value}</span></div>`;
      }
    }).filter(Boolean).join("<hr />");
  }

  return message;
}


function createMessageNode2(message, isMarkdown = false) {
  const messageNode = document.createElement("div");
  messageNode.classList.add("inner-message-container");

  const avatarNode = document.createElement("div");
  avatarNode.classList.add("avatar-container", "left-item-position");

  const avatarImage = document.createElement("img");
  avatarImage.setAttribute("src", botAvatarImageURL);
  avatarImage.setAttribute("class", "avatar");

  avatarNode.appendChild(avatarImage);

  const messageBubble = document.createElement("div");
  messageBubble.classList.add("message-bubble", "ai-message-text");
  messageBubble.style.maxWidth = "100%";
  messageBubble.style.width = "calc(100% - 3rem)";
  messageBubble.style.marginTop = "4px";
  messageBubble.style.borderRadius = "4px";
  messageBubble.style.padding = "4";
  messageBubble.style.backgroundColor = "#f3f4f6";
  messageBubble.style.color = "#000000";

  const messageText = document.createElement("p");
  if (isMarkdown) {
    messageText.innerHTML = parseMarkdown(message);
  }
  else if (message?.includes("<")) {
    // Parse the message as markdown and set it as HTML
    messageText.innerHTML = message;
  } else {
    messageText.innerText = message;
  }

  messageBubble.appendChild(messageText);
  messageNode.appendChild(avatarNode);
  messageNode.appendChild(messageBubble);

  return messageNode;
}
function parseMarkdown(markdown) {
  // Convert headers (#, ##, ###)
  markdown = markdown.replace(/^(#{1,3})\s+(.*)/gm, (match, hashes, text) => {
    const level = hashes.length;
    return `<h${level} style="margin-top: 0; margin-bottom: 5px;">${text}</h${level}>`;
  });
  // Handle bold text (**text**)
  markdown = markdown.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  // Handle italic text (_text_)
  markdown = markdown.replace(/_(.*?)_/g, "<em>$1</em>");
  // Handle italic text (_text_ or *text*)
  markdown = markdown.replace(/(?:\*|_)(.*?)\1/g, "<em>$1</em>");
  // Handle links [text](url)
  markdown = markdown.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank">$1</a>');
  
  markdown = markdown.replace(
  /(?<!href=")(https?:\/\/[^\s<)\]]+)([)\].,;!?]*)/,
  '<a href="$1" target="_blank" rel="noopener noreferrer" style="color: #2563eb; text-decoration: underline; cursor: pointer;">$1</a>$2'
);

  // Convert newlines (\n) to <br>
  markdown = markdown.replace(/\n/g, "<br>");
  // Preserve spaces for better formatting
  markdown = markdown.replace(/  /g, "&nbsp;&nbsp;");

  return markdown;
}

const isBusinessEmailStt = (email) => {
  const genericDomains = [
    'gmail.com',
    'yahoo.com',
    'hotmail.com',
    'outlook.com',
    'icloud.com',
    'aol.com',
  ];
  const domain = email.split('@')[1];
  return !genericDomains.includes(domain);
};

function LoadingMessageWithText(message) {
  const shadowRoot = document.getElementById("chat-element2").shadowRoot;
  //loading message
  const loadingElement = shadowRoot.querySelector(".loading-message-text");
  //  const dotsFlashingElement = shadowRoot.querySelector(".dots-flashing")
  //  dotsFlashingElement.style.color = "#1f2937"
  loadingElement.style.display = "flex";
  loadingElement.style.flexDirection = "row";
  loadingElement.style.alignItems = "center";
  const messageElement = document.createElement("span");
  messageElement.innerHTML = `<b style="color : black; font-size: ${window.innerWidth < 768 ? "12px" : "14px"
    }; min-width: 4rem; margin-left: 2rem; position : relative; top : -2px;">${message || "Coachbot is thinking..."
    }</b>`; //message
  messageElement.setAttribute("id", "loading-message");

  loadingElement.style.width = "fit-content";
  loadingElement.appendChild(messageElement);
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

function addStickerToMessage(sticker, msg, color = "#3b82f6") {
  const divWithLabel = `<div style="display: flex; flex-direction: column; margin: 0; padding: 0;">
  <div style="font-size : 12px; font-weight: bold; color: ${sticker === "Begin Session" ? "white" : "black"
    }; padding: 4px; border-radius:4px; width: fit-content; padding: 2px 8px; border-radius: 4px; border: 1px solid lightgray; background-color : ${sticker === "Begin Session" ? "#21C55D" : "transparent"
    }">${sticker}</div>
  <div style="margin-top : 8px; padding-top: 0px;">${msg}</div>
  </div>`;
  return divWithLabel;
}

function appendMessage2(message2, isMarkdown = false) {
  gShadowRoot2 = document.getElementById("chat-element2").shadowRoot;
  const formmattedMessage = formatMessage2(message2)
  const messageNode = createMessageNode2(formmattedMessage, isMarkdown);
  gShadowRoot2.getElementById("messages").appendChild(messageNode);
  gShadowRoot2.getElementById("messages").scrollBy(0, 500);
}

function snippetDivSTT(url) {
  if (url.includes("pulse")) {
    return `
    <iframe
      allow="autoplay; encrypted-media; fullscreen;"
      style="width: 100%; border-radius: 8px; min-height: 70vh; min-width: ${window.innerWidth < 768 ? "100%" : "45vw"
      }; scrollbar-width: none;"
      src=${url}
      frameborder="0"
      allowfullscreen
      webkitallowfullscreen 
      mozallowfullscreen 
      allowtransparency
      scrolling="no"
    >
    `;
  } else if (url.includes("youtube")) {
    const videoId = url.split("v=")[1];
    url = `https://www.youtube.com/embed/${videoId}?autoplay=1`
    return `
    <iframe
      allow="autoplay; encrypted-media; fullscreen;"
      style="width: 100%; border-radius: 8px; min-height: 45vh; min-width: ${window.innerWidth < 768 ? "100%" : "45vw"
      }; scrollbar-width: none;"
      src=${url}
      frameborder="0"
      allowfullscreen
      webkitallowfullscreen 
      mozallowfullscreen 
      allowtransparency
      scrolling="no"
    >
    `;
  }
  else {
    return `
    <iframe
      allow="encrypted-media; fullscreen;"
      style="width: 100%; border-radius: 8px; min-height: 45vh; min-width: ${window.innerWidth < 768 ? "100%" : "45vw"
      }; scrollbar-width: none;"
      src=${url}
      frameborder="0"
      allowfullscreen
      webkitallowfullscreen 
      mozallowfullscreen 
      allowtransparency
      scrolling="no"
    >
    `;
  }
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
  AttemptTestDirectSTT = false;
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
  senarioSnippetURLStt;
  questionMediaLinkStt = null;
  questionSnippetLinkStt = null;
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
  responderDisplayNameStt = null;
  FeedbackVideoLinkStt = "";

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
    resultDiv += `<strong>Title:</strong> ${item.title} <br><strong>Interaction Code:</strong> ${item.code} <br>`;
  });

  return matchingItems.length > 0 && targetTitle
    ? `<div>${resultDiv}</div>`
    : null;
}

const audioCanvasUiForQuestions = (audio, canvas) => {
  const shadowRoot = document.getElementById("chat-element2").shadowRoot;
  const audioElements = shadowRoot.querySelectorAll("audio");
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

    canvasCtx.fillStyle = "white";
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

  draw();
};

const audioCanvasUI = (audio, canvas) => {
  const canvasCtx = canvas.getContext("2d");
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
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

    canvasCtx.fillStyle = "white";
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


const handleGameTypeConversation = async () => {
  try {
    const response = await fetch(`${baseURL2}/test-responses/`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${createBasicAuthToken2(key2, secret2)}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        test_attempt_session_id: sessionId2,
        question_id: testId2,
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

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const responseData = await response.json();

    console.log('gameresponse: ', responseData)

    // Extract next question text
    let next_question_text = responseData.question_text || null;

    // Check if it is the last question using specific conditions
    const is_last_question = responseData.is_last_question !== undefined
      ? responseData.is_last_question
      : (next_question_text === null || /end of quiz|achieved a score of/i.test(next_question_text));


    console.log(
      is_last_question,
      next_question_text
    )

    if (is_last_question) {
      next_question_text = JSON.parse(next_question_text)
      next_question_text = `<div>
      <b>${next_question_text.end_message}</b>
      <div>
        <h3>Feedback:</h3>
        <p>${next_question_text.feedback}</p>
      </div>
    </div>`
    }

    return { is_last_question, next_question_text }

  } catch (error) {
    console.error("Error handling game type conversation:", error.message);

    return {
      error: `${error}`
    }
  }
};

const handleGameQuestion = async (
  questionText,
  randomNumber,
  isSingleSelect,
  signals
) => {


  const tChatElementRef = document.getElementById("chat-element2")
  const tShadowRoot = tChatElementRef.shadowRoot;

  const chatInputBox = tShadowRoot.getElementById("text-input")
  chatInputBox.classList.add("text-input-disabled")
  chatInputBox.contentEditable = false
  chatInputBox.placeholder = "Please wait for the next question..."
  //@disable the input


  // const inputText = questionText;
  // const headingRegex = /^##\s+(.*)$/m;
  // const scenarioRegex = isSingleSelect ? /(?:\*\*Scenario:\*\*|- \*\*Scenario\*\*):\s+(.*)$/m :  /\*\*Scenario:\*\*\s+(.*)$/m;
  // const objectiveRegex = /\*\*Objective:\*\*\s+(.*)$/m;
  // const optionsRegex = /-\s+\*\*([A-D])\.\*\*\s+(.*?)(?=\n|$)/g;
  // const feedbackRegex = /(?:\*\*Feedback:\*\*|##\s*Feedback:)\s*([\s\S]*)/i;
  // const decisionRegex =
  //   /\*\*Decision\*\*:\s*(.*?)\n((?:\s*-\s+\*\*[A-D]\.\*\*.*\n)+)/s;

  // const headingMatch = inputText.match(headingRegex);
  // const scenarioMatch = inputText.match(scenarioRegex);
  // const objectiveMatch = inputText.match(objectiveRegex);
  // const feedbackMatch = inputText.match(feedbackRegex);
  // const decisionMatch = inputText.match(decisionRegex);

  // const options = [];
  // let optionMatch;
  // while ((optionMatch = optionsRegex.exec(inputText)) !== null) {
  //   options.push({
  //     option: optionMatch[1],
  //     description: optionMatch[2]?.trim(),
  //   });
  // }

  // const extractedData = {
  //   heading: headingMatch ? headingMatch[1].trim() : null,
  //   scenario: scenarioMatch ? scenarioMatch[1].trim() : null,
  //   decisionMatch: decisionMatch ? decisionMatch[1].trim() : null,
  //   objective: objectiveMatch ? objectiveMatch[1].trim() : null,
  //   options: options.length > 0 ? options : null,
  //   feedback: feedbackMatch ? feedbackMatch[1].trim() : null,
  // };

  questionText = JSON.parse(questionText)
  console.log(questionText)

  const heading = questionText?.context
    ? Object.entries(questionText?.context).map(([key, value]) => `${value}`)
      .join('\n')
    : "";


  const details = questionText?.details
    ? Object.entries(questionText.details)
      .map(([key, value]) => {
        // If the value is an object, recursively convert its properties to a readable string
        if (typeof value === 'object') {
          value = Object.entries(value)
            .map(([subKey, subValue]) => `<b>${subKey.charAt(0).toUpperCase() + subKey.slice(1)}:</b> ${subValue} `)
            .join(); // Join sub-object properties with line breaks
        }
        return `<p><b>${key.charAt(0).toUpperCase() + key.slice(1)}:</b> ${value}</p>`;
      })
      .join("\n")
    : "";


  const contentString = questionText?.content
    ? Object.entries(questionText.content)
      .map(([key, value]) => {
        let result = "";
        console.log(key, value);

        if (key === "instruction") {
          const instructionHTML = value
            ? `<b>${value}:</b><br>`
            : isSingleSelect
              ? "<b>Please choose option A, B, C, or D:</b><br>"
              : "<b>Select one or more options from A, B, C, or D:</b><br>";
          result += instructionHTML;
        } else if (key === "options") {
          const optionsHTML = Object.entries(value || {})
            .map(([key, value]) =>
              isSingleSelect
                ? `<label><input type="radio" name="option-${randomNumber}" value="${key}"> <b>${key}</b> - ${value}</label><br>`
                : `<label><input type="checkbox" name="option-${randomNumber}" value="${key}"> <b>${key}</b> - ${value}</label><br>`
            )
            .join(" ");
          console.log("optionsHTML", optionsHTML);
          result += optionsHTML;
        } else {
          result += `<b>${key.charAt(0).toUpperCase() + key.slice(1)}</b>: ${value}<br>`;
        }
        console.log('result: ', result)
        return result;
      })
      .join("") // Join the mapped array into a single string
    : "";



  console.log(
    contentString,
    questionText?.content,
    heading,
    details,
    questionText?.details
  )


  const extractedData = {
    heading: questionText?.level || null,
    scenario: questionText?.scenario || null,
    decisionMatch: questionText?.decision ?? null,
    objective: questionText?.objective ?? null,
    options: questionText?.options
      ? Object.entries(questionText.options).map(([option, description]) => ({ option, description }))
      : null,
    feedback: questionText?.feedback ?? null,
    instruction: questionText?.instruction ?? null
  };


  // Output the extracted data
  console.log(extractedData);

  if (signals) {
    signals.onResponse({
      html: `
    <h3>${heading}</h3>
    ${details}

    <div id="answer-selection-form-${randomNumber}" style="min-width: 200px;">
      ${contentString}
      <div style="width: 100%; display: flex; justify-content: flex-end; align-items: center; gap: 8px; margin-top:8px;">
          <button style="padding: 6px 12px; border-radius: 8px; border: 1px solid #fca5a5; background-color: #fecaca; color : #ef4444;" id="exit-button-${randomNumber}" class="deep-chat-button">Exit</button>
          <button style="padding: 6px; border-radius: 8px; border: 1px solid lightgray; background-color:white;" id="multiple-select-${randomNumber}" class="deep-chat-button">Submit</button>
      </div>

      <style>
        #multiple-select-${randomNumber}:hover {
          cursor: pointer;
          background-color: #f0f0f0;
          border: 1px solid darkgray;
        }
        #exit-button-${randomNumber}:hover {
          cursor: pointer;
          background-color: #fee2e2;
        }
        #exit-button-${randomNumber}:disabled {
          background-color: #f3f4f6;
          border: 1px solid lightgray;
          color: #111827;
        }
      </style>
    </div>
  `,
    });
  } else {
    appendMessage2(`
    <h3>${heading}</h3>
    <p>${details}</p>

    <div id="answer-selection-form-${randomNumber}" style="min-width: 200px;">
        ${contentString}
        <div style="width: 100%; display: flex; justify-content: flex-end; align-items: center; gap: 8px; margin-top:8px;">
          <button style="padding: 6px 12px; border-radius: 8px; border: 1px solid #fca5a5; background-color: #fecaca; color : #ef4444;" id="exit-button-${randomNumber}" class="deep-chat-button">Exit</button>
          <button style="padding: 6px; border-radius: 8px; border: 1px solid lightgray; background-color:white;" id="multiple-select-${randomNumber}" class="deep-chat-button">Submit</button>
        </div>
      
      <style>
        #multiple-select-${randomNumber}:hover {
          cursor: pointer;
          background-color: #f0f0f0;
          border: 1px solid darkgray;
        }
        #exit-button-${randomNumber}:hover {
          cursor: pointer;
          background-color: #fee2e2;
        }
        #exit-button-${randomNumber}:disabled {
          background-color: #f3f4f6;
          border: 1px solid lightgray;
          color: #111827;
        }
      </style>
    </div>`);
  }

  console.log("SH Root : ", tShadowRoot);

  await new Promise((resolve) => setTimeout(resolve, 100));

  const multipleSelectSubmitButton = tShadowRoot.getElementById(
    `multiple-select-${randomNumber}`
  );
  console.log("Button : ", multipleSelectSubmitButton);

  const exitButton = tShadowRoot.getElementById(
    `exit-button-${randomNumber}`
  );

  const items = tShadowRoot.querySelectorAll(
    `input[name="option-${randomNumber}"]`
  );

  items.forEach((item) => {
    item.addEventListener("change", function (event) {
      console.log("Event : ", event);
      const selectedItems = tShadowRoot.querySelectorAll(
        `input[name="option-${randomNumber}"]:checked`
      );
      console.log("Selected Items : ", selectedItems);
      multipleSelectSubmitButton.disabled = selectedItems.length === 0;
    });
  });

  multipleSelectSubmitButton.disabled = true;

  multipleSelectSubmitButton.addEventListener("click", function (event) {
    console.log("Event : ", event);

    chatInputBox.classList.remove("text-input-disabled")
    chatInputBox.contentEditable = true

    const selectedItems = tShadowRoot.querySelectorAll(
      `input[name="option-${randomNumber}"]:checked`
    );

    let selectedText = [];
    selectedItems.forEach((item) => {
      selectedText = [...selectedText, item.value];
    });

    console.log("Selected Text : ", selectedText);
    sendUserMessage(selectedText.join(", "), tShadowRoot);

    multipleSelectSubmitButton.disabled = true;
    items.forEach((item) => {
      item.disabled = true;
    });

    exitButton.disabled = true;
    exitButton.style.backgroundColor = "#f3f4f6";
    exitButton.style.border = "1px solid lightgray";
    exitButton.style.color = "#111827";

    setTimeout(() => {
      chatInputBox.classList.add("text-input-disabled")
      chatInputBox.contentEditable = false
    }, 250);
  });

  exitButton.addEventListener("click", function (event) {
    console.log("Event : ", event);
    sendUserMessage("STOP", tShadowRoot);

    chatInputBox.classList.remove("text-input-disabled")
    chatInputBox.contentEditable = true
    chatInputBox.placeholder = ""

    multipleSelectSubmitButton.disabled = true;
    items.forEach((item) => {
      item.disabled = true;
    });
    exitButton.disabled = true;
    exitButton.style.backgroundColor = "#f3f4f6";
    exitButton.style.border = "1px solid lightgray";
    exitButton.style.color = "#111827";
  })
};

function isAudioURL(url) {
  const isAudio = /\.(mp3|wav|ogg|m4a)(\?.*)?$/i.test(url);
  return isAudio
}

const handleProceedClickStt = async (choice) => {
  if (choice == "Yes") {
    if (testCountDown > 0){
    startModernTimer(testCountDown, async () => {
          console.log("⏰ Timer completed!", sessionStatusStt);
          // Call any function here
          await window.getSessionStatusStt(sessionId2);
          if (sessionStatusStt != 'completed'){
            await StopSession();
          }
    });

    }
    
    isProceedStt = "true";
    const gshadowRoot = document.getElementById("chat-element2").shadowRoot;
    const msg = gshadowRoot.getElementById("proceed-option2");
    // button.parentNode.removeChild(button)
    if (msg) {
      const que_msg = document.createElement("div");
      que_msg.innerHTML = "Please Wait..."; // You can customize the message here
      // Replace the button with the "Thank you" message
      msg.parentNode.replaceChild(que_msg, msg);
    }
    if (questionSnippetLinkStt) {
      console.log(questionSnippetLinkStt);
      if (questionSnippetLinkStt.length > 0) {
        const linkList = questionSnippetLinkStt.split(",");
        console.log('Ahere12')

        linkList.forEach((element) => {
          appendMessage2(snippetDivSTT(element));
        });
      }
    }

    //disable Copy Paste
    const textInputElement = gshadowRoot.getElementById("text-input");
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
          console.log('Ahere11')

          appendMessage2(`▪ <b>Optional Enrichment Media</b><br>  <iframe
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
              console.log('Ahere10')

              appendMessage2(`<iframe src=${url}
                                frameborder="0" 
                                style="width: 100%; border-radius: 8px; min-height: 50vh; min-width: 50vw;"
                                allowfullscreen="true" 
                                mozallowfullscreen="true" 
                                webkitallowfullscreen="true"
                                ></iframe>`);
            } else if (isAudioURL(element)) {
              console.log(element);
              console.log('Ahere8')

              appendMessage2(`<div ><audio style="${window.innerWidth < 600
                ? "width: 200px; max-width: 200px !important;"
                : " min-width: 50vw !important;"
                }" controls autoplay>
                <source src=${element} type="audio/mpeg" />
                Your browser does not support the audio element.
                </audio></div>`);
            } else {
              // considering else a aritcle url

              appendMessage2(`<a href="${element}" target="_blank"
                              style="display:inline-block; background:white; color:#333; padding:4px 10px; border:1px solid #ddd; border-radius:6px; text-decoration:none; font-family:sans-serif; font-size:12px; box-shadow:0 1px 2px rgba(0,0,0,0.06); transition:all 0.2s ease;"
                              onmouseover="this.style.background='#f1f1f1'; this.style.borderColor='#bbb'; this.style.boxShadow='0 2px 4px rgba(0,0,0,0.1)'"
                              onmouseout="this.style.background='white'; this.style.borderColor='green'; this.style.boxShadow='0 1px 2px rgba(0,0,0,0.06)'">
                              View Context
                            </a>`)
            }
          });
        } else {
          if (questionMediaLinkStt.includes("docs.google.com")) {
            let url =
              questionMediaLinkStt.split("edit?")[0] +
              "embed?start=true&loop=true&delayms=3000";
            console.log(url);
            console.log('Ahere7')

            appendMessage2(`<iframe src=${url}
                              frameborder="0" 
                              style="width: 100%; border-radius: 8px; min-height: 50vh; min-width: 50vw;" 
                              allowfullscreen="true" 
                              mozallowfullscreen="true" 
                              webkitallowfullscreen="true"
                              ></iframe>`);
          } else if (questionMediaLinkStt.includes("guidejar.com")) {
            const guidejarId = questionMediaLinkStt.split("/").pop();
            console.log('Ahere6')

            appendMessage2(`
              <div style="width:640px">
              <div style="position:relative;height:0;width:100%;overflow:hidden;box-sizing:border-box;padding-bottom:calc(100% - 0px)">
              <iframe src="https://www.guidejar.com/embed/${guidejarId}?type=1&controls=off" width="100%" height="100%" style="position:absolute;inset:0" allowfullscreen frameborder="0"></iframe
              ></div></div>
              `);
          } else if (isAudioURL(questionMediaLinkStt)) {
            console.log(questionMediaLinkStt);
            console.log('Aheresa')

            appendMessage2(`<div ><audio style="${window.innerWidth < 600
              ? "width: 200px; max-width: 200px !important;"
              : " min-width: 50vw !important;"
              }" controls autoplay>
                <source src=${questionMediaLinkStt} type="audio/mpeg" />
                Your browser does not support the audio element.
                </audio></div>`);
          } else {
            // considering else a aritcle url

            appendMessage2(`<a href="${questionMediaLinkStt}" target="_blank"
                              style="display:inline-block; background:white; color:#333; padding:4px 10px; border:1px solid #ddd; border-radius:6px; text-decoration:none; font-family:sans-serif; font-size:12px; box-shadow:0 1px 2px rgba(0,0,0,0.06); transition:all 0.2s ease;"
                              onmouseover="this.style.background='#f1f1f1'; this.style.borderColor='#bbb'; this.style.boxShadow='0 2px 4px rgba(0,0,0,0.1)'"
                              onmouseout="this.style.background='white'; this.style.borderColor='green'; this.style.boxShadow='0 1px 2px rgba(0,0,0,0.06)'">
                              View Context
                            </a>`)
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
            const randomIdForAudioElement = generateRandomAlphanumeric(5);
            const shadowRoot =
              document.getElementById("chat-element2").shadowRoot;

            const queDiv = `${queText}<br id="break-${randomIdForAudioElement}">`;
            initialQuestionTextStt =
              queDiv +
              `<div id="audioDiv-${randomIdForAudioElement}" style="border: 1px solid lightgray; border-radius: 4px; width: 100; background-color: white; overflow: hidden; padding: 2px;  margin-top:12px;" ><audio id="audio-player-${randomIdForAudioElement}" style="${window.innerWidth < 600
                ? "width: 200px; max-width: 200px !important;"
                : " min-width: 50vw !important;"
              }" autoplay>
              <source src=${objectUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
              </audio>
              
              <canvas id="canvas-audio-${randomIdForAudioElement}" width="800px" height="40"></canvas>
              </div>`;

            setTimeout(() => {
              const audioElement = shadowRoot.getElementById(
                `audio-player-${randomIdForAudioElement}`
              );
              const canvasElement = shadowRoot.getElementById(
                `canvas-audio-${randomIdForAudioElement}`
              );
              const breakElement = shadowRoot.getElementById(
                `break-${randomIdForAudioElement}`
              );
              const audioDiv = shadowRoot.getElementById(
                `audioDiv-${randomIdForAudioElement}`
              );
              console.log(audioElement, canvasElement);
              audioCanvasUiForQuestions(audioElement, canvasElement);
              audioElement.addEventListener("ended", () => {
                console.log("ENDED playing");
                canvasElement.remove();
                audioDiv.remove();
                breakElement.remove();
              });
            }, 100);

            console.log(initialQuestionTextStt);
          }
          console.log("last", initialQuestionTextStt);
          if (responderName) {
            initialQuestionTextStt =
              `<b>${responderName}:</b><br>` + `${initialQuestionTextStt}`;
          }
          console.log('Aher51')

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
          if (!['game'].includes(senarioCase2)) {

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
        if (isImmersiveStt && !['game'].includes(senarioCase2)) {
          const queText = initialQuestionTextStt;

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
          const randomIdForAudioElement = generateRandomAlphanumeric(5);
          const shadowRoot =
            document.getElementById("chat-element2").shadowRoot;

          const queDiv = `${queText}<br id="break-${randomIdForAudioElement}">`;
          console.log(objectUrl, "url");
          initialQuestionTextStt =
            queDiv +
            `<div id="audioDiv-${randomIdForAudioElement}" style="border: 1px solid lightgray; border-radius: 4px; width: 100; background-color: white; overflow: hidden; padding: 2px;  margin-top:12px;" ><audio id="audio-player-${randomIdForAudioElement}" style="${window.innerWidth < 600
              ? "width: 200px; max-width: 200px !important;"
              : " min-width: 50vw !important;"
            }" autoplay>
            <source src=${objectUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
            </audio>
            
            <canvas id="canvas-audio-${randomIdForAudioElement}" width="800px" height="40"></canvas>
            </div>`;

          setTimeout(() => {
            const audioElement = shadowRoot.getElementById(
              `audio-player-${randomIdForAudioElement}`
            );
            const canvasElement = shadowRoot.getElementById(
              `canvas-audio-${randomIdForAudioElement}`
            );
            const breakElement = shadowRoot.getElementById(
              `break-${randomIdForAudioElement}`
            );
            const audioDiv = shadowRoot.getElementById(
              `audioDiv-${randomIdForAudioElement}`
            );
            console.log(audioElement, canvasElement);
            audioCanvasUiForQuestions(audioElement, canvasElement);

            audioElement.addEventListener("ended", () => {
              canvasElement.remove();
              audioDiv.remove();
              breakElement.remove();
            });
          }, 100);
        }

        if (responderName) {
          initialQuestionTextStt = responderName + initialQuestionTextStt;
        }
        console.log('here1', initialQuestionTextStt)
        const randomIdForAudioElement = generateRandomAlphanumeric(10);

        if (['game'].includes(senarioCase2)) {
          if (IsSingleSelectSTT !== null) {

            if (IsSingleSelectSTT) {
              console.log("HERE 2")
              // add logic to add single box
              // handleGameQuestion(initialQuestionTextStt, randomIdForAudioElement, true)
              // appendMessage2(initialQuestionTextStt, ['game'].includes(senarioCase2));
              handleGameQuestion(initialQuestionTextStt, randomIdForAudioElement, true)
            } else {
              // add logic to add multiselect
              handleGameQuestion(initialQuestionTextStt, randomIdForAudioElement, false)
            }
          } else {
            appendMessage2(initialQuestionTextStt, ['game'].includes(senarioCase2));

          }

        } else {
          appendMessage2(initialQuestionTextStt)
        }
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
          const audioPromises = separatedText.map(async (entry, index) => {
            const responderName = `<b>${entry[0]}:</b><br>`;
            console.log(entry);
            let queText = entry[1];
            const randomIdForAudioElement = generateRandomAlphanumeric(5);
            const url = `${baseURL2}/test-responses/get-text-to-speech/?text=${entry[1]}`;

            const response = await fetch(url, {
              method: "GET",
              headers: {
                Authorization: `Basic ${createBasicAuthToken2(key2, secret2)}`,
              },
            });

            const blob = await response.blob();
            console.log("response", blob);

            const objectUrl = URL.createObjectURL(blob);
            const shadowRoot = document.getElementById("chat-element2").shadowRoot;

            const queDiv = `${queText}<br id="break-${randomIdForAudioElement}">`;
            console.log(objectUrl, "url");

            let audioCont = queDiv + `
              <div id="audioDiv-${randomIdForAudioElement}" style="border: 1px solid lightgray; border-radius: 4px; width: 100%; background-color: white; overflow: hidden; padding: 2px; margin-top: 12px;">
                <audio id="audio-player-${randomIdForAudioElement}" style="${window.innerWidth < 600 ? "width: 200px; max-width: 200px !important;" : "min-width: 50vw !important;"}">
                  <source src=${objectUrl} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
                <canvas id="canvas-audio-${randomIdForAudioElement}" width="800px" height="40"></canvas>
              </div>
            `;

            if (responderName) {
              audioCont = responderName + audioCont;
            }

            return {
              audioCont,
              randomIdForAudioElement
            };
          });

          console.log(audioPromises, "audioPromises");

          const audioContents = await Promise.all(audioPromises);
          console.log('Ahere1');


          audioContents.forEach((audioCont) => {
            console.log('audiocont ahere1', audioCont);
            appendMessage2(audioCont.audioCont);
          });

          // Function to play audios one by one
          async function playAudioSequentially(index = 0) {
            if (index >= audioContents.length) return;

            const { audioCont, randomIdForAudioElement } = audioContents[index];

            const shadowRoot = document.getElementById("chat-element2").shadowRoot;
            const audioElement = shadowRoot.getElementById(`audio-player-${randomIdForAudioElement}`);
            const canvasElement = shadowRoot.getElementById(`canvas-audio-${randomIdForAudioElement}`);
            const breakElement = shadowRoot.getElementById(`break-${randomIdForAudioElement}`);
            const audioDiv = shadowRoot.getElementById(`audioDiv-${randomIdForAudioElement}`);

            audioCanvasUiForQuestions(audioElement, canvasElement);

            // Ensure the audio starts playing immediately
            audioElement.play().then(() => {
              console.log('Audio playing:', audioElement);
            }).catch(error => {
              console.error('Error playing audio:', error);
            });

            // Wait for the audio to finish before moving to the next
            await new Promise(resolve => {
              audioElement.addEventListener("ended", () => {
                canvasElement.remove();
                audioDiv.remove();
                breakElement.remove();
                resolve();
              });
            });

            // After the current audio ends, play the next one
            playAudioSequentially(index + 1);
          }

          // Start playing the first audio
          playAudioSequentially(0);
        }
        else {
          console.log('Ahere2')

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
        const ttsNarration = `<div ><audio style="${window.innerWidth < 600
          ? "width: 200px; max-width: 200px !important;"
          : " min-width: 50vw !important;"
          }"" controls autoplay>
          <source src=${objectUrl} type="audio/mpeg" />
          Your browser does not support the audio element.
          </audio></div>`;
        const imageIdStt = `mediaImageStt${initialIndexStt}`;
        const imageMapNameStt = `image-mapStt${initialIndexStt}`;
        const imageTooltipIdStt = `tooltip-stt${initialIndexStt}`;
        console.log('Ahere3')

        appendMessage2(`▪  ${ttsNarration}<br><br>
                          ▪ <img src=${imageUrlStt} ${window.innerWidth < 768 ? "width='200'" : "width='400'"
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
        console.log('Ahere4')

        appendMessage2(initialQuestionTextStt);
      }
    }
  } else {
    resetAllVariablesStt();

    //@disable the input
    const tChatElementRef = document.getElementById("chat-element2")
    const tShadowRoot = tChatElementRef.shadowRoot;

    const chatInputBox = tShadowRoot.getElementById("text-input")
    chatInputBox.classList.remove("text-input-disabled")
    chatInputBox.contentEditable = true

    const gshadowRoot = document.getElementById("chat-element2").shadowRoot;
    const msg = gshadowRoot.getElementById("proceed-option2");
    // button.parentNode.removeChild(button)
    const que_msg = document.createElement("div");
    que_msg.innerHTML = "Please Wait..."; // You can customize the message here
    // Replace the button with the "Thank you" message
    msg.parentNode.replaceChild(que_msg, msg);
    if (Object.keys(snnipetConfigSTT).length > 0) {
      appendMessage2(
        "<b>Your session is terminated. You can either enter a interaction code or refresh the page for generating the a new simulation.</b>"
      );
    } else {
      appendMessage2(
        "<b>Your session is terminated. You can restart again!</b>"
      );
    }

    //enable Copy Paste
    const textInputElement = gshadowRoot.getElementById("text-input");
    textInputElement.removeAttribute("onpaste");
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
            questionText2 = `▪ <b>Optional Enrichment Media</b><br>  <iframe
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
                  `<div ><audio style="${window.innerWidth < 600
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
                questionText2 = `<div ><audio style="${window.innerWidth < 600
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
        questionText2 = `<div ><audio style="${window.innerWidth < 600
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
        Authorization: `Basic ${createBasicAuthToken2(key2, secret2)}`,
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
        Authorization: `Basic ${createBasicAuthToken2(key2, secret2)}`,
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
        if (msg) msg.parentNode.replaceChild(que_msg, msg);
      }

      resetAllVariablesStt();

      appendMessage2(
        "<p style='font-size: 14px;color: #991b1b;'><b>Due to abnormal activity, like session has been terminated. (e.g, very fast responses). It can also be due to the internet connection. Please try again</b>.</p>"
      );
      enableEndSessionButton();

      //@disable the input
      const tChatElementRef = document.getElementById("chat-element2")
      const tShadowRoot = tChatElementRef.shadowRoot;

      const chatInputBox = tShadowRoot.getElementById("text-input")
      chatInputBox.classList.remove("text-input-disabled")
      chatInputBox.contentEditable = true
      return;
    }

    if (!window.user) {
      console.log("user not logged in, so asking for credentials");
      // gShadowRoot2.getElementById(`mcq-option-stt-${mcqFormIdStt}`).innerHTML =
      //   credentialsForm2;
      isEmailFormstt = true;
      formFieldsstt = ["name", "email"];
      const msg = formFieldsstt[0] === "email" ?
        `<b>Please enter your email. (Used for reporting and ranking. Please use same email for accurate tracking).</b>`
        : `<b>Please enter your ${formFieldsstt[0]}</b>`;
      appendMessage2(msg);
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
      .then(async (data) => {
        reportUrl2 = data.url;
        globalReportUrl2 = data.url;
        console.log("Report Url : ", reportUrl2, globalReportUrl2);
        responsesDone2 = true;
        questionIndex2 = 0;
        mcqFormIdStt++;

        if (window.user) {
          // append custom message to chat
          let message2 = `<b>It's showtime ✨, here is your detailed <a target="_blank" style="color: #3b82f6;text-decoration:none;" href="${globalReportUrl2}">feedback report</a>. The feedback is also emailed to you and will be available to you for 60 days.</b>`;

          if (!emailCandidate2) {
            message2 =
              "<b>Thank you. The feedback report is sent to your manager and you may hear from them directly.</b>";
          }
          appendMessage2(message2);

          if (FeedbackVideoLinkStt && FeedbackVideoLinkStt.length > 0) {
            appendMessage2({
              "feedback_media": snippetDivSTT(FeedbackVideoLinkStt)
            })
          }

          //* send message to start new session
          userScenarioRecommendationStt = await getTestRecommendationsStt(questionData2.results[0].uid, null, null, userId2);
          console.log(senarioCase2, clientuserInformationSTT.show_recommendations)
          if (['psychometric', 'game', 'interview'].includes(senarioCase2)
            || !clientuserInformationSTT.show_recommendations
            || userScenarioRecommendationStt.total_recommendation >= 2) {
            appendMessage2("<b>Please enter another interaction code to start a new interaction.</b>")
          } else {

            appendMessage2(`<b>Our skills discovery engine has suggested a new simulation based on observed gaps. Do you want to explore it now? </b><br/><br/>
                  <div class="deep-chat-temporary-message" id='related-recommendation2'>
                  <button class="deep-chat-button deep-chat-suggestion-button" style="border: 1px solid green">Yes</button>
                  <button class="deep-chat-button deep-chat-suggestion-button" style="border: 1px solid #d80000">No</button> </div>
            `)
            startScenarioRecommendationsStt = true
            PreviousSessionInfoSTT['sessionId'] = sessionId2
            PreviousSessionInfoSTT['skills'] = questionData2.results[0].skills_to_evaluate
          }
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

async function proceedFormFlowStt(msg, isWorkingEmail = false) {
  if (formFieldsstt.length === 0) {
    return [true, "None"];
  }

  isEmailFormstt = true;
  const fieldName = formFieldsstt[0];
  if (fieldName === "email") {
    if (!isEmailSTT(msg)) {
      return [
        false,
        `<p style='font-size: 14px;color: #991b1b;'>Please enter valid <b>${fieldName}!</b></p>`,
      ];
    } else if (isWorkingEmail && !isBusinessEmailStt(msg)) {
      return [
        false,
        `<p style='font-size: 14px;color: #991b1b;'>Please use your organization email only!</b></p>`,
      ];
    }

  }

  formFieldsstt = formFieldsstt.slice(1);

  emailNameformJsonstt[fieldName] =
    fieldName === "email" ? msg.toLowerCase() : msg;
  return [true, "None"];
}

const increaseSessionForAccesscodeStt = async (userId, accessCode) => {
  const requestData = {
    access_code: accessCode,
    user_id: userId
  };

  try {
    const response = await fetch(`${baseURL2}/accounts/increase_test_attempts_in_accesscode/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${createBasicAuthToken2(key2, secret2)}`
      },
      body: JSON.stringify(requestData),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data)
      return true
    } else {
      const data = await response.json();
      console.log(data)
      return false
    }
  } catch (error) {
    console.error('Error during API call:', error);
  }

  return false;
};

function sendEmail2(session_id, reportUrl) {
  // responsesDone = false;
  console.log("sending email");
  const queryParams22 = new URLSearchParams({
    test_attempt_session_id: session_id,
    report_url: reportUrl,
    is_whatsapp: false,
  });

  if (!emailCandidate2) {
    queryParams22.append("send_report_to_candidate", false)
  }

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
      name: window.user.given_name,
    });
  }
  if (!window.user) {
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
        console.log("name email updated, sending email", data);
      });
  }
  sendEmail2(sessionId2, globalReportUrl2);
  const page_name = questionData2.results[0].page_name;
  const test_code = testCode2
  const skills = questionData2.results[0].skills_to_evaluate;
  const session_id = sessionId2
  const scenario_case = senarioCase2
  resetAllVariablesStt();
  //@disable the input
  const tChatElementRef = document.getElementById("chat-element2")
  const tShadowRoot = tChatElementRef.shadowRoot;

  const chatInputBox = tShadowRoot.getElementById("text-input")
  chatInputBox.classList.remove("text-input-disabled")
  chatInputBox.contentEditable = true

  if (page_name !== "explore") {
    increaseActionPointStt(userId2, "interaction_attempted");
  }
  // append custom message to chat
  let message2 = `<b>It's showtime ✨, here is your detailed <a target="_blank" style="color: #3b82f6;text-decoration:none;" href="${globalReportUrl2}">feedback report</a>. The feedback is also emailed to you and will be available to you for 60 days.</b>`;

  if (!emailCandidate2) {
    message2 =
      "<b>Thank you. The feedback report is sent to your manager and you may hear from them directly.</b>";
  }
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

  if (increaseSessionForFirstTestStt) {
    increaseSessionForAccesscodeStt(
      userId2,
      AccessCodeStt
    );
    increaseSessionForFirstTestStt = false
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

async function getTestRecommendationsStt(origin_test_id, test_case, session_id, user_id) {
  const params = new URLSearchParams({
    origin_test_id: origin_test_id || "",
    test_case: test_case || "",
    session_id: session_id || "",
    user_id: user_id || ""
  });

  const url = `${baseURL2}/tests/test-recommendations/?${params.toString()}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${createBasicAuthToken2(key2, secret2)}`
      }
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}, ${response}`);
    }

    const data = await response.json();
    console.log("Test Recommendations:", data);
    return data;
  } catch (error) {
    console.error("Failed to fetch test recommendations:", error);
    throw new Error(`Error: ${error}`);

  }
}

async function testRecommendationExceededStt(origin_test_id, test_case, session_id, user_id) {
  const data = await getTestRecommendationsStt(origin_test_id, test_case, session_id, user_id)
  if (data.total_recommendation > 2) {
    return true
  } else {
    return false
  }
}

const getLeaderboardPosition = async (
  userEmail,
  profileType,
  userId
) => {
  const response = await fetch(
    `${baseURL2}/accounts/participant-leader-board-report/?email=${userEmail}&by_category=true`,
    {
      method: "GET",
      headers: {
        Authorization: `Basic ${createBasicAuthToken2(key2, secret2)}`,
      },
    }
  );

  if (response.ok) {
    let responseData = await response.json();

    console.log("Leaderboard Data : ", responseData);

    if (profileType === "coach" || profileType === "mentor") {
      responseData = responseData.coach_mentor;
    } else if (profileType === "coachee" || profileType === "mentee") {
      responseData = responseData.coachee_mentee;
    } else {
      responseData = responseData.full_data;
    }

    console.log(
      `Leaderboard API\n Email : ${userEmail} \n Profile : ${profileType} \n User ID : ${userId}`
    );

    const userDetails = responseData.map(
      (data, i) => {
        return {
          name: data.name,
          user_id: data.user_id,
          total_count: responseData.length,
          rating: data.total_score === 0 ? responseData.length : data.rating,
        };
      }
    );

    const positionedUser = userDetails.filter(
      (userr) => userr.user_id === userId
    );

    console.log("Data : ", positionedUser);
    return positionedUser;
  } else {
    return [];
  }
};

const getCandidateReportStt = async (userId) => {
  const response = await fetch(`${baseURL2}/frontend-auth/get-report-url/`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${createBasicAuthToken2(key2, secret2)}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id: userId,
      report_type: "participantReport",
      candidate_id: userId,
    }),
  });

  if (response.ok) {
    const responseData = await response.json();
    console.log('getCandidateReport', responseData)
    return responseData.url;
  } else {
    return "";
  }
};

const getParticipantReportDataStt = async (userId) => {
  const response = await fetch(`${baseURL2}/accounts/${userId}/participant-report-data/`, {
    method: "GET",
    headers: {
      Authorization: `Basic ${createBasicAuthToken2(key2, secret2)}`,
      "Content-Type": "application/json",
    }
  });

  if (response.ok) {
    const responseData = await response.json();
    console.log('getParticipantReportDataStt', responseData)
    return responseData.data;
  } else {
    return {};
  }
};

const getAllReportsTestcode = async (test_code) => {
  try {
    const response = await fetch(`${baseURL2}/frontend-auth/get-all-reports-by-testcode/`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${createBasicAuthToken2(key2, secret2)}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ test_code: test_code, participant_id: userId2 }),
    });

    const responseData = await response.json();

    if (response.ok) {
      console.log('getAllReportsTestcode', responseData);
      return [responseData.report_urls, true];
    } else {
      console.error('Error:', responseData.error);
      return [responseData.error, false];
    }
  } catch (error) {
    console.error('Fetch error:', error);
    return [error.message || 'Unknown error', false];
  }
};

const CreateBotbyCSV = async (sheet_url) => {
  try {
    // Await the CSV to JSON conversion
    const data = await fetchGoogleSheetAsJson(sheet_url);

    // Now POST the JSON data
    const response = await fetch(`${baseURL2}/coaching-conversations/create-user-profile-and-bot/`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${createBasicAuthToken2(key2, secret2)}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data }),  // Send the data here
    });

    const responseData = await response.json();

    if (response.ok) {
      console.log('CreateBotbyCSV', responseData);
      return responseData.data
    } else {
      console.error('Error:', responseData);
      return responseData.data
    }

  } catch (error) {
    console.error('Fetch error:', error);
    return []
  }
};


async function createTestRecommendationStt(recommended_test_id, session_id, test_case) {
  const url = `${baseURL2}/tests/test-recommendations/`;

  const payload = {
    recommended_test_id: recommended_test_id,
    session_id: session_id,
    test_case: test_case
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${createBasicAuthToken2(key2, secret2)}`
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    console.log("Test Recommendation Created:", data);
    return data;
  } catch (error) {
    console.error("Failed to create test recommendation:", error);
    throw new Error(`Error: ${error}`);

  }
}


async function generateTestScenarioStt({ userId, sessionId, skills, flavour, isMicro }) {
  const url = new URL(`${baseURL2}/tests/get_or_create_test_scenarios_by_site/`);
  const params = {
    mode: "A",
    information: JSON.stringify({
      data: {
        information: `Targeted Skills: ${skills}`,
      },
      title: "",
    }),
    access_token: `Basic ${createBasicAuthToken2(key2, secret2)}`,
    creator_user_id: userId,
    flavour: flavour,
    is_micro: isMicro,
    previous_session_id: sessionId,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Basic ${createBasicAuthToken2(key2, secret2)}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    const data = await response.json();
    console.log("Created Test Result:", data);

    if (data[0]?.message || data[0]?.error) {
      console.error("Error generating the scenarios.");
      throw new Error("Failed to generate scenario");
    }

    return data[0]; // Ensure we return the resolved data
  } catch (err) {
    console.error("Fetch Error:", err);
    throw new Error("Failed to generate scenario");
  }
}


function copyClipboard(block_id_to_copy) {
  gShadowRoot2 = document.getElementById("chat-element2").shadowRoot;
  const testCodeBlock = gShadowRoot2.getElementById(block_id_to_copy);

  if (testCodeBlock) {
    navigator.clipboard.writeText(testCodeBlock.innerText)
      .then(() => {
        console.log("Text copied successfully!");
      })
      .catch(err => console.error("Failed to copy text:", err));
  } else {
    console.error("Element not found:", block_id_to_copy);
  }
}

const handleAttemptScenaiosSTT = async (title, test_code) => {
  console.log("Attempting Scenaios", test_code, title);
  libraryTestoptionsStt.push(title);
  testCode2 = test_code;
  userAcessAvailability2 = true;
  optedNo2 = true;
  AttemptTestDirectSTT = true;

  gShadowRoot2 = document.getElementById("chat-element2").shadowRoot;
  const createScenraiobtn = gShadowRoot2.querySelectorAll(
    "#create-scenario-section button"
  );
  if (createScenraiobtn) {
    createScenraiobtn.forEach((btn) => {
      btn.disabled = true;
      btn.style.cursor = "not-allowed";
      btn.removeAttribute("onclick");
      btn.removeAttribute("onmouseover");
      btn.removeAttribute("onmouseout");
    });
  }
  // gShadowRoot2.getElementById("text-input").focus();
  // setTimeout(() => {
  //   gShadowRoot2.getElementById("text-input").textContent = title;
  //   setTimeout(() => {
  //     gShadowRoot2.querySelectorAll(".input-button")[1].click();
  //   }, 100);
  // }, 100);

  gShadowRoot2.getElementById("text-input").focus();
  setTimeout(() => {
    gShadowRoot2.getElementById("text-input").textContent = title;
    gShadowRoot2.querySelectorAll(".input-button")[1].click();

    setTimeout(() => {
      var chatElement = document.getElementById("chat-element2");
      const shdwroot = chatElement.shadowRoot;
      const messageContainers = shdwroot.querySelectorAll(
        ".outer-message-container"
      );
      messageContainers.forEach((container) => {
        const messageText = container.querySelector(".user-message-text p");
        if (messageText && messageText.textContent.trim() === title.trim()) {
          container.remove();
        }
      });
    }, 100);
  }, 100);
};

window.handleAttemptScenaiosSTT = handleAttemptScenaiosSTT
async function handleScenarioRegeneration(signals) {
  const gShadowRoot2 = document.getElementById("chat-element2").shadowRoot;
  console.log(signals);

  const regenerateButton = gShadowRoot2.getElementById(
    "scenario-regenerate-button"
  );
  if (regenerateButton) {
    regenerateButton.disabled = true;
    regenerateButton.style.cursor = "wait";
    regenerateButton.removeAttribute("onclick");

    regenerateButton.innerText = "Regenerating...";
  }

  const errRegenerateButton = gShadowRoot2.getElementById(
    "scenario-err-regenerate-button"
  );

  if (errRegenerateButton) {
    errRegenerateButton.disabled = true;
    errRegenerateButton.style.cursor = "wait";
    errRegenerateButton.removeAttribute("onclick");

    errRegenerateButton.innerText = "Regenerating...";
  }

  if (false) {
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

  var currentURL =
    window.location.protocol +
    "//" +
    window.location.hostname +
    (window.location.port ? ":" + window.location.port : "") +
    window.location.pathname +
    window.location.search +
    window.location.hash;

  // var currentURL = "https://coachbots-rajan.blogspot.com/2024/05/project-management.html"

  const url = new URL(
    `${baseURL2}/tests/get_or_create_test_scenarios_by_site/`
  );
  const data_params = {
    mode: "A",
    url: currentURL,
    access_token: `Basic ${createBasicAuthToken2(key2, secret2)}`,
    regeneration: true,
    is_micro: `${snnipetConfigSTT.isMicro === 'true' ? true : false}`
  };

  console.log("is_micro", snnipetConfigSTT.isMicro, data_params);

  const shadowRoot = document.getElementById("chat-element2").shadowRoot;
  await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Basic ${createBasicAuthToken2(key2, secret2)}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data_params)
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Dynamically created Test result stt", data);

      if (regenerateButton) {
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

      console.log("sucessfully crated scenarios: ", scenarios);
      if (scenarios.length == 0) {
        console.log("failed to generate");

        const ErrorDiv = `
        <div id='error-section' style="display: flex; flex-direction: column; align-items: start; justify-content: start; border: 1px solid darkgray; border-radius: 6px; padding: 6px; margin: 0;">
        <p style="font-size: 14px; color: #333; margin: 0; font-weight : 600; margin-top: 10px;">Scenario generation failed because of failure of page extraction</p>
        <div style="display: flex; justify-content: flex-end;">
          <button 
              id="scenario-err-regenerate-buttonn"
              type="button"
              style="
                margin-top: 8px;
                padding: 4px 10px;
                background-color: #fff;
                color: #333;
                border: 1px solid green;
                border-radius: 4px;
                font-size: 12px;
                font-weight: 500;
                cursor: pointer;
                transition: background-color 0.2s, border-color 0.2s, color 0.2s;
              " 
              onmouseover="this.style.backgroundColor='#f0f0f0'; this.style.borderColor='green';"
              onmouseout="this.style.backgroundColor='#fff'; this.style.borderColor='green';"
            >
             🔄 Regenerate
            </button>
        </div>
        </div>
        `;

        setTimeout(() => {
          const regenerateButton = shadowRoot.getElementById(
            "scenario-err-regenerate-buttonn"
          );
          regenerateButton.onclick = () => {
            handleScenarioRegeneration(signals);
          };
        }, 50);

        if (false) {
          signals.onResponse({
            html: ErrorDiv,
          });
        } else {
          appendMessage2(ErrorDiv);
        }
        return;
      }

      const prevScenarioComponent = shadowRoot.getElementById(
        "create-scenario-section"
      );

      if (prevScenarioComponent) {
        prevScenarioComponent.parentNode.remove();
      }

      const prevErrorSection = shadowRoot.getElementById("error-section");

      if (prevErrorSection) {
        prevErrorSection.parentNode.remove();
      }

      let divCont = "";
      scenarios.forEach((element, i) => {
        const testHtml = formatMessage2({
          title: element.title,
          description: element.description,
          instructions: "Response should be at least 15 words."
        });

        divCont += `
            ${testHtml}
          <div style="display: flex; justify-content: flex-end;">

            <button
              id="attempt-btn-regen-${i}"
              type="button"
              style="
                margin-top: 0.75rem;
                padding: 0.25rem 0.75rem;
                background-color: #fff;
                color: #333;
                border: 1px solid #ccc;
                border-radius: 4px;
                font-size: 0.85rem;
                cursor: pointer;
                transition: background-color 0.2s, color 0.2s, border-color 0.2s;
              "
              onmouseover="this.style.backgroundColor='#f0f0f0'; this.style.borderColor='#999';"
              onmouseout="this.style.backgroundColor='#fff'; this.style.borderColor='#ccc';"
            >
              Attempt
            </button>
          </div>
        `;

        setTimeout(() => {
          const btn = shadowRoot.getElementById(`attempt-btn-regen-${i}`);
          btn.onclick = () => {
            handleAttemptScenaiosSTT(element.title, element.test_code);
          };
        }, 100);
      });

      if (false) {
        signals.onResponse({
          html: `<div id='create-scenario-section' style="max-width: 300px;display: flex; flex-direction: column; gap: 4px;">
            ${divCont}
            </div>`,
        });
      } else {
        appendMessage2(`
            <div id='create-scenario-section' style="gap: 4px;">
            ${divCont}
            </div>
            `);
      }
    })
    .catch((err) => console.log(err));
}

//* Function to handle button click for no-code flow : start
async function handleOptionButtonClick2(
  labelText,
  signals,
  is_regenerate = false
) {
  console.log("button clicked in stt", labelText);
  const gShadowRoot2 = document.getElementById("chat-element2").shadowRoot;

  if (is_regenerate) {
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
          console.log(i, messageContainers.length - 1);
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

    return;
  }
  const button = gShadowRoot2.getElementById("create-new-scenario");
  if (button) {
    button.disabled = true;
  }

  if (gShadowRoot2.querySelectorAll("#create-scenario-section").length > 0) {
    console.log("already existed");
    return;
  }

  optedNo = true;
  var currentURL =
    window.location.protocol +
    "//" +
    window.location.hostname +
    (window.location.port ? ":" + window.location.port : "") +
    window.location.pathname +
    window.location.search +
    window.location.hash;
  //  var currentURL = "https://coachbots-rajan.blogspot.com/2024/05/project-management.html"
  console.log("currenturl", currentURL);

  // const generationLoader = `<div id="scenario-generation-loader" styte="font-size: 12px; color: lightgray; padding: 10px 0;">Please wait, we are generating your scenarios...</div>`
  // appendMessage2(generationLoader)

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

  const data_params = {
    mode: "A",
    url: currentURL,
    access_token: `Basic ${createBasicAuthToken2(key2, secret2)}`,
    is_micro: `${snnipetConfigSTT.isMicro === "true" ? true : false}`,
    flavour: snnipetConfigSTT.flavour
  };


  const shadowRoot = document.getElementById("chat-element2").shadowRoot;
  await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Basic ${createBasicAuthToken2(key2, secret2)}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data_params)
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Dynamically created Test result stt", data);
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

      console.log("sucessfully crated scenarios: ", scenarios);
      console.log(signals);
      if (scenarios.length == 0) {
        console.log("failed to generate");

        const ErrorDiv = `
        <div id='error-section' style="display: flex; flex-direction: column; align-items: start; justify-content: start; border: 1px solid darkgray; border-radius: 6px; padding: 6px; margin: 0;">
        <p style="font-size: 14px; color: #333; margin: 0; font-weight : 600; margin-top: 10px;">Scenario generation failed because of failure of page extraction</p>
          <div style="display: flex; justify-content: flex-end;">
          <button 
              id="scenario-err-regenerate-button"
              type="button"
              style="
                margin-top: 8px;
                padding: 4px 10px;
                background-color: #fff;
                color: #333;
                border: 1px solid green;
                border-radius: 4px;
                font-size: 12px;
                font-weight: 500;
                cursor: pointer;
                transition: background-color 0.2s, border-color 0.2s, color 0.2s;
              " 
              onmouseover="this.style.backgroundColor='#f0f0f0'; this.style.borderColor='green';"
              onmouseout="this.style.backgroundColor='#fff'; this.style.borderColor='green';"
            >
             🔄 Regenerate
            </button>
        </div>
        </div>
        `;

        setTimeout(() => {
          const regenerateButton = shadowRoot.getElementById(
            "scenario-err-regenerate-button"
          );
          regenerateButton.onclick = () => {
            handleScenarioRegeneration(signals);
          };
        }, 100);
        if (signals) {
          signals.onResponse({
            html: ErrorDiv,
          });
        } else {
          appendMessage2(ErrorDiv);
        }
        return;
      }

      let divCont = "";
      const scenarioCount = scenarios.length;
      scenarios.forEach((element, i) => {
        const testHtml = formatMessage2({
          title: element.title,
          description: element.description,
          instructions: "Response should be at least 15 words."
        });

        divCont += `
          ${testHtml}
          <div style="display: flex; justify-content: flex-end; ${scenarioCount ===1 ? "gap: 4px;": ""}">
          <button 
            id="attempt-btn-${i}"
            type="button"
            style="
              margin-top: 8px;
              padding: 4px 10px;
              background-color: #fff;
              color: #333;
              border: 1px solid #ccc;
              border-radius: 4px;
              font-size: 12px;
              font-weight: 500;
              cursor: pointer;
              transition: background-color 0.2s, border-color 0.2s, color 0.2s;
            " 
            onmouseover="this.style.backgroundColor='#f0f0f0'; this.style.borderColor='#999';"
            onmouseout="this.style.backgroundColor='#fff'; this.style.borderColor='#ccc';"
          >
            Attempt
          </button>
          ${scenarioCount === 1 && (
            `<button 
              id="scenario-regenerate-button"

              type="button"
              style="
                margin-top: 8px;
                padding: 4px 10px;
                background-color: #fff;
                color: #333;
                border: 1px solid green;
                border-radius: 4px;
                font-size: 12px;
                font-weight: 500;
                cursor: pointer;
                transition: background-color 0.2s, border-color 0.2s, color 0.2s;
              " 
              onmouseover="this.style.backgroundColor='#f0f0f0'; this.style.borderColor='green';"
              onmouseout="this.style.backgroundColor='#fff'; this.style.borderColor='green';"
            >
             🔄 Regenerate
            </button>`
          )}
          </div>
        `;

        setTimeout(() => {
          const btn = shadowRoot.getElementById(`attempt-btn-${i}`);
          btn.onclick = () => {
            handleAttemptScenaiosSTT(element.title, element.test_code);
          };
        }, 100);
      });

      if (signals) {
        signals.onResponse({
          html: `
            <div id="create-scenario-section">
              ${divCont}
              ${scenarioCount > 1 ? `
                <hr/>
                <div style="display: flex; justify-content: flex-end;">
                  <button 
                    id="scenario-regenerate-button"
                    type="button"
                    style="
                      margin-top: 8px;
                      padding: 4px 10px;
                      background-color: #fff;
                      color: #333;
                      border: 1px solid green;
                      border-radius: 4px;
                      font-size: 12px;
                      font-weight: 500;
                      cursor: pointer;
                      transition: background-color 0.2s, border-color 0.2s, color 0.2s;
                    " 
                    onmouseover="this.style.backgroundColor='#f0f0f0'; this.style.borderColor='green';"
                    onmouseout="this.style.backgroundColor='#fff'; this.style.borderColor='green';"
                  >
                    🔄 Regenerate
                  </button>
                </div>
              ` : ""}
            </div>
          `,
        });

        setTimeout(() => {
          const regenerateButton = shadowRoot.getElementById(
            "scenario-regenerate-button"
          );
          regenerateButton.onclick = () => {
            handleScenarioRegeneration(signals);
          };
        }, 50);
      } else {
        appendMessage2(`
      <div id='create-scenario-section' style="display: flex; flex-direction: column; gap: 4px;">
      ${divCont}
      </div>
      `);
      }
    })
    .catch((err) => console.log(err));
}

async function handleReportButtonClickStt(choice) {
  const reportWrapper = document.getElementById("report-buttons-stt");
  if (reportWrapper) {
    reportWrapper.querySelectorAll("button").forEach((btn) => (btn.disabled = true));
  }
  FetchTestCodeReportStt = false;

  const participantData = await getParticipantReportDataStt(userId2);
  if (participantData?.participant_info.total_questions_attempted === 0 && choice !== 'report-leaderboard') {
    let msg = "NO attempt history found!"
    if (choice === 'report-test') {
      msg = "No test attempts found. Please attempt a test to fetch a report."
    } else if (choice === 'report-history') {
      msg = "No history report available. Please attempt a test to generate a report."
    }
    appendMessage2(
      msg
    )
    enableReportButtons();
    return;
  }
  if (participantData?.participant_info.total_questions_attempted < 3 && choice === 'report-leaderboard') {
    if (choice === 'report-leaderboard') {
      msg = "Not enough data.";
      appendMessage2(
        msg
      )
      enableReportButtons();
    }
    return;
  }

  try {
    if (choice === 'report-history') {
      const url = await getCandidateReportStt(userId2);
      appendMessage2(`
          <a href="${url}" target="_blank" rel="noopener noreferrer" style="
            display: inline-block;
            padding: 4px 8px;
            font-size: 14px;
            font-weight: 600;
            color: white;
            background-color: #10b981;
            border-radius: 6px;
            text-decoration: none;
            transition: background-color 0.2s ease;
          " onmouseover="this.style.backgroundColor='#059669'"
            onmouseleave="this.style.backgroundColor='#10b981'">
            View History Report
          </a>
      `);
    } else if (choice === 'report-leaderboard') {
      const userPositionDetails = await getLeaderboardPosition(
        window.user.email,
        clientuserInformationSTT?.profile_type || "",
        userId2
      );
      appendMessage2(`You are currently ranked #<b>${userPositionDetails[0].rating}</b>`);
    } else if (choice == 'report-test') {
      appendMessage2(`Enter interaction code to fetch its latest report.`)
      FetchTestCodeReportStt = true;
    }
  } catch (err) {
    console.error("Error generating report:", err);
    appendMessage2("An error occurred while generating the report.");
  } finally {
    enableReportButtons(); // Re-enable after operation
  }
}

function enableReportButtons() {
  let faqButtonsWrapper;
  const faqButtonsWrapperBottom = document.getElementById("starting-faq-buttons");
  const faqButtonsWrappertop= document.getElementById("starting-faq-buttons-headers");
  const effectiveButtonPosition = snnipetConfigSTT?.buttonPosition ?? buttonPositionSTT;

  if ( effectiveButtonPosition === "top"){
    faqButtonsWrapper = faqButtonsWrappertop;
  } else {
    faqButtonsWrapper = faqButtonsWrapperBottom;
  }
  if (faqButtonsWrapper) {
    faqButtonsWrapper.style.display = window.user ? "flex" : "none";
  }
  const wrapper = document.getElementById(`report-buttons-stt-${effectiveButtonPosition}`);
  if (wrapper) {
    wrapper.querySelectorAll("button").forEach((btn) => {
      btn.disabled = false;
      btn.style.cursor = "pointer";
      btn.style.opacity = "1";
      btn.style.display = "inline-block";
    });
  }
}
function waitForMessagesElement(maxAttempts = 20, delay = 100) {
  let attempts = 0;
  const interval = setInterval(() => {
    const hostEl = document.getElementById("chat-element2");

    if (hostEl?.shadowRoot) {
      const messages = hostEl.shadowRoot.getElementById("messages");
      if (messages) {
        clearInterval(interval); // Stop checking
        messages.style.paddingBottom = "2rem";
        console.log("#messages found and style applied.");
        return;
      }
    }

    attempts++;
    if (attempts >= maxAttempts) {
      clearInterval(interval);
      console.warn("Unable to find #messages inside shadow root.");
    }
  }, delay);
}



const addReportButtons = async () => {
  let faqButtonsWrapper;
  const faqButtonsWrapperBottom = document.getElementById("starting-faq-buttons");
  const faqButtonsWrappertop= document.getElementById("starting-faq-buttons-headers");
  const effectiveButtonPosition = snnipetConfigSTT?.buttonPosition ?? buttonPositionSTT;

  if ( effectiveButtonPosition === "top"){    
    faqButtonsWrapper = faqButtonsWrappertop;
  } else {
    faqButtonsWrapper = faqButtonsWrapperBottom;
  }


  const buttonsWrapper = document.createElement("div");
  buttonsWrapper.id = `report-buttons-stt-${effectiveButtonPosition}`;
  buttonsWrapper.style.cssText = `
    display: flex;
    flex-direction: row;
    gap: 4px;
    width: fit-content;
    overflow-x: auto;
    padding-bottom: 2px;
    scrollbar-width: none;
  `;

  const faqButtonsGenerator = (actionName, buttonText) => {
    const button = document.createElement("button");
    button.innerText = buttonText;
    button.onclick = () => handleReportButtonClickStt(actionName);

    button.style.cssText = `
      padding: 4px 8px;
      font-size: 12px;
      border: 1px solid lightgray;
      border-radius: 4px;
      background-color: white;
      border-color: green;
      cursor: ${window.user ? 'pointer' : 'not-allowed'};
      opacity: '1';
      display: ${window.user ? 'inline-block' : 'none'};
    `;

    button.onmouseover = () => (button.style.backgroundColor = '#e5e7eb');
    button.onmouseleave = () => (button.style.backgroundColor = 'white');

    if (!window.user) button.disabled = true;

    buttonsWrapper.appendChild(button);
  };

  faqButtonsGenerator('report-history', "History Report");
  faqButtonsGenerator('report-test', "Interaction Report");
  faqButtonsGenerator('report-leaderboard', "Leaderboard Rank");

  faqButtonsWrapper.style.display = window.user ? "flex" : "none";
  faqButtonsWrapper.appendChild(buttonsWrapper);

  waitForMessagesElement();

  console.log('BotId', faqButtonsWrapper, buttonsWrapper)
}


let chatInputFontSize = "14px";
let messageBubbleMaxWidth = "100%";
if (window.innerWidth < 768) {
  chatInputFontSize = "12px";
}

const snippetOrigin = () => {
  const hostname = window.location.hostname;
  const pathname = window.location.pathname;
  console.log('check', baseURL2)
  if (window.origin){
    if (window.botId)  botId=window.botId;
    return window.origin
  }

  const isInternalHost = 
    hostname === "localhost" ||
    hostname === "playground.coachbots.com" ||
    hostname === "platform.coachbots.com";

  if (isInternalHost && !pathname.startsWith("/widget/")) {
    return "internal";
  } else {
    return "external";
  }
};


const getDefaultInstractionsStt = (type = 'system', condition = "normal") => {
  if (type === 'system') {
    if (condition === "normal") {
      return `
              <li><strong>1. For Coaching Interactions:</strong> To maintain a record of sessions with coaches/mentors, simply click on "End & Email Summary". Your coach/mentor will receive a notification, and a transcript will be shared afterward. For AI Coaching Agent, no emails are being sent.</li>
              <li><strong>2. AI Knowledge Agent:</strong> Simple AI Knowledge Agent is created based on a documented set of knowledge on a specific topic. It can be knowledge based on a project, situation, or coach's specific point of view.</li>
              <li><strong>3. For Feedback Bots:</strong> Consider responding to at least five questions for completeness and hit the submit button for the record. Only positive feedback is displayed publicly, while critical feedback is delivered over email privately.</li>
              <li><strong>4. Psychometric Assessments and Simulations:</strong> These may take several forms depending on the subject and context. The short version contains 3 questions, and the standard version may have 8 or more. At the end of any session, a detailed feedback report will be generated. The premium version will contain speech & voice analytics.</li>
              <li><strong>5. Avoid Unrelated Responses:</strong> In responses, it's important to avoid unrelated, answers, or comments, as well as overly rapid responses, as these may trigger system errors. Please be sure to adhere to the topic context for best results. The aim is to simulate real-world interactions.</li>
              <li><strong>6. Optimal Response:</strong> Optimal responses should range between 15 to 400 words. You have the option to either type or speak your responses.</li>
            `
    } else if (condition === "bot") {
      return `
              <li><strong>1. For Coaching Interactions:</strong> To maintain a record of sessions with coaches/mentors, simply click on "End & Email Summary". Your coach/mentor will receive a notification, and a transcript will be shared afterward. For AI Coaching Agent, no emails are being sent.</li>
              <li><strong>2. AI Knowledge Agent:</strong> Simple AI Knowledge Agent is created based on a documented set of knowledge on a specific topic. It can be knowledge based on a project, situation, or coach's specific point of view.</li>
              <li><strong>3. For Feedback Bots:</strong> Consider responding to at least five questions for completeness and hit the submit button for the record. Only positive feedback is displayed publicly, while critical feedback is delivered over email privately.</li>
              <li><strong>4. Avoid Unrelated Responses:</strong> In responses, it's important to avoid unrelated, answers, or comments, as well as overly rapid responses, as these may trigger system errors. Please be sure to adhere to the topic context for best results. The aim is to simulate real-world interactions.</li>
              <li><strong>5. Optimal Response:</strong> Optimal responses should range between 15 to 400 words. You have the option to either type or speak your responses.</li>
            `
    } else if (condition === "simulations") {
      return `
              <li><strong>1. Psychometric Assessments and Simulations:</strong> These may take several forms depending on the subject and context. The short version contains 3 questions, and the standard version may have 8 or more. At the end of any session, a detailed feedback report will be generated. The premium version will contain speech & voice analytics.</li>
              <li><strong>2. Avoid Unrelated Responses:</strong> In responses, it's important to avoid unrelated, answers, or comments, as well as overly rapid responses, as these may trigger system errors. Please be sure to adhere to the topic context for best results. The aim is to simulate real-world interactions.</li>
              <li><strong>3. Optimal Response:</strong> Optimal responses should range between 15 to 400 words. You have the option to either type or speak your responses.</li>
            `

    } else {
      return `<div class="ist-sc" style="font-size: 12px; max-height: 30vh; overflow-y : scroll; padding: 0 8px;"> 
        <b style="font-size: 14px; margin: 4px 0 2px 0;">System specifications</b>
        <ul id="instructions-list" style="list-style-type: none; font-size: 12px; padding-left:20px;">
              <li><strong>1. Psychometric Assessments and Simulations:</strong> These may take several forms depending on the subject and context. The short version contains 3 questions, and the standard version may have 8 or more. At the end of any session, a detailed feedback report will be generated. The premium version will contain speech & voice analytics.</li>
              <li><strong>2. Avoid Unrelated Responses:</strong> In responses, it's important to avoid unrelated, answers, or comments, as well as overly rapid responses, as these may trigger system errors. Please be sure to adhere to the topic context for best results. The aim is to simulate real-world interactions.</li>
              <li><strong>3. Optimal Response:</strong> Optimal responses should range between 15 to 400 words. You have the option to either type or speak your responses.</li>
              </ul>
      </div>`
    }
  } else if (type === 'bot') {
    return `
      <div class="ist-sc" style="font-size: 12px; max-height: 30vh; overflow-y : scroll; padding: 0 8px;">
        <b style="font-size: 14px; margin: 4px 0 2px 0;">Coachbot Coaching interaction guide</b>
        <ol style="list-style-type: none;">
          <li><strong>1. Define Your Goal:</strong> Before starting a conversation, take a moment to identify your specific goal for the session. Are you looking to improve your communication skills, tackle a challenging project, or develop a new habit? A clear goal helps your AI Coach tailor its guidance to your needs.</li>
          <li><strong>2. Ask Open-Ended Questions:</strong> Instead of "yes" or "no" questions, ask open-ended questions that encourage deeper conversation and insightful responses from your AI Coach. Here are some examples:
            <ul>
              <li>"What strategies can I use to overcome my public speaking anxiety?"</li>
              <li>"How can I break down this large project into manageable steps?"</li>
              <li>"What are some alternative approaches I haven't considered?"</li>
            </ul>
          </li>
          <li><strong>3. Provide Context:</strong> Give your AI Coach context for your situation. The more details you provide, the better your coach can understand your challenges and provide relevant advice. For example:
            <ul>
              <li>"I have an upcoming presentation in front of a large audience, and I feel very nervous."</li>
              <li>"I'm starting a new fitness routine, but I find it difficult to stay motivated."</li>
            </ul>
          </li>
          <li><strong>4. Utilize Powerful Questions:</strong> Leverage different prompting techniques to guide your AI Coach and get more specific or customized responses:
            <ul>
              <li>Clarification Questions: "Can you elaborate on that point?" or "Could you give me an example?"</li>
              <li>Reflective Questions: "That's an interesting perspective. Can you tell me more about...?" or "So, what you're saying is...?"</li>
              <li>Action-Oriented Questions: "Based on this, what actionable steps can I take?" or "How can I apply this advice to my specific situation?"</li>
            </ul>
          </li>
          <li><strong>5. Share Your Thoughts & Feelings:</strong> Don't hesitate to share your thoughts and feelings with your AI Coach. Open communication allows for a more productive coaching experience.</li>
          <li><strong>6. Follow Up & Track Progress:</strong> After your session, reflect on the insights and advice you received. Set clear action steps and track your progress over time. This helps you stay motivated and measure the impact of your coaching sessions.</li>
          <li><strong>7. Ask Follow-Up Questions:</strong> As you implement the suggestions from your AI Coach, don't hesitate to ask follow-up questions if you encounter challenges or need further clarification.</li>
          <li>Remember: Your Coachbot is here to support you on your journey. The more actively you participate in the conversation, by asking questions, providing details, and reflecting on the guidance offered, the more valuable and personalized your coaching experience will be.</li>
        </ol>
      </div>
      
        <span id="close-instructions-pane" onmouseover="this.style.cursor ='pointer'" style="padding : 2px; border-radius: 50%; background-color: white;">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
          </svg>
        </span>
      
      `

  }
}

document.addEventListener("click", function (event) {
    if (event.target.closest("#close-instructions-pane")) {
        const instructionsPane = document.getElementById("instructions-pane");
        if (instructionsPane) {
            instructionsPane.style.display = "none";
        }
    }
});

const StopSession = async() =>{
  await window.cancelTestStt(participantId2); // cancelling session
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
    if (msg) msg.parentNode.replaceChild(que_msg, msg);
  }
  // resetAllVariablesStt(); //reseting variables
  // signals.onResponse({
  //   html: "<b>Your session is terminated. You can restart again!</b>",
  // });
  resetAllVariablesStt().then(() => {
    console.log("Your session is terminated. You can restart again!");
    if (Object.keys(snnipetConfigSTT).length > 0) {
      appendMessage2('<b>Your session is terminated. You can either enter a interaction code or refresh the page for generating the a new simulation.</b>')
    } else {
      appendMessage2('<b>Your session is terminated. You can restart again!</b>');
    }

    //Enable Copy Paste
    var chatElementRef2 = document.getElementById("chat-element2");
    var shadowRoot = chatElementRef2.shadowRoot;

    const textInputElement = shadowRoot.getElementById("text-input");
    textInputElement.removeAttribute("onpaste");

    //@disable the input
    const tChatElementRef = document.getElementById("chat-element2");
    const tShadowRoot = tChatElementRef.shadowRoot;

    const chatInputBox = tShadowRoot.getElementById("text-input");
    chatInputBox.classList.remove("text-input-disabled");
    chatInputBox.contentEditable = true;
  });
            
}


function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function startModernTimer(seconds, onComplete) {
  const container = document.getElementById("timerContainer");
  const countdownEl = document.getElementById("countdown");

  let timeLeft = seconds;
  container.style.display = "inline-block";
  countdownEl.textContent = formatTime(timeLeft);

  // Reset styles
  container.style.borderColor = "#4CAF50";
  container.style.background = "#f9fff9";
  container.style.color = "#2b2b2b";

  if (timerInterval) clearInterval(timerInterval);

  timerInterval = setInterval(() => {
    timeLeft--;
    countdownEl.textContent = formatTime(timeLeft);

    // Change color based on remaining time
    if (timeLeft <= 10) {
      container.style.borderColor = "#f44336"; // red
      container.style.background = "#fff5f5";
    } else if (timeLeft <= 30) {
      container.style.borderColor = "#ffc107"; // orange
      container.style.background = "#fffdf2";
    }

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      container.style.display = "none";
      if (typeof onComplete === "function") {
        onComplete();
      }
    }
  }, 1000);
}

function stopModernTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
    const container = document.getElementById("timerContainer");
    container.style.display = "none";
    console.log("⛔ Timer stopped");
  }
}

  function setBeginSessionEnabled(enabled) {
  const button = document.getElementById("begin-session-button");
  if (!button) return;

  if (enabled) {
    button.disabled = false;
    Object.assign(button.style, {
      backgroundColor: "#22c55e",
      color: "white",
      fontWeight: "normal",
    });

    button.style.cursor = "pointer";

    // Optional: restore hover behavior
    button.addEventListener("mouseover", () => {
      if (!button.disabled) {
        button.style.backgroundColor = "#4ade80";
    button.style.cursor = "pointer";

      }
    });
    button.addEventListener("mouseleave", () => {
      if (!button.disabled) {
        button.style.backgroundColor = "#22c55e";
    button.style.cursor = "pointer";

      }
    });
  } else {
    button.disabled = true;
    Object.assign(button.style, {
      cursor: "not-allowed",
      backgroundColor: "#d3d3d3",
      color: "#a0a0a0",
      fontWeight: "600",
    });

    // Override hover behavior
    button.addEventListener("mouseover", () => {
      button.style.backgroundColor = "#d3d3d3";
      button.style.cursor = "not-allowed";
    });
    button.addEventListener("mouseleave", () => {
      button.style.backgroundColor = "#d3d3d3";
      button.style.cursor = "not-allowed";
    });
  }
}

function updateAudioInteraction(newState) {
  allowAudioInteraction = newState;
  console.log("Audio toggle changed:", allowAudioInteraction);

  // Update the checkbox to reflect the new state
  const audioToggle = document.getElementById("bot-audio-interaction-switch");

  if (audioToggle) {
    audioToggle.checked = newState;
  }

  // Perform actions based on the new state
  if (!allowAudioInteraction) {
    console.log("Audio interaction is OFF.");
  } else {
    console.log("Audio interaction is ON.");
  }
}

async function  updateAudioAllowed(initial, showToggel=true){
  let isaudio = false;

  if (initial){
    if (Object.keys(snnipetConfigSTT).length > 0) {
    isaudio =
      snnipetConfigSTT.allowAudioInteraction === "true";
    
  } else {
    console.log(
      "clientAllowAudioInteraction2",
      clientAllowAudioInteraction2
    );
    console.log(
      "userAllowAudioInteraction2",
      userAllowAudioInteraction2
    );
    console.log(
      "prioritiseUserAllowInteraction2",
      prioritiseUserAllowInteraction2
    );

    if (clientAllowAudioInteraction2) {
      isaudio = userAllowAudioInteraction2;
    } else {
      isaudio = false;
    }
  }

  }
  

  updateAudioInteraction(isaudio);
  allowAudioInteraction = isaudio;
  isImmersiveStt = isaudio;

  const audiointeraction = document.getElementById("audio-interaction");

  if (showToggel){
    audiointeraction.style.display = 'flex'
  } else{
  audiointeraction.style.display = 'none'

  }

  return isaudio;
}

async function updateResponseStyle(newValue) {
  styleMap = await getResponseStyleList()
  const allowedValues = Object.values(styleMap);
  if (!allowedValues.includes(newValue)) {
    console.warn(`Invalid response style: "${newValue}"`);
    return;
  }

  const select = document.getElementById("style-selector");
  if (select) {
    select.value = newValue;

    // Send to backend
    if (participantId2) {
      fetch(`${baseURL2}/coaching-conversations/save-response-style/`, {
        method: "POST",
        headers: {
          Authorization: `Basic ${createBasicAuthToken2(key2, secret2)}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: participantId2,
          response_style: newValue,
        }),
      }).then((res) => res.json()).then(() => {
        console.log("Response style updated to:", newValue);
      });
    }
  }
}


async function loadExternalModule() {
  try {
    const { DeepChat } = await import(
      // "https://unpkg.com/deep-chat@1.4.0/dist/deepChat.bundle.js"
      "https://storage.googleapis.com/coachbots-simulator/deepchat-bundle.js"
    );
    // const {DeepChat} = await import('./public/widget/coachbots-stt-widget-new.js');
  } catch (error) {
    console.error("Error loading external module:", error);
  }
}

// Call the function to load and use the external module2
loadExternalModule().then(() => {
  snnipetConfigSTT = document.querySelector(".coachbots-coachscribe").dataset;

  if (Object.keys(snnipetConfigSTT).length > 0 && snnipetConfigSTT?.useCustomStt) {
    USE_CUSTOM_STT = snnipetConfigSTT?.useCustomStt === 'true'
  }
  if (Object.keys(snnipetConfigSTT).length > 0) {
    if (snnipetConfigSTT?.widgetHeight && snnipetConfigSTT?.widgetHeight.length > 0) {
      widgetHeight = snnipetConfigSTT?.widgetHeight;
    }
    if (snnipetConfigSTT?.widgetWidth && snnipetConfigSTT?.widgetWidth.length > 0) {
      widgetWidth = snnipetConfigSTT?.widgetWidth;
    }
    if (snnipetConfigSTT?.widgetImageLink && snnipetConfigSTT?.widgetImageLink.length > 0) {
      widgetImageLink = snnipetConfigSTT?.widgetImageLink;
    }
  }



  deepChatPocElement2 = document.getElementsByClassName(
    "coachbots-coachscribe"
  )?.[0];
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
        height: ${widgetHeight};
        width: ${widgetWidth};
        max-height: calc(100vh - 83px);
        background-color:rgb(246, 250, 249);
        box-shadow: 0px 0px 10px rgb(125, 125, 125);
        display: flex;
        justify-content: center;
        padding:0;
        align-items: center;
        position: fixed;
        right: 0.4rem;
        bottom: 1rem;
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
        style="
        height: 100%; 
        width: 100%; 
        object-fit: cover;
        display: block;
        "
        src= ${widgetImageLink}
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
      // bottom: 15vh;
      top: 5vh;
      bottom: auto;
      width: 80vw;
      right: 6rem; 
      transition: 0.4s ease-in-out; 
      transform-origin: right bottom;
      padding-bottom: 0.8rem;
      border-radius: 1rem 1rem 0rem 1rem;
      box-shadow: 0px 0px 10px rgb(196, 196, 196);
      background-color: white;
      z-index: 1000 !important;
      hight: 75vh;
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
      padding: ${snippetOrigin() === "internal" ? "0" : "0.4rem 0 0 0"};
      overflow-x: auto;
      overflow-y: hidden;
    ">
    <div 
  id="bot-header-logo-2"
  style="
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: fit-content;
    padding: 2px 0 0 2px;
    background-color: #f3f4f6;
    border-radius: 1rem 1rem 0 0;
    gap: 8px;
  "
>
  <h1 
    id="logo-h1"
    style="
      margin: 0;
      color: #2DC092;
      border: 2px solid #2DC092;
      padding: 4px 8px;
      font-size: 16px;
      line-height: 20px;
      font-weight: 800;
      align-items: center;
      display: ${window.origin === 'internal' ? 'none' : 'flex'}
    "
  >
    <span 
      id="logo-span"
      style="
        background-color: #2DC092;
        color: white;
        font-size: 14px;
        font-weight: 700;
        margin-right: 2px;
        padding: 2px;
      "
    >
      COACH
    </span>
    BOT
  </h1>

  <div 
    id="starting-faq-buttons-headers"
    style="
      display: none;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      gap: 6px;
      padding: 4px 8px;
      border-radius: 6px;
      background-color: transparent;
      overflow-x: auto;
      white-space: nowrap;
      scrollbar-width: none; /* Firefox */
      -ms-overflow-style: none;  /* IE 10+ */
    "
  >
    </div>

   <div id="chat-history-wrapper" style="position: relative; display: none">
  <select 
    id="chatHistoryDropdown"
    style="
      font-size: 12px;
      padding: 4px;
      border-radius: 4px;
      border: 1px solid #ccc;
      margin-left: 8px;
      cursor: pointer;
      vertical-align: middle;
    "
  >
    <option value="">Previous Chats</option>
  </select>
</div>
<div id="response-style" style="position: relative; display: none">
</div>
<div id="audio-interaction" class="audio-interaction" style='display: none'>
  <p class="label" style="margin:0px;">🔊</p>
  <div class="toggle-wrapper">
    <span class="toggle-text">No</span>
    <label class="switch">
      <input type="checkbox" id="bot-audio-interaction-switch" />
      <span class="slider"></span>
    </label>
    <span class="toggle-text">Yes</span>
  </div>
</div>
<!-- Mindmap Button + Dropdown -->
<div class="dropdown">
    <button id="mindmap-btn" style="display:none; padding:3px 9px; border:1px solid green; background:white; color:black; border-radius:5px; font-size:14px; cursor:pointer;">
        Mindmap
    </button>
    <div id="mindmap-menu" class="dropdown-menu" style="max-height: 250px; overflow-y: auto; display:none; position:absolute; margin-top:10px; background:white; box-shadow:0 2px 8px rgba(0,0,0,0.15); border-radius:6px; padding:8px; min-width:160px; z-index:1000;">
        <!-- Items will be injected dynamically -->
    </div>
</div>

<!-- Assessment Button + Dropdown -->
<div class="dropdown">
    <button id="assessment-btn" style="display:none; padding:3px 9px; border:1px solid green; background:white; color:black; border-radius:5px; font-size:14px; cursor:pointer;">
        Assessment
    </button>
    <div id="assessment-menu" class="dropdown-menu" style="max-height: 250px; overflow-y: auto; display:none; position:absolute; margin-top:10px; background:white; box-shadow:0 2px 8px rgba(0,0,0,0.15); border-radius:6px; padding:8px; min-width:160px; z-index:1000;">
        <!-- Items will be injected dynamically -->
    </div>
</div>

</div>

<div style="margin: 0; padding: 0; margin-bottom: 0.4rem; font-size: 14px;">
    
    <p id="warning-banner-stt">
    </p>
    
  <div id="timerContainer" style="
    display: none;
    position: absolute;
    top: 6px;
    right: 6px;
    font-family: 'Segoe UI', sans-serif;
    font-size: 12px;
    font-weight: 500;
    padding: 4px 8px;
    border: 1.5px solid #4CAF50;
    border-radius: 6px;
    background: #f9fff9;
    color: #2b2b2b;
    box-shadow: 0 1px 4px rgba(0,0,0,0.08);
    z-index: 1000;
    width: 80px;
    text-align: center;
  ">
    ⏱ <span id="countdown">00:00</span>
  </div>




</div>
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
      avatars="true"
      id="chat-element2"
      style="position: relative; top : 0; bottom: 0; left: 0 ; right: 0; width: 10%; height: ${isFlatWidget? "84vh" : snippetOrigin() === "internal" ? "68vh" : "64vh"
    }; border: none;"
      messageStyles='{
        "default": {
          "shared": {"bubble": {"maxWidth": ${JSON.stringify(
      messageBubbleMaxWidth
    )}, "marginTop": "4px", "borderRadius" : "4px", "padding" : "10px 8px", "fontWeight" : "normal"}},
          "ai" : {"bubble": {"backgroundColor": "#f3f4f6", "width": "calc(100% - 3rem)"}},
          "user" : {"bubble": {"backgroundColor": "#2DC092"}}
        },
        "loading": {
          "bubble": {"fontSize": "20px", "color": "black", "width" : "2rem", "padding": "10px" ,"paddingLeft": "2rem", "backgroundColor" : "transparent"}
        }
      }'
      displayLoadingBubble = "true";
      demo="true"
      style="border: none"
      textInput='{
        "styles": {
          "text": {"color": "black", "fontSize" : ${JSON.stringify(
      chatInputFontSize
    )}},
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
      speechToText='{"webSpeech": false,
        "commands": {"resume": "resume", "submit" : "submit", "settings": {"commandMode": "hello"}},

        "button": {
          "position" : "outside-left",
          "default": {
            "container": {
              "default": {
                "padding": "4px",
                "display": "${USE_CUSTOM_STT ? "none" : "block"}"
              },
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
          "default": "Due to system issues, the response can not be processed. Please check your internet connection and try to respond again."
        }
      }'
      auxiliaryStyle="
        ::-webkit-scrollbar {
          width: 6px;
          height: 10px;
        }
        ::-webkit-scrollbar-thumb {
          background-color: #9ca3af;
          border-radius: 5px;
        }"
      >

    </deep-chat>
    ${USE_CUSTOM_STT ?
      `<button id="startMicBtn" style="
      position: absolute; 
      /* These will be set dynamically by JavaScript */
      left: 0; 
      bottom: 0; 
      height: 0;
      width: 0;
      
      padding: 6px;
      border: none;
      border-radius: 50%;
      background-color: #00c080;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 0 2px 6px rgba(0,0,0,0.2);
    ">
      <svg xmlns="http://www.w3.org/2000/svg" height="18" width="18" viewBox="0 0 24 24" fill="white">
        <path d="M12 14q-1.25 0-2.125-.875T9 11V5q0-1.25.875-2.125T12 2q1.25 0 2.125.875T15 5v6q0 1.25-.875 2.125T12 14Zm-1 7v-3.1q-2.875-.35-4.738-2.437Q4.4 13.375 4.4 10.4H6q0 2.275 1.613 3.938Q9.225 16 12 16q2.775 0 4.388-1.662Q18 12.675 18 10.4h1.6q0 2.975-1.862 5.062Q15.875 17.55 13 17.9V21Z"/>
      </svg>
    </button>`
      : ""
    }

    <div 
      id="starting-faq-buttons"
      style=" 
        position: absolute; 
        left: 50%;
        transform: translateX(-50%);
        bottom: ${window.innerWidth < 768 ? "13vh" : "5rem"};
        max-width: calc(100% - 4rem);
        overflow-x: auto;
        overflow-y: hidden;
        white-space: nowrap;
        scrollbar-width: none; /* Firefox */
        -ms-overflow-style: none;  /* Internet Explorer 10+ */
        height: 36px; 
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        gap: 6px;
        padding: 4px 8px;
        border-radius: 6px;
        display: none;
        z-index: 0;
        background-color: white;
      "
    >
    </div>
    <p id="bot-footer" style="font-size: ${window.innerWidth < 768 ? "10px" : "12px"
    };  text-align: center; padding: 0 10%; height:20px; "><span id="footer-text">Available only on Google Chrome 🌐. Use "STOP" keyword to restart any time.</span>
      <span id="read-more-button" onmouseover="this.style.cursor ='pointer'">
        <button style="border: 1px solid darkgrey; padding: 1px 4px; border-radius: 4px; font-weight: 600; color: #3b82f6; height: fit-content; font-size: 12px;"> 
          Instructions
        </button>
      </span> 
      <div id="instructions-pane" style="position : absolute; left : 0px; bottom: 0px; right : 0px; width: 95%; border-radius: 10px; background-color: #eff6ff; margin: 20px; margin-left:  ${window.innerWidth < 768 ? "5px" : "25px"
    }; margin-bottom: 15px; z-index: 999; padding: 10px; display: none; justify-content: space-between; align-items: start;  border: 1px solid lightgray;">
        <div class="ist-sc" style="font-size: 12px; max-height: 30vh; overflow-y : scroll; padding: 0 8px;"> 
          <b style="font-size: 14px; margin: 4px 0 2px 0;">System specifications</b>
          <ul id="instructions-list" style="list-style-type: none; font-size: 12px; padding-left:20px;">
              <li><strong>1. For Coaching Interactions:</strong> To maintain a record of sessions with coaches/mentors, simply click on "End & Email Summary". Your coach/mentor will receive a notification, and a transcript will be shared afterward. For AI Coaching Agent, no emails are being sent.</li>
              <li><strong>2. For Simulations:</strong> Depending upon the subject and context, these may take several forms. The short version contains 3 questions, and the standard version contains 6 questions. Each simulation will have a detailed feedback report that will contain speech analytics if audio is sent via the system.</li>
              <li><strong>3. AI Knowledge Agent:</strong> Simple AI Knowledge Agent is created based on a documented set of knowledge on a specific topic. It can be knowledge based on a project, situation, or coach's specific point of view.</li>
              <li><strong>4. For Feedback Bots:</strong> Consider responding to at least five questions for completeness and hit the submit button for the record. Only positive feedback is displayed publicly, while critical feedback is delivered over email privately.</li>
              <li><strong>5. Avoid Unrelated Responses:</strong> In responses, it's important to avoid unrelated questions, answers, or comments, as well as overly rapid responses, as these may trigger system errors. Please be sure to adhere to the topic context (or the coach context) for best results. The aim is to simulate real-world interactions.</li>
              <li><strong>6. Optimal Response Length:</strong> Optimal responses should range between 15 to 400 words. You have the option to either type or speak your responses.</li>
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

  function adjustHeaderLayout() {
  const header = document.getElementById("bot-header-logo-2");
  if (window.innerWidth < 768) {
    header.style.flexDirection = "column";
    header.style.alignItems = "center";
  } else {
    header.style.flexDirection = "row";
  }
}
  function adjustChatDropdownSize() {
    const logo = document.getElementById("logo-h1");
    const dropdown = document.getElementById("chatHistoryDropdown");
    if (logo && dropdown) {
      const logoStyles = window.getComputedStyle(logo);
      const logoWidth = parseFloat(logoStyles.width);
      const logoHeight = parseFloat(logoStyles.height);

      dropdown.style.width = (logoWidth * 2) + "px";
      dropdown.style.height = logoHeight;
    }
  }


adjustChatDropdownSize();

document.getElementById('chatHistoryDropdown')?.addEventListener('change', function () {
  selectedChatId = this.value != 'new-chat' ? this.value: null;
  if (selectedChatId) {
    populateChatHistory(selectedChatId);
  }
});
document.getElementById('bot-audio-interaction-switch')?.addEventListener('change', function (event) {
    allowAudioInteraction = event.target.checked;
    isImmersiveStt = allowAudioInteraction;
    console.log("Audio toggle changed:", allowAudioInteraction);
});


// Call on load and on resize
window.addEventListener("load", adjustHeaderLayout);
window.addEventListener("resize", adjustHeaderLayout);

  const customMicButton = document.getElementById("startMicBtn");
  function updateMicButtonPosition() {
    const startMicBtn = document.getElementById('startMicBtn');
    if (!startMicBtn) return; // Exit if button not found

    const windowWidth = window.innerWidth;
    const isMobile = windowWidth < 768; // Define your mobile breakpoint

    // Calculate button size
    let buttonSize = isMobile ? 40 : 36; // px
    // You can also use a more fluid calculation:
    // buttonSize = Math.max(36, Math.min(60, windowWidth * 0.05)); // Min 36px, Max 60px, fluid up to 5% of width

    // Calculate left position
    let leftPosition = isMobile ? '1rem' : '1.5rem'; // Use rem for positioning
    // If you want more fluid, use vw:
    // leftPosition = `${isMobile ? 1 : 1.5}vw`;


    // Calculate bottom position
    let bottomPosition;
    if (isMobile) {
      bottomPosition = '13vh';
    } else {
      bottomPosition = '3.15rem'; // Use rem for desktop
      // Or use vh:
      // bottomPosition = '3.15vh';
    }

    // Apply styles to the button
    startMicBtn.style.left = leftPosition;
    startMicBtn.style.bottom = bottomPosition;
    startMicBtn.style.height = `${buttonSize}px`;
    startMicBtn.style.width = `${buttonSize}px`;

    // Adjust SVG size relative to button size
    const svg = startMicBtn.querySelector('svg');
    if (svg) {
      // SVG size can be a percentage of the button's size
      const svgSize = buttonSize * 0.5; // Example: SVG is 50% of button width/height
      svg.style.height = `${svgSize}px`;
      svg.style.width = `${svgSize}px`;
    }
  }

  console.log('custommic', customMicButton);
  if (customMicButton) {
    updateMicButtonPosition();
    customMicButton.addEventListener("click", handleCustomStt);
    customMicButton.addEventListener('resize', updateMicButtonPosition);

  }

  const readMoreButton = document.getElementById("read-more-button");
  const instructionsPane = document.getElementById("instructions-pane");
  const closeInstructionsPane = document.getElementById(
    "close-intructions-pane"
  );
  const instructionsPaneList = document.getElementById("instructions-list");
  const botFooterXyz = document.getElementById("bot-footer");
  const headerText = document.getElementById("header-text");

  if (snippetOrigin() === "external") {
    if (botFooterXyz) {
      if (!swipeHeader) {
        botFooterXyz.style.margin = "0";
      } else {
        botFooterXyz.style.width = "100%";
        botFooterXyz.style.fontSize = "16px";

        const footerText = document.getElementById("footer-text");
        if (footerText) {
          footerText.style.fontSize = "14px";
          footerText.style.fontWeight = "600";
        }
        instructionsPaneList.style.fontSize = "14px";
        instructionsPaneList.style.fontWeight = "600";
        instructionsPaneList.style.lineHeight = "normal";
      }
    }
    if (headerText) {
      headerText.style.display = "none";
    }
  }

  readMoreButton.addEventListener("click", () => {
    instructionsPane.style.display = "flex";
  });

  closeInstructionsPane.addEventListener("click", () => {
    instructionsPane.style.display = "none";
  });

  const chatContainer2 = document.getElementById("chat-container2");
  const chatElementRef2 = document.getElementById("chat-element2");
  const chatIconContainer2 = document.getElementById("chat-icon2");
  const chatbotHeading2 = document.getElementById("chatbot-heading2");
  const closeFromTopp2 = document.getElementById("close-top2");
  botId = document.querySelector(".coachbots-coachscribe").dataset.botId;
  sttWidgetClientId = document.querySelector(".coachbots-coachscribe").dataset
    .clientId;
  snnipetConfigSTT = document.querySelector(".coachbots-coachscribe").dataset;
  console.log(
    "widgetInfo: ",
    document.querySelector(".coachbots-coachscribe").dataset
  );
  console.log("stt widget ClientID :", sttWidgetClientId);
  console.log("stt widget botID :", botId);

  if (chatContainer2) {
    if (snippetOrigin() === "external") {
      chatContainer2.style.paddingBottom = "0";
    }
  }

  if (botId === undefined && snippetOrigin() === "internal") {
    const pathname = window.location.pathname;
    botId = pathname.split("/")[2];
  }
  console.log(botId, 'botid')
  if (botId || snnipetConfigSTT?.createBotSheetUrl != undefined) {
    const _ = getBotDetails2(botId);
  } else {
    if (Object.keys(snnipetConfigSTT).length > 0) {
      if (snnipetConfigSTT?.isReportButtons === 'true') {
        console.log('showing report buttons');
        const _ = addReportButtons();
      }
    } else {
      const _ = addReportButtons();
    }
    if(window.user){
      updateAudioAllowed(true, true)
    }
  }

  if (botId || snnipetConfigSTT?.createBotSheetUrl != undefined) {
    const list = getDefaultInstractionsStt("bot")
    console.log('botinstruction: ', list)
    instructionsPane.innerHTML = list;
    const footerText = document.getElementById("footer-text");
    footerText.innerHTML = `Available only on Google Chrome 🌐.`
  } else {
    const list = getDefaultInstractionsStt("system", 'simulations')
    instructionsPaneList.innerHTML = list;
  }

  if (!user2) {
    if (window.location.href.includes("engagement-survey")) {
      instructionsPane.innerHTML = `
        <div class="ist-sc" style="font-size: 12px; max-height: 30vh; overflow-y : scroll; padding: 0 8px;"> 
          <b style="font-size: 14px; margin: 4px 0 2px 0;">System specifications</b>
          <ul id="instructions-list">
              <li><strong>1. For Engagement Surveys:</strong> Consider responding to at least five questions for completeness. Always review requestor instructions in the email or on the page for details.</li>
              <li><strong>2. Optimal Response Length:</strong> Optimal responses should range between 10 to 400 words. You have the option to either type or speak your responses.</li>
          </ul>
        </div>
      `;
    }

    if (window.location.href.includes("feedback")) {
      instructionsPane.innerHTML = `
      <div class="ist-sc" style="font-size: 12px; max-height: 30vh; overflow-y : scroll; padding: 0 8px;"> 
         <b style="font-size: 14px; margin: 4px 0 2px 0;">System specifications</b>
         <ul id="instructions-list">
              <li><strong>1. For Feedback Bots:</strong> Consider responding to at least five questions for completeness and hit the submit button for the record. Only positive feedback is displayed publicly, while critical feedback is delivered over email privately.</li>
             <li><strong>2. Optimal Response Length:</strong> Optimal responses should range between 10 to 400 words. You have the option to either type or speak your responses.</li>
         </ul>
       </div>
     `;
    }
  }

  if (window.location.href.includes("knowledge-bot")) {
    instructionsPane.innerHTML = `
      <div class="ist-sc" style="font-size: 12px; max-height: 30vh; overflow-y : scroll; padding: 0 8px;"> 
        <b style="font-size: 14px; margin: 4px 0 2px 0;">System Instructions</b>
        <ul id="instructions-list">
            <li><strong>1. Provide Full Context:</strong> Please provide the full context of your questions for optimum results.</li>
            <li><strong>2. Ask Relevant Questions:</strong> Please ask relevant questions only, related to the topic.</li>
        </ul>
    </div>

    <div class="ist-sc" style="font-size: 12px; max-height: 30vh; overflow-y : scroll; padding: 0 8px; border-left: 2px solid lightgrey;">
        <b style="font-size: 14px; margin: 4px 0 2px 0;">CoachBot Interactions</b>
        <ul id="instructions-list">
            <li><strong>1. Purpose:</strong> This AI Knowledge Agent is designed as a simple knowledge-based bot that responds according to the information supplied.</li>
            <li><strong>2. Advanced Features:</strong> Our advanced coaching bots handle sessions, past history, coaching interaction styles, coach-matching logic, session notes, and recommendations.</li>
            <li><strong>3. Contact Information:</strong> For enablement with your preferred coach or to access advanced features, contact us at info@coachbots.com.</li>
        </ul>
    </div>

    <span id="close-intructions-pane-kbot" onmouseover="this.style.cursor ='pointer'" style="padding : 2px; border-radius: 50%; background-color: white;">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
          </svg>
    </span>
`;
  }

  if (window.innerWidth < 600) {
    chatContainer2.style.borderRadius = "0";
    chatContainer2.style.width = "100vw";
    chatContainer2.style.right = "0";
    chatContainer2.style.top = "0";
    chatContainer2.style.height = "100vh";
    chatContainer2.style.bottom = "0";
    chatElementRef2.style.height = "80vh";
    chatElementRef2.style.fontSize = "12px";
    chatElementRef2.style.width = "100vw";
    // chatIconContainer2.style.position = "fixed";
    // chatIconContainer2.style.width = "3rem";
    // chatIconContainer2.style.height = "3rem";
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
  console.log(botId == undefined, snnipetConfigSTT?.createBotSheetUrl == undefined)
  if (botId == undefined && snnipetConfigSTT?.createBotSheetUrl == undefined) {
    if (Object.keys(snnipetConfigSTT).length > 0) {
        let welcomeMessage;
        if (snnipetConfigSTT["psychometric"] === "true") {
          welcomeMessage = `<p>Hi! Welcome to simulations & assessments powered by the Cognitive Leadership Framework. This system consists of conversational simulation for a) <b>Skill Assessments</b>,b) <b>Role play games</b>  and c) <b>Psychometric Assessments</b> to provide a holistic understanding of your abilities, and leadership potential. You will need an access code, an interaction code, and an email to complete your experience. Let's start!</p>`
        } else{
          welcomeMessage = `<p>Welcome to AI powdered simulation learning. This bot analyses the content on the page and creates a simulation and roleplay which can be attempted by the users to get insightful feedback report.</p>`
        }
        if (snnipetConfigSTT?.["welcomeMessage"]) {
          welcomeMessage = snnipetConfigSTT["welcomeMessage"];
        }
        console.log(welcomeMessage, 'welcome')
        const indivisualPageUserEmail = localStorage.getItem("userEmail");
        if (indivisualPageUserEmail && snnipetConfigSTT['bypassEmail'] == 'true'){
          const userName = indivisualPageUserEmail.split('@')[0];
          createUserSTT(userName, indivisualPageUserEmail);
          chatElementRef2.initialMessages = [
          {
            html: welcomeMessage,
            role: "ai",
          }]
        } else {
        isEmailFormstt = true;
        formFieldsstt = ["email", "name"];
        console.log(
          "### formFieldsstt : ",
          formFieldsstt,
          "other data: ",
          `Please enter your ${formFieldsstt[0]}`
        );
        chatElementRef2.initialMessages = [
          {
            html: welcomeMessage,
            role: "ai",
          },
          {
            html: `<b>Please enter your email. (Used for reporting and ranking. Please use same email for accurate tracking).</b>`,
            role: "ai",
          },
        ];
      }
    } else {
      if (!window.user){

        const welcomeMessage = `<p> Welcome to CoachBot simulations. Please enter your interaction code to proceed. If you don't have them , you can directly use the START button in the library to attempt any simulation. Thank you !</p>`
        isEmailFormstt = true;
        formFieldsstt = ["email", "name"];
        console.log(
          "### formFieldsstt : ",
          formFieldsstt,
          "other data: ",
          `Please enter your ${formFieldsstt[0]}`
        );
        chatElementRef2.initialMessages = [
          {
            html: welcomeMessage,
            role: "ai",
          },
          {
            html: `<b>Please enter your email. (Used for reporting and ranking. Please use same email for accurate tracking).</b>`,
            role: "ai",
          },
        ];
      } else {
chatElementRef2.initialMessages = [
        {
          html: `<p> Welcome to CoachBot simulations. Please enter your interaction code to proceed. If you don't have them , you can directly use the START button in the library to attempt any simulation. Thank you !</p>`,
          role: "ai",
        },
      ];
      }
      
      // chatElementRef2.initialMessages.push({
      //   html: `<div class="deep-chat-temporary-message"><button class="deep-chat-button deep-chat-suggestion-button" style="border: 1px solid green">Yes</button>
      //       <button class="deep-chat-button deep-chat-suggestion-button" style="border: 1px solid #d80000">No</button> </div>`,
      //   role: "user",
      // });
    }
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
  displayBrowserWarning();

  function excludeSpecialCharacters(inputString) {
    return inputString.replace(/[*#]+/g, "");
  }

  function removeResponderTypeNameStt(responderDisplayName, responseText) {
    const responderType = responderDisplayName.trim().toLowerCase();
    const regex = new RegExp(responderType, "i");
    let updatedText = responseText.replace(regex, "").trim();
    return updatedText;
  }

  function capitalizeFirstLetterStt(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // to check word limit (limit set to 0, row 669)
  function isValidMessageStt(text, limit = wordLimit, is_greater = false) {
    const words = text.split(" ");
    console.log(
      "text : ",
      text,
      "words : ",
      words,
      "words length : ",
      words.length,
      "limit : ",
      limit,
      "is_greater : ",
      is_greater
    );
    let uppercaseArray = words.map((element) => element.toUpperCase());
    if (
      uppercaseArray.includes("SKIP") &&
      (isTranscriptOnlyStt || testType2 === "coaching")
    ) {
      return true;
    }
    if (is_greater) {
      if (words.length > limit) {
        return false;
      } else {
        return true;
      }
    } else {
      console.log(
        "words length and cond : ",
        words.length,
        words.length < limit
      );
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

  window.cancelTestStt = cancelTestStt;

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

  window.getSessionStatusStt = getSessionStatusStt;

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

  const getIsRepeatStatus2 = async (participantId, testCode) => {
    const url = `${baseURL2}/accounts/get_is_repeat_status/?participant_id=${participantId}&test_code=${testCode}`;

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

  const updateClientInfoSTT = async (clientName, emails, demo_emails) => {
    try {
      const client_data = {
        client_name: clientName,
        member_emails: emails,
        demo_ids: demo_emails,
      };

      const response = await fetch(
        `${baseURL2}/accounts/get-create-or-update-client-id/`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Basic ${createBasicAuthToken2(key2, secret2)}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(client_data),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Response Data:", data);
        console.log("Successfully updated client details.");
        const clientData = await getClientInformationStt(
          "user_info",
          emails
        );
        clientuserInformationSTT = clientData[0];
      } else {
        const errorData = await response.json();
        console.error("Error Response:", errorData);
        console.error(
          `Failed to update client details. ${errorData.message || ""}`
        );
      }
    } catch (error) {
      console.error("Network or unexpected error:", error);
      console.error(
        "An unexpected error occurred while updating client details."
      );
    }
  };

  const getClientInformationStt = async (
    use_case,
    email = null,
    client_name = null
  ) => {
    let url = `${baseURL2}/accounts/get-client-information/?for=${use_case}`;
    // use case can ====> my_lib or (user_info, user_id)
    if (email && use_case === "user_info") {
      url += `&email=${email}`;
    }
    if (client_name && use_case === "only_client_data") {
      url += `&client_name=${client_name}`;
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

  const validateSnippetAccessCodeStt = async (accessCode, userId, clientId) => {
    const requestData = {
      access_code: accessCode,
      user_id: userId,
      client_name: clientId
    };

    try {
      const response = await fetch(`${baseURL2}/accounts/validate-snippet-access-code/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${createBasicAuthToken2(key2, secret2)}`
        },
        body: JSON.stringify(requestData),
      });
      console.log(response.ok)
      if (response.ok) {
        const data = await response.json();
        console.log('success', data)
        return { isvalidAccessCode: true, error_msg: null }
      } else {
        const data = await response.json();
        console.log('error', data)
        if (data.error.includes('expired')) {
          return { isvalidAccessCode: false, error_msg: 'Your access code has expired. Please contact your admin or our helpdesk.' }
        }
        return { isvalidAccessCode: false, error_msg: null }
      }
    } catch (error) {
      console.error('Error during API call:', error);
    }
    console.log('failed')
    return { isvalidAccessCode: false, error_msg: null }
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
    const randomIdForAudioElement = generateRandomAlphanumeric(5);
    const shadowRoot = document.getElementById("chat-element2").shadowRoot;

    const queDiv = `${text}<br id="break-${randomIdForAudioElement}">`;
    console.log(objectUrl, "url");
    const audioCont =
      queDiv +
      `<div id="audioDiv-${randomIdForAudioElement}" style="border: 1px solid lightgray; border-radius: 4px; width: 100; background-color: white; overflow: hidden; padding: 2px; margin-top:12px;" ><audio id="audio-player-${randomIdForAudioElement}" style="${window.innerWidth < 600
        ? "width: 200px; max-width: 200px !important;"
        : " min-width: 50vw !important;"
      }" autoplay>
      <source src=${objectUrl} type="audio/mpeg" />
      Your browser does not support the audio element.
      </audio>
      <canvas id="canvas-audio-${randomIdForAudioElement}" width="800px" height="40"></canvas>
      </div>`;

    setTimeout(() => {
      const audioElement = shadowRoot.getElementById(
        `audio-player-${randomIdForAudioElement}`
      );
      const canvasElement = shadowRoot.getElementById(
        `canvas-audio-${randomIdForAudioElement}`
      );
      const audioDiv = shadowRoot.getElementById(
        `audioDiv-${randomIdForAudioElement}`
      );
      const breakElement = shadowRoot.getElementById(
        `break-${randomIdForAudioElement}`
      );
      console.log(audioElement, canvasElement);
      audioCanvasUiForQuestions(audioElement, canvasElement);

      audioElement.addEventListener("ended", () => {
        canvasElement.remove();
        audioDiv.remove();
        breakElement.remove();
      });
    }, 100);
    return audioCont;
  };

  const anthropicAiResponse = async (
    userInputMessage,
    signals,
    conversationId,
    latestMessage,
    streamWithAudio,
    nextLLM,
    fallbackLLM
  ) => {
    console.log("anthropic", userInputMessage, nextLLM);
    const messageNode = document.createElement("div");
    messageNode.classList.add("inner-message-container");

    const messageBubble = document.createElement("div");
    messageBubble.classList.add("message-bubble", "ai-message-text");
    messageBubble.style.maxWidth = "100%";
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

    const response = await fetch("/api/anthropic", {
      method: "POST",
      body: JSON.stringify({
        userInput: userInputMessage,
      }),
    });

    if (response.ok) {
      const reader = response.body.getReader();
      const textDecoder = new TextDecoder("utf-8");

      signals.onResponse({
        html: "...",
      });

      let index = 0;
      let chunks = [];
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          allMessages.forEach((indvMessage) => {
            console.log(indvMessage.innerText);

            if (
              indvMessage.innerText === "." ||
              indvMessage.innerText === "..." ||
              indvMessage.innerText === "" ||
              indvMessage.innerText === " " ||
              !indvMessage.innerText?.length > 0
            ) {
              indvMessage.remove();
            }

            if (chunks.length > 0) {
              audioSourceOpen(
                chunks.join(" "),
                messageBubble,
                index,
                randomIdForAudioElement
              );
              console.log(chunks.join(" "));
              chunks = [];
              index++;
            }
          });

          if (botPreviousConversationHistory.includes(messageText.innerText)) {
            messageText.innerText +=
              " \n\n If my responses seem repetitive, please try to rephrase it, ask differently, or simply start a new session.";
            if (streamWithAudio) {
              audioSourceOpen(
                " If my responses seem repetitive, please try to rephrase it, ask differently, or simply start a new session.",
                messageBubble,
                index,
                randomTextForId
              );
            }
          } else if (messageText.innerText === "" && botType !== "user_bot") {
            messageText.innerText +=
              "... Excuse me, I just lost my thought. If you havent got what you wanted, please ask me again.";
            if (streamWithAudio) {
              audioSourceOpen(
                "... Excuse me, I just lost my thought. If you havent got what you wanted, please ask me again.",
                messageBubble,
                index,
                randomIdForAudioElement
              );
            }
          }

          if (
            messageText.innerText.toLowerCase().includes("I am sorry but") ||
            messageText.innerText
              .toLowerCase()
              .includes("not something that I am familiar") ||
            messageText.innerText.toLowerCase().includes("i cannot answer") ||
            messageText.innerText.toLowerCase().includes("not familiar")
          ) {
            messageText.innerText +=
              " \n\n Please explain your question or comment in different words which I may be able to understand better.";
            if (streamWithAudio) {
              audioSourceOpen(
                "Please explain your question or comment in different words which I may be able to understand better.",
                messageBubble,
                index,
                randomTextForId
              );
            }
          }

          botPreviousConversationHistory.push(messageText.innerText);
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

          responseSavedCount += 1;
          if (responseSavedCount >= 2 && endSessionButton) {
            enableEndSessionButton();
          }
          return;
        }
        const decodedText = textDecoder.decode(value);

        if (streamWithAudio) {
          chunks.push(decodedText);
          if (chunks.length > 10) {
            audioSourceOpen(
              chunks.join(" "),
              messageBubble,
              index,
              randomIdForAudioElement
            );
            console.log(chunks.join(" "));
            chunks = [];
            index++;
          }
        }

        messageText.innerText += excludeSpecialCharacters(decodedText);
        shadowRoot.getElementById("messages").scrollBy(0, 500);
      }
    } else {
      // throw new Error(`Failed to run anthropic : ${response}`);
      if (nextLLM?.toLowerCase().includes("gemini")) {
        GeminiAiResponse(
          userInputMessage,
          signals,
          conversationId,
          latestMessage,
          streamWithAudio,
          fallbackLLM
        );
      } else {
        OpenAiResponse(
          userInputMessage,
          signals,
          conversationId,
          latestMessage,
          streamWithAudio,
          fallbackLLM
        );
      }
    }
  };

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
    console.log("prompt", prompt);
    console.log(conversationId, "con");
    console.log(userInputMessage, "msg");
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

    let previousHistory = [];
    if (sessionQnAdata.length > 0) {
      sessionQnAdata.forEach((element) => {
        previousHistory.push({
          user: element.user,
          model: element.coach,
        });
      });
    }

    console.log("Previous History: ", previousHistory);

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
          responseSavedCount += 1;
          if (responseSavedCount >= 2 && botType.includes("deep_dive")) {
            endSessionButton.setAttribute(
              "onmouseover",
              "this.style.backgroundColor = '#bdbdbf'"
            );
            endSessionButton.setAttribute(
              "onmouseleave",
              "this.style.backgroundColor = '#9ca3af'"
            );
            endSessionButton.style.backgroundColor = "#9ca3af";
            endSessionButton.style.color = "black";
            endSessionButton.style.cursor = "pointer";
            endSessionButton.setAttribute("onclick", `handleEndConversation()`);
            endSessionButton.disabled = false;
          }
          return;
        }

        const decodedText = textDecoder.decode(value, { stream: !done });
        console.log(decodedText);
        messageText.innerHTML += excludeSpecialCharacters(decodedText);
        signals.onResponse({
          html: ".",
        });
        shadowRoot.getElementById("messages").scrollBy(0, 500);
      }
    });
  };

  async function audioSourceOpen(
    inputText,
    audioDiv,
    index,
    randomTextForId,
    signals
  ) {
    console.log(
      "@audioSourceOpen : ",
      inputText,
      audioDiv,
      index,
      randomTextForId
    );
    const audioElement = document.createElement("audio");
    audioElement.setAttribute(
      "id",
      `audio-player-stream-${index}-${randomTextForId}`
    );
    audioElement.autoplay = true;
    const canvasElement = document.createElement("canvas");
    canvasElement.setAttribute("id", `canvas-${index}-${randomTextForId}`);
    canvasElement.style.padding = "4px";
    canvasElement.style.borderRadius = "4px";
    canvasElement.style.width = "100%";
    canvasElement.height = 40;

    audioCanvasUI(audioElement, canvasElement);

    audioElement.addEventListener("ended", () => {
      canvasElement.remove();
      audioDiv.remove();

      if (signals) {
        signals.onResponse({
          html: ".",
        });
        setTimeout(() => {
          const shadowRoot =
            document.getElementById("chat-element2").shadowRoot;
          const allMessages = shadowRoot.getElementById("messages").childNodes;

          allMessages.forEach((indvMessage) => {
            if (
              indvMessage.innerText === "." ||
              indvMessage.innerText === "..." ||
              indvMessage.innerText === " " ||
              indvMessage.innerText === ""
            ) {
              indvMessage.remove();
            }
          });
        }, 10);
      }
    });

    const mediaSource = new MediaSource();
    audioElement.src = URL.createObjectURL(mediaSource);

    const audioSourceElement = document.createElement("source");
    audioElement.appendChild(audioSourceElement);

    mediaSource.addEventListener("sourceopen", async () => {
      const sourceBuffer = mediaSource.addSourceBuffer("audio/mpeg");
      try {
        const response = await fetch("/api/openai/speech", {
          method: "POST",
          body: JSON.stringify({
            inputText,
          }),
        });

        if (!response.ok) {
          audioElement.dispatchEvent(new Event("ended"));
          if (signals) {
            signals.onResponse({
              html: ".",
            });
          }
          throw new Error("Speech api error");
        }

        const reader = response.body.getReader();
        console.log("STARTED");

        audioDiv.style.display = "block";
        const shadowRootAUD =
          document.getElementById("chat-element2").shadowRoot;
        shadowRootAUD.getElementById("messages").scrollBy(0, 500);
        audioDiv.appendChild(audioElement);
        audioDiv.appendChild(canvasElement);

        const processBuffer = async ({ done, value }) => {
          if (done) {
            if (mediaSource.readyState === "open") mediaSource.endOfStream();
            return;
          }
          if (!sourceBuffer.updating) {
            sourceBuffer.appendBuffer(value);
          }
          sourceBuffer.addEventListener("updateend", () => {
            if (!sourceBuffer.updating && mediaSource.readyState === "open") {
              reader.read().then(processBuffer);
            }
          });
        };

        if (index === 0) {
          reader.read().then(processBuffer);
        } else {
          const shadowRootAud = document.getElementById("chat-element2").shadowRoot;
          const previousPlayer = shadowRootAud.getElementById(
            `audio-player-stream-${index - 1}-${randomTextForId}`
          );
          if (previousPlayer) {
            previousPlayer.addEventListener("ended", () => {
              console.log("PLAYER HAS ENDED");
              reader.read().then(processBuffer);
            });
          }
        }
      } catch (error) {
        audioElement.dispatchEvent(new Event("ended"));
        signals.onResponse({
          html: ".",
        });
        console.error("Speech API ERROR");
      }
    });
  }

  const enableEndSessionButton = () => {
    if (!endSessionButton) return;
    endSessionButton.setAttribute(
      "onmouseover",
      "this.style.backgroundColor = '#bdbdbf'"
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
  };

  let calledOnceError = 0;

async function callLLM(userInputMessage) {
  for (let i = 0; i < LLMOrder.providers.length; i++) {
    let provider = LLMOrder.providers[i] || 'gemini';
    let models = LLMOrder.models[provider] || [];

    for (let j = 0; j < models.length; j++) {
      let selectedModel = models[j];
      let apiURL = "";
      let bodyData = {};

      try {
        if (provider === 'gemini') {
          apiURL = "https://next-js-gemini-frontend.vercel.app/api/gemini-stream";
          bodyData = {
            prompt: userInputMessage,
            selectedModel,
            systemInstructions: botScenarioCase !== 'icons_by_ai'? LLMsystemInstructions : "respond within 200 tokens",
          };
        } 
        else if (provider === 'gpt') {
          apiURL = "/api/openai";
          bodyData = {
            userInput: userInputMessage,
            selectedModel,
            systemInstructions: LLMsystemInstructions,
          };
        } 
        else if (provider === 'anthropic') {
          apiURL = "/api/anthropic";
          bodyData = {
            userInput: userInputMessage,
            selectedModel,
            systemInstructions: LLMsystemInstructions,
          };
        } 
        else {
          console.error("Unknown model type:", provider);
          continue;
        }

        console.info(`Trying provider: ${provider}, model: ${selectedModel}`);

        const response = await fetch(apiURL, {
          method: "POST",
          body: JSON.stringify(bodyData),
        });

        if (response.ok) {
          return response; // ✅ Success — stop here
        } else {
          console.warn(`Failed with ${provider} ${selectedModel}:`, response.status);
        }

      } catch (err) {
        console.error(`Error with ${provider} ${selectedModel}:`, err);
      }
    }
  }

  // If all fail
  enableEndSessionButton();
  signals.onResponse({
    html: `<p style='font-size: 14px;color: #991b1b;'><b>All providers failed. Please try again.</b></p>`,
  });
}

function cleanTextForAudio(text) {
  if (!text || typeof text !== 'string') return '';
  
  console.log('Original text for audio:', text);
  
  let cleanText = text
    // Remove emojis (comprehensive emoji regex)
    .replace(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '')
    
    // Remove other emoji ranges
    .replace(/[\u{1F900}-\u{1F9FF}]|[\u{1FA00}-\u{1FA6F}]|[\u{1FA70}-\u{1FAFF}]|[\u{2B50}]|[\u{2B55}]|[\u{2934}]|[\u{2935}]/gu, '')
    
    // Remove markdown formatting
    .replace(/\*\*(.*?)\*\*/g, '$1')  // Bold
    .replace(/\*(.*?)\*/g, '$1')      // Italic
    .replace(/__(.*?)__/g, '$1')     // Bold underscore
    .replace(/_(.*?)_/g, '$1')       // Italic underscore
    .replace(/~~(.*?)~~/g, '$1')     // Strikethrough
    .replace(/`(.*?)`/g, '$1')       // Inline code
    .replace(/```[\s\S]*?```/g, '')  // Code blocks
    
    // Remove URLs (since they're not readable in audio) - be more specific
    .replace(/https?:\/\/[^\s\)\]]+/g, '')
    
    // Remove HTML tags
    .replace(/<[^>]*>/g, '')
    
    // Remove special symbols and characters that don't sound good in audio
    .replace(/[🎯📊💼📈💡⚡🔥✨🌟⭐]/g, '')  // Common business emojis
    .replace(/[→←↑↓⇒⇐⇑⇓]/g, '')          // Arrows
    .replace(/[•·▪▫■□▲▼◆◇]/g, '')         // Bullet points and shapes
    .replace(/[©®™℠]/g, '')               // Copyright symbols
    .replace(/[€£¥₹$]/g, ' dollars ')     // Currency symbols (replace with word)
    .replace(/[%]/g, ' percent ')         // Percent symbol
    .replace(/[&]/g, ' and ')             // Ampersand
    .replace(/[@#]/g, '')                 // Social media symbols
    
    // Clean up brackets and parentheses content that might be references
    .replace(/\[URL:.*?\]/gi, '')         // Remove [URL: ...] references
    .replace(/\(URL:.*?\)/gi, '')         // Remove (URL: ...) references
    .replace(/\[.*?:\s*https?:\/\/.*?\]/gi, '') // Remove [text: URL] patterns
    .replace(/\(\s*https?:\/\/[^\)]*\s*\)/gi, '') // Remove URLs in parentheses
    
    // Remove excessive punctuation and clean parentheses
    .replace(/[.,;:!?]{2,}/g, '. ')      // Multiple punctuation
    .replace(/[-_]{2,}/g, ' ')           // Multiple dashes/underscores
    .replace(/\(\s*\)/g, '')             // Empty parentheses
    .replace(/\[\s*\]/g, '')             // Empty brackets  
    .replace(/\{\s*\}/g, '')             // Empty braces
    
    // Remove standalone numbers that might be references or IDs
    .replace(/\b\d{4,}\b/g, '')          // Remove long numbers (likely IDs)
    
    // Clean up common text artifacts
    .replace(/\n+/g, ' ')                // Newlines to spaces
    .replace(/\t+/g, ' ')                // Tabs to spaces
    .replace(/\s+/g, ' ')                // Multiple spaces to single
    
    // Replace common abbreviations with full words for better pronunciation
    .replace(/\bDr\./gi, 'Doctor')
    .replace(/\bMr\./gi, 'Mister')
    .replace(/\bMrs\./gi, 'Missus')
    .replace(/\bMs\./gi, 'Miss')
    .replace(/\bProf\./gi, 'Professor')
    .replace(/\betc\./gi, 'etcetera')
    .replace(/\be\.g\./gi, 'for example')
    .replace(/\bi\.e\./gi, 'that is')
    .replace(/\bvs\./gi, 'versus')
    .replace(/\bCEO\b/gi, 'Chief Executive Officer')
    .replace(/\bCTO\b/gi, 'Chief Technology Officer')
    .replace(/\bCFO\b/gi, 'Chief Financial Officer')
    .replace(/\bHR\b/gi, 'Human Resources')
    .replace(/\bAI\b/gi, 'Artificial Intelligence')
    .replace(/\bAPI\b/gi, 'Application Programming Interface')
    .replace(/\bUI\b/gi, 'User Interface')
    .replace(/\bUX\b/gi, 'User Experience');

  // Final cleanup - remove any remaining problematic characters
  cleanText = cleanText
    .replace(/[^\w\s.,!?;:+()'-]/g, ' ')  // Keep only basic punctuation and alphanumeric
    .replace(/\s+/g, ' ')                // Ensure clean spacing
    .trim();
  
  console.log('Cleaned text for audio:', cleanText);
  
  return cleanText;
}


  const GeminiAiResponse = async (
    userInputMessage,
    signals,
    conversationId,
    latestMessage,
    streamWithAudio,
    selectedModel,
    nextModel
  ) => {
    userInputMessage =
      userInputMessage + `\n input: ${latestMessage}\n output: `;
    const messageNode = document.createElement("div");
    messageNode.classList.add("inner-message-container");

    const messageBubble = document.createElement("div");
    messageBubble.classList.add("message-bubble", "ai-message-text");
    messageBubble.style.maxWidth = "100%";
    messageBubble.style.marginTop = "4px";
    messageBubble.style.borderRadius = "4px";
    messageBubble.style.padding = "4px";
    messageBubble.style.backgroundColor = "#f3f4f6";
    messageBubble.style.color = "#374151";

    const avatarNode = document.createElement("div");
    avatarNode.classList.add("avatar-container", "left-item-position");

    const avatarImage = document.createElement("img");
    avatarImage.setAttribute("src", botAvatarImageURL);
    avatarImage.setAttribute("class", "avatar");

    avatarNode.appendChild(avatarImage);
    const randomIdForAudioElement = generateRandomAlphanumeric(10);

    const messageText = document.createElement("p");

    messageBubble.appendChild(messageText);
    messageNode.appendChild(avatarNode);
    messageNode.appendChild(messageBubble);

    const likeDisLike = document.createElement("div");
    likeDisLike.setAttribute(
      "style",
      "display:flex; flex-direction: row; gap: 8px; border-top: 2px solid lightgray; padding: 10px 0 6px 0; width: 100%; margin-top: 4px;"
    );
    likeDisLike.innerHTML = `
      <span class="like" id="likeIcon-${randomIdForAudioElement}">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="gray" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-thumbs-up"><path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"/></svg>
      </span>
      <span class="dislike" id="dislikeIcon-${randomIdForAudioElement}" >
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="gray" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-thumbs-down"><path d="M17 14V2"/><path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z"/></svg>
      </span>
      `;

    gShadowRoot2 = document.getElementById("chat-element2").shadowRoot;
    gShadowRoot2.getElementById("messages").appendChild(messageNode);

    gShadowRoot2.getElementById("messages").scrollBy(0, 500);

    const shadowRoot = document.getElementById("chat-element2").shadowRoot;
    const allMessages = shadowRoot.getElementById("messages").childNodes;

    let audioDiv;


    console.log("BOT PREVIOUS CONVERSATION : ", botPreviousConversationHistory);

    const response = await callLLM(userInputMessage)

    if (!response) return;

    if (response.ok) {
      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");

      let index = 0;
      let text = "";
      const CHUNK_TIMEOUT = 5000; // 5s wait for data
      const RETRY_DELAY = 2000;   // 2s delay before retry
      let retries = 0;
      const MAX_RETRIES = 2;

      while (true) {
        let chunk;
        try {
          chunk = await Promise.race([
            reader.read(),
            new Promise((_, reject) =>
              setTimeout(() => reject(new Error("Stream timeout")), CHUNK_TIMEOUT)
            ),
          ]);
          console.log("Chunk received:", chunk);

        } catch (err) {
          console.error("Stream read error:", err.message);
          if (retries < MAX_RETRIES) {
            retries++;
            console.log(`Retrying stream read in ${RETRY_DELAY / 1000}s...`);
            await new Promise((res) => setTimeout(res, RETRY_DELAY));
            continue; // try again without breaking
          } else {
            console.error("Max retries reached. Ending stream.");
            break;
          }
        }


        const { done, value } = chunk;
        if (done) {
          allMessages.forEach((indvMessage) => {
            if (
              indvMessage.innerText === "." ||
              indvMessage.innerText === "..." ||
              indvMessage.innerText === " " ||
              indvMessage.innerText === ""
            ) {
              indvMessage.remove();
            }
          });

          if (
            messageText.innerText.toLowerCase().includes("I am sorry but") ||
            messageText.innerText
              .toLowerCase()
              .includes("not something that I am familiar") ||
            messageText.innerText.toLowerCase().includes("i cannot answer") ||
            messageText.innerText.toLowerCase().includes("not familiar")
          ) {
            messageText.innerText +=
              " \n\n Please explain your question or comment in different words which I may be able to understand better.";
            if (streamWithAudio) {
              text += " Please explain your question or comment in different words which I may be able to understand better.";
            }
          }

          if (botPreviousConversationHistory.includes(messageText.innerText)) {
            messageText.innerText +=
              " \n\n If my responses seem repetitive, please try to rephrase it, ask differently, or simply start a new session.";
            if (streamWithAudio) {
              text += "If my responses seem repetitive, please try to rephrase it, ask differently, or simply start a new session."
            }
          } else if (messageText.innerText === "" && botType !== "user_bot") {
            messageText.innerText +=
              "... Excuse me, I just lost my thought. If you havent got what you wanted, please ask me again.";
            if (streamWithAudio) {

              text += "... Excuse me, I just lost my thought. If you havent got what you wanted, please ask me again."
            }
          }
          console.log("STREAMED MESSAGE 1 -> ", messageText.innerText);

          messageText.innerHTML =  parseMarkdown(messageText.innerText);

     
          if (streamWithAudio) {
            const encodedText = encodeURIComponent(cleanTextForAudio(text));

            const url = `${baseURL2}/test-responses/get-text-to-speech/?text=${encodedText}`;
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

            audioDiv = document.createElement("div");
            audioDiv.id = `audioDiv-${randomIdForAudioElement}`;
            audioDiv.style.cssText =
              "border: 1px solid lightgray; border-radius: 4px; width: 100%; background-color: white; overflow: hidden; padding: 2px; margin-top: 12px;";

            const audioPlayer = document.createElement("audio");
            audioPlayer.id = `audio-player-${randomIdForAudioElement}`;
            audioPlayer.autoplay = true;
            audioPlayer.style.cssText =
              window.innerWidth < 600
                ? "width: 200px; max-width: 200px !important;"
                : "min-width: 50vw !important;";

            const audioSource = document.createElement("source");
            audioSource.src = objectUrl;

            const fallbackMessage = document.createTextNode(
              "Your browser does not support the audio element."
            );

            audioPlayer.appendChild(audioSource);
            audioPlayer.appendChild(fallbackMessage);

            const audioCanvas = document.createElement("canvas");
            audioCanvas.id = `canvas-audio-${randomIdForAudioElement}`;
            audioCanvas.width = 800;
            audioCanvas.height = 40;

            audioDiv.appendChild(audioPlayer);
            audioDiv.appendChild(audioCanvas);

            messageBubble.appendChild(audioDiv);

            setTimeout(() => {
              const audioElement = shadowRoot.getElementById(
                `audio-player-${randomIdForAudioElement}`
              );
              const canvasElement = shadowRoot.getElementById(
                `canvas-audio-${randomIdForAudioElement}`
              );
              const audioDiv = shadowRoot.getElementById(
                `audioDiv-${randomIdForAudioElement}`
              );

              console.log(audioElement, canvasElement);
              audioCanvasUiForQuestions(audioElement, canvasElement);

              audioElement.addEventListener("ended", () => {
                canvasElement.remove();
                audioDiv.remove();
                signals.onResponse({
                  html: "",
                });
                setTimeout(() => {
                  allMessages.forEach((indvMessage) => {
                    if (
                      indvMessage.innerText === "." ||
                      indvMessage.innerText === "..." ||
                      indvMessage.innerText === " " ||
                      indvMessage.innerText === ""
                    ) {
                      indvMessage.remove();
                    }
                  });
                }, 20);
              });
            }, 100);
          } else {
            signals.onResponse({
                  html: "",
                });
                setTimeout(() => {
                  allMessages.forEach((indvMessage) => {
                    if (
                      indvMessage.innerText === "." ||
                      indvMessage.innerText === "..." ||
                      indvMessage.innerText === " " ||
                      indvMessage.innerText === ""
                    ) {
                      indvMessage.remove();
                    }
                  });
                }, 20);
          }

          botPreviousConversationHistory.push(messageText.innerText);
          messageBubble.appendChild(likeDisLike);
          setTimeout(() => {
            const likeIcon = gShadowRoot2.getElementById(
              `likeIcon-${randomIdForAudioElement}`
            );
            const dislikeIcon = gShadowRoot2.getElementById(
              `dislikeIcon-${randomIdForAudioElement}`
            );
            console.log(likeIcon, dislikeIcon);

            // Add hover effect
            if (likeIcon && dislikeIcon) {

              likeIcon.addEventListener("mouseover", function () {
                likeIcon.querySelector("svg").style.stroke = "black";
                likeIcon.style.cursor = "pointer";
              });
  
              likeIcon.addEventListener("mouseout", function () {
                likeIcon.querySelector("svg").style.stroke = "gray";
                likeIcon.style.cursor = "normal";
              });
  
              
  
              // Add click functionality
              likeIcon.addEventListener("click", function () {
                if (!likeIcon.classList.contains("active")) {
                  likeIcon.classList.add("active");
                  likeIcon.querySelector("svg").style.fill = "gray";
                  likeIcon.querySelector("svg").style.stroke = "black";
                  dislikeIcon.classList.remove("active");
                  dislikeIcon.querySelector("svg").style.stroke = "gray";
                  dislikeIcon.querySelector("svg").style.fill = "transparent";
                } else {
                  likeIcon.querySelector("svg").style.fill = "transparent";
                  likeIcon.querySelector("svg").style.stroke = "gray";
                  likeIcon.classList.remove("active");
                }
              });

              dislikeIcon.addEventListener("mouseover", function () {
                              dislikeIcon.querySelector("svg").style.stroke = "black";
                              dislikeIcon.style.cursor = "pointer";
                            });
  
              dislikeIcon.addEventListener("mouseout", function () {
                dislikeIcon.querySelector("svg").style.stroke = "gray";
                dislikeIcon.style.cursor = "normal";
              });
              dislikeIcon.addEventListener("click", function () {
              if (!dislikeIcon.classList.contains("active")) {
                dislikeIcon.classList.add("active");
                dislikeIcon.querySelector("svg").style.fill = "gray";
                dislikeIcon.querySelector("svg").style.stroke = "black";
                likeIcon.classList.remove("active");
                likeIcon.querySelector("svg").style.stroke = "gray";
                likeIcon.querySelector("svg").style.fill = "transparent";
              } else {
                dislikeIcon.querySelector("svg").style.fill = "transparent";
                dislikeIcon.querySelector("svg").style.stroke = "gray";
                dislikeIcon.classList.remove("active");
              }
            });
            }
            
          }, 100);

          console.log("Stream complete");
          console.log("STREAMED MESSAGE -> ", messageText.innerText);
          finished = true;

          setTimeout(() => {
            const allAudioElements = shadowRoot.querySelectorAll("audio");

            allAudioElements[allAudioElements.length - 1]?.addEventListener(
              "ended",
              () => {
                console.log("ALL PLAYERS ARE ENDED");
                audioDiv.remove();
              }
            );
          }, 200);

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
          responseSavedCount += 1;
          if (responseSavedCount >= 2 && endSessionButton) {
            enableEndSessionButton();
          }
          return Promise.resolve();
        }
        if (value) {
          const decodedText = decoder.decode(value, { stream: !done });
          console.log('recived decoded text: ',decodedText);

          messageText.innerText += excludeSpecialCharacters(decodedText);
          text += excludeSpecialCharacters(decodedText);

            //remove loading message
            const divsToRemove = Array.from(
              shadowRoot.querySelectorAll(".inner-message-container")
            ).filter((div) => {
              return Array.from(div.children).some((child) =>
                child.classList.contains("loading-message-text")
              );
            });

            divsToRemove.forEach((div) => {
              div.remove();
            });
          
        } else {
          console.warn("Empty stream chunk received");
        }
        shadowRoot.getElementById("messages").scrollBy(0, 500);
        index++;
      }
    } else {
      console.log('failing gemini with model', selectedModel, 'now try with model: ', nextModel)
      if (calledOnceError < 3) {
        calledOnceError += 1;
        GeminiAiResponse(
          userInputMessage,
          signals,
          conversationId,
          latestMessage,
          streamWithAudio,
          nextModel || selectedModel
        );
      } else {
        enableEndSessionButton();
        signals.onResponse({
          html: "<p style='font-size: 14px;color: #991b1b;'><b>Due to abnormal activity, like session has been terminated. (e.g, very fast responses). It can also be due to the internet connection. Please try again</b></p>",
        });
        allMessages.forEach((indvMessage) => {
          if (
            indvMessage.innerText === "." ||
            indvMessage.innerText === "..." ||
            indvMessage.innerText === " " ||
            indvMessage.innerText === "" ||
            indvMessage.innerHTML ==
            `<div class="message-bubble ai-message-text" style="max-width: 100%; margin-top: 4px; border-radius: 4px; background-color: rgb(243, 244, 246); color: rgb(55, 65, 81);"><p></p></div>`
          ) {
            indvMessage.remove();
          }
        });
      }
    }
  };

  const OpenAiResponse = async (
    userInputMessage,
    signals,
    conversationId,
    latestMessage,
    streamWithAudio,
    nextLLM,
    fallbackLLM
  ) => {
    const messageNode = document.createElement("div");
    messageNode.classList.add("inner-message-container");

    const messageBubble = document.createElement("div");
    messageBubble.classList.add("message-bubble", "ai-message-text");
    messageBubble.style.maxWidth = "100%";
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

    const randomIdForAudioElement = generateRandomAlphanumeric(10);

    const response = await fetch("/api/openai", {
      method: "POST",
      body: JSON.stringify({
        userInput: userInputMessage,
      }),
    });

    if (response.ok) {
      const reader = response.body.getReader();
      const textDecoder = new TextDecoder("utf-8");

      signals.onResponse({
        html: "...",
      });

      let index = 0;
      let chunks = [];
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          allMessages.forEach((indvMessage) => {
            console.log(indvMessage.innerText);

            if (
              indvMessage.innerText === "." ||
              indvMessage.innerText === "..." ||
              indvMessage.innerText === "" ||
              indvMessage.innerText === " "
            ) {
              indvMessage.remove();
            }
          });

          if (chunks.length > 0) {
            audioSourceOpen(
              chunks.join(" "),
              messageBubble,
              index,
              randomIdForAudioElement
            );
            console.log(chunks.join(" "));
            chunks = [];
            index++;
          }

          if (
            messageText.innerText.toLowerCase().includes("I am sorry but") ||
            messageText.innerText
              .toLowerCase()
              .includes("not something that I am familiar") ||
            messageText.innerText.toLowerCase().includes("i cannot answer") ||
            messageText.innerText.toLowerCase().includes("not familiar")
          ) {
            messageText.innerText +=
              " \n\n Please explain your question or comment in different words which I may be able to understand better.";
            if (streamWithAudio) {
              audioSourceOpen(
                "Please explain your question or comment in different words which I may be able to understand better.",
                messageBubble,
                index,
                randomTextForId
              );
            }
          }

          if (botPreviousConversationHistory.includes(messageText.innerText)) {
            messageText.innerText +=
              " \n\n If my responses seem repetitive, please try to rephrase it, ask differently, or simply start a new session.";
            if (streamWithAudio) {
              audioSourceOpen(
                " If my responses seem repetitive, please try to rephrase it, ask differently, or simply start a new session.",
                messageBubble,
                index,
                randomTextForId
              );
            }
          } else if (messageText.innerText === "" && botType !== "user_bot") {
            messageText.innerText +=
              "... Excuse me, I just lost my thought. If you havent got what you wanted, please ask me again.";
            if (streamWithAudio) {
              audioSourceOpen(
                "... Excuse me, I just lost my thought. If you havent got what you wanted, please ask me again.",
                messageBubble,
                index,
                randomIdForAudioElement
              );
            }
          }

          botPreviousConversationHistory.push(messageText.innerText);

          responseSavedCount += 1;
          if (responseSavedCount >= 2 && endSessionButton) {
            enableEndSessionButton();
          }

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
        if (chunks.length > 0) {
          audioSourceOpen(
            chunks.join(" "),
            messageBubble,
            index,
            randomIdForAudioElement
          );
          console.log(chunks.join(" "));
          chunks = [];
          index++;
        }

        messageText.innerText += excludeSpecialCharacters(decodedText);
        shadowRoot.getElementById("messages").scrollBy(0, 500);
      }
    } else {
      if (nextLLM?.toLowerCase().includes("gpt")) {
        OpenAiResponse(
          userInputMessage,
          signals,
          conversationId,
          latestMessage,
          streamWithAudio,
          fallbackLLM
        );
      } else {
        GeminiAiResponse(
          userInputMessage,
          signals,
          conversationId,
          latestMessage,
          streamWithAudio,
          fallbackLLM
        );
      }
    }
  };

  //No condition STT pending
  chatElementRef2.request = {
    handler: async (body, signals) => {
      try {
        if (body instanceof FormData) {
        } else {
          //
          // let latestMessages = body.messages[body.messages.length - 1].text;
          // GeminiAiResponse(latestMessages, signals,"",latestMessages, true, "gemeni-1.0-pro")
          // return;
          if (body.messages[body.messages.length - 1].text === "No") {
            LoadingMessageWithText(
              "Please wait, we are generating your scenario!!"
            );
          }
          // TEXT RESPONSES
          //change mic state active to default on send
          var chatElement = document.getElementById("chat-element2");
          //   const coachId = document.querySelector('.coachbots-coachscribe').dataset.botId;
          console.log("Bot ID: ", botId);
          if (botId) {
            LoadingMessageWithText("Coachbot is thinking...");
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
          globalSignalsSTT = signals;
          if (fitmentAnalysisInProgress) {
            console.log("NA-1", fitmentAnalysisInProgress);
            signals.onResponse({
              html: "<p style='font-size: 14px;color: #991b1b;'>Not allowed! choose option to continue. </p>",
            });
            return;
          }

          if (isSomeActivityActive && botType === "deep_dive") {
            signals.onResponse({
              html: "<p style='font-size: 14px;color: #991b1b;'>Not allowed! choose option to continue. </p>",
            });
            return;
          }
          // to check session active or not
          // get latest message
          let latestMessage = body.messages[body.messages.length - 1].text;

          // fetch report for a test code
          if (FetchTestCodeReportStt) {
            const code = latestMessage?.trim();
            if (isTestCode2(code) && code.length == 7) {

              LoadingMessageWithText(
                "Please wait, we are fetching your report!!"
              );
              try {
                const [reportUrl, success] = await getAllReportsTestcode(code);
                if (!success) {
                  signals.onResponse({
                    html: `<b style='font-size: 14px;color: #991b1b;'>${reportUrl}. Retry again!</b>`
                  });
                  FetchTestCodeReportStt = false;
                  return;
                } else {

                  signals.onResponse({
                    html: `
                          <a href="${reportUrl[0].report_url}" target="_blank" rel="noopener noreferrer" style="
                            display: inline-block;
                            padding: 4px 8px;
                            font-size: 14px;
                            font-weight: 600;
                            color: white;
                            background-color: #10b981;
                            border-radius: 6px;
                            text-decoration: none;
                            transition: background-color 0.2s ease;
                          " onmouseover="this.style.backgroundColor='#059669'"
                            onmouseleave="this.style.backgroundColor='#10b981'">
                            View Interaction Report
                          </a>
                      `
                  });
                }

              } catch (error) {
                console.error("Report fetch error:", error);
                signals.onResponse({
                  html: `
                        <b style='font-size: 14px;color: #991b1b;'>
                          Unable to fetch report. Please check your test code or try again later.
                        </b>
                      `
                });

              }
              FetchTestCodeReportStt = false;
            } else {
              signals.onResponse({
                html: `
                    <b style='font-size: 14px;color: #991b1b;'>
                      Invalid test code format. It must be 7 characters long and start with 'Q'.
                    </b>
                  `
              });
            }
            return;
          }


          if (startScenarioRecommendationsStt) {
            var chatElement = document.getElementById("chat-element2");
            const shdwroot = chatElement.shadowRoot;
            const buttons = shdwroot.querySelectorAll("#related-recommendation2 button");
            buttons.forEach(button => {
              button.disabled = true;
              button.style.opacity = "0.5"; // Grey out
              button.style.cursor = "not-allowed";
            });
            if (latestMessage === 'Yes') {
              LoadingMessageWithText("Fetching your AI curated simulation...");
              console.log('userScenarioRecommendation', userScenarioRecommendationStt)
              // const test_case = userScenarioRecommendationStt.results.length > 0 
              //     ? userScenarioRecommendationStt.results[0].test_case === 'soft_skills' 
              //         ? "hard_skills" 
              //         : "soft_skills"
              //     : "hard_skills";  
              const test_case = 'previous_normal_test'
              console.log('test_case', test_case);

              try {
                const data = await generateTestScenarioStt({
                  userId: userId2,
                  sessionId: PreviousSessionInfoSTT['sessionId'],
                  skills: PreviousSessionInfoSTT['skills'],
                  flavour: test_case,
                  isMicro: true
                });
                console.log(data);

                const testCodeMessage = `
                  <div id='create-scenario-section'>
                          <div style="display: flex; flex-direction: column; align-items: start; justify-content: start; border: 1px solid darkgray; border-radius: 6px; padding: 6px; margin: 0; "margin-top : 10px"">
                            <p style="font-size: 14px; color: #333; margin: 0; font-weight : 600; margin-top: 10px;">${data.title}</p>
                            <p style="font-size: 12px; color: #333; margin: 0; font-weight : 300; margin-top: 10px;">${data.description}</p>
                          </div>
                  </div>
                  `;

                signals.onResponse({
                  html: testCodeMessage,
                });
                handleAttemptScenaiosSTT(data.title, data.test_code)

                createTestRecommendationStt(
                  data.test_id,
                  PreviousSessionInfoSTT['sessionId'],
                  test_case
                )

              } catch (error) {
                console.log(error);
              }

              console.log('hi..........');
            } else {
              signals.onResponse(
                {
                  html: "Thank you! If you wish to try another interaction code you can try now."
                }
              )
            }
            startScenarioRecommendationsStt = false;
            return;
          }

          if (askAccessBotCodeSTT) {
            // fetching client information to get access code "AccessCode"
            // console.log(`client:`, clientuserInformationSTT);
            // clientuserInformationSTT = await getClientInformationStt(
            //   "only_client_data",
            //   null,
            //   sttWidgetClientId
            // );
            // await new Promise(resolve => setTimeout(resolve, 10000));

            // console.log(`client-new:`, clientuserInformationSTT, latestMessage);

            // if (!clientuserInformationSTT?.widget_access_code){
            //   signals.onResponse({
            //     html: "<p style='font-size: 14px;color: #991b1b;'>You are not authorized user please contact your Admin.</p>"
            //   })
            //   return;
            // }
            let result = await validateSnippetAccessCodeStt(
              latestMessage,
              userId2,
              sttWidgetClientId
            );

            result = result || { isvalidAccessCode: null, error_msg: null };

            const { isvalidAccessCode, error_msg } = result;
            console.log(
              'isvalidaccesscode', isvalidAccessCode,
              'error_msg', error_msg
            );

            if (!isvalidAccessCode && error_msg) {
              signals.onResponse({
                html: `<b style='font-size: 14px;color: #991b1b;'>${error_msg}</b>`,

              })
              return;
            }
            console.log('isvalidAccessCode', isvalidAccessCode)
            if (
              isvalidAccessCode
            ) {
              AccessCodeStt = latestMessage;
              increaseSessionForFirstTestStt = true;
              console.log("Access Code Matched", snnipetConfigSTT.flowType);
              updateClientInfoSTT(sttWidgetClientId, user_email2, null);
              askAccessBotCodeSTT = false;
              if (snnipetConfigSTT.flowType === "no") {
                handleOptionButtonClick2("", signals);
              } else if (snnipetConfigSTT.flowType === 'both') {
                signals.onResponse({
                  html: `<b>Do you have interaction code for your simulation?</b><br/><br/>
                  <div class="deep-chat-temporary-message">
                  <button class="deep-chat-button deep-chat-suggestion-button" style="border: 1px solid green">Yes</button>
                  <button class="deep-chat-button deep-chat-suggestion-button" style="border: 1px solid #d80000">No</button> </div>
                  `,
                });
              } else {
                signals.onResponse({
                  html: `Great! Please enter the interaction code to get started. A scenario will be presented & few questions will follow based on the same.`,
                });
              }
              return;
            }
            signals.onResponse({
              html: "<p style='font-size: 14px;color: #991b1b;'>Please enter a valid <b>Access Code</b> to proceed.</p>",
            });
            return;
          }

          //slicing 400 words from user responses > 400 words
          if (latestMessage.split(" ").length >= 400) {
            latestMessage = latestMessage.split(" ").slice(0, 400).join(" ");

            console.log("SLICED \n", latestMessage);
          }

          // handling deepdive intial question
          if (botType === "deep_dive" && askInitialQuestionDeepDive) {
            if (!isValidMessageStt(latestMessage, botWordLimit)) {
              signals.onResponse({
                html: `<b style='font-size: 14px;color: #991b1b;'>Your input is too less. Please respond with minimum ${botWordLimit} words.</b>`,
              });
              return;
            }
            botInitialQuestionsQnA[
              botInitialQuestions[`${deepDiveInitialQueIndex}`]
            ] = latestMessage;
            deepDiveInitialQueIndex += 1;
            console.log(
              "botqna-deep_dive: ",
              botInitialQuestionsQnA,
              Object.keys(botInitialQuestions).length,
              deepDiveInitialQueIndex
            );

            if (
              Object.keys(botInitialQuestions).length < deepDiveInitialQueIndex
            ) {
              console.log("ending initial question session");
              askInitialQuestionDeepDive = false;
              // latestMessage = 'START'
            } else {
              signals.onResponse({
                html: botInitialQuestions[`${deepDiveInitialQueIndex}`],
              });
              return;
            }
          }
          console.log("askDeepDiveAccessCode", askDeepDiveAccessCode);
          if (askDeepDiveAccessCode) {
            console.log("askDeepDiveAccessCode", askDeepDiveAccessCode);
            if (latestMessage !== globalBotDetails.data.access_code) {
              signals.onResponse({
                html: "<p style='font-size: 14px;color: #991b1b;'> Please enter a valid access code </p>",
              });
              return;
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
                html: optionData,
              });
              isSomeActivityActive = true;
            }, 100);

            return;
          }

          if (isEmailFormstt) {
            const [proceed, errorMsg] = await proceedFormFlowStt(latestMessage, snnipetConfigSTT?.['isBussinessEmail'] === 'true' || false);
            console.log(proceed, errorMsg);
            if (!proceed) {
              console.log("email not valid 1");
              signals.onResponse({
                html: errorMsg,
              });
              return;
            }
            if (formFieldsstt.length > 0) {
              const msg = formFieldsstt[0] === "email" ?
                `<b>Please enter your email. (Used for reporting and ranking. Please use same email for accurate tracking).</b>`
                : `<b>Please enter your ${formFieldsstt[0]}.</b>`;
              signals.onResponse({
                html: msg,
              });
            } else {
              isEmailFormstt = false;
              if (botId != undefined && botType === "deep_dive") {
                const userEmail = emailNameformJsonstt["email"];
                if (!isEmailSTT(userEmail)) {
                  console.log("email not valid 1");
                  formFieldsstt.push("email");
                  isEmailFormstt = true;
                  signals.onResponse({
                    html: "<p style='font-size: 14px;color: #991b1b;'> please enter a valid email </p>",
                  });
                  return;
                }

                console.log("isAnonymous", isAnonymous);
                if (botType === "deep_dive") {
                  askInitialQuestionDeepDive = true;
                  deepDiveInitialQueIndex = 1;

                  signals.onResponse({
                    // html: "<b>Your session has ended. Please refresh the page to restart again anytime</b>"
                    html: `${botInitialQuestions[`${deepDiveInitialQueIndex}`]
                      }`,
                  });
                  return;
                } else {
                  signals.onResponse({ html: faqHtmlData });
                }
              } else if (botId != undefined) {
                console.log(
                  "before thumbs up ==>",
                  FeedbackUserEmail,
                  emailNameformJsonstt
                );
                FeedbackUserEmail = emailNameformJsonstt["email"];
                feedbackUserName = emailNameformJsonstt["name"];

                if (!isEmailSTT(FeedbackUserEmail)) {
                  console.log("email not valid 2");

                  formFieldsstt.push("email");
                  isEmailFormstt = true;
                  signals.onResponse({
                    html: "<p style='font-size: 14px;color: #991b1b;'> please enter a valid email </p>",
                  });
                  return;
                }
                await createUserSTT(
                  emailNameformJsonstt["name"],
                  emailNameformJsonstt["email"]
                );
                setBeginSessionEnabled(true)
                if(window.user) {
                  if (!["feedback_bot", "deep_dive", "user_bot"].includes(botType)) populateChatHistoryOptions(); 
                  console.log('selectedResponseType ', selectedResponseType)
                  await updateResponseStyle("icf_aligned_coach");

                  populateDropdown("mindmap-menu");
                  populateDropdown("assessment-menu");
                }

                if (botType != 'user_bot')  updateAudioAllowed(true, true)

                if (botType === "feedback_bot") {
                  const thumbsupdiv = await feedbackBotInitialFlow("save_email");
                  signals.onResponse({
                    html: thumbsupdiv,
                  });
                } else {
                  console.log(window.userIdFromWebApp, "window.userIdFromWebApp", userId2)
                  // if (
                  //   !isBotConversationPopulated &&
                  //   !["feedback_bot", "deep_dive", "user_bot"].includes(botType)
                  // ) {
                  //   populateBotConversation(window.userIdFromWebApp);
                  // }
                  signals.onResponse({
                    html: `<b>Great! Now, you can start new session by clicking "Begin session".</b>`
                  })
                }
              } else if (
                Object.keys(snnipetConfigSTT).length > 0
              ) {
                //  creating user after getting name, email "CreateUser"
                console.log(emailNameformJsonstt);
                try {
                  // await new Promise(resolve => setTimeout(resolve, 5000));
                  console.log('before', clientuserInformationSTT)

                  await createUserSTT(
                    emailNameformJsonstt["name"],
                    emailNameformJsonstt["email"]
                  );

                  updateAudioAllowed(true, true)

                  
                  if (!clientuserInformationSTT) {
                    clientuserInformationSTT = await getClientInformationStt(
                      "only_client_data",
                      null,
                      sttWidgetClientId
                    );
                  }
                  console.log('after', clientuserInformationSTT)
                  if (clientuserInformationSTT?.ask_access_code === true) {
                    signals.onResponse({
                      html: "<p>Fantastic. Please enter your access code provided by your admin.</p>",
                    });
                    askAccessBotCodeSTT = true;
                  } else {
                    AccessCodeStt = clientuserInformationSTT.widget_access_code;
                    increaseSessionForFirstTestStt = true;
                    console.log("Access Code Matched", snnipetConfigSTT.flowType);
                    updateClientInfoSTT(sttWidgetClientId, user_email2, null);
                    if (snnipetConfigSTT.flowType === "no") {
                      handleOptionButtonClick2("", signals);
                    } else if (snnipetConfigSTT.flowType === 'both') {
                      signals.onResponse({
                        html: `<b>Do you have interaction code for your simulation?</b><br/><br/>
                        <div class="deep-chat-temporary-message">
                        <button class="deep-chat-button deep-chat-suggestion-button" style="border: 1px solid green">Yes</button>
                        <button class="deep-chat-button deep-chat-suggestion-button" style="border: 1px solid #d80000">No</button> </div>
                        `,
                      });
                    }
                    else {
                      signals.onResponse({
                        html: `Great! Please enter the interaction code to get started. A scenario will be presented & few questions will follow based on the same.`,
                      });
                    }
                  }
                  if (snnipetConfigSTT?.isReportButtons === 'true') enableReportButtons();

                } catch (error) {
                  console.error("Error creating user:", error);
                  signals.onResponse({
                    html: "<p>Oops! Something went wrong. Please try again later.</p>",
                  });
                }
              } else {
                let message = `<b>It's showtime ✨, here is your detailed <a target="_blank" style="color: #3b82f6;text-decoration:none;" href="${globalReportUrl2}">feedback report</a>. The feedback is also emailed to you and will be available to you for 60 days.</b>`;
                if (!emailCandidate2) {
                  message =
                    "<b>Thank you. The feedback report is sent to your manager and you may hear from them directly.</b>";
                }
                appendMessage2(message);

                if (FeedbackVideoLinkStt && FeedbackVideoLinkStt.length > 0) {
                  appendMessage2({
                    "feedback_media": snippetDivSTT(FeedbackVideoLinkStt)
                  })
                }
                // //* send message to start new session
                userScenarioRecommendationStt = await getTestRecommendationsStt(questionData2.results[0].uid, null, null, userId2);
                console.log(senarioCase2, clientuserInformationSTT.show_recommendations)
                if (['psychometric', 'game', 'interview'].includes(senarioCase2)
                  || !clientuserInformationSTT.show_recommendations
                  || userScenarioRecommendationStt.total_recommendation >= 2) {
                  signals.onResponse({
                    html: "<b>Please enter another interaction code to start a new interaction.</b>",
                  });
                } else {
                  signals.onResponse({
                    html: `<b>Our skills discovery engine has suggested a new simulation based on observed gaps. Do you want to explore it now? </b><br/><br/>
                          <div class="deep-chat-temporary-message" id='related-recommendation2'>
                          <button class="deep-chat-button deep-chat-suggestion-button" style="border: 1px solid green">Yes</button>
                          <button class="deep-chat-button deep-chat-suggestion-button" style="border: 1px solid #d80000">No</button> </div>
                    `
                  })
                  startScenarioRecommendationsStt = true
                  PreviousSessionInfoSTT['sessionId'] = sessionId2
                  PreviousSessionInfoSTT['skills'] = questionData2.results[0].skills_to_evaluate
                }
                submitEmailAndName2();
              }
            }
            return;
          }
          if (botType === "feedback_bot" && isFeedbackConvInProcess) {
            if (!isValidMessageStt(latestMessage, botWordLimit)) {
              console.log("0");
              signals.onResponse({
                html: `<p style='font-size: 14px;color: #991b1b;'><b>Your input is too less. Please respond with minimum ${botWordLimit} words.</b></p>`,
              });
              return;
            }
            if (!isValidMessageStt(latestMessage, 400, true)) {
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
            console.log("NA-fb");
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
                console.log(
                  "options",
                  !options.includes(latestMessage, options)
                );

                if (
                  !isValidMessageStt(latestMessage) &&
                  !options.includes(latestMessage)
                ) {
                  signals.onResponse({
                    html: `<p style='font-size: 14px;color: #991b1b;'><b>Your input is too less. Please respond with minimum ${wordLimit} words.</b></p>`,
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
                if (!isValidMessageStt(latestMessage)) {
                  console.log("1");
                  signals.onResponse({
                    html: `<p style='font-size: 14px;color: #991b1b;'><b>Your input is too less. Please respond with minimum ${wordLimit} words.</b></p>`,
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
                LoadingMessageWithText("Initializing session...");
                if (isIntakeInProgress) {
                  isIntakeCompleted = true;
                  isIntakeInProgress = false;
                  isAskingInitialQuestions = false;
                  //********** submit intake to backend: start */
                    const intakeData = {
                        method: "post",
                        qna: JSON.stringify(botInitialQuestionsQnA),
                        bot_id: botId,
                        is_positive: "False",
                        qna_type: "initial_qna",
                        user_id: userId2,
                      };
                    const queryparam = new URLSearchParams(intakeData);
                    const resp = await fetch(
                      `${baseURL2}/accounts/get-user-feedback-data/`,
                      {
                        method: "POST",
                        headers: {
                          Authorization: `Basic ${createBasicAuthToken2(
                            key2,
                            secret2
                          )}`,
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify(intakeData),
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
                    if (
                      ["avatar_bot", "subject_specific_bot"].includes(botType)
                    ) {
                      const begginSessionButton = document.getElementById(
                        "begin-session-button"
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
                      begginSessionButton.disabled = false;
                      begginSessionButton.style.cursor = "pointer";
                      begginSessionButton.style.color = "white";
                      begginSessionButton.style.backgroundColor = "#22c55e";
                    } else {
                      appendMessage2(
                        `<b>Please scroll above to view the conversation and proceed accordingly.</b>`
                      );
                  }

                  // ***** disabling intake button
                  // if (intakeButton && botType === "avatar_bot") {
                  //   intakeButton.disabled = true;
                  //   intakeButton.style.backgroundColor = "#d3d3d3";
                  //   intakeButton.style.color = "#a0a0a0";
                  //   intakeButton.removeAttribute("onmouseover");
                  //   intakeButton.removeAttribute("onmouseleave");
                  // }
                  isIntakeSummaryDisplayed = false;
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
            if (
              !isValidMessageStt(latestMessage, botWordLimit) &&
              botScenarioCase !== "icons_by_ai" &&
              botType !== "user_bot"
            ) {
              console.log("2)", "latestmsg", latestMessage);
              signals.onResponse({
                html: `<p style='font-size: 14px;color: #991b1b;'><b>Your input is too less. Please respond with minimum ${botWordLimit} words.</b></p>`,
              });
              return;
            }
            if (!isValidMessageStt(latestMessage, 300, true)) {
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
                      signature_session_id: selectedChatId
                    }),
                  }
                );
                onlyCurrentSession = selectedChatId? true:false;
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
              const endSessionButton =
                document.getElementById("end-session-btn");
              if (endSessionButton) {
                endSessionButton.style.cursor = "not-allowed";
                endSessionButton.removeAttribute(
                  "onclick",
                  `handleEndConversation()`
                );
                endSessionButton.disabled = true;
                console.log(endSessionButton);
              }

              console.log("LATEST MESSAGE ===> ", latestMessage);
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
                    only_current_session: onlyCurrentSession
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

              console.log(
                "snnipetConfigSTT",
                Object.keys(snnipetConfigSTT).length
              );
              // if (Object.keys(snnipetConfigSTT).length > 1) {
              //   console.log(
              //     "snnipetConfigSTT audio interaction enabled",
              //     snnipetConfigSTT.allowAudioInteraction
              //   );
              //   allowAudioInteraction =
              //     snnipetConfigSTT.allowAudioInteraction === "true";
              // } else {
              //   console.log(
              //     "clientAllowAudioInteraction2",
              //     clientAllowAudioInteraction2
              //   );
              //   console.log(
              //     "userAllowAudioInteraction2",
              //     userAllowAudioInteraction2
              //   );
              //   console.log(
              //     "prioritiseUserAllowInteraction2",
              //     prioritiseUserAllowInteraction2
              //   );

              //   if (clientAllowAudioInteraction2) {
              //     allowAudioInteraction = userAllowAudioInteraction2;
              //   } else {
              //     allowAudioInteraction = false;
              //   }
              // }
              if (botType === "user_bot") {
                  allowAudioInteraction = true;
                }
              console.log("allowAudioInteraction => ", allowAudioInteraction);

              //streaming responses
              if (botType === "deep_dive") {
                console.log("chatGemini#####################");

                ChatGeminiAiResponse(
                  latestMessage,
                  signals,
                  conversation_id2,
                  responseData.coach_message_metadata.prompt
                );
              } else if (botType === "user_bot") {
                GeminiAiResponse(
                  responseData.coach_message_metadata.prompt,
                  signals,
                  conversation_id2,
                  latestMessage,
                  true, // True by Default | allowAudioInteraction,
                  "gemini-2.5-flash",
                  "gemini-2.0-flash"
                );
              } else {
                console.log("#similarity LAST QUESTION:", userQuestionsHistory.at(-1));

                let similarityValue = 0;
                const lastQuestion = userQuestionsHistory.at(-1)?.toLowerCase();

                if (lastQuestion) {
                  const response = await fetch("/api/string-similarity", {
                    method: "POST",
                    body: JSON.stringify({ sentence1: lastQuestion, sentence2: latestMessage.toLowerCase() }),
                  });

                  if (response.ok) {
                    try {

                      const data = await response.json();
                      similarityValue = Number(data.similarity);
                      console.log("#similarity Data:", data);
                    } catch (error) {
                      console.error('failed to use api/string-similarity')
                    }
                  }
                }

                console.log("#similarity SIMILARITY VALUE:", similarityValue);
                console.log("#similarity LLM Queue:", conversationLlmQueue);

                const botSelectedLLM = ["gemini-2.5-flash", "gemini-2.0-flash-lite-001", "gemini-2.0-flash"];
                const messageFrequency = userQuestionsHistory.filter(
                  (msg) => msg?.toLowerCase() === latestMessage.toLowerCase()
                ).length;

                let selectedModel = botSelectedLLM[0];
                let fallbackModel = botSelectedLLM[1];

                if (messageFrequency === 1 || (similarityValue > 90)) {
                  selectedModel = botSelectedLLM[1];
                  fallbackModel = botSelectedLLM[2];
                } else if (messageFrequency === 2) {
                  selectedModel = botSelectedLLM[2];
                  fallbackModel = botSelectedLLM[0];
                }

                GeminiAiResponse(
                responseData.coach_message_metadata.prompt,
                signals,
                conversation_id2,
                latestMessage,
                allowAudioInteraction,
                selectedModel,
                fallbackModel
              );
                conversationLlmQueue.push(selectedModel);
              }


              userQuestionsHistory.push(latestMessage);

              // conversation_id2 = responseData["uid"];
              let coachResponse = responseData["coach_message_text"];
              if (coachResponse.split(":").length > 1) {
                coachResponse = coachResponse
                  .split(":")
                  .slice(1)
                  .join(":")
                  .trim();
              }
              if (!isBotInitialized) {
                if (isBotAudioResponse) {
                  const audioDiv = await TTSContainerSTT(coachResponse);
                  signals.onResponse({ html: audioDiv });
                } else {
                  console.log("from here?");
                  signals.onResponse({
                    html: coachResponse,
                  });
                }
              }
              setTimeout(() => {
                if (
                  ["avatar_bot", "deep_dive", "subject_specific_bot"].includes(
                    botType
                  )
                ) {
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
          if (isTestCode2(latestMessage)) {
            //* check if a session is already running
            console.log("responsesDone2", responsesDone2, questionIndex2);
            if (isSessionActiveStt) {
              signals.onResponse({
                html: "<b>You are already in a session. Please complete the current session or  type 'STOP' to end the session.</b>",
              });
              return;
            }
            await cancelTestStt(participantId2); // cancelling session
            //* reset all variables : start
            resetAllVariablesStt(); // reseting session

            //@disable the input
            const tChatElementRef = document.getElementById("chat-element2")
            const tShadowRoot = tChatElementRef.shadowRoot;

            const chatInputBox = tShadowRoot.getElementById("text-input")
            chatInputBox.classList.remove("text-input-disabled")
            chatInputBox.contentEditable = true
          }
          const userAcessAvailability2 = latestMessage; //body.messages[0].text;
          if (userAcessAvailability2 === "Yes" && !isSessionActiveStt) {
            signals.onResponse({
              html: "<b>Please enter the interaction code to get started.</b>",
            });
            return;
          } else if (userAcessAvailability2 === "No" && !isSessionActiveStt) {
            console.log(window.location.hostname, "domain");
            optedNo2 = true;
            if (
              ![
                "playground.coachbots.com",
                "platform.coachbots.com",
                "localhost",
              ].includes(window.location.hostname)
            ) {
              handleOptionButtonClick2("", signals);
            } else {
              signals.onResponse({
                html: "<b>Please ask your administrator for interaction codes.</b>",
              });
            }
            // signals.onResponse({
            //   html: `<div id="option-button-container" >
            //           <button id="surprise-button" style="margin-top:5px;  width:fit-content; padding:6px 12px; border: 1px solid lightgray; border-radius: 4px;" onmouseover="this.style.cursor ='pointer'" onclick="handleSurpriseMeButtonClick2()">Initiate a surprise Interaction</button>
            //           <button id="create-new-scenario" style="margin-top:5px; width:fit-content; padding:6px 12px; border: 1px solid lightgray; border-radius: 4px;" onmouseover="this.style.cursor ='pointer'"  onclick="handleOptionButtonClick2()">Create Scenario</button>
            //           </div>
            //           `,
            // });
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
            stopModernTimer();
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
              if (msg) msg.parentNode.replaceChild(que_msg, msg);
            }
            // resetAllVariablesStt(); //reseting variables
            // signals.onResponse({
            //   html: "<b>Your session is terminated. You can restart again!</b>",
            // });
            resetAllVariablesStt().then(() => {
              console.log("Your session is terminated. You can restart again!");
              if (Object.keys(snnipetConfigSTT).length > 0) {
                signals.onResponse({
                  html: "<b>Your session is terminated. You can either enter a interaction code or refresh the page for generating the a new simulation.</b>",
                });
              } else {
                signals.onResponse({
                  html: "<b>Your session is terminated. You can restart again!</b>",
                });
              }

              //Enable Copy Paste
              var chatElementRef2 = document.getElementById("chat-element2");
              var shadowRoot = chatElementRef2.shadowRoot;

              const textInputElement = shadowRoot.getElementById("text-input");
              textInputElement.removeAttribute("onpaste");

              //@disable the input
              const tChatElementRef = document.getElementById("chat-element2");
              const tShadowRoot = tChatElementRef.shadowRoot;

              const chatInputBox = tShadowRoot.getElementById("text-input");
              chatInputBox.classList.remove("text-input-disabled");
              chatInputBox.contentEditable = true;
            });
            // setTimeout(() => {
            //   window.location.reload();
            // }, 2000);
            return;
          }
          // to check session is active or not
          if (!isTestCode2(latestMessage)) {
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

            const opiton_scenarios = shadowRoot.querySelectorAll(
              "#create-scenario-section p"
            );
            opiton_scenarios.forEach((b) => {
              const buttonText = b.textContent.trim();
              buttonTextArray.push(buttonText);
            });

            libraryTestoptionsStt.forEach((text) => {
              buttonTextArray.push(text);
            });

            if (buttonTextArray.includes(latestMessage)) {
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
                console.log("3");
                signals.onResponse({
                  html: `<p style='font-size: 14px;color: #991b1b;'><b>Your input is too less. Please respond with minimum ${wordLimit} words.</b></p>`,
                });
                return;
              }
              if (isDuplicateResponseStt(latestMessage)) {
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
                  html: "<b>To Start Your Session Please Enter a Valid Interaction Code..</b>",
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
                //@disable the input
                const tChatElementRef = document.getElementById("chat-element2")
                const tShadowRoot = tChatElementRef.shadowRoot;

                const chatInputBox = tShadowRoot.getElementById("text-input")
                chatInputBox.classList.remove("text-input-disabled")
                chatInputBox.contentEditable = true
                return;
              }
              //************* check if user message is atleast 10 words */
              if (!isValidMessageStt(latestMessage) && !['game'].includes(senarioCase2)) {
                console.log("4");
                signals.onResponse({
                  html: `<p style='font-size: 14px;color: #991b1b;'><b>Your input is too less. Please respond with minimum ${wordLimit} words.</b></p>`,
                });
                return;
              }
              if (isDuplicateResponseStt(latestMessage) && !['game'].includes(senarioCase2)) {
                DuplicateResponseCount2 += 1;
                if (DuplicateResponseCount2 > 1) {
                  resetAllVariablesStt();
                  signals.onResponse({
                    html: "<p style='font-size: 14px;color: #991b1b;'><b> Your session has terminated because of multiple duplicate responses. please try again with unique responses </b></p>",
                  });
                  //@disable the input
                  const tChatElementRef = document.getElementById("chat-element2")
                  const tShadowRoot = tChatElementRef.shadowRoot;

                  const chatInputBox = tShadowRoot.getElementById("text-input")
                  chatInputBox.classList.remove("text-input-disabled")
                  chatInputBox.contentEditable = true
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
            if (
              Object.keys(snnipetConfigSTT).length > 0 &&
              snnipetConfigSTT.flowType === "no" &&
              isTestCode2(latestMessage)
            ) {
              signals.onResponse({
                html: "<p style='font-size: 14px;color: #991b1b;'><b>This feature blocked...</b></p>",
              });
              return;
            }
            if (optedNo2 === false) {
              testCode2 = latestMessage; // body.messages[0].text;
              LoadingMessageWithText("Please wait while we are processing ...");
              // appendMessage2("Please wait while we are processing ...");
            } else {
              LoadingMessageWithText("Please wait while we are processing ...");
              // appendMessage2("Please wait while we are processing ...");
              // //wait while test code is being processed
              // while (!codeAvailabilityUserChoice2) {
              //   await new Promise((resolve) => setTimeout(resolve, 500));
              // }
            }
            codeAvailabilityUserChoice2 = true;
          }
          if (questionIndex2 > 0 && !responsesDone2) {
            userResponse2 = latestMessage; // body.messages[0].text;
          }
          if (
            !responsesDone2 &&
            userName2.length === 0 &&
            userEmail2.length === 0 &&
            codeAvailabilityUserChoice2
          ) {
            console.log("test code: ", testCode2);
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
                    html: "<p style='font-size: 14px;color: #991b1b;'><b>Interaction Code is Invalid. Please enter a valid code.</b></p>",
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
                emailCandidate2 = questionData2.results[0].email_candidate;
                FeedbackVideoLinkStt = questionData2.results[0].feedback_script_video_link;
                InstructinoMediaLinkStt = questionData2.results[0].instruction_media_link;
                console.log('InstructinoMediaLinkStt', InstructinoMediaLinkStt)

                if (
                  clientuserInformationSTT?.report_on &&
                  clientuserInformationSTT?.report_on != null &&
                  senarioCase2 !== "assessment"
                ) {
                  emailCandidate2 = clientuserInformationSTT.report_on;
                }
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
                senarioSnippetURLStt = questionData2.results[0].snippet_url;
                console.log(senarioSnippetURLStt, "senarioSnippetURLStt");
                IsSingleSelectSTT = questionData2.results[0].is_single_select;
                console.log("IsSingleSelectSTT", IsSingleSelectSTT);

                testCountDown = questionData2.results[0].time_limit || 0;
                console.log("testCountDown", questionData2.results[0].time_limit, testCountDown);


                // if (testUIInfoStt) {
                //   if (Object.keys(testUIInfoStt).length > 0) {
                //     signals.onResponse({
                //       html: "<p style='font-size: 14px;color: #991b1b;'>Alert! Please use other bot <b>CoachTalk</b> for this interaction.</p>",
                //     });
                //     return;
                //   }
                // }
                if (testUIInfoStt) {
                  if (Object.keys(testUIInfoStt).length > 0) {
                    console.log("ui", testUIInfoStt)
                    senarioTitle2 = testUIInfoStt["title"];
                    senarioDescription2 = testUIInfoStt["description"];
                    isHindiStt = true;
                  }
                }

                wordLimit = senarioCase2 === "psychometric" ? 20 : 15;
                console.log(wordLimit, "wordLimit");

                if (interactionMode2 == "audio") {
                  signals.onResponse({
                    html: "<p style='font-size: 14px;color: #991b1b;'>Please use <b>CoachTalk</b> widget for this type of scenario - as it supports audio analysis.</p>",
                  });
                  return;
                }

                if (Object.keys(snnipetConfigSTT).length > 0) {
                  isImmersiveStt =
                    snnipetConfigSTT.allowAudioInteraction === "true";
                  if (
                    clientuserInformationSTT &&
                    "client_name" in clientuserInformationSTT
                  ) {
                    sttWidgetClientId = clientuserInformationSTT.client_name;
                  }
                  if (snnipetConfigSTT.assessment && snnipetConfigSTT.assessment === 'true') {
                    emailCandidate2 = false;
                  }
                }
                updateAudioAllowed(true,true)
                console.log("isImmersive", isImmersiveStt);
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
                  console.log("sttWidgetClientId : ", sttWidgetClientId);
                  if (sttWidgetClientId != null) {
                    group_list.push(sttWidgetClientId);
                  } else {
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
                      html: "<b>You are not allowed to attempt this interaction. Please check if you are logged in with the correct account and if your interaction code is correct. Contact the administrator if you face problems, via the help widget.</b>",
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
                      html: "<b>You are not allowed to attempt this interaction. Please check if you are logged in with the correct account and if your interaction code is correct. Contact the administrator if you face problems, via the help widget.</b>",
                    });
                    return;
                  }
                  const group_list = ["Demo", "free", "Free"];
                  console.log("sttWidgetClientId", sttWidgetClientId);
                  if (sttWidgetClientId != null) {
                    group_list.push(sttWidgetClientId);
                  }
                  if (!group_list.includes(clientNameStt)) {
                    signals.onResponse({
                      html: "<b>You are not allowed to attempt this interaction. Please check if you are logged in with the correct account and if your interaction code is correct. Contact the administrator if you face problems, via the help widget.</b>",
                    });
                    return;
                  }
                }
                // restriction check like monthly test allowed start
                // await getAttemptedTestList2(participantId2);
                await getIsRepeatStatus2(participantId2, testCode2);
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
                    html: "<b>You are not allowed to attempt this interaction. Please check if you are logged in with the correct account and if your interaction code is correct. Contact the administrator if you face problems, via the help widget.</b>",
                  });
                  return;
                }
                // User cannot attempt the test more than once if it is active
                console.log(userRole2, isRepeatStatus2);
                if (userRole2 && !["admin", 'super_admin'].includes(userRole2)) {
                  if (!isRepeatStatus2.is_repeat) {
                    await getAttemptedTestList2(participantId2);
                    if (testCodeList2.includes(testCode2)) {
                      signals.onResponse({
                        html: "<b>You are not allowed to attempt this interaction again. Please check if you are logged in with the correct account and if your interaction code is correct. Contact the administrator if you face problems, via the help widget.</b>",
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

                  if (senarioCase2 === 'game') {
                    questionLength2 = 1;
                    questionIndex2 = 0;
                    // getting question for the game scenario:
                    questionText2 = `${data.next_question_text}`


                  }

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
                // handling first question for test
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
                        if (senarioCase2 != 'game') {
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
                    }
                  } else {
                    if (testType2 === "mcq" || testType2 === "dynamic_mcq") {
                      questionText2 =
                        questionData2.results[0].questions[questionIndex2]
                          .question;
                      questionMediaLinkStt =
                        questionData2.results[0].questions[questionIndex2]
                          .media_link;
                      questionSnippetLinkStt =
                        questionData2.results[0].questions[questionIndex2]
                          .snippet_url;
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
                            questionText2 = `▪ <b>Optional Enrichment Media</b><br>  <iframe
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
                              } else if (isAudioURL(element)) {
                                console.log(element);
                                questionText2 =
                                  questionText2 +
                                  "\n" +
                                  `<div ><audio style="${window.innerWidth < 600
                                    ? "width: 200px; max-width: 200px !important;"
                                    : " min-width: 50vw !important;"
                                  }" controls autoplay>
                                <source src=${element} type="audio/mpeg" />
                                Your browser does not support the audio element.
                                </audio></div>`;
                              } else {
                                questionText2 =
                                  questionText2 +
                                  "\n" +
                                  `<a href="${element}" target="_blank"
                              style="display:inline-block; background:white; color:#333; padding:4px 10px; border:1px solid #ddd; border-radius:6px; text-decoration:none; font-family:sans-serif; font-size:12px; box-shadow:0 1px 2px rgba(0,0,0,0.06); transition:all 0.2s ease;"
                              onmouseover="this.style.background='#f1f1f1'; this.style.borderColor='#bbb'; this.style.boxShadow='0 2px 4px rgba(0,0,0,0.1)'"
                              onmouseout="this.style.background='white'; this.style.borderColor='green'; this.style.boxShadow='0 1px 2px rgba(0,0,0,0.06)'">
                              View Context
                            </a>`;
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
                                questionText2 = `<div ><audio style="${window.innerWidth < 600
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
                            } else if (isAudioURL(questionMediaLinkStt)) {
                              console.log(questionMediaLinkStt);
                              questionText2 =
                                questionText2 +
                                "\n" +
                                `<div ><audio style="${window.innerWidth < 600
                                  ? "width: 200px; max-width: 200px !important;"
                                  : " min-width: 50vw !important;"
                                }" controls autoplay>
                                <source src=${questionMediaLinkStt} type="audio/mpeg" />
                                Your browser does not support the audio element.
                                </audio></div>`;
                            } else {
                              questionText2 =
                                questionText2 +
                                "\n" +
                                `<a href="${questionMediaLinkStt}" target="_blank"
                              style="display:inline-block; background:white; color:#333; padding:4px 10px; border:1px solid #ddd; border-radius:6px; text-decoration:none; font-family:sans-serif; font-size:12px; box-shadow:0 1px 2px rgba(0,0,0,0.06); transition:all 0.2s ease;"
                              onmouseover="this.style.background='#f1f1f1'; this.style.borderColor='#bbb'; this.style.boxShadow='0 2px 4px rgba(0,0,0,0.1)'"
                              onmouseout="this.style.background='white'; this.style.borderColor='green'; this.style.boxShadow='0 1px 2px rgba(0,0,0,0.06)'">
                              View Context
                            </a>`;
                            }
                          }
                        }
                      }
                      if (questionSnippetLinkStt) {
                        if (questionSnippetLinkStt.length > 0) {
                          const linkList = questionSnippetLinkStt.split(",");
                          linkList.forEach((element) => {
                            appendMessage2(snippetDivSTT(element));
                          });
                        }
                      }
                      if (isImmersiveStt && !questionMediaLinkStt) {
                        if (isHindiStt) {
                          questionText2 =
                            testUIInfoStt[`Question ${questionIndex2 + 1}`];
                        }
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
                        questionText2 = `<div ><audio style="${window.innerWidth < 600
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
                        if (isHindiStt) {
                          questionText2 =
                            testUIInfoStt[`Question ${questionIndex2 + 1}`];
                        }
                        questionText2 =
                          questionData2.results[0].questions[questionIndex2]
                            .question;
                        questionMediaLinkStt =
                          questionData2.results[0].questions[questionIndex2]
                            .media_link;
                        questionSnippetLinkStt =
                          questionData2.results[0].questions[questionIndex2]
                            .snippet_url;
                      }
                    }
                  }
                  console.log(questionText2);
                  if (questionIndex2 === 0) {
                    if (isHindiStt) {
                      questionText2 =
                        testUIInfoStt[`Question ${questionIndex2 + 1}`];
                    }
                    initialQuestionTextStt = questionText2;
                    initialIndexStt = questionIndex2 + 1;
                    isProceedStt = "false";
                    questionText2 = `
                    <div id="proceed-option2" >
                    <b>Proceed?</b>
                        <button style="margin-top:5px;  width:fit-content; padding:6px 12px; border: 1px solid lightgray; border-radius: 4px;"  onmouseover="this.style.cursor ='pointer'" onclick="handleProceedClickStt('Yes')">Yes</button>
                        <button style="margin-top:5px;  width:fit-content; padding:6px 12px; border: 1px solid lightgray; border-radius: 4px;" onmouseover="this.style.cursor ='pointer'"  onclick="handleProceedClickStt('No')">No</button>
                    </div>`;
                    if (AttemptTestDirectSTT) {
                      signals.onResponse({
                        html: "Get ready! Your scenario is starting now. Best of luck!",
                      });
                      setTimeout(() => {
                        handleProceedClickStt("Yes");
                      }, 1000);
                    }
                    console.log(senarioMediaDescription2, "mediadesc");
                    if ((senarioMediaDescription2 || InstructinoMediaLinkStt) && !AttemptTestDirectSTT) {
                      let embeddingUrl2 = "";
                      if (!senarioMediaDescription2 && InstructinoMediaLinkStt){
                        appendMessage2(
                          {
                              title: senarioTitle2,
                              description: senarioDescription2,
                              instructions: "Response should be at least 15 words.",
                              instruction_media: InstructinoMediaLinkStt
                          }
                        )
                      } else {
                        if (senarioMediaDescription2.length > 0) {
                        console.log(senarioMediaDescription2);
                        if (senarioMediaDescription2.includes("youtube.com")) {
                          const videoId =
                            senarioMediaDescription2.split("v=")[1];
                          embeddingUrl2 = `https://www.youtube.com/embed/${videoId}`;
                          console.log('desc section 1')
                          appendMessage2(
                            {
                              title: senarioTitle2,
                              description: senarioDescription2,
                              instructions: "Response should be at least 15 words.",
                              instruction_media: InstructinoMediaLinkStt,
                              oem: `<iframe
                                          style="width: 100%; border-radius: 8px; min-height: 50vh; margin-top: 8px;"
                                          src=${embeddingUrl2}
                                          frameborder="0"
                                          allowfullscreen
                                        >`
                            }
                          );
                        } else if (
                          senarioMediaDescription2.includes("vimeo.com")
                        ) {
                          const videoId = senarioMediaDescription2
                            .split("/")
                            .pop();
                          embeddingUrl2 = `https://player.vimeo.com/video/${videoId}`;
                          console.log('desc section 2')

                          appendMessage2(
                            {
                              title: senarioTitle2,
                              description: senarioDescription2,
                              instructions: "Response should be at least 15 words.",
                              instruction_media: InstructinoMediaLinkStt,
                              oem: `<iframe
                                        style="width: 100%; border-radius: 8px; min-height: 50vh; margin-top: 8px;"
                                        src=${embeddingUrl2}
                                        frameborder="0"
                                        allowfullscreen
                                      >`
                            }
                          );
                        } else if (
                          senarioMediaDescription2.includes("twitter.com")
                        ) {
                          // console.log(tweetId);
                          embeddingUrl2 = `https://twitframe.com/show?url=${senarioMediaDescription2}`;
                          console.log('desc section 3')

                          appendMessage2(
                            {
                              title: senarioTitle2,
                              description: senarioDescription2,
                              instructions: "Response should be at least 15 words.",
                              instruction_media: InstructinoMediaLinkStt,
                              oem: `<iframe
                                            allow="autoplay; encrypted-media; fullscreen;"
                                            style="width: 100%; border-radius: 8px; min-height: 50vh; margin-top: 8px;"
                                            src=${embeddingUrl2}
                                            frameborder="0"
                                            allowfullscreen
                                           >`
                            }
                          );
                        } else if (senarioMediaDescription2.includes("player.cloudinary.com") || senarioMediaDescription2.includes('storage.googleapis.com')) {

                          appendMessage2({
                            title: senarioTitle2,
                            description: senarioDescription2,
                            instructions: "Response should be at least 15 words.",
                            instruction_media: InstructinoMediaLinkStt,
                            oem: `
                                <div style="position: relative; width: 100%; min-height: 50vh; margin-top: 8px; border-radius: 8px; overflow: hidden;">
                                  <div id="poster-overlay" style="
                                    position: absolute;
                                    top: 0; left: 0;
                                    width: 100%; height: 100%;
                                    background: url('https://res.cloudinary.com/dtbl4jg02/image/upload/v1747293563/bupvdcx55wkqtrbwrwjc.jpg') center center / cover no-repeat;
                                    z-index: 2;
                                    transition: opacity 0.5s ease;
                                    border-radius: 8px;
                                  "></div>

                                  <iframe
                                    onload="this.previousElementSibling.style.opacity = '0'; setTimeout(() => this.previousElementSibling.remove(), 500);"
                                    allow="autoplay; encrypted-media; fullscreen;"
                                    style="width: 100%; height: auto; border-radius: 8px; min-height: 50vh; margin-top: 8px; z-index: 1; position: relative;"
                                    src="${senarioMediaDescription2}"
                                    frameborder="0"
                                    allowfullscreen
                                  ></iframe>
                                </div>
                                `
                          });
                        }
                        else {
                          const urlList = senarioMediaDescription2.split(",");
                          console.log("list", urlList);
                          if (urlList.length > 1) {
                            console.log('desc section 4')

                            appendMessage2(
                              {
                                title: senarioTitle2,
                                description: senarioDescription2,
                                instructions: "Response should be at least 15 words.",
                                instruction_media: InstructinoMediaLinkStt,
                              }
                            );
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
                                  `<div ><audio style="${window.innerWidth < 600
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
                              console.log('desc section 5')

                              appendMessage2(
                                {
                                  title: senarioTitle2,
                                  description: senarioDescription2,
                                  instructions: "Response should be at least 15 words.",
                                  instruction_media: InstructinoMediaLinkStt,
                                }
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

                              console.log('desc section 6')

                              appendMessage2(
                                {
                                  title: senarioTitle2,
                                  description: senarioDescription2,
                                  instructions: "Response should be at least 15 words.",
                                  instruction_media: InstructinoMediaLinkStt,
                                }
                              );
                              appendMessage2(`
                              <div style="width:640px">
                              <div style="position:relative;height:0;width:100%;overflow:hidden;box-sizing:border-box;padding-bottom:calc(100% - 0px)">
                              <iframe src="https://www.guidejar.com/embed/${guidejarId}?type=1&controls=off" width="100%" height="100%" style="position:absolute;inset:0" allowfullscreen frameborder="0"></iframe
                              ></div></div>
                              `);
                            } else {
                              console.log('desc section 7')

                              appendMessage2(
                                {
                                  title: senarioTitle2,
                                  description: senarioDescription2,
                                  instructions: "Response should be at least 15 words.",
                                  instruction_media: InstructinoMediaLinkStt,
                                  oem: `<a href="${senarioMediaDescription2}" target="_blank"
                                          style="display:inline-block; background:white; color:#333; padding:4px 10px; border:1px solid #ddd; border-radius:6px; border-color:green; text-decoration:none; font-family:sans-serif; font-size:12px; box-shadow:0 1px 2px rgba(0,0,0,0.06); transition:all 0.2s ease;"
                                          onmouseover="this.style.background='#f1f1f1'; this.style.borderColor='#bbb'; this.style.boxShadow='0 2px 4px rgba(0,0,0,0.1)'"
                                          onmouseout="this.style.background='white'; this.style.borderColor='green'; this.style.boxShadow='0 1px 2px rgba(0,0,0,0.06)'">
                                          Reference
                                        </a>
                                        `
                                }
                              );
                            }
                          }
                        }
                        if (senarioSnippetURLStt) {
                          if (senarioSnippetURLStt.length > 0) {
                            const linkList = senarioSnippetURLStt.split(",");
                            linkList.forEach((element) => {
                              appendMessage2(snippetDivSTT(element));
                            });
                          }
                        }
                        // if (!senarioMediaDescription2.includes("twitter.com")) {
                        //   appendMessage2(
                        //     {
                        //       title: senarioTitle2,
                        //       description: senarioDescription2,
                        //       instructions: "Response should be at least 15 words.",
                        //       instruction_media: InstructinoMediaLinkStt,

                        //       oem: `<iframe
                        //                   style="width: 100%; border-radius: 8px; min-height: 50vh; margin-top: 8px;"
                        //                   src=${embeddingUrl2}
                        //                   frameborder="0"
                        //                   allowfullscreen
                        //                  >`}
                        //   );
                        // }
                      } else {
                        console.log('desc section 8')
                        appendMessage2(
                          {
                            title: senarioTitle2,
                            description: senarioDescription2,
                            instructions: "Response should be at least 15 words.",
                            instruction_media: InstructinoMediaLinkStt,
                          }
                        );
                        if (senarioSnippetURLStt) {
                          if (senarioSnippetURLStt.length > 0) {
                            const linkList = senarioSnippetURLStt.split(",");
                            linkList.forEach((element) => {
                              appendMessage2(snippetDivSTT(element));
                            });
                          }
                        }
                      }

                      }
                      
                      // proceed buttion will show
                      console.log("2quetext");
                      signals.onResponse({
                        html: questionText2,
                      });
                    } else if (
                      mediaPropsStt &&
                      Object.keys(mediaPropsStt).includes("test_image") &&
                      !AttemptTestDirectSTT
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
                      console.log('desc section 9')

                      appendMessage2(
                        `▪ Title : ${senarioTitle2} <br><br>
                             ▪ Description : ${senarioDescription2} <br><br>
                             ▪ Instructions : Response should be at least 15 words. <br><br>
                             ▪ <img src=${imageUrlStt} ${window.innerWidth < 768
                          ? "width='200'"
                          : "width='400'"
                        } usemap="#${imageMapNameStt}" id=${imageIdStt} style="border-radius: 8px; margin-top: 4px;" /> <br><br>
                             ▪ ${ttsNarration}`
                      );
                      console.log("3quetext");

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
                      console.log("4quetext", questionText2);

                      if (!AttemptTestDirectSTT) {
                        const temp_que_text = questionText2;
                        const messages = [
                          {
                            title: "Title",
                            description: senarioTitle2
                          },
                          {
                            title: "Description",
                            description: senarioDescription2
                          }
                        ]
                        if (!['game'].includes(senarioCase2)) {
                          let instruction = `Response should be at least ${wordLimit} words.`
                          if (InstructinoMediaLinkStt){
                            instruction += ` <a href="${InstructinoMediaLinkStt}" target="_blank"
                              style="display:inline-block; margin-left:8px; background:white; color:#333; padding:2px 6px; border:1px solid green; border-radius:4px; text-decoration:none; font-family:sans-serif; font-size:11px; box-shadow:0 1px 2px rgba(0,0,0,0.06); transition:all 0.2s ease;"
                              onmouseover="this.style.background='#f1f1f1'; this.style.borderColor='#bbb'; this.style.boxShadow='0 2px 4px rgba(0,0,0,0.1)';"
                              onmouseout="this.style.background='white'; this.style.borderColor='green'; this.style.boxShadow='0 1px 2px rgba(0,0,0,0.06)';">
                              Reference
                            </a>`
                          }

                          messages.push({
                            title: "Instructions",
                            description: instruction
                          })
                        }
                        console.log('desc section 11')

                        signals
                          .onResponse({
                            html: formatMessage2(messages),
                          })
                          .then(() => {
                            if (senarioSnippetURLStt) {
                              if (senarioSnippetURLStt.length > 0) {
                                const linkList =
                                  senarioSnippetURLStt.split(",");
                                linkList.forEach((element) => {
                                  appendMessage2(snippetDivSTT(element));
                                });
                              }
                            }
                            appendMessage2(temp_que_text);
                          });
                      }
                    }
                  } else {
                    if (
                      testType2 != "orchestrated_conversation" &&
                      testType2 != "dynamic_discussion_thread" &&
                      testType2 != "coaching"
                    ) {
                      if (isHindiStt) {
                        questionText2 = testUIInfoStt[`Question ${questionIndex2 + 1}`];
                      }
                      let responderName;
                      let strList = questionText2
                        .replaceAll("*", "")
                        .split(":", 2);

                      if (strList.length > 1) {
                        questionText2 = strList[1];
                        responderName = `<b>${capitalizeFirstLetterStt(
                          strList[0]
                        )}:</b><br>`;
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
                            questionText2 = `▪ <b>Optional Enrichment Media</b><br>  <iframe
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
                              } else if (isAudioURL(element)) {
                                console.log(element);
                                appendMessage2(`<div ><audio style="${window.innerWidth < 600
                                  ? "width: 200px; max-width: 200px !important;"
                                  : " min-width: 50vw !important;"
                                  }" controls autoplay>
                                <source src=${element} type="audio/mpeg" />
                                Your browser does not support the audio element.
                                </audio></div>`);
                              } else {
                                appendMessage2(`<a href="${element}" target="_blank"
                                                style="display:inline-block; background:white; color:#333; padding:4px 10px; border:1px solid #ddd; border-radius:6px; text-decoration:none; font-family:sans-serif; font-size:12px; box-shadow:0 1px 2px rgba(0,0,0,0.06); transition:all 0.2s ease;"
                                                onmouseover="this.style.background='#f1f1f1'; this.style.borderColor='#bbb'; this.style.boxShadow='0 2px 4px rgba(0,0,0,0.1)'"
                                                onmouseout="this.style.background='white'; this.style.borderColor='green'; this.style.boxShadow='0 1px 2px rgba(0,0,0,0.06)'">
                                                View Context
                                              </a>`)
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
                            } else if (isAudioURL(questionMediaLinkStt)) {
                              console.log(questionMediaLinkStt);
                              appendMessage2(`<div ><audio style="${window.innerWidth < 600
                                ? "width: 200px; max-width: 200px !important;"
                                : " min-width: 50vw !important;"
                                }" controls autoplay>
                                <source src=${questionMediaLinkStt} type="audio/mpeg" />
                                Your browser does not support the audio element.
                                </audio></div>`);
                            } else {
                              appendMessage2(`<a href="${questionMediaLinkStt}" target="_blank"
                                                  style="display:inline-block; background:white; color:#333; padding:4px 10px; border:1px solid #ddd; border-radius:6px; text-decoration:none; font-family:sans-serif; font-size:12px; box-shadow:0 1px 2px rgba(0,0,0,0.06); transition:all 0.2s ease;"
                                                  onmouseover="this.style.background='#f1f1f1'; this.style.borderColor='#bbb'; this.style.boxShadow='0 2px 4px rgba(0,0,0,0.1)'"
                                                  onmouseout="this.style.background='white'; this.style.borderColor='green'; this.style.boxShadow='0 1px 2px rgba(0,0,0,0.06)'">
                                                  View Context
                                                </a>`)
                            }
                          }
                        }
                      }
                      if (questionSnippetLinkStt) {
                        if (questionSnippetLinkStt.length > 0) {
                          const linkList = questionSnippetLinkStt.split(",");
                          linkList.forEach((element) => {
                            appendMessage2(snippetDivSTT(element));
                          });
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
                          const questionpropName = `que_image ${questionIndex2 + 1
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
                                           <br> <img src=${imageUrlStt} ${window.innerWidth < 768
                              ? "width='200'"
                              : "width='400'"
                            } usemap="#${imageMapNameStt}" id=${imageIdStt} style="border-radius: 8px; margin-top: 4px;" /> <br><br>
                                            ▪ Question : <br> ${questionText2}
                                          `;

                          console.log("5quetext");

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
                          console.log("6quetext");

                          signals.onResponse({
                            html: questionText2,
                          });
                        }
                      }
                    }
                  }
                }

                // above we have creeate session and send proceed button
                //now we will proceed for game type or similiar to game type

                if (senarioCase2 === 'game') {
                  if (questionIndex2 !== 0) {
                    try {
                      // Fetch the next game question
                      const response = await handleGameTypeConversation();

                      // Handle API errors
                      if (response.error) {
                        resetAllVariablesStt();
                        signals.onResponse({
                          html: "<p style='font-size: 14px;color: #991b1b;'><b>Due to abnormal activity, like session has been terminated. (e.g, very fast responses). It can also be due to the internet connection. Please try again</b></p>",
                        });
                        //@disable the input
                        const tChatElementRef = document.getElementById("chat-element2")
                        const tShadowRoot = tChatElementRef.shadowRoot;

                        const chatInputBox = tShadowRoot.getElementById("text-input")
                        chatInputBox.classList.remove("text-input-disabled")
                        chatInputBox.contentEditable = true
                        return;
                      }


                      // Extract the next question text
                      let next_question_text = response.next_question_text;
                      console.log("Game question text:", next_question_text);

                      if (response.is_last_question) {
                        appendMessage2(`<b>That's it! Thank you for participating!</b>`)
                        stopModernTimer();

                        //@disable the input
                        const tChatElementRef = document.getElementById("chat-element2")
                        const tShadowRoot = tChatElementRef.shadowRoot;

                        const chatInputBox = tShadowRoot.getElementById("text-input")
                        chatInputBox.classList.remove("text-input-disabled")
                        chatInputBox.contentEditable = true

                        resetAllVariablesStt()
                      }

                      // If immersive mode is enabled, process with TTS (Text-to-Speech)
                      // if (isImmersiveStt) {
                      //   next_question_text = await TTSContainerStt(next_question_text);
                      // }

                      // Send the formatted question text for display
                      if (response.is_last_question) {

                        signals.onResponse({
                          html: next_question_text
                        }).then(() => {
                          appendMessage2(`<b>Please enter another interaction code to start a new interaction.</b>`)
                        })
                      } else {
                        // Preserve spaces for better formatting
                        const randomIdForAudioElement = generateRandomAlphanumeric(10);
                        if (IsSingleSelectSTT !== null) {
                          if (IsSingleSelectSTT) {
                            // signals.onResponse({
                            //   html: `
                            //       <div>
                            //           <div>
                            //           ${parseMarkdown(next_question_text)} 
                            //           </div>
                            //         <div class="deep-chat-temporary-message">
                            //           <button class="deep-chat-button deep-chat-suggestion-button" style="border: 1px solid green">A</button>
                            //           <button class="deep-chat-button deep-chat-suggestion-button" style="border: 1px solid #d80000">B</button>
                            //           <button class="deep-chat-button deep-chat-suggestion-button" style="border: 1px solid green">C</button>
                            //           <button class="deep-chat-button deep-chat-suggestion-button" style="border: 1px solid #d80000">D</button>
                            //           </div>
                            //         </div>`
                            //         })
                            handleGameQuestion(next_question_text, randomIdForAudioElement, true, signals)
                          } else {
                            // add logic to add multiselect 
                            // signals.onResponse({
                            //   html: parseMarkdown(next_question_text)
                            // })'gemini-2.0-flash-exp',
                            handleGameQuestion(next_question_text, randomIdForAudioElement, false, signals)
                          }
                        } else {
                          signals.onResponse({
                            html: parseMarkdown(next_question_text)
                          })
                        }

                      }
                    } catch (error) {
                      console.error("Error handling game conversation:", error);
                      signals.onResponse({
                        html: "<p style='font-size: 14px;color: #991b1b;'><b>Something went wrong. Please try again later.</b></p>",
                      });
                    }
                    return;
                  }

                  // Initialize the game (First question case)
                  if (questionIndex2 === 0) {
                    questionIndex2++;
                  }
                  return;
                }



                // handling last question showing report
                if (
                  questionIndex2 === questionLength2 &&
                  userResponse2.length > 0
                ) {
                  const shadowRoot =
                    document.getElementById("chat-element2").shadowRoot;

                  LoadingMessageWithText("Crunching report data");

                  stopModernTimer(); 

                  // const messageNode = document.createElement("div");
                  // messageNode.classList.add("inner-message-container");
                  // const messageBubble = document.createElement("div");
                  // messageBubble.classList.add(
                  //   "message-bubble",
                  //   "ai-message-text"
                  // );
                  // messageBubble.style.maxWidth = "80%";
                  // messageBubble.style.marginTop = "4px";
                  // messageBubble.style.borderRadius = "4px";
                  // messageBubble.style.padding = "4";
                  // messageBubble.style.backgroundColor = "#f3f4f6";
                  // messageBubble.style.color = "#374151";
                  // const messageText = document.createElement("p");
                  // messageText.innerHTML = `<b>That's it! Thank you for participating in the interaction. Your interaction report is being processed.</b> ${
                  //   user2 ? "" : "<b> Hang tight for next steps</b>"
                  // }`;
                  appendMessage2(
                    `<b>That's it! Thank you for participating in the interaction. Your interaction report is being processed.</b> ${user2 ? "" : "<b> Hang tight for next steps</b>"
                    }`
                  );
                  // messageBubble.appendChild(messageText);
                  // messageNode.appendChild(messageBubble);
                  // shadowRoot
                  //   .getElementById("messages")
                  //   .appendChild(messageNode);
                  // shadowRoot.getElementById("messages").scrollBy(0, 100);
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
                    console.log('test-response1:', userResponse2)
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
                    console.log('Question number', questionIndex2, resQuestionNumber2, userResponse2)
                    if (!response.ok) {
                      throw new Error(`API call failed with status ${response.status}`);
                    }
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
                      responder_name2 = capitalizeFirstLetterStt(
                        qRespnse2.responder_display_name
                      );
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
                    const stringList = questionText2.split(":");
                    console.log(stringList);
                    let responderName;
                    if (stringList.length > 1) {
                      responderName = `<b>${capitalizeFirstLetterStt(
                        responder_name2
                      )}:</b><br>`;
                      questionText2 = removeResponderTypeNameStt(
                        responder_name2,
                        excludeSpecialCharacters(stringList.join(""))
                      );
                    }
                    if (isImmersiveStt && questionIndex2 != 0) {
                      questionText2 = await TTSContainerSTT(questionText2);
                    }
                    if (responderName) {
                      questionText2 = responderName + questionText2;
                    }
                    console.log("1quetext");
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
                      if (msg) msg.parentNode.replaceChild(que_msg, msg);
                    }
                    resetAllVariablesStt();
                    signals.onResponse({
                      html: "<p style='font-size: 14px;color: #991b1b;'><b>Due to abnormal activity, like session has been terminated. (e.g, very fast responses). It can also be due to the internet connection. Please try again</b>.</p>",
                    });
                    //@disable the input
                    const tChatElementRef =
                      document.getElementById("chat-element2");
                    const tShadowRoot = tChatElementRef.shadowRoot;

                    const chatInputBox =
                      tShadowRoot.getElementById("text-input");
                    chatInputBox.classList.remove("text-input-disabled");
                    chatInputBox.contentEditable = true;
                    enableEndSessionButton();
                    return;
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
                  } else if (senarioCase2 === "psychometric") {
                    reportType2 = "personalityPsychomatricReport";
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

                  if (!window.user) {
                    console.log("jsonemailname:", emailNameformJsonstt);
                    if (
                      !emailNameformJsonstt.name &&
                      !emailNameformJsonstt.email
                    ) {
                      formFieldsstt = ["name", "email"];
                      isEmailFormstt = true;
                      const msg = formFieldsstt[0] === "email" ?
                        `<b>Please enter your email. (Used for reporting and ranking. Please use same email for accurate tracking).</b>`
                        : `<b>Please enter your ${formFieldsstt[0]}</b>`;
                      signals.onResponse({
                        html: msg,
                      });
                    } else {
                      let message = `<b>It's showtime ✨, here is your detailed <a target="_blank" style="color: #3b82f6;text-decoration:none;" href="${globalReportUrl2}">feedback report</a>. The feedback is also emailed to you and will be available to you for 60 days.</b>`;
                      if (!emailCandidate2) {
                        message =
                          "<b>Thank you. The feedback report is sent to your manager and you may hear from them directly.</b>";
                      }

                      appendMessage2(message);

                      if (FeedbackVideoLinkStt && FeedbackVideoLinkStt.length > 0) {
                        appendMessage2({
                          "feedback_media": snippetDivSTT(FeedbackVideoLinkStt)
                        })
                      }
                      // //* send message to start new session
                      userScenarioRecommendationStt = await getTestRecommendationsStt(questionData2.results[0].uid, null, null, userId2);
                      console.log(senarioCase2, clientuserInformationSTT.show_recommendations)
                      if (['psychometric', 'game', 'interview'].includes(senarioCase2)
                        || !clientuserInformationSTT.show_recommendations
                        || userScenarioRecommendationStt.total_recommendation >= 2) {
                        signals.onResponse({
                          html: "<b>Please enter another interaction code to start a new interaction.</b>",
                        });
                      } else {
                        signals.onResponse({
                          html: `<b>Our skills discovery engine has suggested a new simulation based on observed gaps. Do you want to explore it now? </b><br/><br/>
                                <div class="deep-chat-temporary-message" id='related-recommendation2'>
                                <button class="deep-chat-button deep-chat-suggestion-button" style="border: 1px solid green">Yes</button>
                                <button class="deep-chat-button deep-chat-suggestion-button" style="border: 1px solid #d80000">No</button> </div>
                          `
                        })
                        startScenarioRecommendationsStt = true
                        PreviousSessionInfoSTT['sessionId'] = sessionId2
                        PreviousSessionInfoSTT['skills'] = questionData2.results[0].skills_to_evaluate
                      }
                      submitEmailAndName2();
                    }
                  }

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
                  //     html: "<p style='font-size: 14px;color: #991b1b;'><b>Due to abnormal activity, like session has been terminated. (e.g, very fast responses). It can also be due to the internet connection. Please try again</b>.</p>"
                  //   })
                  // }
                  if (window.user) {
                    // sendEmail();
                    let message = `<b>It's showtime ✨, here is your detailed <a target="_blank" style="color: #3b82f6;text-decoration:none;" href="${globalReportUrl2}">feedback report</a>. The feedback is also emailed to you and will be available to you for 60 days.</b>`;
                    if (!emailCandidate2) {
                      message =
                        "<b>Thank you. The feedback report is sent to your manager and you may hear from them directly.</b>";
                    }
                    appendMessage2(message);
                    if (FeedbackVideoLinkStt && FeedbackVideoLinkStt.length > 0) {
                      appendMessage2({
                        "feedback_media": snippetDivSTT(FeedbackVideoLinkStt)
                      })
                    }
                    // //* send message to start new session

                    userScenarioRecommendationStt = await getTestRecommendationsStt(questionData2.results[0].uid, null, null, userId2);
                    console.log(senarioCase2, clientuserInformationSTT.show_recommendations)
                    if (['psychometric', 'game', 'interview'].includes(senarioCase2)
                      || !clientuserInformationSTT.show_recommendations
                      || userScenarioRecommendationStt.total_recommendation >= 2) {

                      signals.onResponse({
                        html: "<b>Please enter another interaction code to start a new interaction.</b>",
                      });
                    } else {
                      signals.onResponse({
                        html: `<b>Our skills discovery engine has suggested a new simulation based on observed gaps. Do you want to explore it now? </b><br/><br/>
                              <div class="deep-chat-temporary-message" id='related-recommendation2'>
                              <button class="deep-chat-button deep-chat-suggestion-button" style="border: 1px solid green">Yes</button>
                              <button class="deep-chat-button deep-chat-suggestion-button" style="border: 1px solid #d80000">No</button> </div>
                        `
                      })
                      startScenarioRecommendationsStt = true
                      PreviousSessionInfoSTT['sessionId'] = sessionId2
                      PreviousSessionInfoSTT['skills'] = questionData2.results[0].skills_to_evaluate
                    }


                    submitEmailAndName2();



                    //Enable Copy Paste
                    var chatElementRef2 =
                      document.getElementById("chat-element2");
                    var shadowRoot = chatElementRef2.shadowRoot;

                    const textInputElement =
                      shadowRoot.getElementById("text-input");
                    textInputElement.removeAttribute("onpaste");
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
                if (msg) msg.parentNode.replaceChild(que_msg, msg);
              }
              resetAllVariablesStt();
              console.log(body.messages[0].text.toUpperCase() != 'STOP')
              if (body.messages[0].text.toUpperCase() !== "STOP") {
                if (botId === undefined) {
                  appendMessage2("<p style='font-size: 14px;color: #991b1b;'><b>Due to abnormal activity, like session has been terminated. (e.g, very fast responses). It can also be due to the internet connection. Please try again</b>.</p>")
                  signals.onResponse({
                    html: "Please Enter a Interaction Code to Start Your Session..",
                  })
                } else {
                  signals.onResponse({
                    html: "<p style='font-size: 14px;color: #991b1b;'><b>Due to abnormal activity, like session has been terminated. (e.g, very fast responses). It can also be due to the internet connection. Please try again</b>.</p>"

                  });

                }
                enableEndSessionButton();
              }
              //@disable the input
              const tChatElementRef = document.getElementById("chat-element2");
              const tShadowRoot = tChatElementRef.shadowRoot;

              const chatInputBox = tShadowRoot.getElementById("text-input");
              chatInputBox.classList.remove("text-input-disabled");
              chatInputBox.contentEditable = true;
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
          if (msg){
          msg.parentNode.replaceChild(que_msg, msg);

          }
        }

        resetAllVariablesStt();
        signals.onResponse({
          html: "<p style='font-size: 14px;color: #991b1b;'><b>Due to abnormal activity, like session has been terminated. (e.g, very fast responses). It can also be due to the internet connection. Please try again</b>.</p>",
        });
        enableEndSessionButton();
        //@disable the input
        const tChatElementRef = document.getElementById("chat-element2")
        const tShadowRoot = tChatElementRef.shadowRoot;

        const chatInputBox = tShadowRoot.getElementById("text-input")
        chatInputBox.classList.remove("text-input-disabled")
        chatInputBox.contentEditable = true
      }
    },
  };
});

const openChatContainer2 = () => {
  waitForMessagesElement();
  widegtStatus = 'open'
  let chatContainer2 = document.getElementsByClassName("chat-container2")?.[0];
  let chatIcon2 = document.getElementsByClassName("chat-icon2")?.[0];
  const chatIconContainer2 = document.getElementById("chat-icon2");

  let backdrop = document.getElementById("backdrop");
  backdrop.style.display = "block";
  document.body.style.overflowY = "hidden";

  const shadowR = document.getElementById("chat-element2").shadowRoot;

  const container = shadowR.getElementById("container");
  container.oncopy = () => {
    if (!subdomainStt.includes("localhost") && !subdomainStt.includes('playground')) {
      alert("Copying is not allowed");
      return false;
    }
  };

  const inputField = shadowR.getElementById("text-input");
  if (allowPastingAtClientLevelStt) {
    inputField.onpaste = () => {
      alert("Pasting is not allowed.");
      return false;
    };
  }

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

    // if (!botId) {
    const chatContainer = document.getElementById("chat-container");
    if (chatContainer) {
      chatContainer.style.scale = 0;
      chatContainer.style["transform-origin"] = "100% 100%";
      const chatIcon = document.getElementsByClassName("chat-icon")?.[0];
      chatIcon.src = widgetImageLink;

      const backdrop2 = document.getElementById("backdrop2");
      backdrop2.style.display = "none";
    }
    // }
  }

  console.log("CHAT ICON", chatIcon2.src);

  if (
    chatIcon2.src === widgetImageLink
  ) {

    // const previousPathsStt = JSON.parse(localStorage.getItem("visitedPaths") || "[]");
    // if(previousPathsStt && previousPathsStt.includes("/profile")){
    //   console.log("refreshing api")
    //   initialiseUser()

    //   localStorage.setItem("visitedPaths", JSON.stringify([]));
    // }
    if (localStorage.getItem('coachscribe_user_refresh')) {
      console.log("refreshing api")
      initialiseUserSTT()
      localStorage.removeItem("coachscribe_user_refresh");
    }

    chatIconContainer2.style.backgroundColor = "white";
    chatIconContainer2.style.height = snippetOrigin() === 'external' ? "6rem" : "4.5rem";
    chatIconContainer2.style.width = snippetOrigin() === 'external' ? "6rem" : "4.5rem";
    chatIconContainer2.style.borderRadius = "40%";
    chatIcon2.src =
      "https://res.cloudinary.com/dtbl4jg02/image/upload/close-btn_pfiwqu.png";
  } else {
    // chatIconContainer2.style.backgroundColor = "#06ddb8";
    chatIconContainer2.style.height = widgetHeight;
    chatIconContainer2.style.width = widgetWidth;
    chatIconContainer2.style.borderRadius = "0%";
    chatIcon2.src = widgetImageLink;
  }
};

const closeFromTop2 = () => {
  // widegtStatus = 'closed'
  console.log('closing widget')
  let chatContainer2 = document.getElementsByClassName("chat-container2")?.[0];
  let chatIcon2 = document.getElementsByClassName("chat-icon2")?.[0];

  document.body.style.overflowY = "scroll";
  let backdrop = document.getElementById("backdrop");
  backdrop.style.display = "none";
  chatContainer2.style.scale = 0;
  chatContainer2.style["transform-origin"] = "100% 100%";
  const chatIconContainer2 = document.getElementById("chat-icon2");


  //end session due to inactivity :- row 708
  // setTimeout(() => {
  //   if(isBotInitialized === true){
  //     handleEndConversation(true)
  //     isBotInitialized = false
  //   }
  // }, 900000);

  if (
    chatIcon2.src === widgetImageLink
  ) {
    chatIconContainer2.style.backgroundColor = "white";
    chatIcon2.src =
      "https://res.cloudinary.com/dtbl4jg02/image/upload/close-btn_pfiwqu.png";
  } else {
    // chatIconContainer2.style.backgroundColor = "#06ddb8";
    chatIconContainer2.style.height = widgetHeight;
    chatIconContainer2.style.width = widgetWidth;
    chatIconContainer2.style.borderRadius = "0%";
    chatIcon2.src = widgetImageLink;
  }
};

window.openChatContainer2 = openChatContainer2;


// Dropdown toggle
document.addEventListener("click", function (event) {
    const mindmapMenu = document.getElementById("mindmap-menu");
    const assessmentMenu = document.getElementById("assessment-menu");

    if (event.target.closest("#mindmap-btn")) {
        mindmapMenu.style.display = mindmapMenu.style.display === "block" ? "none" : "block";
        assessmentMenu.style.display = "none";
    }
    else if (event.target.closest("#assessment-btn")) {
        assessmentMenu.style.display = assessmentMenu.style.display === "block" ? "none" : "block";
        mindmapMenu.style.display = "none";
    }
    else if (!event.target.closest(".dropdown-menu")) {
        mindmapMenu.style.display = "none";
        assessmentMenu.style.display = "none";
    }
});