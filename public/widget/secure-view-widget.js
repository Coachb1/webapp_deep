(function () {
  const currentScript = document.currentScript;
  const IMAGE_URL = currentScript.getAttribute("data-widget-image") || 'https://via.placeholder.com/150';
  const URL_ID = currentScript.getAttribute("data-page-id") || '';
  const WIDGET_WIDTH = parseInt(currentScript.getAttribute("data-widget-width")); // optional
  const WIDGET_HEIGHT = parseInt(currentScript.getAttribute("data-widget-height")); // optional
  const POPUP_FEATURES = "width=900,height=600,scrollbars=yes,resizable=yes";

  if (!window._playgroundPopup) window._playgroundPopup = null;
  let popupWindow = window._playgroundPopup;

  const TARGET_URL = `https://playground.coachbots.com/library-bot/${URL_ID}`;

  const styles = `
    .widget-button {
      position: fixed;
      bottom: 25px;
      right: 25px;
      display: block; /* let button wrap the image exactly */
      padding: 0;
      margin: 0;
      border: none;
      background: transparent;
      cursor: pointer;
      z-index: 10000;
      user-select: none;
      box-shadow: 0 6px 15px rgba(0,0,0,0.25);
      transition: all 0.3s ease;
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
    }

    @media (max-width: 768px) {
      .widget-button {
        bottom: 15px;
        right: 15px;
      }
      .widget-image {
        max-width: 75%;
      }
    }

    @media (max-width: 480px) {
      .widget-button {
        bottom: 10px;
        right: 10px;
      }
      .widget-image {
        max-width: 60%;
      }
    }
  `;
  const styleTag = document.createElement("style");
  styleTag.innerHTML = styles;
  document.head.appendChild(styleTag);

  const button = document.createElement("div");
  button.className = "widget-button";

  const img = document.createElement("img");
  img.src = IMAGE_URL;
  img.alt = "Widget";
  img.className = "widget-image";

  img.addEventListener('load', () => {
    let width = WIDGET_WIDTH || img.naturalWidth;
    let height = WIDGET_HEIGHT || img.naturalHeight;

    // Scale if height exceeds max
    const maxHeight = window.innerHeight - 83;
    if (height > maxHeight) {
      const scale = maxHeight / height;
      width = width * scale;
      height = height * scale;
    }

    button.style.width = width + 'px';
    button.style.height = height + 'px';
  });

  button.appendChild(img);
  document.body.appendChild(button);

  button.addEventListener("click", () => {
    if (window._playgroundPopup && !window._playgroundPopup.closed) {
      window._playgroundPopup.focus();
      return;
    }

    popupWindow = window.open("", "_blank", POPUP_FEATURES);
    if (!popupWindow) return;
    window._playgroundPopup = popupWindow;
    popupWindow.opener = null;

    popupWindow.document.write(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Widget</title>
        <meta name="referrer" content="no-referrer">
        <style>
          html, body {
            margin: 0;
            padding: 0;
            height: 100%;
            overflow: hidden;
            background: #000;
          }
          iframe {
            border: none;
            width: 100%;
            height: 100%;
          }
        </style>
      </head>
      <body>
        <iframe src="${TARGET_URL}"></iframe>
      </body>
      </html>
    `);
    popupWindow.document.close();
  });
})();
