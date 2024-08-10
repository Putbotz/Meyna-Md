/*
  *  Script By Kemii
  *  Forbidden to share and delete my wm
  *  Facebook : kemii.houkii
  *  Github : dcodekemii
  *  Telegram : t.me/dcodekemi
  *  Breach : Kemii
  *  WhatsApp : wa.me/628816609112
*/

const Baileys = require("@whiskeysockets/baileys")

let handler = async(m, { conn, usedPrefix, command, text }) => {
   if(!text) return m.reply(`• *Example :* ${usedPrefix + command} Jatibarang`)
   await conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})
   let result = await Func.fetchJson(`https://nominatim.openstreetmap.org/search?q=${text}&format=json&limit=1`)
   
   let msg = await Baileys.generateWAMessageFromContent(m.chat, { locationMessage: {
   degreesLatitude: result[0].lat,
   degreesLongitude: result[0].lon,
   name: result[0].display_name,
   isLive: true,
   accuracyInMeters: 0,
   speedInMps: 0,
   degreesClockwiseFromMagneticNorth: 2,
   comment: ''
   }}, { quoted: m })
   await conn.relayMessage(m.chat, msg.message, {})
   
   await conn.sendMessage(m.chat, { react: { text: '', key: m.key }})
   
}

handler.tags = ["internet"]
handler.help = ["locations *<text>*"]
handler.command = ["locations","maps"]

handler.register = true

module.exports = handler