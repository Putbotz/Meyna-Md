let uploadImage = require('../lib/uploadImage.js')

let handler = async (m, { conn, usedPrefix, command, args }) => {
    conn.faceswap = conn.faceswap ? conn.faceswap : {}
    if (!conn.faceswap[m.sender]) return conn.reply(m.chat, `Kamu belum memiliki source image, silahkan set terlebih dahulu dengan mengetik *.setface*`, m)
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (!mime) return conn.reply(m.chat, `Send/Reply Images with the caption *${usedPrefix + command}*`, m)
    await m.react('🕒')
    let media = await q.download()
    let url = await uploadImage(media)
    let options = {
    method: 'POST',
    url: 'https://faceswap-image-transformation-api.p.rapidapi.com/faceswap',
    params: {
    TargetImageUrl: url,
    SourceImageUrl: conn.faceswap[m.sender]
    },
    headers: {
    'content-type': 'application/json',
    'X-RapidAPI-Key': '4e9b890638msh63a8e761e5b59cbp1839bejsn5ac13ae5cda8',
    'X-RapidAPI-Host': 'faceswap-image-transformation-api.p.rapidapi.com'
    },
    data: {
    TargetImageUrl: url,
    SourceImageUrl: conn.faceswap[m.sender]
    }
    }
    let { data } = await axios.request(options)
    let text = '```Message:```' + ` ${data.Message}\n`
    text += '```ProcessingTime:```' + ` ${data.ProcessingTime}`
    await conn.sendFile(m.chat, data.ResultImageUrl, '', text.trim(), m)
    
}
handler.help = ["faceswap *<image>*"]
handler.tags = ["convert","ai"]
handler.command = /^(faceswap)$/i
handler.limit = true
handler.register = true
module.exports = handler;