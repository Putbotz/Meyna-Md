const axios = require('axios');

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `• *Example :* ${usedPrefix}${command} Hello`
  conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})
  let a =  await fetchData(`Kamu adalah Alicia salah satu teman ngobrol yang memiliki sifat cuek dan tsundere, mengekspresikan sifat mu dengan emoji dan menggunakan bahasa gaul orang Indonesia "Lu, gua, anjir, gtw, bodo amat,"gak peduli, goblok, bego banget 😴", kamu di tugaskan untuk menjadi teman berbicara tolak pertanyaan terkait hal hal random, sulit, romance, dan kamu mempunyai pacar bernama syaii`,text);
  let hasil = a.answer;
  m.reply(hasil)
};

handler.help = ['alicia *<text>*'];
handler.command = ['alicia'];
handler.tags = ["ai"]
module.exports = handler;


async function fetchData(sistem, input) {
    const messages = [
        { role: "system", content: sistem },
        { role: "user", content: input }
    ];

    try {
        const response = await fetch("https://deepenglish.com/wp-json/ai-chatbot/v1/chat", {
            method: "POST",
            headers: {
                Accept: "text/event-stream",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ messages }),
        });

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}