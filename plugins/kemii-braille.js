// Kemii Cantik
// Min, 9 Jun - 17.32

let handler = async (m, { command, usedPrefix, conn, text, args }) => {
let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || ''
if (!mime) return conn.reply(m.chat, `Send/Reply Images with the caption *${usedPrefix + command}*`, m)
await m.react('🕒')
let media = await q.download()
let url = await upload(media)
let api = await Func.fetchJson(`https://porno.sytes.net/misc/img2braille?image=${url}`)
await conn.reply(m.chat, api.result.trim(), m)
await m.react('')
}
handler.help = ["braille *<image>*"]
handler.tags = ["convert"]
handler.command = /^(braille)$/i
handler.limit = true
handler.register = true

module.exports = handler;
