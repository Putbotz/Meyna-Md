const { G4F } = require("g4f")
const g4f = new G4F()
    
let handler = async (m, { conn, args, text, command, usedPrefix, isCreator, isPrems }) => {
  if (!text) return m.reply(Func.example(usedPrefix, command, "halo"));
  await m.react('🕒')
  if (!global.db.data.openai[m.sender]) global.db.data.openai[m.sender] = [];
  if (global.db.data.openai[m.sender].length >= 70) global.db.data.openai[m.sender] = []
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ""  
  let messages = [
  { 'role': 'assistant', 'content': require('fs').readFileSync('./system/prompt.txt', 'utf-8') },
  ...(global.db.data.openai[m.sender].map((msg) => ({ role: msg.role, content: msg.content })) || []),
  { 'role': 'user', 'content': text }
  ];
  let options = {
  provider: g4f.providers.GPT,
  model: "gpt-4-32k-0314",
  debug: true,
  };
  let json = await g4f.chatCompletion(messages, options);
  global.db.data.openai[m.sender].push({
  role: 'user',
  content: text
  });
  global.db.data.openai[m.sender].push({
  role: 'assistant',
  content: json.trim()
  });  
  
  let kemii = await voice(json.trim())
  await conn.sendMessage(m.chat, { audio: Buffer.from(kemii.data, "base64"), mimetype: "audio/mp4", ptt: true}, {quoted: m})
  await m.react('')
}
handler.help = ['aivoice *<teks>*']
handler.tags = ['tools','ai']
handler.command = /^aiv|aivoice$/i
handler.limit = true
handler.premium = false
module.exports = handler

module.exports = handler;

async function voice(text) {
let id = 'id_001'
const { data } = await axios.post("https://tiktok-tts.weilnet.workers.dev/api/generation", {
    "text": text,
    "voice": id
})
return data
}