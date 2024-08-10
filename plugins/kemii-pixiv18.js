let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return conn.reply(m.chat, `• *Example :* ${usedPrefix}${command} dog`, m)
    conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})
    const res = await Func.fetchJson(`https://api.onesytex.my.id/api/pixiv-r18?query=${text}`)
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
            text: res.result[0].title
          }),
          footer: proto.Message.InteractiveMessage.Footer.create({
          }),
          header: proto.Message.InteractiveMessage.Header.create({
            hasMediaAttachment: true,...(await prepareWAMessageMedia({ image: { url: res.result[0].urls.regular } }, { upload: conn.waUploadToServer }))
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
}, {})

await conn.relayMessage(msg.key.remoteJid, msg.message, {
  messageId: msg.key.id
})
}
handler.help = ['pixiv18']
handler.tags = ['anime','nsfw']
handler.command = /^(pixiv18)$/i

module.exports = handler
handler.premium = false

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}
