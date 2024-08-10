// Kemii Cantik
// Sen, 17 Jun

let handler = async (m, { conn, text, usedPrefix, command }) => {
	if (!text) return conn.reply(m.chat,  `• *Example :* ${usedPrefix + command} 12345678`, m)
	await m.react('🕒')
	let kemii = await Func.fetchJson(`https://www.public.freefireinfo.site/api/info/sg/${text}?key=Kemii`)
    if (kemii["Equipped Items"] && kemii["Equipped Items"]["profile"] && kemii["Equipped Items"]["profile"]["Equipped Skills"]) {
    delete kemii["Equipped Items"]["profile"]["Equipped Skills"];
    }
	await conn.reply(m.chat, `${Func.jsonFormat(kemii)}`, m)
	await m.react('')
}
handler.help = ['ffstalk *<text>*']
handler.tags = ['stalking']
handler.command = /^(ffstalk)$/i
handler.limit = true

module.exports = handler