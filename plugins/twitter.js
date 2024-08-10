let fetch = require('node-fetch')

let handler = async (m, { conn, text }) => {
  if (!text) return conn.reply(m.chat, '• *Example :* .twitter https://twitter.com/xxxxx', m)
  conn.sendMessage(m.chat, { react: { text: '🕐', key: m.key }})
  let kemii = await fetch(`https://api.alyachan.dev/api/twitter?url=${text}&apikey=${global.alyapi}`)
  try {
  let res = await kemii.json()
  let start = new Date();
 await conn.sendFile(m.chat, res.data[0].url, 'twiter.mp4', '', m)
 await conn.sendMessage(m.chat, { react: { text: '', key: m.key }})
   } catch (e) {
    await m.reply(String(e))
    await conn.sendMessage(m.chat, { react: { text: '', key: m.key }})
  }
}
handler.help = ['twitter'].map(v => v + ' *<url>*')
handler.tags = ['downloader']

handler.command = /^twitter$/i
handler.limit = true
handler.group = false

module.exports = handler