let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) return conn.reply(m.chat, `• *Example :* ${usedPrefix + command} anime`, m)
await conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})
let scrape = await photoleap(text)
for (let i of scrape) {
await conn.sendFile(m.chat, i, '', '', m)
await m.react('')
}
};
handler.help = ["photoleap *<text>*"]
handler.tags = ["ai"]
handler.command = ["photoleap"]
handler.premium = false
handler.register = true

module.exports = handler

async function photoleap(prompt) {
    try {
        let result = []
        for (let i = 0; i < 4; i++) {
            let {
                data
            } = await axios.get('https://tti.photoleapapp.com/api/v1/generate?prompt=' + prompt);
            result.push(data.result_url)
        }
        return result
    } catch (e) {
        return ({
            msg: 404
        })
    }
}