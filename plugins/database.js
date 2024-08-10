// Kemii Cantik
// Kam, 23 Mei - 01.03

let handler = async (m, { usedPrefix, command, conn, text }) => {
let mentionedJid = [m.sender]
let name = conn.getName(m.sender)

let totalreg = Object.keys(global.db.data.users).length
let group = Object.entries(conn.chats).filter(([jid, chat]) => jid.endsWith('@g.us') && chat.isChats && !chat.metadata?.read_only && !chat.metadata?.announce).map(v => v[0])

let kemii = '```Total Users :```\n'
kemii += `> _${toRupiah(totalreg)} People_\n\n`
kemii += '```Total Groups :```\n'
kemii += `> _${toRupiah(group.length)} Groups_`
m.reply(`${kemii}`.trim())
}
handler.help = ['database']
handler.tags = ['info']
handler.command = /^(pengguna|(jumlah)?database|user)$/i

module.exports = handler

function toRupiah(angka) {
var saldo = '';
var angkarev = angka.toString().split('').reverse().join('');
for (var i = 0; i < angkarev.length; i++)
if (i % 3 == 0) saldo += angkarev.substr(i, 3) + '.';
return '' + saldo.split('', saldo.length - 1).reverse().join('');
}