let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply(`• *Example :* ${usedPrefix + command} Alok`)
  conn.sendMessage(m.chat, { react: { text: "🕒", key: m.key } })
  await conn.sendFile(m.chat, `https://api.popcat.xyz/biden?text=${text}`, 'error.jpg', done, m, false)
}
handler.help = ['biden *<text>*']
handler.tags = ['maker']
handler.command = /^(biden)$/i
handler.limit = true
handler.register = true
module.exports = handler
