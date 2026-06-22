chrome.runtime.onMessage.addListener(function (message) {
  if (message.action === "openPlayer") {
    if (message.originalTabId) {
      chrome.tabs.sendMessage(message.originalTabId, {
        action: "pauseOriginalVideo"
      });
    }

    const playerUrl = `https://www.youtube.com/watch?v=${message.videoId}&extra_video_player=1`;

    chrome.windows.create({
      url: playerUrl,
      type: "popup",
      width: 900,
      height: 600
    });
  }
});