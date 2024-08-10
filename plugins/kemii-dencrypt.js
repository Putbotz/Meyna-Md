/*
  *  Script By Kemii
  *  Forbidden to share and delete my wm
  *  Facebook : kemii.houkii
  *  Github : dcodekemii
  *  Telegram : t.me/dcodekemi
  *  Breach : Kemii
  *  WhatsApp : wa.me/628816609112
*/

const { deobfuscate } = require('obfuscator-io-deobfuscator')

let handler = async (m, { conn, usedPrefix, command, args }) => {
  let text
  if (args.length >= 1) {
     text = args.slice(0).join(" ")
  } else if (m.quoted && m.quoted.text) {
     text = m.quoted.text
  } else throw `• *Example :* ${usedPrefix + command} 0x27`
  await conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})
  
  try {
    let result = await deobfuscate(text);
    fs.writeFileSync('./tmp/denc', result)
    await conn.sendMessage(m.chat, { document: fs.readFileSync('./tmp/denc'), mimetype: 'application/javascript', fileName: `dencrypt.js` }, { quoted: m })
    await conn.sendMessage(m.chat, { react: { text: '', key: m.key }})
  } catch (error) {
    await conn.reply(m.chat, `Terjadi kesalahan saat mendekripsi: ${error.message}`, m);
  }
}

handler.tags = ["internet"]
handler.help = ["dencrypt *<text>*"]
handler.command = ["dencrypt","denc"]

handler.register = true
handler.limit = 10

module.exports = handler