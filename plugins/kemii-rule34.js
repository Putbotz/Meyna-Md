/*
  * Script By Kemii
  * Forbidden to share and delete my wm
  * Facebook : kemii.houkii
  * Github : dcodekemii
  * Telegram : t.me/dcodekemi
  * Breach : Kemii
  * WhatsApp : wa.me/628816609112
*/

let handler = async (m, { conn, usedPrefix, command, text }) => {
  if (!text) return m.reply(`• *Example :* ${usedPrefix + command} frieren`);
  
  await conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key } });
  
  try {
    let result = await Func.fetchJson(`https://api.fumifumi.xyz/api/rule34?query=${text}`);
    let img = result.data.response;
    
    await conn.sendFile(m.chat, img.imageUrls[0].image, '', img.imageUrls[0].title, m)
      .then(() => conn.sendMessage(m.chat, { react: { text: '', key: m.key } }));
    
    await conn.sendFile(m.chat, img.imageUrls[1].image, '', img.imageUrls[1].title, m)
      .then(() => conn.sendMessage(m.chat, { react: { text: '', key: m.key } }));
  } catch (e) {
    await m.reply(String(e));
    await conn.sendMessage(m.chat, { react: { text: '', key: m.key } });
  }
}

handler.tags = ["premium", "search"];
handler.help = ["rule34 *<text>*"];
handler.command = ["rule34"];

handler.premium = true;
handler.register = true;

module.exports = handler;