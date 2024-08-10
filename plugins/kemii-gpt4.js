// Kemii Cantik
// Rab, 12 Jun - 23.32

let handler = async (m, { conn, usedPrefix, command, text }) => {

if (!text) return conn.reply(m.chat, `• *Example :* ${usedPrefix + command} hai`, m)
await m.react('🕒')
let api = await gpt4(text)
await conn.reply(m.chat, api.content, m)
await m.react('')
}
handler.tags = ["ai"]
handler.help = ["gpt4 *<text>*"]
handler.command = ["gpt4"]
module.exports = handler

async function gpt4(text) {
let api = await Func.fetchJson(`https://api.alyachan.dev/api/gpt4-o?q=${text}&apikey=${alyapi}`)
return api.data
}