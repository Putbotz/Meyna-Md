var { generateWAMessageFromContent, proto, prepareWAMessageMedia, extractImageThumb } = require("@whiskeysockets/baileys")
var PDFDocument = require("pdfkit") 

var handler = async (m, { conn, text, usedPrefix, command }) => {
  if (command === 'komik') {
  if (!text) return conn.reply(m.chat, `• *Example :* ${usedPrefix + command} tensei`, m)
  await conn.sendMessage(m.chat, { react: { text: "🕒", key: m.key } });
  try {
  let kemii = await komik(text)  
  let sections = [{
  rows: []
  }]
  for(let i of kemii.data) {
  sections[0].rows.push({
  header: i.title,
  title: `${i.terbaru}`, 
  description: `${i.description}`, 
  id: `.komikdetail ${i.url}`
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
  text: `Showing search results for : “${text}”`
  }),
  footer: proto.Message.InteractiveMessage.Footer.create({
  text: footer
  }),
  header: proto.Message.InteractiveMessage.Header.create({
  title: 'Powered By Kemii',
  hasMediaAttachment: true,...(await prepareWAMessageMedia({ image: { url: 'https://telegra.ph/file/f7ec74f769c65af1f2aca.jpg'} }, { upload: conn.waUploadToServer }))
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
  await conn.relayMessage(msg.key.remoteJid, msg.message, { messageId: msg.key.id })
  await m.react('')
  } catch (e) {
  await conn.reply(m.chat, `❌ Komik *${text}* tidak ditemukan.`.trim(), m)
  await m.react('')
  }
  } else if (command === 'komikdetail') {
  if (!text) return
  await conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})
  let salsa = await komikdetail(text)
  let result = salsa.data.metadata
  let keem = await komik(result.judul_komik)
  let txt = `\`\`\`- Title: ${result.judul_komik}\`\`\`\n`
  txt += `\`\`\`- Type: ${result.jenis_komik}\`\`\`\n`
  txt += `\`\`\`- Pengarang: ${result.pengarang}\`\`\`\n`
  txt += `\`\`\`- Konsep: ${result.konsep_cerita}\`\`\`\n`
  txt += `\`\`\`- Chapter: ${result.terbaru}\n\`\`\``
  txt += `\`\`\`- Status: ${result.status}\`\`\``
  let sections = [{
  rows: []
  }]
  for(let i of salsa.data.chapters) {
  sections[0].rows.push({
  header: `${i.chapter}`,
  title: `${salsa.data.title} - ${i.chapter}`,
  id: `.komikdownload ${i.url}`
  }) 
  }
  let listMessage = {
  title: 'Baca Komik!', 
  sections
  }
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
  }),
  header: proto.Message.InteractiveMessage.Header.create({
  title: salsa.data.title,
  hasMediaAttachment: true,...(await prepareWAMessageMedia({ image: { url: keem.data[0].thumbnail } }, { upload: conn.waUploadToServer }))
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
  await conn.relayMessage(msg.key.remoteJid, msg.message, { messageId: msg.key.id })
  await m.react('')
  } else if (command === 'komikdownload') {
  if (!text) return 
  await conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})
  await m.reply('PDF sedang di kirim 🍟')
  let kemii = await komikdownload(text)
  let imagepdf = await toPDF(kemii.data.images)
  await conn.sendMessage(m.chat, { document: imagepdf, fileName: kemii.data.title + '.pdf', mimetype: 'application/pdf' }, { quoted: m })
  await m.react('')
  }
}

handler.help = ['komik *<text>*']
handler.tags = ['search']

handler.command = ["komik","komikdetail","komikdownload"]
handler.premium = false
handler.register = true
handler.limit = true

module.exports = handler

async function komik(text) {
let api = await Func.fetchJson(`https://api.kenshinaru.my.id/api/komiku-search?text=${text}&apikey=sweety`)
return api
}

async function komikdetail(url) {
let api = await Func.fetchJson(`https://api.kenshinaru.my.id/api/komiku-get?url=${url}&apikey=sweety`)
return api
}

async function komikdownload(url) {
let api = await Func.fetchJson(`https://api.kenshinaru.my.id/api/komiku-detail?url=${url}&apikey=sweety`)
return api
}

async function toPDF(images, opt = {}) {
return new Promise(async (resolve, reject) => {
if (!Array.isArray(images)) images = [images]
let buffs = [], doc = new PDFDocument({
margin: 0, size: 'A4'
})
for (let x = 0; x < images.length; x++) {
if (/.webp|.gif/.test(images[x])) continue
let data = (await axios.get(images[x], { responseType: 'arraybuffer', ...opt })).data
doc.image(data, 0, 0, {
fit: [595.28, 841.89], align: 'center', valign: 'center'
})
if (images.length != x + 1) doc.addPage()
}
doc.on('data', (chunk) => buffs.push(chunk))
doc.on('end', () => resolve(Buffer.concat(buffs)))
doc.on('error', (err) => reject(err))
doc.end()
})
}