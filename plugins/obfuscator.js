const JavaScriptObfuscator = require('javascript-obfuscator')

let handler = async (m, { conn, args, command, usedPrefix }) => {
let text
  if (args.length >= 1) {
     text = args.slice(0).join(" ")
  } else if (m.quoted && m.quoted.text) {
     text = m.quoted.text
  } else throw `• *Example :* ${usedPrefix + command} console.log('Kemii')`
  await conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})
  let res = JavaScriptObfuscator.obfuscate(text)
  fs.writeFileSync('./tmp/enc', res.getObfuscatedCode())
  await conn.sendMessage(m.chat, { document: fs.readFileSync('./tmp/enc'), mimetype: 'application/javascript', fileName: `encrypt.js` }, { quoted: m })
  await conn.sendMessage(m.chat, { react: { text: '', key: m.key }})
}
handler.help = ['encrypt *<text>*']
handler.tags = ['tools']
handler.command = /^enc(rypt)?$/i

module.exports = handler