let axios = require('axios')
let uploadImage = require('../lib/uploadImage.js')

let handler = async (m, {
    command,
    usedPrefix,
    conn,
    text,
    args
}) => {
    
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (!mime) return conn.reply(m.chat, 'Send/Reply Images with the caption *.jadianime*', m)
    let media = await q.download()
    let url = await uploadImage(media)
    try {
    await conn.sendMessage(m.chat, {
		react: {
			text: '🕒',
			key: m.key,
		}
	})
    let image = await Func.fetchJson(`https://aemt.me/toanime?url=${url}`)
    await conn.sendFile(m.chat, image.url, '', '', m)
    await m.react('')
    } catch (e) {
    m.reply('Kontol')
    }
}
handler.help = ["jadianime *<image>*"]
handler.tags = ["convert"]
handler.command = /^(jadianime)$/i
handler.limit = true
module.exports = handler;
