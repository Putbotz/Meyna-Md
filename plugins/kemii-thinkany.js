/*
  *  Script By Kemii
  *  Forbidden to share and delete my wm
  *  Facebook : kemii.houkii
  *  Github : dcodekemii
  *  Telegram : t.me/dcodekemi
  *  Breach : Kemii
  *  WhatsApp : wa.me/628816609112
*/

let handler = async(m, { conn, usedPrefix, command, text }) => {
   if (!text) return m.reply(`• *Example :* ${usedPrefix + command} Selamat Malam`);
   await conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }});
   // thinkany
   let result = await thinkany(text);
   await conn.reply(m.chat, result, m);
   await conn.sendMessage(m.chat, { react: { text: '', key: m.key }});
}

handler.tags = ["ai"]
handler.help = ["thinkany *<text>*"]
handler.command = ["thinkany"]

handler.register = true
handler.limit = 5

module.exports = handler

const api = axios.create({
  baseURL: 'https://thinkany.ai/api',
  headers: {
    'Content-Type': 'application/json',
    'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Mobile Safari/537.36',
    'Referer': 'https://thinkany.ai/'
  }
});

/**
  * Scraper By QanyPaw
  * Forbidden to sell and delete my wm, respect the creator
*/

async function thinkany(content) {
  try {
    const newConversationData = { content, locale: "en", mode: "search", model: "claude-3-haiku", source: "all" };
    const { data } = await api.post('/new-conversation', newConversationData);

    const chatData = {
      role: "user",
      content: data.data.content,
      conv_uuid: data.data.uuid,
      mode: data.data.mode,
      is_new: true,
      model: data.data.llm_model
    };

    const chatResponse = await api.post('/chat', chatData);
    return chatResponse.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}