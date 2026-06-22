const button = document.getElementById("openPlayerBtn");
const statusText = document.getElementById("status");

button.addEventListener("click", async function () {
  const tabs = await chrome.tabs.query({
    active: true,
    currentWindow: true
  });

  const currentTab = tabs[0];

  if (!currentTab || !currentTab.url.includes("youtube.com/watch")) {
    statusText.textContent = "Please open a YouTube video first.";
    return;
  }

  const url = new URL(currentTab.url);
  const videoId = url.searchParams.get("v");

  if (!videoId) {
    statusText.textContent = "Could not find the YouTube video ID.";
    return;
  }

  chrome.runtime.sendMessage({
    action: "openPlayer",
    videoId: videoId,
    originalTabId: currentTab.id
  });
});