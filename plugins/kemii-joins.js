let fetch = require('node-fetch')
let handler = async (m, {
    conn,
    text,
    command,
    usedPrefix,
    isOwner
}) => {
if (!text) return conn.reply(m.chat, '• *Example :* .joins https://chat.whatsapp.com/xxxxx', m)
let sections = [{
rows: [{
title: '7 Days',
description: `7 Days Expired ( Sewa Bot )`, 
id: `${usedPrefix}addsewa ${text} 7`
},
{
title: '15 Days',
description: `15 Days Expired ( Sewa Bot )`, 
id: `${usedPrefix}addsewa ${text} 15`
},
{
title: '30 Days',
description: `30 Days Expired ( Sewa Bot )`, 
id: `${usedPrefix}addsewa ${text} 30`
},
{
title: 'Permanent',
description: `No Expired Rent ( Sewa Bot )`,
id: `${usedPrefix}join ${text}`
}]
}]

let listMessage = {
    title: 'Time Expired!', 
    sections
};
//throw listMessage.sections[0].rows
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
        	isForwarded: true, 
	        forwardedNewsletterMessageInfo: {
			newsletterJid: '120363144038483540@newsletter',
			newsletterName: 'Powered By : dcodekemii', 
			serverMessageId: -1
		},
	businessMessageForwardInfo: { businessOwnerJid: conn.decodeJid(conn.user.id) },
	forwardingScore: 256,
            externalAdReply: {  
                title: 'DCODEKEMII', 
                thumbnailUrl: 'https://telegra.ph/file/a6f3ef42e42efcf542950.jpg', 
                sourceUrl: 'https://youtube.com/shorts/eHM3CMiAQ9Y?si=sqJQ1gyRAnptIK0m',
                mediaType: 2,
                renderLargerThumbnail: false
            }
          }, 
          body: proto.Message.InteractiveMessage.Body.create({
            text: `Pilih Waktu Di Bawah.`
          }),
          footer: proto.Message.InteractiveMessage.Footer.create({
            text: 'Powered By _ICSF Team_'
          }),
          header: proto.Message.InteractiveMessage.Header.create({
            title: `*Hello, @${m.sender.replace(/@.+/g, '')}!*`,
            subtitle: "Kemii",
            hasMediaAttachment: false
          }),
          nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
            buttons: [
              {
                "name": "single_select",
                "buttonParamsJson": JSON.stringify(listMessage) 
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
handler.tags = ['owner']
handler.help = ['joins *<link>*']
handler.command = /^(joins)$/i
handler.owner = true

module.exports = handler
