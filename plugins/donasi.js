let qris = 'https://telegra.ph/file/e2432b997b9db8e0fc021.jpg'
let text = '```Bot ini gratis untuk semua dan dapat ditambahkan ke Grup. Namun, jika Anda merasa terbantu dan ingin berkontribusi, donasi sangat diapresiasi. Donasi membantu pemilik menjaga kelangsungan hidup bot dan memastikan berfungsi di masa depan. Terima kasih kepada yang sudah berdonasi. Mohon pertimbangkan untuk berkontribusi agar bot terus beroperasi dan membantu pengguna dengan lebih baik lagi. Terima kasih atas dukungan Anda.```'
let handler = async (m, { conn, args, usedPrefix, command }) => {
  conn.sendMessage(m.chat, {
    react: {
      text: '🕒',
      key: m.key,
    }
  });
const { generateWAMessageFromContent, proto, prepareWAMessageMedia } = require("@whiskeysockets/baileys") 
const messa = await prepareWAMessageMedia({ image: { url: 'https://telegra.ph/file/cceb1752e1df3ec52eb69.jpg' } }, { upload: conn.waUploadToServer })
const catalog = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
"productMessage": {
"product": {
"productImage": messa.imageMessage, 
"productId": "5489299044451325",
"title": `QRIS - SATU UNTUK SEMUA`,
"description": `HALO BANG`,
"currencyCode": "IDR",
"bodyText": 'Hai',
"footerText": 'Kemii',
"priceAmount1000": "5000",
"productImageCount": 1,
"firstImageId": 1,
"salePriceAmount1000": "10000000",
"retailerId": wm,
"url": "http://wa.me/628816609112"
},
"businessOwnerJid": "628816609112@s.whatsapp.net",
}
}), { userJid: m.chat, quoted: m })    

conn.relayMessage(m.chat, catalog.message, { messageId: catalog.key.id })
}
handler.help = ['donasi']
handler.tags = ['main','start']
handler.command = /^(donasi|donate)$/i

handler.limit = true

module.exports = handler