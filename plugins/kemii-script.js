let handler = async (m, { conn, usedPrefix }) => {
return new Button()
.setBody( `*SELL SCRIPT KIKUCHANJ V3.0.3*

🏷️ *Price:* *Rp. 70.000 / $4.86*

*Key Features:*
- 🤖 AI & AI Image
- 🎮 35 Mini Games && RPG Games
- 📧 Email Verification
- 🔄 Free Updates
- 🎁 Bonus API Key (2 months)
- 📊 Response Polling
- 📜 Button List
- 🚀 Advanced Menu Options
- 📋 And other exciting features

*Additional Features:*
- ➕ Temporary Bot (Jadibot)
- ➕ Chatroom with Bot
- ➕ Menfess (Confession)
- ➕ Create Panel
- ➕ Payment Gateway

*Requirements:*
- NodeJS v16
- FFMPEG
- IMAGEMAGICK
- Min. 5GB RAM`)
.setFooter('ʟɪɢʜᴛᴡᴇɪɢʜᴛ ᴡᴀʙᴏᴛ ᴍᴀᴅᴇ ʙʏ ᴋᴇᴍɪɪ ッ')
.setImage('https://telegra.ph/file/c6ec9739b1a4ee238b325.jpg')
.addUrl('Costumer Support','https://wa.me/628816609112','https://wa.me/628816609112')
.run(m.chat, conn, m)
}
handler.help = ['sc', 'sourcecode']
handler.tags = ['info','main']
handler.command = /^(sc|sourcecode)$/i
handler.register = false

module.exports = handler