let fs = require('fs')
let handler = async (m, { text, usedPrefix, command }) => {
    if (!text) return conn.reply(m.chat, `• *Example :* ${usedPrefix + command} menu`, m)
    try {
    if (!m.quoted.text) return conn.reply(m.chat, `🚩 Reply Code Message!`, m)
    let path = `lib/scrape/${text}.js`
    await fs.writeFileSync(path, m.quoted.text)
    conn.reply(m.chat, `🚩 Saved in ${path}`, m)
   } catch (error) {
    console.log(error)
    conn.reply(m.chat, "🚩 Reply Code Message!", m)
  }
}
handler.help = ['addscrape'].map(v => v + ' *<text>*')
handler.tags = ['owner']
handler.command = /^addscrape|scrape$/i

handler.rowner = true
module.exports = handler;