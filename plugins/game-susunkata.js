let fetch = require("node-fetch");

let timeout = 60000
let poin = 1500
let handler = async (m, { conn, usedPrefix }) => {
  conn.susunkata = conn.susunkata ? conn.susunkata : {};
  let id = m.chat;
  if (id in conn.susunkata) {
    conn.reply(
      m.chat,
      "Masih ada soal belum terjawab di chat ini",
      conn.susunkata[id][0],
    );
    throw false;
  }
  let src = await (
    await fetch(
      "https://raw.githubusercontent.com/BochilTeam/database/master/games/susunkata.json",
    )
  ).json();
  let json = src[Math.floor(Math.random() * src.length)];
  let teks = `Codename1: arrange words  \n*Susun kata*\n\n`
  teks += `Soal: ${json.soal}\nTipe: ${json.tipe}\n\n`
  teks += `Timeout : [ *${((timeout / 1000) / 60)} menit* ]\n`
  teks += `Reply pesan ini untuk menjawab`.trim()
  conn.susunkata[id] = [
    await conn.reply(m.chat, teks, m),
    json,
    poin,
    setTimeout(() => {
      if (conn.susunkata[id])
        conn.reply(
          m.chat,
          `Waktu habis!\nJawabannya adalah *${json.jawaban}*`,
          conn.susunkata[id][0],
        );
      delete conn.susunkata[id];
    }, timeout),
  ];
};
handler.help = ["susunkata"];
handler.tags = ["game"];
handler.command = /^susunkata/i;
handler.limit = true;
handler.group = true;

module.exports = handler;