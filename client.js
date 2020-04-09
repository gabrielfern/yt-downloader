#! /usr/bin/env node
// "./client.js v URL" to download video
// or "./client.js a URL" to download audio

const http = require('http')

const key = process.env.YTDOWNLOADER_KEY || ''
const mode = process.argv[2]
const url = encodeURIComponent(process.argv[3])
const k = encodeURIComponent(key)

http.request(
    `http://localhost:9311/?${mode}=${url}&k=${k}`, { method: 'POST' }
).end()
