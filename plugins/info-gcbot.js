let handler = async (m, { conn }) => {
  let text = '- Network WhatsApp Bot\nhttps://chat.whatsapp.com/E1vfuWxthiT3BzdgKW2dHo'
  m.reply(text)
}

handler.command = /^(gcbot)$/i;
handler.private = false;
module.exports = handler;