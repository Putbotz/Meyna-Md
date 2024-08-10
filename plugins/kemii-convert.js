// Kemii Cantik
// Sab, 15 Jun - 20.52

let handler = async (m, { conn, usedPrefix, command, text }) => {
   let q = m.quoted ? m.quoted : m
   let mime = (q.msg || q).mimetype || ''
   if (!mime) return client.reply(m.chat, `Send/Reply audio with the caption *${usedPrefix + command}*`, m)
   let media = await q.download()
   let url = await uploader.tmpfiles(media)
   let capt = `Styles not exist here available styles:\n\n`
   capt += '1. `Kobo`\n'
   capt += '2. `Zeta`\n'
   capt += '3. `Gura`\n'
   capt += '4. `Kaela`\n'
   capt += '5. `Anya`\n'
   capt += '6. `Miko`\n'
   capt += '7. `Subaru`\n'
   capt += '8. `Reine`\n'
   capt += '9. `Luna`\n\n'
   capt += `• *Example :* ${usedPrefix + command} Kobo`
   if (!text) return conn.reply(m.chat, capt.trim(), m)
   await conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})
   let edit = await conn.reply(m.chat, '*Process is very long, please wait 1 minutes+ !*', m)
   try {
   let api = await Func.fetchJson(`https://itzpire.com/tools/cover-music?character=${text}&url=${url}`)
   await conn.sendMessage(m.chat, { audio: { url: api.result }, ptt: true, mimetype: "audio/mpeg", fileName: "vn.mp3", waveform: [0,3,58,44,35,32,2,4,31,35,44,34,48,13,0,54,49,40,1,44,50,51,16,0,3,40,39,46,3,42,38,44,46,0,0,47,0,0,46,19,20,48,43,49,0,0,39,40,31,18,29,17,25,37,51,22,37,34,19,11,17,12,16,19] }, { quoted: m })
   await m.react('')
   } catch (e) {
   await conn.sendMessage(m.chat, { text: err, edit: edit })
   await m.react('')
   }
}
handler.command = ["convert"]
handler.tags = ["tools"]
handler.help = ["convert *<audio>*"]
handler.register = true
handler.limit = 5
module.exports = handler