let handler = async (m, { conn, args }) => {
const code = await conn.groupInviteCode(m.chat)
m.reply('https://chat.whatsapp.com/'+code)
}
handler.help = ['link']
handler.tags = ['group']
handler.command = /^link(g(c|ro?up))?$/i
handler.group = true
handler.admin = true

module.exports = handler