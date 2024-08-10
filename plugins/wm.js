const uploadFile = require("../lib/uploadFile");
const uploadImage = require("../lib/uploadImage");
let { webp2png } = require("../lib/webp2mp4");
let fetch = require("node-fetch");
let handler = async (m, { conn, text, usedPrefix, command }) => {
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || "";
  if (/video/g.test(mime))
    if ((q.msg || q).seconds > 11) return m.reply("maksimal 10 detik");
  try {
    let img = await q.download();
    let url = await uploadFile(img);
    if (!img) throw `Reply image, *Example*: .wm`;
    let ah = text.split("|");
    conn.sendImageAsSticker(m.chat, url, m, { packname: ah[0], author: ah[1] });
  } catch {
    throw "Gagal!, Balas Gambar/video dengan caption *.wm*";
  }
};
handler.help = ["wm", "watermark"];
handler.tags = ["sticker"];
handler.command = /^wm|watermark?$/i;

module.exports = handler;

const isUrl = (text) => {
  return text.match(
    new RegExp(
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png)/,
      "gi",
    ),
  );
};
