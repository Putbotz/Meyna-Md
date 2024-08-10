/*
  *  Script By Kemii
  *  Forbidden to share and delete my wm
  *  Facebook : kemii.houkii
  *  Github : dcodekemii
  *  Telegram : t.me/dcodekemi
  *  Breach : Kemii
  *  WhatsApp : wa.me/628816609112
*/

let handler = async(m, { conn, usedPrefix, command, text }) => {
   if (!text) return m.reply(`• *Example :* ${usedPrefix + command} Namamu siapa?`);
   await conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }});
   
   let result = await luminai(text);
   await conn.reply(m.chat, result, m);
   await conn.sendMessage(m.chat, { react: { text: '', key: m.key }});
}

handler.tags = ["ai"]
handler.help = ["luminai *<text>*"]
handler.command = ["luminai"]

handler.register = true
handler.limit = 5

module.exports = handler

async function luminai(prompt) {
  try {
    const response = await axios.post('https://luminai.siputzx.my.id/', {
      content: prompt
    }, {
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json'
      }
    });
    return response.data.result;
  } catch (error) {
    console.error(error);
  }
}