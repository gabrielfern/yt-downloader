#! /usr/bin/env node

const {spawn} = require('child_process')
const notifier = require('node-notifier')
const express = require('express')
const app = express()
const port = 9311
const downloadPath = process.argv[2] || process.env.YT_DOWNLOAD_PATH || process.cwd()

app.get('/', (req, res) => {
    let yt = spawn('youtube-dl', ['--no-mtime', '-o', `${downloadPath}/%(title)s.%(ext)s`, req.query.v])
    let ytTitle = spawn('youtube-dl', ['--get-title', req.query.v])
    let video = {}

    ytTitle.stdout.on('data', (title) => video.title = title)
    yt.on('close', (code) => {
        if (code == 0) {
            function notifySuccess() {
                notifier.notify({
                    title: 'YT-Downloader',
                    message: `${video.title || 'Video'} successfully downloaded to ${downloadPath}`
                })
            }
            if (ytTitle.exitCode == null) {
                ytTitle.on('close', notifySuccess)
            } else {
                notifySuccess()
            }
        } else {
            notifier.notify({
                title: 'YT-Downloader',
                message: 'Something went wrong'
            })
        }
    })

    res.set('Access-Control-Allow-Origin', '*')
    res.end()
})

app.listen(port)
