let baileys = require("@whiskeysockets/baileys")
let { useMultiFileAuthState, DisconnectReason, makeInMemoryStore, jidNormalizedUser, makeCacheableSignalKeyStore, PHONENUMBER_MCC } = baileys
let { Boom } = require("@hapi/boom")
let { createCanvas } = require("canvas");
let NodeCache = require("node-cache")
let Pino = require("pino")
let simple = require('../lib/simple')
let fs = require('fs')

if (global.conns instanceof Array) console.log()
else global.conns = []

let handler = async (m, { conn, args, usedPrefix, command, isOwner, text }) => {
if (conn.user.jid !== global.conn.user.jid) return conn.reply(m.chat, '```Perintah ini hanya dapat digunakan di bot utama:```' + '\n```wa.me/```' + '```' + global.conn.user.jid.split`@`[0] + '```' + '```?text=.jadibot```', m)
await m.react('🕒')
let conns = global.conn
let user = global.db.data.users[m.sender]

    let authFile = 'plugins/jadibot/'+m.sender.split("@")[0];
    let isInit = !fs.existsSync(authFile)
    let { state, saveCreds} = await useMultiFileAuthState(authFile)
    let msgRetryCounterCache = new NodeCache() 
    
    const config = {
    logger: Pino({ level: "fatal" }).child({ level: "fatal" }),
    printQRInTerminal: false,
    mobile: false,
    auth: {
    creds: state.creds,
    keys: makeCacheableSignalKeyStore(state.keys, Pino({ level: "fatal" }).child({ level: "fatal" })),
    },
    browser: ["Ubuntu","Chrome","20.0.04"],
    markOnlineOnConnect: true,
    generateHighQualityLinkPreview: true,
    msgRetryCounterCache,
    defaultQueryTimeoutMs: undefined
    }
    conn = simple.makeWASocket(config)
    let ev = conn.ev
    
     if (!conn.authState.creds.registered) {
      setTimeout(async () => {
         let phoneNumber = m.sender.split("@")[0];
         let code = await conn.requestPairingCode(phoneNumber)
         let hasilcode = code?.match(/.{1,4}/g)?.join("-") || code
         let image = await canvas(hasilcode)
         let capt = `Enter the code in the image above to become a temporary bot.

*How To Install*
1. Enter the *linked device*
2. Click *link device*
3. Click enter *with phone number only*
4. Enter your *code*"

Your code will *expire* in *20* seconds`
         await conns.sendFile(m.chat, image, '', capt, m);
      }, 3000)
   }
        
    async function connectionUpdate(update) {
    const { connection, lastDisconnect } = update
    if (connection == 'open') {
    conns.reply(text + '@s.whatsapp.net', '```✅ Tersambung```', m)
    await m.react('')
    global.conns.push(conn)
    }
    if (lastDisconnect && lastDisconnect.error && lastDisconnect.error.output && lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut) {
    reloadHandler(true)
    }
   }
    reloadHandler = function (restatConn) {
    let Handler = require('../handler')
    let handler = require('../handler')
    if (Object.keys(Handler || {}).length) handler = Handler
    if (restatConn) {
    try { conn.ws.close() } catch { }
    conn = {
      ...conn, ...simple.makeWASocket(config)
     }
   }
   if (!isInit) {
     conn.ev.off('messages.upsert', conn.handler)
     conn.ev.off('group-participants.update', conn.onParticipantsUpdate)
     conn.ev.off('connection.update', conn.connectionUpdate)
     conn.ev.off('creds.update', conn.credsUpdate)
   }

   conn.welcome = 'Hai, @user!\nSelamat datang di grup *@subject*\n\n@desc'
   conn.bye = 'Selamat tinggal @user!'
   conn.spromote = '@user sekarang admin!'
   conn.sdemote = '@user sekarang bukan admin!'
   conn.handler = handler.handler.bind(conn)
   conn.onParticipantsUpdate = handler.participantsUpdate.bind(conn)
   conn.connectionUpdate = connectionUpdate.bind(conn)
   conn.credsUpdate = saveCreds.bind(conn)

   conn.ev.on('messages.upsert', conn.handler)
   conn.ev.on('group-participants.update', conn.onParticipantsUpdate)
   conn.ev.on('connection.update', conn.connectionUpdate)
   conn.ev.on('creds.update', conn.credsUpdate)
   isInit = false
   return true
 }
 reloadHandler()
}
handler.help = ['jadibot *<number>*']
handler.tags = ['jadibot']
handler.command = /^jadibot$/i
handler.premium = true
handler.limit = true
handler.owner = false
handler.private = false
module.exports = handler

async function canvas(text) {
const canvasWidth = 2560;
const canvasHeight = 1440;

// Membuat canvas
const canvas = createCanvas(canvasWidth, canvasHeight);
const ctx = canvas.getContext("2d");

// Menggambar background hitam
ctx.fillStyle = "#000";
ctx.fillRect(0, 0, canvasWidth, canvasHeight);

// Menggambar teks di tengah gambar (sedikit lebih besar)
const textCenter = text
ctx.font = "bold 250px Arial"; // Ukuran teks di tengah menjadi 200px
ctx.fillStyle = "#fff";
ctx.textAlign = "center";
ctx.textBaseline = "middle";
ctx.fillText(textCenter, canvasWidth / 2, canvasHeight / 2);

// Menggambar teks di tengah bawah (lebih kecil)
const textBottom = '@dcodekemii';
ctx.font = "bold 60px Arial"; // Ukuran teks di bawah menjadi 50px
ctx.fillStyle = "#fff";
ctx.textAlign = "center"; // Teks di tengah
ctx.textBaseline = "bottom"; // Teks di bawah
ctx.fillText(textBottom, canvasWidth / 2, canvasHeight - 50); // Menyesuaikan posisi agar tidak terlalu dekat dengan tepi

// Mengirimkan hasil gambar
const buffer = canvas.toBuffer();
return buffer
}