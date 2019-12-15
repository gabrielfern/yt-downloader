#! /usr/bin/env node

const {spawn} = require('child_process')
const path = require('path')
const express = require('express')
const app = express()
const port = 9311
const videoPath = process.argv[2] || process.cwd()
const audioPath = process.argv[3] || videoPath

app.get('/', (req, res) => {
    let url = req.query.v
    let audioonly = false
    let downloadPath = videoPath
    if (req.query.a) {
        url = req.query.a
        audioonly = true
        downloadPath = audioPath
    }

    if (url && url.startsWith('http')) {
        let yt
        if (audioonly) {
            yt = spawn('youtube-dl', ['--extract-audio',
                '--audio-format', 'mp3', '--no-mtime', '-o',
                `${path.join(downloadPath, '%(title)s.part')}`, '--exec',
                `node ${path.join(__dirname, 'notifier.js')}`,
                '--no-post-overwrites', '--', url],
                {stdio: 'ignore'})
        } else {
            yt = spawn('youtube-dl', ['--no-mtime', '-o',
                `${path.join(downloadPath, '%(title)s.%(ext)s')}`, '--exec',
                `node ${path.join(__dirname, 'notifier.js')}`, '--', url],
                {stdio: 'ignore'})
        }

        yt.on('close', (code) => {
            if (code != 0) {
                spawn('node', [path.join(__dirname, 'notifier.js'),
                    'Something went wrong'])
            }
        })
    }

    res.set('Access-Control-Allow-Origin', '*')
    res.end()
})

app.listen(port)
