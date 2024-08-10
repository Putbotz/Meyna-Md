const uploadImage = require("../lib/uploadFile")
let handler = async (m, {
	conn,
	args,
	usedPrefix,
	command
}) => {
	let text
	if (args.length >= 1) {
		text = args.slice(0).join(" ")
	} else if (m.quoted && m.quoted.text) {
		text = m.quoted.text
	} else return m.reply("• *Example:* .gemini selamat pagi")
	await m.react('🕒')
	let q = m.quoted ? m.quoted : m
	let mime = (q.msg || q).mimetype || ""
	if (!mime) {
			let res = await gemini(text)
			await conn.sendMessage(m.chat, {
            text: res.reply,
            contextInfo: {
            externalAdReply: {
            title: 'GEMINI-PRO / VISION',
            thumbnailUrl: 'https://telegra.ph/file/4bae3d5130aabcbe94588.jpg',
            sourceUrl: 'https://gemini.google.com',
            mediaType: 1,
            renderLargerThumbnail: true
            }}}, {quoted: m})
			
	} else {
		let media = await q.download()
		let isTele = /image\/(png|jpe?g)/.test(mime)
		let link = await uploadImage(media)
		let res = await geminivisi(text, link)
		await conn.sendMessage(m.chat, {
        text: res.result,
        contextInfo: {
        externalAdReply: {
        title: 'GEMINI-PRO / VISION',
        thumbnailUrl: link,
        sourceUrl: 'https://gemini.google.com',
        mediaType: 1,
        renderLargerThumbnail: true
        }}}, {quoted: m})
	    
}
  }
handler.help = ["gemini"].map(a => a + " *<text>*")
handler.tags = ["ai"]
handler.command = /^(gemini)$/i
handler.premium = false
handler.register = true
module.exports = handler

async function gemini(txt) {
    try {
        var api = await axios.get(`https://hercai.onrender.com/gemini/hercai?question=${encodeURIComponent(txt)}`, {
            headers: {
                "content-type": "application/json",
            },
        })
        return api.data;
    } catch (e) {
    console.log(e)
}
}

async function geminivisi(text, url) {
let hasil = await Func.fetchJson(`https://itzpire.com/ai/gemini-ai?q=${text}&url=${url}`)
return hasil
}