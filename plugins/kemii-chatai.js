/*
  * Script By Kemii
  * Forbidden to share and delete my wm
  * Facebook : kemii.houkii
  * Github : dcodekemii
  * Telegram : t.me/dcodekemi
  * Breach : Kemii
  * WhatsApp : wa.me/628816609112
*/

let handler = async (m, { conn, usedPrefix, command }) => {
    conn.autoai = conn.autoai ? conn.autoai : {};

    if (!conn.autoai[m.sender]) {
        let capt = 'Berhasil membuat sesi chatai, silahkan reply pesan terakhir bot untuk memulai percakapan.\n\n';
        capt += 'Untuk mematikan chatai silahkan anda mengetik ulang command *.chatai*';
        await conn.reply(m.chat, capt, m);
        conn.autoai[m.sender] = m.sender;
    } else if (conn.autoai[m.sender]) {
        let capt = 'Berhasil menghapus sesi chatai.';
        await conn.reply(m.chat, capt, m);
        delete conn.autoai[m.sender];
    }
}

handler.tags = ["ai"];
handler.help = ["chatai"];
handler.command = ["chatai"];

handler.register = true;

module.exports = handler;