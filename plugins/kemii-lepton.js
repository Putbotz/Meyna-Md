// Kemii Cantik
// Sen, 24 Jun - 16.53

let handler = async(m, { conn, usedPrefix, command, text }) => {
if (!text) return conn.reply(m.chat, `• *Example :* ${usedPrefix + command} Hello`, m)
await m.react('🕒')
let apiURL = 'https://apisku.biz.id/api/gpt/lepton';
let options = {
method: 'POST',
headers: {
'accept': '*/*',
'api_key': 'free',
'Content-Type': 'application/json'
},
body: JSON.stringify({
'text': text
})
};
fetch(apiURL, options)
.then(response => response.json())
.then(result => {
if (result.status) {
let hasil = result.data
conn.reply(m.chat, hasil, m).then(() => m.react(''))
} else {
conn.reply(m.chat, `Error: ${result.data}`, m).then(() => m.react('❌'))
}
})
}
handler.tags = ["ai"]
handler.help = ["lepton *<text>*"]
handler.command = ["lepton"]
handler.register = true
handler.limit = 5

module.exports = handler