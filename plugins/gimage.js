const { googleImage }  =require('@bochilteam/scraper')
let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return conn.reply(m.chat, `• *Example :* ${usedPrefix}${command} Minecraft`, m)
    conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})
    try {
    const res = await googleImage(text)
    let image = pickRandom(res)
    let link = image
    const { generateWAMessageFromContent, proto, prepareWAMessageMedia } = require("@whiskeysockets/baileys") 
let msg = generateWAMessageFromContent(m.chat, {
  viewOnceMessage: {
    message: {
        "messageContextInfo": {
          "deviceListMetadata": {},
          "deviceListMetadataVersion": 2
        },
        interactiveMessage: proto.Message.InteractiveMessage.create({
          body: proto.Message.InteractiveMessage.Body.create({
            text: "Donee"
          }),
          footer: proto.Message.InteractiveMessage.Footer.create({
            text: 'DCODEKEMII'
          }),
          header: proto.Message.InteractiveMessage.Header.create({
            hasMediaAttachment: true,...(await prepareWAMessageMedia({ image: { url: link } }, { upload: conn.waUploadToServer }))
          }),
          nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
            buttons: [
              {
                "name": "quick_reply",
                "buttonParamsJson": `{"display_text":"Lanjut","id": ".${command} ${text}"}`
              }
           ],
          })
        })
    }
  }
}, { userJid: m.chat, quoted: m })
conn.relayMessage(msg.key.remoteJid, msg.message, { messageId: msg.key.id })
} catch (e) {
conn.reply(m.chat, `Haii @${m.sender.replace(/@.+/g, '')}, saat ini fitur *${usedPrefix}${command}* sedang coldown silahkan coba dalam beberapa saat lagi.`, m)
}
}
handler.help = ['gimage *<text>*', 'image *<text>*']
handler.tags = ['internet']
handler.command = /^(gimage|image)$/i

module.exports = handler
handler.premium = false

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}
