chrome.browserAction.onClicked.addListener((tab) => {
    fetch('http://localhost:9311/?v=' + tab.url)
})
