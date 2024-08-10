let fetch = require('node-fetch');

let handler = async (m, { conn, text }) => {
if (!text) throw '• *Example :* .cekakun 5'
try {
let response = await fetch(global.domain + "/api/application/users/" + text, {
method: "GET",
headers: {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + global.apikey,
}
});

let data = await response.json();
         
if (response.ok) {
let userData = data.attributes;

let capt = '*A C O U N T - I N F O*\n\n'
capt += '```User ID:```' + ` ${userData.id}\n`
capt += '```Uuid:```' + ` ${userData.uuid}\n`
capt += '```A2F:```' + ` ${userData['2fa'] ? "Enable" : "Disable"}\n`
capt += '```Is Admin:```' + ` ${userData.root_admin ? "Yes" : "No"}\n`
capt += '```Username:```' + ` ${userData.username}\n`
capt += '```Email:```' + ` ${userData.email}\n`
capt += '```First Name:```' + ` ${userData.first_name}\n`
capt += '```Last Name:```' + ` ${userData.last_name}\n`
capt += '```Language:```' + ` ${userData.language}\n`
capt += '```Create At:```' + ` ${userData.created_at}\n`
capt += '```Update At:```' + ` ${userData.updated_at}\n\n`
capt += cid

conn.reply(m.chat, capt, m);
} else {
return conn.reply(m.chat, `Terjadi kesalahan: ${JSON.stringify(data)}`, m);
}
} catch (e) {
console.error(e);
return conn.reply(m.chat, 'Terjadi kesalahan dalam menjalankan permintaan Anda.', m);
}
}

handler.tags = ['panel']
handler.command = handler.help = ['cekakun']
handler.owner = true
module.exports = handler