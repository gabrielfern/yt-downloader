function download(mode, url) {
    chrome.storage.local.get('key', ({key}) => {
        fetch(`http://localhost:9311/?${mode}=${encodeURIComponent(url)}` +
            `&k=${encodeURIComponent(key)}`)
    })
}

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId != 'k') {
        download(info.menuItemId, tab.url)
    } else {
        let newKey = prompt('Security key')
        if (newKey != null)
            chrome.storage.local.set({key: newKey})
    }
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
    chrome.contextMenus.create({
        title: "Set security key",
        contexts: ["browser_action"],
        id: "k"
    })
})
