# YT-Downloader
It is a local server that uses youtube-dl to download videos and audios from the web, also it has a browser extension that communicates with the local running server to instruct it to download things.
You just click the extension in the browser toolbar and the video in the webpage you are in starts to download to a selected location, after the video download you receive a native notification letting you know it has ended

*Necessary youtube-dl and ffmpeg installed to work*

*Downloads from youtube and other websites*

## Install node dependencies
> npm i

## Run the server
> node server [--key=SECURITY_KEY] [VIDEOS_PATH] [MUSIC_PATH]

***

Install the extension to your webbrowser (works on Google Chrome), using developer mode "Load unpacked"


Icon from [icon link](https://icon-icons.com/icon/youtube-dl/102951), thanks
