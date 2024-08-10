let handler = async (m, {conn}) => {
if (!m.quoted) throw 'repy pesan saluran'
try {
let id = (await m.getQuotedObj()).msg.contextInfo.forwardedNewsletterMessageInfo
await conn.reply(m.chat, util.format(id), m)
} catch (e) {
throw 'Harus chat dari channel'
}
}
handler.help = handler.command = ['ci']
handler.tags = ['main']
module.exports = handler