var fetch = require("node-fetch")

var handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return conn.reply(m.chat, `• *Example :* ${usedPrefix + command} <link>`, m)
  conn.sendMessage(m.chat, { react: { text: "🕒", key: m.key } });
  let kemii = await filmdetail(text)
  let teks = '```Genre:```' + ` ${kemii.data.genre}\n`
  teks += '```Director:```' + ` ${kemii.data.director}\n`
  teks += '```Actors:```' + ` ${kemii.data.actors}\n`
  teks += '```Country:```' + ` ${kemii.data.country}\n`
  teks += '```Duration:```' + ` ${kemii.data.duration}\n`
  teks += '```Ranting:```' + ` ${kemii.data.ratings}`
  let { generateWAMessageFromContent, proto, prepareWAMessageMedia } = require("@whiskeysockets/baileys") 
  let msg = generateWAMessageFromContent(m.chat, {
  viewOnceMessage: {
  message: {
  "messageContextInfo": {
  "deviceListMetadata": {},
  "deviceListMetadataVersion": 2
  },
  interactiveMessage: proto.Message.InteractiveMessage.create({
  body: proto.Message.InteractiveMessage.Body.create({
  text: teks
  }),
  footer: proto.Message.InteractiveMessage.Footer.create({
  text: 'Powered By _ICSF Team_'
  }),
  header: proto.Message.InteractiveMessage.Header.create({
  title: kemii.data.title,
  hasMediaAttachment: true,...(await prepareWAMessageMedia({ image: { url: kemii.data.thumbnail } }, { upload: conn.waUploadToServer }))
  }),
  nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
  buttons: [
  {
  name: "cta_url",
  buttonParamsJson: `{"display_text":"Streaming Here!","url":"${kemii.data.streaming[0].url}","merchant_url":"${kemii.data.streaming[0].url}"}`
  },
  {
  name: "cta_url",
  buttonParamsJson: `{"display_text":"Download Here!","url":"${kemii.data.download[0].url}","merchant_url":"${kemii.data.download[0].url}"}`
  }
  ],
  })
  })
  }
  }
}, { userJid: m.chat, quoted: m })
conn.relayMessage(msg.key.remoteJid, msg.message, { messageId: msg.key.id })
}

handler.command = /^(filmdetail)$/i

module.exports = handler

async function filmdetail(url) {
let api = await Func.fetchJson(`https://api.alyachan.dev/api/filmget?url=${url}&apikey=${alyapi}`)
return api
}