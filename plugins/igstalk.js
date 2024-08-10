let fetch = require('node-fetch')

let handler = async (m, { conn, text, usedPrefix, command }) => {
	if (!text) return conn.reply(m.chat, `• *Example :* ${usedPrefix + command} dcodekemii`, m)
	let kemii = await fetch(`https://api.lolhuman.xyz/api/stalkig/${text}?apikey=${global.lolkey}`)
	let hasil = await kemii.json()
	let ya = await hasil.result
	let teks = 'Ig Stalk\n\n'
	teks += '```Username:```' + ` ${ya.username}\n`
	teks += '```Fullname:```' + ` ${ya.fullname}\n`
	teks += '```Post:```' + ` ${ya.posts}\n`
	teks += '```Followers:```' + ` ${ya.followers}\n`
	teks += '```Following:```' + ` ${ya.following}\n`
	teks += '```Bio:```' + ` ${ya.bio}`
	await conn.sendFile(m.chat, ya.photo_profile, '', teks, m)
}
handler.help = ['igstalk *<text>*']
handler.tags = ['stalking']
handler.command = /^(igstalk)$/i
handler.limit = true
handler.register = true
module.exports = handler