const fetch = require("node-fetch")
const Baileys = require("@whiskeysockets/baileys")

let handler  = async (m, { conn }) => {

 let pp = 'https://tinyurl.com/24u64tky'
  try {
    pp = await conn.profilePictureUrl(m.sender, 'image')
  } catch (e) {
  }

let msg = await Baileys.generateWAMessageFromContent(m.chat, { locationMessage: {
  degreesLatitude: 0,
  degreesLongitude: 0,
  name: '𝚁𝚙𝚐 𝙱𝚘𝚝 𝚆𝚑𝚊𝚝𝚜𝚊𝚙𝚙',
  address: 'TegalSec',
  url: 'https://github.com/dcode-kemii',
  isLive: true,
  accuracyInMeters: 0,
  speedInMps: 0,
  degreesClockwiseFromMagneticNorth: 2,
  comment: '',
  jpegThumbnail: await( await fetch(pp)).buffer()
}}, { quoted: m })

return conn.relayMessage(m.chat, msg.message, {})
}

handler.command = /^loc$/
handler.owner = true
module.exports = handler