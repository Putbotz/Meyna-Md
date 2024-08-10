const captcha = require('@neoxr/captcha');

async function before(m, { conn, isAdmin, isBotAdmin, isOwner, groupMetadata }) {
    const chat = global.db.data.chats[m.chat];
    const userID = m.messageStubParameters[0];
    const createdIndex = m.messageStubParameters.indexOf('created');
    conn.captchaCodes = conn.captchaCodes || {};

    let delay = time => new Promise(res => setTimeout(res, time));

    if (chat.captcha) {
        if (createdIndex !== -1) {
            if (m.messageStubType === 172) {
                let meta = await conn.groupMetadata(m.chat);
                let newCaptcha = captcha();
                let image = Buffer.from(newCaptcha.image.split(',')[1], 'base64');
                let caption = `Hai @${userID.split('@')[0]} 👋🏻\n`;
                caption += `Sebelum melakukan aktivitas di dalam grup *${meta.subject}* harap lakukan *VERIFIKASI* dengan mengirimkan *KODE CAPTCHA* pada gambar di atas.\n\n`;
                caption += `*Timeout* : [ 1 menit ]`;
                let images = await upload(image); // Fungsi upload belum didefinisikan, pastikan ini berfungsi
                await conn.sendMessage(userID + '@s.whatsapp.net', { image: { url: images }, caption: caption, mentions: conn.parseMention(caption) }, { quoted: null });
                
                // Simpan kode CAPTCHA dan timeout untuk verifikasi
                conn.captchaCodes[userID] = {
                    code: newCaptcha.value,
                    id: userID,
                    idgc: groupMetadata.id,
                    time: setTimeout(async () => {
                        if (conn.captchaCodes[userID]) {
                            await conn.reply(m.chat, Func.texted('bold', `🚩 Member : [ @${userID.split('@')[0]} ] belum melakukan verifikasi.`), null, { mentions: [userID] });
                            await delay(3000);                  
                            await conn.groupRequestParticipantsUpdate(m.chat, [userID], 'reject');
                            delete conn.captchaCodes[userID];
                        }
                    }, 80000 )
                };
            }
        }
    }
}

module.exports = {
    before,
};