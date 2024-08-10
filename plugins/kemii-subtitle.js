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
    if (!text) {
        return m.reply(`• *Example :* ${usedPrefix + command} https://www.youtube.com/live/xxx`);
    }
    
    let result = await subtitle(text);

    let capt = `${result.title}\n\n`;
    capt += `Durasi : ${result.duration}\n`;
    capt += `Uploader : ${result.uploader}\n\n`;
    capt += `Tunggu document txt sedang dikirim.`;

    let q = await conn.sendFile(m.chat, result.thumbnail, '', capt, m);
    await conn.sendMessage(m.chat, {
        document: { url: result.url[0].vtt },
        mimetype: 'text/plain',
        fileName: result.title
    }, { quoted: q });
}

handler.tags = ["downloader"];
handler.help = ["subtitle *<text>*"];
handler.command = ["subtitle"];

handler.register = true;
handler.limit = 5;

module.exports = handler;

async function subtitle(url) {
    let api = await Func.fetchJson(`https://dikaardnt.com/api/download/subtitle?url=${url}`);
    return api;
}