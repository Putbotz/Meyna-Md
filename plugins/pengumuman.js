let handler = async(m, { conn, participants, args, command, usedPrefix }) => {
let text
if (args.length >= 1) {
text = args.join(" ");
} else if (m.quoted && m.quoted.text) {
text = m.quoted.text;
} else return m.reply(Func.example(usedPrefix, command, "halo"));
conn.sendMessage(m.chat, { text: text, mentions: participants.map(a => a.id) }, {quoted:m})
}
handler.help = ['hidetag *<text>*']
handler.tags = ['group']
handler.command = /^(hidetag|h|hite)$/i

handler.group = true
handler.admin = true

module.exports = handler