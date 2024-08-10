let fetch = require('node-fetch')
let handler = async (m, { conn, args, text, command, usedPrefix, isCreator, isPrems }) => {
  let response = args.join(' ').split('|')
  if (!args[0]) return conn.reply(m.chat, `• *Example :* ${usedPrefix}${command} Takashi|kemii`, m)
	conn.sendMessage(m.chat, {
		react: {
			text: '🕒',
			key: m.key,
		}
	})
  let res = await Func.fetchJson(`https://api.neoxr.eu/api/pornhub?text1=${response[0]}&text2=${response[1]}&apikey=${global.neoapi}`)
  conn.sendFile(m.chat, res.data.url, 'pornhub.jpg', '', m)
}
handler.help = ['pornhub'].map(v => v + ' *<text>|<text>*')
handler.tags = ['maker']
handler.command = /^(pornhub)$/i
handler.register = true
handler.limit = true

module.exports = handler

