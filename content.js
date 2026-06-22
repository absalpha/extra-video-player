const urlParams = new URLSearchParams(window.location.search);
const isExtraPlayer = urlParams.get("extra_video_player") === "1";

chrome.runtime.onMessage.addListener(function (message) {
  if (message.action === "pauseOriginalVideo") {
    pauseCurrentVideo();
  }
});

if (isExtraPlayer) {
  makeVideoOnlyMode();
}

function pauseCurrentVideo() {
  const video = document.querySelector("video");

  if (video) {
    video.pause();
  }
}

function makeVideoOnlyMode() {
  const style = document.createElement("style");
  style.textContent = `
    /* Hide most YouTube page UI */
    ytd-masthead,
    ytd-guide-renderer,
    #secondary,
    #comments,
    ytd-comments,
    #meta,
    #info,
    #below,
    #related,
    ytd-watch-metadata,
    ytd-merch-shelf-renderer,
    ytd-playlist-panel-renderer {
      display: none !important;
    }

    /* Remove page spacing */
    html,
    body,
    ytd-app,
    #content,
    ytd-page-manager,
    ytd-watch-flexy,
    #columns,
    #primary,
    #primary-inner {
      margin: 0 !important;
      padding: 0 !important;
      width: 100vw !important;
      height: 100vh !important;
      max-width: none !important;
      overflow: hidden !important;
      background: black !important;
    }

    /* Make the video area fill the popup */
    #player,
    #movie_player,
    .html5-video-player,
    .html5-main-video,
    ytd-player,
    #player-container,
    #player-container-inner {
      width: 100vw !important;
      height: 100vh !important;
      max-width: none !important;
      max-height: none !important;
    }

    video {
      width: 100vw !important;
      height: 100vh !important;
      object-fit: contain !important;
      background: black !important;
    }
  `;

  document.documentElement.appendChild(style);

  const interval = setInterval(() => {
    const watchFlexy = document.querySelector("ytd-watch-flexy");
    const video = document.querySelector("video");

    if (watchFlexy) {
      watchFlexy.setAttribute("theater", "");
      watchFlexy.removeAttribute("fullscreen");
    }

    if (video) {
      video.style.width = "100vw";
      video.style.height = "100vh";
      video.style.objectFit = "contain";
    }
  }, 500);

  setTimeout(() => {
    clearInterval(interval);
  }, 10000);
}