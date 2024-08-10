/*
  *  Script By Kemii
  *  Forbidden to share and delete my wm
  *  Facebook : kemii.houkii
  *  Github : dcodekemii
  *  Telegram : t.me/dcodekemi
  *  Breach : Kemii
  *  WhatsApp : wa.me/628816609112
*/

let handler = async (m, { conn, usedPrefix, command, text }) => {
  if (!text) return m.reply(`• *Example :* ${usedPrefix + command} facebook.com`)
    try {
        const bijipeler = await axios.get(text);
        const asuuu = bijipeler.headers['set-cookie'];
        if (asuuu) {
            const cookies = asuuu.map(cookie => cookie.split(';')[0]).join('; ');
            m.reply(`${cookies}`);
        } else {
            m.reply('Tidak ada cookies yang ditemukan.');
        }
    } catch (error) {
        console.error(error);
        m.reply('Terjadi kesalahan saat mengambil cookies.');
    }
}
handler.command = ["getcokie"]
handler.tags = ["internet"]
handler.help = ["getcokie *<text>*"]
handler.register = true
handler.limit = 50
module.exports = handler