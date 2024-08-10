/*
  *  Script By Kemii
  *  Forbidden to share and delete my wm
  *  Facebook : kemii.houkii
  *  Github : dcodekemii
  *  Telegram : t.me/dcodekemi
  *  Breach : Kemii
  *  WhatsApp : wa.me/628816609112
*/

let handler= async (m, { conn, text }) => {
	let bl = global.db.data.blacklist
	let kemii = {
		add: () => {
			if(bl.includes(m.chat)) throw "Chat ini sudah masuk ke blacklist sebelumnya!"
			bl.push(m.chat) 
			m.reply(`Sukses menambahkan "${m.chat}" ke blacklist!`) 
			}, 
		remove: () => {
			if(!bl.includes(m.chat)) throw "Chat ini belum masuk ke blacklist"
			global.db.data.blacklist = bl.filter(item => item !== m.chat);
			m.reply(`Sukses menghapus "${m.chat}" dari blacklist!`) 
			}, 
		list: async () => {
			try {
			if(!bl.length) throw "Belum ada chat yang masuk ke blacklist!"
			let { key } = await conn.sendMessage(m.chat, { text: "Fetching..." }, { quoted: m }) 
			await conn.sendMessage(m.chat, { text: `List blacklist:\n${(await Promise.all(bl.map(async (v, i) => `${i+1}. ${v.endsWith("@g.us") ? (await conn.groupMetadata(v)).subject : conn.getName(v)}`))).join("\n")}`, edit: key}) 
			} catch(e) { m.reply(e.message) }
			}
		}
		if(!text || !Object.keys(nazz).includes(text)) throw `${text ? `Opsi "${text}" tidak di temukan!`:"Masukkan opsi!"} \n\n${Object.keys(nazz).map(v => "*×* " + v).join("\n")}\nContoh\n.blacklist add`
		await kemii[text]() 
	}
	
handler.command = /^(blacklist)$/i
handler.help = ["blacklist"]
handler.tags = ["owner"]
handler.owner = true

module.exports = handler