let handler = async (m, { conn, text, usedPrefix }) => {
 conn.chatai = conn.chatai ? conn.chatai : {};

 if (!text) throw `• *Example :* ${usedPrefix}autoai on/off`;

 if (text == "on") {
 conn.chatai[m.sender] = {
 pesan: []
 }
 m.reply("Success create session chat")
 } else if (text == "off") {
 delete conn.chatai[m.sender]
 m.reply("Success delete session chat")
 }
}

handler.before = async (m, { conn }) => {
conn.chatai = conn.chatai ? conn.chatai : {};
 if (m.isBaileys && m.fromMe) return;
 if (m.text.match(global.prefix)) return
 if (!m.text) return
 if (!conn.chatai[m.sender]) return;

 if (conn.chatai[m.sender] && m.text) {
 let name = conn.getName(m.sender)
 let kalender = await getTodayDate()
 let date = new Date(
 new Date().toLocaleString("en-US", {
 timeZone: "Asia/Jakarta",
 }),
 );
 let hours = date.getHours();
 let minutes = date.getMinutes();
 let timeNow = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
 await m.react('🕒')
 const messages = [
 ...conn.chatai[m.sender].pesan,
 { role: "system", content: `Kamu adalah Kikuchanj, Kamu Teman yang selalu mendukung! Kamu bisa menjadi pendengar yang baik Dan Bisa Menjadi Bahan Curhat. Kamu Adalah Wanita Anime, Gaya Bicara Kamu Seperti Di Anime, Kamu Selalu Memakai Emot Untuk Mengekspresikan Emosi, Kamu Sedikit Malu Tapi Ceria, Dan Lucu, Kamu Hanya Bisa Berbahasa Indonesia Karna Emang Orang Indonesia, Kamu Bukan Assistant Lagi Tapi Adalah Kikuchanj Tapi Kamu Bisa Membantu Orang Yang Membutuhkan.`},
 { role: "user", content: m.text }
 ];
 try {
 const response = await axios.post("https://deepenglish.com/wp-json/ai-chatbot/v1/chat", {
 messages
 });

 const responseData = response.data;
 const hasil = responseData;
 m.reply(hasil.answer)
 conn.chatai[m.sender].pesan = messages
 } catch (error) {
 console.error("Error fetching data:", error);
 throw error;
 }
 }
}

handler.command = ['autoai']
handler.tags = ["ai"]
handler.help = ['autoai *<text>*']

module.exports = handler

function getTodayDate() {
  const today = new Date();

  const day = today.getDate();
  const month = today.getMonth() + 1; // Perhatikan bahwa bulan dimulai dari 0, maka ditambahkan 1.
  const year = today.getFullYear();
  const dayOfWeek = today.toLocaleDateString("id-ID", { weekday: "long" }); // Mengambil nama hari dalam bahasa Inggris.

  return `Hari ini adalah ${dayOfWeek}, ${day}/${month}/${year}.`;
}