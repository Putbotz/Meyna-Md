var fetch = require('node-fetch');
var handler = async (m, {
 text, 
 usedPrefix, 
 command
 }) => {
if (!text) return conn.reply(m.chat, `• *Example :* .aicode buatkan function delay`, m)
  let kemii = await conn.reply(m.chat, '```Sedang mencari jawaban...🔍```', m)
  var hasil = await Func.fetchJson(`https://api.alyachan.dev/api/ai-code?text=${text}&action=js&apikey=${alyapi}`)
  await conn.sendMessage(m.chat, { text: hasil.data.code, edit: kemii })
}      
handler.command = /^aicode$/i
handler.help = ['aicode *<text>*']
handler.tags = ['ai'];
handler.premium = false
handler.register = true
module.exports = handler;