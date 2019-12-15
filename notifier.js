const notifier = require('node-notifier')

notifier.notify({
    title: 'YT-Downloader',
    message: process.argv[2],
    hint: 'string:desktop-entry:yt-downloader',
    'app-name': 'YT-Downloader'
})
