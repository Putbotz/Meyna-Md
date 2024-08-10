let { Client } = require('ssh2');

let handler = async (m, { conn, text, args }) => {
conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})
try {
const steps = [
"bash <(curl -s https://pterodactyl-installer.se)",
"0",
"dcodekemii",
"dcodekemii",
"Asia/Jakarta",
"dcodekemii@admin.account",
"dcodekemii@admin.account",
"admin",
"admin",
"admin",
"dcodekemii.dcodekemii.com",
"y",
"y",
"y",
"y",
"y",
"yes",
"A",
"c",
"y"
];

const conn = new Client()

conn.on('ready', () => {
console.log('Client :: ready');
conn.shell((err, stream) => {
if (err) throw err;

let currentStep = 0;

stream.on('close', () => {
console.log('Stream :: close');
conn.end();
}).on('data', (data) => {
const response = data.toString('utf8').trim();

if (response.includes('(yes/no)')) {
stream.write(`${steps[currentStep]}\n`);
} else {
m.reply(response)
}

currentStep++;

if (currentStep === steps.length) {
stream.write('exit\n');
}
});
});
}).connect({
host: '',
port: 22,
username: '',
password: ''
});
m.reply('Sedang menjalankan instalasi Pterodactyl Panel...')
} catch (e) {
console.error(e);
return m.reply('Terjadi kesalahan dalam menjalankan permintaan Anda.')
}
}
handler.tags = ['ssh']
handler.command = handler.help = ['installpanel']
handler.owner = true
module.exports = handler