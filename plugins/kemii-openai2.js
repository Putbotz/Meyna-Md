/*
  *  Script By Kemii
  *  Forbidden to share and delete my wm
  *  Facebook : kemii.houkii
  *  Github : dcodekemii
  *  Telegram : t.me/dcodekemi
  *  Breach : Kemii
  *  WhatsApp : wa.me/628816609112
*/

var handler = async (m, {
 text, 
 conn,
 usedPrefix, 
 command
 }) => {
if (!text) return conn.reply(m.chat, `• *Example :* ${usedPrefix + command} Siapa presiden Indonesia? `, m)
  let kemii = await conn.reply(m.chat, '```Sedang mencari jawaban...🔍```', m)
  var api = await openai2(text)
  await conn.sendMessage(m.chat, { text: '```' + `${api.data}` + '```', edit: kemii })
}      
handler.command = /^ai2$/i
handler.help = ['ai2 *<text>*']
handler.tags = ['ai'];
handler.premium = false
module.exports = handler;

async function openai2(text) {
let api = await Func.fetchJson(`https://cdn.kenshinaru.my.id/api/ai/gpt-4?text=${text}&apikey=sweety`)
return api
}