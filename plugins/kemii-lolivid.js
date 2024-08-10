let handler = async(m, { conn }) => {
await conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})
conn.sendMessage(m.chat, {
video: {url: 'https://api.junn4.my.id/anime/lolivid'},
gifPlayback: true
}, {quoted: m})
}
handler.command = ["lolivid"]
handler.tags = ["anime"]
handler.help = ["lolivid"]
module.exports = handler