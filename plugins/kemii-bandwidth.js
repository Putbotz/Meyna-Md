/*
  *  Script By Kemii
  *  Forbidden to share and delete my wm
  *  Facebook : kemii.houkii
  *  Github : dcodekemii
  *  Telegram : t.me/dcodekemi
  *  Breach : Kemii
  *  WhatsApp : wa.me/628816609112
*/

const speedTest = require('speedtest-net');

let handler = async (m, { conn, usedPrefix, command }) => {
   let result = await speedTest({ acceptLicense: true, acceptGdpr: true });

   let uploadSpeed = (result.upload.bandwidth / 125000).toFixed(2);
   let downloadSpeed = (result.download.bandwidth / 125000).toFixed(2);
   
   let capt = '```SpeedTest Api```\n\n'
   capt += `\`\`\`- Upload : ${uploadSpeed} Mbps\`\`\`\n`
   capt += `\`\`\`- Download : ${downloadSpeed} Mbps\`\`\``
   await conn.reply(m.chat, capt, m)
   
};

handler.tags = ["internet"]
handler.help = ["bandwidth"]
handler.command = ["bandwidth"]

module.exports = handler