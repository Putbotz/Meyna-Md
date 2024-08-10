let fetch = require('node-fetch')
let handler = async (m, { conn, args, text, command, usedPrefix, isCreator, isPrems }) => {
  if (!text) return conn.reply(m.chat, `• *Example :* ${usedPrefix}${command} Car`, m)
  await m.react('🕒')
  let scrape = await generateImage(text)
  for (let i of scrape.imgs) {
  await conn.sendFile(m.chat, i, '', '', m)
  await m.react('')
  }
}
handler.help = ['aiimage *<text>*']
handler.tags = ['ai']
handler.command = /^(aiimg|aiimage)$/i
handler.register = true
handler.limit = true

module.exports = handler

async function generateImage(captionInput) {
    const data = {
        captionInput,
        captionModel: "default"
    };

    const url = 'https://chat-gpt.pictures/api/generateImage';

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}