// Kemii Cantik
// Rab, 5 Jun - 18.46

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return conn.reply(m.chat, `• *Example :* ${usedPrefix + command} dog.`, m)
    await conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})
    let hasil = await dalle(text)
    await conn.sendFile(m.chat, hasil.result, '', '', m)
    await m.react('')
};
handler.help = ["dalle3 *<text>*"]
handler.tags = ["ai"]
handler.command = ["dalle3"]
handler.premium = false
handler.register = true
handler.limit = true

module.exports = handler

async function dalle(text) {
let api = await Func.fetchJson(`https://itzpire.com/ai/dalle?prompt=${text}`)
return api
}