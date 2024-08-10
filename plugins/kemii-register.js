const captcha = require('@neoxr/captcha');
const crypto = require("crypto");
const PhoneNumber = require('awesome-phonenumber')
const fetch = require("node-fetch");

const handler = async (m, {
    conn, text, usedPrefix, command
}) => {
    conn.registrasi = conn.registrasi ? conn.registrasi : {};
    if (conn.registrasi[m.chat]?.[m.sender]) return m.reply('You are requesting verification!');
    let user = global.db.data.users[m.sender];
    let kemii = await conn.getName(m.sender)
    if (user.registered === true) return conn.reply(m.chat, '```✅ Nomor Kamu Udah Terverifikasi```', m)
    let sn = crypto.createHash("md5").update(m.sender).digest("hex");
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.fromMe ? conn.user.jid : m.sender;    
    let newCaptcha = captcha()
    let image = Buffer.from(newCaptcha.image.split(',')[1], 'base64')

    let confirm = "Reply pesan ini dengan mengetik kode CAPTCHA yang ada pada gambar!";
    let v1 = { key: { participant: '0@s.whatsapp.net', remoteJid: "0@s.whatsapp.net" }, message: { conversation: "REGISTER (1/3)"} }
    let { key } = await conn.sendFile(m.chat, image, '', confirm.trim(), v1);

    conn.registrasi[m.chat] = {
        ...conn.registrasi[m.chat],
        [m.sender]: {
            message: m,
            sender: m.sender,
            otp: newCaptcha.value,
            user,
            key,
            timeout: setTimeout(() => {
                conn.sendMessage(m.chat, { delete: key });
                delete conn.registrasi[m.chat][m.sender];
            }, 60 * 1000)
        }
    };
}

handler.before = async (m, { conn }) => {
    conn.registrasi = conn.registrasi ? conn.registrasi : {};
    if (m.isBaileys) return;
    if (!conn.registrasi[m.chat]?.[m.sender]) return;
    if (!m.text) return;
    let { timeout, otp, message, sender, user, key, date } = conn.registrasi[m.chat]?.[m.sender];
    if (m.id === message.id) return;
    if (m.id === key.id) return;
    if (m.text === otp) {
        clearTimeout(timeout);  
        delete conn.registrasi[m.chat]?.[m.sender];
        let v2 = { key: { participant: '0@s.whatsapp.net', remoteJid: "0@s.whatsapp.net" }, message: { conversation: "REGISTER (2/3)"} }
        let name = await conn.sendInputMessage(m.chat, { text: "Masukan Nama Anda:" }, m.sender, 120000000, v2) 
        let v3 = { key: { participant: '0@s.whatsapp.net', remoteJid: "0@s.whatsapp.net" }, message: { conversation: "REGISTER (3/3)"} }
        let age;while(isNaN(age)) age = parseInt(await conn.sendInputMessage(m.chat, { text: "Masukan Umur Anda:" }, m.sender, 120000000, v3))
        user.name = name.trim();
        user.age = age;
        user.regTime = +new Date;
        user.registered = true;
        let kemii = '0@s.whatsapp.net'
        let v4 = { key: { participant: '0@s.whatsapp.net', remoteJid: "0@s.whatsapp.net" }, message: { conversation: "REGISTER SUCCES"} }
        let today = new Date();
        let tanggal = today.toLocaleDateString("id-ID", { 
           day: 'numeric', 
           month: 'long', 
           year: 'numeric' 
          })
        let ppUrl = await conn.profilePictureUrl(m.sender, 'image').catch((_) => "https://telegra.ph/file/1dff1788814dd281170f8.jpg");
        let tteks = 'Success Verifed\n\n'
        tteks += '```Name:```' + ` ${name}\n`
        tteks += '```Age:```' + ` ${age}\n`
        tteks += '```Number:```' + ` ${PhoneNumber('+' + m.sender.split('@')[0]).getNumber('international')}\n`
        tteks += '```Date:```' + ` ${tanggal}\n\n`
        tteks += `> Powered By _@${kemii.replace(/@.+/g, '')}_`
        await conn.sendMessage(m.chat, {
        text: tteks,
        contextInfo: {
        mentionedJid: [kemii],
        externalAdReply: {
        showAdAttribution: true,
        title: 'DCODEKEMII',
        body: 'Version: 3.0.1',
        thumbnailUrl: ppUrl,
        mediaType: 1,
        renderLargerThumbnail: true
        }}}, {quoted: v4})
        let asu = '```Registers Notifications```\n\n'
        asu += `\`\`\`- Name: ${name}\`\`\`\n`
        asu += `\`\`\`- Age: ${age}\`\`\`\n`
        asu += `\`\`\`- Tags: @${m.sender.replace(/@.+/g, '')}\`\`\``
        await conn.notify(asu)
    } else {
        await m.reply(`🚩 Your verification code is wrong.`)
        clearTimeout(timeout);
        await conn.sendMessage(m.chat, { delete: key });
        delete conn.registrasi[m.chat]?.[m.sender];
    }
}

handler.help = ["register","daftar"]
handler.tags = ["start"];
handler.command = /^(register|daftar)$/i;

module.exports = handler;