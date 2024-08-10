const { readFileSync } = require('fs')

let handler = async (m, { usedPrefix, command, text, conn }) => {
    if (conn.user.jid !== global.conn.user.jid) return
    let ar = Object.keys(plugins)
    let ar1 = ar.map(v => v.replace('.js', ''))
    if (!text) return conn.reply(m.chat, `• *Example :* ${usedPrefix + command} kemii-menu`, m)
    if (!ar1.includes(text)) return conn.reply(m.chat, `'${text}' tidak ditemukan!\n\n${ar1.map(v => ' ' + v).join`\n`}`, m)
    let kemii = readFileSync('./plugins/' + text + '.js', 'utf-8')
    await conn.reply(m.chat, kemii, m)
}
handler.help = ['getplugin'].map(v => v + ' *<teks>*')
handler.tags = ['owner']
handler.command = /^(getplugin|gp)$/i

handler.owner = true

module.exports = handler