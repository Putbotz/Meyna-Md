// Kemii Cantik 
// Sel, 28 Mei - 21.23

let uploadImage = require('../lib/uploadImage.js')

let handler = async (m, { command, usedPrefix, conn, text, args }) => {
conn.faceswap = conn.faceswap ? conn.faceswap : {}

let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || ''
if (!mime) return conn.reply(m.chat, `Send/Reply Images with the caption *${usedPrefix + command}*`, m)
let media = await q.download()
let url = await uploadImage(media)
let teks = `Berhasil menyimpan Image.`
await m.reply(teks)
conn.faceswap[m.sender] = url
}
handler.help = ["setface *<image>*"]
handler.tags = ["ai"]
handler.command = /^(setface)$/i
handler.register = true

module.exports = handler