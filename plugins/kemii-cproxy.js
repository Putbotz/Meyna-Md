/*
  *  Script By Kemii
  *  Forbidden to share and delete my wm
  *  Facebook : kemii.houkii
  *  Github : dcodekemii
  *  Telegram : t.me/dcodekemi
  *  Breach : Kemii
  *  WhatsApp : wa.me/628816609112
*/

let handler = async (m, { conn, usedPrefix, command, args }) => {
  if (!text) return m.reply(`• *Example :* ${usedPrefix + command} 100`)
  await conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})
  
  try {
    let result = await generate(text);
    fs.writeFileSync('./tmp/proxy', result)
    await conn.sendMessage(m.chat, { document: fs.readFileSync('./tmp/proxy'), mimetype: 'text/plain', fileName: `proxy.txt` }, { quoted: m })
    await conn.sendMessage(m.chat, { react: { text: '', key: m.key }})
  } catch (error) {
    await conn.reply(m.chat, `Terjadi kesalahan: ${error.message}`, m);
  }
}

handler.tags = ["owner"]
handler.help = ["cproxy *<text>*"]
handler.command = ["cproxy"]

handler.register = true
handler.owner = true
handler.limit = 10

module.exports = handler

async function generate(amount){
    var proxies = ""

    for (let i = 0; i < amount; i++) {
        var proxy = "";
        var proxyPort = Math.floor(Math.random() * 65535) + 1;
    
        if(!proxies.length){
            proxies = `${Math.floor(Math.random() * 255) + 1}.${Math.floor(Math.random() * 255) + 1}.${Math.floor(Math.random() * 255) + 1}:${proxyPort}`
        }else{
            proxies += `\n${Math.floor(Math.random() * 255) + 1}.${Math.floor(Math.random() * 255) + 1}.${Math.floor(Math.random() * 255) + 1}:${proxyPort}`
        }
    }

    return proxies;
}