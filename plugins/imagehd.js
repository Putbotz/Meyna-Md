// Kemii Cantik
// Sab, 1 Jun - 22.15

let { remini } = require('../lib/remini.js')

let handler = async (m, { conn, usedPrefix, command }) => {
let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || ''
if (!mime) return conn.reply(m.chat, `Send/Reply Images with the caption *.${command}*`, m)
await conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})
let media = await q.download()
let hasil = await remini(media, "enhance")
try {
await conn.sendFile(m.chat, hasil, '', '', m)
} catch (e) {
conn.reply(m.chat, `❌ Tidak dapat memproses permintaan anda.`, m)
}
};
handler.help = ["enhancer", "hdr", "colorize","hd","unblur","remini","enhance"].map(v => v + ' *<image>*')
handler.tags = ["tools","hd"];
handler.premium = false;
handler.register = true
handler.limit = true
handler.command = ["unblur", "enchaner", "enhance", "hdr", "colorize","remini","hd"];
module.exports = handler;