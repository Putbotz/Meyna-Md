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
    if (!mime) return conn.reply(m.chat, 'Send/Reply Images with the caption *.clown2*', m)
    let media = await q.download()
    let url = await uploadImage(media)
    conn.sendMessage(m.chat, {
		react: {
			text: '🕒',
			key: m.key,
		}
	})
    conn.sendFile(m.chat, `https://api.popcat.xyz/clown?image=${url}`, '', done, m)
}
handler.help = ["clown2 *<image>*"]
handler.tags = ["convert"]
handler.command = /^(clown2)$/i
handler.limit = true
handler.register = true
module.exports = handler;