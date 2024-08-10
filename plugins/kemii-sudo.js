const { generateWAMessage, proto, areJidsSameUser } = require("@whiskeysockets/baileys")

let handler = async (m, { conn, text, usedPrefix, command, chatUpdate }) => {
   let who = m.mentionedJid[0]
   if (!who) throw `*• Example :* ${usedPrefix + command} @tag`
   if (!text) throw `*• Example :* ${usedPrefix + command} @tag`
   m.react('☑️')
   try {
   const keyword = text.split(" ")[0];
  const data = text.slice(keyword.length + 1);
    let messages = await generateWAMessage(
      m.chat,
      {
        text: data,
        mentions: m.mentionedJid,
      },
      {
        userJid: conn.user.id,
        quoted: finvite,
      },
    );
    messages.key.fromMe = areJidsSameUser(who, conn.user.id);
    messages.key.id = who;
    messages.pushName = await conn.getName(who);
    if (m.isGroup) messages.participant = who;
    let msg = {
      ...chatUpdate,
      messages: [proto.WebMessageInfo.fromObject(messages)],
      type: "append",
    };
    conn.ev.emit("messages.upsert", msg);
  } catch(e) {
 throw e 
}
}
handler.command = ["hc"]
handler.owner = true
handler.group = true 

module.exports = handler