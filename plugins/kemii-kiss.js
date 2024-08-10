var fetch = require('node-fetch');
let uploadImage = require('../lib/uploadImage')

var handler = async (m, { text, usedPrefix, command }) => {
let who = m.mentionedJid[0];
let who2 = m.mentionedJid[1];
if (text.split(" ").length < 2) return conn.reply(m.chat,  "Minimal tag 2 member!", m)
let ppUrl = await conn.profilePictureUrl(who, 'image').catch((_) => "https://telegra.ph/file/1dff1788814dd281170f8.jpg")
await conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})
let pp = await (await fetch(ppUrl)).buffer()
let link = await uploadImage(pp)
let ppUrl2 = await conn.profilePictureUrl(who2, 'image').catch((_) => "https://telegra.ph/file/1dff1788814dd281170f8.jpg")
let pp2 = await (await fetch(ppUrl2)).buffer()
let link2 = await uploadImage(pp2)
let ship = `https://api.lolhuman.xyz/api/creator2/kiss?apikey=${global.lolkey}&img1=${link}&img2=${link2}`
let teks = `@${who.split`@`[0]} 🥵 @${who2.split`@`[0]}`
await conn.sendMessage(m.chat, { image: { url: ship }, caption: teks, mentions: conn.parseMention(teks) }, { quoted: m })
}      
handler.command = /^kiss$/i
handler.help = ['kiss']
handler.tags = ['group'];
handler.premium = false
handler.register = true
handler.group = true

module.exports = handler;