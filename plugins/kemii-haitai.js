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
if (!text) return m.reply(`• *Example :* ${usedPrefix + command} Hallo`)
await conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})
let scrape = await hatAi(text)
await conn.reply(m.chat, scrape.trim(), m)
await conn.sendMessage(m.chat, { react: { text: '', key: m.key }})
}

handler.tags = ["ai"]
handler.help = ["hatai *<text>*"]
handler.command = ["hatai"]

handler.register = true
handler.limit = 5

module.exports = handler

async function hatAi(question) {
  const url = 'https://hat.baby/api/getSources';
  const requestData = {
    question: question
  };

  try {
    const response = await axios.post(url, requestData, {
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    const sources = response.data.map(source => `${source.name}: ${source.url}`).join('\n');
    return `${sources}`;
  } catch (error) {
    console.error(error.message);
    return 'duar';
  }
}