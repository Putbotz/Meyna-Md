/*
 *  Script By Kemii
 *  Forbidden to share and delete my wm
 *  Facebook : kemii.houkii
 *  Github : dcodekemii
 *  Telegram : t.me/dcodekemi
 *  Breach : Kemii
 *  WhatsApp : wa.me/628816609112
 */

let { nikParse } = require('../lib/nik-parse.js')

let handler = async (m, { conn, usedPrefix, command, text }) => {
  if (!text) return m.reply(`• *Example :* ${usedPrefix + command} 3674024105760002`)
  
  await conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})
  
  let result = await nikParse(text)
  
  await conn.reply(m.chat, `${Func.jsonFormat(result)}`, m)
  
  await conn.sendMessage(m.chat, { react: { text: '', key: m.key }})
}

handler.tags = ['premium']
handler.help = ["nik-parse *<text>*"]
handler.command = ["nik-parse"]

handler.premium = true

module.exports = handler