/*
 *  Script By Kemii
 *  Forbidden to share and delete my wm
 *  Facebook : kemii.houkii
 *  Github : dcodekemii
 *  Telegram : t.me/dcodekemi
 *  Breach : Kemii
 *  WhatsApp : wa.me/628816609112
 */

const FormData = require('form-data');
let handler = async (m, { conn, usedPrefix, command }) => {
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || '';
    if (!mime) return conn.reply(m.chat, `Send/Reply Images with the caption *${usedPrefix + command}*`, m);
    await conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key } });
    let media = await q.download();
    let exip = await exif(media);
    let result = await formatExifData(exip);
    await m.reply(`${result}`.trim());
    await conn.sendMessage(m.chat, { react: { text: '', key: m.key } });
}

handler.tags = ["internet"];
handler.help = ["exif *<image>*"];
handler.command = ["exif"];

handler.register = true;
handler.limit = 10;

module.exports = handler;

async function exif(buffer) {
    try {
        const form = new FormData();
        form.append('upfile', buffer, {
            filename: 'image.jpg',
            contentType: 'image/jpeg'
        });
        form.append('submit', 'Upload File');

        const headers = {
            ...form.getHeaders(),
            'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36'
        };

        const response = await axios.post('https://exif.tools/upload.php', form, { headers });

        const $ = cheerio.load(response.data);
        const result = {};
        
        $('table.table > tbody > tr').each((i, e) => {
            result[$(e).find('td').eq(0).text().toLowerCase().replace(/ /gi, '_')] = $(e).find('td').eq(1).text();
        });

        return result;
    } catch (error) {
        return error;
    }
}

async function formatExifData(data) {
    let formattedData = '';
    for (const [key, value] of Object.entries(data)) {
        formattedData += `${key} : ${value}\n`;
    }
    return formattedData;
}