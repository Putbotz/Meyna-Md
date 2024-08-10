const qs = require('qs');

let handler = async (m, { conn, text, usedPrefix, command }) => {
	if (!text) return conn.reply(m.chat, '• *Example :* .pindl https://i.pinimg.com/xxxx', m)
	await conn.sendMessage(m.chat, { react: { text: "🕒", key: m.key } });
	let api = await expertsphp(text)
    if (api.endsWith(".jpg")) {
    await conn.sendMessage(m.chat, { image: { url: api }}, { quoted: m })
    await m.react('')
    } else {
	await conn.sendMessage(m.chat, { video: { url: api }}, { quoted: m })
	await m.react('')
	}
}
handler.help = ['pindl'].map(v => v + ' *<url>*')
handler.tags = ['downloader']
handler.command = /^(pindl)$/i

module.exports = handler

async function expertsphp(url) {
    try {
        const response = await axios.post("https://www.expertsphp.com/download.php", qs.stringify({ url: url }), { headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }});
        const $ = cheerio.load(response.data);
        const downloadLink = $('a[download]').attr('href');
        return downloadLink;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}