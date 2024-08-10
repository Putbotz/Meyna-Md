let uploadImage = require('../lib/uploadImage.js')
let { sticker } = require('../lib/sticker.js')

let handler = async (m, { conn, text, command }) => {
let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (!mime) return conn.reply(m.chat, `Send/Reply Images with the caption *.${command}*`, m)
    let media = await q.download()
    let url = await uploadImage(media)
    await conn.sendMessage(m.chat, {
		react: {
			text: '🕒',
			key: m.key,
		}
	})
	let scircle = `https://some-random-api.com/canvas/misc/circle?avatar=${url}`
    let stiker = await sticker(null, scircle, 'Ig : @dcodekemii')
    await conn.sendFile(m.chat, stiker, 'sticker.webp', '', m, { asSticker: true })
    await m.react('')
}
handler.tags = ["sticker"]
handler.help = ["scircle *<image>*"]
handler.command = /^scircle|scr$/i
module.exports = handler;