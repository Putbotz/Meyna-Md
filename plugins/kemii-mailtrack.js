let axios = require('axios')
let handler = async (m, { conn, args, text, command, usedPrefix, isCreator, isPrems }) => {
  if (!text) return conn.reply(m.chat, `• *Example :* ${usedPrefix}${command} dcode.kemii@gmail.com`, m)
  conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})
  let apiKey = 't6LrPtWuHCpKEycuibhWuafRQdUKMFbZ';
  let email = text
  let apiUrl = await axios.get(`https://www.ipqualityscore.com/api/json/email/${apiKey}/${email}`).then(function(response) {
  m.reply(`${JSON.stringify(response.data, null, 2)}`)
})
}
handler.help = ['mailtrack *<text>*']
handler.tags = ['premium','hengker']
handler.command = /^(mailtrack)$/i
handler.register = true
handler.premium = true

module.expotrts = handler