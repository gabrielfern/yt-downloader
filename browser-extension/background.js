function download(mode, url) {
    fetch(`http://localhost:9311/?${mode}=${encodeURIComponent(url)}`)
}

chrome.contextMenus.onClicked.addListener((info, tab) => {
    download(info.menuItemId, tab.url)
})

chrome.browserAction.onClicked.addListener((tab) => {
    download('v', tab.url)
})

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        title: "Download as video",
        contexts: ["browser_action"],
        id: "v"
    })
    chrome.contextMenus.create({
        title: "Download as audio",
        contexts: ["browser_action"],
        id: "a"
    })
})
