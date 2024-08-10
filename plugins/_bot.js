let handler = async (m, {
    conn,
    command,
    isOwner
}) => {
let kemii = '0@s.whatsapp.net'
let capt = `Online Bos, @${m.sender.replace(/@.+/g, '')}`
conn.reply(m.chat, `${capt}\n\n> Powered By _@${kemii.replace(/@.+/g, '')}_`, m)
}
handler.customPrefix = /^(bot|bot?|bott)$/i
handler.command = new RegExp

module.exports = handler