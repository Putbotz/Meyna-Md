const canvafy = require('canvafy');

let handler = async (m, { conn, text }) => {
    const mentionedJid = m.mentionedJid
    if (!text || mentionedJid.length < 1) throw '• *Example :* .ship @user1 @user2'
    await m.react('🕒')

    const avatarURL = 'https://telegra.ph/file/95670d63378f7f4210f03.png'; 
    let avatar1, avatar2;
    if (mentionedJid.length === 1) {
        avatar1 = await conn.profilePictureUrl(m.sender).catch(() => avatarURL);
        avatar2 = await conn.profilePictureUrl(mentionedJid[0]).catch(() => avatarURL);
    } else {
        [avatar1, avatar2] = await Promise.all(mentionedJid.map(async jid => await conn.profilePictureUrl(jid).catch(() => avatarURL)));
    }

    const ship = await new canvafy.Ship()
        .setAvatars(avatar1, avatar2)
        .setBackground("image", "https://telegra.ph/file/c84d50916f8c418eed63c.jpg")
        .setBorder("#f0f0f0")
        .setOverlayOpacity(0.5)
        .build();

    conn.sendFile(m.chat, ship, '', '💓', m)
}

handler.command = /^ship$/i
handler.help = ['ship']
handler.tags = ['group'];
handler.premium = false
handler.register = true
handler.group = true

module.exports = handler;