// Kemii Cantik
// Jum, 31 Mei - 15.29

let handler = async (m, { conn, usedPrefix, command, args }) => {
let now = new Date() * 1
let package = [
{
id: '1H',
name: 'PREMIUM 1 JAM',
price: 100,
duration: 3600000 * 1
}, {
id: '5H',
name: 'PREMIUM 5 JAM',
price: 300,
duration: 3600000 * 5
}, {
id: '10H',
name: 'PREMIUM 10 JAM',
price: 450,
duration: 3600000 * 10
}, {
id: '12H',
name: 'PREMIUM 12 JAM',
price: 500,
duration: 3600000 * 12
}, {
id: '1D',
name: 'PREMIUM 1 DAY',
price: 1000,
duration: 86400000 * 1
}, {
id: '3D',
name: 'PREMIUM 3 DAY',
price: 2500,
duration: 86400000 * 3
}, {
id: '7D',
name: 'PREMIUM 7 DAY',
price: 3500,
duration: 86400000 * 7
}, {
id: '15D',
name: 'PREMIUM 15 DAY',
price: 5000,
duration: 86400000 * 15
}, {
id: '30D',
name: 'PREMIUM 30 DAY',
price: 10000,
duration: 86400000 * 30
}, {
id: '60D',
name: 'PREMIUM 60 DAY',
price: 20000,
duration: 86400000 * 60
}
]
let capt = 'Daftar PAKET PREMIUM:\n\n'
package.map((v) => {
capt += '`' + `${v.name}` + '`\n'
capt += `> Price: Rp. ${Func.formatter(v.price)}\n`
capt += `> Command: ${usedPrefix + command} ${v.id} @tag\n\n`
})
if (m.quoted) {
if (!args || !args[0]) return conn.reply(m.chat, `${capt}`.trim(), m)
let pkg = package.find(v => v.id == (args[0]).toUpperCase())
if (!pkg) return conn.reply(m.chat, Func.texted('bold', `Paket tidak ditemukan.`), m)
let target = conn.decodeJid(m.quoted.sender)
if (target == m.sender) return conn.reply(m.chat, Func.texted('bold', `Gabisa Gift premium ke diri sendiri, kalo mau ketik buyprem.`), m)
if (Number(pkg.price) > users.saldo) return conn.reply(m.chat, Func.texted('bold', `Saldo Kamu tidak cukup untuk melakukan gift paket premium.`), m)
let targer = global.db.data.users[target]
targer.premiumDate = targer.premium ? (pkg.duration) : (now + pkg.duration)
users.saldo -= Number(pkg.price)
targer.premium = true
conn.reply(m.chat, Func.texted('bold', `Berhasil memberi ${pkg.name} paket kepada @${target.replace(/@.+/g, '')} seharga Rp. ${Func.formatter(pkg.price)}`), m)
} else if (m.mentionedJid.length != 0) {
if (!args || args.length < 2) return conn.reply(m.chat, `${capt}`.trim(), m)
let pkg = package.find(v => v.id == (args[0]).toUpperCase())
if (!pkg) return conn.reply(m.chat, Func.texted('bold', `Paket tidak ditemukan.`), m)
let target = conn.decodeJid(m.mentionedJid[0])
if (target == m.sender) return conn.reply(m.chat, Func.texted('bold', `Gabisa Gift premium ke diri sendiri, kalo mau ketik buyprem.`), m)
if (Number(pkg.price) > users.saldo) return conn.reply(m.chat, Func.texted('bold', `Saldo Kamu tidak cukup untuk melakukan gift paket premium.`), m)
let targer = global.db.data.users[target]
targer.premiumDate = targer.premium ? (pkg.duration) : (now + pkg.duration)
users.saldo -= Number(pkg.price)
targer.premium = true
conn.reply(m.chat, Func.texted('bold', `Berhasil memberi ${pkg.name} paket kepada @${target.replace(/@.+/g, '')} seharga Rp. ${Func.formatter(pkg.price)}`), m)
} else {
let teks = `• *Example :*\n\n`
teks += `${usedPrefix + command} 30d @0\n`
teks += `${usedPrefix + command} 30d reply target`
conn.reply(m.chat, teks, m)
}
}
handler.command = ["giftprem"]
handler.help = ["giftprem *@tag*"]
handler.tags = ["group"]
handler.group = true
module.exports = handler