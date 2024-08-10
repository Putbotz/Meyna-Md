/*
 *  Script By Kemii
 *  Forbidden to share and delete my wm
 *  Facebook : kemii.houkii
 *  Github : dcodekemii
 *  Telegram : t.me/dcodekemi
 *  Breach : Kemii
 *  WhatsApp : wa.me/628816609112
 */

const { proto, generateWAMessageFromContent } = require('@whiskeysockets/baileys');

let handler = async (m, { conn, text, participants, usedPrefix, command }) => {
  try {
    let input = text ? text : m.quoted ? m.quoted.sender : m.mentionedJid.length > 0 ? m.mentionedJid[0] : false;
    if (!input) return conn.reply(m.chat, Func.texted('bold', `Mention or reply chat target.`), m);

    let p = await conn.onWhatsApp(input.trim());
    if (p.length == 0) return conn.reply(m.chat, Func.texted('bold', `Invalid number.`), m);

    let jid = await conn.decodeJid(p[0].jid);
    let number = jid.replace(/@.+/, '');
    let member = participants.find(u => u.id == jid);
    let code = await conn.groupInviteCode(m.chat)
    let name = await conn.groupMetadata(m.chat);
    if (member) return conn.reply(m.chat, Func.texted('bold', `@${number} already in this group.`), m);

    var groupInvite = generateWAMessageFromContent(jid, proto.Message.fromObject({
      "groupInviteMessage": {
        "groupJid": m.chat,
        "inviteCode": code,
        "inviteExpiration": "1721563487",
        "groupName": name.subject,
        "jpegThumbnail": "",
        "caption": "Undangan untuk bergabung ke grup WhatsApp saya"
      }
    }), { userJid: jid, quoted: null });

    conn.relayMessage(jid, groupInvite.message, { messageId: groupInvite.key.id })
      .then(res => m.reply(Func.jsonFormat(res)));

  } catch (e) {
    console.log(e);
    return m.reply(Func.jsonFormat(e));
  }
}

handler.help = handler.command = ['add'];
handler.tags = ['group'];
handler.group = true;
handler.admin = true;
handler.botAdmin = true;
handler.limit = 1;

module.exports = handler;