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
    if (!mime) return conn.reply(m.chat, 'Send/Reply Images with the caption *.gemini-vision*', m)
    await conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})
    let media = await q.download()
    let url = await uploadImage(media)
    try {
    let kemii = await Func.fetchJson(`https://api.neoxr.eu/api/gemini-vision?image=${url}&lang=id&apikey=${global.neoapi}`)
    await conn.sendFile(m.chat, kemii.data.image, '', kemii.data.description, m)
    } catch (e) {
    conn.reply(m.chat, `Haii @${m.sender.replace(/@.+/g, '')}, saat ini fitur *${usedPrefix}${command}* sedang coldown silahkan coba dalam beberapa saat lagi.`, m)
    }
}
handler.help = ["gemini-vision *<image>*"]
handler.tags = ["ai"]
handler.command = /^(gemini-vision|gemvisi)$/i
handler.limit = true
handler.premium = true
handler.register = true

module.exports = handler;
