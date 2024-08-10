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
    if (!mime) return conn.reply(m.chat, 'Send/Reply Images with the caption *.google-lens*', m)
    await conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})
    let salsa = await m.reply('_Searching Image...._')
    let media = await q.download()
    let url = await uploadImage(media)
    let kemii = await Func.fetchJson(`https://api.neoxr.eu/api/google-lens?image=${url}&apikey=${global.neoapi}`)
    await conn.sendMessage(m.chat, { delete: salsa })
    for (let i of kemii.data) {
    let teks = '```Url:```' + ` ${i.action_url}\n`
    teks += '```Label:```' + ` ${i.image_label}`
    await conn.sendFile(m.chat, i.image_link, '', teks, m)
    }
   }
handler.help = ["google-lens *<image>*"]
handler.tags = ["premium"]
handler.command = /^(google-lens|lens)$/i
handler.limit = true
handler.premium = true
handler.register = true

module.exports = handler;
