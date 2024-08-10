/*
  * Script By Kemii
  * Forbidden to share and delete my wm
  * Facebook: kemii.houkii
  * Github: dcodekemii
  * Telegram: t.me/dcodekemi
  * Breach: Kemii
  * WhatsApp: wa.me/628816609112
*/

let handler = async (m, { conn, usedPrefix, command }) => {
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || '';
    if (!mime) return conn.reply(m.chat, `Send/Reply Images with the caption *${usedPrefix + command}*`, m);    
    await conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key } });
    let media = await q.download();
    let url = await upload(media);
    
    try {
        let result = await Func.fetchJson(`https://dikaardnt.com/api/search/pornface?url=${url}`);
        await conn.sendFile(m.chat, result.results[0].actor_photo.full, '', result.results[0].actor_photo.source_id, m);
        await conn.sendMessage(m.chat, { react: { text: '', key: m.key } });
    } catch (error) {
        await m.reply(String(error))
        await conn.sendMessage(m.chat, { react: { text: '', key: m.key }})
    }
};

handler.tags = ["premium"];
handler.help = ["pornface *<image>*"];
handler.command = ["pornface"];

handler.premium = true;
handler.register = true;

module.exports = handler;