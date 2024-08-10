let axios = require('axios')
let handler = async (m, { conn, args, text, command, usedPrefix, isCreator, isPrems }) => {
  if (!text) return conn.reply(m.chat, `• *Example :* ${usedPrefix}${command} 6288980870067`, m)
  conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})
  let apiKey = 't6LrPtWuHCpKEycuibhWuafRQdUKMFbZ';
  let phoneNumber = text
  let apiUrl = await axios.get(`https://www.ipqualityscore.com/api/json/phone/${apiKey}/${phoneNumber}?strictness=1`).then(function(response) {
  m.reply(`${JSON.stringify(response.data, null, 2)}`)
})
}
handler.help = ['track *<text>*']
handler.tags = ['premium','hengker']
handler.command = /^(track)$/i
handler.register = true
handler.premium = true

module.exports = handler