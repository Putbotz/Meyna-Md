let axios = require("axios");
let fetch = require('node-fetch');

let handler = async (m, { conn, args, text, usedPrefix, command, isROwner }) => {
let user = global.db.data.users[m.sender]
let username = user.name;

switch (command) {
case 'smm-profile':{
if (!isROwner) {
global.dfail('rowner', m, conn)
throw false
}
let key = new URLSearchParams()
key.append("api_id", medanid)
key.append("api_key", medan)
fetch("https://api.medanpedia.co.id/profile", {
method: "POST",
body: key,
redirect: 'follow'
})
.then(response => response.json())
.then(res => {
let teks = `*PROFILE - SMM*\n\n`
teks += '```Username : ```' + `${res.data.username}\n`
teks += '```Balance Smm : ```' + `${res.data.balance}\n\n`
teks += `Powered by : medanpedia.co.id`
m.reply(teks)
})
}
break
case 'smm-list':{
let key = new URLSearchParams()
key.append("api_id", medanid)
key.append("api_key", medan)
key.append("service_fav", "true")
fetch("https://api.medanpedia.co.id/services", {
method: "POST",
body: key,
redirect: 'follow'
})
.then(response => response.json())
.then(res => {
let teks = `*SUNTIK - SMM*\n\n`
for (let i of res.data) {
teks += '```ID : ```' + `${i.id}\n`
teks += '```Category : ```' + `${i.category}\n`
teks += '```Name : ```' + `${i.name}\n`
teks += '```Harga : ```' + `Rp ${toRupiah(i.price)}\n`
teks += '```Min Pesanan : ```' + `${toRupiah(i.min)}\n`
teks += '```Max Pesanan : ```' + `${toRupiah(i.max)}\n`
teks += '```Description : ```' + `${i.description}\n\n`
}
m.reply(`${teks}\nPowered by : medanpedia.co.id`)
})
}
break
case 'smm-order':{
if (user.saldo < 1) {
return conn.reply(m.chat, `Hello *${username}* sepertinya saldo kamu Rp${toRupiah(user.saldo)}, silahkan deposit dahulu sebelum melakukan topup.`, m)
}
let [kodep, idp, kem] = text.split `,`
if (!kodep) return m.reply(`• *Example :* ${usedPrefix}smmorder Id,Link,Jumlah`)
if (!idp) return m.reply(`• *Example :* ${usedPrefix}smmorder Id,Link,Jumlah`)
if (!kem) return m.reply(`• *Example :* ${usedPrefix}smmorder Id,Link,Jumlah`)
conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})
let key = new URLSearchParams()
key.append("api_id", medanid)
key.append("api_key", medan)
key.append("service", kodep)
key.append("taget", idp)
key.append("quantity", kem)
fetch("https://api.medanpedia.co.id/order", {
method: "POST",
body: key,
redirect: 'follow'
})
.then(response => response.json())
.then(res => {
let teks = `*PROSES - SMM*\n\n`
teks += '```ID : ```' + `${res.data.id}\n`
teks += '```Harga : ```' + `Rp ${toRupiah(res.data.price)}\n\n`
teks += `Powered by : medanpedia.co.id`
m.reply(teks)
global.db.data.users[m.sender].saldo -= res.data.price
})
}
break
case 'smmcek':{
if (!text) return m.reply(`• *Example :* ${usedPrefix}smmcek id transaksi`)
conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})
let key = new URLSearchParams()
key.append("api_id", medanid)
key.append("api_key", medan)
key.append("id", text)
fetch("https://api.medanpedia.co.id/order", {
method: "POST",
body: key,
redirect: 'follow'
})
.then(response => response.json())
.then(res => {
if (res.data.status === "Success") {
let teks = `*STATUS - SUCCESS*\n\n`
teks += '```ID : ```' + `${res.data.id}\n`
teks += '```Status : ```' + `${res.data.status}\n`
teks += '```Start Count : ```' + `${res.data.start_count}\n\n`
teks += `Powered by : medanpedia.co.id`
m.reply(teks)
} else if (res.data.status === "Error") {
let teks = `*STATUS - ERROR*\n\n`
teks += '```ID : ```' + `${res.data.id}\n`
teks += '```Status : ```' + `${res.data.status}\n\n`
teks += `Powered by : medanpedia.co.id`
m.reply(teks)
}
})
}
break
}
}
handler.help = [
"smm-list",
"smm-profile",
"smm-order",
"smm-cek"
]
handler.command = /^(smm-profile|smm-list|smm-order|smm-cek)$/i  
handler.tags = ['smm']
handler.limit = false
handler.owner = false
module.exports = handler

function toRupiah(angka) {
var saldo = '';
var angkarev = angka.toString().split('').reverse().join('');
for (var i = 0; i < angkarev.length; i++)
if (i % 3 == 0) saldo += angkarev.substr(i, 3) + '.';
return '' + saldo.split('', saldo.length - 1).reverse().join('');
}
