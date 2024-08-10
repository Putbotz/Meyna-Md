// Kemii Cantik
// Sen, 10 Jun - 05.24

async function before(m, { conn }) {
  let chat = global.db.data.chats[m.chat];
  if (chat.antiBot) {
  if (m.formMe) return
  if (m.isBaileys == true) {
  await conn.sendMessage(m.chat, {
  text: `Bot Terdeteksi!`,
  }, { quoted: m });
  await conn.groupParticipantsUpdate(m.chat, [m.sender], "remove");
  }
  }
}
module.exports = {
    before,
}