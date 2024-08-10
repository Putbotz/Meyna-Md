/*
  *  Script By Kemii
  *  Forbidden to share and delete my wm
  *  Facebook : kemii.houkii
  *  Github : dcodekemii
  *  Telegram : t.me/dcodekemi
  *  Breach : Kemii
  *  WhatsApp : wa.me/628816609112
*/

let handler = async(m, { conn }) => {

await conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }});
let result = await ceksaldo()
await m.reply(result)
await conn.sendMessage(m.chat, { react: { text: '', key: m.key }})

}

handler.tags = ["owner"]
handler.help = ["ceksaldo"]
handler.command = ["ceksaldo","saldo"]

handler.owner = true

module.exports = handler

async function ceksaldo() {
let api = await Func.fetchJson(`https://h2h.okeconnect.com/trx/balance?memberID=${process.env.ORKUT_ID}&pin=${process.env.ORKUT_PIN}&password=${process.env.ORKUT_PASSWORD}`)
return api
}