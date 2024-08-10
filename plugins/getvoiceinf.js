const fetch = require('node-fetch')

let handler = async (m, { conn, text, usedPrefix, command, args }) => {  
  conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})
  const url = `https://api.itsrose.life/sovits/get_voice_models`
  fetch(url, {
  headers: {
  'accept': 'application/json',
  'Authorization': global.rose
  },
  })
  .then((response) => response.json())
  .then(data => {
  var resultText = ''
  for (let i = 0; i < data.result.voice_ids.length; i++) {
  var result = data.result.voice_ids[i]
  let index = ''
  var hasil = `${index + 1}` + ' ```Name:```' + ` *${result}*\n`
  resultText += hasil + '\n'
  }
  conn.reply(m.chat, resultText, m)
  })
}

handler.command = /^(getvoiceinf)$/i
handler.limit = true

module.exports = handler