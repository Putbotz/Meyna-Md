let handler = async (m, { conn }) => {
  let { generateWAMessageContent, proto, generateWAMessageFromContent } = require("@whiskeysockets/baileys")
        let msg = await generateWAMessageContent({
            video: { url: 'https://telegra.ph/file/2ff6d0005fc4a32f67f65.mp4' }
        }, {
            upload: conn.waUploadToServer
        })
        let ptv = await generateWAMessageFromContent(m.chat, proto.Message.fromObject({ ptvMessage: msg.videoMessage }), { userJid: m.chat, quoted: m, ephemeralExpiration: m.expiration })
       await conn.relayMessage(m.chat, ptv.message, { messageId: ptv.key.id })
}
handler.customPrefix = /^(sepuh|tutor)$/i
handler.command = new RegExp

module.exports = handler