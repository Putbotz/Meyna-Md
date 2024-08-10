let uploadImage = require("../lib/uploadFile")
let handler = m => m
handler.before = async (m, { conn }) => {

    let chat = db.data.chats[m.chat]

    if (chat.ai && !chat.isBanned) {

        if (/^.*false|disable|(turn)?off|0/i.test(m.text)) return

        if (!m.text) return
        if (m.text.match(global.prefix)) return
        
        let q = m.quoted ? m.quoted : m
	    let mime = (q.msg || q).mimetype || ""
	    let salsa = await conn.reply(m.chat, '```...```', m)
	    if (m.text.includes('buatin') && m.text.includes('buatkan')) {
        let img = await fetchJson(`https://skizo.tech/api/midjourney/v2?apikey=prince&prompt=${m.text}&model=`)
        let imgd = img.base64
        let promptm = `*Prompt :* ${m.text}`
        let sgb = Buffer.from(imgd, 'base64')
        conn.sendFile(m.chat, sgb, '', promptm, m)      
        } else if (!mime) {
		const date = new Date(
        new Date().toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
        }),
        );
        const hours = date.getHours();
        const name = await conn.getName(m.sender);
        const minutes = date.getMinutes();
        const timeNow = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
        let chat = await Lbbai(
        m.text,
       `kamu Adalah 0x38/Kiku seorang gadis muda pendiam dan cantik, jawab setiap pertanyaan dengan jawaban yang edukatif, jika ada yang bertanya tentang waktu kamu jawab tandon yang berkaitan dengan ${timeNow} dan ${getTodayDate()}, lawan bicara mu adalah ${name} , kamu memiliki sifat dingin dan sedikit tsundere imut, pembuat mu adalah Kemii`,
        );
        let hasil = chat.answer;
        let formattedHasil = hasil.replace(/```/g, " ");
        await conn.sendMessage(m.chat, { text: `${formattedHasil}`, edit: salsa })
        } else {
		let media = await q.download()
		let isTele = /image\/(png|jpe?g)/.test(mime)
		let link = await uploadImage(media)
		let res = await itz.geminiimage(m.text, link)
		await await conn.sendMessage(m.chat, { text: `${res.result}`, edit: salsa })
        }
        return !0

    }

    return !0

}

module.exports = handler

function getTodayDate() {
  const today = new Date();

  const day = today.getDate();
  const month = today.getMonth() + 1; // Perhatikan bahwa bulan dimulai dari 0, maka ditambahkan 1.
  const year = today.getFullYear();
  const dayOfWeek = today.toLocaleDateString("id-ID", { weekday: "long" }); // Mengambil nama hari dalam bahasa Inggris.

  return `Hari ini adalah ${dayOfWeek}, ${day}/${month}/${year}.`;
}

async function Lbbai(sistem, input) {
  const messages = [
    { role: "system", content: input },
    { role: "user", content: sistem },
  ];

  try {
    const response = await fetch(
      "https://deepenglish.com/wp-json/ai-chatbot/v1/chat",
      {
        method: "POST",
        headers: {
          Accept: "text/event-stream",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages }),
      },
    );

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}