// Kemii Cantik
// Kam, 6 Jun - 13.23

let handler = async (m, { conn, usedPrefix, command, text }) => {
conn.location = conn.location ? conn.location : {}

if (command == 'pergi') {

let capt = '🗺️ Berikut adalah daftar lokasi yang bisa kamu tuju:\n\n'
capt += '1. `Pangkalan`\n'
capt += '2. `Rumah`\n'
capt += '3. `Supermarket`\n'
capt += '4. `MasJid`\n'
capt += '5. `Gereja`\n\n'
capt += 'Silahkan kirim nomer lokasi yang anda tuju dengan reply pesan ini.'
let key = await conn.sendAliasMessage(m.chat, { text: capt }, [{ alias: "1", response: ".setlocation Pangkalan" }, { alias: "2", response: ".setlocation Rumah" }, { alias: "3", response: `.setlocation Supermarket` }, { alias: '4', response: `.setlocation MasJid`}, { alias: '5', response: `.setlocation Gereja`}], m)
conn.location[m.sender] = key

} else if (command == 'setlocation') {

if (!text) return
// Response ketika lokasi sudah kamu tuju
if (users.location === text) {
return m.reply(`Kamu sudah berada di ${text}!`)
}
// Response ketika lokasi berhasil kamu tuju
users.location = text
await conn.sendMessage(m.chat, { delete: conn.location[m.sender] })
await delete conn.location[m.sender]
await m.reply(`Selamat datang di ${text} 😘`)
}
}

handler.command = ["pergi","setlocation"]
handler.help = ["pergi"]
handler.tags = ["rpg"]
handler.register = true

module.exports = handler