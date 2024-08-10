var fetch = require("node-fetch")
var { generateWAMessageFromContent, proto, prepareWAMessageMedia } = require("@whiskeysockets/baileys")

var handler = async (m, { conn, text, usedPrefix, command }) => {
  if (command === 'film') {
  if (!text) return conn.reply(m.chat, `• *Example :* ${usedPrefix + command} avatar`, m)
  conn.sendMessage(m.chat, { react: { text: "🕒", key: m.key } });
  let kemii = await film(text)  
  let sections = [{
  rows: []
  }]
  for(let i of kemii.data) {
  sections[0].rows.push({
  header: i.title,
  title: `Rating: ${i.rating}`, 
  description: `${i.synopsis}`, 
  id: `.filmdetail ${i.url}`
  }) 
  }
  let listMessage = {
  title: 'Click here!', 
  sections
  };
  let msg = generateWAMessageFromContent(m.chat, {
  viewOnceMessage: {
  message: {
  "messageContextInfo": {
  "deviceListMetadata": {},
  "deviceListMetadataVersion": 2
  },
  interactiveMessage: proto.Message.InteractiveMessage.create({
  body: proto.Message.InteractiveMessage.Body.create({
  }),
  footer: proto.Message.InteractiveMessage.Footer.create({
  text: 'Powered By _ICSF Team_'
  }),
  header: proto.Message.InteractiveMessage.Header.create({
  title: 'Pilih Film Di Bawah Ini!',
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
  }, { userJid: m.chat, quoted: m })
  conn.relayMessage(msg.key.remoteJid, msg.message, { messageId: msg.key.id })
  } else if (command === 'filmdetail') {
  if (!text) return
  conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})
  let salsa = await filmdetail(text)
  let teks = '```Genre:```' + ` ${salsa.data.genre}\n`
  teks += '```Director:```' + ` ${salsa.data.director}\n`
  teks += '```Actors:```' + ` ${salsa.data.actors}\n`
  teks += '```Country:```' + ` ${salsa.data.country}\n`
  teks += '```Duration:```' + ` ${salsa.data.duration}\n`
  teks += '```Ranting:```' + ` ${salsa.data.ratings}`
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
  title: salsa.data.title,
  hasMediaAttachment: true,...(await prepareWAMessageMedia({ image: { url: salsa.data.thumbnail } }, { upload: conn.waUploadToServer }))
  }),
  nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
  buttons: [
  {
  name: "cta_url",
  buttonParamsJson: `{"display_text":"Streaming Here!","url":"${salsa.data.streaming[0].url}","merchant_url":"${salsa.data.streaming[0].url}"}`
  },
  {
  name: "cta_url",
  buttonParamsJson: `{"display_text":"Download Here!","url":"${salsa.data.download[0].url}","merchant_url":"${salsa.data.download[0].url}"}`
  }
  ],
  })
  })
  }
  }
  }, { userJid: m.chat, quoted: m })
  conn.relayMessage(msg.key.remoteJid, msg.message, { messageId: msg.key.id })
  }
}

handler.help = ['film *<text>*']
handler.tags = ['search']

handler.command = ["film","filmdetail"]
handler.premium = false
handler.register = true
handler.limit = true

module.exports = handler

async function filmdetail(url) {
let api = await Func.fetchJson(`https://api.alyachan.dev/api/filmget?url=${url}&apikey=${alyapi}`)
return api
}
async function film(text) {
let api = await Func.fetchJson(`https://api.alyachan.dev/api/film?q=${text}&apikey=${alyapi}`)
return api
}