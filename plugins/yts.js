let yts = require('yt-search')
let { generateWAMessageFromContent, proto, prepareWAMessageMedia } = require("@whiskeysockets/baileys")
let handler = async (m, { text, usedPrefix, command }) => {
  if (!text) throw '• *Example :* .yts tentang perasaanku'
  await m.react('🕒')
  let search = await (await yts(text)).all
  if (search.length == 0) return sock.reply(m.chat, err, m)
  let mp3 = [],
     mp4 = []
  search.map(v => {
  mp3.push({
  title: v.title,
  id: `${usedPrefix}ytmp3 ${v.url}`,
  description: `[ MP3 – Duration : ${v.timestamp} – Views : ${Func.h2k(Func.formatter(v.views))} ]`
  })
  mp4.push({
  title: v.title,
  id: `${usedPrefix}ytmp4 ${v.url}`,
  description: `[ MP4 – Duration : ${v.timestamp} – Views : ${Func.h2k(Func.formatter(v.views))} ]`
  })
  })
  let listMessage = {
  title: 'Tap Here!', 
  sections: [{
  title: 'DOWNDLOAD MP3 (Audio)', 
  rows: mp3
  }, {
  title: 'DOWNLOAD MP4 (Video)',
  rows: mp4
  }]
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
  text: `Menampilkan hasil pencarian untuk : “${text}”, pilih di bawah ini sesuai format yang Anda inginkan.`
  }),
  footer: proto.Message.InteractiveMessage.Footer.create({
  text: footer
  }),
  header: proto.Message.InteractiveMessage.Header.create({
  title: 'Powered By Kemii',
  hasMediaAttachment: true,...(await prepareWAMessageMedia({ image: { url: 'https://telegra.ph/file/982188a5d8b6c4bc31fec.jpg' } }, { upload: sock.waUploadToServer }))
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
  sock.relayMessage(msg.key.remoteJid, msg.message, { messageId: msg.key.id })
}
handler.help = ['yts *<text>*']
handler.tags = ['search']
handler.command = /^yts(earch)?$/i
handler.limit = true
handler.register = true

module.exports = handler