let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return conn.reply(m.chat, `• *Example :* ${usedPrefix + command} hijab girl.`, m)
    await conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})
    try {
    await conn.sendFile(m.chat, `https://api.onesytex.my.id/api/animagen_v1.0?prompt=${text}`, '', '', m)
    } catch (e) {
conn.reply(m.chat, `Haii @${m.sender.replace(/@.+/g, '')}, saat ini fitur *${usedPrefix}${command}* sedang coldown silahkan coba dalam beberapa saat lagi.`, m)
}
};
handler.help = ["animegen *<text>*"]
handler.tags = ["ai"]
handler.command = ["animegen"]
handler.premium = false
handler.register = true
handler.limit = true

module.exports = handler