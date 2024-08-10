const RateLimiter = require("ratelimiter");
const util = require("util");

var handler = async (m, { conn, text, args, usedPrefix, command }) => {
  try {
    var res = args.join(' ').split('|');
    if (!args[0]) throw `• *Example :* ${usedPrefix + command} 123.456.789.0|80`;

    // Memasukkan IP dan Port
    var ip = res[0];
    var port = parseInt(res[1]);

    // Melakukan pengecekan dengan menggunakan Rate Limiter
    var limit = new RateLimiter({
      interval: 60, // Interval waktu dalam detik
      maxInInterval: 10, // Jumlah maksimum permintaan dalam interval waktu
      minDifference: 1000, // Selisih minimal antara setiap permintaan dalam milidetik
      id: `${ip}:${port}` // ID unik untuk mengidentifikasi IP dan port
    });

    const removeTokensAsync = util.promisify(limit.removeTokens).bind(limit);
    await removeTokensAsync(1);

    // Aksi yang dilakukan ketika permintaan masih dalam batas yang ditentukan
    console.log(`Permintaan diterima dari IP ${ip}:${port}`);
    // Tulis kode untuk menangani permintaan yang valid.
  } catch (err) {
    // Mengambil aksi saat terjadi kesalahan
    console.error(err);
    throw err;
    // Tulis kode untuk menangani kesalahan dengan benar.
  }
};

handler.command = handler.help = ['antiddos']
handler.tags = ['hengker'];

module.exports = handler;