let { MessageType } = require('@whiskeysockets/baileys')
let PhoneNumber = require('awesome-phonenumber')
let handler = async (m, { conn, usedPrefix, text, args, command }) => {
      let vcard = `BEGIN:VCARD\nVERSION:3.0\nN:WhatsApp; Kemii\nORG:Kemii\nTITLE:soft\nitem1.TEL;waid=${nomorown}:${nomorown}\nitem1.X-ABLabel:Ponsel\nitem2.URL:http://github.com/decode-kemii\nitem2.X-ABLabel:💬 More\nitem3.EMAIL;type=INTERNET:dcode.kemii@gmail.com\nitem3.X-ABLabel:Email\nitem4.ADR:;;Indonesia;;;;\nitem4.X-ABADR:💬 More\nitem4.X-ABLabel:Lokasi\nEND:VCARD`;
      const sentMsg = await conn.sendMessage(
    m.chat,
    {
      contacts: {
        displayName: wm,
        contacts: [{ vcard }],
      },
    },
    { quoted: m },
  );
}
handler.help = ['owner']
handler.tags = ['info']

handler.command = /^(owner)$/i

module.exports = handler