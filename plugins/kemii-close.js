let handler = async (m, { conn, text, usedPrefix, command, args }) => {
let verif = {
key: { 
participant: '0@s.whatsapp.net', 
remoteJid: "0@s.whatsapp.net" }, 
message: {
conversation: "Powered By _ICSF Team_"}
}
const { generateWAMessageFromContent, proto } = require("@whiskeysockets/baileys") 
let msg = generateWAMessageFromContent(m.chat, {
  viewOnceMessage: {
    message: {
        "messageContextInfo": {
          "deviceListMetadata": {},
          "deviceListMetadataVersion": 2
        },
        interactiveMessage: proto.Message.InteractiveMessage.create({
        contextInfo: {
        	mentionedJid: [m.sender], 
        	isForwarded: false,
            externalAdReply: {  
            title: 'DCODEKEMII', 
            thumbnailUrl: 'https://telegra.ph/file/a6f3ef42e42efcf542950.jpg', 
            sourceUrl: 'https://youtube.com/shorts/eHM3CMiAQ9Y?si=sqJQ1gyRAnptIK0m',
            mediaType: 2,
            renderLargerThumbnail: false
            }
          }, 
          body: proto.Message.InteractiveMessage.Body.create({
            text: `Groups Have Been Closed By, @${m.sender.replace(/@.+/g, '')}!`
          }),
          footer: proto.Message.InteractiveMessage.Footer.create({
          }),
          header: proto.Message.InteractiveMessage.Header.create({
            subtitle: "test",
            hasMediaAttachment: false
          }),
          nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
            buttons: [
              {
                "name": "quick_reply",
                "buttonParamsJson": `{\"display_text\":\"Kemii-san 🐼\",\"id\":. owner}`
              }
           ],
          })
        })
    }
  }
}, { quoted: verif })

await conn.relayMessage(msg.key.remoteJid, msg.message, {
  messageId: msg.key.id
})
}
handler.help = ["close"]
handler.tags = ["owner"]
handler.command = ["close"]
handler.register = true
handler.owner = true
handler.group = true

module.exports = handler