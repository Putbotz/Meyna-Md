let { promises, readFileSync } = require('fs')
let PhoneNumber = require('awesome-phonenumber')
let fetch = require('node-fetch')
let moment = require('moment-timezone');
async function handler(m, { conn, args, text , usedPrefix, command }) {
  conn.buyprem = conn.buyprem ? conn.buyprem : {}
  if(m.sender in conn.buyprem) return conn.reply(m.chat, "Kamu masih melakukan transaksi!", m)

    const cooldown = 5 * (1000 * 60) //coldown timer second
    let user = global.db.data.users[m.sender] //Get db user
    if(!(m.sender in conn.buyprem)) {
      //Caption
    let teks = `Anda akan melakukan pembelian "PREMIUM PLAN" dengan rincian sebagai berikut:\n\n`;
    teks += `• Nomor: ${PhoneNumber('+' + m.sender.split('@')[0]).getNumber('international')}\n`;
    teks += `• Harga: Rp. 5.000,-\n`;
    teks += `• PPN: Rp. 300,-\n\n`;
    teks += `Kirim *Y* untuk melanjutkan proses pembayaran atau kirim *N* untuk membatalkan.`;
    let { key } = await conn.reply(m.chat, teks, m) //SendMessage
    conn.buyprem[m.sender] = {
        sender: m.sender,
        key,
        pesan: conn,
      }
    }
 }

handler.before = async m => {
  conn.buyprem = conn.buyprem ? conn.buyprem : {}
  if(!(m.sender in conn.buyprem)) return
  if(m.isBaileys) return
  let { key, pesan } = conn.buyprem[m.sender]
  let payment = `https://telegra.ph/file/6749ec7c55580aaa7bb41.jpg`
  const cooldown = 5 * (1000 * 60) //coldown timer second
  let user = global.db.data.users[m.sender] //Get db user
  let randomId = Func.randomInt(111111, 999999);

  //Gacha systemBeta
    if(m.text.toLowerCase() == 'y') {
      let teks = `Info Pembayaran\n\n`;
      teks += `Pembayaran sebelum: ${moment().add(12, 'hours').format('DD-MM-YYYY HH:mm')}\n\n`;
      teks += `• ID Pembayaran: ${randomId}\n`;
      teks += `• Total Pembayaran: Rp. 5.300,-\n\n`;
      teks += `Note:\n`;
      teks += `• Kode QR hanya valid untuk 1 kali transfer.\n`;
      teks += `• Setelah pembayaran, tunggu sebentar lalu kirim *check* untuk cek status pembayaran.\n`;
      teks += `• Jika pembayaran berhasil, status akan diperbarui otomatis\n`;
      teks += `• Untuk bantuan lebih lanjut, hubungi *.owner*`;
      let kemii = await conn.sendFile(m.chat, payment, 'order.jpg', `${teks}`, m)
      setTimeout(() => { conn.sendMessage(m.chat, { delete: kemii }); }, 900000); 
    } else if (m.text.toLowerCase() == 'check') {
      let time = moment.tz('Asia/Jakarta').format('HH:mm');
      let requestOptions = {
      method: 'GET',
      redirect: 'follow'
      };
      let response = await fetch(`https://gateway.okeconnect.com/api/mutasi/qris/OK1156153/583791417108436561156153OKCT12F72A0DB3C753E2E4050A1D91DB735C`, requestOptions);
      let result = await response.json();
      let foundData = result.data.find(item => moment(item.date).tz('Asia/Jakarta').format('HH:mm') === time);
      if (!foundData) {
         return conn.reply(m.chat, `Data transaksi tidak ditemukan pada jam *${time}*`, m);
      }
      let kata = await conn.reply(m.chat, `Status Pembayaran: ✅ Succesfull`, m)
      delete conn.buyprem[m.sender]
      pesan.sendMessage(m.chat, { delete: key })
      pesan.sendMessage(m.chat, { delete: kemii })
      user.premium = true
      await conn.sendMessage(m.chat, { text: `Premium Berhasil Di Tambahkan`, edit: kata })
    } else if (m.text.toLowerCase() == 'n') {
      delete conn.buyprem[m.sender]      
      await conn.reply(m.chat, `🚩 Pembelian berhasil dibatalkan.`, m)   
      pesan.sendMessage(m.chat, { delete: key })   
    }
}

handler.help = ['buyprem']
handler.tags = ['main']
handler.command = /^buyprem$/i

module.exports = handler;

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Detect if thats number
 * @param {Number} x
 * @returns Boolean
 */
function number(x = 0) {
  x = parseInt(x)
  return !isNaN(x) && typeof x == 'number'
}

/**
 * Random pick from Array
 * @param {Array} list
 * @returns Any
 */
function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}

/**
 * Convert milliseconds to clock string
 * @param {Number} ms
 * @returns String
 */
 function clockString(ms) {
  let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000)
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return ['\n' + d, ' *Days ☀️*\n ', h, ' *Hours 🕐*\n ', m, ' *Minute ⏰*\n ', s, ' *Second ⏱️* '].map(v => v.toString().padStart(2, 0)).join('')
}