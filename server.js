#! /usr/bin/env node

const {spawn} = require('child_process')
const path = require('path')
const express = require('express')
const app = express()
const port = 9311
const videoFormat = 'bestvideo[height<2400][width<2400]+bestaudio/best'
const audioFormat = 'bestaudio/best'
const notifierPath = path.join(__dirname, 'notifier.js')
const notify = msg => spawn('node', [notifierPath, msg])

let key
let posArgs = process.argv.slice(2).filter(arg => !arg.startsWith('--key=') ||
    ((key = arg.slice(6)) && false))
let videoPath = posArgs[0] || process.cwd()
let audioPath = posArgs[1] || videoPath

app.post('/', (req, res) => {
    let url = req.query.v
    let audioonly = false
    let downloadPath = videoPath
    if (req.query.a) {
        url = req.query.a
        audioonly = true
        downloadPath = audioPath
    }

    let keyOk = !key || key == req.query.k
    let urlOk = url && url.startsWith('http')
    if (keyOk && urlOk) {
        let yt
        if (audioonly) {
            yt = spawn('youtube-dl', ['-f', audioFormat, '--extract-audio',
                '--audio-format', 'mp3', '--no-mtime', '-o',
                `${path.join(downloadPath, '%(title)s.part')}`, '--exec',
                `node ${notifierPath}`, '--add-metadata', '--embed-thumbnail',
                '--no-post-overwrites', '--', url],
                {stdio: 'ignore'})
        } else {
            yt = spawn('youtube-dl', ['-f', videoFormat, '--no-mtime', '-o',
                `${path.join(downloadPath, '%(title)s.%(ext)s')}`, '--exec',
                `node ${notifierPath}`, '--add-metadata', '--embed-subs',
                '--all-subs', '--', url],
                {stdio: 'ignore'})
        }

        yt.on('close', code => {
            if (code != 0) notify('Something went wrong')
        })
    } else {
        if (!keyOk) notify('Security key is wrong')
        else notify('Url not supported')
    }

    res.set('Access-Control-Allow-Origin', '*')
    res.end()
})

app.listen(port)
