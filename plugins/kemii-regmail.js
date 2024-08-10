let nodemailer = require('nodemailer')
let fs = require('fs')
let verify = JSON.parse(fs.readFileSync('./system/verify.json', 'utf-8'))
let handler = async function (m, { conn, args, usedPrefix, command }) {
     try {
      let users = global.db.data.users[m.sender]
      let name = await conn.getName(m.sender)
      if (users.registered === true) return conn.reply(m.chat, Func.texted('bold', `✅ Your number already verified.`), m)
      if (!args || !args[0]) return conn.reply(m.chat, `• *Example :* .${command} ${global.email}`, m)
      await conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})          
      if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ig.test(args[0])) return conn.reply(m.chat, Func.texted('bold', '🚩 Invalid email.'), m)
      let code = `${getRandomInt(100, 900)}-${getRandomInt(100, 900)}`
      let kemii = conn.user.jid.split("@")[0]
      users.codeExpire = new Date * 1
      users.code = code
      users.email = args[0]
      let transport = nodemailer.createTransport({
         service: 'gmail',
         host: 'smtp.gmail.com',
         port: 587,
         secure: false,
         auth: {
            user: 'kemiisalsabila@gmail.com',
            pass: 'dxghrdutrlazxvlm'
         }
      })
      let mailOptions = {
         from: {
            name: 'Kemii Cantik',
            address: 'kemiisalsabila@gmail.com'
         },
         to: args[0],
         subject: 'Email Verification',
         html: `<div style="padding:20px;border:1px dashed #222;font-size:15px"><tt>Hi <b>${name} 😘</b><br><br><img src="https://telegra.ph/file/59bb57ffc5a86f2036055.jpg" alt="Thumbnail"><br><br>Confirm your email to be able to use Kiku-san. Send this code to the bot and it will expire in 3 minutes.<br><center><h1>${code}</h1></center>Or copy and paste the URL below into your browser : <a href="https://wa.me/${kemii}?text=${code}">https://wa.me/${kemii}?text=${code}</a><br><br><hr style="border:0px; border-top:1px dashed #222"><br>Powered by: <b>dcodekemii</b></tt></div>`
      }
      transport.sendMail(mailOptions, function(err, data) {
         if (err) return m.reply(Func.texted('bold', `❌ SMTP Error !!`))
         return conn.reply(m.chat, Func.texted('bold', `✅ Check your mailbox to get a verification code.`), m)
      })
      } catch (e) {
      conn.reply(m.chat, Func.jsonFormat(e), m)
      }
      
    }
handler.help = ['reg *<email>*']
handler.tags = ['start']

handler.command = /^(reg|regmail)$/i
handler.private = false

module.exports = handler

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}