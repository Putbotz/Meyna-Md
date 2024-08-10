let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) throw `• *Example :* ${usedPrefix + command} example code javascript `
await conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})
try {
let kemii = await blackbox(text, m)
await conn.reply(m.chat, util.format(kemii), m)
await m.react('')
} catch(e) {
throw e
}

}
handler.help = ["blackbox"].map(a => a + " *<text>*")
handler.tags = ["ai"]
handler.command = ["blackbox"]
module.exports = handler

async function blackbox(text, m) {
  try {
    let id = m.sender.split("@")[0]
    let json = {
      messages: [{ id: id, content: text, role: "user" }],
      id: id,
      previewToken: null,
      userId: "4d112c20-3201-46a5-afc6-6b308d98a450",
      codeModelMode: true,
      agentMode: {},
      trendingAgentMode: {},
      isMicMode: false,
      isChromeExt: false,
      githubToken: null,
    }
    let { data } = await axios.post(
      "https://www.blackbox.ai/api/chat",
      json
    )
    let cleanedData = data.replace(/[^a-zA-Z0-9().\s]/g, "");
    cleanedData = cleanedData.replace(/^.*?(\b\w+\b|\b\d+\b)\s*/, "");
    cleanedData = cleanedData.replace(/(\s\s+).*(\s\s+)$/g, "");
    return cleanedData;
  } catch (e) {
    return e;
  }
}