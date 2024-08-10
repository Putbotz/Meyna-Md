let handler = async (m, { conn, usedPrefix, command, text }) => {
if (!text) return conn.reply(m.chat, `• *Example :* ${usedPrefix}${command} dog`, m)
await conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})
let hasil = await itz.emi(text)
await conn.sendFile(m.chat, hasil.result, '', '', m)
}
handler.tags = ['ai']
handler.help = ['emi *<text>*']
handler.command = ['emi']
module.exports = handler