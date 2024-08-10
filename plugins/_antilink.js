let handler = m => m

let linkRegex = /(chat.whatsapp.com\/([0-9A-Za-z]{20,24})|(https?:\/\/)?(www\.)?([a-zA-Z0-9\-]+\.)+(com|xyz|me|my|id|io|eu\.org|biz|biz\.id)(\/[^\s]+)?)/i

handler.before = async function (m, { isAdmin, isBotAdmin }) {
  if (isAdmin) return
  if (!m.isGroup) return true
  let chat = global.db.data.chats[m.chat]
  let isGroupLink = linkRegex.exec(m.text)

  if (chat.antiLink && isGroupLink) {
    await this.sendMessage(m.chat, { delete: m.key })
  }
  return true
}

module.exports = handler