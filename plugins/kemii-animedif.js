/*
  *  Script By Kemii
  *  Forbidden to share and delete my wm
  *  Facebook : kemii.houkii
  *  Github : dcodekemii
  *  Telegram : t.me/dcodekemi
  *  Breach : Kemii
  *  WhatsApp : wa.me/628816609112
*/

let handler = async (m, { conn, text, usedPrefix, command }) => {  
  if (!text) throw `• *Example :* ${usedPrefix}${command} anime`;  
  await conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }});
  try {
    let api = await Animedif(text);
    await conn.sendFile(m.chat, api, '', text, m);
    await m.react('');
  } catch (e) {
    await m.reply(String(e));
    await conn.sendMessage(m.chat, { react: { text: '', key: m.key }});
  }
};

handler.tags = ['ai'];
handler.help = ['animediff *<text>*'];
handler.command = /^(animediff|wibudiff|animedif|wibudif)$/i;
handler.limit = true;
handler.register = true;

module.exports = handler;

async function Animedif(data) {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/Ojimi/anime-kawai-diffusion",
    {
      headers: { Authorization: "Bearer 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" },
      method: "POST",
      body: JSON.stringify(data),
    }
  );

  const result = await response.blob();
  let arrayBuffer = await result.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer, 'base64');
  return buffer;
}