let fetch = require('node-fetch')

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return conn.reply(m.chat, `• *Example :* ${usedPrefix + command} Hello`, m)
    conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})
    const requestBody = {
        character_id: "8bbdf29b-c0aa-4024-8690-bb83d8276832",
        message: `${text}`,
        enable_nsfw: false
    };
    const response = await fetch('https://api.itsrose.rest/cai/chat', {
    method: 'POST',
    body: JSON.stringify(requestBody),
    headers: {
    'accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `${global.roseapi}`
    }
    });
    const hasil = await response.json();
    await conn.reply(m.chat, hasil.result.message, m)
};
handler.help = ["roseai *<text>*"]
handler.tags = ["ai"]
handler.command = ["roseai"]
handler.premium = false

module.exports = handler