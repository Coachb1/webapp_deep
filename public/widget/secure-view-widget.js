(function () {
  // === CONFIGURATION ===
  const currentScript = document.currentScript;
  const IMAGE_URL = currentScript.getAttribute("data-widget-image") || '';
  const WIDGET_TEXT = currentScript.getAttribute("data-widget-text") || '';
  const PAGE_ID = currentScript.getAttribute("data-page-id") || '';
  const WIDGET_WIDTH = parseInt(currentScript.getAttribute("data-widget-width")) || null;
  const WIDGET_HEIGHT = parseInt(currentScript.getAttribute("data-widget-height")) || null;

  const TARGET_URL = `https://playground.coachbots.com/library-bot/${PAGE_ID}`;

  let widgetOpened = false;
  let originalWidth = 0;
  let originalHeight = 0;

  // === STYLES ===
  const styles = `
    .widget-button {
      position: fixed;
      bottom: 15px;
      right: 25px;
      display: flex;
      align-items: center;
      justify-content: center;
      max-height: calc(100vh - 83px);
      padding: 0;
      margin: 0;
      background: transparent;
      cursor: pointer;
      z-index: 10001;
      user-select: none;
      box-shadow: 0 6px 15px rgba(0,0,0,0.25);
      transition: all 0.3s ease;
      font-family: sans-serif;
      font-weight: bold;
    }
    .widget-button:hover {
      transform: scale(1.08);
      box-shadow: 0 10px 20px rgba(0,0,0,0.3);
    }
    .widget-button:active {
      transform: scale(0.98);
      box-shadow: 0 6px 12px rgba(0,0,0,0.2);
    }
    .widget-image {
      display: block;
      width: 100%;
      height: 100%;
      max-height: calc(100vh - 83px);
      object-fit: contain;
      border: 0;
      padding: 0;
      margin: 0;
      transition: all 0.3s ease;
    }
    .widget-placeholder {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 0.95rem;
      font-weight: 600;
      white-space: nowrap;
      transition: all 0.25s ease;
      cursor: pointer;
      background-color: #14b8a6;
      box-shadow: 0 4px 10px rgba(0,0,0,0.15);
      padding: 10px 18px;
      border-radius: 6px;
    }
    .widget-placeholder:hover { transform: scale(1.05); }
    .widget-placeholder:active { transform: scale(0.96); }

    .widget-chat-panel {
      position: fixed;
      top: 10px;
      left: 10px;
      right: 10px;
      height: calc(100vh - 66px);
      background: #fff;
      border-radius: 12px;
      z-index: 10000;
      display: none;
      overflow: hidden;
      box-shadow: 0 -4px 20px rgba(0,0,0,0.3);
    }
    .widget-chat-panel iframe {
      border: none;
      width: 100%;
      height: 100%;
    }
    .widget-close {
      position: absolute;
      top: -5px;
      left: -5px;
      z-index: 10001;
      font-size: 1.7rem;
      font-weight: bold;
      color: #333;
      cursor: pointer;
      background: rgba(255,255,255,0.8);
      border-radius: 50%;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.2s ease, transform 0.2s ease;
    }
    .widget-close:hover {
      background: rgba(255,255,255,1);
      transform: scale(1.1);
    }
  `;

  appendStyles(styles);

  // === ELEMENTS ===
  const button = createButton();
  const chatPanel = createChatPanel(TARGET_URL);

  document.body.appendChild(button);
  document.body.appendChild(chatPanel);

  // === EVENT LISTENERS ===
  button.addEventListener("click", toggleWidget);
  chatPanel.querySelector(".widget-close").addEventListener("click", closeWidget);

  // === FUNCTIONS ===
  function appendStyles(cssText) {
    const styleTag = document.createElement("style");
    styleTag.innerHTML = cssText;
    document.head.appendChild(styleTag);
  }

  function createButton() {
    const btn = document.createElement("div");
    btn.className = "widget-button";

    if (IMAGE_URL) {
      const img = document.createElement("img");
      img.src = IMAGE_URL;
      img.alt = "Widget";
      img.className = "widget-image";

      img.addEventListener("load", () => resizeButton(btn, img));
      img.addEventListener("error", () => showPlaceholder(btn));

      btn.appendChild(img);
    } else {
      showPlaceholder(btn);
    }

    return btn;
  }

  function createChatPanel(url) {
    const panel = document.createElement("div");
    panel.className = "widget-chat-panel";
    panel.innerHTML = `
      <span class="widget-close">&times;</span>
      <iframe src="${url}"></iframe>
    `;
    return panel;
  }

  function showPlaceholder(buttonEl) {
    buttonEl.innerHTML = "";
    const placeholder = document.createElement("div");
    placeholder.className = "widget-placeholder";
    placeholder.textContent = WIDGET_TEXT || "C";
    buttonEl.appendChild(placeholder);
  }

  function resizeButton(buttonEl, img) {
    let width = WIDGET_WIDTH || img.naturalWidth;
    let height = WIDGET_HEIGHT || img.naturalHeight;

    const maxHeight = window.innerHeight - 83;
    if (height > maxHeight) {
      const scale = maxHeight / height;
      width *= scale;
      height *= scale;
    }

    buttonEl.style.width = `${width}px`;
    buttonEl.style.height = `${height}px`;
    originalWidth = width;
    originalHeight = height;
  }

  function shrinkButtonToPlaceholder(buttonEl) {
    buttonEl.style.width = "auto";
    buttonEl.style.height = "auto";
    showPlaceholder(buttonEl);
  }

  function restoreButton(buttonEl) {
    if (IMAGE_URL && originalWidth && originalHeight) {
      buttonEl.innerHTML = "";
      const img = document.createElement("img");
      img.src = IMAGE_URL;
      img.alt = "Widget";
      img.className = "widget-image";
      img.style.width = `${originalWidth}px`;
      img.style.height = `${originalHeight}px`;
      buttonEl.appendChild(img);
    } else {
      showPlaceholder(buttonEl);
    }
  }

  function toggleWidget() {
    const chatPanel = document.querySelector(".widget-chat-panel");
    if (!widgetOpened) {
      chatPanel.style.display = "block";
      shrinkButtonToPlaceholder(button);
    } else {
      chatPanel.style.display = "none";
      restoreButton(button);
    }
    widgetOpened = !widgetOpened;
  }

  function closeWidget() {
    const chatPanel = document.querySelector(".widget-chat-panel");
    chatPanel.style.display = "none";
    restoreButton(button);
    widgetOpened = false;
  }
})();
