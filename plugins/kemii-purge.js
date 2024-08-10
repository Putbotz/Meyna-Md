// Kemii Cantik
// Sel, 25 Jun - 12.28

let handler = async(m, { conn, text, usedPrefix, command }) => {
	if(isNaN(parseInt(text))) return m.reply(`• *Example :* ${usedPrefix+command} 10`) 
	if(parseInt(text) > 100) return m.reply("Maksimal 100!") 
	for(let v of store.messages[m.chat].array.slice(parseInt("-"+text) ).reverse()) {
await conn.sendMessage(m.chat, { delete: v.key }) 
await sleep(200) 
}
	};
	
handler.command = ["purge"]
handler.help = ["purge *<amount>*"]
handler.tags = ["group"]
handler.group = true;
handler.admin = true;

module.exports = handler;

async function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
	}