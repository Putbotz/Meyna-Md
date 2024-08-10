let handler = m => m

handler.before = async function(m) {
if (!m.isGroup) return
if (m.isBaileys) return
try {
let body = m.text
if(!body.includes("@628816609112")) return
return conn.sendImageAsSticker(m.chat, 'https://telegra.ph/file/2efd555593a215b321e00.png', m, { packname: `Ig : dcodekemii`})
} catch(e) {}
	}
	
module.exports = handler