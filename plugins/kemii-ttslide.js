let fetch = require('node-fetch')

let handler = async(m, { conn, text, usedPrefix, command }) => {
	if (!text) throw `• *Example :* ${usedPrefix + command} https://vt.tiktok.com/ZS81qJD5v/`
	await conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})
	if (!(text.includes('http://') || text.includes('https://'))) return m.reply(`url invalid, please input a valid url. Try with add http:// or https://`)
	if (!text.includes('tiktok.com')) return m.reply(`Invalid Tiktok URL.`)
	try {
		let res = await fetch(`https://aemt.me/download/tiktokslide?url=${text}`)
		let anu = await res.json()
		anu = anu.result.images
		let duwa = await res.json()
		let title = duwa.result.title
		let c = 0
		for (let x of anu) {
			if (c == 0) await conn.sendMessage(m.chat, { image: { url: x }, caption: ``}, { quoted : m })
			else await conn.sendMessage(m.sender, { image: { url: x } }, { quoted : m })
			c += 1
		}
	} catch (e) {
		console.log(e)
		throw `invalid slideshow url / media isn't available.`
	}
}

handler.help = ['tiktokslide','ttslide','slide'].map(v => v + ' *<url>*')
handler.command = /^(tiktokslide|ttslide|slide)$/i
handler.tags = ['downloader'];
handler.limit = true;
handler.group = false;
handler.premium = false;
handler.owner = false;
handler.admin = false;
handler.botAdmin = false;
handler.fail = null;
handler.private = false;

module.exports = handler