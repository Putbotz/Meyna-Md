let handler = async (m, { conn, usedPrefix, command, text }) => {
let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || ''
if (!/audio/.test(mime)) throw `Reply Audio With Command Example: *${usedPrefix + command}*`
let audio = await q.download()
let hasil = await Func.fetchJson(`https://api.alyachan.dev/api/audio2text?url=${audio}&apikey=dcodekemii`)
await conn.reply(m.chat, hasil.data.text, m)
}
handler.command = ['kipas']
module.exports = handler