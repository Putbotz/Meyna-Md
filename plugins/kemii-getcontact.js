// Kemii Cantik
// Jum, 31 Mei - 20.57

let { generateWAMessageFromContent, proto, prepareWAMessageMedia } = require("@whiskeysockets/baileys")

let handler = async(m, { conn, usedPrefix, text, command }) => {
  if (command === 'getcontact') {
  if (!text) return conn.reply(m.chat, `• *Example :* ${usedPrefix + command} 628816609112`, m)
  await m.react('🕒')
  let data = await Func.fetchJson(`https://deandra-api.my.id/lookup-no?no=${text}&key=cassaster`)
  let capt = `Name : ${data.getcontact.name}\n`
  let txt = `> Provider : ${data.getcontact.provider}\n`
  txt += `> Country : ${data.getcontact.country}\n`  
  let msg = generateWAMessageFromContent(m.chat, {
  viewOnceMessage: {
  message: {
  "messageContextInfo": {
  "deviceListMetadata": {},
  "deviceListMetadataVersion": 2
  },
  interactiveMessage: proto.Message.InteractiveMessage.create({
  body: proto.Message.InteractiveMessage.Body.create({
  text: txt
  }),
  footer: proto.Message.InteractiveMessage.Footer.create({
  text: footer
  }),
  header: proto.Message.InteractiveMessage.Header.create({
  title: capt,
  hasMediaAttachment: true,...(await prepareWAMessageMedia({ image: { url: data.getcontact.picture } }, { upload: conn.waUploadToServer }))
  }),
  nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
  buttons: [
  {
  "name": "quick_reply",
  "buttonParamsJson": `{"display_text":"Views Tags","id": ".lihattags ${text}"}`
  }
  ],
  })
  })
  }
  }
  }, { userJid: m.chat, quoted: m })
  await conn.relayMessage(msg.key.remoteJid, msg.message, { messageId: msg.key.id })
  await m.react('')
  } else if (command === 'lihattags') {
  if(!text) return
  await m.react('🕒')
  let data = await Func.fetchJson(`https://deandra-api.my.id/lookup-no?no=${text}&key=cassaster`)
  let capt = `${data.getcontact.tags.length ? data.getcontact.tags.sort().map(v => `${v}`).join('\n') : 'No tags'}`
  await conn.reply(m.chat, capt, m)
  await m.react('')
  }
  }

handler.command = ["getcontact","lihattags"]
handler.tags = ["premium","hengker"]
handler.help = ["getcontact *<text>*"]

handler.premium = true
handler.register = true

module.exports = handler