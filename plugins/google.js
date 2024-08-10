/*
  *  Script By Kemii
  *  Forbidden to share and delete my wm
  *  Facebook : kemii.houkii
  *  Github : dcodekemii
  *  Telegram : t.me/dcodekemi
  *  Breach : Kemii
  *  WhatsApp : wa.me/628816609112
*/

let fetch = require('node-fetch')
let googleIt = require('google-it')
let handler = async (m, { conn, command, text}) => {
  if (!text) return conn.reply(m.chat, '• *Example :* .google Bot Whatsapp', m)
  conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})
  let url = 'https://google.com/search?q=' + encodeURIComponent(text)
  let search = await googleIt({ query: text })
  let msg = search.map(({ title, link, snippet}) => {
    return `*${title}*\n_${link}_\n_${snippet}_`
  }).join`\n\n`
    let ss = await sshp(url)
    await conn.sendFile(m.chat, ss, 'screenshot.png', msg, m)
}
handler.help = ['google'].map(v => v + ' *<text>*')
handler.tags = ['internet']
handler.command = /^google?$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.limit = true

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler

async function sshp(url = "", full = false, type = "phone") {
  type = type.toLowerCase();
  if (!["desktop", "tablet", "phone"].includes(type)) type = "desktop";
  let form = new URLSearchParams();
  form.append("url", url);
  form.append("device", type);
  if (!!full) form.append("full", "on");
  form.append("cacheLimit", 0);
  let res = await axios({
    url: "https://www.screenshotmachine.com/capture.php",
    method: "post",
    data: form,
  });
  let cookies = res.headers["set-cookie"];
  let buffer = await axios({
    url: "https://www.screenshotmachine.com/" + res.data.link,
    headers: {
      cookie: cookies.join(""),
    },
    responseType: "arraybuffer",
  });
  return Buffer.from(buffer.data);
}