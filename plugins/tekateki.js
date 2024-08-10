let fetch = require('node-fetch')

let timeout = 120000
let poin = dpoint
let handler = async (m, { conn, usedPrefix, command }) => {
    conn.tekateki = conn.tekateki ? conn.tekateki : {}
    let id = m.chat
    if (id in conn.tekateki) {
        conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.tekateki[id][0])
        throw false
    }
    let src = await (await fetch('https://raw.githubusercontent.com/qisyana/scrape/main/tekateki.json')).json()
    let json = src[Math.floor(Math.random() * src.length)]
    let caption = `Codename1: ${command}\n*Teka Teki*\n\n`
    caption += `Soal: ${json.pertanyaan}\n`
    caption += 'Timeout : [ *2 menit* ]\n'
    caption += 'Reply pesan ini untuk menjawab'
    conn.tekateki[id] = [
        await conn.reply(m.chat, caption, m),
        json, poin,
        setTimeout(() => {
            if (conn.tekateki[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, conn.tekateki[id][0])
            delete conn.tekateki[id]
        }, timeout)
    ]
}
handler.help = ['tekateki']
handler.tags = ['game']
handler.command = /^tekateki/i
handler.limit = true
handler.group = false

module.exports = handler