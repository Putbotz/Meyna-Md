// Kemii Cantik
// Sen, 3 Jun - 15.58

let handler = async (m, { conn, usedPrefix, command }) => {
let kemii = await kripto.assets()
let data = kemii.data
let capt = ''
data.forEach(hasil => {
capt += '`' + `${hasil.asset} - ${hasil.name}` + '`\n\n'
});
await conn.reply(m.chat, `${capt}`.trim(), m);
}

handler.tags = ['crypto']
handler.command = handler.help = ['assets']
handler.owner = true
module.exports = handler