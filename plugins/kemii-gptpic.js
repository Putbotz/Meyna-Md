let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) return conn.reply(m.chat, `• *Example :* ${usedPrefix + command} anime`, m)
conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})
let api = await Func.fetchJson(`https://itzpire.site/ai/gpt-pict?q=${text}`)
if (api.status) {
for (let i of api.result) {
conn.sendFile(m.chat, i, '', '', m)
}
} else {
m.reply(api.status)
}
};
handler.help = ["gpt-pic *<text>*"]
handler.tags = ["ai"]
handler.command = ["gpt-pic"]
handler.premium = false

module.exports = handler